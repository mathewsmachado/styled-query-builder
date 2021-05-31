import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

import { InvalidParamError } from 'errors';
import { hasLettersAndNumbers } from 'helpers';
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

  function below(
    userSize: Size,
    antiOverlap: AntiOverlap = 0
  ): StyledCustomFunction {
    const normalizedSize = normalizeSize(userSize);
    const normalizedAntiOverlap = normalizeAntiOverlap(antiOverlap);

    return (...cssProps) => css`
      @media ${breakpoints('below', normalizedSize, normalizedAntiOverlap)} {
        ${css(...cssProps)}
      }
    `;
  }

  function between(userSizes: Sizes): StyledCustomFunction {
    const [userSizeOne, userSizeTwo] = userSizes as Size[];
    const normalizedSizeOne = normalizeSize(userSizeOne);
    const normalizedSizeTwo = normalizeSize(userSizeTwo);

    return (...cssProps) => css`
      @media ${breakpoints('between', [normalizedSizeOne, normalizedSizeTwo])} {
        ${css(...cssProps)}
      }
    `;
  }

  return { above, below, between };
}

export { mediaQuery };
