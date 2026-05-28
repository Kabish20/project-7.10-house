import { useShop } from '../context/ShopContext';
import { 
  Tag, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  Users, 
  Mail, 
  ArrowLeft, 
  ShieldCheck, 
  DollarSign, 
  XCircle 
} from 'lucide-react';

const SalesPolicy = () => {
  const { setActiveView } = useShop();

  return (
    <div className="relative min-h-screen bg-[#07080d] pt-40 pb-20 px-6 md:px-12 select-none overflow-hidden">
      
      {/* Background radial soft glows */}
      <div className="absolute top-[10%] left-[-15%] w-[50%] aspect-square rounded-full bg-radial-gradient from-[#bd922b]/5 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[50%] aspect-square rounded-full bg-radial-gradient from-blue-500/5 to-transparent blur-[130px] pointer-events-none" />

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

        {/* Cinematic Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-black tracking-widest text-[#bd922b] uppercase block animate-pulse">
            7.10 HOUSE STORE DIRECTIVE
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
            SALES & DISPATCH <span className="text-[#bd922b]">POLICY</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Welcome to 7.10 HOUSE APPAREL INC. This Sales Policy outlines the terms related to purchasing products from our online football jersey store. By placing an order, you agree to the policies mentioned below.
          </p>
        </div>

        {/* Core Sales Policy Panel */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/5 bg-[#090b11]/70 shadow-2xl animate-page-transition space-y-8 text-gray-400 text-xs sm:text-sm leading-relaxed">
          
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <DollarSign className="w-6 h-6 text-[#bd922b]" />
            <h3 className="text-white font-black text-lg uppercase tracking-wider">Sales & Transactional Terms</h3>
          </div>

          <div className="space-y-6">

            {/* Sec 1 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#bd922b]" />
                1. Product Information & Disclosures
              </h4>
              <p>We strive to ensure that all product descriptions, images, sizes, and prices displayed on our website are highly accurate. However:</p>
              <ul className="list-disc list-inside pl-4 space-y-1 text-gray-500 text-xs">
                <li>Colors and weave contrasts may vary slightly due to screen resolutions.</li>
                <li>Product availability is subject to physical stocks and fabric allocations.</li>
                <li>Minor design or embroidery variations may occur on vintage re-issues.</li>
              </ul>
            </div>

            {/* Sec 2 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="text-[#bd922b] font-black">₹</span>
                2. Pricing Policy
              </h4>
              <p>
                All product listings and valuations are compiled in **Indian Rupees (INR - ₹)**. Prices are subject to logistics updates without prior warning. Applicable taxes and delivery charges will be transparently detailed at checkout. We reserve the absolute right to correct price indexing errors.
              </p>
            </div>

            {/* Sec 3 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#bd922b]" />
                3. Order Confirmation
              </h4>
              <p>
                Orders enter custom preparation queues strictly upon successful payment clearance. Confirmation records are instantly dispatched to your designated email or contact coordinates. We reserve the right to freeze or cancel orders suspected of unauthorized or high-risk activity.
              </p>
            </div>

            {/* Sec 4 - Highlighting Secure Gateway & Payment Methods */}
            <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
              <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                4. Secure Payment Solutions
              </h4>
              <p className="text-xs text-gray-300">
                All digital transactions are processed through leading secure payment gateways with high-grade TLS encryption. Supported channels include:
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold text-emerald-400">
                <span className="px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">Unified Payments Interface (UPI)</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">Debit/Credit Cards</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">Net Banking</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">Wallet Systems</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">Cash on Delivery (COD)</span>
              </div>
            </div>

            {/* Sec 5 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#bd922b]" />
                5. Shipping & Delivery Policy
              </h4>
              <p>
                Orders are processed and custom-prepared within **1–3 business days**. Final delivery dispatch timelines may vary depending on locations, customs, and courier networks. Customers are responsible for providing exact shipping addresses. 7.10 HOUSE is not liable for delayed dispatches caused by logistics services or uncontrollable events.
              </p>
            </div>

            {/* Sec 6 & 7 - Return, Exchange, & Refund Clause */}
            <div className="glass-panel p-5 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-3">
              <h4 className="text-red-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-red-400" />
                6. Return, Exchange, & Refund Policies
              </h4>
              <p className="text-xs text-gray-300">
                Products are eligible for returns or size exchanges within **7 days** of receipt, provided the jersey remains unwashed, unused, contains all original tags, and is returned in pristine factory packaging.
              </p>
              <ul className="list-disc list-inside pl-4 text-xs text-gray-400 space-y-1">
                <li>Returns are processed for damaged/defective jerseys or incorrect item delivery.</li>
                <li>Refund credits are issued within **5–10 business days** back to your original payment channel.</li>
                <li className="text-[#bd922b] font-black uppercase">
                  ⚠️ CUSTOMIZED JERSEY CLAUSE: Retro jerseys customized with unique squad numbers or personalized name letters cannot be returned or exchanged under any circumstance unless a verified physical defect is present upon delivery.
                </li>
              </ul>
            </div>

            {/* Sec 8 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#bd922b]" />
                8. Order Cancellation Policy
              </h4>
              <p>
                Active orders may be canceled prior to dispatch confirmation, triggering an immediate refund queue. Once orders have been shipped and handed to logistics networks, cancellation requests cannot be accepted.
              </p>
            </div>

            {/* Sec 9 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="text-[#bd922b] font-black">%</span>
                9. Promotional Offers & Coupons
              </h4>
              <p>
                Coupon codes and promotional discounts must be applied at the time of purchase and are subject to validation limits. Only one active promo code may be applied per individual transaction unless stated otherwise.
              </p>
            </div>

            {/* Sec 10 - Bulk orders */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-[#bd922b]" />
                10. Bulk & Custom Teamwear Orders
              </h4>
              <p>
                For amateur clubs, corporate tournaments, or custom group jersey dispatches:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1 text-gray-500 text-xs">
                <li>Special high-volume group pricing applies.</li>
                <li>Advance payments may be required to schedule manufacturing.</li>
                <li>Timeline parameters differ from standard consumer retail items.</li>
              </ul>
            </div>

            {/* Sec 11 & 12 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">11. Customer Responsibility</h4>
                <p className="text-gray-500">
                  Customers agree to supply exact transactional coordinates, thoroughly audit order items at checkout, and handle delicate screen-printed retro crests and numbers in accordance with official lab guides.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">12. Limitation of Liability</h4>
                <p className="text-gray-500">
                  7.10 HOUSE APPAREL INC. is not liable for indirect damages, customs delays, product deterioration caused by washing guide negligence, or temporary site offline instances.
                </p>
              </div>
            </div>

            {/* Sec 13 - Contact Details */}
            <div className="border-t border-white/5 pt-6 space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#bd922b]" />
                13. Support & Sales Desk Coordinates
              </h4>
              <div className="glass-panel p-5 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-center">
                <div className="flex gap-2.5 items-start">
                  <Mail className="w-4.5 h-4.5 text-[#bd922b] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-[10px] font-black uppercase">Sales Enquiry email</p>
                    <p className="text-[#bd922b] text-[11px] font-semibold mt-0.5">7.10houseonline@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SalesPolicy;
