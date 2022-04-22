import * as React from 'react';

import { DependenciesObject } from '.';

export type FancyMemoHelper = (fancyMemoObject: DependenciesObject) => boolean;

export interface Factory<T> {
  (): T;
}

/**
 * Will only recompute the memoized value when one of the `deps` has changed and result of `fancyHelper` is true.
 *
 * @param factory A factory that its returning value should be memoized.
 * @param dependencyList List of dependencies, changing them is one of the conditions helps result of factory changes.
 * @param fancyHelper A function that its return value act as another condition for changing the factory result.
 *
 * @version 0.2.0
 */
export function useFancyMemo<T>(
  factory: Factory<T>,
  dependencyList?: React.DependencyList,
  fancyHelper?: FancyMemoHelper,
): T;
