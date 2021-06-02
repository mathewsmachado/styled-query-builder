import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

import {
  AntiOverlap,
  breakpoint,
  HighOrderFunction,
  Size,
  Sizes,
} from 'breakpoint';

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

const mediaQuery: HighOrderFunction<MediaQuery> = (
  userBreakpoints,
  sizeUnit = 'px'
) => {
  const breakpoints = breakpoint(userBreakpoints, sizeUnit);

  const above: SingleMediaQuery =
    (size, antiOverlap = 0) =>
    (...cssProps) =>
      css`
        @media ${breakpoints('above', size, antiOverlap)} {
          ${css(...cssProps)}
        }
      `;

  const below: SingleMediaQuery =
    (size, antiOverlap = 0) =>
    (...cssProps) =>
      css`
        @media ${breakpoints('below', size, antiOverlap)} {
          ${css(...cssProps)}
        }
      `;

  const between: DoubleMediaQuery =
    (sizes) =>
    (...cssProps) =>
      css`
        @media ${breakpoints('between', sizes)} {
          ${css(...cssProps)}
        }
      `;

  return { above, below, between };
};

export { mediaQuery, MediaQuery };
