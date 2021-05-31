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

type StyledCustomFunction = (cssProps: CssProps) => FlattenSimpleInterpolation;

type MediaQuery = {
  above: (userSize: Size, antiOverlap?: AntiOverlap) => StyledCustomFunction;
  below: (userSize: Size, antiOverlap?: AntiOverlap) => StyledCustomFunction;
  between: (userSizes: Sizes) => StyledCustomFunction;
};

function mediaQuery(
  userBreakpoints: Breakpoints,
  sizeUnit: SizeUnit = 'px'
): MediaQuery {
  const breakpoints = breakpoint(userBreakpoints, sizeUnit);

  function above(
    userSize: Size,
    antiOverlap: AntiOverlap = 0
  ): StyledCustomFunction {
    return (...cssProps) => css`
      @media ${breakpoints('above', userSize, antiOverlap)} {
        ${css(...cssProps)}
      }
    `;
  }

  function below(
    userSize: Size,
    antiOverlap: AntiOverlap = 0
  ): StyledCustomFunction {
    return (...cssProps) => css`
      @media ${breakpoints('below', userSize, antiOverlap)} {
        ${css(...cssProps)}
      }
    `;
  }

  function between(userSizes: Sizes): StyledCustomFunction {
    return (...cssProps) => css`
      @media ${breakpoints('between', userSizes)} {
        ${css(...cssProps)}
      }
    `;
  }

  return { above, below, between };
}

export { mediaQuery };
