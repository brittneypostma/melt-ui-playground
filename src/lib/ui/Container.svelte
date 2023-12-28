<script context="module" lang="ts">
	import { cva } from 'class-variance-authority';
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';
	import type { Builder, TransitionFunc } from '$lib/utils/helpers';

	const containerVariants = cva('craft border border-solid w-max', {
		variants: {
			variant: {
				sm: 'bg-white rounded-sm p-12 border-neutral-1',
				default: 'bg-white rounded p-16 border-neutral-1',
				lg: 'bg-white p-24 border-neutral-1'
			},
			wrapper: {
				true: 'bg-neutral-light border-neutral-1 rounded-xl p-24'
			},
			isLink: {
				true: 'bg-white rounded p-16 border-neutral-1 hover:border-neutral-hover-1 active:border-neutral-active-1 cursor-pointer shadow hover:shadow-md active:shadow-none ring-offset-8 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-brand-700'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	type ForwardedProps<Params> = {
		testId?: string;
		builder?: Builder;
		transition?: TransitionFunc<Params>;
		params?: Params;
	};

	type Shadow = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl';

	interface CommonProps<Params> extends ForwardedProps<Params> {
		sm?: boolean;
		lg?: boolean;
		shadow?: Shadow;
		wrapper?: boolean;
		rounded?: boolean;
		dropdown?: boolean;
	}

	interface DivProps<Params> extends CommonProps<Params>, HTMLAttributes<HTMLDivElement> {
		as?: 'div';
	}

	interface AnchorProps<Params> extends CommonProps<Params>, HTMLAnchorAttributes {
		as: 'a';
	}

	interface AsideProps<Params> extends CommonProps<Params>, HTMLAttributes<HTMLElement> {
		as: 'aside';
	}

	interface ArticleProps<Params> extends CommonProps<Params>, HTMLAttributes<HTMLElement> {
		as: 'article';
	}

	interface SectionProps<Params> extends CommonProps<Params>, HTMLAttributes<HTMLElement> {
		as: 'section';
	}

	export type ContainerProps<Params = unknown> =
		| DivProps<Params>
		| AnchorProps<Params>
		| AsideProps<Params>
		| ArticleProps<Params>
		| SectionProps<Params>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import Frame from './Frame.svelte';

	type Params = $$Generic;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = ContainerProps<Params>;

	export let as: 'div' | 'a' | 'aside' | 'article' | 'section' = 'div';
	export let sm: boolean = false;
	export let lg: boolean = false;
	export let shadow: Shadow | undefined = undefined;
	export let wrapper: boolean = false;
	export let rounded: boolean = true;
	export let dropdown: boolean = false;
	let className: string | null | undefined = undefined;
	export { className as class };

	$: if (!rounded) {
		lg = true;
		shadow = 'xl';
	} else {
		rounded = true;
	}

	let variant: 'sm' | 'lg' | 'default';
	$: if (sm) {
		variant = 'sm';
	} else if (lg) {
		variant = 'lg';
	} else {
		variant = 'default';
	}
</script>

{#if as === 'a'}
	<Frame {as} class={cn(containerVariants({ isLink: true, className }))} on:click {...$$restProps}>
		<slot />
	</Frame>
{:else if wrapper}
	<Frame {as} class={cn(containerVariants({ wrapper, className }))} {...$$restProps}>
		<slot />
	</Frame>
{:else if dropdown}
	<Frame
		{as}
		class={cn(className, 'bg-white p-0 min-w-[224px] w-max rounded shadow-md')}
		{...$$restProps}
	>
		<slot />
	</Frame>
{:else if sm}
	<Frame
		{as}
		class={cn(
			containerVariants({ variant, class: className }),
			shadow === 'sm' && 'shadow-sm',
			shadow === 'none' && 'shadow-none'
		)}
		{...$$restProps}
	>
		<slot />
	</Frame>
{:else if lg}
	{#if rounded}
		<Frame
			{as}
			class={cn(
				containerVariants({ variant, className }),
				'rounded-xl',
				shadow === 'none' || (!shadow && 'shadow-none'),
				shadow === 'xl' && 'shadow-xl'
			)}
			{...$$restProps}
		>
			<slot />
		</Frame>
	{:else}
		<Frame
			{as}
			class={cn(containerVariants({ variant, className }), 'shadow-xl rounded-t-none rounded-b-xl')}
			{...$$restProps}
		>
			<slot />
		</Frame>
	{/if}
{:else}
	<Frame
		{as}
		class={cn(
			containerVariants({ variant, className }),
			shadow === 'none' && 'shadow-none',
			shadow === 'base' && 'shadow',
			shadow === 'md' && 'shadow-md'
		)}
		{...$$restProps}
	>
		<slot />
	</Frame>
{/if}

<!-- 
@component
[Go to docs](https://craft.provi.design/)

@example
```js
import { Container } from '@getprovi/craft';
```

```js
<Container />
<Container sm>Sample Content</Container>
<Container lg>Sample Content</Container>
<Container wrapper>Sample Content</Container>
<Container href="#" on:click={}>Sample Content</Container>
<Container shadow="base">Sample Content</Container>
<Container sm shadow="sm">Sample Content</Container>
<Container lg shadow="xl">Sample Content</Container>
<Container as="aside" wrapper>Sample Content</Container>
 ```

@description
### Container
#### Interactive

Used for product cards or other card types where the card body itself is actionable.
#### Static

Use the shadow prop when a container sits on top of other content. Don’t use the shadow prop when a container is inline.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| class | string | undefined | Class name for the container |
| testId | string | undefined | Test id for the container |
| href | string | undefined | Href for the interactive container |
| sm | boolean | false | Small container |
| lg | boolean | false | Large container |
| wrapper | boolean | false | Wrapper container |
| as | 'div' | 'aside' | 'article' | 'section' | 'div' | Element type for the static container. |
| shadow | `sm`: 'base' || 'none'; `default`: 'base || 'none'; `lg`: 'xl' || 'none' | Shadow for the container |
 -->
