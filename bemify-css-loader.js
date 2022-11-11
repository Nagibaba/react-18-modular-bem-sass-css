const { getOptions } = require("loader-utils");

const camelCased = s => s && s.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());

const localsMatcher = /___CSS_LOADER_EXPORT___\.locals\s=\s\{([\s\S]+)\};/g;

module.exports = function(source) {
  // You can set the prefix used for the modifiers in the webpack config
  const { modifierPrefix = "$" } = getOptions(this);
  
  // We find the exports.locals piece of code
  const newSource = source.replace(localsMatcher, (_, object) => {
    // Convert the entries to an object
    const locals = JSON.parse(`{${object}}`);

    // Traverse the identifiers.
    // We sort lexicographically to ensure identifiers are processed in this
    // order: blocks, block modifiers, elements, element modifiers. 
    // This way we can use object spreadding to easily build the identifiers
    // structure without too much sanity checks ;)
    const bemLocals = Object.keys(locals)
      .sort()
      .reduce((acc, identifier) => {
        // Extract the parts of each identifier
        const [rawBlockElement, rawModifier] = identifier.split("--");
        const [rawBlock, rawElement] = rawBlockElement.split("__");

        // Camelcase each part.
        const block = camelCased(rawBlock);
        const element = camelCased(rawElement);
        const modifier = camelCased(rawModifier);

        // Get the exported className for the identifier
        const className = locals[identifier];

        // Element modifier. Add the modifier toString placeholder
        // to the block element
        if (element && modifier) {
          acc[block] = {
            ...acc[block],
            [element]: {
              ...acc[block][element],

              [`${modifierPrefix}${modifier}`]: {
                _bem_: true,
                toString: className,
              },
            },
          };
          
        // Element or block modifier. Add the element/modifier toString 
        // placeholder to the the block
        } else if (modifier || element) {
          acc[block] = {
            ...acc[block],
            [element ? element : `${modifierPrefix}${modifier}`]: {
              _bem_: true,
              toString: className,
            },
          };
          
        // New block. Add the toString placeholder
        } else {
          acc[block] = {
            _bem_: true,
            toString: className,
          };
        }

        return acc;
      }, {});

    // Stringify the identifiers structure. Swap toString placeholders with 
    // real arrow functions
    const newLocals = JSON.stringify(bemLocals, null, "\t").replace(
      /"toString":(.+)/g,
      (_, g) => `"toString": () => ${g}`,
    );

    // Swap the original locals for the new ones
    return `___CSS_LOADER_EXPORT___.locals = ${newLocals};`;
  });


  
  return newSource
};