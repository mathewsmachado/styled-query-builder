import { queryBuilder } from './index';

describe('queryBuilder', () => {
  it('should receive an undefined number of parameters and return them as a single string', () => {
    const result = queryBuilder('Are', 'tests', 'running', 'fine', '?');
    expect(result).toBe('Are tests running fine ?');
  });
});
