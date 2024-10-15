import { useFetchProductByIdQuery } from "@/api/categoryApi";

export const useProductData = (offerId: string) => {
  const { data: product, error, isLoading } = useFetchProductByIdQuery(offerId);

  let mainCategory = "Не указано";
  let mainCategoryId = "Не указано";
  let subCategory = "";
  let subCategoryId = "";

  if (product) {
    const fullCategorySync = product.params["Розділ синхронізації повністю"];
    const categoryParts = fullCategorySync ? fullCategorySync.split(";") : [];

    mainCategory = categoryParts[0]?.split("=")[1]?.trim() || mainCategory;
    mainCategoryId = categoryParts[0]?.split("=")[0]?.trim() || mainCategoryId;

    if (categoryParts.length > 1) {
      subCategory = categoryParts[1].split("=")[1]?.trim() || "";
      subCategoryId = categoryParts[1].split("=")[0]?.trim() || "";
    }
  }

  return {
    product,
    error,
    isLoading,
    mainCategory,
    mainCategoryId,
    subCategory,
    subCategoryId,
  };
};
