import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';

export const Header: React.FC = () => {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('lead-quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => document.getElementById('name')?.focus(), 500);
    }
  };

  return (
    <header className="absolute w-full top-0 z-50 py-6 md:border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* --- LEFT: LOGO --- */}
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://img1.wsimg.com/isteam/ip/97a5d835-7b16-4991-b3c6-3d6956b6b82b/ESBOC%CC%A7O-STAR-CLEANING_full.png/:/rs=w:143,h:75,cg:true,m/cr=w:143,h:75/qt=q:95" 
              alt="Star Cleaning Logo" 
              width="143"
              height="75"
              className="h-14 md:h-16 w-auto object-contain brightness-0 invert drop-shadow-md"
            />
          </div>

          {/* --- CENTER: DESKTOP NAVIGATION --- */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: 'Services', id: 'services' },
              { label: 'Our Process', id: 'process' },
              { label: 'Reviews', id: 'reviews' },
              { label: 'FAQ', id: 'faq' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 text-white/90 hover:text-white drop-shadow-sm"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Phone Number - Hidden on small mobile, visible on desktop */}
            <a 
              href="tel:8432979935" 
              className="hidden md:flex flex-col items-end transition-colors duration-300 group text-white"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest mb-0.5 text-blue-200">
                Call Us 24/7
              </span>
              <span className="font-extrabold text-lg leading-none group-hover:text-brand-blue transition-colors">
                (843) 297-9935
              </span>
            </a>

            {/* MOBILE ONLY: Phone Button */}
            <a 
              href="tel:8432979935"
              className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg active:scale-95 transition-all hover:bg-white/20"
            >
              <Phone className="w-6 h-6 fill-current" />
            </a>
            
            {/* DESKTOP ONLY: Get Quote Button */}
            <button 
              onClick={scrollToForm}
              className="hidden md:block relative group overflow-hidden rounded-full p-[2px] transition-all duration-300 active:scale-95 shadow-[0_0_30px_-5px_rgba(14,165,233,0.4)] hover:shadow-[0_0_40px_-5px_rgba(14,165,233,0.6)]"
            >
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-spin-slow opacity-100" />
              
              {/* Button Content */}
              <div className="relative bg-gradient-to-r from-brand-blue to-blue-600 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full flex items-center gap-2 transition-all group-hover:bg-opacity-90">
                 {/* Shine Effect */}
                 <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
                 
                 <span className="font-extrabold text-sm md:text-base tracking-wide z-10">GET A QUOTE</span>
                 <ArrowRight className="w-4 h-4 md:w-5 md:h-5 z-10 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};