import * as React from 'react';

import { deepClone } from '../utils';
import { FancyCallbackHelper, Callback } from '../../types';

export function useFancyCallback(
  callback: Callback,
  dependencyList: React.DependencyList,
  fancyHelper?: FancyCallbackHelper,
) {
  const depListRef = React.useRef<React.DependencyList>();
  const callbackRef = React.useRef<Callback>(callback);
  const countRef = React.useRef(1);

  React.useEffect(() => {
    countRef.current += 1;
  }, dependencyList);

  return React.useMemo(() => {
    const passedFancyCondition = typeof fancyHelper === 'function' ? fancyHelper({
      prevDeps: depListRef.current, newDeps: dependencyList, count: countRef.current,
    }) : true;
    const hasEmptyDependencies = Array.isArray(dependencyList) && dependencyList.length === 0;

    depListRef.current = deepClone(dependencyList);

    if (hasEmptyDependencies || passedFancyCondition) {
      callbackRef.current = callback;
    }
    return callbackRef.current;
  }, dependencyList);
}
