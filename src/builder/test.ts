import { builder } from '.';

describe('builder', () => {
  it(`should receive a breakpoint object and a size unit being a string and
  return an object with four functions`, () => {
    expect(builder({ sm: 90, md: 100, lg: 110 }, 'rem')).toStrictEqual({
      above: expect.any(Function),
      below: expect.any(Function),
      between: expect.any(Function),
      breakpoints: expect.any(Function),
    });
  });
});
