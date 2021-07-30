const path = require('node:path');

const gulp = require('gulp');
const webpack = require('webpack');
const ghpages = require('gh-pages');

const config = require('./webpack.config');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

const webpackCompile = (done) => {
  const compiler = webpack(config);

  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    const info = stats.toString({
      // Makes the build much quieter
      chunks: false,
      // Shows colors in the console
      colors: true,
    });

    console.log(info);
    done();
  });
};

const publishDocs = (done) => {
  const options = {
    branch: 'gh-pages',
    message: `docs: update ${new Date().toISOString()}`,
  };

  ghpages.publish(OUTPUT_DIR, options, (err) => {
    if (err) {
      console.error('Unable to publish docs', err);
      return;
    }
    done();
  });
};

const build = gulp.series(webpackCompile);

exports.publish = gulp.series(build, publishDocs);
exports.build = build;
exports.default = build;
