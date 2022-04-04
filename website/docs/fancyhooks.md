# Fancyhooks

> React Hooks and conditions in one place!

Fancy Hooks are set of hooks let you apply **conditions** to **React Hooks**.

## Know more

I want to implement a search input. It gets data from API while user is typing.
But there is a restriction. To make a request to API there should be at least three characters into the input.

```js
// App.jsx

export function App() {
  const [input, setInput] = React.useState('');

  React.useEffect(
    // (1) Callback
    () => {
      if (input.length > 2) {
        // API call...
      }
    },
    // (2) Dependency list
    [input],
  );

  const handleChagen = (evt) => {
    setInput(evt.target.value);
  };

  return <input onChange={handleChange} value={input} />;
}
```

With `useFancyEffect` you can bring the conditions to a `helper` function.

```js
// App.jsx

import { useFancyEffect } from 'fancyhooks';

export function App() {
  const [input, setInput] = React.useState('');

  useFancyEffect(
    // (1) Callback
    () => {
      // API call...
    },
    // (2) Dependency list
    [input],
    // (3) Helper
    ({ newDeps }) => newDeps[0].length > 3,
  );

  const handleChagen = (evt) => {
    setInput(evt.target.value);
  };

  return <input onChange={handleChange} value={input} />;
}
```

`newDeps` is current dependency list passing in an object to `helper` by `useFancyEffect`.
The `callback` functions will execute if the result of the `helper` function is `true`.

## License

MIT © [FancyHooks](https://github.com/fancyreact/fancyhooks)
