import { breakpointBuilder } from './breakpointBuilder';

const breakpointsMock = { sm: 576, md: 768, lg: 1024 };

describe('breakpointBuilder', () => {
  it('should receive 2 parameters and return a function', () => {
    expect(breakpointBuilder(breakpointsMock, 'rem')).toStrictEqual(
      expect.any(Function)
    );
  });
});

describe('breakpoints', () => {
  const breakpoints = breakpointBuilder(breakpointsMock, 'px');

  it('should receive 2 parameters with the second being a single value and return a string with the given media query', () => {
    expect(breakpoints('below', 'sm')).toBe('(max-width: 576px)');
    expect(breakpoints('above', 576)).toBe('(min-width: 576px)');
    expect(breakpoints('below', '576')).toBe('(max-width: 576px)');
  });

  it('should receive 2 parameters with the second being an array and return a string with the given media query', () => {
    const correctResponse = '(min-width: 1024px) and (max-width: 576px)';

    expect(breakpoints('between', ['lg', 'sm'])).toBe(correctResponse);
    expect(breakpoints('between', [1024, 576])).toBe(correctResponse);
    expect(breakpoints('between', ['1024', '576'])).toBe(correctResponse);
    expect(breakpoints('between', [1024, '576'])).toBe(correctResponse);
  });

  it('should receive 3 parameters and return a string with the given media query', () => {
    expect(breakpoints('below', 'sm', 1)).toBe('(max-width: 575px)');
    expect(breakpoints('below', 'sm', '1')).toBe('(max-width: 575px)');
    expect(breakpoints('above', 576, 1)).toBe('(min-width: 577px)');
    expect(breakpoints('above', '576', '1')).toBe('(min-width: 577px)');
    expect(breakpoints('below', 576, '1')).toBe('(max-width: 575px)');
    expect(breakpoints('below', '576', 1)).toBe('(max-width: 575px)');
  });

  it('should return an error if user choose "between" option and passes a "antiOverlap" value', () => {
    expect((breakpoints('between', ['1024px', '576'], 1) as Error).name).toBe(
      'Error'
    );
    expect((breakpoints('between', ['1024px', '576'], '1') as Error).name).toBe(
      'Error'
    );
  });

  it('should return an error if a size is passed with a unit', () => {
    expect((breakpoints('below', '576px') as Error).name).toBe(
      'InvalidParamError'
    );
    expect((breakpoints('between', ['1024px', '576']) as Error).name).toBe(
      'InvalidParamError'
    );
    expect((breakpoints('between', ['1024', '576rem']) as Error).name).toBe(
      'InvalidParamError'
    );
  });
});
