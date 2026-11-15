import React from 'react';
import { getFrameById } from '../../constants/qrFrameRegistry';

export interface QrFrameWrapperProps {
  frameId: string;
  labelText?: string;
  primaryColor?: string;
  secondaryColor?: string;
  bgColor?: string;
  children: React.ReactNode;
}

export const QrFrameWrapper: React.FC<QrFrameWrapperProps> = ({
  frameId,
  labelText,
  primaryColor,
  secondaryColor,
  bgColor,
  children,
}) => {
  const frame = getFrameById(frameId);

  if (!frame || frameId === 'NONE' || frameId === 'none') {
    return <div className="w-full flex items-center justify-center">{children}</div>;
  }

  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto flex items-center justify-center select-none">
      {frame.renderSvg({
        labelText: labelText !== undefined ? labelText : frame.defaultLabel,
        primaryColor: primaryColor || frame.defaultColors.primary,
        secondaryColor: secondaryColor || frame.defaultColors.secondary,
        bgColor: bgColor || '#FFFFFF',
        children,
      })}
    </div>
  );
};
