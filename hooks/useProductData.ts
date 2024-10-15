import { useFetchProductByIdQuery } from "@/api/categoryApi";

export const useProductData = (offerId: string) => {
  const { data: product, error, isLoading } = useFetchProductByIdQuery(offerId);

  return { product, error, isLoading };
};
