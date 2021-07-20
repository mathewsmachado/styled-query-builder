import { CSSObject, FlattenSimpleInterpolation } from 'styled-components';

export type SizeUnit = 'px' | 'rem';

export type MediaQueryType = 'above' | 'below' | 'between';

export type Breakpoints = { [Key: string]: number };

export type Size = keyof Breakpoints | string | number;

export type Sizes = [Size, Size] | Size;

export type AntiOverlap = Omit<Size, keyof Breakpoints>;

export type BreakpointGenerator = (
  mediaQueryType: MediaQueryType,
  sizes: Sizes,
  antiOverlap?: AntiOverlap
) => string;

export type CssProps = CSSObject | TemplateStringsArray;

export type StyledFunction = (cssProps: CssProps) => FlattenSimpleInterpolation;

export type BuilderReturn = {
  above: (size: Size, antiOverlap?: AntiOverlap) => StyledFunction;
  below: (size: Size, antiOverlap?: AntiOverlap) => StyledFunction;
  between: (sizes: Sizes) => StyledFunction;
  breakpoints: Breakpoint;
};

export declare function above(
  size: Size,
  antiOverlap?: AntiOverlap
): StyledFunction;

export declare function below(
  size: Size,
  antiOverlap?: AntiOverlap
): StyledFunction;

export declare function between(sizes: Sizes): StyledFunction;

export declare function breakpoints(
  mediaQueryType: MediaQueryType,
  sizes: Sizes,
  antiOverlap?: AntiOverlap
): string;

export declare function builder(
  userBreakpoints: Breakpoints,
  sizeUnit?: SizeUnit
): BuilderReturn;
