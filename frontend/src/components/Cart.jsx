import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import TransparentProductImage from './TransparentProductImage';
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, CheckCircle } from 'lucide-react';
import { getBackendBaseUrl } from '../utils/config';

const formatImageLink = (url) => {
  if (!url) return '';
  const raw = url.split(/,(?=data:|https?:|\/media)/)[0] || '';
  if (raw.startsWith('data:') || raw.startsWith('blob:')) {
    return '[Custom Uploaded Jersey]';
  }
  
  let absoluteUrl = '';
  if (raw.startsWith('http')) {
    absoluteUrl = raw;
  } else if (raw.startsWith('/media/')) {
    absoluteUrl = `${getBackendBaseUrl()}${raw}`;
  } else {
    absoluteUrl = `${window.location.origin}${raw}`;
  }

  // Force local hosts to resolve to production domain so WhatsApp links are publicly viewable
  return absoluteUrl
    .replace('http://127.0.0.1:8000', 'https://seven-10-house.onrender.com')
    .replace('http://localhost:8000', 'https://seven-10-house.onrender.com')
    .replace('http://localhost:5173', 'https://seven-10-house.onrender.com');
};

const Cart = () => {
  const { 
    cart, 
    cartOpen, 
    setCartOpen, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal, 
    clearCart,
    formatPrice
  } = useShop();

  const [checkoutStatus, setCheckoutStatus] = useState('idle'); // 'idle', 'processing', 'success'

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStatus('processing');
    
    // Construct WhatsApp order details message
    const orderItemsText = cart.map((item, idx) => {
      const customText = item.isCustom 
        ? `\n    └─ Customization: *${item.customDetails?.name} #${item.customDetails?.number}*` 
        : '';
      
      const imageUrls = item.product.image_url?.split(/,(?=data:|https?:|\/media)/) || [];
      const imageLinksText = imageUrls.map((url, i) => {
        const formatted = formatImageLink(url);
        const label = i === 0 ? 'Front' : i === 1 ? 'Back' : `View ${i + 1}`;
        return `*${label}:* ${formatted}`;
      }).join(', ');

      return `${idx + 1}. *${item.product.name}*\n    ├─ Size: *${item.size}*\n    ├─ Qty: *${item.quantity}*\n    ├─ Price: *${formatPrice(item.product.price * item.quantity)}* (${formatPrice(item.product.price)} each)${customText}\n    └─ Images: ${imageLinksText}`;
    }).join('\n\n');

    const totalAmount = formatPrice(getCartTotal());

    const messageText = [
      `🛒 *SECURE PREMIUM CHECKOUT — 7.10 HOUSE*`,
      ``,
      `👋 Hello! I would like to place an order for the following elite items:`,
      ``,
      orderItemsText,
      ``,
      `💳 *ORDER SUMMARY:*`,
      `├─ Subtotal: *${totalAmount}*`,
      `├─ Premium Shipping: *FREE*`,
      `└─ *Total Amount:* *${totalAmount}*`,
      ``,
      `Please verify availability and share payment/delivery instructions. Thank you! 🙏`,
    ].join('\n');

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918072579303&text=${encodedText}`;

    // Establish secure connection and then redirect to WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setCheckoutStatus('success');
      setTimeout(() => {
        clearCart();
        setCartOpen(false);
        setCheckoutStatus('idle');
      }, 3500);
    }, 2000);
  };

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500"
        onClick={() => checkoutStatus === 'idle' && setCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md transform transition-all duration-500 ease-in-out">
          
          {/* Main drawer container */}
          <div className="h-full flex flex-col bg-[#090A0F]/95 backdrop-blur-xl border-l border-white/5 shadow-2xl relative">
            
            {/* Header */}
            <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#bd922b]" />
                <h2 className="text-base font-extrabold uppercase tracking-wider text-white">
                  Shopping Bag
                </h2>
              </div>
              <button 
                onClick={() => setCartOpen(false)}
                disabled={checkoutStatus !== 'idle'}
                className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="grow overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-20">
                  <ShoppingBag className="w-12 h-12 text-gray-700 mb-4 animate-pulse" />
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-600">Your bag is empty</p>
                  <p className="text-xs text-gray-600 mt-1 max-w-[200px]">Add authentic kits from our collection to begin.</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div 
                    key={`${item.product.id}-${item.size}-${item.isCustom ? 'custom' : 'regular'}-${idx}`}
                    className="glass-panel p-4 rounded-xl border border-white/5 flex gap-4 items-center justify-between"
                  >
                    
                    {/* Item Image */}
                    <div className="w-16 h-16 bg-white/3 rounded-lg overflow-hidden flex items-center justify-center p-2 border border-white/5">
                      <TransparentProductImage 
                        src={item.product.image_url?.split(/,(?=data:|https?:|\/media)/)[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-contain filter drop-shadow-md" 
                      />
                    </div>

                    {/* Item Details */}
                    <div className="grow">
                      <h4 className="text-white font-extrabold text-xs uppercase tracking-tight leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-1.5 py-0.5 bg-white/5 text-[9px] font-bold text-gray-400 rounded uppercase">
                          Size {item.size}
                        </span>
                        
                        {item.isCustom && (
                        <span className="px-1.5 py-0.5 bg-linear-to-r from-[#bd922b]/20 to-[#E3C488]/20 border border-[#bd922b]/25 text-[8px] font-black text-[#bd922b] rounded uppercase flex items-center gap-0.5 animate-pulse">
                            <Sparkles className="w-2.5 h-2.5" />
                            {item.customDetails?.name} #{item.customDetails?.number}
                          </span>
                        )}
                      </div>

                      <p className="text-white font-black text-xs mt-2">{formatPrice(item.product.price)}</p>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex flex-col items-end justify-between gap-3">
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size, item.isCustom)}
                        className="text-gray-600 hover:text-rose-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center bg-white/5 rounded-lg border border-white/5 p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.isCustom, -1)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-[10px] font-extrabold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.isCustom, 1)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Footer Pricing Summary */}
            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-white/5 bg-[#07080c] space-y-4">
                
                <div className="space-y-1.5 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Premium Shipping</span>
                    <span className="text-emerald-400 font-bold uppercase">Free</span>
                  </div>
                  <div className="flex justify-between text-sm font-black border-t border-white/5 pt-3 mt-1 text-white">
                    <span className="uppercase">Total Amount</span>
                    <span className="text-neon-gold">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkoutStatus !== 'idle'}
                  className="w-full py-4 bg-linear-to-r from-[#bd922b] to-[#E3C488] text-black font-black text-xs uppercase rounded-xl tracking-widest hover:scale-[1.01] transition-all shadow-xl shadow-[#bd922b]/10"
                >
                  {checkoutStatus === 'idle' && 'SECURE PREMIUM CHECKOUT'}
                  {checkoutStatus === 'processing' && 'PROCESSING TRANSACTION...'}
                </button>

              </div>
            )}

            {/* Checkout state animations overlay */}
            {checkoutStatus !== 'idle' && (
              <div className="absolute inset-0 bg-[#06070a]/95 flex flex-col items-center justify-center text-center p-6 z-20 animate-fadeIn">
                {checkoutStatus === 'processing' && (
                  <>
                    <div className="w-12 h-12 rounded-full border-4 border-[#bd922b]/30 border-t-[#bd922b] animate-spin mb-4" />
                    <h3 className="text-white text-base font-black uppercase tracking-widest animate-pulse">
                      Connecting to WhatsApp
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">Establishing secure link for your premium order...</p>
                  </>
                )}
                {checkoutStatus === 'success' && (
                  <div className="animate-fadeIn flex flex-col items-center">
                    <CheckCircle className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                    <h3 className="text-white text-lg font-black uppercase tracking-tight">
                      Order Sent via WhatsApp!
                    </h3>
                    <p className="text-[#bd922b] font-extrabold text-[10px] tracking-widest uppercase mt-1 animate-pulse">
                      Get ready for the pitch
                    </p>
                    <p className="text-gray-400 text-xs mt-3 max-w-[240px]">
                      Your elite custom kit order has been prepared. Please complete the purchase on WhatsApp.
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};

export default Cart;
