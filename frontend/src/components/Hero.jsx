import { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import TransparentProductImage from './TransparentProductImage';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ronaldoImg from '../card Image/CRISTIANO RONALDO.jpeg';
import messiImg from '../card Image/D10s.jpeg';
import retroImg from '../card Image/ChatGPT Image May 26, 2026, 12_48_57 PM.png';
import barcelonaLogo from '../club logo/barcelona.jpeg';
import realMadridLogo from '../club logo/real_madrid.jpeg';
import manCityLogo from '../club logo/man_city.jpeg';
import manUnitedLogo from '../club logo/man_united.jpeg';
import arsenalLogo from '../club logo/arsenal.jpeg';
import bayernLogo from '../club logo/bayern_munich.jpeg';
import acMilanLogo from '../club logo/ac_milan.jpeg';
import interMiamiLogo from '../club logo/inter_miami.jpeg';
import liverpoolLogo from '../club logo/liverpool.jpeg';
import santosLogo from '../club logo/santos.jpeg';

// Premium dynamic canvas background remover to strip white JPEG backgrounds while preserving inner white graphics.
const LogoImage = ({ src, alt, className }) => {
  const [processedSrc, setProcessedSrc] = useState(src);

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (!active) return;
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        const visited = new Uint8Array(width * height);
        const queue = [];

        // Push all border pixels to start flood fill from outside
        for (let x = 0; x < width; x++) {
          queue.push([x, 0]);
          queue.push([x, height - 1]);
          visited[0 * width + x] = 1;
          visited[(height - 1) * width + x] = 1;
        }
        for (let y = 1; y < height - 1; y++) {
          queue.push([0, y]);
          queue.push([width - 1, y]);
          visited[y * width + 0] = 1;
          visited[y * width + (width - 1)] = 1;
        }

        let head = 0;
        while (head < queue.length) {
          const [cx, cy] = queue[head++];
          const idx = (cy * width + cx) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Threshold for "near white" background
          if (r > 200 && g > 200 && b > 200) {
            data[idx + 3] = 0; // transparent alpha

            const neighbors = [
              [cx + 1, cy],
              [cx - 1, cy],
              [cx, cy + 1],
              [cx, cy - 1]
            ];

            for (const [nx, ny] of neighbors) {
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const nIdx = ny * width + nx;
                if (!visited[nIdx]) {
                  visited[nIdx] = 1;
                  queue.push([nx, ny]);
                }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL());
      } catch (err) {
        console.error("Error processing logo transparency:", err);
      }
    };
    return () => {
      active = false;
    };
  }, [src]);

  return <img src={processedSrc} alt={alt} className={className} />;
};

const teams = [
  { id: 'barcelona', name: 'BARCELONA', logo: barcelonaLogo },
  { id: 'real-madrid', name: 'REAL MADRID', logo: realMadridLogo },
  { id: 'man-city', name: 'MAN CITY', logo: manCityLogo },
  { id: 'man-united', name: 'MAN UNITED', logo: manUnitedLogo },
  { id: 'arsenal', name: 'ARSENAL', logo: arsenalLogo },
  { id: 'bayern-munich', name: 'BAYERN MUNICH', logo: bayernLogo },
  { id: 'ac-milan', name: 'AC MILAN', logo: acMilanLogo },
  { id: 'inter-miami', name: 'INTER MIAMI', logo: interMiamiLogo },
  { id: 'liverpool', name: 'LIVERPOOL', logo: liverpoolLogo },
  { id: 'santos', name: 'SANTOS', logo: santosLogo },
];

const Hero = () => {
  const { products, activeHeroProduct, setActiveHeroProduct, setActiveView, setSearchQuery, loading } = useShop();
  
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  useEffect(() => {
    if (isAutoplayPaused) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev < teams.length - 5 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoplayPaused]);



  const handlePrevTeam = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : teams.length - 5));
  };

  const handleNextTeam = () => {
    setCarouselIndex((prev) => (prev < teams.length - 5 ? prev + 1 : 0));
  };

  const handleTeamClick = (teamName) => {
    setSearchQuery(teamName);
    setActiveView('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Filter products that are designated for the featured hero slider
  const featuredKits = products.filter(p => p.is_featured);

  if (loading || featuredKits.length === 0) {
    return (
      <div className="relative min-h-screen w-full bg-[#06070a] overflow-hidden pt-36 flex flex-col justify-between animate-pulse">
        
        {/* Dynamic Background Split Graphic */}
        <div className="absolute inset-0 z-0 pointer-events-none flex">
          <div className="w-1/2 h-full bg-[#090A0F]" />
          <div className="w-1/2 h-full bg-[#0c0d15]" />
        </div>

        {/* Ambient sparkling particles */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[25%] left-[15%] w-2 h-2 rounded-full bg-[#bd922b] opacity-15" />
          <div className="absolute top-[60%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#bd922b] opacity-10" />
          <div className="absolute top-[18%] left-[78%] w-3 h-3 rounded-full bg-[#bd922b] opacity-10" />
        </div>

        {/* Behind-Jersey Giant Backdrop Typography */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <h1 className="text-[12vw] font-black text-white/2 tracking-widest text-center whitespace-nowrap leading-none uppercase">
            LOADING KITS
          </h1>
        </div>

        {/* Middle Section: Main Floating Jersey & Interactive Presentation */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 grow flex flex-col md:flex-row items-center justify-between gap-12 py-6">
          
          {/* Left Column: Product Info & CTA */}
          <div className="w-full md:w-[40%] text-center md:text-left flex flex-col items-center md:items-start order-2 md:order-1">
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-4">
              FEATURED CLASSIC
            </span>
            <div className="h-12 w-3/4 bg-white/5 rounded-xl mb-4" />
            <div className="h-4 w-1/2 bg-white/5 rounded-lg mb-4" />
            <div className="h-20 w-full bg-white/5 rounded-xl mb-6 max-w-md" />
            <div className="h-12 w-40 bg-white/5 border border-white/10 rounded-xl" />
          </div>

          {/* Center: The Massive Floating 3D Jersey Render */}
          <div className="w-full md:w-[45%] flex items-center justify-center relative order-1 md:order-2">
            <div className="absolute w-[80%] aspect-square rounded-full bg-linear-to-br from-[#bd922b]/5 to-transparent blur-[100px]" />
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              <div className="w-[80%] h-[80%] bg-white/5 rounded-full" />
              <div className="absolute bottom-[-10px] w-[60%] h-4 bg-black/45 rounded-full blur-md" />
            </div>
          </div>

          {/* Right Side Carousel Preview Drawer */}
          <div className="hidden lg:flex w-[15%] flex-col items-center gap-4 bg-white/2 p-4 rounded-2xl border border-white/5 order-3">
            <div className="w-16 h-3 bg-white/5 rounded" />
            <div className="w-20 h-20 bg-white/5 rounded-full" />
            <div className="w-24 h-4 bg-white/5 rounded" />
            <div className="w-6 h-6 bg-white/5 rounded-full" />
          </div>

        </div>

        {/* SHOP BY TEAM Carousel Section */}
        <section className="relative z-20 max-w-6xl mx-auto w-full px-6 md:px-12 py-6 border-t border-white/5 mt-4">
          <div className="text-center mb-5">
            <div className="h-3 w-40 bg-white/5 mx-auto rounded mb-2" />
            <div className="h-6 w-48 bg-white/5 mx-auto rounded" />
          </div>
          <div className="flex gap-4 justify-center py-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-[calc(100%/5-14px)] aspect-square bg-white/5 rounded-2xl border border-white/10" />
            ))}
          </div>
        </section>

      </div>
    );
  }

  // Handle slide transitions
  const handleNextSlide = () => {
    const currentIndex = featuredKits.findIndex(p => p.id === activeHeroProduct.id);
    const nextIndex = (currentIndex + 1) % featuredKits.length;
    setActiveHeroProduct(featuredKits[nextIndex]);
  };

  const getNextProduct = () => {
    const currentIndex = featuredKits.findIndex(p => p.id === activeHeroProduct.id);
    const nextIndex = (currentIndex + 1) % featuredKits.length;
    return featuredKits[nextIndex];
  };

  const currentStats = activeHeroProduct.stats || {};
  const nextProduct = getNextProduct();

  return (
    <div className="relative min-h-screen w-full bg-[#06070a] overflow-hidden pt-36 flex flex-col justify-between">
      
      {/* Dynamic Background Split Graphic representing Portugal (Left) & Argentina (Right) */}
      <div className="absolute inset-0 z-0 pointer-events-none flex">
        <div className="w-1/2 h-full bg-linear-to-br from-emerald-950/10 via-[#090A0F] to-[#090A0F] transition-all duration-1000" />
        <div className="w-1/2 h-full bg-linear-to-br from-sky-950/10 via-[#0c0d15] to-[#0c0d15] relative transition-all duration-1000">
          {/* Radial soft ambient glow */}
          <div className="absolute inset-0 bg-radial-gradient from-white/2 to-transparent opacity-60" />
        </div>
      </div>

      {/* Ambient sparkling particles - color-coded representing Green, Red, Blue, White, and Gold */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[25%] left-[15%] w-2 h-2 rounded-full bg-[#00662f] opacity-25 animate-ambient-sparkle" style={{ animationDelay: '0s', animationDuration: '12s' }} />
        <div className="absolute top-[60%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#e30a17] opacity-20 animate-ambient-sparkle" style={{ animationDelay: '2s', animationDuration: '15s' }} />
        <div className="absolute top-[18%] left-[78%] w-3 h-3 rounded-full bg-[#75aadb] opacity-15 animate-ambient-sparkle" style={{ animationDelay: '4s', animationDuration: '18s' }} />
        <div className="absolute top-[75%] left-[82%] w-2 h-2 rounded-full bg-[#ffffff] opacity-20 animate-ambient-sparkle" style={{ animationDelay: '1s', animationDuration: '14s' }} />
        <div className="absolute top-[45%] left-[88%] w-1.5 h-1.5 rounded-full bg-[#bd922b] opacity-25 animate-ambient-sparkle" style={{ animationDelay: '6s', animationDuration: '11s' }} />
        <div className="absolute top-[82%] left-[30%] w-2 h-2 rounded-full bg-[#bd922b] opacity-10 animate-ambient-sparkle" style={{ animationDelay: '3s', animationDuration: '16s' }} />
      </div>


      {/* Behind-Jersey Giant Backdrop Typography */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 
          key={activeHeroProduct.id} 
          className="text-[12vw] font-black text-white/3 tracking-widest text-center whitespace-nowrap animate-slide-up leading-none uppercase"
        >
          {currentStats.backdropText || 'FOOTBALL KITS'}
        </h1>
      </div>



      {/* Middle Section: Main Floating Jersey & Interactive Presentation */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 grow flex flex-col md:flex-row items-center justify-between gap-12 py-6">
        
        {/* Left Column: Product Info & CTA */}
        <div className="w-full md:w-[40%] text-center md:text-left flex flex-col items-center md:items-start order-2 md:order-1">
          <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[#bd922b] text-[10px] font-bold tracking-widest uppercase mb-4 animate-pulse">
            FEATURED CLASSIC
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4 text-neon-gold">
            {activeHeroProduct.name}
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-md">
            {activeHeroProduct.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setActiveView('store')}
              className="px-6 py-3.5 bg-white/5 border border-white/10 hover:border-white/30 text-white font-bold text-sm uppercase rounded-xl tracking-wider transition-all duration-300"
            >
              All the Collection
            </button>
          </div>
        </div>

        {/* Center: The Massive Floating 3D Jersey Render */}
        <div className="w-full md:w-[45%] flex items-center justify-center relative order-1 md:order-2">
          
          {/* Ambient Spotlight back-glow */}
          <div className="absolute w-[80%] aspect-square rounded-full bg-linear-to-br from-[#bd922b]/10 to-transparent blur-[100px] animate-pulse-glow" />
          
          <div className="relative group w-full max-w-[400px] aspect-square flex items-center justify-center">
            <TransparentProductImage 
              key={activeHeroProduct.id}
              src={activeHeroProduct.image_url?.split(',')[0]} 
              alt={activeHeroProduct.name} 
              className="w-[90%] md:w-full object-contain animate-float transform hover:scale-[1.05] hover:rotate-3 transition-all duration-500 cursor-pointer"
              style={{
                filter: 'drop-shadow(0 25px 40px rgba(0,0,0,0.8))'
              }}
              onClick={handleNextSlide}
            />
            {/* Soft Shadow floor element */}
            <div className="absolute bottom-[-10px] w-[60%] h-4 bg-black/45 rounded-full blur-md animate-pulse-glow" />
          </div>

        </div>

        {/* Right Side Carousel Preview Drawer */}
        <div 
          onClick={handleNextSlide}
          className="hidden lg:flex w-[15%] flex-col items-center gap-4 bg-white/2 hover:bg-white/4 p-4 rounded-2xl border border-white/5 hover:border-white/10 cursor-pointer transition-all duration-500 hover:scale-105 group relative overflow-hidden order-3"
        >
          {/* Slide Indicator Accent */}
          <div className="absolute top-0 right-0 w-[4px] h-full bg-[#bd922b]" />
          
          <p className="text-[10px] font-bold tracking-widest text-[#bd922b] uppercase">NEXT UP</p>
          <TransparentProductImage 
            src={nextProduct.image_url?.split(',')[0]} 
            alt={nextProduct.name} 
            className="w-full max-w-[80px] object-contain group-hover:scale-110 transition-transform duration-300"
            style={{
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
            }}
          />
          <span className="text-[11px] font-extrabold text-white text-center tracking-tight uppercase leading-tight line-clamp-1">
            {nextProduct.name.replace("2018-19", "").replace("2017-18", "").replace("2024", "")}
          </span>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>

      </div>

      {/* Two Nations Players Split Banners Card Section (Below Product Showcase) */}
      <section className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 py-10">
        
        {/* GOATs Title & Quotes Block */}
        <div className="text-center mb-10 space-y-4 max-w-4xl mx-auto">
          <span className="text-[9px] font-black tracking-widest text-[#bd922b] uppercase block mb-1.5 animate-pulse">
            THE SUPREME FOOTBALL SPECTRUM
          </span>
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            THE <span className="text-[#bd922b]">GOATs</span> COLLECTION
          </h3>
          
          {/* Dual Quote Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
            <div className="glass-panel p-5 rounded-2xl border-l-2 border-[#e30a17]/40 bg-[#06070a]/40 backdrop-blur-sm relative">
              <span className="text-[36px] font-serif text-[#e30a17]/10 absolute top-0 left-2 pointer-events-none">“</span>
              <p className="text-gray-400 text-xs italic leading-relaxed pl-4 font-semibold">
                "Your love makes me strong, your hate makes me unstoppable."
              </p>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black text-right mt-1.5 pr-2">— CRISTIANO RONALDO</p>
            </div>
            
            <div className="glass-panel p-5 rounded-2xl border-l-2 border-[#75aadb]/40 bg-[#06070a]/40 backdrop-blur-sm relative">
              <span className="text-[36px] font-serif text-[#75aadb]/10 absolute top-0 left-2 pointer-events-none">“</span>
              <p className="text-gray-400 text-xs italic leading-relaxed pl-4 font-semibold">
                "You have to fight to reach your dream. You have to sacrifice and work hard for it."
              </p>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black text-right mt-1.5 pr-2">— LIONEL MESSI</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Player Card: Cristiano Ronaldo */}
          <div 
            onClick={() => handleTeamClick('PORTUGAL')}
            className="group relative h-[340px] sm:h-[380px] md:h-[420px] rounded-3xl overflow-hidden border border-white/5 hover:border-[#e30a17]/30 cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-2xl hover:shadow-[#e30a17]/10"
          >
            {/* Green/Red Overlay representing Portugal */}
            <div className="absolute inset-0 bg-linear-to-t from-[#06070a] via-[#06070a]/45 to-transparent z-10" />
            <div className="absolute inset-0 bg-emerald-950/10 group-hover:bg-emerald-900/5 transition-colors duration-500 z-10" />
            <img 
              src={ronaldoImg} 
              alt="Cristiano Ronaldo" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            />
            {/* Text Overlay */}
            <div className="absolute bottom-8 left-8 right-8 z-20 space-y-2">
              <span className="px-3 py-1 bg-[#e30a17]/20 border border-[#e30a17]/30 text-[#e30a17] text-[10px] sm:text-[11px] font-black tracking-widest rounded-md uppercase">
                PORTUGAL · NO. 7
              </span>
              <h3 className="text-white font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-none pt-1">CRISTIANO RONALDO</h3>
              <p className="text-gray-400 text-xs sm:text-[13px] uppercase font-bold tracking-wide">Explore Authentic Retro & National Kits</p>
            </div>
          </div>

          {/* Right Player Card: Lionel Messi */}
          <div 
            onClick={() => handleTeamClick('ARGENTINA')}
            className="group relative h-[340px] sm:h-[380px] md:h-[420px] rounded-3xl overflow-hidden border border-white/5 hover:border-[#75aadb]/30 cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-2xl hover:shadow-[#75aadb]/10"
          >
            {/* Blue/White Overlay representing Argentina */}
            <div className="absolute inset-0 bg-linear-to-t from-[#06070a] via-[#06070a]/45 to-transparent z-10" />
            <div className="absolute inset-0 bg-sky-950/10 group-hover:bg-sky-900/5 transition-colors duration-500 z-10" />
            <img 
              src={messiImg} 
              alt="Lionel Messi" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            />
            {/* Text Overlay */}
            <div className="absolute bottom-8 left-8 right-8 z-20 space-y-2">
              <span className="px-3 py-1 bg-[#75aadb]/20 border border-[#75aadb]/30 text-[#75aadb] text-[10px] sm:text-[11px] font-black tracking-widest rounded-md uppercase">
                ARGENTINA · NO. 10
              </span>
              <h3 className="text-white font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-none pt-1">LIONEL MESSI</h3>
              <p className="text-gray-400 text-xs sm:text-[13px] uppercase font-bold tracking-wide">Explore Authentic Stars & Vintage Kits</p>
            </div>
          </div>
        </div>

        {/* Retro Collection Banner Card (Below both GOAT cards) */}
        <div className="mt-8">
          <div 
            onClick={() => handleTeamClick('Five Sleeve')}
            className="group relative h-[240px] sm:h-[280px] rounded-3xl overflow-hidden border border-white/5 hover:border-[#bd922b]/30 cursor-pointer transition-all duration-500 hover:scale-[1.01] shadow-2xl hover:shadow-[#bd922b]/10"
          >
            {/* Dark/Gold Ambient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#06070a] via-[#06070a]/45 to-transparent z-10" />
            <div className="absolute inset-0 bg-[#bd922b]/5 group-hover:bg-[#bd922b]/3 transition-colors duration-500 z-10" />
            <img 
              src={retroImg} 
              alt="Retro & Classic Collection" 
              className="w-full h-full object-cover group-hover:scale-103 transition-all duration-700"
            />
            {/* Text Overlay */}
            <div className="absolute bottom-8 left-8 right-8 z-20 space-y-2">
              <span className="px-3 py-1 bg-[#bd922b]/20 border border-[#bd922b]/30 text-[#bd922b] text-[10px] sm:text-[11px] font-black tracking-widest rounded-md uppercase animate-pulse">
                VINTAGE PITCH NOSTALGIA
              </span>
              <h3 className="text-white font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-none pt-1">
                RETRO & LEGENDS COLLECTION
              </h3>
              <p className="text-gray-400 text-xs sm:text-[13px] uppercase font-bold tracking-wide">
                Explore iconic jerseys from historic finals and vintage football history
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY TEAM Carousel Section - Compact Minimised UI Layout */}
      <section className="relative z-20 max-w-6xl mx-auto w-full px-6 md:px-12 py-6 border-t border-white/5 mt-4">
        <div className="text-center mb-5">
          <span className="text-[9px] font-black tracking-widest text-[#bd922b] uppercase block mb-1.5 animate-pulse">
            AUDITED WORLDWIDE CLUBS
          </span>
          <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">
            SHOP BY <span className="text-[#bd922b]">TEAM</span>
          </h3>
        </div>

        {/* Carousel Slider Controls Container */}
        <div 
          className="relative group/carousel px-8"
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
        >
          
          {/* Slider Row wrapper */}
          <div className="overflow-hidden py-3 px-2">
            <div 
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{ transform: `translate3d(-${carouselIndex * 20}%, 0, 0)` }}
            >
              {teams.map((team) => (
                <div 
                  key={team.id}
                  onClick={() => handleTeamClick(team.name)}
                  className={`w-[calc(100%/2-8px)] sm:w-[calc(100%/3-10px)] md:w-[calc(100%/4-12px)] lg:w-[calc(100%/5-14px)] shrink-0 bg-linear-to-br from-[#0e1017] to-[#07080d] hover:border-[#bd922b]/30 rounded-2xl p-3 border border-white/10 flex flex-col items-center justify-between aspect-square group/card cursor-pointer team-card team-card-${team.id} transition-all duration-300`}
                >
                  <div className="grow flex items-center justify-center filter drop-shadow-md group-hover/card:scale-108 transition-transform duration-300 w-full h-[70%]">
                    <LogoImage 
                      src={team.logo} 
                      alt={`${team.name} Logo`} 
                      className="h-full w-auto object-contain rounded-xl"
                    />
                  </div>
                  <span className="text-[9.5px] font-black text-gray-300 tracking-wider uppercase text-center mt-2.5 group-hover/card:text-[#bd922b] transition-colors duration-300">
                    {team.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button */}
          <button 
            type="button"
            onClick={handlePrevTeam}
            className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer shadow-lg shadow-black z-30"
          >
            <ChevronLeft className="w-5 h-5 text-gray-300 hover:text-white" />
          </button>

          {/* Right Arrow Button */}
          <button 
            type="button"
            onClick={handleNextTeam}
            className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer shadow-lg shadow-black z-30"
          >
            <ChevronRight className="w-5 h-5 text-gray-300 hover:text-white" />
          </button>

        </div>
      </section>



    </div>
  );
};

export default Hero;
