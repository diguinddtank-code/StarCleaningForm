import React, { useState, useRef, useEffect } from 'react';
import { motion, Variants, useAnimation, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Clock, Home, Building2, Box, Star, Quote, Heart, UserCheck, HeartHandshake, Instagram, ArrowRight, MoveHorizontal, Plus, Minus, HelpCircle } from 'lucide-react';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const TrustBadges: React.FC = () => {
  const badges = [
    "Google 5-Star Rated",
    "Licensed & Insured",
    "Background Checked",
    "Satisfaction Guarantee"
  ];

  return (
    <div className="bg-white py-8 border-b border-slate-100 shadow-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 md:gap-16 text-center">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-3 text-slate-600 font-bold text-xs md:text-sm uppercase tracking-wider opacity-90 hover:opacity-100 transition-opacity">
              <ShieldCheck className="w-5 h-5 text-brand-blue" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Reliable & Punctual",
      desc: "Our app-managed scheduling ensures we are on time, every time.",
      bg: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Pet & Family Safe",
      desc: "We use non-toxic, eco-friendly products safe for your loved ones.",
      bg: "bg-gradient-to-br from-rose-400 to-rose-600"
    },
    {
      icon: <UserCheck className="w-8 h-8 text-white" />,
      title: "Vetted Professionals",
      desc: "Every cleaner is background checked and rigorously trained.",
      bg: "bg-gradient-to-br from-indigo-500 to-indigo-700"
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-white" />,
      title: "Senior Discounts",
      desc: "Special rates for seniors and military families. We support our community.",
      bg: "bg-gradient-to-br from-amber-500 to-amber-700"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-bold tracking-wider uppercase text-sm bg-blue-100 px-3 py-1 rounded-full">The Star Standard</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4">Why we are rated #1</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">We don't just clean; we care for your home. Experience the difference of true professionals.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200 border border-white hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className={`${feature.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-sm">{feature.desc}</p>
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

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
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
  const imageSrc = "https://i.imgur.com/XhU71Rx.jpeg";
  const limpa = "https://i.imgur.com/gpqI75L.jpeg"
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">See the Difference</h2>
            <p className="text-slate-600">Drag the slider to clean the room.</p>
         </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 select-none group">
          
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
                className="w-full h-full object-cover pointer-events-none"
              />
              {/* Sparkles on the clean side */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <motion.div 
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-1/4 left-1/4"
                    style={{ left: `${sliderPosition / 2}%` }} // Dynamic sparkle position
                 >
                    <Sparkles className="w-8 h-8 text-yellow-300 fill-yellow-100 drop-shadow-lg" />
                 </motion.div>
                 <motion.div 
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/3 left-1/3"
                    style={{ left: `${Math.min(sliderPosition, 30)}%` }} 
                 >
                    <Sparkles className="w-6 h-6 text-white fill-white drop-shadow-md" />
                 </motion.div>
              </div>
            </div>

            {/* DIRTY IMAGE (Top Layer - Masked) */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
               {/* Applied filters to simulate a dirty/dim room without needing a second image */}
               <img 
                src={imageSrc} 
                alt="Dirty Room" 
                className="w-full h-full object-cover filter sepia-[0.3] brightness-[0.8] contrast-[1.1] grayscale-[0.2] blur-[0.5px]"
              />
              {/* Overlay text for 'Before' */}
              <div className="absolute top-6 right-8 bg-black/50 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                Before
              </div>
            </div>
             
             {/* Overlay text for 'After' on the clean side */}
             <div 
                className="absolute top-6 left-8 bg-brand-blue/90 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 pointer-events-none transition-opacity duration-300"
                style={{ opacity: sliderPosition > 10 ? 1 : 0 }}
             >
                After
              </div>

            {/* SLIDER HANDLE (The Squeegee) */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_2px_rgba(0,0,0,0.3)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-blue transition-transform hover:scale-110 active:scale-95">
                <MoveHorizontal className="w-6 h-6" />
              </div>
              {/* Squeegee Head Visual */}
              <div className="absolute top-0 bottom-0 -left-[2px] w-[5px] bg-gradient-to-r from-blue-300 to-blue-500 opacity-50 blur-[1px]"></div>
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
      icon: <Home className="w-8 h-8 text-brand-blue" />,
      title: "Residential Standard",
      desc: "Weekly/Bi-weekly maintenance."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-brand-blue" />,
      title: "Deep Cleaning",
      desc: "Top-to-bottom detailed scrub."
    },
    {
      icon: <Box className="w-8 h-8 text-brand-blue" />,
      title: "Move-In / Move-Out",
      desc: "Empty home turnaround."
    },
    {
      icon: <Building2 className="w-8 h-8 text-brand-blue" />,
      title: "Commercial",
      desc: "Office & retail spaces."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900">Our Services</h2>
            <p className="text-slate-600 text-lg">Comprehensive cleaning solutions tailored to your lifestyle. No contracts, just great service.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-brand-blue/60 shadow-sm hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 cursor-default relative overflow-hidden"
            >
              {/* Subtle hover background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
              
              <div className="relative z-10">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 ease-out shadow-sm group-hover:shadow-lg">
                  {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-8 h-8 transition-colors duration-300" })}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-brand-blue transition-colors">{service.title}</h3>
                <p className="text-slate-600 text-sm font-medium">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      loc: "Summerville, SC",
      text: "Absolutely the best cleaning service I've used. The team was professional and my house looks like a model home!",
      rating: 5
    },
    {
      name: "Mike Ross",
      loc: "Charleston, SC",
      text: "Super easy to book. They arrived on time and tackled deep stains I thought were permanent. Highly recommend.",
      rating: 5
    },
    {
      name: "Emily Blunt",
      loc: "Mt Pleasant, SC",
      text: "I love coming home after StarCleaning has been there. It smells amazing and feels so fresh. Worth every penny.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -mr-32 -mt-32 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-60 -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full mb-6 shadow-sm">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}
            </div>
            <span className="text-sm font-bold text-slate-700">Google 5-Star Rated</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">What our neighbors say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl relative hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 border border-slate-100"
            >
              <Quote className="w-10 h-10 text-blue-100 absolute top-8 right-8" />
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-8 relative z-10">"{review.text}"</p>
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base">{review.name}</p>
                  <p className="text-brand-blue text-xs font-bold uppercase tracking-wide">{review.loc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900"></div>
      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <Instagram className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-bold tracking-wide">@star.cleaningsc</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
            See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400">Shine</span> on our Instagram.
          </h2>
          
          <p className="text-blue-100 text-xl mb-10 max-w-2xl">
            Join our community of happy homeowners. Check out our latest transformations, cleaning tips, and daily satisfaction.
          </p>
          
          <a 
            href="https://www.instagram.com/star.cleaningsc/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-10 py-5 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-pink-500/30 text-lg"
          >
            Follow Us on Instagram <ArrowRight className="w-6 h-6" />
          </a>

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
    <section className="py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 mb-4">
            <HelpCircle className="w-4 h-4 text-brand-blue" />
            <span className="text-brand-blue font-bold text-xs uppercase tracking-wide">Common Questions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
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
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-slate-50/50 transition-colors"
              >
                <span className={`font-bold text-lg ${openIndex === idx ? 'text-brand-blue' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 p-2 rounded-full transition-all duration-300 ${openIndex === idx ? 'bg-brand-blue text-white rotate-180' : 'bg-slate-100 text-slate-500'}`}>
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
                    <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50/0">
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