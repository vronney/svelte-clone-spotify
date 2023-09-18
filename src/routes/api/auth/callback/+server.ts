import type { RequestHandler } from './$types';
import { SPOTIFY_APP_CLIENT_ID, SPOTIFY_APP_CLIENT_SECRET, BASE_URL } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	const code = url.searchParams.get('code') || null;
	const state = url.searchParams.get('state') || null;

	const storedState = cookies.get('spoitfy_auth_state');
	const storedChallenge = cookies.get('spoitfy_auth_code_verifier') || null;

	if (state === null || state !== storedState) {
		throw error(400, 'state_mismatch');
	}

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${SPOTIFY_APP_CLIENT_ID}:${SPOTIFY_APP_CLIENT_SECRET}`
			).toString('base64')}`
		},
		body: new URLSearchParams({
			code: code || '',
			redirect_uri: `${BASE_URL}/api/auth/callback`,
			grant_type: 'authorization_code',
			code_verifier: storedChallenge || '',
			client_id: SPOTIFY_APP_CLIENT_ID
		})
	});
	const responseJSON = await response.json();

	if (responseJSON.error) {
		throw error(400, responseJSON.error_description);
	}
	cookies.delete('spoitfy_auth_state');
	cookies.delete('spoitfy_auth_code_verifier');
	cookies.set('referesh_token', responseJSON.refresh_token, { path: '/' });
	cookies.set('access_token', responseJSON.access_token, { path: '/' });

	throw redirect(303, '/');
};
