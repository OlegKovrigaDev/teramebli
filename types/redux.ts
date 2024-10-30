export interface Category {
	_id: string
	id: number
	name: string
	parentId: number | null
	totalItems?: number
}

export interface ProductParams {
	Articul: string
	RetailPrice: string
	RetailPriceWithDiscount: string
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
	'Розділ синхронізації': string
	'Кількість на складі': string
	'Термін гарантії': string
	'Приналежність до категорії': string
	'Одиниця виміру терміну гарантії'?: string
	'Розділ синхронізації повністю'?: string
	'Габарит.розміри.Висота(см)(сайт)'?: string
	'Габарит.розміри.Довжина(см)(сайт)'?: string
	'Габарит.розміри.Ширина(см)(сайт)'?: string
	'Додатково ліжка(сайт ліжка)'?: string
	'Матеріал ліжка(сайт ліжка)'?: string
	'Ніша для білизни(сайт ліжка)'?: string
	'Основа під матрац(сайт ліжка)'?: string
	'Підйомний механізм(сайт ліжка)'?: string
	'Роз.спал.місц.ширина(см)(сайт)'?: string
	'Розм.спал.місц.Довжина(см)(сайт)'?: string
	'Тип ліжка(сайт ліжка)'?: string
	'Опис текст(сайт)'?: string
	'Описание(сайт)'?: string
}

export interface Product extends ProductCardProps {
	offerId: string
	available: boolean
	categoryId: string
	createdAt: string
	currencyId: string
	paramsFrom_01_MebliBalta: ProductParams
	paramsFrom_02_MebliPodilsk: ProductParams
	paramsFrom_03_MebliPervomaisk: ProductParams
	paramsFrom_04_MebliOdesa1: ProductParams
	paramsFrom_05_MebliVoznesensk: ProductParams
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

export interface ProductCardProps {
	product: Product
}
