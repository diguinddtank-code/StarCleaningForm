import React, { useState, useRef, useEffect } from 'react';
import { motion, Variants, useAnimation, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Clock, Home, Building2, Box, Star, Quote, Heart, UserCheck, HeartHandshake, Instagram, ArrowRight, MoveHorizontal, Plus, Minus, HelpCircle, Trophy, MessageCircle, ThumbsUp, Share2, MoreHorizontal, Check, Shield, Award, X, AlertCircle, Zap, Crown, Diamond, Gem } from 'lucide-react';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const TrustBadges: React.FC = () => {
  const badges = [
    { text: "Best of Charleston '24", icon: <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" strokeWidth={1.5} />, color: "border-yellow-100 bg-gradient-to-br from-yellow-50 to-amber-50" },
    { text: "Google 5-Star Rated", icon: <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" strokeWidth={1.5} />, color: "border-yellow-100 bg-gradient-to-br from-yellow-50 to-amber-50" },
    { text: "Licensed & Insured", icon: <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-brand-blue" strokeWidth={1.5} />, color: "border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50" },
    { text: "100% Satisfaction", icon: <Heart className="w-4 h-4 md:w-5 md:h-5 text-rose-500" strokeWidth={1.5} />, color: "border-rose-100 bg-gradient-to-br from-rose-50 to-pink-50" }
  ];

  return (
    <div className="bg-white py-8 border-b border-slate-100 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-400 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">Recognized Excellence</p>
        
        {/* CHANGED: Use Grid for mobile responsiveness */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-8 text-center">
          {badges.map((badge, idx) => (
            <div key={idx} className={`flex items-center justify-center gap-2 px-3 py-2.5 md:px-4 rounded-xl md:rounded-full border ${badge.color} shadow-sm hover:shadow-md transition-all duration-300 cursor-default select-none w-full md:w-auto group`}>
              <div className="group-hover:scale-110 transition-transform duration-300">{badge.icon}</div>
              <span className="text-slate-700 font-bold text-[11px] md:text-sm whitespace-nowrap">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WhatClientsSay: React.FC = () => {
  const reviews = [
    {
      name: "Jessica Miller",
      role: "Homeowner",
      location: "Summerville, SC",
      text: "I was hesitant to hire a cleaning service, but StarCleaning completely changed my mind. My home has never looked this good! The team was so polite."
    },
    {
      name: "Mark Thompson",
      role: "Business Owner",
      location: "Mt. Pleasant, SC",
      text: "Professional, punctual, and incredibly detailed. They didn't just clean around things, they cleaned everything. Highly recommended."
    },
    {
      name: "Sarah Jenkins",
      role: "Mother of 3",
      location: "West Ashley, SC",
      text: "Finally, a service that actually deep cleans! With three kids and a dog, I needed help, and they delivered 100%. Worth every penny."
    },
    {
      name: "David Ross",
      role: "Real Estate Agent",
      location: "North Charleston, SC",
      text: "I recommend StarCleaning to all my clients preparing to sell. They make homes sparkle like new. Best in Charleston hands down."
    },
    {
      name: "Emily Parker",
      role: "Designer",
      location: "Downtown, SC",
      text: "The attention to detail is unmatched. They even organized my bookshelf! It feels like a 5-star hotel every time they leave."
    },
    {
      name: "Michael B.",
      role: "Resident",
      location: "Goose Creek, SC",
      text: "Showed up on time, worked hard, and the house smells amazing. The booking process was super easy too."
    }
  ];

  // Duplicate for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-50 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-100 px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-sm font-bold text-slate-700">Community Love</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">What Our Clients Say</h2>
        <p className="text-slate-500 mt-4 text-lg">Don't just take our word for it. Hear from your neighbors.</p>
      </div>

      <div className="relative w-full">
        {/* Gradient Masks for Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-20"></div>

        <motion.div 
            className="flex gap-6 px-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                duration: 25, // FASTER ANIMATION (Reduced duration)
                ease: "linear", 
                repeat: Infinity 
            }}
        >
            {duplicatedReviews.map((review, idx) => (
                <div key={idx} className="w-[320px] md:w-[420px] bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 flex-shrink-0 group cursor-default">
                    <div className="flex items-center gap-4 mb-6">
                        {/* ANONYMOUS AVATAR */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl ring-4 ring-slate-50 shadow-inner">
                           {review.name.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-slate-900 text-lg">{review.name}</h4>
                                <div className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-green-100 flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Verified
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                <span>{review.role}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span>{review.location}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-1 mb-4">
                        {[1,2,3,4,5].map(i => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                    </div>
                    
                    <p className="text-slate-600 text-base leading-relaxed italic relative">
                        <Quote className="absolute -top-3 -left-2 w-8 h-8 text-blue-50 -z-10 transform -scale-x-100" />
                        "{review.text}"
                    </p>
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

// MODIFIED: Responsive Cards that Fill Space
export const TheStandard: React.FC = () => {
    // Categorized checklist for better layout
    const categories = [
        {
            id: "kitchen",
            tabLabel: "Kitchen",
            title: "Kitchen & Dining",
            icon: <Zap className="w-5 h-5 text-amber-500" strokeWidth={1.5} />,
            items: ["Appliances polished", "Microwave cleaned in/out", "Countertops & backsplashes", "Sinks scrubbed"]
        },
        {
            id: "bath",
            tabLabel: "Bathrooms",
            title: "Bathrooms",
            icon: <Sparkles className="w-5 h-5 text-sky-500" strokeWidth={1.5} />,
            items: ["Toilets, tubs & showers", "Mirrors streak-free", "Chrome fixtures polished", "Grout lines scrubbed"]
        },
        {
            id: "living",
            tabLabel: "Living Areas",
            title: "Living & Bedrooms",
            icon: <Home className="w-5 h-5 text-indigo-500" strokeWidth={1.5} />,
            items: ["Baseboards hand-wiped", "Ceiling fans dusted", "Fresh linens made", "Floors vacuumed & mopped"]
        }
    ];

    return (
        <section id="process" className="py-20 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                    <span className="text-brand-blue font-bold tracking-wider uppercase text-xs bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 inline-block mb-4">The 50-Point Checklist</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        We don't cut corners.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">We clean them.</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Forget "wipe-downs". We follow a rigorous, room-by-room protocol to ensure every inch of your home meets our 5-Star Hotel Standard.
                    </p>
                </div>

                {/* Mobile: Horizontal Snap Scroll - More natural, fits content height */}
                <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 scrollbar-hide -mx-4">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="snap-center shrink-0 w-[85vw] max-w-[320px]">
                            <div className="bg-slate-50 h-full rounded-[2rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm text-brand-blue ring-1 ring-slate-100">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{cat.title}</h3>
                                </div>
                                
                                <ul className="space-y-3 flex-1">
                                    {cat.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                            <div className="min-w-[1.25rem]">
                                                <Check className="w-5 h-5 text-green-500" strokeWidth={2.5} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: Grid with full height cards and "blocky" list items to fill space */}
                <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-10">
                    {categories.map((cat, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Header */}
                            <div className="flex flex-col items-start mb-8">
                                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-1 ring-slate-100/50">
                                    {React.cloneElement(cat.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-900">{cat.title}</h3>
                                <div className="h-1 w-12 bg-brand-blue/20 rounded-full mt-4 group-hover:w-full group-hover:bg-brand-blue transition-all duration-500"></div>
                            </div>
                            
                            {/* List - Styled as blocks to fill empty space */}
                            <ul className="space-y-3 flex-1">
                                {cat.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-600 bg-white p-4 rounded-2xl border border-slate-100/50 shadow-sm group-hover:border-blue-50 group-hover:shadow-md transition-all">
                                        <div className="mt-0.5 min-w-[1.25rem]">
                                            <Check className="w-5 h-5 text-green-500" strokeWidth={3} />
                                        </div>
                                        <span className="leading-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// IMPROVED: Us vs Them Component with better mobile responsiveness
export const UsVsThem: React.FC = () => {
    const comparisons = [
        {
            feature: "Staff Quality",
            them: "Random contractors (gig workers)",
            us: "W-2 Employees, Background Checked",
            icon: <UserCheck className="w-5 h-5" strokeWidth={1.5} />
        },
        {
            feature: "Guarantee",
            them: "None / Hard to reach support",
            us: "100% Satisfaction or Refund",
            icon: <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
        },
        {
            feature: "Supplies",
            them: "Uses your supplies or cheap chemicals",
            us: "We bring premium Eco-friendly supplies",
            icon: <Sparkles className="w-5 h-5" strokeWidth={1.5} />
        },
        {
            feature: "Reliability",
            them: "Often late or cancel last minute",
            us: "On-time guarantee & backup teams",
            icon: <Clock className="w-5 h-5" strokeWidth={1.5} />
        }
    ];

    return (
        <section className="py-20 bg-slate-50 border-y border-slate-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Why Neighbors Switch to Us</h2>
                    <p className="text-slate-500 mt-2">See the difference between a "cleaner" and a Professional Service.</p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
                    {/* Desktop Header */}
                    <div className="hidden md:grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-6 text-sm font-extrabold uppercase tracking-wider text-slate-500">
                        <div className="pl-4">Feature</div>
                        <div className="text-center text-red-500">Other "Cleaners"</div>
                        <div className="text-center text-brand-blue">StarCleaning</div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {comparisons.map((row, idx) => (
                            <div key={idx} className="flex flex-col md:grid md:grid-cols-3 items-start md:items-center p-6 md:p-8 hover:bg-slate-50/50 transition-colors gap-4 md:gap-0">
                                
                                {/* Feature Header (Mobile & Desktop) */}
                                <div className="flex items-center gap-3 w-full mb-2 md:mb-0">
                                    <div className="p-2 bg-blue-50 text-brand-blue rounded-lg flex-shrink-0">
                                        {row.icon}
                                    </div>
                                    <span className="font-bold text-slate-900 text-lg md:text-base">{row.feature}</span>
                                </div>

                                {/* Comparison Content */}
                                <div className="w-full md:contents space-y-3 md:space-y-0">
                                    
                                    {/* Them (Bad) */}
                                    <div className="md:flex md:items-center md:justify-center md:border-x md:border-slate-100 md:px-4">
                                        {/* Mobile Label */}
                                        <div className="md:hidden flex items-center gap-2 mb-1.5">
                                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400">Other Cleaners</span>
                                            <div className="h-px bg-red-100 flex-grow"></div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-4 md:p-0 rounded-xl bg-red-50/50 md:bg-transparent border border-red-100 md:border-none">
                                            <div className="flex-shrink-0 bg-white md:bg-transparent rounded-full p-1 md:p-0">
                                                <X className="w-5 h-5 md:w-6 md:h-6 text-red-400" strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-600 md:text-slate-500 font-medium text-sm md:text-center leading-snug">{row.them}</span>
                                        </div>
                                    </div>

                                    {/* Us (Good) */}
                                    <div className="md:flex md:items-center md:justify-center md:px-4">
                                         {/* Mobile Label */}
                                        <div className="md:hidden flex items-center gap-2 mb-1.5 mt-1">
                                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-blue">StarCleaning</span>
                                            <div className="h-px bg-blue-100 flex-grow"></div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 md:p-0 rounded-xl bg-brand-blue/5 md:bg-transparent border border-brand-blue/20 md:border-none shadow-sm md:shadow-none">
                                            <div className="bg-brand-blue md:bg-green-100 rounded-full p-1 flex-shrink-0">
                                                <Check className="w-3 h-3 md:w-4 md:h-4 text-white md:text-green-600 stroke-[3]" />
                                            </div>
                                            <span className="text-slate-900 font-bold text-sm md:text-center leading-snug">{row.us}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Bottom Callout */}
                    <div className="bg-slate-900 p-4 text-center">
                        <p className="text-white text-sm font-medium">Don't settle for less. <span className="text-brand-blue font-bold">Experience the 5-star difference today.</span></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-white" strokeWidth={1.5} />,
      title: "Reliable & Punctual",
      desc: "App-managed scheduling means we are on time, every time.",
      bg: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      icon: <Diamond className="w-8 h-8 text-white" strokeWidth={1.5} />,
      title: "Pet & Family Safe",
      desc: "Non-toxic, eco-friendly products safe for your loved ones.",
      bg: "bg-gradient-to-br from-rose-400 to-rose-600"
    },
    {
      icon: <Crown className="w-8 h-8 text-white" strokeWidth={1.5} />,
      title: "Vetted Professionals",
      desc: "Every cleaner is background checked and rigorously trained.",
      bg: "bg-gradient-to-br from-indigo-500 to-indigo-600"
    },
    {
      icon: <Award className="w-8 h-8 text-white" strokeWidth={1.5} />,
      title: "Senior Discounts",
      desc: "Special rates for seniors and military families.",
      bg: "bg-gradient-to-br from-amber-400 to-orange-500"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-brand-blue font-bold tracking-wider uppercase text-xs md:text-sm bg-blue-100 px-3 py-1 rounded-full border border-blue-200">The Star Difference</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-5 tracking-tight">Why we are rated #1</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">We don't just clean; we care for your home. Experience the difference.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group bg-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 border border-slate-100 hover:border-blue-100 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-black/5 ${feature.bg} transform group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Performance Optimization: Cache rect dimensions
  const containerRect = useRef<{ left: number, width: number } | null>(null);

  const updateRect = () => {
    if (containerRef.current) {
        const { left, width } = containerRef.current.getBoundingClientRect();
        containerRect.current = { left, width };
    }
  };

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRect.current && containerRef.current) {
        updateRect();
    }
    
    if (!containerRect.current) return;

    const { left, width } = containerRect.current;
    let clientX;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as React.MouseEvent).clientX;
    }

    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  // Image source - High quality living room
  const imageSrc = "https://i.imgur.com/XhU71Rxh.jpg";
  const limpa = "https://i.imgur.com/gpqI75Lh.jpg";
  
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">See the Difference</h2>
            <p className="text-slate-600 text-lg">Drag the slider to reveal the shine.</p>
         </div>

        {/* Mobile Opt: Aspect Ratio 4/5 (Tall) on mobile, 21/9 (Wide) on desktop */}
        <div 
            className="relative w-full max-w-6xl mx-auto aspect-[4/5] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white select-none group touch-none ring-1 ring-slate-100"
            onMouseEnter={updateRect}
            onTouchStart={updateRect}
        >
          
          <div 
            ref={containerRef}
            className="absolute inset-0 w-full h-full cursor-ew-resize touch-none"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            {/* CLEAN IMAGE (Bottom Layer) */}
            <div className="absolute inset-0 w-full h-full bg-slate-50">
               <img 
                src={limpa} 
                alt="Clean Room" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover pointer-events-none"
              />
              {/* Sparkles on the clean side */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <motion.div 
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-1/4 left-1/4"
                    style={{ left: `${sliderPosition / 2}%` }} 
                 >
                    <Sparkles className="w-12 h-12 text-yellow-300 fill-yellow-100 drop-shadow-lg" />
                 </motion.div>
              </div>
            </div>

            {/* DIRTY IMAGE (Top Layer - Masked) */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
               <img 
                src={imageSrc} 
                alt="Dirty Room" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter sepia-[0.3] brightness-[0.8] contrast-[1.1] grayscale-[0.2] blur-[0.5px]"
              />
              <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 shadow-xl">
                Before
              </div>
            </div>
             
             {/* Overlay text for 'After' on the clean side */}
             <div 
                className="absolute top-8 left-8 bg-brand-blue/90 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 pointer-events-none transition-opacity duration-300 shadow-xl"
                style={{ opacity: sliderPosition > 10 ? 1 : 0 }}
             >
                After
              </div>

            {/* SLIDER HANDLE */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_2px_rgba(0,0,0,0.2)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl text-brand-blue transition-transform hover:scale-110 active:scale-95 border-4 border-slate-50">
                <MoveHorizontal className="w-6 h-6" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export const Services: React.FC = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8 text-brand-blue" strokeWidth={1.5} />,
      title: "Residential Standard",
      desc: "Weekly/Bi-weekly maintenance."
    },
    {
      icon: <Gem className="w-8 h-8 text-brand-blue" strokeWidth={1.5} />,
      title: "Deep Cleaning",
      desc: "Top-to-bottom detailed scrub."
    },
    {
      icon: <Box className="w-8 h-8 text-brand-blue" strokeWidth={1.5} />,
      title: "Move-In / Move-Out",
      desc: "Empty home turnaround."
    },
    {
      icon: <Building2 className="w-8 h-8 text-brand-blue" strokeWidth={1.5} />,
      title: "Commercial",
      desc: "Office & retail spaces."
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">Our Services</h2>
            <p className="text-slate-600 text-lg">Comprehensive cleaning solutions tailored to your lifestyle. No contracts, just great service.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 hover:border-brand-blue/30 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-default relative overflow-hidden flex items-center md:block gap-5 md:gap-0"
            >
              {/* Subtle hover background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out hidden md:block"></div>
              
              <div className="relative z-10 flex-shrink-0">
                <div className="bg-blue-50 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center md:mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 ease-out shadow-inner border border-blue-100/50">
                  {service.icon}
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-slate-900 group-hover:text-brand-blue transition-colors">{service.title}</h3>
                <p className="text-slate-600 text-sm font-medium">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RiskFreeGuarantee: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-blue relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/20 shadow-xl">
           <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Our "Spotless" Promise
        </h2>
        
        <p className="text-blue-50 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
          We stand behind every clean. If you're not 100% satisfied, let us know within 24 hours and we'll come back to fix it for free.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                 <div className="bg-green-400/20 p-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-green-300 stroke-[3]" />
                 </div>
                 <h4 className="font-bold text-white text-sm">Zero Risk</h4>
              </div>
              <p className="text-blue-100 text-xs leading-relaxed">Payment is only finalized after your service is complete.</p>
           </div>
           
           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                 <div className="bg-green-400/20 p-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-green-300 stroke-[3]" />
                 </div>
                 <h4 className="font-bold text-white text-sm">24h Guarantee</h4>
              </div>
              <p className="text-blue-100 text-xs leading-relaxed">Report any issues within 24h for a complimentary re-clean.</p>
           </div>

           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                 <div className="bg-green-400/20 p-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-green-300 stroke-[3]" />
                 </div>
                 <h4 className="font-bold text-white text-sm">Insured & Bonded</h4>
              </div>
              <p className="text-blue-100 text-xs leading-relaxed">Your home and property are fully protected during every visit.</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -mr-32 -mt-32 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-60 -ml-32 -mb-32"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-sm font-bold text-slate-700 ml-1">Google 5-Star Rated</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Talk of the Town</h2>
          <p className="text-slate-600 mt-4 text-lg">Real neighbors recommending us in your local community groups.</p>
        </div>

        {/* Community Group Post Simulation */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative max-w-2xl mx-auto ring-1 ring-slate-100">
            {/* Fake Facebook/Nextdoor Header */}
            <div className="bg-white border-b border-slate-100 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                      <Home className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">Charleston Neighbors & Moms</h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">Public Group • 15.2k Members</p>
                   </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-slate-300" />
            </div>

            <div>
                {/* The "Question" Post */}
                <div className="p-6 md:p-8 bg-white">
                    <div className="flex gap-4 mb-4">
                        <img 
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80&fm=webp" 
                            alt="Neighbor" 
                            loading="lazy"
                            decoding="async"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-100" 
                        />
                        <div>
                            <p className="font-bold text-slate-900 text-base">Jessica Miller</p>
                            <p className="text-xs text-slate-400 mb-2">2h ago • Summerville, SC</p>
                        </div>
                    </div>
                     <p className="text-slate-800 leading-relaxed text-base md:text-lg">
                        🆘 Help needed! My in-laws are coming to visit this weekend and my house is a DISASTER with the kids and work. 
                        <br/><br/>
                        Does anyone have a <strong>cleaning service they actually trust?</strong> I've been burned before. Need someone reliable who does a deep clean! 🙏
                    </p>
                    {/* Reactions Bar */}
                    <div className="flex items-center gap-6 mt-6 pt-4 border-t border-slate-50 text-slate-400 text-sm font-bold">
                         <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors"><ThumbsUp className="w-4 h-4" /> Like</div>
                         <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors"><MessageCircle className="w-4 h-4" /> 24 Comments</div>
                         <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors"><Share2 className="w-4 h-4" /> Share</div>
                    </div>
                </div>

                {/* The "Answers" (Testimonials) */}
                <div className="bg-slate-50/50 p-6 md:p-8 space-y-5 border-t border-slate-100">
                    
                    {/* Comment 1 */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-3"
                    >
                         <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                            MR
                         </div>
                         <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex-grow hover:shadow-md transition-shadow">
                             <p className="font-bold text-slate-900 text-sm">Mike Ross</p>
                             <p className="text-slate-600 text-sm mt-1">
                                You HAVE to call <span className="text-brand-blue font-bold cursor-pointer hover:underline">@StarCleaning</span>. They saved my life before Thanksgiving. The deep clean is no joke!
                             </p>
                             <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-slate-400 font-medium hover:underline cursor-pointer">Like</span>
                                <span className="text-xs text-slate-400 font-medium hover:underline cursor-pointer">Reply</span>
                                <span className="text-xs text-slate-400">1h</span>
                             </div>
                         </div>
                    </motion.div>

                    {/* Comment 2 (Highlight) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-3"
                    >
                         <img 
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80&fm=webp" 
                            alt="Reviewer" 
                            loading="lazy"
                            decoding="async"
                            className="w-9 h-9 rounded-full object-cover border border-white shadow-sm flex-shrink-0" 
                        />
                         <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-md border-l-4 border-l-brand-blue border-y border-r border-slate-100 flex-grow">
                             <p className="font-bold text-slate-900 text-sm">Sarah Jenkins</p>
                             <p className="text-slate-600 text-sm mt-1">
                                +1 for StarCleaning! 🙌 They are the only ones I trust with my dogs in the house. Super professional and they show up ON TIME.
                             </p>
                             <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-blue-500 font-bold bg-blue-50 px-1.5 rounded-md flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> 2</span>
                                <span className="text-xs text-slate-400 font-medium hover:underline cursor-pointer">Like</span>
                                <span className="text-xs text-slate-400 font-medium hover:underline cursor-pointer">Reply</span>
                                <span className="text-xs text-slate-400">45m</span>
                             </div>
                         </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Which areas do you serve?",
      answer: "We proudly serve the entire Greater Charleston area, including Summerville, North Charleston, Mt Pleasant, West Ashley, Goose Creek, and Ladson. If you're unsure if you're in our zone, just give us a call!"
    },
    {
      question: "How is pricing calculated?",
      answer: "We believe in fair, transparent pricing based on the size of your home (square footage) and the specific type of service (Standard, Deep, or Move-in/Move-out). Fill out our instant quote form above to get an accurate estimate in seconds."
    },
    {
      question: "Do I need to provide cleaning supplies?",
      answer: "Not at all! We bring our own professional-grade, eco-friendly supplies and equipment. However, if you have specific products you'd prefer us to use, we are happy to accommodate."
    },
    {
      question: "Are you insured and bonded?",
      answer: "Yes, absolutely. StarCleaning is fully licensed, insured, and bonded. We take the safety and security of your home seriously, so you can have complete peace of mind."
    },
    {
      question: "Is your service pet-friendly?",
      answer: "We love pets! Our cleaning products are safe for dogs, cats, and kids. We just ask that you let us know if you have pets so our team is aware upon arrival."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 mb-4">
            <HelpCircle className="w-4 h-4 text-brand-blue" strokeWidth={2} />
            <span className="text-brand-blue font-bold text-xs uppercase tracking-wide">Common Questions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-600 mt-4 text-lg">Everything you need to know about our premium services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              key={idx} 
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-6 py-5 md:px-8 md:py-6 text-left flex justify-between items-center bg-white hover:bg-slate-50/50 transition-colors"
              >
                <span className={`font-bold text-base md:text-lg ${openIndex === idx ? 'text-brand-blue' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 p-2 rounded-full transition-all duration-300 ${openIndex === idx ? 'bg-brand-blue text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                  {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-slate-600 leading-relaxed border-t border-slate-50/0 text-base">
                      <div className="pt-2">{faq.answer}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
       {/* Background subtle noise or gradient */}
       <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50"></div>
       
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-blue-900/20">
             {/* Decorative Circles */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

             <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-20">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner flex-shrink-0">
                      <Instagram className="w-10 h-10 text-white" strokeWidth={1.5} />
                   </div>
                   <div className="text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Join Our Community</h3>
                      <p className="text-blue-100 font-medium text-lg">Daily satisfying cleans & tips.</p>
                      <p className="text-white/60 text-sm mt-1 font-mono">@StarCleaningSC</p>
                   </div>
                </div>
                
                <a 
                  href="#" 
                  className="bg-white text-brand-blue px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-black/10 flex items-center gap-2 group whitespace-nowrap"
                >
                   Follow Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
             </div>
          </div>
       </div>
    </section>
  );
};