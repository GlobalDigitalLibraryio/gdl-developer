/**
 * Part of GDL gdl-frontend.
 * Copyright (C) 2019 GDL
 *
 * See LICENSE
 */

import React from 'react';
import { fluidRange } from 'polished';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import View from './View';
import { misc } from '../styles';

/**
 * Center content horizontally
 */
const StyledContainer = styled(View)<Props>`
  margin-left: auto;
  margin-right: auto;
  max-width: ${p => `${misc.containers[p.size]}px`};
`;

type Props = {
  css: any;
  gutter?: boolean;
  size: keyof typeof misc.containers;
};

const Container = ({ gutter, size, ...props }: Props) => (
  <StyledContainer
    css={[
      gutter === true && size === 'small' && smallGutterStyle,
      gutter === true && size === 'large' && largeGutterStyle
    ]}
    size={size}
    {...props}
  />
);

Container.defaultProps = {
  size: 'small',
  gutter: true
};

/**
 * Fluid gutter via media queries.
 * If the viewport is small enough, we have gutter that is via padding only.
 * If the viewport is large enough, there is no need for gutter padding at all.
 * Then there is the area between, we use a linear function to approximate the gutter size as a mix
 * of the padding and margin.
 */
const gutterFunc = (containerSize: number) =>
  fluidRange(
    [
      {
        prop: 'paddingLeft',
        fromSize: `${misc.gutter}px`,
        toSize: '0px'
      },
      {
        prop: 'paddingRight',
        fromSize: `${misc.gutter}px`,
        toSize: '0px'
      }
    ],
    `${containerSize}px`,
    `${containerSize + 2 * misc.gutter}px`
  );

const smallGutterStyle = css`
  ${gutterFunc(misc.containers.small)};
`;

const largeGutterStyle = css`
  ${gutterFunc(misc.containers.large)};
`;

export default Container;
