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

Executes `callback` if `input` is not empty.

```js
// App.jsx

import { useFancyEffect } from '@fancyreact/fancyhooks';

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
    ({ newDeps }) => newDeps[0].length > 0
  );

  const handleChange = (evt) => {
    setInput(evt.target.value);
  };

  return <input onChange={handleChange} value={input} />;
}
```

[Play Online!](https://stackblitz.com/edit/fancyhooks-usefancyeffect-newdeps-2?devToolsHeight=33&file=index.tsx)

### count

Executes `callback` if numer of dependency list updates are more than one.

```js
// App.jsx

import { useFancyEffect } from '@fancyreact/fancyhooks';

export function App() {
  const [input, setInput] = React.useState('');

  useFancyEffect(
    // Callback,
    // going to be executed
    () => {
      // API call...
      console.log('Calling API...');
    },
    // Dependency list
    [input],
    // Helper funcation,
    // allows executing the `callback` if `input` changes more than on time,
    // helps you ignore first rendering
    ({ count }) => count > 1
  );

  const handleChange = (evt) => {
    setInput(evt.target.value);
  };

  return <input onChange={handleChange} value={input} />;
}
```

[Play Online!](https://stackblitz.com/edit/fancyhooks-usefancyeffect-count-1?devToolsHeight=33&file=index.tsx)

### prevDeps

Executes `callback` if at least one of the values of state object not changed.
It prevents calling API if both buttons are clickec and you click one of them once again.

```js
// App.jsx

import { useFancyEffect } from '@fancyreact/fancyhooks';

export function App() {
  const [clicked, setClicked] = React.useState({ first: false, second: false });

  const handleClick = (name) => {
    setClicked({ ...clicked, [name]: true });
  };

  useFancyEffect(
    // Callback,
    // going to be executed
    () => {
      // API call...
      console.log('Calling API...');
    },
    // Dependency list
    [clicked],
    // Helper funcation,
    // allows executing the `callback` at least one button not clicked,
    // notice that initial `prevDeps` is `undefined`
    ({ prevDeps }) => prevDeps && (!prevDeps[0].first || !prevDeps[0].second)
  );

  return (
    <>
      <button onClick={() => handleClick('first')}>first</button>
      <button onClick={() => handleClick('second')}>second</button>
    </>
  );
}
```

[Play Online!](https://stackblitz.com/edit/fancyhooks-usefancyeffect-prevdeps-1?devToolsHeight=33&file=index.tsx)

## More

### Initial `prevDeps`

Notice that inital value of `prevDeps` is undefined.

### How about `React.useEffect`

If you ignore `helper` function, the `useFancyEffect` acts just like `React.useEffect`.

```js
// App.jsx

import { useFancyEffect } from '@fancyreact/fancyhooks';

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
