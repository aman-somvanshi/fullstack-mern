/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */










// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return  Response.json({
// 			message: 'Hello World!'
// 		});
// 	},
// } satisfies ExportedHandler<Env>;







// We won't be writing code in the following manner but yeah it shows we can actually make it work-

// export default {
// 	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
// 		console.log(request.body);
// 		console.log(request.headers);
// 		console.log(request.method);
// 		console.log(request.url);


		
// 		if (request.method === "GET") {
// 			return Response.json({
// 				message: "you sent a get request"
// 			});
// 		} else {
// 			return Response.json({
// 				message: "you did not send a get request"
// 			});
// 		}
// 	},
// };





export default {
	async fetch(request, env, ctx): Promise<Response> {
		return  Response.json({
			message: 'Hello World!'
		});
	},
} satisfies ExportedHandler<Env>;

// This returns a promise of response object because first of all it's an async function, so it should return a promise and secondly, it is indeed returning a response object. So we used it's generic.



