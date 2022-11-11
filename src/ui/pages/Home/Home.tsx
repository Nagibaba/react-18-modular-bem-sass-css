import css from './Home.css'
import sass from './Home.sass'

export const Home = () => {
	return (
		<div>
			<div>
				CSS
				<p className={css.block}>Block</p>
				<p className={css.block.element}>Element</p>
				<p className={css.block.$modifier}>Modifier</p>
			</div>

			<div style={{ marginTop: 30 }}>
				SASS
				<p className={sass.block}>Block</p>
				<p className={sass.block.element}>Element</p>
				<p className={sass.block.$modifier}>Modifier</p>

			</div>

		</div>
	)
}
