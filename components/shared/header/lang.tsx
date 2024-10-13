import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui'
import { header } from '@/constants'

const lang = header[4].lang

export const Lang = () => (
	<Select defaultValue={lang && lang[0].value}>
		<SelectTrigger className='lang-trigger'>
			<div className='lang-trigger-container'>
				<SelectValue placeholder={lang && lang[0].text} />
				<span className='text level-text'>{header[4].text}</span>
			</div>
		</SelectTrigger>
		<SelectContent>
			{lang &&
				lang.map(({ value, text }, i) => (
					<SelectItem key={i} value={value}>
						{text}
					</SelectItem>
				))}
		</SelectContent>
	</Select>
)
