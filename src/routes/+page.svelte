<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$components/Button.svelte';
	import Card from '$components/Card.svelte';

	export let data: PageData;

	let sections: {
		title: string;
		path: string;
		items: (SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified)[];
	}[] = [];

	$: {
		if (data.newReleases) {
			sections.push({
				title: 'New Releases',
				path: '/sections/new-releases',
				items: data.newReleases.albums.items
			});
		}

		if (data.featuredPlaylists) {
			sections.push({
				title: 'Featured Playlists',
				path: '/sections/featured-playlists',
				items: data.featuredPlaylists.playlists.items
			});
		}

		data.homeCategories.forEach((category, index) => {
			const categoryPlaylist = data.categoriesPlaylists[index];
			if (categoryPlaylist) {
				sections.push({
					title: category.name,
					path: `/categories/${category.id}`,
					items: categoryPlaylist.playlists.items
				});
			}
		});

		if (data.userPlaylists) {
			sections.push({
				title: 'Your Playlists',
				path: '/playlists/playlists/',
				items: data.userPlaylists.items
			});
		}
	}
</script>

{#each sections as section}
	<section class="content-row">
		<div class="content-row-header">
			<div class="right">
				<h2 class="section-title">{section.title}</h2>
			</div>
			<div class="left">
				<Button element="a" href={section.path} variant="outline"
					>See All <span class="visually-hidden">{section.title}</span></Button
				>
			</div>
		</div>
		<div class="grid-items">
			{#each section.items as item}
				<div class="grid-item">
					<Card {item} />
				</div>
			{/each}
		</div>
	</section>
{/each}

<style lang="scss">
	.content-row {
		margin-bottom: 40px;

		.content-row-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1rem;

			.section-title {
				margin: 0;
				font-size: functions.toRem(22);
				font-weight: 600;
			}
		}
	}
</style>
