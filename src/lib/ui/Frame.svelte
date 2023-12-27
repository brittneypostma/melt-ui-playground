<script context="module" lang="ts">
	import type { Action } from 'svelte/action';
	import type { Readable } from 'svelte/store';
	import type { TransitionConfig } from 'svelte/transition';
	import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
	export type Builder = Readable<Record<string, unknown>> & Action<HTMLElement>;
	export type TransitionFunc = (node: HTMLElement, params: any) => TransitionConfig;

	export interface FrameProps {
		builder?: Builder | undefined;
		testId?: string | undefined;
		transition?: TransitionFunc | undefined;
		params?: object | undefined;
	}
	export interface AnchorProps extends HTMLAnchorAttributes, FrameProps {
		as?: 'a';
		class?: string;
	}
	export interface ButtonProps extends HTMLButtonAttributes, FrameProps {
		as?: 'button';
		class?: string;
	}
	export interface DivProps extends HTMLAttributes<HTMLElement>, FrameProps {
		as?: 'div';
		class?: string;
	}

	export interface ElementProps extends HTMLAttributes<HTMLElement>, FrameProps {
		as?: keyof HTMLElementTagNameMap;
		class?: string;
		href?: string | undefined;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
	}

	export type CombinedProps = AnchorProps | ButtonProps | DivProps | ElementProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	type $$Props = CombinedProps;

	let className: string | null | undefined = undefined;
	export { className as class };
	export let as: CombinedProps['as'] = 'div';
	export let builder: FrameProps['builder'] = undefined;
	export let testId: FrameProps['testId'] = undefined;
	export let transition: TransitionFunc = () => ({ duration: 0 });
	export let params: object | undefined = undefined;

	$: attributes = builder ? $builder : {};

	function action(node: HTMLElement) {
		if (builder) return builder(node);
	}
</script>

<svelte:element
	this={as}
	role={as === 'a' ? 'link' : as === 'button' ? 'button' : undefined}
	transition:transition={params}
	{...$$restProps}
	class={cn(className)}
	data-testid={testId}
	on:click
	on:change
	on:keydown
	on:keyup
	on:touchstart
	on:touchend
	on:touchcancel
	on:mouseenter
	on:mouseleave
	use:action
	{...attributes}
>
	<slot />
</svelte:element>
