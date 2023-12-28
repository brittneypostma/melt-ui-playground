<script lang="ts">
	import Dropdown from '../lib/ui/Dropdown.svelte';
	import Button from '../lib/ui/Button.svelte';
	import { Flex, MenuLink, Text, ArrowTrayDown, ListSolid, TrashcanOutline } from '@getprovi/craft';
	import DropdownItem from '$lib/ui/DropdownItem.svelte';
	import Radio from '$lib/ui/Radio.svelte';

	let menuItems = [
		{
			href: '#',
			iconName: ListSolid,
			title: 'View details',
			subtitle: 'View & track orders'
		},
		{
			href: '#',
			iconName: ArrowTrayDown,
			title: 'Archive'
		},
		{
			href: '#',
			iconName: TrashcanOutline,
			title: 'Delete'
		}
	];

	const retailers = [
		{
			name: 'test retailer 1',
			id: '1'
		},
		{
			name: 'test retailer 2',
			id: '2'
		},
		{
			name: 'test retailer 3',
			id: '3'
		},
		{
			name: 'test retailer 4',
			id: '4'
		},
		{
			name: 'test retailer 5',
			id: '5'
		}
	];

	let selected = retailers[0].name;
	$: value = selected;
</script>

<Flex column gap="16">
	<Flex column gap="8" class="craft">
		<Dropdown asChild label="Dropdown">
			{#each menuItems as { href, iconName, title, subtitle }, i}
				<DropdownItem asChild let:builder>
					<div use:builder.action>
						<MenuLink {href} {iconName} {title} {subtitle} {...builder} />
					</div>
				</DropdownItem>
			{/each}
		</Dropdown>
		<Dropdown secondary label="Dropdown" containerClass="max-h-[575px] overflow-y-auto w-[320px]">
			<Text slot="header" semibold>Choose a location</Text>
			<form>
				<Flex column>
					{#if retailers.length > 5}
						<DropdownItem asChild let:builder>
							<div use:builder.action class="div">
								<input
									type="search"
									id="search-locations"
									label="Search"
									hiddenLabel
									placeholder="Search locations"
								/>
							</div>
						</DropdownItem>
					{/if}
					<Flex column>
						{#each retailers as { id, name }}
							<DropdownItem asChild let:builder>
								<div use:builder.action>
									<Radio
										bind:group={selected}
										id={id.toString()}
										value={name}
										label={name}
										checked={selected === name}
										class="text-black"
									/>
								</div>
							</DropdownItem>
						{/each}
					</Flex>
				</Flex>
			</form>
			<Flex slot="footer" column gap="8">
				<DropdownItem asChild let:builder>
					<div use:builder.action>
						<Button
							type="submit"
							label="Choose Location"
							stretch
							bind:value
							on:submit={() => location.reload()}
						/>
					</div>
				</DropdownItem>
				<DropdownItem asChild let:builder>
					<div use:builder.action>
						<Button secondary stretch label="Add Location" href="/locations" />
					</div>
				</DropdownItem>
			</Flex>
		</Dropdown>
	</Flex>
</Flex>
