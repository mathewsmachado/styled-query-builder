<div align="center">
  <img alt="logo" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/logo.png" width="250px" />
</div>

<h2 align="center">styled-query-builder 🔨</h2>

Sometimes, working with media queries isn't easy. It's hard to remember what "min-width" or "max-width" stand for, if the styles will be applied if the screen is smaller or bigger than the specified. This is what [styled-query-builder](https://github.com/MathewsMachado/styled-query-builder) aims to solve. With this tool, you can write media queries in a semantic way.

[styled-query-builder](https://github.com/MathewsMachado/styled-query-builder) is a library made to work alongside [styled-components](https://styled-components.com/).

## Why use it?

It is easy to use, well-documented and tested!

## Features

- [Pre-configured media queries](https://github.com/MathewsMachado/styled-query-builder/#usage)
- [Custom media queries](https://github.com/MathewsMachado/styled-query-builder/#builderuserbreakpoints-sizeunit)
- [Semantic API](https://github.com/MathewsMachado/styled-query-builder/#api)
- [Flexibility to work with what you like most, mobile-first or desktop-first](https://github.com/MathewsMachado/styled-query-builder/#api)
- [A helper that gives you all the available media queries](https://github.com/MathewsMachado/styled-query-builder/#breakpointsmediaquerytype-sizes-antioverlap)
- [Media queries that do not overlap with each other thanks to the "antiOverlap" property](https://github.com/MathewsMachado/styled-query-builder/#antioverlap)

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

<br>
<img alt="breakpoints" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/usage-breakpoints.png" width="500px" />
<br>

and "px" as [size unit](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/index.ts#L9).

### Disclaimer

1. If you want to use "rem" as size unit, you will have to use the ["builder()"](https://github.com/MathewsMachado/styled-query-builder/#builderuserbreakpoints-sizeunit) method.
2. If you want to call the methods as in:

<br>
<img alt="below function" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/disclaimer-single.png" width="500px" />
<br>

but want different breakpoints, you will also have to use the ["builder()"](https://github.com/MathewsMachado/styled-query-builder/#builderuserbreakpoints-sizeunit) method. Otherwise, if you want to use different breakpoints, but don't care about calling the methods as above, you can call them as in:

<br>
<img alt="below function" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/disclaimer-double.png" width="500px" />
<br>

### API

#### **[above](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/mediaQuery/index.ts#L17)([size](https://github.com/MathewsMachado/styled-query-builder/#size), [antiOverlap?](https://github.com/MathewsMachado/styled-query-builder/#antioverlap))**

This function applies the style if the screen is bigger than the informed size. It is equivalent to "`@media (min-width: ...)`".

<br>
<img alt="above function" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/api-above.png" width="500px" />
<br>

#### **[below](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/mediaQuery/index.ts#L26)([size](https://github.com/MathewsMachado/styled-query-builder/#size), [antiOverlap?](https://github.com/MathewsMachado/styled-query-builder/#antioverlap))**

This function applies the style if the screen is smaller than the informed size. It is equivalent to "`@media (max-width: ...)`".

<br>
<img alt="below function" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/api-below.png" width="500px" />
<br>

#### **[between](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/mediaQuery/index.ts#L35)([sizes](https://github.com/MathewsMachado/styled-query-builder/#sizes))**

This function applies the style if the screen size is between the informed sizes. It is equivalent to "`@media (min-width: ...) and (max-width: ...)`".

<br>
<img alt="between function" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/api-between.png" width="500px" />
<br>

#### **[breakpoints](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/breakpoint/index.ts#L74)([mediaQueryType](https://github.com/MathewsMachado/styled-query-builder/#mediaquerytype), [sizes](https://github.com/MathewsMachado/styled-query-builder/#sizes), [antiOverlap?](https://github.com/MathewsMachado/styled-query-builder/#antioverlap))**

This function returns the media query that the user wants. It is perfect to mock a size screen in tests that uses [jest-styled-components](https://github.com/styled-components/jest-styled-components), and a lot more.

<br>
<img alt="breakpoints function" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/api-breakpoints.png" width="500px" />
<br>

#### **[builder](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/builder/index.ts)([userBreakpoints](https://github.com/MathewsMachado/styled-query-builder/#userbreakpoints), [sizeUnit](https://github.com/MathewsMachado/styled-query-builder/#sizeunit))**

This function is for who wants custom breakpoints or use "rem" as size unit. You load it with the breakpoints and the size unit, and it returns all the above methods to you: "[above()](https://github.com/MathewsMachado/styled-query-builder/#abovesize-antioverlap)", "[below()](https://github.com/MathewsMachado/styled-query-builder/#belowsize-antioverlap)", "[between()](https://github.com/MathewsMachado/styled-query-builder/#betweensizes)" and "[breakpoints()](https://github.com/MathewsMachado/styled-query-builder/#breakpointsmediaquerytype-sizes-antioverlap)".

<br>
<img alt="builder function" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/api-builder.png" width="500px" />
<br>

### Functions Parameters

#### **[antiOverlap?](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L18)**

If, somehow, you use two media queries that "bump" each other, like:

<br>
<img alt="below function" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/param-anti-overlap-1.png" width="500px" />
<br>

You can use this property to solve this issue. If you are calling the "[below()](https://github.com/MathewsMachado/styled-query-builder/#belowsize-antioverlap)" method, it will reduce from the media query the value that you pass. If you are calling the "[above()](https://github.com/MathewsMachado/styled-query-builder/#abovesize-antioverlap)" method, it will add to the media query the value that you pass.

<br>
<img alt="below function" src="https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/param-anti-overlap-2.png" width="500px" />
<br>

#### **[mediaQueryType](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L12)**

It can be the following values: "above", "below" or "between".

#### **[size](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L14)**

It can be one of the keys of the breakpoints (the default ones or the ones provided by the user), or a value indicating a size.

#### **[sizes](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L16)**

It can be a [size](https://github.com/MathewsMachado/styled-query-builder/#size) or a [size array](https://github.com/MathewsMachado/styled-query-builder/#size) with two values.

#### **[sizeUnit](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L5)**

It can be the following values: "px" or "rem".

#### **[userBreakpoints](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/types.ts#L3)**

It can be an object like the [default breakpoints](https://github.com/MathewsMachado/styled-query-builder/#usage), with how many breakpoints the user wants.

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
  1. on [mediaQueryTypeMapper](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/breakpoint/index.ts#L37)
  2. on [mediaQuery tests](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/mediaQuery/test.tsx#L99)
  3. on [mediaQuery tests](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/mediaQuery/test.tsx#L188)
  4. on [mediaQuery tests](https://github.com/MathewsMachado/styled-query-builder/blob/main/src/mediaQuery/test.tsx#L241)

## Contribution

This project is accepting contributions, the aim is to clean the [to-do](https://github.com/MathewsMachado/styled-query-builder/#to-do) list. Feel free to open an issue or submit a pull request. In the case of a pull request, explain well what you are doing and create tests for it.

## Acknowledgement

This project was inspired by [Morajabi's](https://github.com/morajabi) library, [styled-media-query](https://github.com/morajabi/styled-media-query).

I want to thanks [Willian Machado](https://www.linkedin.com/in/willian-machado-amorim/) for having done the library [logo](https://github.com/MathewsMachado/styled-query-builder/blob/main/docs/images/logo-background.png) and proofreading this README.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/MathewsMachado/styled-query-builder/blob/main/LICENSE) file for details.
