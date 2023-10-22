import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				rubik: ['Rubik', 'sans-serif'],
				urbanist: ['Urbanist', 'sans-serif'],
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
			colors: {
				// Background Colors
				'primary-dark': 'hsl(220, 8%, 7%)',
				'primary-lighter': 'hsl(220, 8%, 9%)',
				'primary-badge': 'hsl(220, 8%, 11%)',
				'secondary-dark': 'hsl(215, 32%, 10%)',
				'secondary-lighter': 'hsl(215, 32%, 12%)',
				'secondary-badge': 'hsl(215, 32%, 14%)',
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
				'accent-50': `hsl(var(--accent-hue), 75%, 97%)`,
				'accent-100': `hsl(var(--accent-hue), 73%, 93%)`,
				'accent-200': `hsl(var(--accent-hue), 75%, 87%)`,
				'accent-300': `hsl(var(--accent-hue), 76%, 78%)`,
				'accent-400': `hsl(var(--accent-hue), 74%, 68%)`,
				'accent-500': `hsl(var(--accent-hue), 72%, 60%)`,
				'accent-600': `hsl(var(--accent-hue), 66%, 54%)`,
				'accent-700': `hsl(var(--accent-hue), 60%, 48%)`,
				'accent-800': `hsl(var(--accent-hue), 56%, 40%)`,
				'accent-900': `hsl(var(--accent-hue), 51%, 33%)`,
				'accent-950': `hsl(var(--accent-hue), 46%, 21%)`,
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
					fadeIn: {
						to: { opacity: 1 },
					},
					fadeOut: {
						to: { opacity: 0 },
					},
					zoomIn: {
						to: { transform: 'scale(0.95)' },
					},
					zoomOut: {
						to: { transform: 'scale(1)' },
					},
					slideInFromTop: {
						to: { transform: 'translateY(2rem)' },
					},
					slideInFromRight: {
						to: { transform: 'translateX(-2rem)' },
					},
					slideInFromLeft: {
						to: { transform: 'translateX(2rem)' },
					},
					slideInFromBottom: {
						to: { transform: 'translateY(-2rem)' },
					},
				},
				animation: {
					in: 'fadeIn 0.5s forwards',
					out: 'fadeOut 0.5s forwards',
					'zoom-in-95': 'zoomIn 0.5s forwards',
					'zoom-out-95': 'zoomOut 0.5s forwards',
					'slide-in-from-top-2': 'slideInFromTop 0.5s forwards',
					'slide-in-from-right-2': 'slideInFromRight 0.5s forwards',
					'slide-in-from-left-2': 'slideInFromLeft 0.5s forwards',
					'slide-in-from-bottom-2': 'slideInFromBottom 0.5s forwards',
					'accordion-down': 'accordion-down 0.2s ease-out',
					'accordion-up': 'accordion-up 0.2s ease-out',
				},
				minHeight: {
					'min-h-device': '100dvh',
				},
				height: {
					device: '100dvh',
				},
			},
		},
	},
	corePlugins: {
		aspectRatio: true,
	},
	plugins: [
		//require('@tailwindcss/typography'),
		//require('@tailwindcss/aspect-ratio'),
		nextui({
			layout: {}, // common layout options
			themes: {
				light: {
					layout: {}, // light theme layout options
					// ...
				},
				dark: {
					layout: {}, // dark theme layout options
					// ...
				},
			},
		}),
	],
}

export default config
