import { ALL_NOTES, SCALE_MAP } from '../../../../../utils';

const getNextNote = (rootNote: string, interval: number): string => {
	const currentIndex = ALL_NOTES.findIndex((string) => string === rootNote);
	// interval is the index you want to access on the array
	return ALL_NOTES[
		(currentIndex + (interval % ALL_NOTES.length) + ALL_NOTES.length) % ALL_NOTES.length
	];
};

const generateScale = (rootNote: string, intervals: number[]) =>
	intervals.map((interval) => getNextNote(rootNote, interval));

const intervalsFromScaleType = (scaleType: string) =>
	SCALE_MAP.find((scale) => scale.type === scaleType);

const unescapeSharps = (note: string) => note.replace('Sharp', '#'); // middleware?

export function get({ params }) {
	return {
		body: {
			rootNote: unescapeSharps(params.rootNote),
			scale: generateScale(unescapeSharps(params.rootNote), (intervalsFromScaleType(params.scaleType))!.intervals)
		}
	};
}
