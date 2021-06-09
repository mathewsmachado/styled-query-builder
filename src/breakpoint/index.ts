import { hasLettersAndNumbers } from 'helpers';

type Breakpoints = { [Key: string]: number };

type SizeUnit = 'px' | 'rem';

type HighOrderFunction<ReturnType> = (
  breakpoints: Breakpoints,
  sizeUnit: SizeUnit
) => ReturnType;

type MediaQueryType = 'above' | 'below' | 'between';

type Size = keyof Breakpoints | string | number;

type Sizes = [Size, Size] | Size;

type AntiOverlap = Omit<Size, keyof Breakpoints>;

type Breakpoint = (
  mediaQueryType: MediaQueryType,
  sizes: Sizes,
  antiOverlap?: AntiOverlap
) => string;

const breakpoint: HighOrderFunction<Breakpoint> = (breakpoints, sizeUnit) => {
  const single = {
    size: (size: Size): number => {
      if (hasLettersAndNumbers(size)) {
        throw new Error('Parameter "size" does not accept a unit size');
      }

      return Number(breakpoints[size] || size);
    },

    antiOverlap: (antiOverlap: AntiOverlap) => {
      if (hasLettersAndNumbers(antiOverlap as number)) {
        throw new Error('Parameter "antiOverlap" does not accept a unit size');
      }

      return Number(antiOverlap);
    },

    stringGenerator: (
      mediaQueryType: MediaQueryType,
      size: number,
      antiOverlap = 0
    ): string => {
      const mediaQueryTypeMapper = {
        below: 'max',
        above: 'min',
        between: null, // solve this typescript issue
      };

      const sizeWithOverlap =
        mediaQueryType === 'below' ? size - antiOverlap : size + antiOverlap;

      return (
        `(${mediaQueryTypeMapper[mediaQueryType]}-width: ` +
        `${sizeWithOverlap}${sizeUnit})`
      );
    },
  };

  const double = {
    size: (sizes: Sizes): [number, number] => {
      if (!Array.isArray(sizes)) {
        throw new Error('Parameter "sizes" must be an array');
      }

      return [single.size(sizes[0]), single.size(sizes[1])];
    },

    antiOverlap: (antiOverlap: AntiOverlap) => {
      if (antiOverlap) {
        throw new Error(
          '"between" media query type don\'t support "anti-overlap" option'
        );
      }
    },

    stringGenerator: (sizeOne: number, sizeTwo: number): string =>
      `${single.stringGenerator('above', sizeOne)} and ${single.stringGenerator(
        'below',
        sizeTwo
      )}`,
  };

  return (mediaQueryType, sizes, antiOverlap = 0) => {
    if (mediaQueryType === 'between') {
      double.antiOverlap(antiOverlap);
      return double.stringGenerator(...double.size(sizes));
    }

    return single.stringGenerator(
      mediaQueryType,
      single.size(sizes as Size),
      single.antiOverlap(antiOverlap)
    );
  };
};

export { AntiOverlap, breakpoint, Breakpoint, HighOrderFunction, Size, Sizes };
