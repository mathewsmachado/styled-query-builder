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

describe('breakpoints', () => {
  it('should receive 2 parameters and return a string with the given media query', () => {
    const { breakpoints } = mediaQueryBuilder(breakpointsMock);

    expect(breakpoints('below', 'sm')).toBe('(max-width: 576px)');
    expect(breakpoints('above', 576)).toBe('(min-width: 576px)');
    expect(breakpoints('below', '576')).toBe('(max-width: 576px)');
  });

  it('should receive 3 parameters and return a string with the given media query', () => {
    const { breakpoints } = mediaQueryBuilder(breakpointsMock);
    const correctResponse = '(min-width: 1024px) and (max-width: 576px)';

    expect(breakpoints('between', 'lg', 'sm')).toBe(correctResponse);
    expect(breakpoints('between', 1024, 576)).toBe(correctResponse);
    expect(breakpoints('between', '1024', '576')).toBe(correctResponse);
    expect(breakpoints('between', 1024, '576')).toBe(correctResponse);
  });

  it('should throw an error if a size is passed with a unit', () => {
    const { breakpoints } = mediaQueryBuilder(breakpointsMock);

    expect(() => breakpoints('below', '576px')).toThrow();
    expect(() => breakpoints('between', '1024px', '576')).toThrow();
    expect(() => breakpoints('between', '1024', '576rem')).toThrow();
  });
});
