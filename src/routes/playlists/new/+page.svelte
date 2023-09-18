<script lang="ts">
	import PlaylistForm from '$components/PlaylistForm.svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<h2>Add a New Playlist</h2>

<PlaylistForm userID={data.user?.id} {form} action="?redirect" />
