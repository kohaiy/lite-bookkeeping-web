const fs = require('fs');
const path = require('path');
const { name, version } = require('../package.json');
const buildEnv = process.env.BUILD_ENV;

const buildInfoPath = path.join(__dirname, '../src/build-info.json');
const data = {
  name,
  version,
  buildEnv,
  buildTime: new Date().toISOString(),
};

fs.writeFileSync(buildInfoPath, JSON.stringify(data));
