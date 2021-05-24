import { mediaQueryBuilder } from './mediaQueryBuilder';

const breakpointsMock = { sm: 576, md: 768, lg: 1024 };

describe('mediaQueryBuilder', () => {
  it('should be a function that returns an object with four other functions', () => {
    expect(mediaQueryBuilder(breakpointsMock)).toStrictEqual({
      above: expect.any(Function),
      below: expect.any(Function),
      between: expect.any(Function),
      breakpoints: expect.any(Function),
    });
  });
});
