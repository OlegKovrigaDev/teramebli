import Link from 'next/link'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '../ui/breadcrumb'

interface BreadcrumbProps {
	categoryName?: string
	categoryId?: string
	parentCategoryName?: string
	parentCategoryId?: string
	subcategoryName?: string
	subcategoryId?: string
	productName?: string
	customBreadcrumb?: Array<{ name: string; url?: string }>
	homeLinkLabel?: string
	homeLinkUrl?: string
	currentCategoryId?: string
}

export function CrumbsLinks({
	categoryName,
	categoryId,
	parentCategoryName,
	parentCategoryId,
	subcategoryName,
	subcategoryId,
	productName,
	customBreadcrumb,
	homeLinkLabel = 'Головна',
	homeLinkUrl = '/',
	currentCategoryId,
}: BreadcrumbProps) {
	const trimName = (name: string) => name.split('_')[0]

	return (
		<Breadcrumb className='py-7'>
			<BreadcrumbList className='text-lg flex items-center'>
				<BreadcrumbItem className='flex items-center'>
					<BreadcrumbLink asChild>
						<Link href={homeLinkUrl}>
							<span className='flex items-center'>{homeLinkLabel}</span>
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				{customBreadcrumb &&
					customBreadcrumb.map((item, index) => (
						<div key={index}>
							<BreadcrumbItem className='text-xl'>
								{item.url ? (
									<BreadcrumbLink asChild>
										<Link href={item.url}>{item.name}</Link>
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage className='text-xl font-bold'>
										{item.name}
									</BreadcrumbPage>
								)}
							</BreadcrumbItem>
							{index < customBreadcrumb.length - 1 && <BreadcrumbSeparator />}
						</div>
					))}

				{parentCategoryName && parentCategoryId && (
					<>
						<BreadcrumbItem className='text-xl'>
							<BreadcrumbLink asChild>
								<Link href={`/category/${parentCategoryId}`}>
									{trimName(parentCategoryName)}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</>
				)}

				{categoryName && categoryId && (
					<>
						<BreadcrumbItem className='text-xl'>
							{currentCategoryId === categoryId ? (
								<BreadcrumbPage className='text-xl font-bold'>
									{trimName(categoryName)}
								</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link href={`/category/${categoryId}`}>
										{trimName(categoryName)}
									</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{subcategoryName && <BreadcrumbSeparator />}
					</>
				)}

				{subcategoryName && subcategoryId && (
					<>
						<BreadcrumbItem className='text-xl'>
							{currentCategoryId === subcategoryId ? (
								<BreadcrumbPage className='text-xl font-bold'>
									{trimName(subcategoryName)}
								</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link href={`/category/${subcategoryId}`}>
										{trimName(subcategoryName)}
									</Link>
								</BreadcrumbLink>
							)}
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
