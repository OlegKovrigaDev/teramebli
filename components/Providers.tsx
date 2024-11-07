'use client'

import { Provider as ReduxProvider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { store } from '@/store'
import i18n from '@/lib/i18n'

interface ProvidersProps {
	children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
	return (
		<I18nextProvider i18n={i18n}>
			<ReduxProvider store={store}>{children}</ReduxProvider>
		</I18nextProvider>
	)
}

export default Providers
