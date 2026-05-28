import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Scale, 
  ArrowLeft, 
  Mail, 
  MapPin,
  BookOpen,
  Eye
} from 'lucide-react';

const PrivacyTerms = () => {
  const { setActiveView } = useShop();
  const [activeTab, setActiveTab] = useState('privacy'); // 'privacy' or 'terms'

  return (
    <div className="relative min-h-screen bg-[#07080d] pt-40 pb-20 px-6 md:px-12 select-none overflow-hidden">
      
      {/* Background radial soft glows */}
      <div className="absolute top-[10%] left-[-15%] w-[50%] aspect-square rounded-full bg-radial-gradient from-[#bd922b]/5 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[50%] aspect-square rounded-full bg-radial-gradient from-emerald-500/5 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-10">
        
        {/* Back navigation button */}
        <button 
          onClick={() => {
            setActiveView('hero');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-gray-400 hover:text-white font-extrabold text-xs uppercase tracking-wider transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Return to Showcase
        </button>

        {/* Cinematic Hub Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-black tracking-widest text-[#bd922b] uppercase block animate-pulse">
            7.10 HOUSE LEGAL CENTER
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
            LEGAL & <span className="text-[#bd922b]">PRIVACY REGISTRY</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Review the official terms of usage, sales protection policies, and global encryption parameters governing the 7.10 House platform.
          </p>
        </div>

        {/* Tab Selection Deck */}
        <div className="glass-panel p-1.5 rounded-2xl max-w-md mx-auto grid grid-cols-2 gap-2 border border-white/5 shadow-2xl">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-white text-black shadow-lg shadow-white/5'
                : 'text-gray-400 hover:text-white bg-transparent'
            }`}
          >
            <Eye className="w-4 h-4" />
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-white text-black shadow-lg shadow-white/5'
                : 'text-gray-400 hover:text-white bg-transparent'
            }`}
          >
            <Scale className="w-4 h-4" />
            Terms & Conditions
          </button>
        </div>

        {/* Dynamic Content Panel */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/5 bg-[#090b11]/70 shadow-2xl animate-page-transition">
          
          {activeTab === 'privacy' ? (
            // ── PRIVACY POLICY CONTENT ──
            <div className="space-y-8 text-gray-400 text-xs sm:text-sm leading-relaxed">
              
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <FileText className="w-6 h-6 text-[#bd922b]" />
                <h3 className="text-white font-black text-lg uppercase tracking-wider">Privacy Policy</h3>
              </div>

              <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider font-extrabold italic">
                Welcome to 7.10 HOUSE. Your privacy is important to us. This Privacy Policy explains how we collect, use, protect, and handle your personal information when you visit or purchase from our website.
              </p>

              <div className="space-y-6">
                
                {/* Sec 1 */}
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">1.</span> Information We Collect
                  </h4>
                  <p>We may collect the following information from customers:</p>
                  <ul className="list-disc list-inside pl-4 space-y-1 text-gray-500 text-xs">
                    <li>Full name, Billing and shipping address</li>
                    <li>Email address, Active contact phone number</li>
                    <li>Payment details, Order transactions history</li>
                    <li>Device and browser information, IP address and cookies</li>
                  </ul>
                </div>

                {/* Sec 2 */}
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">2.</span> How We Use Your Information
                  </h4>
                  <p>We utilize your data strictly to secure and process elite sporting orders:</p>
                  <ul className="list-disc list-inside pl-4 space-y-1 text-gray-500 text-xs">
                    <li>Process, tailor, and dispatch orders</li>
                    <li>Provide concierge-level VIP customer support</li>
                    <li>Improve website navigation and loading speeds</li>
                    <li>Send shipment dispatch notifications and exclusive retro drop promotions</li>
                    <li>Prevent fraudulent activities and maintain system safety standards</li>
                  </ul>
                </div>

                {/* Sec 3 - Highlighting Secure Gateway */}
                <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
                  <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    3. Payment Security & Encryption
                  </h4>
                  <p className="text-xs text-gray-300">
                    All payment transactions are routed and processed through secure, bank-grade third-party payment gateways. We do not store, write, or index your full credit/debit card numbers on our physical servers. All transmissions use TLS 1.3 encryption.
                  </p>
                </div>

                {/* Sec 4 */}
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">4.</span> Cookies & Tracking Technologies
                  </h4>
                  <p>
                    Our web portal uses high-efficiency browser cookies to remember active shopping cart inventories, save preferences, and analyze anonymized visitor behavior. Disabling cookies via browser preferences may limit certain customizer features.
                  </p>
                </div>

                {/* Sec 5 */}
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">5.</span> Sharing of Information
                  </h4>
                  <p>
                    We do not sell, rent, or trade customer personal information. Information is strictly shared with certified logistics partners (shipping networks), processing payment systems, and legal compliance structures under strict NDAs.
                  </p>
                </div>

                {/* Sec 6 */}
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">6.</span> Data Protection Protocols
                  </h4>
                  <p>
                    We implement physical, technical, and logistical firewalls to secure database elements from unauthorized leakage, alteration, or external exposure.
                  </p>
                </div>

                {/* Sec 7 */}
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">7.</span> Customer Rights
                  </h4>
                  <p>Customers maintain full governance of their personal datasets:</p>
                  <ul className="list-disc list-inside pl-4 space-y-1 text-gray-500 text-xs">
                    <li>Right to access personal profiles and transaction records</li>
                    <li>Right to request immediate correction of mismatched shipping coordinates</li>
                    <li>Right to request permanent deletion of datasets ("Right to be Forgotten")</li>
                    <li>Right to opt-out of promotional drop messages</li>
                  </ul>
                </div>

                {/* Sec 8, 9, 10 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 text-gray-500 text-xs">
                  <div>
                    <h5 className="text-white font-bold mb-1 uppercase text-[10px] tracking-wider">8. Third-Party Links</h5>
                    <p>We are not responsible for the contents or privacy policies of linked external shipping websites.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-1 uppercase text-[10px] tracking-wider">9. Children's Privacy</h5>
                    <p>Our platform does not knowingly collect datasets from children under the age of 13.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-1 uppercase text-[10px] tracking-wider">10. Policy Changes</h5>
                    <p>We reserve rights to modify this policy. Continued usage constitutes acceptance of amendments.</p>
                  </div>
                </div>

                {/* Sec 11 - Contact Info Card */}
                <div className="border-t border-white/5 pt-6 space-y-3">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">11.</span> Contact Information
                  </h4>
                  <div className="glass-panel p-5 rounded-2xl bg-white/2 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex gap-2.5 items-start">
                      <Mail className="w-4 h-4 text-[#bd922b] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white text-[10px] font-black uppercase">Email Registry</p>
                        <p className="text-[#bd922b] text-[11px] font-semibold mt-0.5">7.10houseonline@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <MapPin className="w-4 h-4 text-[#bd922b] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white text-[10px] font-black uppercase">HQ Address</p>
                        <p className="text-gray-300 text-[11px] font-semibold mt-0.5 leading-tight">85 Broad St, Suite 400, NY, USA</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            // ── TERMS & CONDITIONS CONTENT ──
            <div className="space-y-8 text-gray-400 text-xs sm:text-sm leading-relaxed">
              
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <BookOpen className="w-6 h-6 text-[#bd922b]" />
                <h3 className="text-white font-black text-lg uppercase tracking-wider">Terms & Conditions</h3>
              </div>

              <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider font-extrabold italic">
                By accessing or using the 7.10 HOUSE web portal, you agree to comply with and be bound by these official Terms & Conditions.
              </p>

              <div className="space-y-6">
                
                {/* Sec 1 */}
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">1.</span> Acceptance of Terms
                  </h4>
                  <p>
                    By navigating, visiting, browsing, or triggering transactional actions on our web portal, you explicitly validate that you comply with these terms, legal guidelines, and all applicable global commerce laws.
                  </p>
                </div>

                {/* Sec 2 & 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                      <span className="text-[#bd922b]">2.</span> Products & Availability
                    </h4>
                    <p>
                      All premium retro football jerseys, custom catalog selections, and tournament wear are subject to local supply limits and factory calibration schedules. We reserve all rights to adjust or cease product dispatches without warnings.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                      <span className="text-[#bd922b]">3.</span> Pricing Registry
                    </h4>
                    <p>
                      Display values across categories are subject to real-time updates based on logistical parameters and currency rates. We maintain authority to cancel orders resulting from database indexing errors.
                    </p>
                  </div>
                </div>

                {/* Sec 4 */}
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">4.</span> Orders & Payment Processes
                  </h4>
                  <p>
                    Orders enter custom preparation queues strictly upon successful transactional confirmation. We reserve the absolute right to freeze or nullify orders flagged as suspicious, high-risk, or fraudulent by secure verification gateways. Customers are obligated to supply correct billing information.
                  </p>
                </div>

                {/* Sec 5 */}
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">5.</span> Shipping & Delivery Policies
                  </h4>
                  <p>
                    Dispatched timeframes represent standard estimates and are subject to courier shifts, customs clearance, and global transportation interruptions. The customer is fully liable to supply exact shipping addresses.
                  </p>
                </div>

                {/* Sec 6 - Highlight Custom Jersey Non-Returnable */}
                <div className="glass-panel p-5 rounded-2xl border border-[#bd922b]/20 bg-[#bd922b]/3 space-y-3">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#bd922b] animate-pulse" />
                    6. Returns, Exchange, & Customized Jerseys Clause
                  </h4>
                  <p className="text-xs text-gray-300">
                    Returns are accepted within 30 days of shipment, provided the kit remains completely unused, unwashed, and retains all original tags. 
                  </p>
                  <p className="text-[11px] text-[#bd922b] font-black uppercase">
                    ⚠️ IMPORTANT CLAUSE: Customized retro jerseys (featuring personalized custom names, player names, or heat-pressed squad numbers) are uniquely prepared and are NOT eligible for returns, size exchanges, or refunds under any conditions, unless verified to contain a physical manufacturing defect upon receipt.
                  </p>
                </div>

                {/* Sec 7 */}
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#bd922b]">7.</span> Intellectual Property Rights
                  </h4>
                  <p>
                    All visual graphics, layout interfaces, digital specs, canvas customizer systems, banners, and textual elements on our website are intellectual assets of 7.10 HOUSE APPAREL INC. and are fully guarded by corporate trademark and design acts.
                  </p>
                </div>

                {/* Sec 8, 9, 10 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5 text-gray-500 text-xs">
                  <div>
                    <h5 className="text-white font-bold mb-1 uppercase text-[10px] tracking-wider">8. User Conduct</h5>
                    <p>Users must not upload malicious payloads, attack database schemas, or use transactional features for money laundering.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-1 uppercase text-[10px] tracking-wider">9. Limitation of Liability</h5>
                    <p>7.10 HOUSE is not liable for indirect loss, courier shipping delays, color fading from improper washing, or site downtime.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-1 uppercase text-[10px] tracking-wider">10. Governing Law</h5>
                    <p>These terms and all related purchase disputes are strictly governed by and interpreted under the laws of India.</p>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default PrivacyTerms;
