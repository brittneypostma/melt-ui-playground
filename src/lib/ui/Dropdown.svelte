<script context="module" lang="ts">
	import type { DropdownMenu } from '@melt-ui/svelte';
	const CTX_KEY = Symbol('dropdownMenu');

	export const dropdownCtx = {
		get() {
			return getContext<DropdownMenu>(CTX_KEY);
		},
		set(ctx: DropdownMenu) {
			setContext(CTX_KEY, ctx);
		}
	};

	export interface DropdownProps {
		asChild?: boolean;
		items?: any[];
	}
	interface TriggerProps extends ButtonProps, DropdownProps {
		triggerClass?: string | undefined;
		secondary?: boolean;
		tertiary?: boolean;
		size?: 'xs' | 'sm' | 'default' | 'lg';
		label?: string | undefined;
		stretch?: boolean;
		testId?: string | undefined;
		indicator?: boolean | undefined;
		iconOnly?: boolean;
		iconName?: typeof SvelteComponent;
		iconBefore?: typeof SvelteComponent | undefined;
		iconAfter?: typeof SvelteComponent | undefined;
		type?: never;
		disabled?: boolean;
		href?: never;
	}
	interface MenuProps extends DivProps, DropdownProps {
		containerClass?: string | undefined;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import Button from './Button.svelte';
	import Container from './Container.svelte';
	import type { ButtonProps, DivProps } from '$internal';
	import { getContext, setContext, type SvelteComponent } from 'svelte';

	type $$Props = TriggerProps | MenuProps;

	export let testId: $$Props['testId'] = undefined;
	export let asChild: $$Props['asChild'] = false;
	export let items: $$Props['items'] = undefined;
	export let triggerClass: TriggerProps['triggerClass'] = undefined;
	export let containerClass: MenuProps['containerClass'] = undefined;
	export let secondary: boolean = false;
	export let tertiary: boolean = false;
	export let size: 'xs' | 'sm' | 'default' | 'lg' = 'default';
	export let label: string | undefined = undefined;
	export let disabled: boolean = false;
	export let stretch: boolean = false;
	export let indicator: boolean = false;
	export let iconOnly: boolean = false;
	export let iconName: typeof SvelteComponent | undefined = undefined;
	export let iconBefore: typeof SvelteComponent | undefined = undefined;
	export let iconAfter: typeof SvelteComponent | undefined = undefined;

	$: btnProps = {
		secondary,
		tertiary,
		size,
		label,
		disabled,
		stretch,
		indicator,
		iconOnly,
		iconName,
		iconBefore,
		iconAfter
	};
	const ctx = createDropdownMenu({
		positioning: {
			placement: 'bottom-start',
			offset: {
				mainAxis: 100
			}
		}
	});

	dropdownCtx.set(ctx);

	const {
		elements: { trigger, menu, item }
	} = dropdownCtx.get();
</script>

<div {...$$restProps} data-testid={testId} class="w-max relative z-drawer">
	<svelte:component this={Button} builder={trigger} class={cn(triggerClass)} {...btnProps} />

	<Container builder={menu} dropdown class={cn(containerClass, 'relative z-drawer mt-12 w-max')}>
		{#if $$slots.header}
			<header class="p-16 border-b border-neutral border-solid"><slot name="header" /></header>
		{/if}
		<menu class="p-16">
			{#if items}
				<ul>
					{#each items as dropdownItem}
						{#if asChild}
							<slot builder={$item} {...dropdownItem} />
						{:else}
							<li class="item list-none" use:melt={$item} {...dropdownItem}>
								<slot builder={$item} />
							</li>
						{/if}
					{/each}
				</ul>
			{:else if asChild}
				<slot builder={$item} />
			{:else}
				<slot />
			{/if}
		</menu>

		{#if $$slots.footer}
			<footer class="p-16 border-t border-neutral border-solid"><slot name="footer" /></footer>
		{/if}
	</Container>
</div>

<!-- 
@component
[Go to docs](https://craft.provi.design/)

@example
```js
import { Dropdown } from '@getprovi/craft';
```

```js
<Dropdown />
 ```

@description
### Dropdown

@properties

| Prop | Type | Default | Description |
| --- | --- | --- | --- |


 -->
