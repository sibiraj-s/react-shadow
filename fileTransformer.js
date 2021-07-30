const path = require('node:path');

module.exports = {
  process(_, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
