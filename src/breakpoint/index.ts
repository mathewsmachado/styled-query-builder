import { InvalidParamError } from 'errors';
import { hasLettersAndNumbers } from 'helpers';

type Breakpoints = { [Key: string]: number };

type SizeUnit = 'px' | 'rem';

type MediaQueryType = 'above' | 'below' | 'between';

type Size = keyof Breakpoints | string | number;

type Sizes = [Size, Size] | Size;

type AntiOverlap = Omit<Size, keyof Breakpoints>;

type Breakpoint = (
  mediaQueryType: MediaQueryType,
  sizes: Sizes,
  antiOverlap?: AntiOverlap
) => string;

function breakpoint(breakpoints: Breakpoints, sizeUnit: SizeUnit): Breakpoint {
  const single = {
    normalizeSize(size: Size): number {
      if (hasLettersAndNumbers(size)) {
        throw new InvalidParamError('size', 'numbers');
      }

      return Number(breakpoints[size] || size);
    },
    breakpoint(
      mediaQueryType: MediaQueryType,
      size: number,
      antiOverlap = 0
    ): string {
      const mediaQueryTypeMapper = {
        below: 'max',
        above: 'min',
        between: null, // solve this typescript issue
      };

      const sizeWithOverlap =
        mediaQueryType === 'below' ? size - antiOverlap : size + antiOverlap;

      return `(${mediaQueryTypeMapper[mediaQueryType]}-width: ${sizeWithOverlap}${sizeUnit})`;
    },
  };

  const double = {
    normalizeSize(sizes: Sizes): [number, number] {
      if (!Array.isArray(sizes)) {
        throw new Error('Parameter "sizes" must be an array');
      }

      const [sizeOne, sizeTwo] = sizes as Size[];

      return [single.normalizeSize(sizeOne), single.normalizeSize(sizeTwo)];
    },
    breakpoint(sizeOne: number, sizeTwo: number): string {
      return `${single.breakpoint('above', sizeOne)} and ${single.breakpoint(
        'below',
        sizeTwo
      )}`;
    },
  };

  function normalizeAntiOverlap(
    mediaQueryType: MediaQueryType,
    antiOverlap: AntiOverlap = 0
  ): number {
    if (hasLettersAndNumbers(antiOverlap as number)) {
      throw new InvalidParamError('antiOverlap', 'numbers');
    }

    if (mediaQueryType === 'between' && antiOverlap) {
      throw new Error(
        '"between" media query type don\'t support "anti-overlap" option'
      );
    }

    return Number(antiOverlap);
  }

  function breakpointFunction(
    mediaQueryType: MediaQueryType,
    sizes: Sizes,
    antiOverlap: AntiOverlap = 0
  ): string {
    const normalizedAntiOverlap = normalizeAntiOverlap(
      mediaQueryType,
      antiOverlap
    );

    if (mediaQueryType !== 'between') {
      const normalizedSize = single.normalizeSize(sizes as Size);

      return single.breakpoint(
        mediaQueryType,
        normalizedSize,
        normalizedAntiOverlap
      );
    }

    const [sizeOne, sizeTwo] = double.normalizeSize(sizes);

    return double.breakpoint(sizeOne, sizeTwo);
  }

  return breakpointFunction;
}

export { AntiOverlap, breakpoint, Breakpoints, Size, Sizes, SizeUnit };
