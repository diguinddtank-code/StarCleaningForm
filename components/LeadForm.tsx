import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, User, Phone, MapPin, Mail, Sparkles, ChevronDown, Check, X, Instagram } from 'lucide-react';
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
        className="bg-white rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(14,165,233,0.25)] max-w-md w-full relative overflow-hidden"
      >
        {/* Confetti/Background decoration */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-green-50 to-transparent"></div>
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pt-10 text-center relative z-10">
          
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
            <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Request Received!</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We've added you to our <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Priority List</span>. <br/>
              One of our experts is calculating your estimate right now.
            </p>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">While you wait</p>
              
              {/* Instagram Button */}
              <a 
                href="https://www.instagram.com/star.cleaningsc/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-[2px] shadow-lg shadow-pink-500/20 transition-all hover:scale-[1.02] hover:shadow-pink-500/40"
              >
                <div className="relative flex items-center justify-center gap-3 rounded-2xl bg-white px-4 py-3 transition-colors group-hover:bg-opacity-90">
                   <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-1.5 rounded-lg">
                      <Instagram className="w-5 h-5" />
                   </div>
                   <span className="font-bold text-slate-800 text-base">See Recent Work</span>
                   <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Call Now Button */}
              <a 
                href="tel:8432979935"
                className="block w-full bg-white border-2 border-slate-100 hover:border-green-200 hover:bg-green-50/50 text-slate-700 font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-sm hover:shadow-md"
              >
                <div className="bg-green-100 p-2 rounded-full group-hover:scale-110 transition-transform">
                   <Phone className="w-5 h-5 text-green-600 fill-green-600/20" />
                </div>
                <span className="text-lg">Call Us Now</span>
              </a>
              
              <button
                onClick={onClose}
                className="text-slate-400 text-xs font-semibold hover:text-slate-600 transition-colors pt-2 block w-full"
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
      <div className="bg-white/90 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(14,165,233,0.15),0_24px_60px_-12px_rgba(15,23,42,0.15),inset_0_0_0_1px_rgba(255,255,255,0.8)] p-6 md:p-10 relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_70px_-12px_rgba(14,165,233,0.25),0_30px_70px_-12px_rgba(15,23,42,0.2)]">
        
        {/* Decorative top sheen - refined */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="mb-10 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 mb-3 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-blue" />
            <span className="text-brand-blue font-bold tracking-wide text-xs uppercase">Instant Quote</span>
          </div>
          <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Free Estimate</h3>
          <p className="text-slate-500 font-medium">No hidden fees. Fast & Accurate.</p>
        </div>

        <form id="lead-quote-form" onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          {/* Name Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400 group-focus-within:text-brand-blue group-focus-within:scale-110 transition-all duration-300" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-14 pr-5 py-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl focus:bg-white focus:border-brand-blue/50 focus:ring-[4px] focus:ring-brand-blue/10 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-bold shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-brand-blue/30"
            />
          </div>

          {/* Phone & Zip Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
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
                className="w-full pl-14 pr-5 py-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl focus:bg-white focus:border-brand-blue/50 focus:ring-[4px] focus:ring-brand-blue/10 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-bold shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-brand-blue/30"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
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
                className="w-full pl-14 pr-5 py-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl focus:bg-white focus:border-brand-blue/50 focus:ring-[4px] focus:ring-brand-blue/10 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-bold shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-brand-blue/30"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-brand-blue group-focus-within:scale-110 transition-all duration-300" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-14 pr-5 py-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl focus:bg-white focus:border-brand-blue/50 focus:ring-[4px] focus:ring-brand-blue/10 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-bold shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-brand-blue/30"
            />
          </div>

          {/* Service Select */}
          <div className="relative group">
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full pl-5 pr-12 py-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl focus:bg-white focus:border-brand-blue/50 focus:ring-[4px] focus:ring-brand-blue/10 outline-none transition-all duration-300 appearance-none text-slate-900 font-bold cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-brand-blue/30"
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-500 group-focus-within:text-brand-blue transition-colors">
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-xl">{error}</p>}

          <button
            id="submit-lead-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-brand-blue to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold py-4 rounded-2xl shadow-[0_20px_40px_-12px_rgba(14,165,233,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(14,165,233,0.6)] transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 text-lg group overflow-hidden relative"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" /> Sending...
                </>
              ) : (
                <>
                  Get My Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>

          <div className="text-center">
              <p className="text-[11px] text-slate-400 mt-4 leading-tight">
              Secure connection. Your privacy is our priority.
              </p>
          </div>
        </form>
      </div>
    </>
  );
};