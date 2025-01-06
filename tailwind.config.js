/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 2s linear infinite',
			},
		},
	},
	plugins: [],
}
