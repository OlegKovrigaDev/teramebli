import { ProductCard } from '@/components/shared/product/ProductCard'
import { ProductFilter } from '@/components/shared/product/ProductFilter'
import Link from 'next/link'

export default function CategoryId({ params }: { params: { id: number } }) {
	const { id } = params
	return (
		<div className='mb-[75px]'>
			{/* CrumbsLink */}
			<div className='flex flex-col gap-8 md:flex-row md:justify-between'>
				<div className='flex flex-col gap-2 max-w-[280px] sm:min-w-[280px]'>
					<ProductFilter title='title' />
				</div>
				<div className='flex flex-1 gap-y-8 justify-between flex-wrap max-w-[904px]'>
					{[
						{ id: 1 },
						{ id: 2 },
						{ id: 3 },
						{ id: 4 },
						{ id: 5 },
						{ id: 6 },
					].map((id, i) => (
						<Link key={i} href={`/product/${1}?categoryId=${1}`}>
							<ProductCard
								img=''
								title='Product'
								oldPrice={10000}
								newPrice={10001}
								Articul={12345}
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
