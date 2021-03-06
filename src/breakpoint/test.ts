/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { breakpoint } from '.';

describe('breakpoint', () => {
  const breakpoints = breakpoint({ sm: 576, md: 768, lg: 1024 }, 'px');

  it('should return a function on the first invocation', () => {
    expect(breakpoints).toStrictEqual(expect.any(Function));
  });

  it('should return a string with a simple media query', () => {
    expect(breakpoints('below', 'sm')).toBe('(max-width: 576px)');
    expect(breakpoints('above', 576)).toBe('(min-width: 576px)');
    expect(breakpoints('below', '576')).toBe('(max-width: 576px)');
  });

  it('should return a string with a composed media query', () => {
    const correctResponse = '(min-width: 1024px) and (max-width: 576px)';

    expect(breakpoints('between', ['lg', 'sm'])).toBe(correctResponse);
    expect(breakpoints('between', ['lg', 576])).toBe(correctResponse);
    expect(breakpoints('between', [1024, 'sm'])).toBe(correctResponse);
    expect(breakpoints('between', ['1024', '576'])).toBe(correctResponse);
    expect(breakpoints('between', [1024, 576])).toBe(correctResponse);
    expect(breakpoints('between', [1024, '576'])).toBe(correctResponse);
    expect(breakpoints('between', ['1024', 576])).toBe(correctResponse);
  });

  it('should apply the "antiOverlap" value to the expected media query', () => {
    expect(breakpoints('below', 'sm', 1)).toBe('(max-width: 575px)');
    expect(breakpoints('above', 576, '1')).toBe('(min-width: 577px)');
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

  it(`should throw an error if the 'size' property be a word but the
  'breakpoints' object do not contains it`, () => {
    expect(() => breakpoints('below', 'noExistentBreakpoint')).toThrow();
  });

  it(`should throw an error if media query type be 'between' and an antiOverlap
  property be provided`, () => {
    expect(() => breakpoints('between', ['1024px', '576'], 1)).toThrow();
    expect(() => breakpoints('between', ['1024px', '576'], '1')).toThrow();
  });

  it(`should throw an error if media query type be 'between' and 'sizes'
  property don't be an array with two positions`, () => {
    expect(() => breakpoints('between', '1024')).toThrow();
    expect(() => breakpoints('between', 1024)).toThrow();

    expect(() => breakpoints('between', ['1024'])).toThrow();
    expect(() => breakpoints('between', [1024])).toThrow();
  });
});
