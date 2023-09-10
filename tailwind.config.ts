import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				// Background Colors
				'primary-dark': 'hsl(215, 32%, 10%)',
				'primary-lighter': 'hsl(213, 32%, 12%)',
				'primary-badge': 'hsl(213, 30%, 15%)',
				'primary-badge-opacity': 'hsla(213, 30%, 15%, 0.87)',
				'primary-lighter-hover': 'hsl(213, 30%, 15%)',
				// Text Colors
				'white-50': 'hsl(0, 0%, 100%)',
				'white-100': 'hsl(0, 0%, 94%)',
				'white-200': 'hsl(0, 0%, 86%)',
				'white-300': 'hsl(0, 0%, 74%)',
				'white-400': 'hsl(0, 0%, 60%)',
				'white-500': 'hsl(0, 0%, 49%)',
				'white-600': 'hsl(0, 0%, 40%)',
				'white-700': 'hsl(0, 0%, 32%)',
				'white-800': 'hsl(0, 0%, 27%)',
				'white-900': 'hsl(0, 0%, 24%)',
				'white-950': 'hsl(0, 0%, 16%)',
				// Accents Colors
				'accent-50': 'hsl(215, 75%, 97%)',
				'accent-100': 'hsl(216, 73%, 93%)',
				'accent-200': 'hsl(214, 75%, 87%)',
				'accent-300': 'hsl(213, 76%, 78%)',
				'accent-400': 'hsl(214, 74%, 68%)',
				'accent-500': 'hsl(219, 72%, 60%)',
				'accent-600': 'hsl(223, 66%, 54%)',
				'accent-700': 'hsl(226, 60%, 48%)',
				'accent-800': 'hsl(227, 56%, 40%)',
				'accent-900': 'hsl(226, 51%, 33%)',
				'accent-950': 'hsl(228, 46%, 21%)',
				// Danger Colors
				'danger-50': 'hsl(0, 71%, 97%)',
				'danger-100': 'hsl(0, 80%, 94%)',
				'danger-200': 'hsl(0, 85%, 89%)',
				'danger-300': 'hsl(0, 81%, 82%)',
				'danger-400': 'hsl(0, 79%, 71%)',
				'danger-500': 'hsl(0, 74%, 58%)',
				'danger-600': 'hsl(0, 63%, 51%)',
				'danger-700': 'hsl(0, 64%, 42%)',
				'danger-800': 'hsl(0, 61%, 35%)',
				'danger-900': 'hsl(0, 55%, 31%)',
				'danger-950': 'hsl(0, 65%, 15%)',
				// Warning Colors
				'warning-50': 'hsl(42, 100%, 96%)',
				'warning-100': 'hsl(43, 100%, 89%)',
				'warning-200': 'hsl(43, 100%, 71%)',
				'warning-300': 'hsl(41, 100%, 65%)',
				'warning-400': 'hsl(38, 100%, 56%)',
				'warning-500': 'hsl(33, 95%, 50%)',
				'warning-600': 'hsl(27, 98%, 44%)',
				'warning-700': 'hsl(21, 94%, 37%)',
				'warning-800': 'hsl(18, 85%, 31%)',
				'warning-900': 'hsl(17, 81%, 26%)',
				'warning-950': 'hsl(16, 94%, 14%)',
				// Success Colors
				'success-50': 'hsl(140, 53%, 97%)',
				'success-100': 'hsl(139, 58%, 93%)',
				'success-200': 'hsl(138, 53%, 85%)',
				'success-300': 'hsl(139, 52%, 73%)',
				'success-400': 'hsl(139, 47%, 58%)',
				'success-500': 'hsl(139, 47%, 44%)',
				'success-600': 'hsl(140, 51%, 36%)',
				'success-700': 'hsl(139, 48%, 29%)',
				'success-800': 'hsl(139, 43%, 24%)',
				'success-900': 'hsl(141, 42%, 20%)',
				'success-950': 'hsl(142, 53%, 10%)',
				// PostStats Colors
				'color-star': 'hsl(43, 100%, 71%)',
				'color-star-subtle': 'hsla(43, 100%, 71%, 0.12)',
				'color-comment': 'hsl(219, 76%, 68%)',
				'color-comment-subtle': 'hsla(219, 76%, 68%, 0.12)',
				'color-repost': 'hsl(139, 47%, 44%)',
				'color-repost-subtle': 'hsla(139, 47%, 44%, 0.12)',
			},
			fontWeight: {
				regular: '450',
				semibold: '600',
				bold: '700',
			},
			fontSize: {
				xs: '0.75rem', // 12px
				sm: '0.875rem', // 14px
				base: '1rem', // 16px
				lg: '1.125rem', // 18px
				xl: '1.375rem', // 22px
				xxl: '1.75rem', // 28px
				xxl2: '2rem', // 32px
				xxl3: '4rem', // 64px
			},
			zIndex: {
				100: '100',
			},
			// container: {
			//     center: true,
			//     padding: {
			//         DEFAULT: '1rem',
			//         sm: '2rem',
			//         lg: '4rem',
			//         xl: '5rem',
			//         '2xl': '6rem',
			//     },
			//     screens: {
			//         '2xl': '1300px',
			//     },
			// },
			extend: {
				keyframes: {
					'accordion-down': {
						from: { height: 0 },
						to: { height: 'var(--radix-accordion-content-height)' },
					},
					'accordion-up': {
						from: {
							height: 'var(--radix-accordion-content-height)',
						},
						to: { height: 0 },
					},
				},
				animation: {
					'accordion-down': 'accordion-down 0.2s ease-out',
					'accordion-up': 'accordion-up 0.2s ease-out',
				},
			},
		},
	},
	corePlugins: {
		aspectRatio: true,
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
	],
}

export default config
