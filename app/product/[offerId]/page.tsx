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
import { useProductVariantsByGroupId } from '@/hooks/product/useProductVariantsByGroupId'
import { addToCart } from '@/store/cartSlice'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

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

	const { productVariants } = useProductVariantsByGroupId(offerId)

	if (isLoading) return <Loading />
	if (error)
		return (
			<p className='text-red-500'>
				Ошибка при загрузке: {JSON.stringify(error)}
			</p>
		)
	if (!product || !currentParams)
		return <p className='text-gray-500'>Товар не найден</p>

	const isAvailable = currentParams['Кількість на складі'] > 0

	const handleAddToCart = () => {
		const cartItem = {
			offerId: product.offerId,
			ModelName: currentParams?.['Назва товару'],
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
				productName={currentParams['Назва товару']}
			/>
			<div className='flex flex-col xl:flex-row justify-between pb-16'>
				<div className='w-full xl:w-[865px] flex flex-col gap-6'>
					<Gallery offerId={offerId} />
					<Tabs defaultValue='description' className='w-full mb-6'>
						<TabsList className='bg-white overflow-x-scroll overflow-y-hidden flex justify-start py-6 rounded'>
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
				<div className='xl:w-[385px] flex flex-col md:flex-row xl:flex-col gap-2 md:gap-6 '>
					<div className='flex flex-col gap-6 md:w-1/2 xl:w-full'>
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

						<Button
							onClick={handleAddToCart}
							className='px-18 py-2 bg-gray hover:bg-gray/90 flex-1'
						>
							Купити
						</Button>

						<Accord title='Варіанти товару'>
							<div className='flex flex-col gap-6 text-xs w-full'>
								<div className='flex gap-2'>
									<div className='w-[86px] h-[74px] bg-accent rounded' />
									<div className='text-xs font-semibold'>
										<div className='flex flex-col w-full items-end'>
											<h3>Диван Elegant Арен 155x93 см темно-сірий</h3>
											<p className='text-green'>● В наявності</p>
											<div>
												<span className='line-through mr-2'>13 000 грн.</span>
												<span className='text-red-900 text-[18px]'>
													12 499 грн.
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className='flex gap-2'>
									<div className='w-[86px] h-[74px] bg-accent rounded' />
									<div className='text-xs font-semibold'>
										<div className='flex flex-col w-full items-end'>
											<h3>Диван Elegant Арен 155x93 см темно-сірий</h3>
											<p className='text-green'>● В наявності</p>
											<div>
												<span className='line-through mr-2'>13 000 грн.</span>
												<span className='text-red-900 text-[18px]'>
													12 499 грн.
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className='flex gap-2'>
									<div className='w-[86px] h-[74px] bg-accent rounded' />
									<div className='text-xs font-semibold'>
										<div className='flex flex-col w-full items-end'>
											<h3>Диван Elegant Арен 155x93 см темно-сірий</h3>
											<p className='text-green'>● В наявності</p>
											<div>
												<span className='line-through mr-2'>13 000 грн.</span>
												<span className='text-red-900 text-[18px]'>
													12 499 грн.
												</span>
											</div>
										</div>
									</div>
								</div>
								{productVariants.length > 0 ? (
									productVariants.map((variant, index) => (
										<div
											key={index}
											className='flex justify-between text-[16px]'
										>
											<span className='flex gap-2 items-center'>
												<Checkbox
													id={`variant-${variant.variantId}`}
													className='border-2 rounded'
												/>
												<Label htmlFor={`variant-${variant.variantId}`}>
													{variant.name}
												</Label>
											</span>
											<span>[{variant.quantity}]</span>
										</div>
									))
								) : (
									<p className='text-gray-500'>Варианты товара не найдены</p>
								)}
								<Link href='/' className='text-[#4E3A9F] mt-4'>
									Згорнути
								</Link>
							</div>
						</Accord>

						<Accord title='Наявність в магазинах'>
							<div className='flex flex-col gap-2 text-xs w-full'>
								{availableStorages.length > 0 ? (
									availableStorages.map((storage, index) => (
										<div
											key={index}
											className='flex justify-between items-center text-[16px]'
										>
											<span>
												{
													storageMap[
														storage.location as keyof typeof storageMap
													]
												}
											</span>
											<Check className='text-green' />
										</div>
									))
								) : (
									<p className='text-gray-500'>Товару немає на складах</p>
								)}
							</div>
						</Accord>
					</div>
					<div className='flex flex-col gap-6 md:w-1/2 xl:w-full'>
						<Accord title='Доставка'>
							<div className='flex flex-col gap-2 text-xs w-full'>
								<div className='flex justify-between text-[16px]'>
									<span className='font-medium'>Самовивіз зі складу:</span>
									<span className='font-medium text-[#3C9F3A]'>
										{' '}
										Безкоштовно
									</span>
								</div>
								<p className='text-xs font-semibold'>
									Безкоштовне самовивезення можливе за наявності товару на цьому
									складі. Якщо товар знаходиться на віддаленому складі або
									необхідно переміщення з іншого магазину, вартість погоджується
									з менеджером
								</p>
								<p className='text-xs font-semibold'>
									При самовивезенні з магазину, винесення та навантаження
									здійснюється самотужки
								</p>
								<div className='flex justify-between text-[16px] font-medium'>
									<span>Доставка по Києву</span>
									<span>599 грн</span>
								</div>
								<div className='flex justify-between text-[16px] font-medium'>
									<span>По Україні від:</span>
									<span>599 грн</span>
								</div>
							</div>
						</Accord>
						<Accord title='Оплата'>
							<div className='flex flex-col gap-2 text-xs'>
								<p className='font-semibold'>
									Готівкою або через термінал у магазині, безготівковий
									розрахунок, карткою, розстрочка, оплата частинами, Whitepay
									crypto
								</p>
								<Link href='/' className='text-[#4E3A9F] font-semibold'>
									Дізнатися всі умови
								</Link>
							</div>
						</Accord>
						<Accord title='Гарантія та повернення'>
							<div className='flex flex-col gap-2 text-xs'>
								<p className='font-semibold'>
									Гарантія від виробника до 2 років до 24 місяців з моменту
									покупки. Гарантійний термін починається з доставки виробу
									клієнту додому. 14 днів з наступного дня після доставки виробу
									додому ви маєте право обміняти або повернути куплений товар.
								</p>
								<Link href='/' className='text-[#4E3A9F] font-semibold'>
									Дізнатися всі умови
								</Link>
							</div>
						</Accord>
					</div>
				</div>
			</div>
		</>
	)
}
