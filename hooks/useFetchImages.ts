import { useState, useEffect } from 'react'
import axios from 'axios'

interface imageDate {
	name: string
	buffer: string
}
interface UseFetchImagesResult {
	images: imageDate[]
	img: {
		name: string
		buffer: string
	}
	loading: boolean
	error: string | null
}

export const useFetchImages = (
	offerId: string | number
): UseFetchImagesResult => {
	const [images, setImages] = useState<imageDate[]>([])
	const [img, setImg] = useState<imageDate>({ name: '', buffer: '' })
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
					setImg(photoData.files[0])
					setImages(photoData.files)
				} else {
					setImg({
						name: '404',
						buffer: '/delete/404.jpg',
					})
				}
			} catch (err) {
				setError('Error fetching images')
			} finally {
				setLoading(false)
			}
		}

		fetchImages()
	}, [offerId])

	return { images, img, loading, error }
}
