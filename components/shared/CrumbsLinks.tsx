import Link from 'next/link'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '../ui/breadcrumb'
import { split } from 'postcss/lib/list'

interface BreadcrumbProps {
	categoryName?: string
	categoryId?: string
	subcategoryName?: string
	subcategoryId?: string
	productName?: string
}

export function CrumbsLinks({
	categoryName,
	categoryId,
	subcategoryName,
	subcategoryId,
	productName,
}: BreadcrumbProps) {
	const trimName = (name: string) => name.split('_')[0]

	return (
		<Breadcrumb className='py-7'>
			<BreadcrumbList className='text-lg'>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href='/'>Головна</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				{categoryName && categoryId && (
					<>
						<BreadcrumbItem className='text-xl'>
							<BreadcrumbLink asChild>
								<Link href={`/category/${categoryId}`}>
									{trimName(categoryName)}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						{subcategoryName && <BreadcrumbSeparator />}
					</>
				)}

				{subcategoryName && subcategoryId && (
					<>
						<BreadcrumbItem className='text-xl'>
							<BreadcrumbLink asChild>
								<Link href={`/category/${subcategoryId}`}>
									{trimName(subcategoryName)}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</>
				)}

				{productName && (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage className='text-xl font-bold'>
								{productName}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
