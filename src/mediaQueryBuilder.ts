/* eslint-disable no-param-reassign */
import { hasLettersAndNumbers } from './helpers';

type Breakpoints = { [Key: string]: number };

type SizeUnit = 'px' | 'rem';

type MediaQueryType = 'above' | 'below' | 'between';

type UserSize = string | number;

type MediaQueryBuilderReturnType = {
  above: () => any;
  below: () => any;
  between: () => any;
  breakpoints: (
    mediaQueryType: MediaQueryType,
    userSizeOne: UserSize,
    userSizeTwo?: UserSize
  ) => string;
};

export function mediaQueryBuilder(
  userBreakpoints: Breakpoints,
  sizeUnit: SizeUnit = 'px'
): MediaQueryBuilderReturnType {
  function breakpoints(
    mediaQueryType: MediaQueryType,
    userSizeOne: UserSize,
    userSizeTwo?: UserSize
  ): string {
    const mapper = {
      below: 'max',
      above: 'min',
      between: null,
    };

    if (
      hasLettersAndNumbers(userSizeOne) ||
      (userSizeTwo !== undefined && hasLettersAndNumbers(userSizeTwo))
    ) {
      throw new Error('Only numbers are allowed into "size" parameter');
    }

    const sizeOne = userBreakpoints[userSizeOne] || userSizeOne;
    const sizeTwo = userBreakpoints[userSizeTwo || ''] || userSizeTwo;

    if (sizeTwo === undefined) {
      return `(${mapper[mediaQueryType]}-width: ${sizeOne}${sizeUnit})`;
    }

    return `(${mapper.above}-width: ${sizeOne}${sizeUnit}) and (${mapper.below}-width: ${sizeTwo}${sizeUnit})`;
  }

  function above() {}
  function below() {}
  function between() {}

  return { above, below, between, breakpoints };
}
