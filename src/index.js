/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import users from "./users.json"

const paths = [
	{ path: "/user", func: requestUsers },
	{ path: "/products", func: requestProducts },
	{ path: "/voice", func: requestVoices },
];

export default {
	async fetch(request, env, ctx) {
		let requestPath = new URL(request.url).pathname;
		let response = new Response("Path not Available");

		console.log(requestPath);

		await paths.forEach( async resourcePath => {
			if (requestPath.startsWith(resourcePath.path)) {
				console.log(resourcePath);
				response = await resourcePath.func(request, env, ctx);
			}
		});


		console.log("Response: ", response);
		return response;
	},
};

async function requestUsers(request, env, ctx) {
	console.log("chegou aqui");
	return Response.json(users);
}

async function requestProducts(request, env, ctx) {
	return Response.json({});
}

async function requestVoices(request, env, ctx) {
	return new Response("Voices not available");
}
