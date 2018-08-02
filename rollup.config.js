import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-minify-es'

const banner = '/**\n * Emitter\n *\n * Copyright 2018 Dmitry Dudin <dima@nuware.ru>\n */'

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/emitter.esm.js',
    format: 'esm',
    banner
  },
  external: ['@nuware/functions', '@nuware/lenses']
}, {
  input: 'src/index.js',
  output: {
    file: 'dist/emitter.umd.js',
    format: 'umd',
    name: 'nuware.Emitter',
    banner
  },
  plugins: [
    resolve()
  ]
}, {
  input: 'src/index.js',
  output: {
    file: 'dist/emitter.min.js',
    format: 'umd',
    name: 'nuware.Emitter'
  },
  plugins: [
    resolve(),
    minify()
  ]
}]
