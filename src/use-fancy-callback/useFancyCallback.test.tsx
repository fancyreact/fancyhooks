import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useFancyCallback } from './useFancyCallback';

describe('useFancyCallback', () => {
  test('should act like `useCallback` with `dependencyList` if there is no `fancyHelper`', (done) => {
    const callbackMock = jest.fn();
    const colors = ['teal', 'orange', 'springgreen', 'pink'];

    function Component() {
      const [clicks, setClicks] = React.useState(0);
      const [color, setColor] = React.useState(colors[0]);

      const handleClickOnColor = () => {
        const index = colors.indexOf(color);
        setColor(colors[(index + 1) % colors.length]);
      };

      const handleClickOnClicks = () => {
        setClicks(clicks + 1);
      };

      // passing an inline function
      const callback = useFancyCallback(() => callbackMock(), [color]);

      React.useEffect(callback, [callback]);

      return (
        <>
          <button
            data-testid="color"
            type="button"
            onClick={handleClickOnColor}
          >
            color
          </button>
          <button
            data-testid="clicks"
            type="button"
            onClick={handleClickOnClicks}
          >
            clicks
          </button>
        </>
      );
    }

    render(<Component />);

    expect(callbackMock).toBeCalledTimes(1);

    const clicksBtn = screen.getByTestId('clicks');
    const colorBtn = screen.getByTestId('color');

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(1);

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(2);

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(3);

    fireEvent.click(clicksBtn);
    fireEvent.click(clicksBtn);
    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(3);

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(4);

    done();
  });

  test('should act like `useCallback` with empty `dependencyList` if there is no `fancyHelper`', (done) => {
    const callbackMock = jest.fn();
    const colors = ['teal', 'orange', 'springgreen', 'pink'];

    function Component() {
      const [color, setColor] = React.useState(colors[0]);

      const handleClickOnColor = () => {
        const index = colors.indexOf(color);
        setColor(colors[(index + 1) % colors.length]);
      };

      // passing an inline function
      const callback = useFancyCallback(() => callbackMock(), []);

      React.useEffect(callback, [callback]);

      return (
        <button
          data-testid="color"
          type="button"
          onClick={handleClickOnColor}
        >
          color
        </button>
      );
    }

    render(<Component />);

    expect(callbackMock).toBeCalledTimes(1);

    const colorBtn = screen.getByTestId('color');

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(1);

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(1);

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(1);

    done();
  });

  test('should apply `fancyHelper` in hook', (done) => {
    const callbackMock = jest.fn();
    const fancyHelperMock = jest.fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValue(false);
    const colors = ['teal', 'orange', 'springgreen', 'pink'];

    function Component() {
      const [clicks, setClicks] = React.useState(0);
      const [color, setColor] = React.useState(colors[0]);

      const handleClickOnColor = () => {
        const index = colors.indexOf(color);
        setColor(colors[(index + 1) % colors.length]);
      };

      const handleClickOnClicks = () => {
        setClicks(clicks + 1);
      };

      // passing an inline function
      const callback = useFancyCallback(() => callbackMock(), [color], fancyHelperMock);

      React.useEffect(callback, [callback]);

      return (
        <>
          <button
            data-testid="color"
            type="button"
            onClick={handleClickOnColor}
          >
            color
          </button>
          <button
            data-testid="clicks"
            type="button"
            onClick={handleClickOnClicks}
          >
            count
          </button>
        </>
      );
    }

    render(<Component />);

    // first render
    // mocked result -> true
    expect(callbackMock).toBeCalledTimes(1);
    expect(fancyHelperMock).toBeCalledTimes(1);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: undefined, newDeps: [colors[0]], count: 1,
    });

    const clicksBtn = screen.getByTestId('clicks');
    const colorBtn = screen.getByTestId('color');

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(1);
    expect(fancyHelperMock).toBeCalledTimes(1);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: undefined, newDeps: [colors[0]], count: 1,
    });

    // mocked result -> true
    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(2);
    expect(fancyHelperMock).toBeCalledTimes(2);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[0]], newDeps: [colors[1]], count: 2,
    });

    // mocked result -> true
    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(3);
    expect(fancyHelperMock).toBeCalledTimes(3);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[1]], newDeps: [colors[2]], count: 3,
    });

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(3);
    expect(fancyHelperMock).toBeCalledTimes(3);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[1]], newDeps: [colors[2]], count: 3,
    });

    // mocked result -> true
    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(4);
    expect(fancyHelperMock).toBeCalledTimes(4);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[2]], newDeps: [colors[3]], count: 4,
    });

    // from now on, fancyHelper would return `false`

    fireEvent.click(colorBtn);
    // it does not execute `callback` at all
    expect(callbackMock).toBeCalledTimes(4);
    // it executes `fancyHelper` with new arguments
    expect(fancyHelperMock).toBeCalledTimes(5);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[3]], newDeps: [colors[0]], count: 5,
    });

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(4);
    expect(fancyHelperMock).toBeCalledTimes(6);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[0]], newDeps: [colors[1]], count: 6,
    });

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(4);
    expect(fancyHelperMock).toBeCalledTimes(6);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[0]], newDeps: [colors[1]], count: 6,
    });

    done();
  });

  test('should not apply `fancyHelper` in hook if `dependencyList` is empty array', (done) => {
    const callbackMock = jest.fn();
    const fancyHelperMock = jest.fn().mockReturnValue(true);

    function Component() {
      const [clicks, setClicks] = React.useState(0);

      const handleClickOnClicks = () => {
        setClicks(clicks + 1);
      };

      // passing an inline function
      const callback = useFancyCallback(() => callbackMock(), [], fancyHelperMock);

      React.useEffect(callback, [callback]);

      return (
        <button
          data-testid="clicks"
          type="button"
          onClick={handleClickOnClicks}
        >
          count
        </button>
      );
    }

    render(<Component />);

    // first render
    expect(callbackMock).toBeCalledTimes(1);
    expect(fancyHelperMock).toBeCalledTimes(1);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: undefined, newDeps: [], count: 1,
    });

    const clicksBtn = screen.getByTestId('clicks');

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(1);
    expect(fancyHelperMock).toBeCalledTimes(1);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: undefined, newDeps: [], count: 1,
    });

    done();
  });
});
