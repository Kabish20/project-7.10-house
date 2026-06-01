import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    // Simulate premium pipeline delivery
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
      setTimeout(() => {
        setSuccess(false);
      }, 4500);
    }, 1800);
  };

  return (
    <div className="relative min-h-screen bg-[#07080d] pt-40 pb-20 px-6 md:px-12 select-none overflow-hidden">
      
      {/* Background radial soft glows */}
      <div className="absolute top-[30%] right-[-10%] w-[50%] aspect-square rounded-full bg-radial-gradient from-[#bd922b]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[50%] aspect-square rounded-full bg-radial-gradient from-emerald-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-black tracking-widest text-[#bd922b] uppercase block animate-pulse">
            VIP SUPPORT & CONCIERGE DECK
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-none">
            CONTACT <span className="text-[#bd922b]">7.10 HOUSE</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Reach our expert concierge desk. We respond to all authentic tailoring, custom orders, or corporate event inquiries within 12 business hours.
          </p>
        </div>

        {/* Contact Deck (Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Details Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-8 grow">
              <h3 className="text-lg font-extrabold text-white uppercase tracking-wider border-b border-white/5 pb-4">
                VIP SECURE DIRECTORIES
              </h3>
              
              <div className="space-y-6">
                
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[#bd922b] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-extrabold text-xs uppercase tracking-tight">Direct Concierge Email</p>
                    <p className="text-[#bd922b] font-semibold text-[13px] mt-0.5">7.10houseonline@gmail.com</p>
                    <p className="text-gray-500 text-[10px] uppercase mt-1">Available for active orders & bulk requests</p>
                  </div>
                </div>


              </div>

            </div>

            {/* SLA Alert Board */}
            <div className="glass-panel p-5 rounded-2xl border border-[#bd922b]/10 flex gap-3 items-center bg-[#bd922b]/3">
              <ShieldAlert className="w-5 h-5 text-[#bd922b] shrink-0 animate-pulse" />
              <p className="text-[10px] text-gray-400 uppercase tracking-tight leading-snug">
                <b>Secure Connection Verified:</b> All correspondence is encrypted and cataloged under professional auditing protocols.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative flex flex-col justify-between">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 focus:border-[#bd922b]/30 text-white text-xs outline-none transition-all placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 focus:border-[#bd922b]/30 text-white text-xs outline-none transition-all placeholder-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block mb-2">
                  Subject Focus
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-white/5 text-gray-400 focus:text-white text-xs outline-none cursor-pointer transition-all"
                >
                  <option value="general">General Support inquiry</option>
                  <option value="order">Active Order Sizing & Shipments</option>
                  <option value="bulk">Custom Bulk/Corporate Ordering</option>
                  <option value="partnership">Club Partnerships & Media</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block mb-2">
                  Message Body
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe your request in detail. Specify club sizes or exact design retro references if applicable..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-[#bd922b]/30 text-white text-xs outline-none transition-all resize-none placeholder-gray-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-linear-to-r from-[#bd922b] to-[#E3C488] text-black font-black text-xs uppercase rounded-xl tracking-widest flex items-center justify-center gap-2 hover:scale-[1.01] transition-all duration-300 shadow-xl shadow-[#bd922b]/10 cursor-pointer"
              >
                {submitting ? 'DISPATCHING TO PIPELINE...' : 'SEND VIP SECURE ENVOY'}
                <Send className="w-3.5 h-3.5" />
              </button>

            </form>

            {/* Success Panels */}
            {success && (
              <div className="absolute inset-0 bg-[#06070a]/95 rounded-3xl flex flex-col items-center justify-center text-center p-6 animate-fadeIn z-10">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-white text-xl font-black uppercase tracking-tight">
                  Correspondence Transmitted
                </h3>
                <p className="text-gray-400 text-xs mt-2 max-w-sm">
                  We've successfully queued your VIP inquiry into our pipeline. A concierge specialist will reach you back shortly.
                </p>
                <p className="text-[#bd922b] text-[9px] uppercase font-black tracking-widest mt-4 animate-pulse">
                  ESTIMATED RESPONSE: &lt; 12 HOURS
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
