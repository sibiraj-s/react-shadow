const util = require('node:util');
const path = require('node:path');
const ghpages = require('gh-pages');

const BUILD_DIR = path.resolve(__dirname, '..', 'dist');
const publishAsync = util.promisify(ghpages.publish);

const options = {
  branch: 'gh-pages',
  message: `docs: update ${new Date().toISOString()}`,
};

const run = async () => {
  try {
    await publishAsync(BUILD_DIR, options);
  } catch (err) {
    console.error('Unable to publish docs', err);
    process.exit(1);
  }
};

run();
