import React from 'react';

export type QrFrameCategory =
  | 'campus'
  | 'student-life'
  | 'esports-tech'
  | 'vn-festival'
  | 'fnb'
  | 'ecommerce';

export interface QrFrameColors {
  primary: string;
  secondary: string;
  dotsStyle: 'rounded' | 'dots' | 'square' | 'extra-rounded' | 'classy' | 'classy-rounded';
  eyeStyle: 'square' | 'extra-rounded' | 'dot';
  bgColor?: string;
}

export interface QrFrameRenderProps {
  labelText: string;
  primaryColor: string;
  secondaryColor?: string;
  bgColor?: string;
  children?: React.ReactNode;
}

export interface QrFrameTemplate {
  id: string; // 'FRAME-01' to 'FRAME-36' or 'NONE'
  name: string;
  category: QrFrameCategory;
  defaultLabel: string;
  defaultColors: QrFrameColors;
  description?: string;
  renderSvg: (props: QrFrameRenderProps) => React.ReactNode;
}
