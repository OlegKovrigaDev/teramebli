import { useState, useEffect } from "react";
import axios from "axios";

interface UseFetchImagesResult {
  images: string[];
  loading: boolean;
  error: string | null;
}

export const useFetchImages = (offerId: string): UseFetchImagesResult => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:3005/api/product/photo/${offerId}`
        );
        const photoData = response.data.files;

        if (photoData) {
          setImages(photoData);
        }
      } catch (err) {
        setError("Error fetching images");
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [offerId]);

  return { images, loading, error };
};
