import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    `./src/*.ts`,
  ],

  clean: true,

  splitting: true,

  format: [`esm`, `cjs`],

  target: `node14`,

  watch: !!process.env.DEV,

  dts: process.env.DEV
    ? false
    : {
        compilerOptions: {
          paths: {},
          composite: false,
        },
      },
  tsconfig: `../../../tsconfig.lib.json`,
})
