import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

const base = process.env.BASE_PATH || "/";
const isPreview = process.env.IS_PREVIEW ? true : false;
const isProd = process.env.NODE_ENV === "production";

// https://vite.dev/config/
export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify(base),
    __IS_PREVIEW__: JSON.stringify(isPreview),
    __READDY_PROJECT_ID__: JSON.stringify(process.env.PROJECT_ID || ""),
    __READDY_VERSION_ID__: JSON.stringify(process.env.VERSION_ID || ""),
    __READDY_AI_DOMAIN__: JSON.stringify(process.env.READDY_AI_DOMAIN || ""),
  },
  plugins: [
    react(),
    AutoImport({
      imports: [
        {
          react: [
            "React",
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
            "useCallback",
            "useMemo",
            "useRef",
            "useImperativeHandle",
            "useLayoutEffect",
            "useDebugValue",
            "useDeferredValue",
            "useId",
            "useInsertionEffect",
            "useSyncExternalStore",
            "useTransition",
            "startTransition",
            "lazy",
            "memo",
            "forwardRef",
            "createContext",
            "createElement",
            "cloneElement",
            "isValidElement",
          ],
        },
        {
          "react-router-dom": [
            "useNavigate",
            "useLocation",
            "useParams",
            "useSearchParams",
            "Link",
            "NavLink",
            "Navigate",
            "Outlet",
          ],
        },
        {
          "react-i18next": ["useTranslation", "Trans"],
        },
      ],
      dts: true,
    }),
  ],
  base,
  build: {
    // Disable sourcemaps in production — saves 30-40% payload
    sourcemap: !isProd,
    outDir: "out",
    // Raise warning limit to avoid noise
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split heavy, rarely-needed libraries into separate async chunks
        // so the product-detail page never loads firebase/recharts/stripe/supabase
        manualChunks(id) {
          // Firebase — 400KB+ — only used in specific pages
          if (id.includes("firebase")) return "vendor-firebase";
          // Recharts — 200KB — only used in admin pages
          if (id.includes("recharts") || id.includes("d3-")) return "vendor-recharts";
          // Supabase — 150KB — only used in admin pages
          if (id.includes("@supabase")) return "vendor-supabase";
          // Stripe — 187KB — only used in checkout flow
          if (id.includes("@stripe")) return "vendor-stripe";
          // Sanity client — keep in its own chunk (used on product pages)
          if (id.includes("@sanity") || id.includes("groq")) return "vendor-sanity";
          // React ecosystem & i18n — always needed, cache separately
          if (id.includes("react-dom") || id.includes("react-router") || id.includes("i18next")) return "vendor-react";
          // Lucide icons — tree-shakeable but split for caching
          if (id.includes("lucide-react")) return "vendor-lucide";
        },
        // Stable filenames for long-term caching
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    // Inline small assets (<4KB) to reduce HTTP requests
    assetsInlineLimit: 4096,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
