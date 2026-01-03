import React from 'react';
import { Phone, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-blue-50 shadow-sm h-16 md:h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          
          {/* Logo - Mobile Optimized Size */}
          <div className="flex items-center">
            <img 
              src="https://img1.wsimg.com/isteam/ip/97a5d835-7b16-4991-b3c6-3d6956b6b82b/ESBOC%CC%A7O-STAR-CLEANING_full.png/:/rs=w:143,h:75,cg:true,m/cr=w:143,h:75/qt=q:95" 
              alt="Star Cleaning Logo" 
              className="h-10 md:h-14 w-auto object-contain"
            />
          </div>

          {/* Call to Action - Stylized */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold tracking-widest text-brand-blue uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Available Now
              </span>
              <a href="tel:8432979935" className="text-gray-900 font-bold text-lg leading-none hover:text-brand-blue transition-colors">
                (843) 297-9935
              </a>
            </div>
            
            <a 
              href="tel:8432979935"
              className="group relative overflow-hidden bg-gradient-to-r from-brand-blue to-cyan-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-bold flex items-center gap-2 md:gap-3 transition-all shadow-md shadow-blue-500/20 active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 transform origin-left"></div>
              <div className="bg-white/20 p-1 md:p-1.5 rounded-full">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
              </div>
              <span className="text-xs md:text-base z-10">Get a Quote</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};