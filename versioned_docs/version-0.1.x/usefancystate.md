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

Sets state if it is less than four.

```js
// App.jsx

import { useFancyState } from '@fancyreact/fancyhooks';

export function App() {
  const [clicks, setClicks] = useFancyState(0);

  const handleClick = () => {
    setClicks(
      // New state,
      // going to be set
      clicks + 1,
      // Helper function,
      // allows setting the state as long as it's divisible by four
      ({ newState }) => newState % 4 !== 0
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

[Play Online!](https://stackblitz.com/edit/fancyhooks-usefancystate-newstate-1?devToolsHeight=33&file=index.tsx)

### count

Sets state just 10 times.

```js
// App.jsx

import { useFancyState } from '@fancyreact/fancyhooks';

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

[Play Online!](https://stackblitz.com/edit/fancyhooks-usefancystate-count-1?devToolsHeight=33&file=index.tsx)

### prevState

Sets the state object if buttons are not filled.
It prevents component update if both buttons are filled and you want to click them once again.

```js
// App.jsx

import { useFancyState } from '@fancyreact/fancyhooks';

export function App() {
  const [filled, setFilled] = useFancyState({
    updates: 0,
    first: false,
    second: false,
  });

  const handleClick = (name) => {
    setFilled(
      // New state,
      // going to be set
      { ...filled, [name]: true, updates: filled.updates + 1 },
      // Helper function,
      // allows setting the state if one of the buttons are not filled,
      // helps you prevent extra updates
      ({ prevState }) => !prevState.first || !prevState.second
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
      <p>{`Updates ${filled.updates}`}</p>
    </>
  );
}
```

[Play Online!](https://stackblitz.com/edit/fancyhooks-usefancystate-prevstate-1?devToolsHeight=33&file=index.tsx)

## More

### How about `React.useState`

If you ignore `helper` function, the `fancySetState` acts just like setter function of `React.useState`.

```js
// App.jsx

import { useFancyState } from '@fancyreact/fancyhooks';

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
