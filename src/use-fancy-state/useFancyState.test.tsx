import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useFancyState } from './useFancyState';

describe('useFancyState', () => {
  test('should act like `useState` if there is no `fancyHelper`', (done) => {
    function Component() {
      const [clicks, setClicks] = useFancyState(0);

      const handleClickOnClicks = () => {
        setClicks(clicks + 1);
      };

      return (
        <button
          data-testid="clicks"
          type="button"
          onClick={handleClickOnClicks}
        >
          {`${clicks} clicks`}
        </button>
      );
    }

    render(<Component />);

    const clicksBtn = screen.getByTestId('clicks');

    expect(clicksBtn.innerHTML).toEqual('0 clicks');

    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('1 clicks');

    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('2 clicks');

    fireEvent.click(clicksBtn);
    fireEvent.click(clicksBtn);
    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('5 clicks');

    done();
  });

  test('should apply `fancyHelper` in hook', (done) => {
    const fancyHelperMock = jest.fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    function Component() {
      const [clicks, setClicks] = useFancyState(0);

      const handleClickOnClicks = () => {
        setClicks(clicks + 1, fancyHelperMock);
      };

      return (
        <button
          data-testid="clicks"
          type="button"
          onClick={handleClickOnClicks}
        >
          {`${clicks} clicks`}
        </button>
      );
    }

    render(<Component />);

    const clicksBtn = screen.getByTestId('clicks');

    // on mount
    expect(fancyHelperMock).toHaveBeenCalledTimes(0);
    expect(clicksBtn.innerHTML).toEqual('0 clicks');

    // mocked result -> true
    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('1 clicks');
    expect(fancyHelperMock).toHaveBeenCalledTimes(1);
    expect(fancyHelperMock).toHaveBeenLastCalledWith({ prevState: 0, newState: 1, count: 1 });

    // mocked result -> false
    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('1 clicks');
    expect(fancyHelperMock).toHaveBeenCalledTimes(2);
    expect(fancyHelperMock).toHaveBeenLastCalledWith({ prevState: 1, newState: 2, count: 2 });

    // mocked result -> true
    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('2 clicks');
    expect(fancyHelperMock).toHaveBeenCalledTimes(3);
    expect(fancyHelperMock).toHaveBeenLastCalledWith({ prevState: 1, newState: 2, count: 3 });

    // mocked result -> true
    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('3 clicks');
    expect(fancyHelperMock).toHaveBeenCalledTimes(4);
    expect(fancyHelperMock).toHaveBeenLastCalledWith({ prevState: 2, newState: 3, count: 4 });

    // mocked result -> false
    fireEvent.click(clicksBtn);
    fireEvent.click(clicksBtn);
    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('3 clicks');
    expect(fancyHelperMock).toHaveBeenCalledTimes(7);
    expect(fancyHelperMock).toHaveBeenLastCalledWith({ prevState: 3, newState: 4, count: 7 });

    done();
  });
});
