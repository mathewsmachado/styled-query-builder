import { breakpoint, HighOrderFunction, Breakpoint } from 'breakpoint';
import { DoubleMediaQuery, mediaQuery, SingleMediaQuery } from 'mediaQuery';

type Builder = {
  breakpoints: Breakpoint;
  above: SingleMediaQuery;
  below: SingleMediaQuery;
  between: DoubleMediaQuery;
};

const builder: HighOrderFunction<Builder> = (userBreakpoints, sizeUnit) => ({
  ...mediaQuery(userBreakpoints, sizeUnit),
  breakpoints: breakpoint(userBreakpoints, sizeUnit),
});

export { builder };
