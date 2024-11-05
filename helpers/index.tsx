import { Section } from '@/components/shared/section'

export const processBoldSpan = (text: string) => {
	if (text.includes("<span className='font-semibold'>")) {
		return text.split("<span className='font-semibold'>").map((t, index) => {
			if (index > 0) {
				const [boldText, rest] = t.split('</span>')
				return (
					<span key={index}>
						<b>{boldText}</b>
						{rest}
					</span>
				)
			} /*  else {
				return <span key={index}>{t}</span>
			} */
		})
	} else {
		return <span>{text}</span>
	}
}

interface DataItem {
	title: string
	content: (string | string[])[]
}

export default function RenderSections({ data }: { data: DataItem[] }) {
	return (
		<>
			{data.map(({ title, content }, i) => (
				<Section key={i} title={title} size='md'>
					{content.map((item, itemIndex) => {
						if (Array.isArray(item)) {
							return (
								<ul key={`${i}-${itemIndex}`} className='list-disc ml-6'>
									{item.map((list, listIndex) => (
										<li key={`${i}-${itemIndex}-${listIndex}`}>
											{processBoldSpan(list)}
										</li>
									))}
								</ul>
							)
						} else {
							return <p key={`${i}-${itemIndex}`}>{processBoldSpan(item)}</p>
						}
					})}
				</Section>
			))}
		</>
	)
}

export const formatPrice = (price: string | number | undefined) => {
	if (price === undefined) return '0'
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
