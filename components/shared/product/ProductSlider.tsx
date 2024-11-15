import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { Product } from '@/types/redux'
import { ProductCard } from './ProductCart'

export const ProductSlider = ({
	arr,
	onLoadMore,
}: {
	arr: Product[]
	onLoadMore: () => void
}) => {
	return (
		<Carousel
			opts={{
				align: 'start',
			}}
			className='w-full relative'
		>
			<CarouselContent>
				{arr.map((product, i) => (
					<CarouselItem key={i} className='basis-1/2 md:basis-1/3 xl:basis-1/5'>
						<ProductCard product={product} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className='absolute left-1' />
			<CarouselNext className='absolute right-3' onClick={onLoadMore} />
		</Carousel>
	)
}
