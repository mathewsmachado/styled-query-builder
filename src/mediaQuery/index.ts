import { css } from 'styled-components';

import { breakpoint } from 'breakpoint';
import {
  AntiOverlap,
  Breakpoints,
  MediaQuery,
  Size,
  Sizes,
  SizeUnit,
  StyledFunction,
} from 'types';

function mediaQuery(
  userBreakpoints: Breakpoints,
  sizeUnit: SizeUnit = 'px'
): MediaQuery {
  const breakpoints = breakpoint(userBreakpoints, sizeUnit);

  function above(size: Size, antiOverlap?: AntiOverlap): StyledFunction {
    return (...cssProps) =>
      css`
        @media ${breakpoints('above', size, antiOverlap)} {
          ${css(...cssProps)}
        }
      `;
  }

  function below(size: Size, antiOverlap?: AntiOverlap): StyledFunction {
    return (...cssProps) =>
      css`
        @media ${breakpoints('below', size, antiOverlap)} {
          ${css(...cssProps)}
        }
      `;
  }

  function between(sizes: Sizes): StyledFunction {
    return (...cssProps) =>
      css`
        @media ${breakpoints('between', sizes)} {
          ${css(...cssProps)}
        }
      `;
  }

  return { above, below, between };
}

export { mediaQuery };
