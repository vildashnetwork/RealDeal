import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// ✅ Import lovable-tagger only dynamically in development
const getLovableTagger = async (mode: string) => {
  if (mode === "development") {
    try {
      const mod = await import("lovable-tagger");
      return mod.componentTagger();
    } catch (err) {
      console.warn("Lovable tagger not loaded in production build");
    }
  }
  return null;
};

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const tagger = await getLovableTagger(mode);

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), tagger].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
