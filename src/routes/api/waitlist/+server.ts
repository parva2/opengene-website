import { json, error } from '@sveltejs/kit';
import {
	PRIVATE_AIRTABLE_BASE_ID,
	PRIVATE_TABLE_ID,
	PRIVATE_AIRTABLE_API_KEY
} from '$env/static/private';

export async function POST({ url }: { url: URL }) {
	const email = url.searchParams.get('email');
	if (!email) {
		error(400, { message: 'Missing email query parameter' });
	}
	try {
		const response = await fetch(
			`https://api.airtable.com/v0/${PRIVATE_AIRTABLE_BASE_ID}/${PRIVATE_TABLE_ID}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${PRIVATE_AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					records: [{ fields: { Email: email } }]
				})
			}
		);
		const data = await response.json();
		if (!response.ok) {
			error(response.status, { message: data.error?.message || 'Failed to create record' });
		}
		return json({ success: true, record: data.records[0] });
	} catch (err: any) {
		throw error(500, { message: err.message || 'Server error' });
	}
}
