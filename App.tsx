import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { LeadForm } from './components/LeadForm';
import { TrustBadges, WhatClientsSay, WhyChooseUs, Services, Testimonials, InstagramSection, BeforeAfter, FAQ, TheStandard, RiskFreeGuarantee, UsVsThem } from './components/Features';
import { MapPin, Phone, Mail, CheckCircle2, Star, ArrowRight, MousePointerClick, ShieldCheck, Instagram } from 'lucide-react';

// Sticky Mobile CTA Component - UX Improvement: refined shadow and blur
const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Show after scrolling past hero (approx 600px)
    return scrollY.onChange((latest) => {
      setIsVisible(latest > 600);
    });
  }, [scrollY]);

  const scrollToForm = () => {
    const formElement = document.getElementById('lead-quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Small focus timeout
      setTimeout(() => {
        document.getElementById('name')?.focus();
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 p-3 bg-white/80 backdrop-blur-xl border-t border-white/50 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] z-50 md:hidden flex items-center justify-between gap-3 safe-bottom"
        >
          <div className="flex flex-col pl-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Fast Estimate</span>
            <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-slate-900">Slots Available</span>
            </div>
          </div>
          <button 
            onClick={scrollToForm}
            className="flex-1 bg-gradient-to-r from-brand-blue to-blue-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-transform flex items-center justify-center gap-2 relative overflow-hidden ring-1 ring-white/20"
          >
             {/* Pulse effect on button */}
             <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            <span className="relative z-10 flex items-center gap-2 text-sm">Get Free Quote <ArrowRight className="w-4 h-4" /></span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hero Section Component with Parallax Video Background
const Hero = () => {
  const { scrollY } = useScroll();
  
  // Parallax effect: Video moves slower than scroll
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  
  // Dynamic overlay: Darkens as user scrolls
  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.7]);

  return (
    <section className="relative min-h-[100dvh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-6 md:pt-32 md:pb-20 lg:py-32">
      
      {/* Parallax Background Container */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full z-0 flex items-center justify-center"
      >
        {/* Superior Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/20 z-10"></div>
        
        {/* MOBILE VIDEO - SPECIFIC URL */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata"
          className="block lg:hidden absolute inset-0 w-full h-full object-cover" 
        >
          <source src="https://i.imgur.com/Q7QVFW7.mp4" type="video/mp4" />
        </video>

        {/* DESKTOP VIDEO - ORIGINAL URL */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1527513231362-77879e6b9a05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=50&fm=webp"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover object-[center_40%] scale-105" 
        >
          <source src="https://websites.godaddy.com/categories/v4/videos/raw/video/wVb4Eem" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Scroll darken overlay */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black z-10 pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full h-full">
        {/* Grid Layout: Compact mobile to pull form up */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 xl:gap-16 items-center h-full">
          
          {/* Left Side Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="lg:col-span-6 text-white text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Trust Pill - High Social Proof - HIDDEN ON MOBILE TO SAVE SPACE */}
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 py-1.5 pl-1.5 pr-6 rounded-full mb-6 hover:bg-black/50 transition-all cursor-default select-none shadow-lg"
            >
              <div className="flex -space-x-3">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=48&h=48&q=60&fm=webp" alt="Client" width="32" height="32" className="w-9 h-9 rounded-full border-2 border-slate-700 object-cover" />
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=48&h=48&q=60&fm=webp" alt="Client" width="32" height="32" className="w-9 h-9 rounded-full border-2 border-slate-700 object-cover" />
                 <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=48&h=48&q=60&fm=webp" alt="Client" width="32" height="32" className="w-9 h-9 rounded-full border-2 border-slate-700 object-cover" />
              </div>
              <div className="flex flex-col items-start justify-center">
                  <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-brand-gold fill-brand-gold" />)}
                  </div>
                  <div className="text-[10px] md:text-xs text-white/90 font-medium leading-none mt-1">
                      Trusted by <span className="font-bold text-white">500+ Neighbors</span>
                  </div>
              </div>
            </motion.div>
            
            {/* Headline - Typography Tuned for Mobile Compactness */}
            <h1 className="text-[2rem] leading-[1.1] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold mb-3 md:mb-6 tracking-tight drop-shadow-2xl shadow-black/50">
              Reclaim Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-100">Weekends.</span>
            </h1>
            
            <p className="hidden sm:block text-sm sm:text-lg md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed max-w-sm sm:max-w-xl mx-auto lg:mx-0 font-medium drop-shadow-lg">
              Don't spend your free time cleaning. We bring 5-star hotel standards to your home.
            </p>
             {/* Mobile only short tagline */}
            <p className="text-xs text-blue-50/90 mb-4 font-medium drop-shadow-md sm:hidden max-w-[280px]">
                5-star hotel standards. 100% guaranteed.
            </p>

            <div className="hidden lg:flex flex-row flex-wrap justify-start gap-4 text-sm font-bold">
              <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/10 transition-colors">
                <div className="bg-green-500 rounded-full p-1 shadow-green-500/50 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span>100% Satisfaction</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/10 transition-colors">
                <div className="bg-brand-gold rounded-full p-1 shadow-amber-500/50 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span>Bonded & Insured</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side Form - Floating Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
            className="lg:col-span-6 w-full flex justify-center lg:justify-end"
          >
            <div className="transform md:translate-y-0 relative group w-full -mt-2 md:mt-0">
              <div className="relative z-20" id="lead-quote-form">
                <LeadForm />
              </div>
              
              {/* Mobile Trust Signals - Compacted below form */}
              <div className="flex lg:hidden justify-center items-center gap-4 mt-4 text-[11px] text-white/90 font-bold uppercase tracking-wide">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Guaranteed
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9/5 Rated
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll indicator - Hidden on Mobile */}
      <motion.div 
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <span className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 backdrop-blur-sm">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-white/80 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 md:pt-24 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight flex items-center gap-2">
              StarCleaning
              <span className="text-brand-blue text-4xl leading-none">.</span>
            </h4>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed font-medium">
              We define the new standard for cleanliness. Powered by technology, delivered by humans who care.
            </p>
            <div className="flex gap-3">
               <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-brand-blue hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                 <span className="font-bold font-serif">f</span>
               </a>
               <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-brand-blue hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                 <Instagram className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-5">Company</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">About Us</a></li>
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">How it Works</a></li>
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">Careers</a></li>
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                  <Phone className="w-4 h-4" /> 
                </div>
                <a href="tel:8432979935" className="group-hover:text-brand-blue transition-colors font-bold">(843) 297-9935</a>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                  <Mail className="w-4 h-4" /> 
                </div>
                <a href="mailto:admin@starcleaning.com" className="group-hover:text-brand-blue transition-colors">admin@starcleaning.com</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-4 h-4" /> 
                </div>
                <span>Charleston, SC</span>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-bold text-slate-900 mb-5">We Serve</h4>
            <div className="flex flex-wrap gap-2">
              {['Charleston', 'Summerville', 'North Charleston', 'Mt Pleasant', 'West Ashley', 'Goose Creek'].map(area => (
                <span key={area} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-semibold text-slate-500 shadow-sm hover:border-brand-blue hover:text-brand-blue hover:bg-white transition-all cursor-default">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-medium">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} StarCleaning Services. All rights reserved.</p>
          <div className="flex gap-6">
              <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="font-sans text-slate-900 bg-white antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Header />
      <Hero />
      <TrustBadges />
      <WhatClientsSay />
      <TheStandard /> 
      <UsVsThem />
      <WhyChooseUs />
      <BeforeAfter />
      <Services /> 
      <RiskFreeGuarantee />
      <Testimonials />
      <InstagramSection />
      <FAQ />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

export default App;