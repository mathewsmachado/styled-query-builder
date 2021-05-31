import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

import {
  AntiOverlap,
  breakpoint,
  Breakpoints,
  Size,
  Sizes,
  SizeUnit,
} from 'breakpoint';

type CssProps = CSSObject | TemplateStringsArray;

type StyledFunction = (cssProps: CssProps) => FlattenSimpleInterpolation;

type MediaQuery = {
  above: (size: Size, antiOverlap?: AntiOverlap) => StyledFunction;
  below: (size: Size, antiOverlap?: AntiOverlap) => StyledFunction;
  between: (sizes: Sizes) => StyledFunction;
};

function mediaQuery(
  userBreakpoints: Breakpoints,
  sizeUnit: SizeUnit = 'px'
): MediaQuery {
  const breakpoints = breakpoint(userBreakpoints, sizeUnit);

  function above(size: Size, antiOverlap: AntiOverlap = 0): StyledFunction {
    return (...cssProps) => css`
      @media ${breakpoints('above', size, antiOverlap)} {
        ${css(...cssProps)}
      }
    `;
  }

  function below(size: Size, antiOverlap: AntiOverlap = 0): StyledFunction {
    return (...cssProps) => css`
      @media ${breakpoints('below', size, antiOverlap)} {
        ${css(...cssProps)}
      }
    `;
  }

  function between(sizes: Sizes): StyledFunction {
    return (...cssProps) => css`
      @media ${breakpoints('between', sizes)} {
        ${css(...cssProps)}
      }
    `;
  }

  return { above, below, between };
}

export { mediaQuery };
