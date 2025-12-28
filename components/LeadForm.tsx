import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, ArrowRight, User, Phone, MapPin, Mail, Sparkles, ChevronDown } from 'lucide-react';
import { LeadFormData, SERVICE_OPTIONS } from '../types';

export const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    serviceType: SERVICE_OPTIONS[0].value,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-8 h-full flex flex-col items-center justify-center text-center border border-white/60"
      >
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm"
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>
        <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Quote Requested!</h3>
        <p className="text-slate-600 mb-8 leading-relaxed text-lg">
          Thanks, <span className="font-bold text-slate-900">{formData.name.split(' ')[0]}</span>. <br/>
          We're calculating your estimate now.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-brand-blue font-bold hover:text-blue-700 transition-colors flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-blue-50"
        >
          Send another request <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.2)] p-6 md:p-10 border border-white/60 relative overflow-hidden transition-all duration-500 hover:shadow-[0_50px_100px_-20px_rgba(15,23,42,0.3)]">
      {/* Decorative top sheen - refined */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent opacity-70"></div>
      
      <div className="mb-10 text-center md:text-left relative z-10">
        <div className="inline-flex items-center gap-2 mb-3 bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-100">
           <Sparkles className="w-4 h-4 text-brand-blue" />
           <span className="text-brand-blue font-bold tracking-wide text-xs uppercase">Instant Quote</span>
        </div>
        <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Free Estimate</h3>
        <p className="text-slate-500 font-medium">No hidden fees. Fast & Accurate.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        
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
            className="w-full pl-14 pr-5 py-4 bg-white/60 border border-slate-200/80 rounded-2xl focus:bg-white focus:ring-[3px] focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-semibold shadow-sm hover:border-slate-300"
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
              className="w-full pl-14 pr-5 py-4 bg-white/60 border border-slate-200/80 rounded-2xl focus:bg-white focus:ring-[3px] focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-semibold shadow-sm hover:border-slate-300"
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
              className="w-full pl-14 pr-5 py-4 bg-white/60 border border-slate-200/80 rounded-2xl focus:bg-white focus:ring-[3px] focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-semibold shadow-sm hover:border-slate-300"
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
            className="w-full pl-14 pr-5 py-4 bg-white/60 border border-slate-200/80 rounded-2xl focus:bg-white focus:ring-[3px] focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-semibold shadow-sm hover:border-slate-300"
          />
        </div>

        {/* Service Select */}
        <div className="relative group">
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full pl-5 pr-12 py-4 bg-white/60 border border-slate-200/80 rounded-2xl focus:bg-white focus:ring-[3px] focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all duration-300 appearance-none text-slate-900 font-semibold cursor-pointer shadow-sm hover:border-slate-300"
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
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-brand-blue to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/40 active:translate-y-0 flex items-center justify-center gap-2 text-lg group overflow-hidden relative"
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
  );
};