import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import _ from 'lodash';

const packageString = readFileSync(
  join(process.cwd(), 'package.json'),
  'utf8',
);

const packageJson = JSON.parse(packageString);

const sanitizedPackage = _.assign(
  _.omit(packageJson, ['scripts', 'eslintConfig', 'jest']),
  {
    main: './cjs/index.js',
    module: './es/index.js',
    types: './types/index.d.ts',
    devDependencies: _.pick(packageJson?.devDependencies, ['@types/react']),
  },
);

writeFileSync(
  join(process.cwd(), 'package', 'package.json'),
  JSON.stringify(sanitizedPackage, null, 2),
);
