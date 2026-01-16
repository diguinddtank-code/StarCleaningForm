import React, { useState, useRef, useEffect } from 'react';
import { motion, Variants, useAnimation, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Clock, Home, Building2, Box, Star, Quote, Heart, UserCheck, HeartHandshake, Instagram, ArrowRight, MoveHorizontal, Plus, Minus, HelpCircle, Trophy, MessageCircle, ThumbsUp, Share2, MoreHorizontal } from 'lucide-react';

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
    { text: "Best of Charleston '24", icon: <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" /> },
    { text: "Google 5-Star Rated", icon: <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" /> },
    { text: "Licensed & Insured", icon: <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-brand-blue" /> },
    { text: "100% Satisfaction", icon: <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" /> }
  ];

  return (
    <div className="bg-white py-6 border-b border-slate-100 shadow-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">Charleston's Most Trusted Team</p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-12 text-center">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-1.5 md:gap-2 bg-slate-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-slate-100 shadow-sm">
              {badge.icon}
              <span className="text-slate-700 font-bold text-[10px] md:text-sm whitespace-nowrap">{badge.text}</span>
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
      icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Reliable & Punctual",
      desc: "App-managed scheduling means we are on time, every time.",
      bg: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      icon: <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Pet & Family Safe",
      desc: "Non-toxic, eco-friendly products safe for your loved ones.",
      bg: "bg-gradient-to-br from-rose-400 to-rose-600"
    },
    {
      icon: <UserCheck className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Vetted Professionals",
      desc: "Every cleaner is background checked and rigorously trained.",
      bg: "bg-gradient-to-br from-indigo-500 to-indigo-700"
    },
    {
      icon: <HeartHandshake className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Senior Discounts",
      desc: "Special rates for seniors and military families.",
      bg: "bg-gradient-to-br from-amber-500 to-amber-700"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-brand-blue font-bold tracking-wider uppercase text-xs md:text-sm bg-blue-100 px-3 py-1 rounded-full">The Star Standard</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4">Why we are rated #1</h2>
          <p className="text-slate-600 mt-3 md:mt-4 max-w-2xl mx-auto text-base md:text-lg">We don't just clean; we care for your home. Experience the difference.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-10"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-slate-200 border border-white hover:border-blue-200 transition-all duration-300 flex flex-row md:flex-col items-center text-left md:text-center gap-4 md:gap-0"
            >
              <div className={`${feature.bg} w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center md:mb-6 shadow-lg flex-shrink-0`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm">{feature.desc}</p>
              </div>
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
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 md:mb-4">See the Difference</h2>
            <p className="text-slate-600">Drag the slider to clean the room.</p>
         </div>

        {/* Mobile Opt: Aspect Ratio 4/5 (Tall) on mobile, 21/9 (Wide) on desktop */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[4/5] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 select-none group touch-none">
          
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
                loading="lazy"
                decoding="async"
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-blue transition-transform hover:scale-110 active:scale-95">
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
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900">Our Services</h2>
            <p className="text-slate-600 text-lg">Comprehensive cleaning solutions tailored to your lifestyle. No contracts, just great service.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-white p-6 md:p-8 rounded-3xl border border-slate-200 hover:border-brand-blue/60 shadow-sm hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 cursor-default relative overflow-hidden flex items-center md:block gap-4"
            >
              {/* Subtle hover background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out hidden md:block"></div>
              
              <div className="relative z-10 flex-shrink-0">
                <div className="bg-blue-50 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center md:mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 ease-out shadow-sm group-hover:shadow-lg">
                  {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-6 h-6 md:w-8 md:h-8 transition-colors duration-300" })}
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

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -mr-32 -mt-32 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-60 -ml-32 -mb-32"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full mb-6 shadow-sm">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}
            </div>
            <span className="text-sm font-bold text-slate-700">Google 5-Star Rated</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Talk of the Town</h2>
          <p className="text-slate-600 mt-4 text-base md:text-lg">Real neighbors recommending us in your local community groups.</p>
        </div>

        {/* Community Group Post Simulation */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden relative max-w-2xl mx-auto">
            {/* Fake Facebook/Nextdoor Header */}
            <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      <Home className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">Charleston Neighbors & Moms</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Public Group • 15.2k Members</p>
                   </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-slate-400" />
            </div>

            <div className="p-0">
                {/* The "Question" Post */}
                <div className="p-6 md:p-8 bg-white">
                    <div className="flex gap-4">
                        <img 
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                            alt="Neighbor" 
                            loading="lazy"
                            decoding="async"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
                        />
                        <div>
                            <p className="font-bold text-slate-900">Jessica Miller</p>
                            <p className="text-xs text-slate-400 mb-2">2h ago • Summerville, SC</p>
                            <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                                🆘 Help needed! My in-laws are coming to visit this weekend and my house is a DISASTER with the kids and work. 
                                <br/><br/>
                                Does anyone have a <strong>cleaning service they actually trust?</strong> I've been burned before. Need someone reliable who does a deep clean! 🙏
                            </p>
                        </div>
                    </div>
                    {/* Reactions Bar */}
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-50 text-slate-400 text-sm font-semibold">
                         <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors"><ThumbsUp className="w-4 h-4" /> Like</div>
                         <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors"><MessageCircle className="w-4 h-4" /> 24 Comments</div>
                         <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors"><Share2 className="w-4 h-4" /> Share</div>
                    </div>
                </div>

                {/* The "Answers" (Testimonials) */}
                <div className="bg-slate-50/50 p-6 md:p-8 space-y-6">
                    
                    {/* Comment 1 */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-3"
                    >
                         <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                            MR
                         </div>
                         <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex-grow">
                             <p className="font-bold text-slate-900 text-sm">Mike Ross</p>
                             <p className="text-slate-600 text-sm mt-1">
                                You HAVE to call <span className="text-brand-blue font-bold">@StarCleaning</span>. They saved my life before Thanksgiving. The deep clean is no joke!
                             </p>
                             <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-slate-400 font-medium">Like</span>
                                <span className="text-xs text-slate-400 font-medium">Reply</span>
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
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                            alt="Reviewer" 
                            loading="lazy"
                            decoding="async"
                            className="w-10 h-10 rounded-full object-cover border border-white shadow-sm flex-shrink-0" 
                         />
                         <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex-grow ring-2 ring-blue-100">
                             <p className="font-bold text-slate-900 text-sm">Sarah Jenkins</p>
                             <p className="text-slate-600 text-sm mt-1">
                                +1 for StarCleaning! 🙌 They are the only ones I trust with my dogs in the house. Super professional and they show up ON TIME.
                             </p>
                             <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-blue-500 font-bold">2 Likes</span>
                                <span className="text-xs text-slate-400 font-medium">Like</span>
                                <span className="text-xs text-slate-400 font-medium">Reply</span>
                                <span className="text-xs text-slate-400">45m</span>
                             </div>
                         </div>
                    </motion.div>
                    
                    {/* Comment 3 */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-3"
                    >
                         <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm flex-shrink-0">
                            EB
                         </div>
                         <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex-grow">
                             <p className="font-bold text-slate-900 text-sm">Emily Blunt</p>
                             <p className="text-slate-600 text-sm mt-1">
                                Just used them for a move-out clean. Got my full deposit back! 💸 Highly recommend.
                             </p>
                             <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-slate-400 font-medium">Like</span>
                                <span className="text-xs text-slate-400 font-medium">Reply</span>
                                <span className="text-xs text-slate-400">12m</span>
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

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900"></div>
      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <Instagram className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-bold tracking-wide">@star.cleaningsc</span>
          </div>
          
          <h2 className="text-3xl md:text-6xl font-extrabold mb-6 md:mb-8 leading-tight">
            See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400">Shine</span> on our Instagram.
          </h2>
          
          <p className="text-blue-100 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl">
            Join our community of happy homeowners. Check out our latest transformations, cleaning tips, and daily satisfaction.
          </p>
          
          <a 
            href="https://www.instagram.com/star.cleaningsc/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-8 py-4 md:px-10 md:py-5 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-pink-500/30 text-base md:text-lg"
          >
            Follow Us on Instagram <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
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
    <section className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 mb-4">
            <HelpCircle className="w-4 h-4 text-brand-blue" />
            <span className="text-brand-blue font-bold text-xs uppercase tracking-wide">Common Questions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-slate-600 mt-4 text-base md:text-lg">Everything you need to know about our premium services.</p>
        </div>

        <div className="space-y-3 md:space-y-4">
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
                className="w-full px-5 py-4 md:px-6 md:py-5 text-left flex justify-between items-center bg-white hover:bg-slate-50/50 transition-colors"
              >
                <span className={`font-bold text-base md:text-lg ${openIndex === idx ? 'text-brand-blue' : 'text-slate-800'}`}>
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
                    <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50/0 text-sm md:text-base">
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