// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { render, screen } from '@testing-library/react';

import { mediaQueryBuilder } from './mediaQueryBuilder';

const breakpointsMock = { sm: 576, md: 768, lg: 1024 };

describe('mediaQueryBuilder', () => {
  it('should be a function that receives 1 or 2 parameters and returns an object with four other functions', () => {
    expect(mediaQueryBuilder(breakpointsMock)).toStrictEqual({
      above: expect.any(Function),
      below: expect.any(Function),
      between: expect.any(Function),
      breakpoints: expect.any(Function),
    });

    expect(mediaQueryBuilder(breakpointsMock, 'rem')).toStrictEqual({
      above: expect.any(Function),
      below: expect.any(Function),
      between: expect.any(Function),
      breakpoints: expect.any(Function),
    });
  });
});

describe('above', () => {
  const { above } = mediaQueryBuilder(breakpointsMock, 'px');

  it('should receive 1 or 2 parameters and return a function', () => {
    expect(above('md')).toStrictEqual(expect.any(Function));
    expect(above('768')).toStrictEqual(expect.any(Function));
    expect(above(768)).toStrictEqual(expect.any(Function));

    expect(above('md', 2)).toStrictEqual(expect.any(Function));
    expect(above('md', '2')).toStrictEqual(expect.any(Function));
    expect(above('768', 2)).toStrictEqual(expect.any(Function));
    expect(above(768, '2')).toStrictEqual(expect.any(Function));
    expect(above('768', '2')).toStrictEqual(expect.any(Function));
    expect(above(768, 2)).toStrictEqual(expect.any(Function));
  });

  it('should throw an error if a size is passed with a unit', () => {
    expect(() => above('768px', 2)).toThrow();
    expect(() => above(768, '2px')).toThrow();
  });

  it('should apply the passed style only if the component is greater than what is defined in the function call', () => {
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

  it('should apply the passed style only if the component is greater than what is defined in the function call + the antiOverlap property', () => {
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
    const colorKey = 'color';
    const colorValue = '#FAF712';
    const colorKey2 = 'color:';
    const colorValue2 = '#12F7FA';

    const Component = styled.h1`
      color: #000000;
      ${above('lg')`${colorKey}: ${colorValue};`} // fix this typescript issue
      ${above(768, 1)`${`${colorKey2} ${colorValue2}`};`}
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
