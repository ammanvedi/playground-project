import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { PluginOption } from 'vite'

function manifestApiPlugin(): PluginOption {
  return {
    name: 'manifest-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/md-manifest') return next();

        try {
          const mod = await server.ssrLoadModule('/src/lib/manifest.ts');
          const manifests = mod.manifests;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(manifests, null, 2));
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(e) }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), manifestApiPlugin()],
  server: {
    allowedHosts: true,
    host: '0.0.0.0',
    port: 3000,
  },
})
