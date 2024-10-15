import { PropsWithChildren, ReactNode } from 'react'

export interface AccordProps {
	title: string
	className?: string
	children: ReactNode
	onToggle?: () => void
}

export interface ListProps {
	items: any[] | undefined
	renderItem: (item: any) => JSX.Element
	className?: string
	classItem?: string
}

export interface SectionProps extends PropsWithChildren {
	title: string
	size?: string
}

export interface TitleProps extends PropsWithChildren {
	size?: string
}

export interface SearchProps {
	search: {
		isMobileSearchVisible: boolean
		toggleSearchInput: () => void
		query: string
		setQuery: (query: string) => void
		inputRef: React.RefObject<HTMLInputElement>
		handleSearch: () => void
		handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
	}
}
