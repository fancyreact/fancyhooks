# useFancyEffect

It is like `React.useEffect` but has a helper which is **fancy**!

```js
useFancyEffect(callback, dependencyList, fancyHelper);
```

## `fancyHelper` is Fancy!

`useFancyEffect` passes an object with the following keys to `fancyHelper`.
* `newDeps` Current dependency list. It passed to `useFancyEffect` as first argument.
* `prevDeps` Previous dependency list.
* `count` Number of times`dependencyList` updated.

## Examples

Here are a few examples explaining usage of `useFancyEffect`.

### newDeps

Executes `callback` if `input` in dependency list is not empty.

```js
// App.jsx

import { useFancyEffect } from 'fancyhooks';

export function App() {
  const [input, setInput] = React.useState('');

  useFancyEffect(
    // Callback,
    // going to be executed
    () => {
      // API call...
    },
    // Dependency list
    [input],
    // Helper funcation,
    // allows executing the `callback` if `input` is not empty
    ({ newDeps }) => newDeps[0].length > 0,
  );

  const handleChagen = (evt) => {
    setInput(evt.target.value);
  };

  return <input onChange={handleChange} value={input} />;
}
```

### count

Executes `callback` if numer of dependency list updates are more than one.

```js
// App.jsx

import { useFancyEffect } from 'fancyhooks';

export function App() {
  const [input, setInput] = React.useState('');

  useFancyEffect(
    // Callback,
    // going to be executed
    () => {
      // API call...
    },
    // Dependency list
    [input],
    // Helper funcation,
    // allows executing the `callback` if `input` changes more than on time,
    // helps you ignore first rendering
    ({ count }) => count > 1,
  );

  const handleChagen = (evt) => {
    setInput(evt.target.value);
  };

  return <input onChange={handleChange} value={input} />;
}
```

### prevDeps

Executes `callback` if values of state object changed.
It prevents calling API if you click on clicked button once again.

```js
// App.jsx

import { useFancyEffect } from 'fancyhooks';

export function App() {
  const [filled, setFilled] = React.useState({ first: false, second: false });

  const handleClick = (name) => {
    setFilled({ ...filled, [name]: true });
  };

  useFancyEffect(
    // Callback,
    // going to be executed
    () => {
      // API call...
    },
    // Dependency list
    [filled],
    // Helper funcation,
    // allows executing the `callback` if `filled` values changed
    ({ newDeps, prevDeps }) => (
      newDeps[0].first !== prevDeps[0].first || newDeps[0].second !== prevDeps[0].second
    ),
  );

  return (
    <>
      <button onClick={() => handleClick('first')}>
        first
      </button>
      <button onClick={() => handleClick('second')}>
        second
      </button>
    </>
  );
}
```

## More

### How about `React.useEffect`

If you ignore `helper` function, the `useFancyEffect` acts just like `React.useEffect`.

```js
// App.jsx

import { useFancyEffect } from 'fancyhooks';

export function App() {
  const [input, setInput] = React.useState('');

  // Acts like `React.useEffect`
  useFancyEffect(
    () => {
      // API call...
    },
    [input],
  );

  const handleChagen = (evt) => {
    setInput(evt.target.value);
  };

  return <input onChange={handleChange} value={input} />;
}
```

### On mount

If the dependency list is an empty arry the `fancyHelper` will automatically be ignored by `useFancyEffect`. So, on mount effects and their cleanups (unmount) always execute.

### Deal with cleanup

Logically [cleanup function](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup) will be executed if `callback` function executes. So, if `fancyHelper` prevents executing `callback`, no cleanup would be available.

### What is `count`

`count` is number of times dependency list udpated. It does not matter if `fancyHelper` executed or not, it is counting dependency list updates.
