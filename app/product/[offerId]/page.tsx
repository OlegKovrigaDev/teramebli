'use client'
import { useFetchReviewsByOfferIdQuery } from '@/api/categoryApi'
import { Loading } from '@/components/Loading'
import { Accord } from '@/components/shared/accord'
import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import { Gallery } from '@/components/shared/gallery'
import { ReviewPopover } from '@/components/shared/product/ReviewPopover'
import {
	Button,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { formatPrice } from '@/helpers'
import { useProductData } from '@/hooks'
import { addToCart } from '@/store/cartSlice'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

const storageMap = {
	paramsFrom_01_MebliBalta: 'м.Балта, Одеська обл.',
	paramsFrom_02_MebliPodilsk: 'м.Подільск, Одеська обл.',
	paramsFrom_03_MebliPervomaisk: 'м.Первомайськ, Миколаївська обл.',
	paramsFrom_04_MebliOdesa1: 'м.Одеса',
	paramsFrom_05_MebliVoznesensk: 'м.Вознесенськ',
} as const

export default function page({ params }: { params: { offerId: string } }) {
	const { offerId } = params

	const dispatch = useDispatch()

	const {
		product,
		error,
		isLoading,
		availableStorages,
		mainCategory,
		mainCategoryId,
		subCategory,
		subCategoryId,
		currentParams,
	} = useProductData(offerId)

	const {
		data: reviews,
		refetch: refetchReviews,
		isFetching: isFetchingReviews,
	} = useFetchReviewsByOfferIdQuery(offerId)

	if (isLoading) return <Loading />
	if (error)
		return (
			<p className='text-red-500'>
				Ошибка при загрузке: {JSON.stringify(error)}
			</p>
		)
	if (!product || !currentParams)
		return <p className='text-gray-500'>Товар не найден</p>

	const isAvailable = currentParams?.['Кількість на складі'] > 0

	const handleAddToCart = () => {
		const cartItem = {
			offerId: product.offerId,
			ModelName: currentParams?.ModelName,
			Articul: currentParams.Articul,
			RetailPrice: currentParams.RetailPrice,
			RetailPriceWithDiscount: currentParams.RetailPriceWithDiscount,
			currencyId: product.currencyId,
			quantity: 1,
		}

		dispatch(addToCart(cartItem))
	}

	return (
		<>
			<CrumbsLinks
				categoryName={mainCategory}
				categoryId={mainCategoryId}
				subcategoryName={subCategory}
				subcategoryId={subCategoryId}
				productName={currentParams.ModelName}
			/>
			<div className='flex justify-between pb-16'>
				<div className='w-[865px] flex flex-col gap-6'>
					<Gallery offerId={offerId} />
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
							<div
								dangerouslySetInnerHTML={{
									__html: currentParams['Опис текст(сайт)'] || 'Опис відсутній',
								}}
							/>
						</TabsContent>
						<TabsContent
							className='bg-white mt-4 py-4 px-2 rounded'
							value='characteristics'
						>
							<div className='w-full p-4 rounded-lg'>
								<h3 className='text-lg font-semibold mb-4'>
									Загальна інформація
								</h3>
								<div className='grid grid-cols-2 gap-4'>
									{Object.entries(currentParams)
										.filter(
											([key]) =>
												![
													'Articul',
													'ModelName',
													'Розділ синхронізації повністю',
													'RetailPrice',
													'Розділ синхронізації',
													'Кількість на складі',
													'RetailPriceWithDiscount',
													'Відображення на сайті',
													'MesUnit',
													'Одиниця виміру терміну гарантії',
													'groupId',
													'Назва товару',
													'Название товара',
													'Опис текст(сайт)',
												].includes(key)
										)
										.map(([key, value]) => {
											const [UaKey, RuKey] = key.split('_')
											const [UaValue, RuValue] = String(value).split('_')

											return (
												<div key={key} className='grid grid-cols-2 gap-4'>
													<div className='text-gray-500'>
														{UaKey ? <span>{UaKey}</span> : null}
														{/* {RuKey ? (
															<span className='ml-2'>{RuKey}</span>
														) : null} */}
													</div>
													<div>
														{UaValue ? <span>{UaValue}</span> : 'Не вказано'}
														{/* {RuValue ? (
															<span className='ml-2'>{RuValue}</span>
														) : null} */}
													</div>
												</div>
											)
										})}
								</div>
							</div>
						</TabsContent>

						<TabsContent
							className='bg-white mt-4 py-4 px-2 rounded'
							value='feedback'
						>
							<ReviewPopover
								offerId={offerId}
								refetchReviews={refetchReviews}
							/>
							<div className='bg-white space-y-6'>
								{isFetchingReviews ? (
									<Loading />
								) : reviews && reviews.length > 0 ? (
									reviews.map((review, index) => (
										<div key={index}>
											<div className='p-4 mb-4 bg-bg/60'>
												<p className='font-semibold text-[18px]'>
													{review.name}
												</p>
												<p className='text-gray text-xs font-semibold mb-4'>
													{review.createdAt}
												</p>
												<p className='font-semibold text-[18px] text-gray'>
													{review.review}
												</p>
											</div>
										</div>
									))
								) : (
									<p className='text-gray-500'>Немає відгуків.</p>
								)}
							</div>
						</TabsContent>
					</Tabs>
				</div>
				<div className='w-[385px] flex flex-col gap-6'>
					<div className='h-36 w-full p-2 bg-white flex flex-col justify-between'>
						<p
							className={
								isAvailable
									? 'text-green text-lg font-semibold'
									: 'text-red-900 text-lg font-semibold'
							}
						>
							{isAvailable ? '● В наявності' : '○ Немає в наявності'}
						</p>

						{currentParams.RetailPriceWithDiscount ===
						currentParams.RetailPrice ? (
							<p className='text-black text-[40px] font-semibold'>
								{formatPrice(currentParams.RetailPrice)} грн.
							</p>
						) : (
							<>
								<p className='line-through text-[20px] font-bold'>
									{formatPrice(currentParams.RetailPrice)} грн.
								</p>
								<p className='text-red-900 text-[40px] font-semibold'>
									{formatPrice(currentParams.RetailPriceWithDiscount)} грн.
								</p>
							</>
						)}
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
								<Button
									onClick={handleAddToCart}
									className='px-18 py-2 bg-[#D81C1B] hover:bg-[#D81C1B]/80 flex-1'
								>
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
							{availableStorages.length > 0 ? (
								availableStorages.map((storage, index) => (
									<div key={index} className='flex justify-between text-[16px]'>
										<span>{storageMap[storage.location]}</span>
									</div>
								))
							) : (
								<p className='text-gray-500'>Товар немає на складах</p>
							)}
						</div>
					</Accord>
					<Accord title='Доставка'>
						<div className='flex flex-col gap-2 text-xs'>
							<div className='flex justify-between text-[16px]'>
								<span>Самовивіз зі складу:</span>
								<span className='text-[#3C9F3A]'> Безкоштовно</span>
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
