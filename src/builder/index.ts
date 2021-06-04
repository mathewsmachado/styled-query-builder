import { breakpoint, HighOrderFunction, Breakpoint } from 'breakpoint';
import { DoubleMediaQuery, mediaQuery, SingleMediaQuery } from 'mediaQuery';

type Builder = {
  breakpoints: Breakpoint;
  above: SingleMediaQuery;
  below: SingleMediaQuery;
  between: DoubleMediaQuery;
};

const builder: HighOrderFunction<Builder> = (userBreakpoints, sizeUnit) => {
  const breakpoints = breakpoint(userBreakpoints, sizeUnit);
  const { above, below, between } = mediaQuery(userBreakpoints, sizeUnit);

  return { above, below, between, breakpoints };
};

export { builder };
