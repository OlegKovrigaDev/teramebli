import { CartItem, OrderFormData } from '@/types/cart'
import {
	Category,
	CategoryWithProducts,
	Product,
	ProductImage,
} from '@/types/redux'
import { Review } from '@/types/review'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://teramebli-api.onrender.com/api'

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: builder => ({
		fetchCategories: builder.query<Category[], void>({
			query: () => '/category',
			transformResponse: (response: Category[]) =>
				response.filter(
					category =>
						category.parentId === null || category.parentId === undefined
				),
		}),
		fetchSubcategories: builder.query<Category[], number>({
			query: parentId => `/category/sub/${parentId}`,
		}),
		fetchCategoryWithProducts: builder.query<
			CategoryWithProducts,
			{ categoryId: number; page?: number; limit?: number }
		>({
			query: ({ categoryId, page = 1, limit = 10 }) =>
				`/category/${categoryId}?page=${page}&limit=${limit}`,
		}),
		fetchProductById: builder.query<Product, string>({
			query: offerId => `/product/${offerId}`,
		}),
		fetchCategoryById: builder.query<Category, number>({
			query: id => `/category/${id}`,
		}),
		fetchProductImages: builder.query<ProductImage[], string>({
			query: offerId => `/product/photo/${offerId}`,
			transformResponse: (response: { files: ProductImage[] }) =>
				response.files,
		}),
		searchProducts: builder.query<
			{ results: Product[]; total: number },
			{ info: string; page: number; limit: number }
		>({
			query: ({ info, page, limit }) =>
				`/search?info=${info}&page=${page}&limit=${limit}`,
		}),
		submitOrder: builder.mutation<
			void,
			{ form: OrderFormData; cartItems: CartItem[]; total: number }
		>({
			query: ({ form, cartItems, total }) => ({
				url: '/order',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					form,
					cartItems,
					total,
				}),
			}),
		}),
		addProductReview: builder.mutation<void, Review>({
			query: ({ name, review }) => ({
				url: '/reviews',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					review,
				}),
			}),
		}),
		fetchReviewsByOfferId: builder.query<Review[], string>({
			query: offerId => `/reviews/${offerId}`,
			transformResponse: (response: { reviews: Review[] }) => response.reviews,
		}),
	}),
})

export const {
	useFetchCategoriesQuery,
	useFetchSubcategoriesQuery,
	useFetchCategoryWithProductsQuery,
	useFetchProductByIdQuery,
	useFetchCategoryByIdQuery,
	useFetchProductImagesQuery,
	useSearchProductsQuery,
	useSubmitOrderMutation,
	useAddProductReviewMutation,
	useFetchReviewsByOfferIdQuery,
} = categoryApi
