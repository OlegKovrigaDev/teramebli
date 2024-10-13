import { ad } from '@/constants'
import { List } from './list'

export const Ad = () => {
	return (
		<div className='ad'>
			<List
				items={ad}
				className='ad-list'
				renderItem={({ text }) => <span>{text}</span>}
			/>
		</div>
	)
}
