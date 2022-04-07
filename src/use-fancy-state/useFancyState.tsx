import * as React from 'react';

import { FancyStateHelper, FancySetState, FancyStateObject } from '../../types';
import { deepClone } from '../utils';

export function useFancyState<S = undefined>(
  initialState?: S | (() => S),
): [S, FancySetState<S>] {
  const [state, setState] = React.useState<S>(initialState as S);
  const stateRef = React.useRef(state);
  const countRef = React.useRef(0);

  const fancySetState = (newState: S, fancyHelper?: FancyStateHelper<S>) => {
    countRef.current += 1;

    const passedFancyCondition = typeof fancyHelper === 'function' ? fancyHelper({
      prevState: stateRef.current, newState, count: countRef.current,
    } as FancyStateObject<S>) : true;

    if (passedFancyCondition) {
      stateRef.current = deepClone(newState);
      setState(newState);
    }
  };

  return [state, fancySetState];
}
