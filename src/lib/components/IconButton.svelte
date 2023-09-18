<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {
		icon: ComponentType<Icon>;
		label: string;
	}

	export let icon: ComponentType<Icon>;
	export let label: string;

	let button: HTMLButtonElement;

	export function getButton() {
		return button;
	}
</script>

<button bind:this={button} on:click on:mouseover on:focus on:keydown {...$$restProps}>
	<svelte:component this={icon} color="var(--text-color)" aria-hidden="true" focusable="false" />
	<span class="visually-hidden">{label}</span>
</button>

<style lang="scss">
	button {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: color 0.2s ease-in-out;
		color: #fff;
		width: 38px;
		height: 38px;
		:global(svg) {
			vertical-align: middle;
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.6;
		}

		&:active {
			background-color: var(--menu-background-color);
		}
	}

	button:hover,
	button:focus {
		color: #1db954;
	}
</style>
