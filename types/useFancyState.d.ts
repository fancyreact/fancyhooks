export interface FancyStateObject<S> {
  prevState: S;
  newState: S;
  count: number;
}

export interface FancyStateHelper<S> {
  (args: FancyStateObject<S>): boolean;
}

/**
 * Accepts a state and a helper function. Fires state setter if the result of helper is true.
 *
 * @param state State that will pass to state setter.
 * @param fancyHelper A function that its return value act as condition for firing state setter.
 *
 * @version 0.1.0
 */
export interface FancySetState<S> {
  (state: S, fancyHelper?: FancyStateHelper<S>): void;
}

/**
 * Accepts initial state and returns a stateful value, and a function to update it.
 *
 * @param initialState Initail state or a function that returns initial state.
 * @returns An array of state as first item and state setter as second item.
 *
 * @version 0.1.0
 */
export function useFancyState<S>(
  initialState?: S | (() => S),
): [S, FancySetState<S>];
