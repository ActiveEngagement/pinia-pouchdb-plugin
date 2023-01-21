import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import vue from '@vitejs/plugin-vue';
import { pascalCase } from 'change-case';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { name } from './package.json';

// import nodePolyfills from 'rollup-plugin-polyfill-node';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import commonjsExternals from 'vite-plugin-commonjs-externals';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    optimizeDeps: {
        allowNodeBuiltins: ['pouchdb', 'pouchdb-utils']
    },
    build: {
        target: 'es2015',
        lib: {
            entry: path.resolve(__dirname, 'index.ts'),
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
        dts()
    ],
    define: {
        global: 'window',
    }
}));
