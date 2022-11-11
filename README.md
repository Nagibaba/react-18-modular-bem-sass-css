# React V18 Modular SASS and CSS setup with BEM standard

## Techs:
- Create React App
- Typescript
- SASS, CSS, BEM
- react-app-rewired, customize-cra

## Examples:
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
