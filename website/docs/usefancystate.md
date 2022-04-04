# useFancyState

It is like `React.useState` but its state setter is **fancy**!

```js
const [state, fancySetState] = useFancyState(initialState);
```

## `fancySetState` is Fancy!

`fancySetState` accepts two arguments.
* `state` Which is going to be set.
* `helper` A function that executes by `useFancyState` and if the result is `true` the `state` will set.

`fancySetState` passes an object with the following keys to `helper`.
* `newState` Current state. It passed to `fancySetState` as first argument.
* `prevState` Previous state.
* `count` Number of times`fancySetState` executed.

## Examples

Here are a few examples explaining usage of `useFancyState`.

### newState

Sets state if it is an even number.

```js
// App.jsx

import { useFancyState } from 'fancyhooks';

export function App() {
  const [clicks, setClicks] = useFancyState(0);

  const handleClick = () => {
    setClicks(
      // New state,
      // going to be set
      clicks + 1,
      // Helper function,
      // allows setting the state if it's even
      ({ newState }) => newState % 2 === 0,
    );
  };

  return (
    <>
      <p>Even clicks: {clicks}</p>
      <button onClick={handleClick}>Click Me!</button>
    </>
  );
}
```

### count

Sets state just 10 times.

```js
// App.jsx

import { useFancyState } from 'fancyhooks';

export function App() {
  const [input, setInput] = useFancyState('');

  const handleChange = (evt) => {
    setInput(
      // New state,
      // going to be set
      evt.target.value,
      // Helper function,
      // allows setting the state for just 10 times
      ({ count }) => count < 11,
    );
  };

  return <input type="text" onChange={handleChange} value={input} />;
}
```

### prevState

Sets the state object if its values changed.
It prevents component update if you click on clicked button once again.

```js
// App.jsx

import { useFancyState } from 'fancyhooks';

export function App() {
  const [filled, setFilled] = useFancyState({ first: false, second: false });

  const handleClick = (name) => {
    setFilled(
      // New state,
      // going to be set
      { ...filled, [name]: true },
      // Helper function,
      // allows setting the state object if its values changed,
      // helps you prevent extra updates
      ({ newState, prevState }) => (
        newState.first !== prevState.first || newState.second !== prevState.second
      ),
    );
  };

  return (
    <>
      <button
        onClick={() => handleClick('first')}
        style={{ backgroundColor: filled.first ? 'teal' : 'initial' }}
      >
        first
      </button>
      <button
        onClick={() => handleClick('second')}
        style={{ backgroundColor: filled.second ? 'teal' : 'initial' }}
      >
        second
      </button>
    </>
  );
}
```

## More

### How about `React.useState`

If you ignore `helper` function, the `fancySetState` acts just like setter function of `React.useState`.

```js
// App.jsx

import { useFancyState } from 'fancyhooks';

export function App() {
  const [input, setInput] = useFancyState('');

  const handleChange = (evt) => {
    // Acts like state setter of `React.useState`
    setInput(evt.target.value);
  };

  return <input type="text" onChange={handleChange} value={input} />;
}
```

### What is `count`

`count` is number of times `fancySetState` executed. It does not matter if `state` updated or not, it is counting helper executions.
