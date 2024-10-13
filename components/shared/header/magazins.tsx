import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui'
import { header } from '@/constants'
import { MapPinned } from 'lucide-react'
import { List } from '../list'

export const Magazins = () => {
	return (
		<HoverCard>
			<HoverCardTrigger className='magazins-trigger'>
				<MapPinned size={24} />
				<span className='text'>{header[2].text}</span>
			</HoverCardTrigger>
			<HoverCardContent className='magazins-content'>
				<List
					items={header[2].magazine}
					className='magazins-list'
					renderItem={({ town, address, time }) => (
						<div className='magazins-list-content'>
							<MapPinned size={24} />
							<div className='magazins-list-texts'>
								<p className='magazins-list-text'>{town}</p>
								<p>{address}</p>
								<p>{time}</p>
							</div>
						</div>
					)}
				/>
			</HoverCardContent>
		</HoverCard>
	)
}
