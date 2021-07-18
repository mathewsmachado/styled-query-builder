import { hasLettersAndNumbers } from 'helpers';
import {
  AntiOverlap,
  Breakpoint,
  Breakpoints,
  MediaQueryType,
  Size,
  Sizes,
  SizeUnit,
} from 'types';

function breakpoint(breakpoints: Breakpoints, sizeUnit: SizeUnit): Breakpoint {
  const simple = {
    size(size: Size): number {
      if (hasLettersAndNumbers(size)) {
        throw new Error('Parameter "size" does not accept a unit size');
      }

      return Number(breakpoints[size] || size);
    },

    antiOverlap(antiOverlap: AntiOverlap) {
      if (hasLettersAndNumbers(antiOverlap as number)) {
        throw new Error('Parameter "antiOverlap" does not accept a unit size');
      }

      return Number(antiOverlap);
    },

    stringGenerator(
      mediaQueryType: MediaQueryType,
      size: number,
      antiOverlap = 0
    ): string {
      const mediaQueryTypeMapper = {
        below: 'max',
        above: 'min',
        between: null, // typescript issue
      };

      const sizeWithOverlap =
        mediaQueryType === 'below' ? size - antiOverlap : size + antiOverlap;

      return (
        `(${mediaQueryTypeMapper[mediaQueryType]}-width: ` +
        `${sizeWithOverlap}${sizeUnit})`
      );
    },
  };

  const composed = {
    size(sizes: Sizes): [number, number] {
      if (!Array.isArray(sizes)) {
        throw new Error('Parameter "sizes" must be an array');
      }

      return [simple.size(sizes[0]), simple.size(sizes[1])];
    },

    antiOverlap(antiOverlap: AntiOverlap) {
      if (antiOverlap) {
        throw new Error(
          '"between" media query type don\'t support "anti-overlap" option'
        );
      }
    },

    stringGenerator(sizeOne: number, sizeTwo: number): string {
      return `${simple.stringGenerator(
        'above',
        sizeOne
      )} and ${simple.stringGenerator('below', sizeTwo)}`;
    },
  };

  return function breakpointFunction(mediaQueryType, sizes, antiOverlap = 0) {
    if (mediaQueryType === 'between') {
      composed.antiOverlap(antiOverlap);
      return composed.stringGenerator(...composed.size(sizes));
    }

    return simple.stringGenerator(
      mediaQueryType,
      simple.size(sizes as Size),
      simple.antiOverlap(antiOverlap)
    );
  };
}

export { breakpoint };
