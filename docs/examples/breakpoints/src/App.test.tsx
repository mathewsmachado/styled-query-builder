import '@testing-library/jest-dom';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import { breakpoints } from './dist/index.esm';

import App from './App';

describe('<App />', () => {
  it('should have an orange background-color by default', () => {
    render(<App />);
    expect(screen.getByText(/screen/).parentElement).toHaveStyle(
      'background-color: #ff8811'
    );
  });

  it('should have a pink background-color on small screens', () => {
    render(<App />);
    expect(screen.getByText(/screen/).parentElement).toHaveStyleRule(
      'background-color',
      '#ff8811',
      { media: breakpoints('below', 'small') }
    );
  });
});
