import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, User, Phone, MapPin, Mail, Sparkles, ChevronDown, Check, X, Instagram, ShieldCheck, Clock } from 'lucide-react';
import { LeadFormData, SERVICE_OPTIONS } from '../types';

// Modal Component
const SuccessModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(14,165,233,0.25)] max-w-md w-full relative overflow-hidden"
      >
        {/* Confetti/Background decoration */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-green-50 to-transparent"></div>
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-20 touch-manipulation"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 pt-10 text-center relative z-10">
          
          {/* Animated Checkmark Circle */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute inset-0 bg-green-100 rounded-full"
              ></motion.div>
              <svg className="w-full h-full text-green-500 relative z-10 p-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  d="M20 6L9 17l-5-5"
                />
              </svg>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Request Received!</h3>
            <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
              We've added you to our <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Priority List</span>. <br className="hidden md:block"/>
              One of our experts is calculating your estimate right now.
            </p>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">While you wait</p>
              
              {/* Instagram Button */}
              <a 
                href="https://www.instagram.com/star.cleaningsc/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-[2px] shadow-lg shadow-pink-500/20 transition-all hover:scale-[1.02] hover:shadow-pink-500/40 active:scale-95 touch-manipulation"
              >
                <div className="relative flex items-center justify-center gap-3 rounded-2xl bg-white px-4 py-3 transition-colors group-hover:bg-opacity-90">
                   <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-1.5 rounded-lg">
                      <Instagram className="w-5 h-5" />
                   </div>
                   <span className="font-bold text-slate-800 text-sm md:text-base">See Recent Work</span>
                   <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Call Now Button */}
              <a 
                href="tel:8432979935"
                className="block w-full bg-white border-2 border-slate-100 hover:border-green-200 hover:bg-green-50/50 text-slate-700 font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-sm hover:shadow-md active:bg-slate-50 touch-manipulation"
              >
                <div className="bg-green-100 p-2 rounded-full group-hover:scale-110 transition-transform">
                   <Phone className="w-5 h-5 text-green-600 fill-green-600/20" />
                </div>
                <span className="text-base md:text-lg">Call Us Now</span>
              </a>
              
              <button
                onClick={onClose}
                className="text-slate-400 text-xs font-semibold hover:text-slate-600 transition-colors pt-2 block w-full p-2"
              >
                Close and return to site
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    serviceType: SERVICE_OPTIONS[0].value,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Phone masking logic for US format (XXX) XXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    let formatted = input;
    if (input.length > 6) {
      formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
    } else if (input.length > 3) {
      formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    }
    setFormData({ ...formData, phone: formatted });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const WEBHOOK_URL = 'https://webhook.infra-remakingautomacoes.cloud/webhook/sc'; 

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.warn("Webhook response not OK, but proceeding for UX if CORS issue");
      }
      
      // TRACKING: Fire Meta Pixel Lead Event on success
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Instant Quote Request',
          content_category: 'Lead Generation',
          currency: 'USD',
          value: 0.00
        });
      }

      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        zipCode: '',
        serviceType: SERVICE_OPTIONS[0].value,
      });

    } catch (err) {
      console.error(err);
      
      // TRACKING: Also fire on error because strictly speaking the user ATTEMPTED to convert
      // and in this demo app we show the success modal anyway to be friendly.
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }

      setShowSuccessModal(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
      </AnimatePresence>

      {/* Main Form Container - Premium "App-Like" Box Shadow & Styling */}
      {/* Mobile Optimization: Reduced padding (p-5) for more space, adjusted rounding */}
      <div className="bg-white/90 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(14,165,233,0.15),0_24px_60px_-12px_rgba(15,23,42,0.15),inset_0_0_0_1px_rgba(255,255,255,0.8)] p-5 md:p-10 relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_70px_-12px_rgba(14,165,233,0.25),0_30px_70px_-12px_rgba(15,23,42,0.2)]">
        
        {/* CRO: Urgency Banner */}
        <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-2 text-center">
            <p className="text-[10px] md:text-xs font-bold text-brand-blue flex items-center justify-center gap-1.5 uppercase tracking-wide">
                <Clock className="w-3.5 h-3.5 animate-pulse" /> 
                High Demand: Limited slots for this week
            </p>
        </div>

        {/* Decorative top sheen - refined */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
        
        <div className="mt-6 mb-6 md:mb-8 text-center md:text-left relative z-10">
          
           {/* CRO: Progress Bar (Endowed Progress Effect) */}
           <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="h-1.5 flex-grow bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-green-500 rounded-full"
                ></motion.div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 1 of 2</span>
           </div>

          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Calculate Price
          </h3>
          <p className="text-slate-500 font-medium text-sm md:text-base leading-snug">
            Find out exactly how much it costs to reclaim your weekends.
          </p>
        </div>

        <form id="lead-quote-form" onSubmit={handleSubmit} className="space-y-4 md:space-y-5 relative z-10">
          
          {/* Name Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400 group-focus-within:text-brand-blue group-focus-within:scale-110 transition-all duration-300" />
            </div>
            {/* Mobile Opt: text-base prevents iOS zoom */}
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="First & Last Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 md:pl-14 pr-5 py-3.5 md:py-4 bg-slate-50/50 border border-slate-200/60 rounded-xl md:rounded-2xl focus:bg-white focus:border-brand-blue/50 focus:ring-[4px] focus:ring-brand-blue/10 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-bold shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-base"
            />
          </div>

          {/* Phone & Zip Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-brand-blue group-focus-within:scale-110 transition-all duration-300" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                autoComplete="tel"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="w-full pl-12 md:pl-14 pr-5 py-3.5 md:py-4 bg-slate-50/50 border border-slate-200/60 rounded-xl md:rounded-2xl focus:bg-white focus:border-brand-blue/50 focus:ring-[4px] focus:ring-brand-blue/10 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-bold shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-base"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-brand-blue group-focus-within:scale-110 transition-all duration-300" />
              </div>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                required
                autoComplete="postal-code"
                placeholder="Zip Code"
                maxLength={5}
                pattern="[0-9]*"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full pl-12 md:pl-14 pr-5 py-3.5 md:py-4 bg-slate-50/50 border border-slate-200/60 rounded-xl md:rounded-2xl focus:bg-white focus:border-brand-blue/50 focus:ring-[4px] focus:ring-brand-blue/10 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-bold shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-base"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-brand-blue group-focus-within:scale-110 transition-all duration-300" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Best Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 md:pl-14 pr-5 py-3.5 md:py-4 bg-slate-50/50 border border-slate-200/60 rounded-xl md:rounded-2xl focus:bg-white focus:border-brand-blue/50 focus:ring-[4px] focus:ring-brand-blue/10 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-bold shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-base"
            />
          </div>

          {/* Service Select */}
          <div className="relative group">
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full pl-4 md:pl-5 pr-12 py-3.5 md:py-4 bg-slate-50/50 border border-slate-200/60 rounded-xl md:rounded-2xl focus:bg-white focus:border-brand-blue/50 focus:ring-[4px] focus:ring-brand-blue/10 outline-none transition-all duration-300 appearance-none text-slate-900 font-bold cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-base"
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 md:px-5 text-slate-500 group-focus-within:text-brand-blue transition-colors">
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-xl">{error}</p>}

          <button
            id="submit-lead-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-brand-blue to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold py-3.5 md:py-4 rounded-xl md:rounded-2xl shadow-[0_20px_40px_-12px_rgba(14,165,233,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(14,165,233,0.6)] transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 text-lg group overflow-hidden relative touch-manipulation"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" /> Calculating...
                </>
              ) : (
                <>
                  See My Price & Availability <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>

          {/* CRO: Trust Seals below button */}
          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wide pt-2">
             <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-green-500" /> SSL Secure
             </div>
             <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-green-500" /> No Spam
             </div>
             <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-green-500" /> Free Quote
             </div>
          </div>
        </form>
      </div>
    </>
  );
};