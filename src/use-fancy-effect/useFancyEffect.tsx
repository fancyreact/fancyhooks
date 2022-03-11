import * as React from 'react';
import cloneDeep from 'lodash/cloneDeep';

import { FancyEffectHelper } from '../../types';

export function useFancyEffect(
  callback: React.EffectCallback,
  dependencyList?: React.DependencyList,
  fancyHelper?: FancyEffectHelper,
) {
  const depListRef = React.useRef<React.DependencyList>();
  const countRef = React.useRef(0);
  const prevDeps = cloneDeep(depListRef.current);

  React.useEffect(() => {
    depListRef.current = cloneDeep(dependencyList);
    countRef.current += 1;

    const passedFancyCondition = typeof fancyHelper === 'function' ? fancyHelper({
      prevDeps, newDeps: dependencyList, count: countRef.current,
    }) : true;
    const hasEmptyDependencies = Array.isArray(dependencyList) && dependencyList.length === 0;

    if (hasEmptyDependencies || passedFancyCondition) {
      const callbackResult = callback();
      if (typeof callbackResult === 'function') {
        return callbackResult;
      }
    }
    return undefined;
  }, dependencyList);
}
