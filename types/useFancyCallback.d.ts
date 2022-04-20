import * as React from 'react';

import { DependenciesObject } from '.';

export type FancyCallbackHelper = (fancyCallbackObject: DependenciesObject) => boolean;

export type Callback = (...args: any[]) => any;

/**
 * Will return a memoized version of the `callback`.
 * `callback` only changes if one of the `dependencyList` has changed and result of `fancyHelper` is true.
 *
 * @param callback A callback that should be memoized.
 * @param dependencyList List of dependencies, changing them is one of the conditions helps callback changes.
 * @param fancyHelper A function that its return value act as another condition for changing callback.
 *
 * @version 0.2.0
 */
export function useFancyCallback<T extends Callback>(
  callback: T,
  dependencyList: React.DependencyList,
  fancyHelper?: FancyCallbackHelper,
): T;
