import path from 'path';
import { defineConfig } from 'vite'
import { name } from './package.json';
import vue from '@vitejs/plugin-vue'
import { pascalCase } from "change-case";
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => !console.log(mode) && ({
  
  optimizeDeps: {
      allowNodeBuiltins: ['pouchdb', 'pouchdb-utils']
  },
  build: {
    target: 'es2015',
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
    dts({
      insertTypesEntry: true
    })
    // commonjsExternals.default({
    //   externals: ['path', /^pouch-db(\/.+)?$/],
    // }),
  ],
  define: {
    global: process.env.NODE_ENV === 'development' && {},
  }
}))
