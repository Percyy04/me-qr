import React from 'react';
import { QRDesign } from '../../../types/qr.types';
import { AccordionItem } from '../../common/Accordion';
import { FrameSelector } from './FrameSelector';
import { PatternSelector } from './PatternSelector';
import { ColorControls } from './ColorControls';
import { LogoControls } from './LogoControls';
import { Frame, Palette, Sparkles, Image as ImageIcon } from 'lucide-react';

interface DesignAccordionProps {
  design: QRDesign;
  onChange: (design: QRDesign) => void;
}

export const DesignAccordion: React.FC<DesignAccordionProps> = ({
  design,
  onChange,
}) => {
  return (
    <div className="space-y-2 mt-4">
      <AccordionItem
        title="Khung & Lời kêu gọi (Frames)"
        icon={<Frame size={18} />}
        defaultOpen={true}
      >
        <FrameSelector
          frame={design.frame}
          onChange={(frame) => onChange({ ...design, frame })}
        />
      </AccordionItem>

      <AccordionItem
        title="Hoa văn & Mắt quét"
        icon={<Sparkles size={18} />}
      >
        <PatternSelector
          dots={design.dots}
          cornersSquare={design.cornersSquare}
          cornersDot={design.cornersDot}
          onChangeDots={(dots) => onChange({ ...design, dots })}
          onChangeCornersSquare={(c) => onChange({ ...design, cornersSquare: c })}
          onChangeCornersDot={(c) => onChange({ ...design, cornersDot: c })}
        />
      </AccordionItem>

      <AccordionItem
        title="Màu sắc & Gradient"
        icon={<Palette size={18} />}
      >
        <ColorControls
          dots={design.dots}
          cornersSquare={design.cornersSquare}
          cornersDot={design.cornersDot}
          background={design.background}
          onChangeDots={(dots) => onChange({ ...design, dots })}
          onChangeCornersSquare={(c) => onChange({ ...design, cornersSquare: c })}
          onChangeCornersDot={(c) => onChange({ ...design, cornersDot: c })}
          onChangeBackground={(bg) => onChange({ ...design, background: bg })}
        />
      </AccordionItem>

      <AccordionItem
        title="Logo & Biểu trưng"
        icon={<ImageIcon size={18} />}
      >
        <LogoControls
          logo={design.logo}
          onChange={(logo) => onChange({ ...design, logo })}
        />
      </AccordionItem>
    </div>
  );
};

