'use client'
import { Loading } from '@/components/Loading'
import { Advantages, Categories, Ethaps, Hero } from '@/components/shared'
import { ProductSlider } from '@/components/shared/product/ProductSlider'
import { Section } from '@/components/shared/section'
import { home } from '@/constants'
import { useRandomProducts } from '@/hooks/useRandomProducts'

export default function Home() {
	const { randomProducts } = useRandomProducts(1, 30, 6)
	const { randomProducts: randomProducts2 } = useRandomProducts(4, 30, 6)

	if (!randomProducts || !randomProducts2) return <Loading />

	return (
		<>
			<Hero />
			<Section title={home.newProduct.title}>
				<ProductSlider arr={randomProducts2} />
			</Section>
			<Ethaps />
			<Categories />
			<Section title={home.interesrProduct.title}>
				<ProductSlider arr={randomProducts} />
			</Section>
			<Advantages />
		</>
	)
}
