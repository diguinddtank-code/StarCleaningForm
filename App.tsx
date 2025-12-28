import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header } from './components/Header';
import { LeadForm } from './components/LeadForm';
import { TrustBadges, WhyChooseUs, Services, Testimonials, InstagramSection, BeforeAfter, FAQ } from './components/Features';
import { MapPin, Phone, Mail, CheckCircle2, Star } from 'lucide-react';

// Hero Section Component with Parallax Video Background
const Hero = () => {
  const { scrollY } = useScroll();
  
  // Parallax effect: Video moves slower than scroll (y moves down as we scroll down)
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  
  // Dynamic overlay: Darkens as user scrolls to maintain focus/readability or fade out
  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.6]);

  return (
    <section className="relative min-h-[850px] md:h-[100vh] flex items-center justify-center overflow-hidden pt-20">
      
      {/* Parallax Background Container */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full z-0 flex items-center justify-center"
      >
        {/* Overlay: Darkened gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-blue-900/40 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        {/* Reliable Video Source (Pexels) - Bright, airy room */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1527513231362-77879e6b9a05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          className="w-full h-full object-cover object-center scale-110" // scale-110 to ensure coverage during parallax movement
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-8 md:py-0">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="lg:col-span-7 text-white text-center lg:text-left"
          >
            {/* Trust Pill */}
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-white text-sm font-bold uppercase tracking-wider mb-8 hover:bg-white/20 transition-colors cursor-default"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>#1 Rated in Charleston & Summerville</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow-lg shadow-black/20">
              Your Home, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">Perfectly Clean.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium drop-shadow-md">
              Experience the joy of a spotless home. We bring 5-star hotel standards to your doorstep in Charleston & Summerville.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-sm font-bold">
              <div className="flex items-center gap-3 bg-blue-950/60 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
                <div className="bg-green-500 rounded-full p-1">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-950/60 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
                <div className="bg-brand-gold rounded-full p-1">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span>Licensed & Insured</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side Form - Floating Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
            className="lg:col-span-5 w-full"
          >
            <div className="transform md:translate-y-0 relative group">
              {/* Glow Effect behind form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative">
                <LeadForm />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20"
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
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight flex items-center gap-2">
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
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">About Us</a></li>
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">How it Works</a></li>
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">Careers</a></li>
              <li><a href="#" className="hover:text-brand-blue hover:translate-x-1 inline-block transition-all">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
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
            <h4 className="font-bold text-slate-900 mb-6">We Serve</h4>
            <div className="flex flex-wrap gap-2">
              {['Charleston', 'Summerville', 'North Charleston', 'Mt Pleasant', 'West Ashley', 'Goose Creek'].map(area => (
                <span key={area} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-500 shadow-sm hover:border-brand-blue hover:text-brand-blue transition-colors cursor-default">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
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
      <BeforeAfter />
      <Services /> 
      <Testimonials />
      <InstagramSection />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;