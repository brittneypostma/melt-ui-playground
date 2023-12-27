<script lang="ts">
	import Button from '$lib/ui/Button.svelte';
	import { AlignJustify } from 'lucide-svelte';
	import { dropdownCtx } from './Root.svelte';

	const {
		elements: { trigger }
	} = dropdownCtx.get();
</script>

<Button builder={trigger} ariaLabel="Update dimensions">
	<AlignJustify class="square-4" />
	<span class="sr-only">Open Popover</span>
</Button>
