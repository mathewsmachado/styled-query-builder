import {
  breakpointBuilder,
  BreakpointBuilder,
  Breakpoints,
  SizeUnit,
} from './breakpointBuilder';

type MediaQueryBuilder = {
  above: () => any;
  below: () => any;
  between: () => any;
  breakpoints: BreakpointBuilder;
};

export function mediaQueryBuilder(
  userBreakpoints: Breakpoints,
  sizeUnit: SizeUnit = 'px'
): MediaQueryBuilder {
  const breakpoints = breakpointBuilder(userBreakpoints, sizeUnit);

  function above() {}
  function below() {}
  function between() {}

  return { above, below, between, breakpoints };
}
