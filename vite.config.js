import path from 'path';
import { defineConfig } from 'vite'
import { name } from './package.json';
import vue from '@vitejs/plugin-vue'
import { pascalCase } from "change-case";
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

// import nodePolyfills from 'rollup-plugin-polyfill-node';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import commonjsExternals from 'vite-plugin-commonjs-externals';

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
    lib: {
        entry: path.resolve(__dirname, 'index.js'),
        name: pascalCase(name),
        fileName: (format) => `${name}.${format}.js`,
    },
    rollupOptions: {
        external: ['vue'],
        output: {
            assetFileNames: ({ name }) => {
                if(name === 'style.css') {
                    return `${filename}.css`;
                }

                return name;
            },
            globals: {
                vue: 'Vue'
            },
        },
        plugins: [
            babel({
                babelHelpers: 'bundled'
            })
        ]
    }
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
