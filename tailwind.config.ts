import type { Config } from 'tailwindcss';
// import { craftPlugin } from '@getprovi/craft/dist/tailwind/craft-plugin.js';
import { craftPreset } from '@getprovi/craft/dist/tailwind/craft-preset.js';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@getprovi/craft/**/*.{html,js,svelte,ts}'
	],
	// plugins: [craftPlugin]
	presets: [craftPreset]
} satisfies Config;
