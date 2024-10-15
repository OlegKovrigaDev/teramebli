import { createSelector } from "reselect";
import { RootState } from "./index";

export const selectAllCategories = (state: RootState) =>
  state.categoryApi.queries["fetchCategories(undefined)"]?.data;

export const selectSubcategoriesByParentId = (parentId: number) =>
  createSelector(
    (state: RootState) => state.categoryApi.queries,
    (queries) => queries[`fetchSubcategories(${parentId})`]?.data || []
  );

export const selectCategoryProducts = (
  categoryId: number,
  page: number,
  limit: number
) =>
  createSelector(
    (state: RootState) => state.categoryApi.queries,
    (queries) => {
      const queryKey = `fetchCategoryWithProducts({"categoryId":${categoryId},"page":${page},"limit":${limit}})`;
      return queries[queryKey]?.data;
    }
  );

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce(
    (total, item) =>
      total + parseFloat(item.RetailPriceWithDiscount) * item.quantity,
    0
  )
);

export const selectCartItemCount = createSelector(selectCartItems, (items) =>
  items.reduce((count, item) => count + item.quantity, 0)
);
