// vite.config.js
import path from "path";
import { defineConfig } from "file:///Users/justinkimbrell/Code/pinia-pouchdb-plugin/node_modules/vite/dist/node/index.js";

// package.json
var name = "pinia-pouchdb-plugin";

// vite.config.js
import vue from "file:///Users/justinkimbrell/Code/pinia-pouchdb-plugin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { pascalCase } from "file:///Users/justinkimbrell/Code/pinia-pouchdb-plugin/node_modules/change-case/dist/index.js";
import { viteCommonjs } from "file:///Users/justinkimbrell/Code/pinia-pouchdb-plugin/node_modules/@originjs/vite-plugin-commonjs/lib/index.js";
import { babel } from "file:///Users/justinkimbrell/Code/pinia-pouchdb-plugin/node_modules/@rollup/plugin-babel/dist/es/index.js";
import dts from "file:///Users/justinkimbrell/Code/pinia-pouchdb-plugin/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/justinkimbrell/Code/pinia-pouchdb-plugin";
var vite_config_default = defineConfig(({ mode }) => ({
  optimizeDeps: {
    allowNodeBuiltins: ["pouchdb", "pouchdb-utils"]
  },
  build: {
    target: "es2015",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "index.ts"),
      name: pascalCase(name),
      fileName: (format) => `${name}.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        assetFileNames: ({ name: name2 }) => {
          if (name2 === "style.css") {
            return `${filename}.css`;
          }
          return name2;
        },
        globals: {
          vue: "Vue"
        }
      },
      plugins: [
        babel({
          babelHelpers: "bundled"
        })
      ]
    }
  },
  plugins: [
    viteCommonjs(),
    vue(),
    dts()
  ],
  define: {
    global: "window"
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvanVzdGlua2ltYnJlbGwvQ29kZS9waW5pYS1wb3VjaGRiLXBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvcGluaWEtcG91Y2hkYi1wbHVnaW4vdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvcGluaWEtcG91Y2hkYi1wbHVnaW4vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBuYW1lIH0gZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyBwYXNjYWxDYXNlIH0gZnJvbSBcImNoYW5nZS1jYXNlXCI7XG5pbXBvcnQgeyB2aXRlQ29tbW9uanMgfSBmcm9tICdAb3JpZ2luanMvdml0ZS1wbHVnaW4tY29tbW9uanMnO1xuaW1wb3J0IHsgYmFiZWwgfSBmcm9tICdAcm9sbHVwL3BsdWdpbi1iYWJlbCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5cbi8vIGltcG9ydCBub2RlUG9seWZpbGxzIGZyb20gJ3JvbGx1cC1wbHVnaW4tcG9seWZpbGwtbm9kZSc7XG4vLyBpbXBvcnQgeyBOb2RlR2xvYmFsc1BvbHlmaWxsUGx1Z2luIH0gZnJvbSAnQGVzYnVpbGQtcGx1Z2lucy9ub2RlLWdsb2JhbHMtcG9seWZpbGwnO1xuLy8gaW1wb3J0IGNvbW1vbmpzRXh0ZXJuYWxzIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbW1vbmpzLWV4dGVybmFscyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGFsbG93Tm9kZUJ1aWx0aW5zOiBbJ3BvdWNoZGInLCAncG91Y2hkYi11dGlscyddXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXMyMDE1JyxcbiAgICBsaWI6IHtcbiAgICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC50cycpLFxuICAgICAgICBuYW1lOiBwYXNjYWxDYXNlKG5hbWUpLFxuICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYCR7bmFtZX0uJHtmb3JtYXR9LmpzYCxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgZXh0ZXJuYWw6IFsndnVlJ10sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICh7IG5hbWUgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT09ICdzdHlsZS5jc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtmaWxlbmFtZX0uY3NzYDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgICAgICAgdnVlOiAnVnVlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgYmFiZWwoe1xuICAgICAgICAgICAgICAgIGJhYmVsSGVscGVyczogJ2J1bmRsZWQnXG4gICAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgfVxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdml0ZUNvbW1vbmpzKCksXG4gICAgdnVlKCksXG4gICAgZHRzKClcbiAgXSxcbiAgZGVmaW5lOiB7XG4gICAgZ2xvYmFsOiAnd2luZG93JyxcbiAgfVxufSkpXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStULE9BQU8sVUFBVTtBQUNoVixTQUFTLG9CQUFvQjs7Ozs7O0FBRTdCLE9BQU8sU0FBUztBQUNoQixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGFBQWE7QUFDdEIsT0FBTyxTQUFTO0FBUGhCLElBQU0sbUNBQW1DO0FBY3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsY0FBYztBQUFBLElBQ1YsbUJBQW1CLENBQUMsV0FBVyxlQUFlO0FBQUEsRUFDbEQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNELE9BQU8sS0FBSyxRQUFRLGtDQUFXLFVBQVU7QUFBQSxNQUN6QyxNQUFNLFdBQVcsSUFBSTtBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUFXLEdBQUcsUUFBUTtBQUFBLElBQ3JDO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDWCxVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNKLGdCQUFnQixDQUFDLEVBQUUsTUFBQUEsTUFBSyxNQUFNO0FBQzFCLGNBQUdBLFVBQVMsYUFBYTtBQUNyQixtQkFBTyxHQUFHO0FBQUEsVUFDZDtBQUVBLGlCQUFPQTtBQUFBLFFBQ1g7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNMLEtBQUs7QUFBQSxRQUNUO0FBQUEsTUFDSjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ0wsTUFBTTtBQUFBLFVBQ0YsY0FBYztBQUFBLFFBQ2xCLENBQUM7QUFBQSxNQUNMO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbIm5hbWUiXQp9Cg==
