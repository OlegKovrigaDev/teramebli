import css from './hero.module.css'
import { HeroCategories } from './heroCategories'
import { HeroSlider } from './heroSlider'

export const Hero = () => {
	return (
		<div className={css.hero}>
			<HeroCategories />
			<HeroSlider />
		</div>
	)
}
