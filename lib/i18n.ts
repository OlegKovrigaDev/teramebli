import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ua from '../public/locales/ua'
import ru from '../public/locales/ru'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			ua,
			ru,
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
