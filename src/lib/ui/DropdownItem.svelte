<script context="module" lang="ts">
	import type { DropdownMenuItemProps } from '@melt-ui/svelte';

	interface DropdownItemProps extends DropdownMenuItemProps {
		asChild?: boolean;
		items?: any[];
	}
</script>

<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { dropdownCtx } from './Dropdown.svelte';

	type $$Props = DropdownItemProps;

	export let asChild: $$Props['asChild'] = false;

	const {
		elements: { item }
	} = dropdownCtx.get();
</script>

{#if asChild}
	<slot builder={$item} />
{:else}
	<div class="item" use:melt={$item}><slot builder={$item} /></div>
{/if}
