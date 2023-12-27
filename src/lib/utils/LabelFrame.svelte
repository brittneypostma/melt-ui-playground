<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import { Flex } from '@getprovi/craft';

	interface $$Props extends HTMLLabelAttributes {
		class?: string;
		disabled?: boolean;
		hidden?: boolean;
		inputId: string;
		label?: string | undefined;
		size?: 'sm' | 'default';
	}

	let className: string | undefined | null = undefined;
	export { className as class };
	export let disabled: boolean = false;
	export let hidden: boolean = false;
	export let inputId: string;
	export let label: string | undefined = undefined;
	export let size: 'sm' | 'default' = 'default';

	let textColor = disabled ? 'text-disabled' : 'text-brand';
	let textSize = size === 'sm' ? 'text-sm' : 'text-base';

	const labelClass = cn(textColor, textSize, className, 'craft focus-visible:outline-none');
</script>

<label for={inputId} {...$$restProps} class={labelClass} class:sr-only={hidden}>
	<slot />
	{#if $$slots.count}
		<Flex as="span" gap="8" class={$$slots.count ? 'justify-between' : 'justify-start'}>
			<span class="flex-no-shrink">{label}</span>
			<slot name="count" />
		</Flex>
	{/if}
</label>

<!--
@component
[Go to docs](https://craft.provi.design)
-->
