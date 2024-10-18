import { useEffect, useState } from "react";
import { ProductImage } from "@/types/redux";
import { useFetchProductImagesQuery } from "@/api/categoryApi";

export const useProductImages = (offerId: string) => {
  const { data, error, isLoading } = useFetchProductImagesQuery(offerId);
  const [images, setImages] = useState<ProductImage[]>([]);

  useEffect(() => {
    if (data) {
      setImages(data);
    }
  }, [data]);

  return {
    images,
    error,
    isLoading,
  };
};
