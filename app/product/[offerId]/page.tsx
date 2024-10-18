'use client'
import { Accord } from '@/components/shared/accord'
import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import { Gallery } from '@/components/shared/gallery'
import {
	Button,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useProductData } from '@/hooks'
import Link from 'next/link'

export default function page({ params }: { params: { offerId: string } }) {
	const { offerId } = params

	const {
		product,
		error,
		isLoading,
		mainCategory,
		mainCategoryId,
		subCategory,
		subCategoryId,
	} = useProductData(offerId)

	if (isLoading) return <p className='text-gray-500'>Загрузка...</p>
	if (error)
		return (
			<p className='text-red-500'>
				Ошибка при загрузке: {JSON.stringify(error)}
			</p>
		)
	if (!product) return <p className='text-gray-500'>Товар не найден</p>

	return (
		<>
			<CrumbsLinks
				categoryName={mainCategory}
				categoryId={mainCategoryId}
				subcategoryName={subCategory}
				subcategoryId={subCategoryId}
				productName={product.params.ModelName}
			/>
			<div className='flex justify-between pb-16'>
				<div className='w-[865px] flex flex-col gap-6'>
					<Gallery />
					<Tabs defaultValue='description' className='w-full'>
						<TabsList className='bg-white w-full justify-start py-6 rounded'>
							<TabsTrigger className=' text-2xl font-bold' value='description'>
								Опис
							</TabsTrigger>
							<TabsTrigger
								className=' text-2xl font-bold'
								value='characteristics'
							>
								Характеристики
							</TabsTrigger>
							<TabsTrigger className=' text-2xl font-bold' value='feedback'>
								Відгуки та питання
							</TabsTrigger>
						</TabsList>
						<TabsContent
							className='bg-white mt-4 py-4 px-2 rounded'
							value='description'
						>
							Опис
						</TabsContent>
						<TabsContent
							className='bg-white mt-4 py-4 px-2 rounded'
							value='characteristics'
						>
							Характеристики
						</TabsContent>
						<TabsContent
							className='bg-white mt-4 py-4 px-2 rounded'
							value='feedback'
						>
							Відгуки та питання
						</TabsContent>
					</Tabs>
				</div>
				<div className='w-[385px] flex flex-col gap-6'>
					<div className='h-36 w-full p-2 bg-white flex flex-col justify-between'>
						<p className='text-red-900 text-[18px] font-semibold'>
							В наявності!
						</p>
						<p className='line-through text-[20px] font-bold'>13 000 грн.</p>
						<p className='text-red-900 text-[40px] font-semibold'>
							12 499 грн.
						</p>
					</div>
					<Accord title='Варіанти товару'>
						<div className='flex flex-col gap-2 text-xs w-full'>
							{Array.from({ length: 5 }).map((_, index) => (
								<div key={index} className='flex justify-between text-[16px]'>
									<span className='flex gap-2 items-center'>
										<Checkbox
											id={`variant-${index}`}
											className='border-2 rounded'
										/>
										<Label htmlFor={`variant-${index}`}>Односпальні</Label>
									</span>
									<span>[24]</span>
								</div>
							))}
							<Link href='/' className='text-[#4E3A9F] mt-4'>
								Згорнути
							</Link>
							<div className='flex justify-between gap-4 mt-6'>
								<Button className='px-18 py-2 bg-[#D81C1B] hover:bg-[#D81C1B]/80 flex-1'>
									Купити
								</Button>
								<Button className='px-18 py-2 bg-transparent border-2 border-[#D81C1B] text-[#D81C1B] hover:bg-black/10 flex-1'>
									Купити в 1 клік
								</Button>
							</div>
						</div>
					</Accord>
					<Accord title='Наявність в магазинах'>
						<div className='flex flex-col gap-2 text-xs w-full'>
							{Array.from({ length: 3 }).map((_, index) => (
								<div key={index} className='flex justify-between text-[16px]'>
									<span>Location Name</span>
									{index % 2 === 0 && <span>Available</span>}
								</div>
							))}
							<Link href='/' className='text-[#4E3A9F] mt-4'>
								Дізнатися всі умови
							</Link>
						</div>
					</Accord>
					<Accord title='Доставка'>
						<div className='flex flex-col gap-2 text-xs'>
							<div className='flex justify-between text-[16px]'>
								<span>Самовивіз зі складу</span>
								<span className='text-[#3C9F3A]'>Безкоштовно</span>
							</div>
							<p>Delivery conditions...</p>
							<div className='flex justify-between text-[16px]'>
								<span>Доставка по Києву</span>
								<span>599 грн</span>
							</div>
						</div>
					</Accord>
					<Accord title='Оплата'>
						<div className='flex flex-col gap-2 text-xs'>
							<p>Payment options...</p>
							<Link href='/' className='text-[#4E3A9F]'>
								Дізнатися всі умови
							</Link>
						</div>
					</Accord>
				</div>
			</div>
		</>
	)
}
