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

    expect(clicksBtn.innerHTML).toEqual('0 clicks');

    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('1 clicks');

    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('1 clicks');

    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('2 clicks');

    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('3 clicks');

    fireEvent.click(clicksBtn);
    fireEvent.click(clicksBtn);
    fireEvent.click(clicksBtn);
    expect(clicksBtn.innerHTML).toEqual('3 clicks');

    done();
  });
});
