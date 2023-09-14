import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
	// Load env file based on `mode` in the current working directory.
	// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	const env = loadEnv(mode, process.cwd(), '');
	return {
		// vite config

		define: {
			'process.env.SERVER_API': JSON.stringify(env.SERVER_API),
		},

		server: {
			port: '3000',
			proxy: {
				'/api': 'http://localhost:5000/',
			},
		},
	};
});
