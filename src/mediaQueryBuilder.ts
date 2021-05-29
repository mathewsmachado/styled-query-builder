import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

import { InvalidParamError } from './errors';
import { hasLettersAndNumbers } from './helpers';
import {
  breakpointBuilder,
  BreakpointBuilder,
  Breakpoints,
  SizeUnit,
  UserSize,
  AntiOverlap,
} from './breakpointBuilder';

type CssProps = CSSObject | TemplateStringsArray;

type StyledCustomFunction = (cssProps: CssProps) => FlattenSimpleInterpolation;

type MediaQueryBuilder = {
  above: (
    userSize: UserSize,
    antiOverlap?: AntiOverlap
  ) => StyledCustomFunction;
  below: () => any;
  between: () => any;
  breakpoints: BreakpointBuilder;
};

export function mediaQueryBuilder(
  userBreakpoints: Breakpoints,
  sizeUnit: SizeUnit = 'px'
): MediaQueryBuilder {
  const breakpoints = breakpointBuilder(userBreakpoints, sizeUnit);

  function above(
    userSize: UserSize,
    antiOverlap: AntiOverlap = 0
  ): StyledCustomFunction {
    if (hasLettersAndNumbers(userSize)) {
      throw new InvalidParamError('userSizes', 'numbers');
    }

    if (hasLettersAndNumbers(antiOverlap as string)) {
      throw new InvalidParamError('antiOverlap', 'numbers');
    }

    return (...cssProps) => css`
      @media ${breakpoints('above', userSize, antiOverlap) as string} {
        ${css(...cssProps)}
      }
    `;
  }

  function below() {}
  function between() {}

  return { above, below, between, breakpoints };
}
