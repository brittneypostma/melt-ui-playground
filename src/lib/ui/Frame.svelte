<script context="module" lang="ts">
	import type { Builder, TransitionFunc } from '$lib/utils/helpers';
	import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

	interface CommonProps<Params> {
		builder?: Builder;
		testId?: string;
		transition?: TransitionFunc<Params>;
		params?: Params;
	}

	interface DivProps<Params> extends CommonProps<Params>, HTMLAttributes<HTMLDivElement> {
		as?: 'div';
	}

	interface ButtonProps<Params> extends CommonProps<Params>, HTMLButtonAttributes {
		as: 'button';
	}

	interface AnchorProps<Params> extends CommonProps<Params>, HTMLAnchorAttributes {
		as: 'a';
	}

	interface AnyElementProps<Params> extends CommonProps<Params>, HTMLAttributes<HTMLElement> {
		as: keyof HTMLElementTagNameMap;
	}

	export type FrameProps<Params = unknown> =
		| DivProps<Params>
		| ButtonProps<Params>
		| AnchorProps<Params>
		| AnyElementProps<Params>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { noopBuilder, noopTransition } from '$lib/utils/helpers';

	type Params = $$Generic;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = FrameProps<Params>;

	export let as: keyof HTMLElementTagNameMap = 'div';
	export let builder: Builder = noopBuilder;
	export let testId: string | undefined = undefined;
	export let transition: TransitionFunc<Params> = noopTransition;
	export let params: Params | undefined = undefined;
	let className: string | null | undefined = undefined;
	export { className as class };
</script>

<!-- TODO: I don't think you need a role for buttons or anchors. -->
<svelte:element
	this={as}
	role={as === 'a' ? 'link' : as === 'button' ? 'button' : undefined}
	data-testid={testId}
	transition:transition={params}
	class={cn(className)}
	use:builder.action
	{...builder}
	on:click
	on:change
	on:keydown
	on:keyup
	on:touchstart
	on:touchend
	on:touchcancel
	on:mouseenter
	on:mouseleave
	{...$$restProps}
>
	<slot />
</svelte:element>
