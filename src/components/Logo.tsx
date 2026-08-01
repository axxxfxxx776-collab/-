import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'vertical';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'full',
  showText = true 
}) => {
  // Dimension mappings
  const dimensions = {
    sm: { icon: 'w-7 h-7', textTitle: 'text-base', textSub: 'text-[8px]', gap: 'gap-2' },
    md: { icon: 'w-10 h-10', textTitle: 'text-xl', textSub: 'text-[9.5px]', gap: 'gap-3' },
    lg: { icon: 'w-14 h-14', textTitle: 'text-2xl', textSub: 'text-xs', gap: 'gap-4' },
    xl: { icon: 'w-24 h-24', textTitle: 'text-4xl', textSub: 'text-sm', gap: 'gap-6' },
  }[size];

  return (
    <div className={`flex items-center ${variant === 'vertical' ? 'flex-col text-center' : 'flex-row'} ${dimensions.gap} ${className}`}>
      {/* MAJA Architectural Crest SVG */}
      <div className={`${dimensions.icon} flex-shrink-0 relative transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          {/* Background subtle aura */}
          <circle cx="100" cy="100" r="95" fill="#000000" fillOpacity="0.3" />
          
          {/* Geometric Architectural M Crest */}
          {/* Central Spire - Dark Navy */}
          <path 
            d="M96 22L116 38V125L96 110V22Z" 
            fill="#0F243B" 
          />
          <path 
            d="M96 22L76 38V125L96 110V22Z" 
            fill="#1A365D" 
          />
          
          {/* Left Wing Gold Facet */}
          <path 
            d="M50 82L80 58V120L50 144V82Z" 
            fill="#C5A059" 
          />
          <path 
            d="M80 58L96 70V132L80 120V58Z" 
            fill="#D4AF37" 
          />

          {/* Right Wing Gold Facet */}
          <path 
            d="M150 82L120 58V120L150 144V82Z" 
            fill="#B88A44" 
          />
          <path 
            d="M120 58L104 70V132L120 120V58Z" 
            fill="#C5A059" 
          />

          {/* Interlocking Diagonal Golden Beams */}
          <path 
            d="M68 68L132 118L116 130L52 80L68 68Z" 
            fill="#C5A059" 
          />
          <path 
            d="M132 68L68 118L84 130L148 80L132 68Z" 
            fill="#102A43" 
          />

          {/* Left Base Footing - Navy */}
          <path 
            d="M30 130L60 110V142L30 152V130Z" 
            fill="#102A43" 
          />
          <path 
            d="M30 152L82 152V142L30 142V152Z" 
            fill="#1A365D" 
          />

          {/* Right Base Footing - Navy */}
          <path 
            d="M170 130L140 110V142L170 152V130Z" 
            fill="#0F243B" 
          />
          <path 
            d="M170 152L118 152V142L170 142V152Z" 
            fill="#102A43" 
          />

          {/* Gold Accent Lines */}
          <path d="M96 22L96 152" stroke="#C5A059" strokeWidth="2" strokeOpacity="0.6" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && variant !== 'icon' && (
        <div className={`flex flex-col ${variant === 'vertical' ? 'items-center mt-2' : 'items-start'}`}>
          <span className={`${dimensions.textTitle} font-extrabold text-white tracking-tight leading-none`}>
            ماجا <span className="text-[#C5A059]">العقارية</span>
          </span>
          <span className={`${dimensions.textSub} font-semibold text-[#829AB1] tracking-[0.25em] uppercase mt-1`}>
            MAJA Real Estate
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
