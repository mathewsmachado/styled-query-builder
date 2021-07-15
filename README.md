# styled-query-builder 💅

![Logo](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/logo-background.png)

Sometimes, working with media queries isn't easy. It's hard to remember what "min-width" or "max-width" stand for, if the styles will be applied if the screen is smaller or bigger than the specified. This is what [styled-query-builder](https://github.com/MathewsMachado/styled-query-builder) aims to solve. With this tool, you can write media queries in a semantic way.

[styled-query-builder](https://github.com/MathewsMachado/styled-query-builder) is a library made to work alongside [styled-components](https://styled-components.com/).

## Why use it?

It is easy to use, well-documented and tested!

## Features

- Pre-configured media queries
- Custom media queries
- Semantic API
- Flexibility to work with what you like most, mobile-first or desktop-first
- A helper that gives you all the available media queries
- Media queries that do not overlap with each other thanks to the "antiOverlap" property

## Getting Started

### Pre-requisites

You need to be on a project that has [styled-components](https://styled-components.com/) as a dependency.

### Installation

You can install [styled-query-builder](https://github.com/MathewsMachado/styled-query-builder) with [npm](https://github.com/npm/cli)

```sh
npm install styled-query-builder
```

or with [yarn](https://github.com/yarnpkg/berry)

```sh
yarn add styled-query-builder
```

## Usage

This library has, as default, the following [breakpoints](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/index.ts#L3):

![breakpoints](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/usage-breakpoints.png)

and "px" as [size unit](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/index.ts#L9).

### Disclaimer

1. If you want to use "rem" as size unit, you will have to use the ["builder()"](builderMethodRM) method.
2. If you want to call the methods as in:

![below function](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/disclaimer-single.png)

but want different breakpoints, you will also have to use the ["builder()"](builderMethodRM) method. Otherwise, if you want to use different breakpoints, but don't care about calling the methods as above, you can call them as in:

![below function](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/disclaimer-double.png)

### API

#### **[above](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/mediaQuery/index.ts#L17)([size](sizeParameterRM), [antiOverlap?](antiOverlapParam))**

This function applies the style if the screen is bigger than the informed size. It is equivalent to "`@media (min-width: ...)`".

![above function](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/api-above.png)

#### **[below](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/mediaQuery/index.ts#L26)([size](sizeParameterRM), [antiOverlap?](antiOverlapParamRM))**

This function applies the style if the screen is smaller than the informed size. It is equivalent to "`@media (max-width: ...)`".

![below function](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/api-below.png)

#### **[between](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/mediaQuery/index.ts#L35)([sizes](sizesParamRM))**

This function applies the style if the screen size is between the informed sizes. It is equivalent to "`@media (min-width: ...) and (max-width: ...)`".

![between function](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/api-between.png)

#### **[breakpoints](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/breakpoint/index.ts#L74)([mediaQueryType](mediaQueryTypeParamRM), [sizes](sizesParamRM), [antiOverlap?](antiOverlapParamRM))**

This function returns the media query that the user wants. It is perfect to mock a size screen in tests that uses [jest-styled-components](https://github.com/styled-components/jest-styled-components), and a lot more.

![breakpoints function](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/api-breakpoints.png)

#### **[builder](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/builder/index.ts)([userBreakpoints](breakpointsParamRM), [sizeUnit](sizeUnitParamRM))**

This function is for who wants custom breakpoints or use "rem" as size unit. You load it with the breakpoints and the size unit, and it returns all the above methods to you: "[above()](aboveRM)", "[below()](belowRM)", "[between()](betweenRM)" and "[breakpoints()](breakpointsRM)".

![builder function](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/api-builder.png)

### Functions Parameters

#### **[antiOverlap?](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L18)**

If, somehow, you use two media queries that "bump" each other, like:

![below function](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/param-anti-overlap-1.png)

You can use this property to solve this issue. If you are calling the "[below()](belowFunctionRM)" method, it will reduce from the media query the value that you pass. If you are calling the "[above()](aboveFunctionRM)" method, it will add to the media query the value that you pass.

![below function](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/param-anti-overlap-2.png)

#### **[mediaQueryType](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L12)**

It can be the following values: "above", "below" or "between".

#### **[size](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L14)**

It can be one of the keys of the [breakpoints](breakpointsRM), or a value indicating a size.

#### **[sizes](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L16)**

It can be a [size](sizeParamRM) or a [size array](sizeParamRM) with two values.

#### **[sizeUnit](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L5)**

It can be the following values: "px" or "rem".

#### **[userBreakpoints](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L3)**

It can be an object like the [default breakpoints](defaultBreakpointsRM), with how many breakpoints the user wants.

## Examples

This README file has only simple examples. If you want more, take a look at the [examples](https://github.com/MathewsMachado/styled-query-builder/tree/main/docs/examples) folder and run them by yourself.

Basic step:

```sh
git clone https://github.com/MathewsMachado/styled-query-builder.git && \
cd styled-query-builder && \
yarn
```

- To run the [above](https://github.com/MathewsMachado/styled-query-builder/tree/main/docs/examples/above) example: `cd docs/examples/above && yarn && yarn start`

- To run the [antiOverlap](https://github.com/MathewsMachado/styled-query-builder/tree/main/docs/examples/antiOverlap) example: `cd docs/examples/antiOverlap && yarn && yarn start`

- To run the [below](https://github.com/MathewsMachado/styled-query-builder/tree/main/docs/examples/below) example: `cd docs/examples/below && yarn && yarn start`

- To run the [between](between) example: `cd docs/examples/between && yarn && yarn start`

- To run the [breakpoints](https://github.com/MathewsMachado/styled-query-builder/tree/main/docs/examples/breakpoints) example: `cd docs/examples/breakpoints && yarn && yarn start`

- To run the [builder](https://github.com/MathewsMachado/styled-query-builder/tree/main/docs/examples/builder) example: `cd docs/examples/builder && yarn && yarn start`

## To-Do

- Improve code completion
- Improve regex at ["hasLettersAndNumbers"](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/helpers/index.ts#L1)
- When publishing the package, make the examples use the published version

- Docs: Fix the Eslint error that only allows the examples to run if there are the node_modules folder in the root directory.

- Tests: Look for general improvements

- Typing: Look for general improvements
- Typing: Fix the errors across the codebase, which are marked as "// typescript issue". The items 2, 3 and 4 below are related.
  1. on [mediaQueryTypeMapper](##)
  2. on [mediaQuery/test.tsx/](##)
  3. on [mediaQuery/test.tsx/](##)
  4. on [mediaQuery/test.tsx/](##)

## Contribution

This project is accepting contributions, the aim is to clean the [to-do](todoRM) list. Feel free to open an issue or submit a pull request. In the case of a pull request, explain well what you are doing and create tests for it.

## Acknowledgement

This project was inspired by [Morajabi's](https://github.com/morajabi) library, [styled-media-query](https://github.com/morajabi/styled-media-query).

I want to thanks [Willian Machado](https://www.linkedin.com/in/willian-machado-amorim/) for having done the library [logo](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/logo-background.png) and proofreading this README.

## License

This project is licensed under the MIT License - see the [LICENSE](##) file for details.
