import { createSelector } from "reselect";
import { RootState } from "./index";
import { CartItem } from "@/types/cart";

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

  export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

  export const selectCartTotal = (state: RootState): number => {
    return state.cart.items.reduce((total, item) => {
      const price = item.RetailPriceWithDiscount ?? item.RetailPrice;
      return total + price * item.quantity;
    }, 0);
  };
  
  export const selectCartItemCount = (state: RootState): number => {
    return state.cart.items.reduce((count, item) => count + item.quantity, 0);
  };