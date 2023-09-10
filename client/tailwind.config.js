/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				main: ['Poppins', 'sans-serif'],
			},
			width: {
				main: '1220px',
			},
			backgroundColor: {
				main: '#ee3131',
			},
			colors: {
				main: '#ee3131',
			},

			flex: {
				2: '2 2 0%',
				3: '3 3 0%',
				4: '4 4 0%',
				5: '5 5 0%',
				6: '6 6 0%',
				7: '7 7 0%',
				8: '8 8 0%',
			},
			gridColumn: {
				'span-1-3': '1/3',
				'span-3-4': '3/4',
				'span-4-5': '4/5',
			},
			gridRow: {
				'span-1-2': '1/2',
				'span-2-2': '2/2',
			},
			gridTemplateRows: {
				'1-1': '330px 300px',
			},

			keyframes: {
				'slide-top': {
					'0%': {
						'-webkit-transform': ' translateY(0)',
						transform: 'translateY(0)',
					},
					'100%': {
						'-webkit-transform': 'translateY(-20px)',
						transform: 'translateY(-20px)',
					},
				},
				'slide-bottom': {
					'0%': {
						'-webkit-transform': ' translateY(0)',
						transform: 'translateY(0)',
					},
					'100%': {
						'-webkit-transform': 'translateY(20px)',
						transform: 'translateY(20px)',
					},
				},
			},
			animation: {
				'slide-top':
					'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
				'slide-bottom':
					'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
			},
		},
	},
	plugins: ['@tailwindcss/line-clamp'],
};
