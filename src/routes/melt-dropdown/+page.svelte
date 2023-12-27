<script>
	// import Dropdown from '$lib/components/Dropdown';
	import Dropdown from '../ui/Dropdown.svelte';
	import Radio from '../ui/Radio.svelte';
</script>

<Dropdown asChild>
	<header class="p-4 border-b-[1px] border-slate-100 border-solid font-semibold">
		Choose a location
	</header>
	<div class="p-4 grid gap-2">
		<input type="search" />
		<div class="grid gap-2">
			<Radio label="Location 1" id="location-1" />
			<Radio label="Location 2" id="location-2" />
		</div>
	</div>
</Dropdown>

<!-- <Dropdown.Root>
	<Dropdown.Trigger />
	<Dropdown.Menu>
		<Dropdown.Item>Item 1</Dropdown.Item>
		<Dropdown.Item asChild let:builder>
			<div
				class="text-black text-sm pl-6 focus:bg-black focus:text-white"
				{...builder}
				use:builder.action
			>
				As Child
			</div>
		</Dropdown.Item>
		<Dropdown.CheckboxItem checked={true}>Checkbox Item 1</Dropdown.CheckboxItem>
	</Dropdown.Menu>
</Dropdown.Root> -->
