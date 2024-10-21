import { useState, useEffect } from 'react'
import axios from 'axios'

interface UseFetchImagesResult {
	images: string[]
	img: string[]
	loading: boolean
	error: string | null
}

export const useFetchImages = (
	offerId: string | number
): UseFetchImagesResult => {
	const [images, setImages] = useState<string[]>([])
	const [img, setImg] = useState<string[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchImages = async () => {
			setLoading(true)
			setError(null)

			try {
				const response = await axios.get(
					`http://localhost:3005/api/product/photo/${offerId}`
				)
				const photoData = response.data.files

				if (photoData) {
					setImages(photoData.files)
					setImg(photoData.files[0])
				}
			} catch (err) {
				setError('Error fetching images')
				console.error('Error fetching images:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchImages()
	}, [offerId])

	return { images, img, loading, error }
}
