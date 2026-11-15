import React from 'react';

const BRANDS = [
  'GOOGLE',
  'AMAZON',
  'SPOTIFY',
  'NETFLIX',
  'SHOPIFY',
  'MICROSOFT',
  'AIRBNB',
];

export const TrustedBrands: React.FC = () => {
  return (
    <section className="py-12 border-y border-slate-200/70 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-6">
          Được tin dùng bởi hơn 10.000.000+ cá nhân và doanh nghiệp trên toàn cầu
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="font-display font-black text-xl tracking-wider text-slate-800 hover:text-blue-600 hover:opacity-100 transition-all cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

