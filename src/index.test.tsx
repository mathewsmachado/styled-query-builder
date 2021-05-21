import React from 'react';
import { render, screen } from '@testing-library/react';

import { queryBuilder } from './index';

describe('queryBuilder', () => {
  it('should receive an undefined number of parameters and return them as a single string', () => {
    const result = queryBuilder('Are', 'tests', 'running', 'fine', '?');
    expect(result).toBe('Are tests running fine ?');
  });
});

describe('Visual component test', () => {
  it('should render correctly', () => {
    render(<h1>Styled Query Builder</h1>);
    expect(screen.getByRole('heading').innerHTML).toBe('Styled Query Builder');
  });
});
