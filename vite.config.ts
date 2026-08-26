import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import mkcert from "vite-plugin-mkcert"
import framer from "vite-plugin-framer"

export default defineConfig({
  plugins: [react(), mkcert(), framer()],
  // Framer's Open Development Plugin looks for the plugin on 5173, so fail loudly
  // instead of silently moving to the next free port.
  server: { port: 5173, strictPort: true },
})
