<script context="module" lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { SvelteComponent } from 'svelte';
	import type { Builder } from './Frame.svelte';

	interface ButtonProps {
		secondary?: boolean;
		tertiary?: boolean;
		size?: 'xs' | 'sm' | 'default' | 'lg';
		label?: string | undefined;
		stretch?: boolean;
		testId?: string | undefined;
		indicator?: boolean | undefined;
		builder?: Builder | undefined;
	}

	interface AnchorProps extends HTMLAnchorAttributes, ButtonProps {
		class?: string;
		href: string | undefined;
		type?: never;
		disabled?: never;
	}
	interface ButtonAttrs extends HTMLButtonAttributes, ButtonProps {
		class?: string;
		type?: 'button' | 'submit' | 'reset';
		href?: never;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import { cva } from 'class-variance-authority';
	import type { Action } from 'svelte/action';
	import Frame from './Frame.svelte';

	type $$Props = ButtonAttrs | AnchorProps;

	let className: string | undefined | null = undefined;
	export { className as class };
	export let secondary: boolean = false;
	export let tertiary: boolean = false;
	export let size: 'xs' | 'sm' | 'default' | 'lg' = 'default';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let label: string | undefined = undefined;
	export let disabled: boolean = false;
	export let stretch: boolean = false;
	export let indicator: boolean = false;
	export let builder: ButtonProps['builder'] = undefined;
	export let href: string | undefined = undefined;
	export let testId: string | undefined = undefined;

	let primary = true;

	$: if (secondary) {
		primary = false;
		tertiary = false;
	} else if (tertiary) {
		primary = false;
		secondary = false;
	} else {
		primary = true;
		secondary = false;
		tertiary = false;
	}

	let sizeClass = '';
	$: if (size === 'sm') {
		sizeClass = 'px-16 py-6 text-sm-semibold';
	} else if (size === 'default') {
		sizeClass = 'px-24 py-8 text-semibold';
	} else {
		sizeClass = 'px-24 py-12 text-semibold';
	}

	const buttonVariants = cva(
		'craft-btn disabled:bg-disabled hover:disabled:bg-disabled disabled:text-disabled ring-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 rounded-full flex items-center gap-8 text-ellipsis overflow-hidden focus:border-transparent focus:shadow-none',
		{
			variants: {
				primary: {
					true: 'primary text-white bg-brand hover:bg-brand-hover active:bg-brand-active dark:bg-brand dark:hover:bg-brand-hover dark:active:bg-brand-active'
				},
				secondary: {
					true: 'secondary text-brand bg-accent hover:bg-accent-hover active:bg-accent-active dark:bg-accent dark:hover:bg-accent-hover dark:active:bg-accent-active dark:text-brand'
				},
				tertiary: {
					true: 'tertiary bg-white text-brand hover:bg-neutral-accent-hover active:bg-neutral-accent-active dark:bg-white dark:text-brand dark:hover:bg-neutral-accent-hover dark:active:bg-neutral-accent-active'
				},
				iconOnly: {
					true: 'rounded-full w-max'
				}
			},
			defaultVariants: {
				primary: true
			}
		}
	);
</script>

<Frame
	as={href ? 'a' : 'button'}
	role={href ? 'link' : 'button'}
	type={href ? undefined : type}
	disabled={href ? undefined : disabled}
	{builder}
	{href}
	{...$$restProps}
	data-testid={testId}
	class={cn(
		buttonVariants({ primary, secondary, tertiary, class: className }),
		sizeClass,
		href && 'cursor-pointer',
		!stretch && 'w-max',
		stretch && 'w-full',
		stretch && 'justify-between',
		!stretch && 'justify-center',
		primary && 'text-white font-semibold'
	)}
	on:click
	on:change
	on:keydown
	on:keyup
	on:touchstart
	on:touchend
	on:touchcancel
	on:mouseenter
	on:mouseleave
>
	{#if label}
		{label}
	{:else}
		<slot />
	{/if}
</Frame>

<!-- 
@component
[Go to docs](https://craft.provi.design/)

@example
```js
import { Button } from '@getprovi/craft';
```

```js
<Button label="Button name" size="sm"/>
<Button size="sm" iconOnly iconName={Notification} label="Notifications" description="View messages"/>
<Button size="lg" iconAfter={ChevronDown} label="Order" />
<Button label="Location" size="sm" iconBefore={LocationPinSolid}/>  
<Button label="Location" size="sm" iconBefore={LocationPinSolid} iconAfter={ChevronDown}/>
 ```

@description
### Button

Buttons or “calls-to-action” are one of the most common UI elements for users to choose an action. While links are focused on navigation, buttons should be used to submit information or change the state of a page.

@properties

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `secondary` | `boolean` | `false` | Sets the button to be secondary. |
| `tertiary` | `boolean` | `false` | Sets the button to be tertiary. |
| `size` | `'xs' (tertiary only) | 'sm' | 'default' | 'lg'` | `'default'` | Sets the size of the button. |
| `type` | `'button' | 'submit' | 'reset'` | `'button'` | Sets the type of the button. |
| `disabled` | `boolean` | `false` | Sets the button to be disabled. |
| `label` | `string` | `'Button'` | Sets the label of the button or the title for an iconOnly button. |
| `stretch` | `boolean` | `false` | Sets the button to be stretch or space between. |
| `indicator` | `boolean` | `false` | Sets the button to be indicator. |
| `iconOnly` | `boolean` | `false` | Sets the button to be icon only. |
| `iconName` | typeof SvelteComponent / icon name | undefined` | `undefined` | Sets the icon of the button. |
| `iconBefore` | typeof SvelteComponent / icon name | undefined` | `undefined` | Sets the icon to be before the label. |
| `iconAfter` | typeof SvelteComponent / icon name | undefined` | `undefined` | Sets the icon to be after the label. |
| `class` | `string` | `undefined` | Extra classes provided to the component. |
| `testId` | `string` | `undefined` | Sets the test id of the button. |

 -->
<style>
	:global(.craft .craft-btn:focus) {
		box-shadow: none;
		border: none;
	}
	/* Fizz Overrides */
	:global(.craft .craft-btn) {
		font-weight: var(--craft-core-font-weight-semibold);
	}

	:global(.craft .craft-btn.primary) {
		color: var(--craft-color-text-neutral-white);
	}
	:global(.craft .craft-btn.secondary),
	:global(.craft .craft-btn.tertiary) {
		color: var(--craft-color-text-brand);
	}

	:global(.craft .craft-btn[disabled]) {
		cursor: not-allowed;
		color: var(--craft-color-text-neutral);
	}
	:global(.craft .craft-btn.text-sm-semibold) {
		font-size: var(--craft-core-text-sm-semibold-font-size);
		line-height: var(--craft-core-text-sm-semibold-line-height);
		font-weight: var(--craft-core-text-sm-semibold-font-weight);
	}
</style>
