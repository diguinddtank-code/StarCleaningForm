import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { LeadForm } from './components/LeadForm';
import { TrustBadges, WhyChooseUs, Services, Testimonials, InstagramSection, BeforeAfter, FAQ } from './components/Features';
import { MapPin, Phone, Mail, CheckCircle2, Star, ArrowRight, MousePointerClick } from 'lucide-react';

// Sticky Mobile CTA Component
const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Show after scrolling past hero (approx 600px)
    return scrollY.onChange((latest) => {
      setIsVisible(latest > 500);
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
          className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-5px_30px_rgba(0,0,0,0.1)] z-50 md:hidden flex items-center justify-between gap-3 safe-bottom"
        >
          <div className="flex flex-col pl-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Fast Estimate</span>
            <span className="text-xs font-bold text-slate-900">Limited Slots</span>
          </div>
          <button 
            onClick={scrollToForm}
            className="flex-1 bg-brand-blue text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 active:scale-95 transition-transform flex items-center justify-center gap-2 relative overflow-hidden"
          >
             {/* Pulse effect on button */}
             <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            <span className="relative z-10 flex items-center gap-2">Get Free Quote <ArrowRight className="w-4 h-4" /></span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hero Section Component with Parallax Video Background
const Hero = () => {
  const { scrollY } = useScroll();
  
  // Parallax effect: Video moves slower than scroll (y moves down as we scroll down)
  // Adjusted for mobile to be less aggressive to avoid "jumping"
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  
  // Dynamic overlay: Darkens as user scrolls to maintain focus/readability or fade out
  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.6]);

  return (
    <section className="relative min-h-[100dvh] lg:h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 lg:pt-20 lg:pb-0">
      
      {/* Parallax Background Container */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full z-0 flex items-center justify-center"
      >
        {/* Overlay: Darkened gradient for better text contrast - Stronger on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-blue-900/60 lg:bg-gradient-to-r lg:from-slate-900/90 lg:via-blue-900/80 lg:to-blue-900/40 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40 lg:bg-black/20 z-10"></div>
        
        {/* Reliable Video Source (Pexels) - Bright, airy room */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1527513231362-77879e6b9a05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          className="w-full h-full object-cover object-[center_40%] lg:object-center scale-105" // scale-105 ensures coverage
        >
          <source src="https://websites.godaddy.com/categories/v4/videos/raw/video/wVb4Eem" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Dynamic Darkening Overlay controlled by scroll */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black z-10 pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full h-full">
        {/* Grid Layout Adjustment:
            - lg (Laptops): 6 cols text / 6 cols form
            - gap: Reduced to 12 on XL to keep elements closer on 15" screens
        */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center h-full">
          
          {/* Left Side Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="lg:col-span-6 text-white text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Trust Pill - High Social Proof */}
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-white text-[10px] md:text-sm font-bold uppercase tracking-wider mb-3 md:mb-6 hover:bg-white/20 transition-colors cursor-default"
            >
              <div className="flex -space-x-2 md:-space-x-3">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80" alt="Client" className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white object-cover" />
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&q=80" alt="Client" className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white object-cover" />
                 <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&q=80" alt="Client" className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white object-cover" />
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80" alt="Client" className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white object-cover" />
              </div>
              <span className="ml-1">Trusted by 500+ Neighbors</span>
            </motion.div>
            
            {/* CRO: Headline - Optimized for 15" screens (lg:text-5xl) to avoid wrapping issues 
                Changed xl:text-7xl to xl:text-6xl for better fit on 1440px screens. 
                7xl now reserved for 2xl screens.
            */}
            <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold mb-3 md:mb-6 tracking-tight drop-shadow-lg shadow-black/20">
              Reclaim Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">Weekends.</span>
            </h1>
            
            <p className="text-sm sm:text-lg md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed max-w-sm sm:max-w-xl mx-auto lg:mx-0 font-medium drop-shadow-md">
              Don't spend your free time cleaning. We bring 5-star hotel standards to your home.
            </p>

            <div className="hidden lg:flex flex-row flex-wrap justify-start gap-4 text-sm font-bold">
              <div className="flex items-center gap-3 bg-blue-950/60 px-4 py-3 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
                <div className="bg-green-500 rounded-full p-1">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span>100% Guaranteed</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-950/60 px-4 py-3 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
                <div className="bg-brand-gold rounded-full p-1">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span>Fast Booking</span>
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
            <div className="transform md:translate-y-0 relative group w-full">
              <div className="relative" id="lead-quote-form">
                <LeadForm />
              </div>
              
              {/* Mobile Trust Signals */}
              <div className="flex lg:hidden justify-center gap-4 mt-6 text-xs text-white/80 font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> 100% Guaranteed
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> Fast Booking
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-20"
      >
        <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 md:pt-20 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-2xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight flex items-center gap-2">
              StarCleaning
              <span className="text-brand-blue text-4xl">.</span>
            </h4>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              We define the new standard for cleanliness. Powered by technology, delivered by humans who care.
            </p>
            <div className="flex gap-4">
               <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                 <span className="font-bold">fb</span>
               </div>
               <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                 <span className="font-bold">ig</span>
               </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 md:mb-6">Company</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">About Us</a></li>
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">How it Works</a></li>
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">Careers</a></li>
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 md:mb-6">Get in Touch</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-500 text-sm font-medium">
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" /> 
                </div>
                <a href="tel:8432979935" className="group-hover:text-brand-blue transition-colors">(843) 297-9935</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" /> 
                </div>
                <a href="mailto:hello@starcleaning.com" className="group-hover:text-brand-blue transition-colors">hello@starcleaning.com</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" /> 
                </div>
                <span>Charleston, SC</span>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 md:mb-6">We Serve</h4>
            <div className="flex flex-wrap gap-2">
              {['Charleston', 'Summerville', 'North Charleston', 'Mt Pleasant', 'West Ashley', 'Goose Creek'].map(area => (
                <span key={area} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-500 shadow-sm hover:border-brand-blue hover:text-brand-blue transition-colors cursor-default">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} StarCleaning Services. Premium Cleaning Solutions.</p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="font-sans text-slate-900 bg-white antialiased selection:bg-brand-blue selection:text-white">
      <Header />
      <Hero />
      <TrustBadges />
      <WhyChooseUs />
      <Testimonials />
      <BeforeAfter />
      <Services /> 
      <InstagramSection />
      <FAQ />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

export default App;