import { InvalidParamError } from './errors';
import { hasLettersAndNumbers } from './helpers';

type Breakpoints = { [Key: string]: number };

type SizeUnit = 'px' | 'rem';

type MediaQueryType = 'above' | 'below' | 'between';

type UserSize = keyof Breakpoints | string | number;

type UserSizes = [UserSize, UserSize] | UserSize;

type ErrorLiable<ReturnType> = Error | ReturnType;

type BreakpointBuilder = (
  mediaQueryType: MediaQueryType,
  userSizes: UserSizes,
  antiOverlap?: UserSize
) => ErrorLiable<string>;

function breakpointBuilder(
  userBreakpoints: Breakpoints,
  sizeUnit: SizeUnit
): BreakpointBuilder {
  const mediaQueryTypeMapper = {
    below: 'max',
    above: 'min',
    between: null, // solve this typescript issue
  };

  function singleBreakpoint(
    mediaQueryType: MediaQueryType,
    userSizes: UserSizes,
    antiOverlap: UserSize
  ): ErrorLiable<string> {
    // eslint-disable-next-line no-param-reassign
    userSizes = userSizes as number;

    if (hasLettersAndNumbers(userSizes)) {
      return new InvalidParamError('userSizes', 'numbers');
    }

    const size = userBreakpoints[userSizes] || userSizes;
    const sizeWithOverlap =
      mediaQueryType === 'below'
        ? Number(size) - Number(antiOverlap)
        : Number(size) + Number(antiOverlap);

    return `(${mediaQueryTypeMapper[mediaQueryType]}-width: ${sizeWithOverlap}${sizeUnit})`;
  }

  function doubleBreakpoint(userSizes: UserSizes): ErrorLiable<string> {
    const [userSizeOne, userSizeTwo] = userSizes as UserSize[];

    if (
      hasLettersAndNumbers(userSizeOne) ||
      hasLettersAndNumbers(userSizeTwo)
    ) {
      return new InvalidParamError('userSizes', 'numbers');
    }

    const sizeOne = userBreakpoints[userSizeOne] || userSizeOne;
    const sizeTwo = userBreakpoints[userSizeTwo] || userSizeTwo;

    return `(${mediaQueryTypeMapper.above}-width: ${sizeOne}${sizeUnit}) and (${mediaQueryTypeMapper.below}-width: ${sizeTwo}${sizeUnit})`;
  }

  function breakpoints(
    mediaQueryType: MediaQueryType,
    userSizes: UserSizes,
    antiOverlap: UserSize = 0
  ): ErrorLiable<string> {
    if (mediaQueryType !== 'between') {
      return singleBreakpoint(mediaQueryType, userSizes, antiOverlap);
    }

    if (antiOverlap) {
      return new Error(
        '"between" media query type don\'t support "anti-overlap" option'
      );
    }

    return doubleBreakpoint(userSizes);
  }

  return breakpoints;
}

export { breakpointBuilder, BreakpointBuilder, Breakpoints, SizeUnit };
