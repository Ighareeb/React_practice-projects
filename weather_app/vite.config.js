import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process'; // Import the 'process' module

// https://vitejs.dev/config/
export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return defineConfig({
		plugins: [react()],
		define: {
			'process.env': JSON.stringify(env),
		},
	});
};
