import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
    	container: {
    		center: 'true',
    		padding: {
    			DEFAULT: '1rem',
    			sm: '2rem',
    			lg: '2rem'
    		},
    		screens: {
    			md: '768px',
    			lg: '1348px'
    		}
    	},
    	extend: {
    		colors: {
    			accent: '#e1e1e1',
    			bg: '#f8f8f8',
    			black: '#100c1f',
    			gray: '#47464b',
    			red: {
    				'800': '#d81c1b',
    				'900': '#fb1412'
    			},
    			green: '#00A032',
    			background: 'var(--background)',
    			foreground: 'var(--foreground)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
}
export default config
