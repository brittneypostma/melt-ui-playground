import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';
import { craftPreset } from '@getprovi/craft/dist/tailwind/craft-preset.js';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],


	plugins: [
		typography,
		plugin(function ({ addVariant, matchUtilities, theme }) {
			addVariant('hocus', ['&:hover', '&:focus']);
			// Square utility
			matchUtilities(
				{
					square: (value) => ({
						width: value,
						height: value
					})
				},
				{ values: theme('spacing') }
			);
		})
	],
		presets: [craftPreset]

} satisfies Config;
