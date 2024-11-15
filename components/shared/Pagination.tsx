import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react'
import { Button } from '../ui'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	if (totalPages <= 1) return null

	const generatePageNumbers = () => {
		const pages = []
		const maxDisplayed = 5
		let start = Math.max(1, currentPage - Math.floor(maxDisplayed / 2))
		let end = start + maxDisplayed - 1

		if (end > totalPages) {
			end = totalPages
			start = Math.max(1, end - maxDisplayed + 1)
		}

		for (let i = start; i <= end; i++) {
			pages.push(i)
		}

		return pages
	}

	const pageNumbers = generatePageNumbers()

	return (
		<div className='mt-4 flex items-center justify-center space-x-2'>
			<Button
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				size='icon'
			>
				<ChevronsLeft size={24} />
			</Button>
			<Button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				size='icon'
			>
				<ChevronLeft size={24} />
			</Button>
			{pageNumbers.map(page => (
				<Button
					key={page}
					onClick={() => onPageChange(page)}
					size='icon'
					aria-current={currentPage === page ? 'page' : undefined}
					className={
						currentPage === page ? 'opacity-50 cursor-not-allowed' : ''
					}
					disabled={currentPage === page}
				>
					{page}
				</Button>
			))}
			<Button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				size='icon'
			>
				<ChevronRight size={24} />
			</Button>
			<Button
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
				size='icon'
			>
				<ChevronsRight size={24} />
			</Button>
		</div>
	)
}

export default Pagination
