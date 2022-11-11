const { addWebpackModuleRule, override } = require('customize-cra')

module.exports = {
  webpack: override(
    addWebpackModuleRule({
		test: /\.(sa|sc|c)ss$/,
		use: [
		  {
			loader: "style-loader",
			options: { injectType: "styleTag" },
		  },
		  {
			loader: "./bemify-css-loader.js",
			options: {
			  modifierPrefix: "$", // $ is the default value 
			}
		  },

		  {
			loader: "css-loader",
			options: {
				esModule: true,
				modules: {
					exportLocalsConvention: 'asIs',
					
					localIdentName: "[local]--[hash:base64:5]",
				}
			},
		  },
		  {
			loader: "sass-loader",
		  }
		],
	  }))
}