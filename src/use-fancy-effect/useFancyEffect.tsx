import * as React from 'react';

import { deepClone } from '../utils';
import { FancyEffectHelper } from '../../types';

export function useFancyEffect(
  callback: React.EffectCallback,
  dependencyList?: React.DependencyList,
  fancyHelper?: FancyEffectHelper,
) {
  const depListRef = React.useRef<React.DependencyList>();
  const countRef = React.useRef(0);

  React.useEffect(() => {
    countRef.current += 1;

    const passedFancyCondition = typeof fancyHelper === 'function' ? fancyHelper({
      prevDeps: depListRef.current, newDeps: dependencyList, count: countRef.current,
    }) : true;
    const hasEmptyDependencies = Array.isArray(dependencyList) && dependencyList.length === 0;

    depListRef.current = deepClone(dependencyList);

    if (hasEmptyDependencies || passedFancyCondition) {
      const callbackResult = callback();
      if (typeof callbackResult === 'function') {
        return callbackResult;
      }
    }
    // eslint hack!
    return undefined;
  }, dependencyList);
}
