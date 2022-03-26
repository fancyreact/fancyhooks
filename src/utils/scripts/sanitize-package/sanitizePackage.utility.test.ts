import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import _ from 'lodash';

import packageJson from '../../../../package.json';

(readFileSync as jest.Mock).mockReturnValue(JSON.stringify(packageJson));
(writeFileSync as jest.Mock).mockImplementation(() => null);

// eslint-disable-next-line import/first
import './sanitizePackage.utility';

jest.mock('fs');

describe('sanitizePackage.utility', () => {
  test('should sanitize `package.json` file for `package`', () => {
    expect(readFileSync).toBeCalledTimes(1);
    expect(readFileSync).toBeCalledWith(
      join(process.cwd(), 'package.json'),
      'utf8',
    );

    const sanitizedPackage = _.assign(
      _.omit(packageJson, ['scripts', 'eslintConfig', 'jest']),
      {
        main: './cjs/index.js',
        module: './es/index.js',
        types: './types/index.d.ts',
        devDependencies: _.pick(packageJson?.devDependencies, ['@types/react']),
      },
    );
    expect(writeFileSync).toBeCalledTimes(1);
    expect(writeFileSync).toBeCalledWith(
      join(process.cwd(), 'package', 'package.json'),
      JSON.stringify(sanitizedPackage, null, 2),
    );
  });
});
