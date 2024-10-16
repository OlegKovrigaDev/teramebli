import { Button } from '@/components/ui'
import { Minus, Plus, Trash } from 'lucide-react'

export const CartProduct = () => {
	return (
		<div className='flex gap-2 border-b border-gray/20 py-4 relative'>
			{/* <img
				src='/Categories/Cat1.jpg'
				alt=''
				className='w-40 h-32 bg-bg rounded'
			/> */}
			<div className='w-40 h-32 bg-bg rounded' />
			<div className='flex flex-col gap-2 justify-between'>
				<h3 className='font-medium'>Двоярусне ліжко "Аляска" від MebiGrand</h3>
				<p className='text-4.5 font-semibold'>12 499 грн.</p>
				<div className='flex'>
					<Button className='w-12 h-8 bg-gray/20 text-black hover:text-white rounded-e-none rounded-s'>
						<Minus size={24} />
					</Button>
					<div className='w-10 h-8 text-4.5 font-semibold border-t border-b border-gray/20 bg-bg flex center'>
						1
					</div>
					<Button className='w-12 h-8 bg-gray/20 text-black hover:text-white rounded-s-none rounded-e'>
						<Plus size={24} />
					</Button>
				</div>
			</div>
			<Button variant='ghost' size='icon' className='absolute right-0'>
				<Trash size={24} className='text-red-900' />
			</Button>
		</div>
	)
}
