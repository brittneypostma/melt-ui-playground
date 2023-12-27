<script context="module" lang="ts">
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

	type Shadows = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
	type ContainerSm = Omit<Shadows, 'md' | 'lg' | 'xl'> | undefined;
	type ContainerBase = Omit<Shadows, 'sm' | 'lg' | 'xl'> | undefined;
	type ContainerLg = Omit<Shadows, 'sm' | 'md' | 'base'> | undefined;

	interface CommonProps extends FrameProps {
		testId?: string | undefined;
		sm?: boolean;
		lg?: boolean;
		shadow?: ContainerSm | ContainerBase | ContainerLg;
		wrapper?: boolean;
		rounded?: boolean;
		dropdown?: boolean;
	}

	interface Anchor extends AnchorProps, CommonProps {
		as: 'a';
	}
	interface Div extends DivProps, CommonProps {
		as?: 'div';
	}

	interface AsideProps extends ElementProps {
		as: 'aside';
		href?: never;
	}

	interface ArticleProps extends ElementProps {
		as: 'article';
		href?: never;
	}

	interface SectionProps extends ElementProps {
		as: 'section';
		href?: never;
	}

	export type ContainerProps = Anchor | Div | AsideProps | ArticleProps | SectionProps;
</script>

<script lang="ts">
	import Frame, {
		type AnchorProps,
		type FrameProps,
		type DivProps,
		type ElementProps
	} from './Frame.svelte';

	import { cn } from '$lib/utils/cn.js';
	import { cva } from 'class-variance-authority';

	type $$Props = ContainerProps;

	let className: ContainerProps['class'] = undefined;
	export { className as class };
	export let testId: FrameProps['testId'] = undefined;
	export let href: AnchorProps['href'] = undefined;
	export let as: 'div' | 'section' | 'aside' | 'a' | 'article' = 'div';
	export let sm: boolean = false;
	export let lg: boolean = false;
	export let wrapper: boolean = false;
	export let shadow: ContainerSm | ContainerBase | ContainerLg = undefined;
	export let rounded: boolean = true;
	export let dropdown: CommonProps['dropdown'] = false;
	export let builder: CommonProps['builder'] = undefined;

	$: if (!rounded) {
		lg = true;
		shadow = 'xl';
	} else {
		rounded = true;
	}

	let variant: 'sm' | 'lg' | 'default' = 'default';

	$: if (sm) {
		variant = 'sm';
	} else if (lg) {
		variant = 'lg';
	} else {
		variant = 'default';
	}

	let isLink: boolean = false;
	$: if (href) {
		isLink = true;
	}

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
</script>

{#if href}
	<Frame
		as="a"
		{builder}
		{href}
		{...$$restProps}
		data-testid={testId}
		class={cn(containerVariants({ isLink, class: className }))}
		on:click
	>
		<slot />
	</Frame>
{:else if wrapper}
	<Frame
		{builder}
		{as}
		{...$$restProps}
		data-testid={testId}
		class={cn(containerVariants({ wrapper, class: className }))}
	>
		<slot />
	</Frame>
{:else if dropdown}
	<Frame
		{builder}
		{as}
		{...$$restProps}
		data-testid={testId}
		class={cn(className, 'bg-white p-0 min-w-[224px] w-max rounded shadow-md')}
	>
		<slot />
	</Frame>
{:else if sm}
	<Frame
		{builder}
		{as}
		{...$$restProps}
		data-testid={testId}
		class={cn(
			containerVariants({ variant, class: className }),
			shadow === 'sm' && 'shadow-sm',
			shadow === 'none' && 'shadow-none'
		)}
	>
		<slot />
	</Frame>
{:else if lg}
	{#if rounded}
		<Frame
			{builder}
			{as}
			{...$$restProps}
			data-testid={testId}
			class={cn(
				containerVariants({ variant, class: className }),
				'rounded-xl',
				shadow === 'none' || (!shadow && 'shadow-none'),
				shadow === 'xl' && 'shadow-xl'
			)}
		>
			<slot />
		</Frame>
	{:else}
		<Frame
			{builder}
			{as}
			{...$$restProps}
			data-testid={testId}
			class={cn(
				containerVariants({ variant, class: className }),
				'shadow-xl rounded-t-none rounded-b-xl'
			)}
		>
			<slot />
		</Frame>
	{/if}
{:else}
	<Frame
		{builder}
		{as}
		{...$$restProps}
		data-testid={testId}
		class={cn(
			containerVariants({ variant, class: className }),
			shadow === 'none' && 'shadow-none',
			shadow === 'base' && 'shadow',
			shadow === 'md' && 'shadow-md'
		)}
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
