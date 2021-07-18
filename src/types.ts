import { CSSObject, FlattenSimpleInterpolation } from 'styled-components';

type SizeUnit = 'px' | 'rem';

type MediaQueryType = 'above' | 'below' | 'between';

type Breakpoints = { [Key: string]: number };

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

type MediaQuery = {
  above: (size: Size, antiOverlap?: AntiOverlap) => StyledFunction;
  below: (size: Size, antiOverlap?: AntiOverlap) => StyledFunction;
  between: (sizes: Sizes) => StyledFunction;
  breakpoints: Breakpoint;
};

export {
  AntiOverlap,
  Breakpoint,
  Breakpoints,
  MediaQuery,
  MediaQueryType,
  Size,
  SizeUnit,
  Sizes,
  StyledFunction,
};
