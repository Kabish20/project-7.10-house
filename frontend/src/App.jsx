import Header from './components/Header';
import Hero from './components/Hero';
import Store from './components/Store';
import About from './components/About';
import Contact from './components/Contact';
import ProductDetail from './components/ProductDetail';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import { ShopProvider, useShop } from './context/ShopContext';
import { ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const MainLayout = () => {
  const { activeView } = useShop();

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      
      {/* Dynamic View Panel Renderer */}
      <main className="grow overflow-hidden">
        <div key={activeView} className="animate-page-transition">
          {activeView === 'hero' && <Hero />}
          {activeView === 'store' && <Store />}
          {activeView === 'about' && <About />}
          {activeView === 'contact' && <Contact />}
          {activeView === 'product-detail' && <ProductDetail />}
          {activeView === 'admin' && <AdminDashboard />}
        </div>
      </main>

      {/* Infinite Horizontal Brand Ticker (Image 3 Inspired Sponsor Band) */}
      <section className="bg-[#050609] border-y border-white/5 py-10 overflow-hidden relative select-none">
        <div className="flex w-[200%] gap-12 items-center animate-marquee whitespace-nowrap">
          {/* Ticker Items (Printed twice to enable seamless loops) */}
          <div className="flex gap-20 justify-around items-center w-1/2 text-gray-500 font-extrabold text-sm tracking-[0.2em] uppercase">
            <span className="hover:text-white transition-colors duration-300">NIKE FOOTBALL</span>
            <span className="hover:text-white transition-colors duration-300">ADIDAS PERFORMANCE</span>
            <span className="hover:text-white transition-colors duration-300">PUMA KING</span>
            <span className="hover:text-white transition-colors duration-300">EA SPORTS FC</span>
            <span className="hover:text-white transition-colors duration-300">PEPSI MAX</span>
            <span className="hover:text-white transition-colors duration-300">COCA-COLA COPA</span>
          </div>
          <div className="flex gap-20 justify-around items-center w-1/2 text-gray-500 font-extrabold text-sm tracking-[0.2em] uppercase">
            <span className="hover:text-white transition-colors duration-300">NIKE FOOTBALL</span>
            <span className="hover:text-white transition-colors duration-300">ADIDAS PERFORMANCE</span>
            <span className="hover:text-white transition-colors duration-300">PUMA KING</span>
            <span className="hover:text-white transition-colors duration-300">EA SPORTS FC</span>
            <span className="hover:text-white transition-colors duration-300">PEPSI MAX</span>
            <span className="hover:text-white transition-colors duration-300">COCA-COLA COPA</span>
          </div>
        </div>
      </section>

      {/* Trust Badges Banner */}
      <section className="bg-[#06070a] border-b border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5">
            <ShieldCheck className="w-8 h-8 text-[#bd922b] shrink-0" />
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider">Premium Quality Guaranteed</h5>
              <p className="text-gray-500 text-[10px] mt-1">Officially engineered high-density breathable fabrics and double-stitched crest embroidery.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5">
            <Truck className="w-8 h-8 text-[#bd922b] shrink-0" />
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider">Express Worldwide Delivery</h5>
              <p className="text-gray-500 text-[10px] mt-1">Enjoy global courier services with tracking dispatches directly to your inbox.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5">
            <RefreshCw className="w-8 h-8 text-[#bd922b] shrink-0" />
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider">Hassle-Free Returns</h5>
              <p className="text-gray-500 text-[10px] mt-1">100% money-back guarantee with a streamlined 30-day exchange window policy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7.10 House Premium Footer */}
      <footer className="bg-[#040507] pt-16 pb-8 px-6 border-t border-white/5 text-gray-500 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Info */}
          <div>
            <h4 className="text-white font-black tracking-widest text-sm uppercase mb-4">
              7.10<span className="text-[#bd922b]"> HOUSE</span>
            </h4>
            <p className="text-gray-500 leading-relaxed mb-4 text-[11px]">
              The world's premium portal for high-definition authentic retro football jerseys, vintage collectibles, and fully personalized sports wear.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Twitter / X">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Instagram">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Youtube">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Github">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-white font-extrabold uppercase tracking-wider text-xs mb-4">Store Collections</h5>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#" className="hover:text-white transition-colors">Euro 2024 Championship Kits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Copa America 2024 National Kits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Retro Legends Collectibles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training Apparel & Tracksuits</a></li>
            </ul>
          </div>

          {/* Column 3: Club Services Info */}
          <div>
            <h5 className="text-white font-extrabold uppercase tracking-wider text-xs mb-4">Club Services</h5>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#" className="hover:text-white transition-colors">Official Sizing Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Authentic Badge Care</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Express Delivery Details</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Replacements</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h5 className="text-white font-extrabold uppercase tracking-wider text-xs mb-4">7.10 House Newsletter</h5>
            <p className="text-gray-500 mb-3 text-[11px]">Subscribe to unlock early access to retro drop launches and private sales.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-white/5 border border-white/5 focus:border-[#bd922b]/20 px-3 py-2 rounded-xl text-white text-xs outline-none w-full placeholder-gray-600"
              />
              <button className="bg-linear-to-r from-[#bd922b] to-[#E3C488] text-black font-extrabold px-4 rounded-xl text-[10px] uppercase tracking-wider">Join</button>
            </div>
          </div>

        </div>

        {/* Copy Deck */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center text-[10px]">
          <p>© 2026 7.10 HOUSE APPAREL INC. DEVELOPED UNDER PROFESSIONAL AUDITING STANDARDS.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY TERMS</a>
            <a href="#" className="hover:text-white transition-colors">SALES POLICY</a>
            <a href="#" className="hover:text-white transition-colors">SUPPORT DESK</a>
          </div>
        </div>

      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919003878494?text=Hello%207.10%20House!%20I'm%20interested%20in%20ordering%20a%20jersey."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group flex items-center justify-center border border-white/10 hover:shadow-[#25D366]/40"
        aria-label="Chat on WhatsApp"
      >
        <svg 
          className="w-7 h-7 fill-current drop-shadow-md"
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.257 1.875 13.777.844 11.15.845c-5.448 0-9.88 4.417-9.885 9.866-.001 1.745.467 3.447 1.353 4.966L1.65 21.957l6.597-1.73zM17.13 15.34c-.287-.144-1.696-.838-1.959-.933-.263-.096-.454-.144-.645.144-.19.287-.736.933-.903 1.122-.167.19-.335.216-.622.072-2.828-1.415-4.665-2.73-6.524-5.922-.167-.287-.013-.443.13-.586.13-.13.287-.335.43-.502.144-.167.19-.287.287-.478.096-.191.048-.36-.024-.502-.072-.143-.645-1.554-.884-2.128-.233-.56-.47-.482-.645-.491-.167-.008-.358-.01-.55-.01s-.502.072-.765.358c-.263.287-1.004.981-1.004 2.392s1.028 2.774 1.171 2.965c.143.19 2.023 3.09 4.901 4.33.684.295 1.218.471 1.634.603.687.218 1.312.187 1.808.113.553-.083 1.696-.693 1.936-1.362.24-.669.24-1.242.167-1.362-.072-.12-.263-.19-.55-.335z"/>
        </svg>
        {/* Tooltip */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 bg-black/85 text-white font-extrabold text-[10px] uppercase tracking-wider py-2 px-3.5 rounded-xl border border-white/5 whitespace-nowrap shadow-xl shadow-black pointer-events-none">
          Secure VIP Live Chat
        </span>
      </a>

    </div>
  );
};

function App() {
  return (
    <ShopProvider>
      <Header />
      <MainLayout />
      <Cart />
    </ShopProvider>
  );
}

export default App;
