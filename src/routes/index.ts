
export async function get({ params }) {
	// `params.id` comes from [id].js
	const initialData = { message: 'Initial data'};

	return {
		status: 200,
		headers: {},
		body: { initialData }
	};

	// return {
	//   status: 404
	// };
}
