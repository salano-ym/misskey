import { type SharedOptions, rest } from 'msw';

export const onUnhandledRequest = ((req, print) => {
	if (req.url.hostname !== 'localhost' || /^\/(?:client-assets\/|fluent-emojis?\/|iframe.html$|node_modules\/|src\/|sb-|static-assets\/|vite\/)/.test(req.url.pathname)) {
		return
	}
	print.warning()
}) satisfies SharedOptions['onUnhandledRequest'];

export const commonHandlers = [
	rest.get('/twemoji/:codepoints.svg', async (req, res, ctx) => {
		const { codepoints } = req.params;
		const file = await import(`../node_modules/@discordapp/twemoji/dist/svg/${codepoints}.svg?raw`);
		return res(ctx.set('Content-Type', 'image/svg+xml'), ctx.body(file.default));
	}),
];
