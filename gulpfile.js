const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const webpack = require('webpack');
const ghpages = require('gh-pages');

const config = require('./webpack.config');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

async function cleanOutDir () {
  await fs.promises.rmdir(OUTPUT_DIR, { recursive: true });
}

function webpackCompile (done) {
  const compiler = webpack(config);

  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    const info = stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true, // Shows colors in the console,
    });

    console.log(info);
    done();
  });
}

function publishDocs (done) {
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
}

const build = gulp.series(cleanOutDir, webpackCompile);

exports.publish = gulp.series(build, publishDocs);
exports.build = build;
exports.default = build;
