<script lang="ts">
	export let initialData;
	import '../app.css';
	import { ALL_NOTES, SCALE_MAP } from '../utils';
	import Fretboard from './fretboard.svelte';

	console.log(initialData);

	let dataPromise: Promise<any>;
	let rootNoteSelect = '';
	let scaleTypeSelect = '';

	async function fetchData() {
		//GET /api/getScale/[rootNote]/[scaleType]/index.ts
		const response = await fetch(
			`/api/getScale/${rootNoteSelect.replace('#', 'Sharp')}/${scaleTypeSelect}`
		);
		return await response.json();
	}
</script>

<div
	style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 2rem; font-size: 1rem;"
>
	<div>
		<label>
			Root Note:
			<select name="rootNoteSelect" bind:value={rootNoteSelect} style="font-size: 1.5rem;">
				{#each ALL_NOTES as note}
					<option value={note}>{note}</option>
				{/each}
			</select>
		</label>
		<label>
			Scale:
			<select bind:value={scaleTypeSelect} style="font-size: 1.5rem;">
				{#each SCALE_MAP as scale}
					<option value="{scale.type}"> {scale.type} </option>
				{/each}
			</select>
		</label>

		<button
			on:click={() => {
				dataPromise = fetchData();
			}}>Submit</button
		>
	</div>
	<div style="min-height: 2em; margin: 1rem">
		{#await dataPromise}
			⌛
		{:then data}
			{#if data}
				<div style="font-size: 1rem;">
                    {#each data.scale as note}
                        {note}&nbsp;&nbsp;
                    {/each}
				</div>
			{:else}
				<div style="font-size: 1rem;">Select a scale...</div>
			{/if}
		{/await}
	</div>
</div>

<Fretboard scaleData={dataPromise} />
