import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: {
      file: 'dist/pnc-js-libs.js',
      format: 'umd',
      name: "PncJsLibs"
    },
    plugins: [resolve()]
  };
