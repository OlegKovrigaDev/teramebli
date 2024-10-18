import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui'

import { home } from '@/constants'
import Link from 'next/link'
import { List } from '../list'

export const Hero = () => {
	return (
		<div className='hero'>
			<div className='hero-left'>
				<List
					items={home.hero.sidebar}
					className='sidebar-list'
					classItem='sidebar-item'
					renderItem={({ id, text, icon }) => (
						<div className='sidebar-content'>
							{!icon ? (
								<div className='sidebar-icon' />
							) : (
								<img src={icon} alt='' />
							)}
							<Link href={`/category/${id}`}>
								<p className='sidebar-text'>{text}</p>
							</Link>
						</div>
					)}
				/>
			</div>
			<Carousel>
				<CarouselContent>
					{home.hero.slider.map(({ text, imgSrc }, i) => (
						<CarouselItem key={i}>
							<div className='slider-container'>
								{imgSrc ? (
									<img src={imgSrc} alt='' className='slider-image' />
								) : (
									<div className='slider-image' />
								)}
								<p className='slider-text'>{text}</p>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className='slider-prev' />
				<CarouselNext className='slider-next' />
			</Carousel>
		</div>
	)
}
