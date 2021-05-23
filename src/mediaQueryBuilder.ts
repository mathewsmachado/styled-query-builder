type Breakpoints = { [Key: string]: number };

type SizeUnit = 'px' | 'rem';

type MediaQueryBuilderReturnType = {
  above: () => any;
  below: () => any;
  between: () => any;
  breakpoints: () => any;
};

export function mediaQueryBuilder(
  userBreakpoints: Breakpoints,
  sizeUnit: SizeUnit = 'px'
): MediaQueryBuilderReturnType {
  function above() {}
  function below() {}
  function between() {}
  function breakpoints() {}

  return { above, below, between, breakpoints };
}
