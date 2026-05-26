import { Award, Compass, Heart, Users, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="relative min-h-screen bg-[#07080d] pt-40 pb-20 px-6 md:px-12 select-none overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] aspect-square rounded-full bg-radial-gradient from-[#bd922b]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] aspect-square rounded-full bg-radial-gradient from-blue-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Cinematic Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-black tracking-widest text-[#bd922b] uppercase block animate-pulse">
            ESTABLISHED IN RETRO SPORTING LABS
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-none">
            OUR SPORTING <span className="text-[#bd922b]">HERITAGE</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            7.10 HOUSE is the world's premier digital studio for authentic retro replicas and tournament kits, bridging vintage pitch glory with ultra-modern athletic performance.
          </p>
        </div>

        {/* Brand Showcase Block (Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[#bd922b] text-[9px] font-bold tracking-widest uppercase inline-block">
              UNCOMPROMISING PRECISION
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              CRAFTED FOR THE ELITE SPECTRUM
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Every thread spun, badge pressed, and pattern mapped in our studio goes through rigorous physical audits. We source long-staple athletic micro-fibers, ensuring our shirts deliver the high-breathability, dynamic-stretch, and iconic classic weight that legends commanded on the pitch.
            </p>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Our designs capture the precise nostalgic details—from ribbed collar configurations to specific screen-print thickness of historic sponsors.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2 hover:border-[#bd922b]/20 transition-all duration-300">
              <Award className="w-8 h-8 text-[#bd922b]" />
              <h4 className="text-white font-extrabold text-sm uppercase">Licensed Replicas</h4>
              <p className="text-gray-500 text-[10px]">Strict quality control matching original configurations.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2 hover:border-[#bd922b]/20 transition-all duration-300">
              <Compass className="w-8 h-8 text-[#bd922b]" />
              <h4 className="text-white font-extrabold text-sm uppercase">Global Sourcing</h4>
              <p className="text-gray-500 text-[10px]">Finest yarn blends selected across premium mills.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2 hover:border-[#bd922b]/20 transition-all duration-300">
              <Heart className="w-8 h-8 text-[#bd922b]" />
              <h4 className="text-white font-extrabold text-sm uppercase">Pitch Nostalgia</h4>
              <p className="text-gray-500 text-[10px]">Celebrating iconic moments that defined soccer culture.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2 hover:border-[#bd922b]/20 transition-all duration-300">
              <Users className="w-8 h-8 text-[#bd922b]" />
              <h4 className="text-white font-extrabold text-sm uppercase">Concierge Desk</h4>
              <p className="text-gray-500 text-[10px]">VIP global support answering all customized requirements.</p>
            </div>
          </div>
        </div>

        {/* Premium Corporate Counter Block */}
        <section className="glass-panel py-10 px-8 rounded-3xl border border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#bd922b]/2 to-transparent pointer-events-none" />
          
          <div className="space-y-1">
            <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight">100+</h4>
            <p className="text-gray-500 text-[9px] uppercase tracking-wider font-extrabold">Clubs Partnered</p>
          </div>
          <div className="space-y-1 border-l border-white/5">
            <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight">1.2M</h4>
            <p className="text-gray-500 text-[9px] uppercase tracking-wider font-extrabold">Kits Slipped on Pitch</p>
          </div>
          <div className="space-y-1 border-l border-white/5">
            <h4 className="text-2xl md:text-4xl font-black text-[#bd922b] tracking-tight">0.01%</h4>
            <p className="text-gray-500 text-[9px] uppercase tracking-wider font-extrabold">Defect Tolerance</p>
          </div>
          <div className="space-y-1 border-l border-white/5">
            <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight">24h</h4>
            <p className="text-gray-500 text-[9px] uppercase tracking-wider font-extrabold">Dispatch SLA</p>
          </div>
        </section>

        {/* Our Laboratory Philosophy Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <Sparkles className="w-8 h-8 text-[#bd922b] mx-auto animate-pulse" />
          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            ENGINEERED UNDER RIGOROUS AUDITS
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            Our research laboratories study authentic historic uniforms under specialized light arrays to map precise CMYK and Pantone color configurations. We guarantee that when you receive a 7.10 HOUSE kit, you hold a masterpiece of sport archaeology ready for modern streetwear or full-intensity play.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
