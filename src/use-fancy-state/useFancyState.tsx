import * as React from 'react';

import { FancyStateHelper, FancySetState, FancyStateObject } from '../../types';
import { deepClone } from '../utils';

export function useFancyState<S = undefined>(
  initialState?: S | (() => S),
): [S, FancySetState<S>] {
  const [state, setState] = React.useState<S>(initialState as S);
  const stateRef = React.useRef(state);
  const countRef = React.useRef(0);
  const prevState = deepClone(stateRef.current);

  const fancySetState = (newState: S, fancyHelper?: FancyStateHelper<S>) => {
    stateRef.current = deepClone(state);
    countRef.current += 1;

    const passedFancyCondition = typeof fancyHelper === 'function' ? fancyHelper({
      prevState, newState, count: countRef.current,
    } as FancyStateObject<S>) : true;

    if (passedFancyCondition) { setState(newState); }
  };

  return [state, fancySetState];
}
