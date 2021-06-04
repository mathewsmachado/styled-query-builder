import { breakpoint } from '.';

const breakpointsMock = { sm: 576, md: 768, lg: 1024 };

describe('breakpoint', () => {
  const breakpoints = breakpoint(breakpointsMock, 'px');

  it(`should accept a breakpoint object and return a function on the first
  invocation`, () => {
    expect(breakpoints).toStrictEqual(expect.any(Function));
  });

  it(`should receive a media query type with the value being 'below' or 'above'
  and a size as a number or as a string and return a string with the given
  media query`, () => {
    expect(breakpoints('below', 'sm')).toBe('(max-width: 576px)');
    expect(breakpoints('above', 576)).toBe('(min-width: 576px)');
    expect(breakpoints('below', '576')).toBe('(max-width: 576px)');
  });

  it(`should receive a media query type with the value being 'between' and a
  size as a number array or as a string array and return a string with the
  given media query`, () => {
    const correctResponse = '(min-width: 1024px) and (max-width: 576px)';

    expect(breakpoints('between', ['lg', 'sm'])).toBe(correctResponse);
    expect(breakpoints('between', ['lg', 576])).toBe(correctResponse);
    expect(breakpoints('between', [1024, 'sm'])).toBe(correctResponse);
    expect(breakpoints('between', ['1024', '576'])).toBe(correctResponse);
    expect(breakpoints('between', [1024, 576])).toBe(correctResponse);
    expect(breakpoints('between', [1024, '576'])).toBe(correctResponse);
    expect(breakpoints('between', ['1024', 576])).toBe(correctResponse);
  });

  it(`should receive a media query type with the value being 'below' or 'above',
  a size and an antiOverlap being a number or a string and return a string with
  the given media query`, () => {
    expect(breakpoints('below', 'sm', 1)).toBe('(max-width: 575px)');
    expect(breakpoints('above', 576, '1')).toBe('(min-width: 577px)');
  });

  it(`should throw an error if media query type be 'between' and an antiOverlap
  property be provided`, () => {
    expect(() => breakpoints('between', ['1024px', '576'], 1)).toThrow();
    expect(() => breakpoints('between', ['1024px', '576'], '1')).toThrow();
  });

  it(`should throw an error if media query type be 'between' and 'sizes'
  property don't be a number array or a string array`, () => {
    expect(() => breakpoints('between', '1024')).toThrow();
    expect(() => breakpoints('between', 1024)).toThrow();
  });

  it(`should throw an error if the 'sizes' property is passed with a
  unit`, () => {
    expect(() => breakpoints('below', '576px')).toThrow();
    expect(() => breakpoints('between', ['1024px', '576'])).toThrow();
    expect(() => breakpoints('between', ['1024', '576rem'])).toThrow();
  });

  it(`should throw an error if the 'antiOverlap' property is passed with a
  unit`, () => {
    expect(() => breakpoints('below', '576', '1px')).toThrow();
  });
});
