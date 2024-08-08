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
	{ path: "/user", method: "GET", func: requestUsers },
	{ path: "/products", method: "POST", func: addNewProduct },
	{ path: "/products", method: "GET", func: requestProducts },
	{ path: "/voice", method: "GET", func: requestVoices },
];

export default {
	async fetch(request, env, ctx) {
		let requestPath = new URL(request.url).pathname;
		let response = new Response("Path not Available");

		console.log(requestPath);

		await paths.forEach( async resourcePath => {
			if (request.method === resourcePath.method && requestPath.startsWith(resourcePath.path)) {
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

async function addNewProduct(request, env, ctx) {
	return new Response("Cannot add products yet");
}


async function requestVoices(request, env, ctx) {
	return new Response("Voices not available");
}
