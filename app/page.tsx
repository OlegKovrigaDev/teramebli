import { Advantages, Categories, Ethaps, Hero } from '@/components/shared'
import { ProductSlider } from '@/components/shared/product/ProductSlider'
import { Section } from '@/components/shared/section'
import { home, products } from '@/constants'

export default function Home() {
	return (
		<>
			<Hero />
			<Advantages />
			<Categories />
			<Ethaps />
			<Section title={home.interesrProduct.title}>
				{/* <ProductSlider arr={products} /> */}
			</Section>
			<Section title={home.newProduct.title}>
				{/* <ProductSlider arr={products} /> */}
			</Section>
		</>
	)
}
