import {
  Category,
  CategoryWithProducts,
  Product,
  ProductImage,
} from "@/types/redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://teramebli-api.onrender.com/api";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchCategories: builder.query<Category[], void>({
      query: () => "/category",
      transformResponse: (response: Category[]) =>
        response.filter(
          (category) =>
            category.parentId === null || category.parentId === undefined
        ),
    }),
    fetchSubcategories: builder.query<Category[], number>({
      query: (parentId) => `/category/sub/${parentId}`,
    }),
    fetchCategoryWithProducts: builder.query<
      CategoryWithProducts,
      { categoryId: number; page?: number; limit?: number }
    >({
      query: ({ categoryId, page = 1, limit = 10 }) =>
        `/category/${categoryId}?page=${page}&limit=${limit}`,
    }),
    fetchProductById: builder.query<Product, string>({
      query: (offerId) => `/product/${offerId}`,
    }),
    fetchCategoryById: builder.query<Category, number>({
      query: (id) => `/category/${id}`,
    }),
    fetchProductImages: builder.query<ProductImage[], string>({
      query: (offerId) => `/product/photo/${offerId}`,
      transformResponse: (response: { files: ProductImage[] }) =>
        response.files,
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
  useFetchSubcategoriesQuery,
  useFetchCategoryWithProductsQuery,
  useFetchProductByIdQuery,
  useFetchCategoryByIdQuery,
  useFetchProductImagesQuery,
} = categoryApi;
