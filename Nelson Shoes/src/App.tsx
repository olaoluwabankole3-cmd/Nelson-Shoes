import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Smartphone, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Code, 
  X, 
  Check, 
  CheckCircle, 
  Edit3,
  CreditCard,
  Users,
  Video
} from 'lucide-react';

function ImageComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const updateWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
  };

  useEffect(() => {
    updateWidth();
    const timer = setTimeout(updateWidth, 100);
    window.addEventListener('resize', updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-neutral-900 border border-neutral-800 overflow-hidden select-none cursor-ew-resize rounded-lg touch-none"
    >
      {/* Right Side / Background (Lossless 4K Asset) */}
      <img 
        src="https://lh3.googleusercontent.com/d/1vUGa2UbuNcQ3H52tAzO3jtNrfx9hNEsl"
        alt="Our Custom Architecture Asset"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-black/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-yellow-500/30 text-yellow-500 text-[9px] sm:text-[10px] font-mono tracking-wider font-bold">
        Our Custom Architecture (Lossless 4K Presentation)
      </div>

      {/* Left Side / Overlay (Standard Compressed) */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none z-10 border-r border-yellow-500"
        style={{ width: `${sliderPosition}%` }}
      >
        <div 
          className="absolute top-0 left-0 h-full"
          style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
        >
          <img 
            src="https://lh3.googleusercontent.com/d/1vUGa2UbuNcQ3H52tAzO3jtNrfx9hNEsl"
            alt="Standard E-Commerce Templates Compressed"
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none filter blur-[0.5px] saturate-[0.8] contrast-[0.95]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-black/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-red-500/30 text-red-500 text-[9px] sm:text-[10px] font-mono tracking-wider font-bold whitespace-nowrap">
            Standard Templates (Standard 1080p Presentation)
          </div>
        </div>
      </div>

      {/* Center Handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-yellow-500 z-30 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-yellow-500 border-2 border-black shadow-lg flex items-center justify-center pointer-events-auto transition-transform ${isDragging ? 'scale-110 bg-white' : 'hover:scale-105'}`}>
          {/* dual-arrow SVG icon */}
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [brandName, setBrandName] = useState('Nelson / Nelson Shoes (@_n_elson)');
  const [clientName, setClientName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [signatureText, setSignatureText] = useState('');
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  // States for 3 package tiers
  const [selectedTier, setSelectedTier] = useState<'base' | 'standard' | 'elite'>('standard');
  const [activeDetailTier, setActiveDetailTier] = useState<'base' | 'standard' | 'elite' | null>(null);

  const tiers = {
    base: {
      id: 'base',
      name: 'The Core Atelier Showroom',
      price: 600000,
      days: 14,
      description: 'Custom portfolio flagship layout, cinematic display for named masterpieces, and your high-end consultation routing form.'
    },
    standard: {
      id: 'standard',
      name: 'The Masterpiece Collection System',
      price: 800000,
      days: 28,
      description: 'Full-screen interactive galleries, dedicated application channels for the Nelson Mentorship platform, and advanced local/international SEO optimization.'
    },
    elite: {
      id: 'elite',
      name: 'The One-of-One Sovereign Suite',
      price: 1500000,
      days: 42,
      description: 'Full-scale viral load scaling architecture, custom fluid motion transition graphics, dedicated 4K video infrastructure for patina processes, and continuous server maintenance support.'
    }
  };

  const tierDetails = {
    base: {
      name: 'The Core Atelier Showroom',
      tagline: 'HIGH-ART COMPACT ARCHITECTURE',
      deliverablesCount: '4 CORE PILLARS',
      investment: '₦600,000',
      days: 14,
      deliverables: [
        { title: '4K Asset Hosting Setup', desc: 'Pre-rendered high-speed image asset infrastructure tailored for maximum visual crispness.' },
        { title: 'High-Fidelity Responsive Layout Design', desc: 'Pixel-perfect, customized display matching the exact tactile feel of your hand-made leatherwork.' },
        { title: 'Direct Social & WhatsApp Contact Syncing', desc: 'Secure direct-connect onboarding routing to streamline private consultation bookings instantly.' },
        { title: '12 Months Secure Asset Backup Caching', desc: 'Continuous automated state and image storage protection so your digital assets are never lost.' }
      ]
    },
    standard: {
      name: 'The Masterpiece Collection System',
      tagline: 'IMMERSIVE DIGITAL EXHIBITION',
      deliverablesCount: '8 ELITE DELIVERABLES',
      investment: '₦800,000',
      days: 28,
      deliverables: [
        { title: '4K Asset Hosting Setup', desc: 'Pre-rendered high-speed image asset infrastructure tailored for maximum visual crispness.' },
        { title: 'High-Fidelity Responsive Layout Design', desc: 'Pixel-perfect, customized display matching the exact tactile feel of your hand-made leatherwork.' },
        { title: 'Direct Social & WhatsApp Contact Syncing', desc: 'Secure direct-connect onboarding routing to streamline private consultation bookings instantly.' },
        { title: '12 Months Secure Asset Backup Caching', desc: 'Continuous automated state and image storage protection so your digital assets are never lost.' },
        { title: 'Full Interactive Multi-Dimensional Gallery Grids', desc: 'Stunning visual grids designed to present shoes as physical canvas art pieces, allowing deep-zoom inspection.' },
        { title: 'Custom Application Intake Forms for the Nelson Mentorship Program', desc: 'Custom secure portals built to screen, manage, and process applications from upcoming footwear artisans.' },
        { title: 'Dynamic Collection Classification Sorting', desc: 'Smooth, fluid client-side sorting of custom footwear classes, releases, and archived masterpieces.' },
        { title: 'Search Engine Architecture Optimization (SEO)', desc: 'Custom structured schema markup and search visibility engineering targeting high-net-worth collector keywords.' }
      ]
    },
    elite: {
      name: 'The One-of-One Sovereign Suite',
      tagline: 'THE ULTIMATE DIGITAL EMPIRE',
      deliverablesCount: '14 ENTERPRISE DELIVERABLES',
      investment: '₦1,500,000',
      days: 42,
      deliverables: [
        { title: '4K Asset Hosting Setup', desc: 'Pre-rendered high-speed image asset infrastructure tailored for maximum visual crispness.' },
        { title: 'High-Fidelity Responsive Layout Design', desc: 'Pixel-perfect, customized display matching the exact tactile feel of your hand-made leatherwork.' },
        { title: 'Direct Social & WhatsApp Contact Syncing', desc: 'Secure direct-connect onboarding routing to streamline private consultation bookings instantly.' },
        { title: '12 Months Secure Asset Backup Caching', desc: 'Continuous automated state and image storage protection so your digital assets are never lost.' },
        { title: 'Full Interactive Multi-Dimensional Gallery Grids', desc: 'Stunning visual grids designed to present shoes as physical canvas art pieces, allowing deep-zoom inspection.' },
        { title: 'Custom Application Intake Forms for the Nelson Mentorship Program', desc: 'Custom secure portals built to screen, manage, and process applications from upcoming footwear artisans.' },
        { title: 'Dynamic Collection Classification Sorting', desc: 'Smooth, fluid client-side sorting of custom footwear classes, releases, and archived masterpieces.' },
        { title: 'Search Engine Architecture Optimization (SEO)', desc: 'Custom structured schema markup and search visibility engineering targeting high-net-worth collector keywords.' },
        { title: 'Immersive High-Art 3D Animation Web Storefront Architecture', desc: 'Staggering high-art 3D canvas interaction layer displaying leather curves and shadows with absolute cinematic prestige.' },
        { title: '3 Months of Complimentary Infrastructure & System Maintenance Support', desc: 'Complementary dedicated engineering coverage to monitor release drops, optimize assets, and guarantee platform uptime.' },
        { title: 'Dynamic Viral-Spike Bandwidth Protection', desc: 'Serverless scaling protocols engineered to withstand massive millions-user traffic spikes from viral TikTok/social campaigns.' },
        { title: 'Sub-Second Edge-Rendered Content Caching', desc: 'Lossless global edge distribution nodes serving assets in under 100ms anywhere across the globe.' },
        { title: 'Premium Cinematic Motion Fluid Micro-interactions', desc: 'Ultra-custom, high-performance fluid transition effects capturing absolute sensory exclusivity.' },
        { title: 'Custom Dedicated 4K Media Streaming Server Infrastructure', desc: 'Exclusive high-refresh video streaming pipes capturing the exact 200-step shoe creation journey in pristine 4K.' }
      ]
    }
  };

  // State for Website Architecture Map
  const [selectedArchPage, setSelectedArchPage] = useState('homepage');

  const archPages = [
    {
      id: 'homepage',
      title: 'The Digital Atelier Landing',
      tagline: '200-STEP CRAFTSMANSHIP',
      summary: 'High-impact cinematic interface displaying your legendary 200-step hand-execution process, custom wood-last carving, and viral masterpieces.'
    },
    {
      id: 'atelier',
      title: 'Named Identities Showcase',
      tagline: 'ONE-OF-ONE FINE ART',
      summary: 'An immersive, ultra-clean editorial layout displaying your one-of-one collector\'s items as standalone works of fine art.'
    },
    {
      id: 'collection',
      title: 'The Mentorship Vault',
      tagline: 'NELSON ARTISAN NETWORK',
      summary: 'A premium, structured portal where upcoming artisans can seamlessly review, apply, and register for the Nelson Mentorship platform.'
    },
    {
      id: 'checkout',
      title: 'Private Intake Gateway',
      tagline: 'QUALIFIED CONSULTATION',
      summary: 'A secure, beautiful multi-step qualification form that gathers a client\'s structural requirements and budget before transferring them directly to your WhatsApp booking line (+234 904 955 3906).'
    }
  ];

  // States for live automated payment & tracker simulator for shoe drops
  const [simulatedMembers, setSimulatedMembers] = useState([
    { id: 1, name: 'Marcus Sterling', plan: 'The Masterpiece Collection System', amount: '₦800,000', status: 'RESERVED', time: '2 mins ago' },
    { id: 2, name: 'Helena Vance', plan: 'The One-of-One Sovereign Suite', amount: '₦1,500,000', status: 'RESERVED', time: '1 hour ago' },
    { id: 3, name: 'Julian Drake', plan: 'The Core Atelier Showroom', amount: '₦600,000', status: 'RESERVED', time: '3 hours ago' },
  ]);
  const [totalSimulatedCapital, setTotalSimulatedCapital] = useState(2900000);

  const addSimulatedSignUp = () => {
    const names = ['Jordan Black', 'Evelyn Wood', 'Tariq Al-Mansoor', 'Chioma Nwachukwu', 'Damilola Adebayo', 'Yusuf Bello'];
    const plans = ['The Core Atelier Showroom', 'The Masterpiece Collection System', 'The One-of-One Sovereign Suite'];
    const prices = [600000, 800000, 1500000];
    
    const randomIdx = Math.floor(Math.random() * names.length);
    const randomPlanIdx = Math.floor(Math.random() * plans.length);
    
    const name = names[randomIdx];
    const plan = plans[randomPlanIdx];
    const rawPrice = prices[randomPlanIdx];
    
    const formattedPrice = `₦${rawPrice.toLocaleString()}`;
    const newMember = {
      id: Date.now(),
      name,
      plan,
      amount: formattedPrice,
      status: 'RESERVED',
      time: 'Just now'
    };
    
    setSimulatedMembers(prev => [newMember, ...prev.slice(0, 3)]);
    setTotalSimulatedCapital(prev => prev + rawPrice);
  };

  // Dynamic interactive options mapping preserving exact structural IDs
  const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: boolean }>({
    'client-proofing-gallery': false,
    'video-portfolio-integration': false,
    'image-optimization-cdn': false,
    'monthly-retainers': false,
  });

  const addonsList = [
    { 
      id: 'client-proofing-gallery', 
      title: 'PRIVATE SECURE RESERVE ENGINE', 
      price: 75000, 
      days: 4, 
      description: 'An automated registration and queueing engine for highly-anticipated one-of-one footwear drops, preventing checkout bots and securing collector deposits.' 
    },
    { 
      id: 'video-portfolio-integration', 
      title: '4K CINEMATIC PATINA STREAMING', 
      price: 75000, 
      days: 3, 
      description: 'High-refresh, beautiful video showcase elements capturing the meticulous 200-step leather patina process natively with zero delay.' 
    },
    { 
      id: 'image-optimization-cdn', 
      title: 'EDGE-RENDERED LOSSLESS RETINA CDN', 
      price: 75000, 
      days: 3, 
      description: 'Serverless CDN routing with advanced lossless image compression (AVIF) so collectors can inspect every premium leather stitch and grain instantly.' 
    },
    { 
      id: 'monthly-retainers', 
      title: 'CONTINUOUS ATELIER STAGING & OPS', 
      price: 75000, 
      days: 2, 
      description: 'Ongoing drop mechanics audits, monthly scaling testing for spike TikTok traffic, and instant high-priority gateway maintenance support.' 
    },
  ];

  const handleToggleAddon = (id: string) => {
    setSelectedAddons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addonsTotalNaira = Object.keys(selectedAddons).reduce((acc, curr) => {
    if (selectedAddons[curr]) {
      const addon = addonsList.find(a => a.id === curr);
      return acc + (addon ? addon.price : 0);
    }
    return acc;
  }, 0);

  const currentPriceText = addonsTotalNaira > 0 
    ? `₦${(tiers[selectedTier].price + addonsTotalNaira).toLocaleString()}`
    : `₦${tiers[selectedTier].price.toLocaleString()}`;

  const currentTimeline = tiers[selectedTier].days + Object.keys(selectedAddons).reduce((acc, curr) => {
    if (selectedAddons[curr]) {
      const addon = addonsList.find(a => a.id === curr);
      return acc + (addon ? addon.days : 0);
    }
    return acc;
  }, 0);

  // Initialize GSAP & ScrollTrigger directly
  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Hero animations
      gsap.fromTo('.hero-badge-loader',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out', delay: 0.1 }
      );

      gsap.fromTo('.hero-anim-title',
        { y: 50, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.8, ease: 'power4.out', stagger: 0.12, delay: 0.2 }
      );

      gsap.fromTo('.hero-anim-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo('.hero-anim-cta',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', delay: 0.8 }
      );

      // Objective Slider
      gsap.fromTo('.problem-side',
        { x: -100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: '.objective-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.solution-side',
        { x: 100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: '.objective-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Specs cards pop in
      gsap.fromTo('.feature-anim-card',
        { scale: 0.88, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Bottom Line box scale
      gsap.fromTo('.cta-box-anim',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-trigger-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  // Standalone HTML generator injecting current live stats
  const generateStandaloneHTML = () => {
    const activeAddonsListHTML = Object.keys(selectedAddons)
      .filter(key => selectedAddons[key])
      .map(key => {
        const item = addonsList.find(a => a.id === key);
        return `
        <!-- Dynamic Addon Item -->
        <div class="p-4 bg-neutral-900 border-2 border-neutral-800 flex items-start gap-3">
            <span class="text-yellow-500 font-bold">⚡</span>
            <div>
                <h5 class="text-xs font-black tracking-wide text-white uppercase">${item?.title}</h5>
                <p class="text-[11px] text-neutral-400 mt-0.5">${item?.description}</p>
            </div>
        </div>`;
      }).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BESPOKE DIGITAL ATELIER & PRIVATE BRAND ARCHITECTURE // ${brandName}</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts Oswald & Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght=400;500;600;700&family=Oswald:wght=500;600;700&display=swap" rel="stylesheet">
    <!-- GSAP & ScrollTrigger CDNs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0B0B0C;
        }
        .font-oswald {
            font-family: 'Oswald', sans-serif;
        }
        /* Brutalist industrial stylings */
        .brutalist-border {
            border: 4px solid #ffffff;
        }
        .brutalist-border-amber {
            border: 4px solid #EAB308;
        }
        .brutalist-shadow-amber {
            box-shadow: 8px 8px 0px 0px #EAB308;
        }
        .brutalist-shadow-white {
            box-shadow: 8px 8px 0px 0px #ffffff;
        }
        @keyframes rawPulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 8px 8px 0px 0px #EAB308;
            }
            50% {
                transform: scale(1.02);
                box-shadow: 12px 12px 0px 0px #FACC15;
            }
        }
        .brutalist-pulse {
            animation: rawPulse 2.5s infinite ease-in-out;
        }
    </style>
</head>
<body class="text-neutral-100 min-h-screen selection:bg-yellow-500 selection:text-black overflow-x-hidden">

    <!-- Top Heavy Industrial Hazard Banner stripes -->
    <div class="h-4 bg-gradient-to-r from-yellow-500 via-neutral-900 to-yellow-500 bg-[size:40px_40px] opacity-90"></div>

    <!-- Main Digital Canvas Container -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">

        <!-- Top Urgent Header Badge Row -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 border-b-4 border-white pb-8">
            <div>
                <span class="inline-block bg-yellow-500 text-black text-xs font-black tracking-[0.2em] px-3 py-1.5 uppercase font-oswald brutalist-border border-black">
                    [BESPOKE DIGITAL ATELIER & PRIVATE BRAND ARCHITECTURE]
                </span>
                <h3 class="text-neutral-400 font-oswald tracking-wider uppercase text-sm mt-3">
                    PREPARED FOR: <span class="text-white font-extrabold text-lg tracking-wide">${brandName}</span>
                </h3>
            </div>
            <div class="text-left md:text-right font-mono text-xs text-neutral-400 space-y-1">
                <p>PLAN NUMBER: <span class="text-yellow-500 font-bold">#STAKR-FOOTWEAR-2026</span></p>
                <p>STATUS: READY FOR PRODUCTION</p>
            </div>
        </div>

        <!-- HERO SECTION -->
        <header id="hero" class="relative overflow-hidden mb-20 sm:mb-28 bg-[#111113] brutalist-border brutalist-shadow-white p-8 sm:p-20">
            <div class="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            
            <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
                <div class="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-yellow-500 uppercase bg-yellow-500/10 px-4 py-1.5 border border-yellow-500/30 mb-8">
                    <span>⚡ ONE-OF-ONE BESPOKE DIGITAL FLAGSHIP GALLERY</span>
                </div>
                
                <h1 class="font-oswald text-4xl sm:text-7xl font-black tracking-tight text-white uppercase leading-none max-w-3xl">
                    BESPOKE DIGITAL ATELIER & <br class="hidden sm:inline"/>
                    <span class="text-yellow-500 underline decoration-4 underline-offset-4">PRIVATE BRAND</span> ARCHITECTURE
                </h1>
                
                <p class="text-neutral-400 text-sm sm:text-base mt-6 max-w-xl leading-relaxed">
                    Mass production lives on public social feeds, but true high-art craftsmanship requires an uncompromising digital flagship. Because Nelson Shoes operates on an exclusive, digital-only model with a private Victoria Island studio closed to the public, your website isn’t just a portfolio—it is your entire luxury showroom. To match a brand that commands ₦100,000,000 for a singular masterpiece, your digital architecture must give high-net-worth collectors the exact feeling of walking into an elite, private gallery. This is the construction of your digital estate.
                </p>
            </div>
        </header>

        <!-- THE PROBLEM & SOLUTION: TWO COLUMN SPLIT -->
        <section id="objective" class="objective-section mb-20 sm:mb-28">
            <h2 class="font-oswald text-4xl sm:text-5xl font-black tracking-tight uppercase text-white mb-8">
                01. <span class="text-yellow-500">THE PROBLEM AND THE SOLUTION</span>
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Left: The Problem -->
                <div class="problem-side bg-[#111113] brutalist-border p-6 sm:p-8 space-y-4">
                    <span class="text-xs font-mono text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2 py-1 uppercase inline-block">
                        THE BIG CHALLENGE
                    </span>
                    <h3 class="font-oswald text-2xl font-black text-white uppercase leading-tight">
                        PRESERVING ARTISAN SANCTITY ONLINE
                    </h3>
                    <p class="text-neutral-400 text-sm leading-relaxed">
                        With your physical Victoria Island studio closed to the general public, your digital footprint is the absolute gateway to your brand. However, mainstream e-commerce platforms and social networks compress high-fidelity product captures, blurring meticulous hand-stitching and custom-painted patina leatherwork. This commoditizes ₦100,000,000 masterpieces into simple screen-lit widgets.
                    </p>
                    <p class="text-neutral-400 text-sm leading-relaxed">
                        If high-net-worth global collectors cannot experience lossless 4K material depth or are forced to navigate cheap Shopify-style storefronts, the perceived prestige evaporates. Standard templates fail to validate your custom wood-last process, leading to lost leverage and friction in booking private consultations.
                    </p>
                </div>

                <!-- Right: The Solution -->
                <div class="solution-side bg-neutral-900 brutalist-border-amber brutalist-shadow-amber p-6 sm:p-8 space-y-4">
                    <span class="text-xs font-mono text-yellow-500 font-bold bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 uppercase inline-block font-mono">
                        OUR SPECIALIZED RESPONSE
                    </span>
                    <h3 class="font-oswald text-2xl font-black text-white uppercase leading-tight">
                        A ONE-OF-ONE DIGITAL ATELIER ENGINE
                    </h3>
                    <p class="text-neutral-200 text-sm leading-relaxed">
                        We will build a high-performance, edge-rendered digital estate optimized for absolute retinal texture clarity, bespoke collector onboarding, and elite private intake flow. Features include uncompressed media loading, seamless integration with your private Victoria Island studio consultation booking system, and clean, elegant editorial layouts that present your shoes as named masterpieces of fine art, rather than simple catalog inventory.
                    </p>
                </div>
            </div>
        </section>

        <!-- THE SPECS: 4 BOLD GRID BLOCKS -->
        <section id="specs" class="mb-20 sm:mb-28">
            <div class="mb-10 text-left">
                <span class="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">02. PERFORMANCE FEATURES</span>
                <h3 class="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">WHAT WE WILL BUILD FOR YOU</h3>
            </div>

            <div class="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Block 1 -->
                <div class="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group">
                    <div class="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                        01
                    </div>
                    <h4 class="font-oswald text-xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors">Retinal Texture Fidelity</h4>
                    <p class="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        Blazing-fast, uncompressed image loading ensuring every hand-painted patina, wood-last curve, and custom hardware stitch shows with zero quality loss.
                    </p>
                </div>

                <!-- Block 2 -->
                <div class="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group">
                    <div class="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                        02
                    </div>
                    <h4 class="font-oswald text-xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors">High-Traffic Load Immunity</h4>
                    <p class="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        Custom edge-computing infrastructure optimized to handle massive, multi-million user viral spikes seamlessly whenever you drop a public challenge on TikTok.
                    </p>
                </div>

                <!-- Block 3 -->
                <div class="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group">
                    <div class="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                        03
                    </div>
                    <h4 class="font-oswald text-xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors">Bespoke Collector Showcasing</h4>
                    <p class="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        Sections built to display your shoes not as inventory items, but as named, distinct canvas art pieces (like 'The Emerald', 'The Mosaic Loafers', or 'The Primodal Oxford').
                    </p>
                </div>

                <!-- Block 4 -->
                <div class="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group">
                    <div class="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                        04
                    </div>
                    <h4 class="font-oswald text-xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors">Qualified Pre-Screening</h4>
                    <p class="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        A sleek, luxury digital intake funnel designed to filter out casual social media commenters and route only serious, high-value collectors to your private WhatsApp consultation line.
                    </p>
                </div>
            </div>
        </section>

        <!-- HIGH-PERFORMANCE DROP SYSTEMS vs. CLUNKY TEMPLATES -->
        <section id="zero-hassle-payments" class="mb-20 sm:mb-28">
            <div class="mb-10 text-left">
                <span class="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">03. HIGH-PERFORMANCE SYSTEMS</span>
                <h3 class="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">EDGE-RENDERED DIGITAL ESTATE VS. STANDARD COOKIE-CUTTER TEMPLATES</h3>
                <p class="text-neutral-400 text-sm mt-3 leading-relaxed max-w-2xl">
                    Ditch standard platforms that compress high-fidelity captures, washing away color saturation and material depth. Our custom edge-rendering guarantees lossless 4K leather and texture depth, and luxury-level direct booking channels.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <!-- Comparison Item 1 -->
                <div class="bg-[#1a1113] border border-red-950 p-6 space-y-3 relative overflow-hidden">
                    <span class="text-[10px] font-mono text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 uppercase inline-block font-mono">
                        Standard platforms compress high-fidelity captures, reducing color saturation and depth.
                    </span>
                    <h4 class="font-oswald text-xl font-bold text-white uppercase">Legacy templates that degrade your luxury positioning with compressed media and slow rendering frames.</h4>
                    <ul class="text-neutral-400 text-xs sm:text-sm space-y-2 list-disc pl-4 leading-relaxed">
                        <li>Uncompressed files degrade page speed, forcing you to compromise on showcasing 200-step patina craftsmanship.</li>
                        <li>Social media compressions blur meticulous stitching and hand-painted gradients, diminishing the perceived value.</li>
                        <li>Standard layouts treat your luxury masterpieces like mass-produced commodities, diluting your premium heritage.</li>
                    </ul>
                </div>

                <!-- Comparison Item 2 -->
                <div class="bg-[#111c16] border border-emerald-950 p-6 space-y-3 relative overflow-hidden">
                    <span class="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 uppercase inline-block font-mono">
                        Our custom edge-rendered system retains the true brilliance of your leather artistry.
                    </span>
                    <h4 class="font-oswald text-xl font-bold text-white uppercase">Our custom architecture designed exclusively to connect high-net-worth global collectors with your heritage.</h4>
                    <ul class="text-neutral-200 text-xs sm:text-sm space-y-2 list-disc pl-4 leading-relaxed">
                        <li><strong>One-of-One Presentation:</strong> Showcases Named Identities as individual fine art canvases with zero retinal loss.</li>
                        <li><strong>Lossless Retinal Clarity:</strong> Infinite resolution display preserving every hand-painted leather patina and wood-last contour.</li>
                        <li><strong>Uncompromising Speed:</strong> High-art loading and booking flows optimized for high-net-worth global collectors.</li>
                    </ul>
                </div>
            </div>
            
            <div class="mt-6 bg-[#111113] brutalist-border p-4 text-center">
                <p class="text-xs font-mono text-yellow-500 uppercase tracking-widest">[ ENGINE VERIFIED: SECURE BESPOKE FLAGSHIP SETUP ]</p>
            </div>
        </section>

        <!-- THE BOTTOM LINE (CTA): MASSIVE HIGH-CONTRAST BOX -->
        <section id="bottom-line" class="cta-trigger-section">
            <div class="cta-box-anim bg-gradient-to-br from-yellow-500 to-amber-600 brutalist-border brutalist-shadow-white p-6 sm:p-14 text-black relative">
                
                <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="space-y-4 max-w-xl text-left">
                        <span class="inline-block bg-black text-yellow-500 text-xs font-black tracking-widest px-3 py-1 uppercase font-mono brutalist-border border-black">
                            TIMELINE AND BUDGET SUMMARY
                        </span>
                        <h3 class="font-oswald text-3xl sm:text-5xl font-black uppercase text-neutral-900 leading-none">
                            LOCK IN YOUR DIGITAL ATELIER SCHEDULING
                        </h3>
                        <p class="text-neutral-900 text-sm font-semibold leading-relaxed">
                            We will start building your digital flagship gallery as soon as you sign below. Locking this in reserves our elite master-build slot to bring your leather artistry online quickly.
                        </p>
                        
                        <div class="space-y-2 text-xs font-mono text-black font-bold pt-2">
                            <p>✔ Premium digital flagship tailored specifically for ${brandName}</p>
                            <p>✔ Everything hosted on high-performance infrastructure with zero errors</p>
                            ${activeAddonsListHTML}
                        </div>
                    </div>

                    <!-- Lock block -->
                    <div class="bg-neutral-950 p-6 sm:p-8 brutalist-border border-black text-center text-white w-full md:max-w-xs space-y-6">
                        <div class="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-800">
                            <div>
                                <p class="text-[9px] text-neutral-500 font-mono tracking-widest uppercase font-black">DAYS TO BUILD</p>
                                <p class="text-lg font-black text-white mt-1 font-oswald text-white">${currentTimeline} DAYS</p>
                            </div>
                            <div>
                                <p class="text-[9px] text-neutral-500 font-mono tracking-widest uppercase font-black">TOTAL PRICE</p>
                                <p class="text-lg font-black text-yellow-500 mt-1 font-oswald text-yellow-500">${currentPriceText}</p>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <button onclick="alert('Digital flagship proposal signed successfully! We are ready to build it now!')" class="w-full bg-yellow-500 font-black text-black text-sm uppercase py-4.5 px-6 brutalist-border border-black shadow hover:bg-white hover:text-black hover:scale-[1.02] transform transition-all brutalist-pulse">
                                ORDER NOW 🚀
                            </button>
                            <p class="text-[9px] text-neutral-500 font-mono">This price is saved for 14 days</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Signature Statement footer -->
        <footer class="mt-16 text-center text-xs text-neutral-500 font-mono border-t border-neutral-800 pt-8">
            <p>NELSON SHOES BESPOKE DIGITAL ATELIER PROPOSAL 2026</p>
        </footer>

    </div>

    <!-- GSAP Initializations script block -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            gsap.registerPlugin(ScrollTrigger);

            // Stagger hero headers
            gsap.fromTo("#hero h1, #hero p", 
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power4.out" }
            );

            // Problem and solution slide
            gsap.fromTo(".problem-side", 
                { x: -80, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    scrollTrigger: {
                        trigger: ".objective-section",
                        start: "top 80%"
                    }
                }
            );

            gsap.fromTo(".solution-side", 
                { x: 80, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    scrollTrigger: {
                        trigger: ".objective-section",
                        start: "top 80%"
                    }
                }
            );

            // Features cards pop up
            gsap.fromTo(".feature-anim-card", 
                { scale: 0.9, opacity: 0, y: 30 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: ".features-grid",
                        start: "top 85%"
                    }
                }
            );
        });
    </script>

</body>
</html>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateStandaloneHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitSignature = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !signatureText) return;
    try {
      // Preserve exact signature fetch structure requested
      await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, contactEmail, signatureText, currentPriceText })
      });
    } catch (err) {
      console.warn('Backend endpoint /submit not available in local environment, proceeding client-side.', err);
    }
    setIsSignModalOpen(false);
    setIsAccepted(true);
  };

  const totalSelectedAddonsCount = Object.keys(selectedAddons).filter(k => selectedAddons[k]).length;

  return (
    <div className="bg-[#0B0B0C] text-neutral-100 min-h-screen font-sans selection:bg-yellow-500 selection:text-black pb-24 relative overflow-x-hidden">
      
      {/* Top Heavy Industrial Stripe Banner */}
      <div className="h-4 bg-gradient-to-r from-yellow-500 via-neutral-900 to-yellow-500 bg-[size:40px_40px] opacity-90"></div>

      {/* Main Canvas Space */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">

        {/* Celebratory Signature Acceptance Board */}
        {isAccepted && (
          <div className="bg-[#141d1a] brutalist-border-amber border-yellow-500 p-6 sm:p-10 mb-12 relative flex flex-col md:flex-row items-center gap-8 shadow-2xl animate-glow">
            <div className="h-16 w-16 bg-yellow-500 text-black brutalist-border border-black flex items-center justify-center shrink-0 animate-bounce">
              <Check className="h-9 w-9 stroke-[3]" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h3 className="font-oswald text-3xl font-black text-white uppercase tracking-wide">PROPOSAL APPROVED! 🎉</h3>
              <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
                Superb! We are ready to construct your bespoke luxury e-commerce flagship. Production slot booked.
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono">
                <span className="bg-black border border-neutral-800 px-3 py-1.5">APPROVED BY: {clientName}</span>
                <span className="bg-black border border-neutral-800 px-3 py-1.5">EMAIL: {contactEmail}</span>
                <span className="bg-black border border-neutral-800 px-3 py-1.5 text-yellow-500">INVESTMENT: {currentPriceText}</span>
              </div>
            </div>
          </div>
        )}

        {/* Header Ribbon Section */}
        <div className="hero-badge-loader flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 border-b-4 border-white pb-6">
          <div className="space-y-2">
            <span className="inline-block bg-yellow-500 text-black text-xs font-black tracking-[0.2em] px-3 py-1 uppercase font-oswald brutalist-border border-black">
              BESPOKE DIGITAL ATELIER & PRIVATE BRAND ARCHITECTURE
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1 font-mono text-[11px] text-neutral-400 mt-2">
              <p>PREPARED FOR: <span className="text-white font-bold uppercase">{brandName}</span></p>
              <p>PREPARED BY: <span className="text-white font-bold">STAKR DIGITAL</span></p>
              <p>DATE: <span className="text-yellow-500 font-bold">June 25, 2026</span></p>
            </div>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 flex flex-col md:items-end gap-2 shrink-0">
            <p>PLAN NUMBER: <span className="text-yellow-500 font-semibold font-mono">#STAKR-FOOTWEAR-2026</span></p>
            <p className="text-neutral-500 flex items-center justify-start md:justify-end gap-1.5 font-bold">Presented: June 25, 2026</p>
            <button 
              onClick={handleCopyCode}
              className="mt-1 bg-yellow-500 hover:bg-white text-black font-black font-mono uppercase tracking-wider text-[10px] px-3 py-1.5 border border-black transform active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 animate-pulse hover:animate-none"
            >
              <Code className="h-3.5 w-3.5" />
              {copied ? 'COPIED TO CLIPBOARD! ✓' : 'GET STANDALONE CODE 🚀'}
            </button>
          </div>
        </div>

        {/* 1. HERO SECTION */}
        <header id="hero" className="relative overflow-hidden mb-20 sm:mb-28 bg-[#111113] brutalist-border brutalist-shadow-white p-8 sm:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl text-left space-y-8 py-4 sm:py-8">
            <div className="hero-anim-sub inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-yellow-500 uppercase bg-yellow-500/10 px-4 py-1.5 border border-yellow-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ONE-OF-ONE BESPOKE DIGITAL ATELIER</span>
            </div>
            
            <h1 className="hero-anim-title font-oswald text-4xl sm:text-7xl font-black tracking-tight text-white uppercase leading-none">
              BESPOKE DIGITAL ATELIER & <br />
              <span className="text-yellow-500 underline decoration-4 underline-offset-4">PRIVATE BRAND</span> ARCHITECTURE
            </h1>
            
            <p className="hero-anim-sub text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              Mass production lives on public social feeds, but true high-art craftsmanship requires an uncompromising digital flagship. Because Nelson Shoes operates on an exclusive, digital-only model with a private Victoria Island studio closed to the public, your website isn’t just a portfolio—it is your entire luxury showroom. To match a brand that commands ₦100,000,000 for a singular masterpiece, your digital architecture must give high-net-worth collectors the exact feeling of walking into an elite, private gallery. This is the construction of your digital estate.
            </p>

            <div className="hero-anim-cta pt-4">
              <button 
                onClick={() => {
                  const element = document.getElementById('cta-box-point');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="bg-yellow-500 hover:bg-white text-black font-black font-oswald uppercase tracking-wider text-xs px-6 py-3 border-2 border-black transform active:scale-95 transition-all shadow-[4px_4px_0px_0px_#fff] cursor-pointer"
              >
                Sign Below & Begin ⚡
              </button>
            </div>
          </div>
        </header>

        {/* 2. THE OBJECTIVE SECTION */}
        <section id="objective" className="objective-section mb-20 sm:mb-28">
          <h2 className="font-oswald text-4xl sm:text-5xl font-black tracking-tight uppercase text-white mb-8 border-b-2 border-neutral-850 pb-4">
            01. <span className="text-yellow-500">THE PROBLEM AND THE SOLUTION</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Problem */}
            <div className="problem-side bg-[#111113] brutalist-border p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2 py-1 uppercase inline-block">
                THE BIG CHALLENGE
              </span>
              <h3 className="font-oswald text-2xl font-black text-white uppercase leading-tight">
                PRESERVING ARTISAN SANCTITY ONLINE
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                With your physical Victoria Island studio closed to the general public, your digital footprint is the absolute gateway to your brand. However, mainstream e-commerce platforms and social networks compress high-fidelity product captures, blurring meticulous hand-stitching and custom-painted patina leatherwork. This commoditizes ₦100,000,000 masterpieces into simple screen-lit widgets.
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                If high-net-worth global collectors cannot experience lossless 4K material depth or are forced to navigate cheap Shopify-style storefronts, the perceived prestige evaporates. Standard templates fail to validate your custom wood-last process, leading to lost leverage and friction in booking private consultations.
              </p>
            </div>

            {/* Right Column: Solution */}
            <div className="solution-side bg-neutral-900 brutalist-border-amber brutalist-shadow-amber p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono text-yellow-500 font-bold bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 uppercase inline-block font-mono">
                OUR SPECIALIZED RESPONSE
              </span>
              <h3 className="font-oswald text-2xl font-black text-white uppercase leading-tight">
                A ONE-OF-ONE DIGITAL ATELIER ENGINE
              </h3>
              <p className="text-neutral-200 text-sm leading-relaxed">
                We will build a high-performance, edge-rendered digital estate optimized for absolute retinal texture clarity, bespoke collector onboarding, and elite private intake flow. Features include uncompressed media loading, seamless integration with your private Victoria Island studio consultation booking system, and clean, elegant editorial layouts that present your shoes as named masterpieces of fine art, rather than simple catalog inventory.
              </p>
              <p className="text-neutral-300 text-xs font-mono border-t border-neutral-800 pt-3 flex items-center gap-2">
                <Flame className="h-4 w-4 text-yellow-500 animate-pulse" />
                No compromise on material integrity. Built for digital supremacy and maximum conversion.
              </p>
            </div>
          </div>

          {/* Interactive Image Comparison Slider Container */}
          <div className="mt-12 bg-[#111113] brutalist-border p-6 sm:p-10 space-y-6">
            <div className="space-y-3 max-w-3xl">
              <span className="text-[10px] font-mono text-yellow-500 font-bold bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 uppercase tracking-widest inline-block font-mono">
                RETINAL DETAIL OPTIMIZATION
              </span>
              <h3 className="font-oswald text-2xl sm:text-3xl font-black uppercase text-white">
                Our Edge-Optimized Architecture (Lossless 4K Leather & Texture Depth)
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Standard platforms compress high-fidelity captures, washing away color saturation and material depth. Move the slider to see how our custom edge-rendered system retains the true brilliance of your leather artistry.
              </p>
            </div>

            <div className="pt-2">
              <ImageComparisonSlider />
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 border-t border-neutral-900 pt-4">
              <span>[ INTERACTION: SWIPE OR DRAG SLIDER ]</span>
              <span className="text-yellow-500 font-bold">[ RENDER ENGINE: SUB-SECOND RETINA ]</span>
            </div>
          </div>
        </section>

        {/* 3. THE SPECS: 4 BOLD GRID BLOCKS */}
        <section id="specs" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">02. PERFORMANCE FEATURES</span>
            <h3 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">WHAT WE WILL BUILD FOR YOU</h3>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Spec 1 */}
            <div className="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group duration-300 relative">
              <div className="h-12 w-12 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                01
              </div>
              <h4 className="font-oswald text-2xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Retinal Texture Fidelity
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Blazing-fast, uncompressed image loading ensuring every hand-painted patina, wood-last curve, and custom hardware stitch shows with zero quality loss.
              </p>
            </div>

            {/* Spec 2 */}
            <div className="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group duration-300 relative">
              <div className="h-12 w-12 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                02
              </div>
              <h4 className="font-oswald text-2xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                High-Traffic Load Immunity
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Custom edge-computing infrastructure optimized to handle massive, multi-million user viral spikes seamlessly whenever you drop a public challenge on TikTok.
              </p>
            </div>

            {/* Spec 3 */}
            <div className="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group duration-300 relative">
              <div className="h-12 w-12 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                03
              </div>
              <h4 className="font-oswald text-2xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-yellow-500" />
                Bespoke Collector Showcasing
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Sections built to display your shoes not as inventory items, but as named, distinct canvas art pieces (like 'The Emerald', 'The Mosaic Loafers', or 'The Primodal Oxford').
              </p>
            </div>

            {/* Spec 4 */}
            <div className="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group duration-300 relative">
              <div className="h-12 w-12 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                04
              </div>
              <h4 className="font-oswald text-2xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-500" />
                Qualified Pre-Screening
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                A sleek, luxury digital intake funnel designed to filter out casual social media commenters and route only serious, high-value collectors to your private WhatsApp consultation line.
              </p>
            </div>

          </div>
        </section>

        {/* WEBSITE ARCHITECTURE INDEX MAP */}
        <section id="architecture-map" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">03. INTERACTIVE PLATFORM BLUEPRINT</span>
            <h3 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">WEBSITE ARCHITECTURE INDEX MAP</h3>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed max-w-2xl">
              Click or hover on each page segment below to explore the custom visual layout and integrations planned for your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-[#111113] brutalist-border p-6 sm:p-10">
            {/* Left Menu (Clickable Index Map) */}
            <div className="md:col-span-5 space-y-3">
              {archPages.map((page) => {
                const isActive = selectedArchPage === page.id;
                return (
                  <button
                    key={page.id}
                    onClick={() => setSelectedArchPage(page.id)}
                    onMouseEnter={() => setSelectedArchPage(page.id)}
                    className={`w-full text-left p-4 brutalist-border transition-all duration-150 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'border-yellow-500 bg-yellow-500 text-black shadow-[4px_4px_0px_0px_#fff]'
                        : 'border-neutral-800 bg-black text-neutral-400 hover:border-neutral-600 hover:text-white'
                    }`}
                  >
                    <div>
                      <p className={`text-[9px] font-mono uppercase tracking-wider ${isActive ? 'text-black/75' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                        {page.tagline}
                      </p>
                      <h4 className="font-oswald text-lg font-black uppercase mt-0.5">
                        {page.title}
                      </h4>
                    </div>
                    <ArrowRight className={`h-4 w-4 transition-transform ${isActive ? 'translate-x-1 text-black' : 'text-neutral-600 group-hover:translate-x-1 group-hover:text-white'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Display Area */}
            <div className="md:col-span-7 bg-black brutalist-border border-neutral-800 p-6 sm:p-8 min-h-[280px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-2xl rounded-full pointer-events-none"></div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
                  <span className="text-[10px] font-mono text-yellow-500 font-bold bg-yellow-500/10 px-2 py-0.5 border border-yellow-500/20 uppercase tracking-widest">
                    ACTIVE BLUEPRINT INDEX: {archPages.findIndex(p => p.id === selectedArchPage) + 1} / {archPages.length}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-600">COM_FRAME_ARCH</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-oswald text-3xl font-black text-white uppercase tracking-wide">
                    {archPages.find(p => p.id === selectedArchPage)?.title}
                  </h3>
                  <p className="text-yellow-500 font-mono text-xs uppercase tracking-widest">
                    {archPages.find(p => p.id === selectedArchPage)?.tagline}
                  </p>
                </div>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed pt-2">
                  {archPages.find(p => p.id === selectedArchPage)?.summary}
                </p>
              </div>

              <div className="border-t border-neutral-900 pt-4 mt-6 flex justify-between items-center font-mono text-[9px] text-neutral-500">
                <span>[ PLATFORM INTEGRITY STATUS: DESIGNED ]</span>
                <span className="text-yellow-500">[ RENDER: ULTRA-ACCELERATED ]</span>
              </div>
            </div>
          </div>
        </section>

        {/* WEEK SPRINTS TIMELINE SECTION */}
        <section id="timeline-milestones" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">04. SYSTEMATIC DELIVERY FRAMEWORK</span>
            <h3 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">6-WEEK SYSTEM SPRINT ROADMAP</h3>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed max-w-2xl">
              An intense, high-focus iterative delivery cycle designed to establish your digital flagship with zero delay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Phase 1 */}
            <div className="bg-[#111113] brutalist-border p-6 space-y-4 hover:border-yellow-500 transition-colors group relative">
              <span className="absolute top-4 right-4 text-xs font-mono text-neutral-500 font-bold">W1-2</span>
              <div className="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xs font-mono brutalist-border border-black">
                PH-1
              </div>
              <h4 className="font-oswald text-lg font-black text-white uppercase group-hover:text-yellow-500 transition-colors leading-tight">
                Creative Discovery & Intake Blueprinting
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                System architecture, asset mapping, luxury wireframing, and custom brand alignment.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="bg-[#111113] brutalist-border p-6 space-y-4 hover:border-yellow-500 transition-colors group relative">
              <span className="absolute top-4 right-4 text-xs font-mono text-neutral-500 font-bold">W3-4</span>
              <div className="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xs font-mono brutalist-border border-black">
                PH-2
              </div>
              <h4 className="font-oswald text-lg font-black text-white uppercase group-hover:text-yellow-500 transition-colors leading-tight">
                Design & Front-End Engineering
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Core component assembly, motion layout design, master gallery setup, and elegant transitions.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="bg-[#111113] brutalist-border p-6 space-y-4 hover:border-yellow-500 transition-colors group relative">
              <span className="absolute top-4 right-4 text-xs font-mono text-neutral-500 font-bold">W5</span>
              <div className="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xs font-mono brutalist-border border-black">
                PH-3
              </div>
              <h4 className="font-oswald text-lg font-black text-white uppercase group-hover:text-yellow-500 transition-colors leading-tight">
                Stress Testing & Viral Optimization
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Simulated high-traffic load testing, mobile speed audits, media delivery tuning, and checkout scaling.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="bg-[#111113] brutalist-border-amber brutalist-shadow-amber p-6 space-y-4 relative">
              <span className="absolute top-4 right-4 text-xs font-mono text-yellow-500 font-bold">W6</span>
              <div className="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xs font-mono brutalist-border border-black">
                PH-4
              </div>
              <h4 className="font-oswald text-lg font-black text-white uppercase leading-tight">
                Production Handover & Live Launch
              </h4>
              <p className="text-neutral-200 text-xs leading-relaxed">
                Private infrastructure deployment, operational handbook delivery, secure launch, and going live globally.
              </p>
            </div>
          </div>
        </section>

        {/* AUTOMATION & PAYMENTS SECTION (HIGH PERFORMANCE ADVANTAGE) */}
        <section id="zero-hassle-payments" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">05. ENTERPRISE MECHANICS</span>
            <h3 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">HIGH-PERFORMANCE DROP SYSTEMS vs. CLUNKY TEMPLATES</h3>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed max-w-2xl">
              Ditch standard platforms that compress high-fidelity captures, washing away color saturation and material depth. Our custom edge-rendering guarantees lossless 4K leather and texture depth, and luxury-level direct booking channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Comparison Columns (Before vs After) */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              
              <div className="bg-[#1a1113] border border-red-950 p-6 space-y-3 relative overflow-hidden brutalist-border border-red-900">
                <span className="text-[10px] font-mono text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 uppercase inline-block">
                  BEFORE / TEMPLATE APPROACH
                </span>
                <h4 className="font-oswald text-xl font-bold text-white uppercase leading-snug">
                  Standard platforms compress high-fidelity captures, reducing color saturation and depth.
                </h4>
                <ul className="text-neutral-400 text-xs sm:text-sm space-y-2 list-disc pl-4 leading-relaxed">
                  <li>Uncompressed files degrade page speed, forcing you to compromise on showcasing 200-step patina craftsmanship.</li>
                  <li>Social media compressions blur meticulous stitching and hand-painted gradients, diminishing the perceived value.</li>
                  <li>Standard layouts treat your luxury masterpieces like mass-produced commodities, diluting your premium heritage.</li>
                </ul>
              </div>

              <div className="bg-[#111c16] border border-emerald-950 p-6 space-y-3 relative overflow-hidden brutalist-border border-emerald-900">
                <span className="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 uppercase inline-block">
                  AFTER / BESPOKE PLATFORM
                </span>
                <h4 className="font-oswald text-xl font-bold text-white uppercase leading-snug">
                  Our custom edge-rendered system retains the true brilliance of your leather artistry.
                </h4>
                <ul className="text-neutral-200 text-xs sm:text-sm space-y-2 list-disc pl-4 leading-relaxed">
                  <li><strong>One-of-One Presentation:</strong> Showcases Named Identities as individual fine art canvases with zero retinal loss.</li>
                  <li><strong>Lossless Retinal Clarity:</strong> Infinite resolution display preserving every hand-painted leather patina and wood-last contour.</li>
                  <li><strong>Uncompromising Speed:</strong> High-art loading and booking flows optimized for high-net-worth global collectors.</li>
                </ul>
              </div>

            </div>

            {/* Right Side: Interactive Real-Time payment Simulator */}
            <div className="lg:col-span-6 bg-[#111113] brutalist-border p-6 sm:p-8 flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-emerald-700/20 pb-4">
                  <div>
                    <h4 className="font-oswald text-lg font-bold text-white uppercase flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-yellow-500 shrink-0" />
                      LIVE BESPOKE DROP QUEUE & REVENUE MONITOR
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-mono mt-1">Interactive Proposal Demonstration</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-neutral-500 font-mono uppercase">Simulated Flagship Billings</p>
                    <p className="text-sm font-oswald text-yellow-500 font-bold">₦{totalSimulatedCapital.toLocaleString()}</p>
                  </div>
                </div>

                {/* Simulated Ledger Records list */}
                <div className="space-y-3 pt-2">
                  {simulatedMembers.map((member) => (
                    <div 
                      key={member.id} 
                      className="bg-black border border-neutral-850 p-3 flex justify-between items-center text-xs"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-white flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-neutral-500" />
                          {member.name}
                        </p>
                        <p className="text-[10px] text-neutral-500 font-mono">{member.plan} • {member.time}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-yellow-500 font-mono font-bold block">{member.amount}</span>
                        <span className="inline-block text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.2 uppercase font-black tracking-wider">
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-850 mt-6 lg:mt-0">
                <button
                  type="button"
                  onClick={addSimulatedSignUp}
                  className="w-full bg-yellow-500 hover:bg-white text-black font-black font-mono uppercase tracking-wider text-xs py-3 px-4 border border-black hover:scale-[1.02] transform transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-black animate-spin" />
                  SIMULATE DOCK DEPARTURE & DROP RESERVATION 🚀
                </button>
                <p className="text-[10px] text-neutral-400 text-center mt-2.5 font-mono">
                  Click to simulate a collector reserving a piece from the upcoming drop. Watch the transaction register on the secure queue!
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CHOOSE YOUR COLLECTION PACKAGE */}
        <section id="packages-pricing" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">06. COLLECTION PACKAGES</span>
            <h3 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">SELECT YOUR BASE PACKAGE</h3>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed max-w-2xl">
              Choose the base package that corresponds to your creative and business needs. You can layer custom features on top in the next section.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(tiers).map((tier) => {
              const isSelected = selectedTier === tier.id;
              const isElite = tier.id === 'elite';
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id as 'base' | 'standard' | 'elite')}
                  className={`brutalist-border transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer relative select-none ${
                    isSelected
                      ? 'border-yellow-500 bg-[#1c180a] brutalist-shadow-amber scale-[1.02]'
                      : isElite
                      ? 'border-yellow-500/30 bg-[#131315] hover:border-yellow-500/60 hover:bg-neutral-900/50'
                      : 'border-neutral-800 bg-[#111113] hover:border-neutral-600 hover:bg-neutral-900/50'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute -top-3.5 left-4 bg-yellow-500 text-black text-[9px] font-mono tracking-widest px-2.5 py-1 font-black uppercase brutalist-border border-black">
                      ACTIVE SELECTION
                    </span>
                  )}
                  
                  <div className="space-y-4">
                    {isElite && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-mono text-[9px] sm:text-[10px] font-black tracking-wider uppercase p-3 leading-relaxed flex items-start gap-2 mb-3">
                        <Sparkles className="h-3.5 w-3.5 text-yellow-500 shrink-0 mt-0.5 animate-pulse" />
                        <span>
                          HIGHLY RECOMMENDED — YOU'LL BE THE FIRST SHOE ARTIST TO OWN A WEBSITE LIKE THIS IN NIGERIA
                        </span>
                      </div>
                    )}
                    <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                      {tier.id === 'base' ? 'TIER 01' : tier.id === 'standard' ? 'TIER 02' : 'TIER 03'}
                    </p>
                    <h3 className="font-oswald text-2xl font-black text-white uppercase tracking-wide">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed min-h-[50px]">
                      {tier.description}
                    </p>
                  </div>

                  <div className="border-t border-neutral-800 pt-4 mt-6 flex justify-between items-baseline mb-4">
                    <div>
                      <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest">EST. TIMELINE</p>
                      <p className="font-oswald text-lg font-bold text-white uppercase mt-0.5">{tier.days} DAYS</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest">BASE INVESTMENT</p>
                      <p className="font-oswald text-2xl font-black text-yellow-500 mt-0.5">₦{tier.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTier(tier.id as 'base' | 'standard' | 'elite');
                      setActiveDetailTier(tier.id as 'base' | 'standard' | 'elite');
                    }}
                    className="w-full bg-neutral-900/80 hover:bg-yellow-500 text-neutral-300 hover:text-black font-mono text-[10px] font-bold tracking-widest uppercase py-2.5 px-3 border border-neutral-800 hover:border-black transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <span>View Granular Deliverables</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Granular Deliverables Immersive Breakout Side-Drawer */}
          {activeDetailTier && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity duration-300">
              {/* Backdrop close area */}
              <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveDetailTier(null)} />
              
              <div className="relative w-full max-w-xl bg-zinc-950 border-t md:border-t-0 md:border-l border-yellow-500/30 p-6 sm:p-10 shadow-2xl flex flex-col h-full z-10 overflow-y-auto animate-fade-in">
                {/* Close Button & Header */}
                <div className="flex justify-between items-start border-b border-neutral-800 pb-5 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-yellow-500 font-bold uppercase tracking-widest bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1">
                      {tierDetails[activeDetailTier].deliverablesCount}
                    </span>
                    <h3 className="font-oswald text-2xl sm:text-3xl font-black text-white uppercase mt-3 tracking-tight">
                      {tierDetails[activeDetailTier].name}
                    </h3>
                    <p className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase mt-1">
                      {tierDetails[activeDetailTier].tagline}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveDetailTier(null)}
                    className="text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-3 py-2 border border-neutral-800 hover:border-neutral-600 transition-colors flex items-center gap-1.5 cursor-pointer text-[10px] font-mono uppercase font-bold"
                  >
                    <span>Back to Canvas ✕</span>
                  </button>
                </div>

                {/* Itemized Deliverables */}
                <div className="flex-1 space-y-4 pr-1 overflow-y-auto">
                  <h4 className="font-oswald text-xs font-bold uppercase text-neutral-400 tracking-widest border-b border-neutral-900 pb-2">
                    ITEMIZED SYSTEM BLUEPRINT
                  </h4>
                  <div className="space-y-3.5">
                    {tierDetails[activeDetailTier].deliverables.map((item, idx) => (
                      <div key={idx} className="p-4 bg-neutral-900/40 border border-neutral-850 hover:border-yellow-500/20 transition-all duration-200">
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-xs text-yellow-500 font-black mt-0.5">
                            {(idx + 1).toString().padStart(2, '0')}.
                          </span>
                          <div className="space-y-1">
                            <h5 className="font-oswald text-base font-black text-white uppercase tracking-wide">
                              {item.title}
                            </h5>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drawer Footer Summary */}
                <div className="border-t border-neutral-900 pt-5 mt-6 bg-neutral-950/90 pb-2">
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest block">DEVELOPMENT CYCLE</span>
                      <span className="font-oswald text-lg font-bold text-white uppercase">{tierDetails[activeDetailTier].days} DAYS</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest block">INVESTMENT</span>
                      <span className="font-oswald text-2xl font-black text-yellow-500">{tierDetails[activeDetailTier].investment}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier(activeDetailTier);
                      setActiveDetailTier(null);
                    }}
                    className="w-full bg-yellow-500 hover:bg-white text-black font-black font-mono uppercase tracking-widest text-xs py-3.5 border border-black transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4 text-black" />
                    SELECT & SET ACTIVE TIER
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* INTERACTIVE WORKSPACE CUSTOMIZATION ENGINES */}
        <section id="addons-customizer" className="mb-20 sm:mb-28">
          <div className="bg-[#111113] brutalist-border p-6 sm:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-neutral-800 mb-8">
              <div>
                <span className="text-xs font-mono text-yellow-500 font-bold uppercase">TAILORED OPTIONS</span>
                <h3 className="font-oswald text-3xl font-black text-white uppercase mt-1">CHOOSE YOUR EXTRA FEATURES</h3>
                <p className="text-xs text-neutral-400 mt-1">Select optional features below to integrate them into your platform blueprint. Price and timeline estimates update dynamically.</p>
              </div>
              <div className="bg-black border border-neutral-800 text-xs font-mono text-yellow-500 tracking-wider py-1.5 px-3">
                INTEGRATIONS SELECTED: {totalSelectedAddonsCount}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {addonsList.map(item => {
                const isSelected = selectedAddons[item.id] || false;
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleToggleAddon(item.id)}
                    className={`p-5 brutalist-border transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none ${
                      isSelected 
                        ? 'border-yellow-500 bg-[#1c180a]' 
                        : 'border-neutral-800 bg-[#0B0B0C] hover:bg-neutral-900 hover:border-neutral-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded-none border-2 border-black flex items-center justify-center ${
                          isSelected ? 'bg-yellow-500 text-black' : 'bg-[#111113]'
                        }`}>
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[4]" />}
                        </div>
                        <h4 className="font-oswald text-lg font-black text-white uppercase tracking-wide">{item.title}</h4>
                      </div>
                      <p className="text-xs text-neutral-400 pl-8 leading-relaxed max-w-2xl">{item.description}</p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0 pl-8 sm:pl-0">
                      <span className="text-yellow-500 font-oswald text-lg font-extrabold">+$50</span>
                      <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase font-black">+{item.days} DAYS TO BUILD</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. THE BOTTOM LINE: MASSIVE HIGH-CONTRAST BOX */}
        <section id="cta-box-point" className="cta-trigger-section">
          <h2 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mb-8">
            03. <span className="text-yellow-500">THE BOTTOM LINE</span>
          </h2>

          <div className="cta-box-anim bg-gradient-to-br from-yellow-500 to-amber-600 brutalist-border brutalist-shadow-white p-8 sm:p-14 text-black relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-xl text-left">
                <span className="inline-block bg-black text-yellow-500 text-xs font-black tracking-widest px-3 py-1 uppercase font-mono brutalist-border border-black">
                  TIMELINE AND BUDGET SUMMARY
                </span>
                <h3 className="font-oswald text-3xl sm:text-5xl font-black uppercase text-neutral-900 leading-none">
                  LOCK IN YOUR DIGITAL ATELIER SCHEDULING
                </h3>
                <p className="text-neutral-900 text-sm font-semibold leading-relaxed">
                  We will start building your digital flagship gallery as soon as you sign below. Locking this in reserves our elite master-build slot to bring your leather artistry online quickly.
                </p>
                
                <div className="space-y-2 text-xs font-mono text-black font-bold pt-2">
                  <p className="flex items-center gap-2">
                    <span>✔</span>
                    <span>Premium digital flagship gallery tailored specifically for {brandName}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>✔</span>
                    <span>Everything hosted on high-performance infrastructure with zero errors</span>
                  </p>
                  {Object.keys(selectedAddons).filter(k => selectedAddons[k]).map(key => {
                    const addonItem = addonsList.find(a => a.id === key);
                    return (
                      <p key={key} className="flex items-center gap-2 text-neutral-900">
                        <span>★</span>
                        <span>Option Included: {addonItem?.title} (+{addonItem?.days} Days)</span>
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Investment Block */}
              <div className="bg-neutral-950 p-6 sm:p-8 brutalist-border border-black text-center text-white w-full lg:max-w-xs space-y-6">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-800">
                  <div>
                    <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase font-black">DAYS TO BUILD</p>
                    <p className="text-lg sm:text-xl font-extrabold text-white mt-1 uppercase font-oswald">{currentTimeline} DAYS</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase font-black">TOTAL PRICE</p>
                    <p className="text-lg sm:text-xl font-extrabold text-yellow-500 mt-1 font-oswald">{currentPriceText}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    id="lock-btn-interactive"
                    onClick={() => {
                      if (isAccepted) {
                        alert('Proposal already signed! 🦾');
                      } else {
                        setIsSignModalOpen(true);
                      }
                    }}
                    className="w-full bg-yellow-500 font-black text-black text-sm uppercase py-4.5 px-6 brutalist-border border-black hover:bg-white hover:text-black hover:scale-[1.02] transform transition-all brutalist-pulse cursor-pointer animate-glow"
                  >
                    {isAccepted ? 'SIGNED AND AGREED ✓' : 'ORDER NOW 🚀'}
                  </button>
                  <p className="text-[9px] text-neutral-500 font-mono">This price is saved for 14 days</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Footer specifications info lines */}
        <footer className="mt-20 text-center text-[11px] text-neutral-500 font-mono border-t border-neutral-850 pt-8 space-y-2">
          <p>NELSON SHOES BESPOKE DIGITAL ATELIER PROPOSAL 2026</p>
          <p className="text-neutral-600">Click &quot;Get Standalone Code&quot; at the top to see and copy the website code instantly.</p>
        </footer>

      </div>

      {/* Signature dynamic modal popup */}
      {isSignModalOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111113] brutalist-border border-yellow-500 w-full max-w-md rounded-none overflow-hidden shadow-2xl relative">
            
            <button 
              onClick={() => setIsSignModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-yellow-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <form onSubmit={submitSignature} className="p-6 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex bg-yellow-500 text-black p-3 rounded-none mb-3 brutalist-border border-black">
                  <Edit3 className="h-6 w-6" />
                </div>
                <h3 className="font-oswald text-2xl font-black text-white uppercase tracking-wide">SIGN PROPOSAL FOR {brandName}</h3>
                <p className="text-xs text-neutral-400">Lock in your development schedule and flagship architecture today.</p>
              </div>

              <div className="space-y-4 pt-3">
                <div className="space-y-2">
                  <label htmlFor="client-name-input" className="text-xs font-mono text-neutral-400 block uppercase tracking-wide">Your Full Name</label>
                  <input 
                    id="client-name-input"
                    required
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Samuel Valenti" 
                    className="w-full bg-black border-2 border-neutral-800 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder-neutral-700"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email-input" className="text-xs font-mono text-neutral-400 block uppercase tracking-wide">Your Email Address</label>
                  <input 
                    id="contact-email-input"
                    required
                    type="email" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. sam@valenti.com" 
                    className="w-full bg-black border-2 border-neutral-800 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder-neutral-700"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="sig-verify-input" className="text-xs font-mono text-neutral-400 block uppercase tracking-wide">Write Your Signature</label>
                  <input 
                    id="sig-verify-input"
                    required
                    type="text" 
                    value={signatureText}
                    onChange={(e) => setSignatureText(e.target.value)}
                    placeholder="Type your signature here to agree..." 
                    className="w-full bg-black border-2 border-neutral-800 rounded-none px-4 py-3 text-sm text-yellow-500 italic font-mono focus:outline-none focus:border-yellow-500 transition-colors placeholder-neutral-700 tracking-widest font-black"
                  />
                  <p className="text-[10px] text-neutral-500 pl-1">Signing confirms brand alignment and reserves build schedule slot.</p>
                </div>
              </div>

               <div className="bg-black p-4 border border-neutral-800 space-y-1.5 text-xs text-neutral-300 font-mono">
                <p><strong>PROPOSAL SELECTION SUMMARY:</strong></p>
                <p className="text-[11px] text-neutral-400">Base Tier: {tiers[selectedTier].name}</p>
                {Object.keys(selectedAddons).filter(k => selectedAddons[k]).map(key => {
                  const addonItem = addonsList.find(a => a.id === key);
                  return <p key={key} className="text-[11px] text-neutral-400">+ {addonItem?.title}: $50</p>;
                })}
                <p className="pt-2 border-t border-neutral-800 font-bold text-white flex justify-between font-bold">
                  <span>TOTAL ESTIMATED COST:</span>
                  <span className="text-yellow-500">{currentPriceText}</span>
                </p>
              </div>

              <div className="flex gap-4 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsSignModalOpen(false)}
                  className="w-1/2 bg-neutral-900 border-2 border-neutral-800 hover:bg-neutral-800 text-neutral-300 py-3 uppercase text-xs font-black tracking-widest cursor-pointer"
                >
                  CANCEL
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 bg-yellow-500 text-black py-3 uppercase text-xs font-black tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  SIGN AND ORDER 🖋️
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
