import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, User, Phone, MapPin, Mail, Sparkles, ChevronDown, X, ShieldCheck, Clock, Lock, Star, CheckCircle2 } from 'lucide-react';
import { LeadFormData, SERVICE_OPTIONS } from '../types';

// Modal Component
const SuccessModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full relative overflow-hidden ring-1 ring-white/20"
      >
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-green-50/80 to-transparent"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-40"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors z-20 shadow-sm border border-slate-100 backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pt-12 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute inset-0 bg-green-100 rounded-full border-[6px] border-white shadow-lg"
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
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Request Received!</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We've prioritized your request. One of our cleaning experts will contact you shortly with your estimate.
            </p>

            <div className="space-y-3">
              <a 
                href="https://www.instagram.com/star.cleaningsc/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:border-brand-blue/30 shadow-sm hover:shadow-md transition-all group"
              >
                 <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-2 rounded-xl shadow-sm">
                       <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                       <p className="font-bold text-slate-900 text-sm">Before & Afters</p>
                       <p className="text-xs text-slate-500 font-medium">See our results on Instagram</p>
                    </div>
                 </div>
                 <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button
                onClick={onClose}
                className="text-slate-400 text-xs font-semibold hover:text-slate-600 transition-colors py-2"
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) console.warn("Webhook response not OK");
      
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Instant Quote Request',
          content_category: 'Lead Generation',
        });
      }

      setShowSuccessModal(true);
      setFormData({ name: '', email: '', phone: '', zipCode: '', serviceType: SERVICE_OPTIONS[0].value });

    } catch (err) {
      console.error(err);
      setShowSuccessModal(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <>
      <AnimatePresence>
        {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
      </AnimatePresence>

      <div className="relative group perspective-1000">
        {/* Ambient Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
        
        <div className="bg-white/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.8)] p-6 md:p-8 relative overflow-hidden">
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent opacity-50"></div>

          {/* Header */}
          <div className="mb-8 relative z-10">
            {/* Social Proof Pill */}
            <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-100 px-3 py-1 rounded-full mb-4">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-5 h-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center overflow-hidden">
                      <User className="w-3 h-3 text-slate-400" />
                   </div>
                 ))}
               </div>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide pr-1">12 neighbors booked today</span>
            </div>

            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
              Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-500">Free Quote</span>
            </h3>
            <p className="text-slate-500 font-medium text-sm">
              Instant estimate. No credit card needed.
            </p>
          </div>

          <motion.form 
            id="lead-quote-form" 
            onSubmit={handleSubmit} 
            className="space-y-4 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            
            {/* Name Field */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute top-1/2 -translate-y-1/2 left-3 z-10">
                 <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-brand-blue group-focus-within:border-blue-100 transition-all duration-300">
                    <User className="h-4 w-4" />
                 </div>
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
                className="w-full pl-16 pr-4 py-4.5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none text-slate-900 placeholder:text-slate-400 font-semibold transition-all duration-300 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 focus:shadow-lg"
              />
            </motion.div>

            {/* Phone & Zip Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 z-10">
                   <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-brand-blue group-focus-within:border-blue-100 transition-all duration-300">
                      <Phone className="h-4 w-4" />
                   </div>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="(843) ..."
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full pl-16 pr-4 py-4.5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none text-slate-900 placeholder:text-slate-400 font-semibold transition-all duration-300 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 focus:shadow-lg"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 z-10">
                   <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-brand-blue group-focus-within:border-blue-100 transition-all duration-300">
                      <MapPin className="h-4 w-4" />
                   </div>
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
                  className="w-full pl-16 pr-4 py-4.5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none text-slate-900 placeholder:text-slate-400 font-semibold transition-all duration-300 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 focus:shadow-lg"
                />
              </motion.div>
            </div>

            {/* Email Field */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute top-1/2 -translate-y-1/2 left-3 z-10">
                 <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-brand-blue group-focus-within:border-blue-100 transition-all duration-300">
                    <Mail className="h-4 w-4" />
                 </div>
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
                className="w-full pl-16 pr-4 py-4.5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none text-slate-900 placeholder:text-slate-400 font-semibold transition-all duration-300 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 focus:shadow-lg"
              />
               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <Lock className="w-4 h-4" />
               </div>
            </motion.div>

            {/* Service Select */}
            <motion.div variants={itemVariants} className="relative group">
               <div className="absolute top-1/2 -translate-y-1/2 left-3 z-10">
                 <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-brand-blue group-focus-within:border-blue-100 transition-all duration-300">
                    <Sparkles className="h-4 w-4" />
                 </div>
               </div>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full pl-16 pr-12 py-4.5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none text-slate-900 font-semibold appearance-none cursor-pointer transition-all duration-300 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 focus:shadow-lg"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400 group-focus-within:text-brand-blue transition-colors">
                <ChevronDown className="h-5 w-5" />
              </div>
            </motion.div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center border border-red-100 font-medium"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="pt-2">
              <button
                id="submit-lead-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-blue via-blue-500 to-cyan-500 text-white font-bold py-4.5 rounded-2xl shadow-[0_20px_40px_-12px_rgba(14,165,233,0.5)] hover:shadow-[0_25px_60px_-12px_rgba(14,165,233,0.7)] transform transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] group relative overflow-hidden ring-1 ring-white/20"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_linear_infinite]" />
                
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg tracking-wide">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" /> Processing...
                    </>
                  ) : (
                    <>
                      See Price & Availability <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </motion.div>

            {/* Minimal Trust Footer */}
            <motion.div variants={itemVariants} className="flex justify-center gap-6 pt-2 opacity-70">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> SSL Secure
              </div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" /> Free Quote
              </div>
            </motion.div>

          </motion.form>
        </div>
      </div>
    </>
  );
};