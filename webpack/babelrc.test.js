module.exports = {
  presets: [
    ['es2015', { modules: false }],
    'stage-0',
  ],
  plugins: [
    'rewire',
    'transform-runtime',
  ],
  sourceMaps: true,
};
