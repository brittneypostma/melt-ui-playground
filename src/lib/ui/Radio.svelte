<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';

	const radioVariants = cva('craft-radio', {
		variants: {
			size: {
				sm: 'text-sm size-12',
				default: 'text-base size-16'
			}
		},
		defaultVariants: {
			size: 'default'
		}
	});
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import { Flex, Text } from '@getprovi/craft';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import LabelFrame from '$lib/utils/LabelFrame.svelte';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends Omit<HTMLInputAttributes, 'size'> {
		testId?: string | undefined;
		id: string;
		value: unknown;
		group?: unknown | undefined;
		checked?: boolean;
		disabled?: boolean;
		required?: boolean;
		size?: 'sm' | 'default';
		label?: string;
		hidden?: boolean;
		critical?: boolean;
		success?: boolean;
		warning?: boolean;
	}

	export let testId: string | undefined = undefined;
	export let id: string;
	export let value: unknown = undefined;
	export let group: unknown | undefined = undefined;
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let size: 'sm' | 'default' = 'default';
	export let label: string = 'Label';
	export let hidden: boolean = false;

	// TODO: potentially unused props?
	// export let critical: boolean = false;
	// export let success: boolean = false;
	// export let warning: boolean = false;

	let className: string | undefined | null = undefined;
	export { className as class };

	$: checked = group !== undefined ? group === value : checked;

	$: radioClass = cn(
		radioVariants({ size }),
		'appearance-none m-0 relative border-brand-1 rounded-full relative top-4',
		'ring-offset-2 ring-2 ring-[transparent] focus:ring-none focus:outline-none focus-visible:outline-none focus-visible:ring-brand-700 transition-colors',
		checked &&
			'bg-accent-active after:block after:absolute after:top-1/2 after:left-1/2 after:rounded-full after:bg-brand after:transition-colors',
		!checked &&
			!disabled &&
			'bg-white group-hover:bg-neutral-accent-hover group-active:bg-neutral-accent-active cursor-pointer',
		disabled &&
			'bg-disabled border-disabled-1 cursor-not-allowed hover:bg-disabled active:bg-disabled',
		size === 'default' && 'text-base size-16 after:size-8 after:top-[3px] after:left-[3px]',
		size === 'sm' && 'text-sm size-12 after:size-6 after:top-[2px] after:left-[2px]',
		className
	);
</script>

<LabelFrame
	inputId={id}
	{hidden}
	{disabled}
	{size}
	class={cn(
		'group flex gap-8 flex-no-shrink self-stretch',
		!disabled && 'cursor-pointer',
		disabled && 'cursor-not-allowed',
		className
	)}
>
	<input
		type="radio"
		bind:group
		data-testid={testId}
		{id}
		{value}
		{checked}
		{disabled}
		{required}
		class={radioClass}
		on:blur
		on:change
		on:click
		on:focus
		on:keydown
		on:keypress
		on:keyup
		on:mouseenter
		on:mouseleave
		on:mouseover
		on:paste
		on:change
		{...$$restProps}
	/>
	<Flex
		as="span"
		column
		gap="4"
		center
		class={cn('flex-no-shrink self-stretch', disabled && 'text-disabled')}
	>
		<Flex as="span" gap="8" class={$$slots.count ? 'justify-between' : 'justify-start'}>
			<span class="flex-no-shrink">{label}</span>
			<slot name="count" />
		</Flex>
		<Text sm neutral={!disabled} {disabled}>
			<slot />
		</Text>
	</Flex>
</LabelFrame>

<!-- 
@component
[Go to docs](https://craft.provi.design/)

@example
```js
import { Radio } from '@getprovi/craft';
```

```js
<Radio testId="test-radio" id="id" label="Label" value="value">Here is some helper text.</Radio>
Group
let selected = name
<Radio bind:group={selected} id="id" label={name} value="value">Here is some helper text.</Radio>
 ```

@description
### Radio
Radios allow a user to select only a single item from a set of two or more choices. These choices are mutually exclusive.

@properties

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `testId` | `string` | `undefined` | Test id for testing purposes |
| `id` | `string` | `undefined` | Id of the radio |
| `value` | `string` | `undefined` | Value of the radio |
| `group` | `string` | `undefined` | Group of the radio |
| `checked` | `boolean` | `false` | Checked state of the radio
| `disabled` | `boolean` | `false` | Disabled state of the radio |
| `required` | `boolean` | `false` | Required state of the radio |
| `size` | `'sm' | 'default'` | `'default'` | Size of the radio |
| `label` | `string` | `'Label'` | Label of the radio |
| `hidden` | `boolean` | `false` | Hidden state of the label of the radio |
| `class` | `string` | `null` | `undefined` | Class of the radio
-->

<style>
	.craft-radio:checked::after {
		content: '';
	}
</style>
