import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            utilities: path.resolve(__dirname, "src/utilities"),
        },
    },
    server: {
        port: 5183,
    },
});
