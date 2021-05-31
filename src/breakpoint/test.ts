import { breakpoint } from '.';

const breakpointsMock = { sm: 576, md: 768, lg: 1024 };

describe('breakpoint', () => {
  const breakpoints = breakpoint(breakpointsMock, 'px');

  it(`should accept breakpoints and return a function on the first
  invocation`, () => {
    expect(breakpoints).toStrictEqual(expect.any(Function));
  });

  it(`should receive a media query type and a size as a single value and return
  a string with the given media query`, () => {
    expect(breakpoints('below', 'sm')).toBe('(max-width: 576px)');
    expect(breakpoints('above', 576)).toBe('(min-width: 576px)');
    expect(breakpoints('below', '576')).toBe('(max-width: 576px)');
  });

  it(`should receive a media query type with the "between" value and a size as
  an array and return a string with the given media query`, () => {
    const correctResponse = '(min-width: 1024px) and (max-width: 576px)';

    expect(breakpoints('between', ['lg', 'sm'])).toBe(correctResponse);
    expect(breakpoints('between', ['lg', 576])).toBe(correctResponse);
    expect(breakpoints('between', [1024, 'sm'])).toBe(correctResponse);
    expect(breakpoints('between', ['1024', '576'])).toBe(correctResponse);
    expect(breakpoints('between', [1024, 576])).toBe(correctResponse);
    expect(breakpoints('between', [1024, '576'])).toBe(correctResponse);
    expect(breakpoints('between', ['1024', 576])).toBe(correctResponse);
  });

  it(`should receive a media query type, a size and an antiOverlap and return a
  string with the given media query`, () => {
    expect(breakpoints('below', 'sm', 1)).toBe('(max-width: 575px)');
    expect(breakpoints('above', 576, '1')).toBe('(min-width: 577px)');
  });

  it(`should throw an error if user choose "between" option and passes a
  "antiOverlap" value`, () => {
    expect(() => breakpoints('between', ['1024px', '576'], 1)).toThrow();
    expect(() => breakpoints('between', ['1024px', '576'], '1')).toThrow();
  });

  it(`should throw an error if user choose "between" option and don't pass
  an array`, () => {
    expect(() => breakpoints('between', '1024')).toThrow();
  });

  it('should throw an error if a size is passed with a unit', () => {
    expect(() => breakpoints('below', '576px')).toThrow();
    expect(() => breakpoints('between', ['1024px', '576'])).toThrow();
    expect(() => breakpoints('between', ['1024', '576rem'])).toThrow();
  });

  it('should throw an error if an antiOverlap is passed with a unit', () => {
    expect(() => breakpoints('below', '576', '1px')).toThrow();
  });
});
