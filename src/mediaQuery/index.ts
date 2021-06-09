import { css } from 'styled-components';

import { breakpoint } from 'breakpoint';
import {
  DoubleMediaQuery,
  HighOrderFunction,
  MediaQuery,
  SingleMediaQuery,
} from 'types';

const mediaQuery: HighOrderFunction<MediaQuery> = (
  userBreakpoints,
  sizeUnit = 'px'
) => {
  const breakpoints = breakpoint(userBreakpoints, sizeUnit);

  const above: SingleMediaQuery =
    (size, antiOverlap) =>
    (...cssProps) =>
      css`
        @media ${breakpoints('above', size, antiOverlap)} {
          ${css(...cssProps)}
        }
      `;

  const below: SingleMediaQuery =
    (size, antiOverlap) =>
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

export { mediaQuery };
