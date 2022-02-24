import React from 'react';
import { render } from '@testing-library/react';

function App() {
  return <h1>Hello FancyHooks!</h1>;
}

describe('App Component', () => {
  it('should have hello react message', (done) => {
    const { getByText } = render(<App />);

    expect(
      getByText('Hello FancyHooks!'),
    ).toMatchInlineSnapshot(`
      <h1>
        Hello FancyHooks!
      </h1>
    `);

    done();
  });
});
