import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui'
import { header } from '@/constants'
import { ChevronDown, Headset } from 'lucide-react'
import Link from 'next/link'

const contact = header[3].contact

export const Contact = () => (
	<DropdownMenu>
		<DropdownMenuTrigger className='contact-trigger'>
			<Headset />
			<div>
				<p className='contact-tel'>{contact && contact[0].tel}</p>
				<p className='text level-text'>{header[3].text}</p>
			</div>
			<ChevronDown size={16} />
		</DropdownMenuTrigger>
		<DropdownMenuContent className='contact-content'>
			{/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
			{/* <DropdownMenuSeparator /> */}
			<DropdownMenuItem>
				{contact &&
					contact.map((item, i) => (
						<Link key={i} href={item.link}>
							{item.tel}
						</Link>
					))}
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
)
