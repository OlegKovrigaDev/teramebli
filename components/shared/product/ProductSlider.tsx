import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { ProductCard } from './ProductCard'
import { Product } from '@/types/redux'

export const ProductSlider = ({ arr }: { arr: Product[] }) => {
	return (
		<Carousel
			opts={{
				align: 'start',
			}}
			className='w-full relative'
		>
			<CarouselContent>
				{arr.map((item, i) => (
					<CarouselItem key={i} className='basis-1/2 md:basis-1/3 xl:basis-1/5'>
						<ProductCard {...item} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className='absolute left-1' />
			<CarouselNext className='absolute right-3' />
		</Carousel>
	)
}
