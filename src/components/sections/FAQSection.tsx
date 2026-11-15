import React from 'react';
import { FAQ_DATA } from '../../data/faqData';
import { AccordionItem } from '../common/Accordion';
import { HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Giải đáp thắc mắc
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3">
            Câu hỏi thường gặp (FAQ)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Những thông tin quan trọng bạn cần biết về mã QR và chính sách bảo mật của chúng tôi.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.question}
              icon={<HelpCircle size={18} />}
              defaultOpen={index === 0}
            >
              <p className="text-sm text-slate-600 leading-relaxed pt-2">
                {item.answer}
              </p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
};

