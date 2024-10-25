import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui'
import { home } from '@/constants'
import css from './heroSlider.module.css'

export const HeroSlider = () => {
	return (
		<Carousel>
			<CarouselContent>
				{home.hero.slider.map(({ text, imgSrc }, i) => (
					<CarouselItem key={i}>
						<div className={css.container}>
							{imgSrc ? (
								<img src={imgSrc} alt='' className={css.image} />
							) : (
								<div className={css.image} />
							)}
							<p className={css.text}>{text}</p>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className='absolute left-2' />
			<CarouselNext className='absolute right-2' />
		</Carousel>
	)
}
