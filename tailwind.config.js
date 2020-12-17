module.exports = {
	corePlugins: {
		container: false,
	},
	theme: {
		borderRadius: {
			sm: '0.125rem',
			default: '0.25rem',
			md: '0.5rem',
			lg: '0.9375rem',
			full: '9999px',
		},
		minWidth: {
			0: '0',
			'1/4': '25%',
			'1/3': '33%',
			'40%': '40%',
			'1/2': '50%',
			'3/4': '75%',
			full: '100%',
		},
		textColor: {
			'black': '#000000',
			'primary': '#49B794',
			'secondary': '#219AAA',
			'gray': '#6b7280',
			'white': '#FFFFFF',
		},
		backgroundColor: {
			'transparent': 'transparent',
			'black': '#000000',
			'white': '#FFFFFF',
			'gray': '#6b7280',
			'gray-light': '#f5f6f9',
			'primary': '#49B794',
			'primary-dark': '#41a485',
			'primary-light': '#c8e9df',
			'secondary': '#219AAA',
			'secondary-dark': '#1d8795',
			'secondary-light': '#bfecf2',
		},
		ringColor: {
			'primary': '#49B794',
			'secondary': '#219AAA',
		},
		borderColor: {
			'primary': '#49B794',
			'secondary': '#219AAA',
			'gray-light': '#f5f6f9',
		}
	},
	variants: {
		boxShadow: ['group-hover'],
	},
	plugins: [
		require('@tailwindcss/forms'),
		function ({ addComponents }) {
			addComponents({
				'.container': {
					width: '100%',
					marginLeft: 'auto',
					marginRight: 'auto',
					paddingLeft: '2rem',
					paddingRight: '2rem',
					'@screen sm': {
						maxWidth: '640px',
					},
					'@screen md': {
						maxWidth: '768px',
					},
					'@screen lg': {
						maxWidth: '1004px',
					},
					'@screen xl': {
						maxWidth: '1200px',
					},
				},
			});
		},
	],
};
