import { craftPreset } from '@getprovi/craft/dist/tailwind/craft-preset.js';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@getprovi/craft/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			zIndex: defaultTheme.zIndex
		}
	},
	presets: [craftPreset]
} satisfies Config;
