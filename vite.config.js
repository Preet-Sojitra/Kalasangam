import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import manifestForPlugIn from "./public/manifest.json"
import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugIn), // Pass your manifest configuration to VitePWA
    nodePolyfills(),
  ],
  // Your other Vite configuration options
})
