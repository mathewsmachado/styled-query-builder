import { breakpoint } from 'breakpoint';
import { mediaQuery } from 'mediaQuery';
import { Builder, HighOrderFunction } from 'types';

const builder: HighOrderFunction<Builder> = (userBreakpoints, sizeUnit) => ({
  ...mediaQuery(userBreakpoints, sizeUnit),
  breakpoints: breakpoint(userBreakpoints, sizeUnit),
});

export { builder };
