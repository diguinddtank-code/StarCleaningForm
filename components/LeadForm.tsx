import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, User, Phone, MapPin, Mail, Sparkles, ChevronDown, X, ShieldCheck, Clock, Lock, Receipt } from 'lucide-react';
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

  // Reusable input class for consistency - Added focus rings
  const inputClass = "w-full pl-12 pr-4 h-14 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none text-slate-900 placeholder:text-slate-400 placeholder:font-medium font-bold text-base transition-all duration-200 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 focus:shadow-lg focus:scale-[1.01] hover:border-slate-300";

  return (
    <>
      <AnimatePresence>
        {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
      </AnimatePresence>

      <div className="relative group perspective-1000">
        {/* Ambient Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
        
        <div className="bg-white/95 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.8)] p-6 md:p-8 relative overflow-hidden">
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent opacity-50"></div>

          {/* Header Section */}
          <div className="mb-8 relative z-10">
            
            {/* Premium Progress Stepper */}
            <div className="flex items-center justify-between mb-6 bg-slate-50/80 rounded-full p-1.5 border border-slate-100">
               <div className="flex items-center gap-2 bg-white shadow-sm rounded-full px-3 py-1.5 border border-slate-100">
                  <div className="w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center text-white text-[10px] font-bold shadow-sm shadow-blue-200">
                    1
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">Details</span>
               </div>
               
               {/* Connecting Line */}
               <div className="flex-1 mx-3 h-0.5 bg-slate-200 rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "50%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-brand-blue to-blue-300"
                 />
               </div>

               <div className="flex items-center gap-2 pr-3 opacity-40 grayscale">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-[10px] font-bold">
                    2
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Estimate</span>
               </div>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-600">Custom Quote</span>
              </h3>
              <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded text-green-700 font-bold text-[10px] uppercase tracking-wider">
                    <Clock className="w-3 h-3" /> Instant
                 </div>
                 <p className="text-slate-500 font-medium text-sm">
                   Takes less than 30 seconds.
                 </p>
              </div>
            </div>
          </div>

          <motion.form 
            id="lead-quote-form" 
            onSubmit={handleSubmit} 
            className="space-y-5 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            
            {/* Name Field */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-2 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-slate-400 pointer-events-none group-focus-within:text-brand-blue transition-colors">
                   <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Ex: John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </motion.div>

            {/* Phone & Zip Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-2 ml-1">Phone Number</label>
                <div className="relative group">
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-slate-400 pointer-events-none group-focus-within:text-brand-blue transition-colors">
                      <Phone className="h-5 w-5" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    autoComplete="tel"
                    placeholder="(843) 555-0123"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={inputClass}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1.5">
                <label htmlFor="zipCode" className="block text-sm font-bold text-slate-900 mb-2 ml-1">Zip Code</label>
                <div className="relative group">
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-slate-400 pointer-events-none group-focus-within:text-brand-blue transition-colors">
                      <MapPin className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    autoComplete="postal-code"
                    placeholder="Ex: 29401"
                    maxLength={5}
                    pattern="[0-9]*"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </motion.div>
            </div>

            {/* Email Field */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-slate-400 pointer-events-none group-focus-within:text-brand-blue transition-colors">
                    <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none">
                    <Lock className="w-4 h-4" />
                 </div>
              </div>
            </motion.div>

            {/* Service Select */}
            <motion.div variants={itemVariants} className="space-y-1.5">
               <label htmlFor="serviceType" className="block text-sm font-bold text-slate-900 mb-2 ml-1">Cleaning Service</label>
               <div className="relative group">
                 <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-slate-400 pointer-events-none group-focus-within:text-brand-blue transition-colors">
                    <Sparkles className="h-5 w-5" />
                 </div>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer pr-12`}
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 group-focus-within:text-brand-blue transition-colors">
                  <ChevronDown className="h-5 w-5" />
                </div>
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
                className="w-full h-16 bg-gradient-to-r from-brand-blue via-blue-500 to-cyan-500 text-white font-extrabold text-lg rounded-xl shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-brand-blue/30 focus:ring-offset-2 group relative overflow-hidden"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_linear_infinite]" />
                
                <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin w-6 h-6" /> Processing...
                    </>
                  ) : (
                    <>
                      See Price & Availability <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
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
                <Receipt className="w-3.5 h-3.5 text-brand-blue" /> No hidden fees
              </div>
            </motion.div>

          </motion.form>
        </div>
      </div>
    </>
  );
};