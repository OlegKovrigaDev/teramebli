'use client'
import { Button } from '@/components/ui'
import { LANGUAGES } from '@/lib/i18n/constants'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const LangSwitcher = () => {
	const [value, setValue] = useState('UA')
	const { i18n } = useTranslation()

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const initialLang =
				localStorage.getItem('tt-language')?.toUpperCase() || 'UA'
			setValue(initialLang)
		}
	}, [])

	const handleChangeLanguage = (newLang: keyof typeof LANGUAGES) => {
		setValue(newLang)
		if (typeof window !== 'undefined') {
			const lngIsoCode = LANGUAGES[newLang][0]
			i18n.changeLanguage(lngIsoCode)
			localStorage.setItem('tt-language', newLang)
		}
	}

	return (
		<div className='flex justify-end mb-4'>
			<Button
				variant='ghost'
				className={`text-[14px] font-bold ${
					value === 'UA' ? 'bg-gray-200' : ''
				}`}
				onClick={() => handleChangeLanguage('UA')}
			>
				{LANGUAGES.UA[1]}
			</Button>
			<Button
				variant='ghost'
				className={`text-[14px] font-bold ml-2 ${
					value === 'RU' ? 'bg-gray-200' : ''
				}`}
				onClick={() => handleChangeLanguage('RU')}
			>
				{LANGUAGES.RU[1]}
			</Button>
		</div>
	)
}
