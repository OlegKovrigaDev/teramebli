import { Button } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Accord } from '../accord'

export const ProductFilter = ({ title }: { title: string }) => {
	return (
		<Accord title={title}>
			<div className='flex flex-col gap-2 text-xs w-full'>
				{[{ id: 1, type: 'Односпальні', count: 24 }].map(
					({ id, type, count }) => (
						<div key={id} className='flex justify-between text-[16px]'>
							<span className='flex gap-2 items-center'>
								<Checkbox id={`variant-${id}`} className='border-2 rounded' />
								<Label htmlFor={`variant-${id}`}>{type}</Label>
							</span>
							<span>[{count}]</span>
						</div>
					)
				)}

				<Button className='mt-6 px-20 py-2 bg-red-800 hover:bg-red-800/80'>
					Застосувати
				</Button>
			</div>
		</Accord>
	)
}
