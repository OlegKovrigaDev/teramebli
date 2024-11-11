'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ua from './locales/ua.json'
import ru from './locales/ru.json'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			ua: { translation: ua },
			ru: { translation: ru },
		},
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
		},
		fallbackLng: 'ua',
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false,
		},
	})

export default i18n
