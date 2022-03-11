import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useFancyEffect } from './useFancyEffect';

describe('useFancyEffect', () => {
  test('should act like `useEffect` with `dependencyList` if there is no `fancyHelper`', (done) => {
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

      useFancyEffect(() => {
        callbackMock(color, clicks);
      }, [color]);

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
    expect(callbackMock).lastCalledWith(colors[0], 0);

    const clicksBtn = screen.getByTestId('clicks');
    const colorBtn = screen.getByTestId('color');

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).lastCalledWith(colors[0], 0);

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(2);
    expect(callbackMock).lastCalledWith(colors[1], 1);

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(3);
    expect(callbackMock).lastCalledWith(colors[2], 1);

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(3);
    expect(callbackMock).lastCalledWith(colors[2], 1);

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(4);
    expect(callbackMock).lastCalledWith(colors[3], 2);

    done();
  });

  test('should act like `useEffect` with empty `dependencyList` if there is no `fancyHelper`', (done) => {
    const callbackMock = jest.fn();
    const colors = ['teal', 'orange', 'springgreen', 'pink'];

    function Component() {
      const [color, setColor] = React.useState(colors[0]);

      const handleClickOnColor = () => {
        const index = colors.indexOf(color);
        setColor(colors[(index + 1) % colors.length]);
      };

      useFancyEffect(() => {
        callbackMock(color);
      }, []);

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
    expect(callbackMock).lastCalledWith(colors[0]);

    const colorBtn = screen.getByTestId('color');

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).lastCalledWith(colors[0]);

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(1);

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(1);

    done();
  });

  test('should act like `useEffect` with empty `dependencyList` which has a `cleanup` if there is no `fancyHelper`', (done) => {
    const cleanupMock = jest.fn();
    const callbackMock = jest.fn().mockImplementation(() => cleanupMock);

    function Component() {
      useFancyEffect(callbackMock, []);
      return null;
    }

    function Parent() {
      const [show, setShow] = React.useState(false);

      const handleClickOnShow = () => {
        setShow(!show);
      };

      return (
        <>
          <button
            data-testid="show"
            type="button"
            onClick={handleClickOnShow}
          >
            Show it!
          </button>
          {show && <Component />}
        </>
      );
    }

    render(<Parent />);

    expect(callbackMock).toBeCalledTimes(0);
    expect(cleanupMock).toBeCalledTimes(0);

    const showBtn = screen.getByTestId('show');

    fireEvent.click(showBtn);
    expect(callbackMock).toBeCalledTimes(1);
    expect(cleanupMock).toBeCalledTimes(0);

    fireEvent.click(showBtn);
    expect(callbackMock).toBeCalledTimes(1);
    expect(cleanupMock).toBeCalledTimes(1);

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

      useFancyEffect(() => {
        callbackMock(color, clicks);
      }, [color], fancyHelperMock);

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
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).lastCalledWith(colors[0], 0);
    expect(fancyHelperMock).toBeCalledTimes(1);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: undefined, newDeps: [colors[0]], count: 1,
    });

    const clicksBtn = screen.getByTestId('clicks');
    const colorBtn = screen.getByTestId('color');

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).lastCalledWith(colors[0], 0);
    expect(fancyHelperMock).toBeCalledTimes(1);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: undefined, newDeps: [colors[0]], count: 1,
    });

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(2);
    expect(callbackMock).lastCalledWith(colors[1], 1);
    expect(fancyHelperMock).toBeCalledTimes(2);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[0]], newDeps: [colors[1]], count: 2,
    });

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(3);
    expect(callbackMock).lastCalledWith(colors[2], 1);
    expect(fancyHelperMock).toBeCalledTimes(3);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[1]], newDeps: [colors[2]], count: 3,
    });

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(3);
    expect(callbackMock).lastCalledWith(colors[2], 1);
    expect(fancyHelperMock).toBeCalledTimes(3);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[1]], newDeps: [colors[2]], count: 3,
    });

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(4);
    expect(callbackMock).lastCalledWith(colors[3], 2);
    expect(fancyHelperMock).toBeCalledTimes(4);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[2]], newDeps: [colors[3]], count: 4,
    });

    // from now on, fancyHelper would return `false`

    fireEvent.click(colorBtn);
    // it does not execute `callback` at all
    expect(callbackMock).toBeCalledTimes(4);
    expect(callbackMock).lastCalledWith(colors[3], 2);
    // it executes `fancyHelper` with new arguments
    expect(fancyHelperMock).toBeCalledTimes(5);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[3]], newDeps: [colors[0]], count: 5,
    });

    fireEvent.click(colorBtn);
    expect(callbackMock).toBeCalledTimes(4);
    expect(callbackMock).lastCalledWith(colors[3], 2);
    expect(fancyHelperMock).toBeCalledTimes(6);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: [colors[0]], newDeps: [colors[1]], count: 6,
    });

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(4);
    expect(callbackMock).lastCalledWith(colors[3], 2);
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

      useFancyEffect(() => {
        callbackMock(clicks);
      }, [], fancyHelperMock);

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
    expect(callbackMock).lastCalledWith(0);
    expect(fancyHelperMock).toBeCalledTimes(1);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: undefined, newDeps: [], count: 1,
    });

    const clicksBtn = screen.getByTestId('clicks');

    fireEvent.click(clicksBtn);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).lastCalledWith(0);
    expect(fancyHelperMock).toBeCalledTimes(1);
    expect(fancyHelperMock).lastCalledWith({
      prevDeps: undefined, newDeps: [], count: 1,
    });

    done();
  });
});
