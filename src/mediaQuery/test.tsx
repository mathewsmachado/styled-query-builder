// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { render, screen } from '@testing-library/react';

import { mediaQuery } from '.';

const breakpoints = { sm: 576, md: 768, lg: 1024 };

describe('mediaQuery', () => {
  it(`should return an object with four functions on first
    invocation`, () => {
    expect(mediaQuery(breakpoints, 'px')).toStrictEqual({
      above: expect.any(Function),
      below: expect.any(Function),
      between: expect.any(Function),
      breakpoints: expect.any(Function),
    });

    expect(mediaQuery(breakpoints, 'rem')).toStrictEqual({
      above: expect.any(Function),
      below: expect.any(Function),
      between: expect.any(Function),
      breakpoints: expect.any(Function),
    });
  });
});

describe('above', () => {
  const { above } = mediaQuery(breakpoints, 'px');

  it('should return a function', () => {
    expect(above('md')).toStrictEqual(expect.any(Function));
    expect(above('768')).toStrictEqual(expect.any(Function));
    expect(above(768)).toStrictEqual(expect.any(Function));
    expect(above('md', 2)).toStrictEqual(expect.any(Function));
    expect(above('md', '2')).toStrictEqual(expect.any(Function));
  });

  it('should throw an error if size is passed with a size unit', () => {
    expect(() => above('768px', 2)``).toThrow();
  });

  it('should throw an error if antiOverlap is passed with a size unit', () => {
    expect(() => above(768, '2px')``).toThrow();
  });

  it(`should apply the passed style only if the component is greater than what
  is defined in the function call`, () => {
    const Component = styled.h1`
      color: #000000;
      ${above('lg')`color: #FAF712;`}
      ${above('768')`color: #12F7FA;`}
      ${above(576)`color: #F712FA;`}
    `;

    render(<Component>Hello, world!</Component>);
    const component = screen.getByRole('heading');

    expect(component).toHaveStyle('color: #000000');
    expect(component).toHaveStyleRule('color', '#FAF712', {
      media: '(min-width: 1024px)',
    });
    expect(component).toHaveStyleRule('color', '#12F7FA', {
      media: '(min-width: 768px)',
    });
    expect(component).toHaveStyleRule('color', '#F712FA', {
      media: '(min-width: 576px)',
    });
  });

  it(`should apply the passed style only if the component is greater than what
  is defined in the function call + the antiOverlap property`, () => {
    const Component = styled.h1`
      color: #000000;
      ${above('lg', 1)`color: #FAF712;`}
      ${above('md', '2')`color: #12F7FA;`}
    `;

    render(<Component>Hello, world!</Component>);
    const component = screen.getByRole('heading');

    expect(component).toHaveStyle('color: #000000');
    expect(component).toHaveStyleRule('color', '#FAF712', {
      media: '(min-width: 1025px)',
    });
    expect(component).toHaveStyleRule('color', '#12F7FA', {
      media: '(min-width: 770px)',
    });
  });

  it('should accept interpolations', () => {
    const colorKeyOne = 'color';
    const colorValueOne = '#FAF712';
    const colorKeyTwo = 'color:';
    const colorValueTwo = '#12F7FA';

    const Component = styled.h1`
      color: #000000;
      // typescript issue
      ${above('lg')`${colorKeyOne}: ${colorValueOne};`}
      ${above(768, 1)`${`${colorKeyTwo} ${colorValueTwo}`};`}
    `;

    render(<Component>Hello, world!</Component>);
    const component = screen.getByRole('heading');

    expect(component).toHaveStyle('color: #000000');
    expect(component).toHaveStyleRule('color', '#FAF712', {
      media: '(min-width: 1024px)',
    });
    expect(component).toHaveStyleRule('color', '#12F7FA', {
      media: '(min-width: 769px)',
    });
  });
});

describe('below', () => {
  const { below } = mediaQuery(breakpoints, 'rem');

  it('should return a function', () => {
    expect(below('md')).toStrictEqual(expect.any(Function));
    expect(below('768')).toStrictEqual(expect.any(Function));
    expect(below(768)).toStrictEqual(expect.any(Function));
    expect(below('md', 2)).toStrictEqual(expect.any(Function));
    expect(below('md', '2')).toStrictEqual(expect.any(Function));
  });

  it('should throw an error if size is passed with a size unit', () => {
    expect(() => below('768rem', 2)``).toThrow();
  });

  it('should throw an error if antiOverlap is passed with a size unit', () => {
    expect(() => below(768, '2rem')``).toThrow();
  });

  it(`should apply the passed style only if the component is greater than what
  is defined in the function call`, () => {
    const Component = styled.h1`
      color: #000000;
      ${below('lg')`color: #FAF712;`}
      ${below('768')`color: #12F7FA;`}
      ${below(576)`color: #F712FA;`}
    `;

    render(<Component>Hello, world!</Component>);
    const component = screen.getByRole('heading');

    expect(component).toHaveStyle('color: #000000');
    expect(component).toHaveStyleRule('color', '#FAF712', {
      media: '(max-width: 1024rem)',
    });
    expect(component).toHaveStyleRule('color', '#12F7FA', {
      media: '(max-width: 768rem)',
    });
    expect(component).toHaveStyleRule('color', '#F712FA', {
      media: '(max-width: 576rem)',
    });
  });

  it(`should apply the passed style only if the component is greater than what
  is defined in the function call + the antiOverlap property`, () => {
    const Component = styled.h1`
      color: #000000;
      ${below('lg', 1)`color: #FAF712;`}
      ${below('md', '2')`color: #12F7FA;`}
    `;

    render(<Component>Hello, world!</Component>);
    const component = screen.getByRole('heading');

    expect(component).toHaveStyle('color: #000000');
    expect(component).toHaveStyleRule('color', '#FAF712', {
      media: '(max-width: 1023rem)',
    });
    expect(component).toHaveStyleRule('color', '#12F7FA', {
      media: '(max-width: 766rem)',
    });
  });

  it('should accept interpolations', () => {
    const colorKeyOne = 'color';
    const colorValueOne = '#FAF712';
    const colorKeyTwo = 'color:';
    const colorValueTwo = '#12F7FA';

    const Component = styled.h1`
      color: #000000;
      // typescript issue
      ${below('lg')`${colorKeyOne}: ${colorValueOne};`}
      ${below(768, 1)`${`${colorKeyTwo} ${colorValueTwo}`};`}
    `;

    render(<Component>Hello, world!</Component>);
    const component = screen.getByRole('heading');

    expect(component).toHaveStyle('color: #000000');
    expect(component).toHaveStyleRule('color', '#FAF712', {
      media: '(max-width: 1024rem)',
    });
    expect(component).toHaveStyleRule('color', '#12F7FA', {
      media: '(max-width: 767rem)',
    });
  });
});

describe('between', () => {
  const { between } = mediaQuery(breakpoints, 'px');

  it('should return a function', () => {
    expect(between(['lg', 'sm'])).toStrictEqual(expect.any(Function));
    expect(between(['1024', 576])).toStrictEqual(expect.any(Function));
    expect(between([1024, 'sm'])).toStrictEqual(expect.any(Function));
  });

  it('should throw an error if a size is passed with a size unit', () => {
    expect(() => between(['768px', 2])``).toThrow();
    expect(() => between([768, '2px'])``).toThrow();
  });

  it(`should apply the passed style only if the component is between than
  what is defined in the function call`, () => {
    const Component = styled.h1`
      color: #000000;
      ${between(['lg', 'md'])`color: #FAF712;`};
    `;
    render(<Component>Hello, world!</Component>);
    const component = screen.getByRole('heading');

    expect(component).toHaveStyle('color: #000000');
    expect(component).toHaveStyleRule('color', '#FAF712', {
      media: '(min-width: 1024px) and (max-width: 768px)',
    });
  });

  it('should accept interpolations', () => {
    const colorKey = 'color';
    const colorValue = '#FAF712';

    const Component = styled.h1`
      color: #000000;
      // typescript issue
      ${between([768, 1])`${`${colorKey} ${colorValue}`};`}
    `;

    render(<Component>Hello, world!</Component>);
    const component = screen.getByRole('heading');

    expect(component).toHaveStyle('color: #000000');
    expect(component).toHaveStyleRule('color', '#FAF712', {
      media: '(min-width: 768px) and (max-width: 1px)',
    });
  });
});
