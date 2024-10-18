'use client'

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
				className={`text-white bg-stone-600 rounded hover:bg-stone-700 transition
          ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
				size='icon'
			>
				<ChevronsLeft size={24} />
			</Button>
			<Button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={`text-white bg-stone-600 rounded hover:bg-stone-700 transition
          ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
				size='icon'
			>
				<ChevronLeft size={24} />
			</Button>
			{pageNumbers.map(page => (
				<Button
					key={page}
					onClick={() => onPageChange(page)}
					className={`px-3 py-1 text-white bg-stone-600 rounded hover:bg-stone-700 transition
            ${page === currentPage ? 'font-bold bg-stone-800' : ''}`}
				>
					{page}
				</Button>
			))}
			<Button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={`text-white bg-stone-600 rounded hover:bg-stone-700 transition
          ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
				size='icon'
			>
				<ChevronRight size={24} />
			</Button>
			<Button
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
				className={`text-white bg-stone-600 rounded hover:bg-stone-700 transition
          ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
				size='icon'
			>
				<ChevronsRight size={24} />
			</Button>
		</div>
	)
}

export default Pagination
