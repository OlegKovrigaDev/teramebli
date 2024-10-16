'use client'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from '../ui/carousel'

export const Gallery = ({
	images = [
		'/delete/slide.jpg',
		'/delete/slide.jpg',
		'/delete/slide.jpg',
		'/delete/slide.jpg',
		'/delete/slide.jpg',
	],
}) => {
	const [mainApi, setMainApi] = useState<CarouselApi>()
	const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)

	const mainImage = useMemo(
		() =>
			images.map((image, index) => (
				<CarouselItem key={index} className='relative aspect-square w-full'>
					<Image
						src={image}
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
			images.map((image, index) => (
				<CarouselItem
					key={index}
					className='relative aspect-square w-full basis-1/4 h-32 mr-1 last:mr-0'
					onClick={() => handleClick(index)}
				>
					<Image
						className={`rounded ${index === current ? 'border-2' : ''}`}
						src={image}
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
