'use client'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from '../ui/carousel'
import { useFetchImages } from '@/hooks/useFetchImages'
import { Loading } from '../Loading'

export const Gallery = ({ offerId }: { offerId: string | number }) => {
	const { images, loading, error } = useFetchImages(offerId)

	const [mainApi, setMainApi] = useState<CarouselApi>()
	const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)

	const mainImage = useMemo(
		() =>
			Array.isArray(images) &&
			images.map((image, index) => (
				<CarouselItem key={index} className='relative aspect-square w-full'>
					<Image
						src={`data:image/jpeg;base64,${image.buffer}`}
						alt={`Carousel Main Image ${index + 1}`}
						fill
						style={{ objectFit: 'cover' }}
						className='rounded'
					/>
				</CarouselItem>
			)),
		[images]
	)

	const thumbnailImages = useMemo(
		() =>
			Array.isArray(images) &&
			images.map((image, index) => (
				<CarouselItem
					key={index}
					className='relative aspect-square w-full basis-1/4 h-32 mr-1 last:mr-0'
					onClick={() => handleClick(index)}
				>
					<Image
						className={`rounded ${index === current ? 'border-2' : ''}`}
						src={`data:image/jpeg;base64,${image.buffer}`}
						fill
						alt={`Carousel Thumbnail Image ${index + 1}`}
						style={{ objectFit: 'cover' }}
					/>
				</CarouselItem>
			)),
		[images, current]
	)

	useEffect(() => {
		if (!mainApi || !thumbnailApi) {
			return
		}

		const handleTopSelect = () => {
			const selected = mainApi.selectedScrollSnap()
			setCurrent(selected)
			thumbnailApi.scrollTo(selected)
		}

		const handleBottomSelect = () => {
			const selected = thumbnailApi.selectedScrollSnap()
			setCurrent(selected)
			mainApi.scrollTo(selected)
		}

		mainApi.on('select', handleTopSelect)
		thumbnailApi.on('select', handleBottomSelect)

		return () => {
			mainApi.off('select', handleTopSelect)
			thumbnailApi.off('select', handleBottomSelect)
		}
	}, [mainApi, thumbnailApi])

	const handleClick = (index: number) => {
		if (!mainApi || !thumbnailApi) {
			return
		}
		thumbnailApi.scrollTo(index)
		mainApi.scrollTo(index)
		setCurrent(index)
	}

	if (loading) {
		return <Loading />
	}

	if (error) {
		return <p>{error}</p>
	}

	return (
		<div>
			<Carousel setApi={setMainApi} className='mb-4'>
				<CarouselContent className='max-h-96'>{mainImage}</CarouselContent>
			</Carousel>
			<Carousel setApi={setThumbnailApi}>
				<CarouselContent>{thumbnailImages}</CarouselContent>
			</Carousel>
		</div>
	)
}
