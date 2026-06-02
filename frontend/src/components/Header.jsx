import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Search, ShieldAlert, Menu, X } from 'lucide-react';
import logo from '../logo/logo.png';

const Header = () => {
  const { activeView, setActiveView, setCartOpen, getCartCount } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', name: 'Showcase' },
    { id: 'store', name: 'Collection' },
    { id: 'about', name: 'About Us' },
    { id: 'contact', name: 'Contact Us' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#06070a]/65 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-24 md:h-32 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer group shrink-0"
          onClick={() => {
            setActiveView('hero');
            setIsMobileMenuOpen(false);
          }}
        >
          <img 
            src={logo} 
            alt="7.10 House Logo" 
            className="h-16 sm:h-20 md:h-28 w-auto object-contain group-hover:scale-105 transition-all duration-300 drop-shadow-[0_4px_24px_rgba(197,160,89,0.4)]"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`relative py-2 text-sm font-semibold tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] animate-fadeIn" style={{ backgroundImage: 'linear-gradient(to right, #00662f, #e30a17, #75aadb, #bd922b)' }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          <button
            onClick={() => {
              setActiveView('admin');
              setIsMobileMenuOpen(false);
            }}
            className={`hidden md:block p-2 relative group transition-colors cursor-pointer ${activeView === 'admin' ? 'text-[#bd922b]' : 'text-gray-400 hover:text-white'}`}
            title="Admin Dashboard Portal"
          >
            <ShieldAlert className="w-5 h-5 group-hover:scale-105 transition-all" />
          </button>

          <button 
            onClick={() => {
              setActiveView('store');
              setIsMobileMenuOpen(false);
            }}
            className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => {
              setCartOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="p-2 text-gray-400 hover:text-white relative group transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5.5 h-5.5 text-gray-300 group-hover:text-white group-hover:scale-105 transition-all" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-linear-to-r from-[#bd922b] to-[#E3C488] text-black font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-black">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Hamburger Menu Toggle (Mobile only) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors md:hidden focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 animate-fadeIn" />
            ) : (
              <Menu className="w-6 h-6 animate-fadeIn" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Sliding Navigation Menu (Premium overlay) */}
      <div 
        className={`fixed inset-x-0 top-[96px] md:hidden bg-[#06070a]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ease-in-out z-30 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[350px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-5 px-6">
          {navLinks.map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveView(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full py-2.5 text-center text-xs font-bold tracking-widest uppercase transition-all rounded-xl relative overflow-hidden cursor-pointer ${
                  isActive 
                    ? 'text-white bg-white/5 border border-white/10 shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px]" style={{ backgroundImage: 'linear-gradient(to right, #00662f, #e30a17, #75aadb, #bd922b)' }} />
                )}
              </button>
            );
          })}
          
          {/* Staff Portal Link (Mobile only) */}
          <button
            onClick={() => {
              setActiveView('admin');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full py-2.5 text-center text-xs font-bold tracking-widest uppercase transition-all rounded-xl relative overflow-hidden cursor-pointer flex items-center justify-center gap-2 ${
              activeView === 'admin' 
                ? 'text-[#bd922b] bg-white/5 border border-white/10 shadow-lg' 
                : 'text-gray-400 hover:text-white/80'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Staff Portal
          </button>
        </nav>
      </div>

      {/* Mobile Menu Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 top-[96px] bg-black/60 backdrop-blur-sm z-20 md:hidden animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
