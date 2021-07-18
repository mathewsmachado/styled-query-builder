import { breakpoint } from 'breakpoint';
import { mediaQuery } from 'mediaQuery';
import { Breakpoints, Builder, SizeUnit } from 'types';

function builder(userBreakpoints: Breakpoints, sizeUnit: SizeUnit): Builder {
  return {
    ...mediaQuery(userBreakpoints, sizeUnit),
    breakpoints: breakpoint(userBreakpoints, sizeUnit),
  };
}

export { builder };
