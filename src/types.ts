import { CSSObject, FlattenSimpleInterpolation } from 'styled-components';

type Breakpoints = { [Key: string]: number };

type SizeUnit = 'px' | 'rem';

type HighOrderFunction<ReturnType> = (
  breakpoints: Breakpoints,
  sizeUnit: SizeUnit
) => ReturnType;

type MediaQueryType = 'above' | 'below' | 'between';

type Size = keyof Breakpoints | string | number;

type Sizes = [Size, Size] | Size;

type AntiOverlap = Omit<Size, keyof Breakpoints>;

type Breakpoint = (
  mediaQueryType: MediaQueryType,
  sizes: Sizes,
  antiOverlap?: AntiOverlap
) => string;

type CssProps = CSSObject | TemplateStringsArray;

type StyledFunction = (cssProps: CssProps) => FlattenSimpleInterpolation;

type SingleMediaQuery = (
  size: Size,
  antiOverlap?: AntiOverlap
) => StyledFunction;

type DoubleMediaQuery = (sizes: Sizes) => StyledFunction;

type MediaQuery = {
  above: SingleMediaQuery;
  below: SingleMediaQuery;
  between: DoubleMediaQuery;
};

type Builder = {
  breakpoints: Breakpoint;
  above: SingleMediaQuery;
  below: SingleMediaQuery;
  between: DoubleMediaQuery;
};

export {
  AntiOverlap,
  Breakpoint,
  Builder,
  DoubleMediaQuery,
  HighOrderFunction,
  MediaQuery,
  MediaQueryType,
  SingleMediaQuery,
  Size,
  Sizes,
  StyledFunction,
};
