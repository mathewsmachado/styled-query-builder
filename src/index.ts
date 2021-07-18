import { mediaQuery } from 'mediaQuery';

const builder = mediaQuery;

const defaultBreakpoints = {
  small: 576,
  medium: 768,
  large: 1024,
  xlarge: 1280,
};

const defaultSizeUnit = 'px';

const { above, below, between, breakpoints } = builder(
  defaultBreakpoints,
  defaultSizeUnit
);

export { above, below, between, breakpoints, builder };
