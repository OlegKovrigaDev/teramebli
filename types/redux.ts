export interface Category {
  _id: string;
  id: number;
  name: string;
  parentId: number | null;
}

export interface ProductParams {
  Articul: string;
  RetailPrice: string;
  RetailPriceWithDiscount: string;
  "Відображення на сайті": string;
  ModelName: string;
  GoodNameUA: string;
  Уцінка: string;
  "Одиниця виміру": string;
  Знижка: string;
  "Приналежність до категорії": string;
  "Одиниця виміру терміну гарантії"?: string;
  "Розділ синхронізації повністю"?: string;
  "Габарит.розміри.Висота(см)(сайт)"?: string;
  "Габарит.розміри.Довжина(см)(сайт)"?: string;
  "Габарит.розміри.Ширина(см)(сайт)"?: string;
  "Додатково ліжка(сайт ліжка)"?: string;
  "Матеріал ліжка(сайт ліжка)"?: string;
  "Ніша для білизни(сайт ліжка)"?: string;
  "Основа під матрац(сайт ліжка)"?: string;
  "Підйомний механізм(сайт ліжка)"?: string;
  "Роз.спал.місц.ширина(см)(сайт)"?: string;
  "Розм.спал.місц.Довжина(см)(сайт)"?: string;
  "Тип ліжка(сайт ліжка)"?: string;
  "Опис текст(сайт)"?: string;
}

export interface Product {
  offerId: string;
  available: boolean;
  categoryId: string;
  createdAt: string;
  currencyId: string;
  params: ProductParams;
  type: string;
  updatedAt: string;
}

export interface CategoryWithProducts {
  category: Category;
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}

export interface ProductImage {
  offerId: string;
  buffer: string;
}
