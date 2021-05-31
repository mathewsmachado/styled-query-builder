import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

import { InvalidParamError } from 'errors';
import { hasLettersAndNumbers } from 'helpers';
import {
  AntiOverlap,
  breakpoint,
  Breakpoints,
  Size,
  SizeUnit,
} from 'breakpoint';

type CssProps = CSSObject | TemplateStringsArray;

type StyledCustomFunction = (cssProps: CssProps) => FlattenSimpleInterpolation;

type MediaQuery = {
  above: (userSize: Size, antiOverlap?: AntiOverlap) => StyledCustomFunction;
  below: () => any;
  between: () => any;
};

function mediaQuery(
  userBreakpoints: Breakpoints,
  sizeUnit: SizeUnit = 'px'
): MediaQuery {
  const breakpoints = breakpoint(userBreakpoints, sizeUnit);

  function normalizeSize(size: Size): number {
    if (hasLettersAndNumbers(size)) {
      throw new InvalidParamError('size', 'numbers');
    }

    return Number(userBreakpoints[size] || size);
  }

  function normalizeAntiOverlap(antiOverlap: AntiOverlap = 0): number {
    if (hasLettersAndNumbers(antiOverlap as number)) {
      throw new InvalidParamError('antiOverlap', 'numbers');
    }

    return Number(antiOverlap);
  }

  function above(
    userSize: Size,
    antiOverlap: AntiOverlap = 0
  ): StyledCustomFunction {
    const normalizedSize = normalizeSize(userSize);
    const normalizedAntiOverlap = normalizeAntiOverlap(antiOverlap);

    return (...cssProps) => css`
      @media ${breakpoints('above', normalizedSize, normalizedAntiOverlap)} {
        ${css(...cssProps)}
      }
    `;
  }

  function below() {}
  function between() {}

  return { above, below, between };
}

export { mediaQuery };
