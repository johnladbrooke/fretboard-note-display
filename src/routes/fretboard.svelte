<script lang="ts">
	import { ALL_NOTES } from '../utils';

	export let scaleData: any;

	const strings = ['E', 'B', 'G', 'D', 'A', 'E'];
	export let frets = 22;
	const dotInlays = [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0];

	const findNextNote = (currentNote = '') => {
		if (currentNote.length) {
			let index = ALL_NOTES.findIndex((string) => string === currentNote);
			if (index + 1 === ALL_NOTES.length) {
				return ALL_NOTES[0];
			} else {
				return ALL_NOTES[index + 1];
			}
		} else {
			throw Error;
		}
	};

	const constructStrings = () =>
		strings.map((note) => {
			let arr = [note];
			for (let i = 0; i < frets; i++) {
				arr.push(findNextNote(arr[arr.length - 1]));
			}
			return arr;
		});
</script>

{#await scaleData then data}
	{#if data}
		<div>
			<div class="fretboard">
				{#each constructStrings() as string}
					<div id="stringGraphic" style="top: 7.7%; height: 0.1rem;" />
					<div id="stringGraphic" style="top: 23%; height: 0.15rem;" />
					<div id="stringGraphic" style="top: 37.5%; height: 0.18rem;" />
					<div id="stringGraphic" style="top: 52.3%; height: 0.2rem;" />
					<div id="stringGraphic" style="top: 67.8%; height: 0.25rem;" />
					<div id="stringGraphic" style="top: 82%; height: 0.27rem;" />
					<div
						class="string"
						style="display: grid; grid-template-columns: repeat({frets + 2}, 2fr); margin: 0;"
					>
						{#each string as note, i}
							{#if i === 0}
								<div class="openString">
									<div
										style={(data.rootNote === note && 'color:var(--root-accent-color)') ||
											(data.scale.includes(note) && 'color:var(--note-accent-color)')}
									>
										{note}
									</div>
								</div>
							{:else}
								<div class="noteContainer">
									<div class="note">
										{note}
									</div>
									<div
										class="noteBacking {(data.rootNote === note && 'backgroundCircleRootAccent') ||
											(data.scale.includes(note) && 'backgroundCircleNoteAccent') ||
											'backgroundCircleBlank'}"
									/>
								</div>
							{/if}
						{/each}
					</div>
				{/each}
				<div
					class="dotInlays"
					style="display: grid; grid-template-columns: repeat({frets + 2}, 1fr); grid-row-gap: 0;"
				>
					{#each dotInlays as dot}
						{#if dot === 1}
							<div class="dot" />
						{:else}
							<div class="blank" />
						{/if}
					{/each}
				</div>
			</div>
		</div>
	{/if}
{:catch error}
	<p>{error.message}</p>
{/await}

<style>
	:root {
		--blank-color: #e6c494;
		--dark: #9b9b9b;
		--pure-white: #ffffff;
		--primary-color: #b9c6d2;
		--note-accent-color: #0099ff;
		--root-accent-color: rgb(221, 0, 0);
		--text-color: #ffffff;
	}
	.fretboard {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		grid-row-gap: 0rem; /* Will be used instead by browsers that do not support `row-gap` */
		row-gap: 0rem; /* Used by browsers that support `row-gap` */
		min-width: 1200px;
		max-height: 100%;
		user-select: none; /* supported by Chrome and Opera */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		padding: 0.2rem;
		border: 1px solid var(--blank-color);
		color: var(--text-color);
		font-size: 1rem;
		font-weight: bold;
		background-color: #ebcc9e;
        position: relative;
	}
	#stringGraphic {
		z-index: 0;
		content: '';
		position: absolute;
		background: rgb(111, 111, 111);
		background: linear-gradient(
			0deg,
			rgba(111, 111, 111, 1) 0%,
			rgba(179, 179, 179, 1) 35%,
			rgba(217, 217, 217, 1) 100%
		);
		width: 100%;
	}
	.string {
		justify-items: center;
		align-items: center;
	}
	.dotInlays {
		margin: 0.3rem 0;
		justify-items: center;
		align-items: center;
		background-color: none;
	}
	.dot {
		content: '';
		height: 10px;
		width: 10px;
		background-color: var(--dark);
		border-radius: 50%;
	}
	.noteContainer {
		width: 100%;
		min-height: 36px;
		border-right: 3px solid var(--dark);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.openString {
		z-index: 2;
		width: 100%;
		border-right: 8px solid #ddd8c7;
		border-radius: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem 0;
		font-weight: bold;
		color: var(--text-color);
	}
	.note {
		z-index: 2;
	}
	.noteBacking {
		position: absolute;
		z-index: 1;
		position: absolute;
		border-radius: 50%;
		-moz-border-radius: 50%;
		-webkit-border-radius: 50%;
		height: 1.5rem;
		width: 1.5rem;
	}
	.backgroundCircleBlank {
		border: 3px solid var(--blank-color);
		background-color: var(--blank-color);
	}
	.backgroundCircleRootAccent {
		border: 3px solid var(--root-accent-color);
		background-color: var(--root-accent-color);
	}
	.backgroundCircleNoteAccent {
		border: 3px solid var(--note-accent-color);
		background-color: var(--note-accent-color);
	}
</style>
