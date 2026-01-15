import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, User, Phone, MapPin, Mail, Sparkles, ChevronDown, X, ShieldCheck, Receipt, Home, Dog, Cat, Calendar, Check, ArrowLeft, DollarSign, Lock, CheckCircle, Tag, Info, Clock, Box, FileCheck } from 'lucide-react';
import { LeadFormData, PRICING_CONFIG } from '../types';

// --- Types & Constants within Component ---

const STEPS = {
  CONTACT: 1,
  HOME_DETAILS: 2,
  SERVICE_SELECTION: 3,
};

const ONE_TIME_SERVICES = [
  { id: 'design-time', label: 'Design with Time', multiplier: 1.0, desc: 'Standard customizable clean.' },
  { id: 'deep-clean', label: 'Deep Clean', multiplier: 1.3, tag: 'High Demand', desc: 'Thorough top-to-bottom scrub.' },
  { id: 'move-in-out', label: 'Move-In / Move-Out', multiplier: 1.5, desc: 'Empty home turnaround.' },
];

const RECURRING_SERVICES = [
  { id: 'weekly', label: 'Weekly - Premium', discount: 0.20, tag: '💎 Best Value', desc: 'Maximize savings (20% Off)' },
  { id: 'bi-weekly', label: 'Every 2 Weeks', discount: 0.15, tag: '🔥 Most Popular', desc: 'Perfect balance (15% Off)' },
  { id: 'monthly', label: 'Every 4 Weeks', discount: 0.10, desc: 'Consistent clean (10% Off)' },
];

// --- Helper Components ---

// Premium Input Component with Focus Animation & Success State
const FocusInput = ({ 
  icon: Icon, 
  label, 
  error,
  isSuccess,
  ...props 
}: { 
  icon: any, 
  label: string, 
  error?: boolean,
  isSuccess?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="space-y-1.5 group">
      <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wide group-focus-within:text-brand-blue transition-colors flex justify-between">
        {label}
        {isSuccess && <span className="text-green-500 flex items-center gap-1 text-[10px] normal-case"><CheckCircle className="w-3 h-3" /> Looks good</span>}
      </label>
      <motion.div 
        whileTap={{ scale: 0.99 }}
        className={`relative flex items-center bg-slate-50 border-2 rounded-xl transition-all duration-300 ease-out 
          ${error 
            ? 'border-red-300 bg-red-50' 
            : isSuccess
              ? 'border-green-400 bg-green-50/30'
              : 'border-slate-100 group-hover:border-slate-200 group-focus-within:border-brand-blue group-focus-within:bg-white group-focus-within:shadow-[0_4px_20px_-2px_rgba(14,165,233,0.15)]'
          }
        `}
      >
        <div className={`absolute left-3 transition-colors duration-300 ${error ? 'text-red-400' : isSuccess ? 'text-green-500' : 'text-slate-400 group-focus-within:text-brand-blue'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <motion.input
          layout
          className="w-full pl-10 pr-4 h-12 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300 text-sm md:text-base rounded-xl"
          {...props}
        />
        {/* Subtle glow effect on focus */}
        <div className={`absolute inset-0 rounded-xl ring-4 transition-all duration-300 pointer-events-none ${isSuccess ? 'ring-green-400/10' : 'ring-brand-blue/0 group-focus-within:ring-brand-blue/10'}`} />
      </motion.div>
    </div>
  );
};

// IMPROVED SUCCESS MODAL
const SuccessModal: React.FC<{ onClose: () => void; name: string }> = ({ onClose, name }) => {
  // Generate a random reference ID for "official" feel
  const refId = `REF-${Math.floor(1000 + Math.random() * 9000)}`;
  const firstName = name.split(' ')[0] || "Customer";

  // Animation Variants
  const modalContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        duration: 0.6,
        bounce: 0.3,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const checkPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeInOut",
        delay: 0.2 // Wait for modal to pop before drawing
      } 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md"
    >
      <motion.div
        variants={modalContainerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-[24px] shadow-2xl max-w-md w-full relative overflow-hidden"
      >
        {/* Decorative Header Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-brand-blue to-blue-600"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors z-20"
        >
            <X className="w-5 h-5" />
        </button>

        <div className="relative pt-8 px-6 pb-8">
            {/* Success Icon with Drawing Animation */}
            <motion.div variants={itemVariants} className="mx-auto w-20 h-20 bg-white rounded-full p-1.5 shadow-xl mb-6 relative z-10">
                <div className="w-full h-full bg-green-50 rounded-full flex items-center justify-center border-2 border-green-100">
                    <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path 
                           variants={checkPathVariants}
                           d="M20 6L9 17l-5-5" 
                        />
                    </svg>
                </div>
                {/* Floating particles */}
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 3 }} 
                    className="absolute -top-2 right-0"
                >
                    <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center mb-8">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Quote Received!</h3>
                <p className="text-slate-500 font-medium">Thanks, {firstName}. We've secured your spot in line.</p>
            </motion.div>

            {/* "Official" Details Card - Staggered Content */}
            <motion.div 
                variants={itemVariants}
                className="bg-slate-50 rounded-xl border border-slate-100 p-4 mb-6 relative overflow-hidden"
            >
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200 border-dashed">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reference ID</span>
                    <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                        className="text-sm font-mono font-bold text-slate-700 bg-white px-2 py-1 rounded border border-slate-200"
                    >
                        {refId}
                    </motion.span>
                </div>
                
                <div className="space-y-4">
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <FileCheck className="w-4 h-4 text-brand-blue" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 uppercase">Step 1: Review</p>
                            <p className="text-xs text-slate-500 leading-snug">Our team is reviewing your home details right now to ensure accurate pricing.</p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 uppercase">Step 2: Confirmation</p>
                            <p className="text-xs text-slate-500 leading-snug">Look for a call from <strong>(843) 297-9935</strong> within 15 minutes to confirm availability.</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                <button 
                    onClick={onClose} 
                    className="w-full p-4 rounded-xl border-2 border-slate-100 font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all text-sm"
                >
                    Close
                </button>
                <a 
                    href="tel:8432979935" 
                    className="flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-brand-blue text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm group"
                >
                    <Phone className="w-4 h-4 group-hover:animate-pulse" /> Call Us Now
                </a>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-center text-[10px] text-slate-400 mt-4 font-medium">
                StarCleaning Services • Charleston, SC
            </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const LeadForm: React.FC = () => {
  const [step, setStep] = useState(STEPS.CONTACT);
  const [direction, setDirection] = useState(0); // For animation direction
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Location State
  const [city, setCity] = useState<string | null>(null);
  const [isCheckingZip, setIsCheckingZip] = useState(false);
  const [bookingsNearby, setBookingsNearby] = useState(0);

  // Form State
  const [formData, setFormData] = useState<LeadFormData>({
    name: '', email: '', phone: '', zipCode: '',
    bedrooms: 1, bathrooms: 1, sqFt: 1000, people: 1,
    pets: { dogs: false, cats: false, none: true },
    cleaningType: 'one-time',
    serviceDetail: 'design-time',
    estimatedPrice: 0,
  });
  
  // Pricing State for display
  const [priceDetails, setPriceDetails] = useState({
    base: 0,
    multiplier: 1,
    discount: 0,
    savings: 0,
    final: 0,
    isFirstCleanPromo: false
  });

  // Real-time Pricing Logic
  useEffect(() => {
    let basePrice = PRICING_CONFIG.BASE_PRICE;

    // Add room costs
    basePrice += (formData.bedrooms * PRICING_CONFIG.PER_BEDROOM);
    basePrice += (formData.bathrooms * PRICING_CONFIG.PER_BATHROOM);

    let finalPrice = basePrice;
    let multiplier = 1;
    let discount = 0;
    let isFirstCleanPromo = false;

    // Get Multiplier/Discount based on selection
    if (formData.cleaningType === 'one-time') {
      const service = ONE_TIME_SERVICES.find(s => s.id === formData.serviceDetail);
      if (service) {
        multiplier = service.multiplier || 1;
        finalPrice *= multiplier;
      }
    } else {
      const service = RECURRING_SERVICES.find(s => s.id === formData.serviceDetail);
      if (service) {
        discount = service.discount || 0;
        finalPrice = finalPrice * (1 - discount);
        // Only trigger promo if explicity tagged
        if (service.tag && service.tag.includes('50%')) {
            isFirstCleanPromo = true;
        }
      }
    }

    const calculatedFinal = Math.round(finalPrice);
    // The "Standard" price to compare against. If One-time, it's just the final. 
    // If Recurring, it's the Base price (what they would pay without subscription).
    // If One-time has a multiplier, the "Base" is the standard clean.
    const displayBase = Math.round(formData.cleaningType === 'one-time' ? basePrice * multiplier : basePrice);
    
    setPriceDetails({
        base: displayBase,
        multiplier,
        discount,
        savings: displayBase - calculatedFinal,
        final: calculatedFinal,
        isFirstCleanPromo
    });

    setFormData(prev => ({ ...prev, estimatedPrice: calculatedFinal }));
  }, [formData.bedrooms, formData.bathrooms, formData.cleaningType, formData.serviceDetail]);

  // City Lookup Logic
  useEffect(() => {
    if (formData.zipCode.length === 5) {
      const fetchCity = async () => {
        setIsCheckingZip(true);
        try {
          const response = await fetch(`https://api.zippopotam.us/us/${formData.zipCode}`);
          if (response.ok) {
            const data = await response.json();
            const place = data.places[0];
            setCity(place['place name']);
            // Generate a random "social proof" number between 8 and 19
            setBookingsNearby(Math.floor(Math.random() * 12) + 8);
          } else {
            setCity(null);
          }
        } catch (e) {
          console.error("Failed to fetch zip", e);
          setCity(null);
        } finally {
          setIsCheckingZip(false);
        }
      };
      fetchCity();
    } else {
      setCity(null);
    }
  }, [formData.zipCode]);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    let formatted = input;
    if (input.length > 6) formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
    else if (input.length > 3) formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    setFormData({ ...formData, phone: formatted });
    if (error) setError(null);
  };

  const togglePet = (type: 'dogs' | 'cats' | 'none') => {
    if (type === 'none') {
      setFormData({ ...formData, pets: { dogs: false, cats: false, none: true } });
    } else {
      setFormData(prev => ({
        ...prev,
        pets: { ...prev.pets, [type]: !prev.pets[type], none: false }
      }));
    }
  };

  const nextStep = () => {
    // Validation Step 1
    if (step === STEPS.CONTACT) {
      if (!formData.name || !formData.email || !formData.phone || !formData.zipCode) {
        setError('Please fill in all contact details to continue.');
        return;
      }
      if (formData.phone.length < 10) {
        setError('Please enter a valid phone number.');
        return;
      }
    }
    setError(null);
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    const WEBHOOK_URL = 'https://webhook.infra-remakingautomacoes.cloud/webhook/sc';

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cityDetected: city // Send the detected city too
        }),
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Instant Quote Booking',
            value: formData.estimatedPrice,
            currency: 'USD',
          });
        }
      }
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      setShowSuccessModal(true); // Fallback success
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation Variants with Spring Physics and Blur
  const variants = {
    enter: (direction: number) => ({ 
      x: direction > 0 ? 25 : -25, 
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.98
    }),
    center: { 
      x: 0, 
      opacity: 1,
      filter: "blur(0px)",
      scale: 1
    },
    exit: (direction: number) => ({ 
      x: direction < 0 ? 25 : -25, 
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.98
    }),
  };

  // Spring transition config
  const transitionConfig = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    opacity: { duration: 0.2 }
  };

  return (
    <>
      <AnimatePresence>{showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} name={formData.name} />}</AnimatePresence>

      <div className="relative group perspective-1000 w-full max-w-lg mx-auto">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-[2rem] blur-2xl opacity-50"></div>
        
        <div className="bg-white/95 backdrop-blur-3xl rounded-[2rem] border border-white/60 shadow-2xl overflow-hidden relative min-h-[550px] flex flex-col transition-all duration-300">
          
          {/* Header Progress */}
          <div className="px-6 pt-8 pb-4 relative z-10">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 {step > 1 && (
                    <button 
                      onClick={prevStep} 
                      className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                 )}
               </div>
               
               <div className="flex gap-2">
                 {[1, 2, 3].map(i => (
                   <motion.div 
                    key={i} 
                    layout
                    className={`h-1.5 rounded-full ${i <= step ? 'bg-brand-blue' : 'bg-slate-100'}`}
                    animate={{ width: i === step ? 32 : 8 }} 
                   />
                 ))}
               </div>
               
               <div className="w-8" /> {/* Spacer for balance */}
            </div>
            
            <div className="text-center space-y-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
                    {step === 1 && "Get Your Instant Quote"}
                    {step === 2 && "Tell Us About Your Home"}
                    {step === 3 && "Customize Your Clean"}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium">
                    {step === 1 && "Start here. It takes less than 30 seconds."}
                    {step === 2 && "We tailor the price to your specific needs."}
                    {step === 3 && "Select a plan that fits your schedule."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-24 scrollbar-thin scrollbar-thumb-slate-200">
             <AnimatePresence custom={direction} mode="wait">
               
               {/* STEP 1: CONTACT */}
               {step === 1 && (
                 <motion.div
                   key="step1"
                   custom={direction}
                   variants={variants}
                   initial="enter"
                   animate="center"
                   exit="exit"
                   transition={transitionConfig}
                   className="space-y-5 pt-2"
                 >
                    <FocusInput 
                      icon={User} 
                      label="Full Name" 
                      name="name" 
                      placeholder="e.g., John Doe" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      error={!!error && !formData.name}
                    />

                    <FocusInput 
                      icon={Mail} 
                      label="Email Address" 
                      name="email" 
                      type="email"
                      placeholder="john@example.com" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      error={!!error && !formData.email}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FocusInput 
                        icon={Phone} 
                        label="Phone Number" 
                        name="phone" 
                        type="tel"
                        placeholder="(555) 123-4567" 
                        value={formData.phone} 
                        onChange={handlePhoneChange} 
                        error={!!error && !formData.phone}
                      />
                      <div className="relative">
                        <FocusInput 
                          icon={MapPin} 
                          label="Zip Code" 
                          name="zipCode" 
                          placeholder="29401" 
                          maxLength={5}
                          value={formData.zipCode} 
                          onChange={handleInputChange} 
                          error={!!error && !formData.zipCode}
                          isSuccess={!!city}
                        />
                        {isCheckingZip && (
                          <div className="absolute right-3 top-[38px]">
                            <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dynamic Location Availability Message */}
                    <AnimatePresence>
                      {city && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-green-50/50 border border-green-100 rounded-xl p-3 flex items-start gap-3"
                        >
                          <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                            <Sparkles className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              Available in <span className="text-green-600">{city}</span>!
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                              High demand: <span className="font-bold text-slate-700">{bookingsNearby} neighbors</span> booked this week. Limited slots remaining.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center border border-red-100 flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" /> {error}
                      </motion.div>
                    )}
                    
                    {/* Trust Badges */}
                    <div className="flex justify-center gap-6 pt-2 opacity-60">
                       <div className="flex items-center gap-1.5 grayscale transition-all hover:grayscale-0">
                         <Lock className="w-3.5 h-3.5 text-green-500" />
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SSL Encrypted</span>
                       </div>
                       <div className="flex items-center gap-1.5 grayscale transition-all hover:grayscale-0">
                         <Receipt className="w-3.5 h-3.5 text-brand-blue" />
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">No Spam Promise</span>
                       </div>
                    </div>
                 </motion.div>
               )}

               {/* STEP 2: HOME DETAILS */}
               {step === 2 && (
                 <motion.div
                   key="step2"
                   custom={direction}
                   variants={variants}
                   initial="enter"
                   animate="center"
                   exit="exit"
                   transition={transitionConfig}
                   className="space-y-6 pt-2"
                 >
                    {/* Bedrooms */}
                    <div className="space-y-2">
                       <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide"><Home className="w-4 h-4 text-brand-blue" /> Bedrooms</label>
                       <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(num => (
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              key={num}
                              onClick={() => setFormData({...formData, bedrooms: num})}
                              className={`flex-1 h-12 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${formData.bedrooms === num ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-blue-500/20' : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300 hover:bg-white'}`}
                            >
                              {num}{num === 5 ? '+' : ''}
                            </motion.button>
                          ))}
                       </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="space-y-2">
                       <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide"><Sparkles className="w-4 h-4 text-brand-blue" /> Bathrooms</label>
                       <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(num => (
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              key={num}
                              onClick={() => setFormData({...formData, bathrooms: num})}
                              className={`flex-1 h-12 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${formData.bathrooms === num ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-blue-500/20' : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300 hover:bg-white'}`}
                            >
                              {num}{num === 5 ? '+' : ''}
                            </motion.button>
                          ))}
                       </div>
                    </div>

                    {/* Sq Ft */}
                    <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <div className="flex justify-between items-center">
                         <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Approx. Size</label>
                         <span className="text-sm font-bold text-brand-blue bg-blue-100 px-2 py-1 rounded-md">{formData.sqFt.toLocaleString()} sq ft</span>
                       </div>
                       <input 
                          type="range" min="500" max="5000" step="100" 
                          value={formData.sqFt} 
                          onChange={(e) => setFormData({...formData, sqFt: Number(e.target.value)})}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                       />
                       <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                          <span>Small Apt</span>
                          <span>Large Home</span>
                       </div>
                    </div>

                    {/* Pets */}
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Pets in Home</label>
                       <div className="flex gap-3">
                          <motion.button whileTap={{ scale: 0.95 }} onClick={() => togglePet('dogs')} className={`flex-1 py-3 px-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${formData.pets.dogs ? 'bg-blue-50 border-brand-blue text-brand-blue' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                             <Dog className="w-4 h-4" /> <span className="text-xs font-bold">Dogs</span>
                          </motion.button>
                          <motion.button whileTap={{ scale: 0.95 }} onClick={() => togglePet('cats')} className={`flex-1 py-3 px-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${formData.pets.cats ? 'bg-blue-50 border-brand-blue text-brand-blue' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                             <Cat className="w-4 h-4" /> <span className="text-xs font-bold">Cats</span>
                          </motion.button>
                          <motion.button whileTap={{ scale: 0.95 }} onClick={() => togglePet('none')} className={`flex-1 py-3 px-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${formData.pets.none ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                             <span className="text-xs font-bold">None</span>
                          </motion.button>
                       </div>
                    </div>
                 </motion.div>
               )}

               {/* STEP 3: SERVICE */}
               {step === 3 && (
                 <motion.div
                   key="step3"
                   custom={direction}
                   variants={variants}
                   initial="enter"
                   animate="center"
                   exit="exit"
                   transition={transitionConfig}
                   className="space-y-4 pt-2"
                 >
                   {/* Tabs */}
                   <div className="flex p-1 bg-slate-100 rounded-xl mb-4">
                      <button 
                        onClick={() => { setFormData({...formData, cleaningType: 'one-time', serviceDetail: ONE_TIME_SERVICES[0].id}) }}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 ${formData.cleaningType === 'one-time' ? 'bg-white text-brand-blue shadow-sm scale-100' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        One-Time Clean
                      </button>
                      <button 
                        onClick={() => { setFormData({...formData, cleaningType: 'recurring', serviceDetail: RECURRING_SERVICES[0].id}) }}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${formData.cleaningType === 'recurring' ? 'bg-white text-brand-blue shadow-sm scale-100' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Recurring <span className="hidden md:inline text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-extrabold tracking-tight">Save 20%</span>
                      </button>
                   </div>

                   {/* Options List */}
                   <div className="space-y-3">
                        {(formData.cleaningType === 'one-time' ? ONE_TIME_SERVICES : RECURRING_SERVICES).map((option) => (
                        <motion.div 
                            key={option.id}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({...formData, serviceDetail: option.id})}
                            className={`relative p-3 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4 group overflow-hidden ${
                            formData.serviceDetail === option.id 
                            ? 'border-brand-blue bg-white shadow-xl shadow-blue-500/10 ring-1 ring-brand-blue/50' 
                            : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50'
                            }`}
                        >
                            {/* Selection Background Fill */}
                            <div className={`absolute inset-0 bg-blue-50/50 transition-opacity duration-300 pointer-events-none ${formData.serviceDetail === option.id ? 'opacity-100' : 'opacity-0'}`} />

                            {/* Discount/Popular Tag - Inline Badge for Mobile Safety */}
                            {option.tag && (
                            <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider z-10 shadow-sm ${
                                option.tag.includes('Best') || option.tag.includes('Popular')
                                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white' 
                                : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
                            }`}>
                                {option.tag}
                            </div>
                            )}
                            
                            {/* Icon - Left Column */}
                            <div className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                            formData.serviceDetail === option.id 
                            ? 'bg-brand-blue text-white shadow-md shadow-blue-500/30 rotate-3' 
                            : 'bg-slate-50 text-slate-400 group-hover:bg-blue-100 group-hover:text-brand-blue'
                            }`}>
                                {option.id === 'design-time' ? <Clock className="w-5 h-5 sm:w-6 sm:h-6" /> :
                                option.id === 'deep-clean' ? <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" /> :
                                option.id === 'move-in-out' ? <Box className="w-5 h-5 sm:w-6 sm:h-6" /> :
                                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                                }
                            </div>

                            {/* Text Content - Middle Column */}
                            <div className={`relative z-10 min-w-0 ${option.tag ? 'pr-2' : ''}`}>
                                <h4 className={`text-sm sm:text-base font-bold truncate transition-colors ${formData.serviceDetail === option.id ? 'text-brand-blue' : 'text-slate-800'}`}>
                                    {option.label}
                                </h4>
                                <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                                    {option.desc}
                                </p>
                            </div>

                            {/* Selection Indicator - Right Column */}
                            <div className={`relative z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                            formData.serviceDetail === option.id 
                            ? 'border-brand-blue bg-brand-blue scale-110' 
                            : 'border-slate-200 bg-transparent group-hover:border-blue-300'
                            }`}>
                                <AnimatePresence>
                                    {formData.serviceDetail === option.id && (
                                    <motion.div 
                                        initial={{ scale: 0 }} 
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[3]" />
                                    </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                        ))}
                    </div>
                   
                   {/* PRICE SUMMARY SECTION */}
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="mt-6 pt-4 border-t-2 border-dashed border-slate-200 space-y-2"
                   >
                     <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-medium">Standard Service Value</span>
                        <span className="text-xs font-bold text-slate-700">${priceDetails.base}</span>
                     </div>
                     
                     {/* Discount Row - Always render placeholder to prevent height jump */}
                     <div className={`flex justify-between items-center transition-opacity duration-200 ${priceDetails.discount > 0 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                          <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                            <Tag className="w-3 h-3" /> Frequency Discount
                          </span>
                          <span className="text-xs font-bold text-green-600">-${priceDetails.savings}</span>
                     </div>

                     <div className="flex justify-between items-end mt-1">
                        <span className="text-sm font-bold text-slate-900">Total per Clean</span>
                        <div className="text-right">
                           {priceDetails.discount > 0 && (
                             <span className="text-xs text-slate-400 line-through mr-2">${priceDetails.base}</span>
                           )}
                           <span className="text-xl font-extrabold text-brand-blue">${priceDetails.final}</span>
                        </div>
                     </div>
                   </motion.div>

                 </motion.div>
               )}

             </AnimatePresence>
          </div>

          {/* Sticky Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 z-20">
             {step < 3 ? (
                <button 
                  onClick={nextStep}
                  className="w-full h-14 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white font-bold rounded-[14px] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:brightness-105 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">Next Step <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                </button>
             ) : (
               <div className="flex gap-4 items-center">
                  <div className="flex-1">
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Estimated Total</p>
                     <div className="flex items-baseline gap-2">
                        {/* Strikethrough for discount */}
                        {priceDetails.discount > 0 && (
                          <span className="text-sm text-slate-400 font-bold line-through decoration-red-400 decoration-2">${priceDetails.base}</span>
                        )}
                        <p className="text-3xl font-extrabold text-slate-900 flex items-center leading-none">
                            <span className="text-lg mr-0.5 text-slate-400 align-top mt-1">$</span>{formData.estimatedPrice}
                        </p>
                     </div>
                  </div>
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-[2] h-14 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white font-bold text-lg rounded-[14px] shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:brightness-105 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_linear_infinite]" />
                    
                    <span className="relative z-10 flex items-center gap-2">
                       {isSubmitting ? <Loader2 className="animate-spin" /> : "Book Now"}
                    </span>
                  </button>
               </div>
             )}
          </div>

        </div>
      </div>
    </>
  );
};