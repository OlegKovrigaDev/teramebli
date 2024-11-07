export interface Category {
	_id: string
	id: number
	name: string
	parentId: number | null
	totalItems?: number
}

export interface ProductParams {
	Articul: string
	RetailPrice: number
	RetailPriceWithDiscount: number
	'Відображення на сайті': string | number
	'Назва товару': string
	Уцінка: string
	'Одиниця виміру': string
	'Название товара': string
	Упаковка: string
	'Розмір упаковки': string
	'К-сть штук в ящику': string
	Closeout: string
	MesUnit: string
	Знижка: string
	Виробник: string
	groupId: string
	ModelName: string
	ModelNameRu: string
	Колір: string
	Цвет: string
	'Розділ синхронізації': string
	'Кількість на складі': number
	'Термін гарантії': string
	'Приналежність до категорії': string
	'Одиниця виміру терміну гарантії'?: string
	'Розділ синхронізації повністю'?: string
	'Габаритні розміри (висота, см)_Габаритные размеры (высота, см)'?: string
	'Габаритні розміри (довжина, см)_Габаритные размеры (длина, см)'?: string
	'Габаритні розміри (ширина, см)_Габаритные размеры (ширина, см)'?: string
	'Додатково ліжка(сайт ліжка)'?: string
	'Матеріал ліжка(сайт ліжка)'?: string
	'Ніша для білизни(сайт ліжка)'?: string
	'Основа під матрац(сайт ліжка)'?: string
	'Підйомний механізм(сайт ліжка)'?: string
	'Розмір спального місця (ширина, см)_Размер спального места (ширина, см)'?: string
	'Розмір спального місця (довжина, см)_Размер спального места (длина, см)'?: string
	'Тип ліжка(сайт ліжка)'?: string
	'Опис текст(сайт)'?: string
	'Описание(сайт)'?: string
	items?: ProductItem[]
}
export interface ProductItem {
	id: string
	name: string
	price: number
	categoryId: string
	groupId: string
	ModelName: string
}

export type StorageKey =
	| 'paramsFrom_01_MebliBalta'
	| 'paramsFrom_02_MebliPodilsk'
	| 'paramsFrom_03_MebliPervomaisk'
	| 'paramsFrom_04_MebliOdesa1'
	| 'paramsFrom_05_MebliVoznesensk'

type StorageParams = {
	[K in StorageKey]?: ProductParams
}

export interface Product extends StorageParams {
	offerId: string
	available: boolean
	categoryId: string
	createdAt: string
	currencyId: string
	variants: ProductItem[]
	[key: string]: any
}

export interface CategoryWithProducts {
	category: Category
	products: Product[]
	totalProducts: number
	totalPages: number
	currentPage: number
}

export interface ProductImage {
	offerId: string
	buffer: string
}

export interface UseProductSearchResult {
	query: string
	setQuery: (query: string) => void
	searchResults: Product[] | undefined
	total: number
	isLoading: boolean
	error: any
	totalPages: number
	currentPage: number
	setPage: (page: number) => void
}
