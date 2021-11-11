import path from 'node:path';

export default {
  process(_, filename) {
    return `export default ${JSON.stringify(path.basename(filename))};`;
  },
};
