import type { Action } from 'svelte/action';
import type { TransitionConfig } from 'svelte/transition';

export function noop() {}

export type TransitionFunc<Params = unknown> = (
	node: HTMLElement,
	params?: Params
) => TransitionConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const noopTransition: TransitionFunc<any> = () => ({});

export type Builder = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	action: Action<HTMLElement, any>;
	[key: string]: unknown;
};

export const noopBuilder: Builder = { action: noop };
