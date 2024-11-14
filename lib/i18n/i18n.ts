'use client'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { LANGUAGES } from './constants'
import ua from './translations/ua.json'
import ru from './translations/ru.json'

const resources = {
	[LANGUAGES.UA[0]]: {
		translation: ua,
	},
	[LANGUAGES.RU[0]]: {
		translation: ru,
	},
}

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'ua',

		interpolation: {
			escapeValue: false,
		},
	})

export default i18n
