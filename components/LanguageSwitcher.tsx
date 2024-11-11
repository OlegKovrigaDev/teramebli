import { Button } from '@/components/ui'

interface LanguageSwitcherProps {
	currentLanguage: 'Ua' | 'Ru'
	onLanguageChange: (language: 'Ua' | 'Ru') => void
}

export const LanguageSwitcher = ({
	currentLanguage,
	onLanguageChange,
}: LanguageSwitcherProps) => {
	return (
		<div className='flex justify-end mb-4'>
			<Button
				onClick={() => onLanguageChange('Ua')}
				disabled={currentLanguage === 'Ua'}
			>
				UA
			</Button>
			<Button
				onClick={() => onLanguageChange('Ru')}
				disabled={currentLanguage === 'Ru'}
			>
				RU
			</Button>
		</div>
	)
}
