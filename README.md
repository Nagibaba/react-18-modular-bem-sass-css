# React V18 Modular SASS and CSS setup with BEM standard

## Techs:
- Create React App
- Typescript
- SASS, CSS, BEM
- react-app-rewired, customize-cra

## Steps:
- Create app: `yarn create react-app my-app --template typescript`.
- Run `yarn add -D react-app-rewired customize-cra sass sass-loader`.
- Override webpack with 'config-overrides.js' file. Also copy `bemify-css-loader.js`.
- Add `declaration.d.ts` to the `./src` folder to declare CSS and SASS to TS.

## Usage examples:
`TSX file`
```
<p className={sass.block}>Block</p>
<p className={sass.block.element}>Element</p>
<p className={sass.block.$modifier}>Modifier</p>
```

`SASS file`
```
.block
	background-color: blue
	&__element
		background-color: red
	&--modifier
		background-color: green
```



Was recreated using the example of @davidbarral
[Medium article](https://medium.com/trabe/using-bem-conventions-in-css-modules-leveraging-custom-webpack-loaders-fd985f72bcb2)
