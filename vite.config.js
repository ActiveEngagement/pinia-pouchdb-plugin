import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
// import nodePolyfills from 'rollup-plugin-polyfill-node';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import commonjsExternals from 'vite-plugin-commonjs-externals';


// console.log(commonjsExternals);

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
      allowNodeBuiltins: ['pouchdb', 'pouchdb-utils'],
      // esbuildOptions: {
      //     // Node.js global to browser globalThis
      //     define: {
      //         global: 'globalThis',
      //     },
      //     // Enable esbuild polyfill plugins
      //     plugins: [
      //         NodeGlobalsPolyfillPlugin({
      //             buffer: true,
      //         }),
      //     ],
      // },
  },
  build: {
      // rollupOptions: {
      //     plugins: [
      //         nodePolyfills()
      //     ]
      // },
      // commonjsOptions: {
      //     include: [
      //         'node_modules/**'
      //     ],
      //     transformMixedEsModules: true,
      // },
  },
  plugins: [
    viteCommonjs(),
    vue(),
    // commonjsExternals.default({
    //   externals: ['path', /^pouch-db(\/.+)?$/],
    // }),
  ],
  define: {
    global: {},
  }
})
