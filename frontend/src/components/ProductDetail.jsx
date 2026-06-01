import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import TransparentProductImage from './TransparentProductImage';
import { ShoppingBag, ArrowLeft, Plus, Minus, Ruler } from 'lucide-react';
import { getBackendBaseUrl } from '../utils/config';

const formatImageLink = (url) => {
  if (!url) return '';
  const raw = url.split(/,(?=data:|https?:|\/media)/)[0] || '';
  if (raw.startsWith('data:') || raw.startsWith('blob:')) {
    return '[Custom Uploaded Jersey]';
  }
  if (raw.startsWith('http')) {
    return raw;
  }
  if (raw.startsWith('/media/')) {
    return `${getBackendBaseUrl()}${raw}`;
  }
  return `${window.location.origin}${raw}`;
};

const getProductDetails = (product) => {
  if (!product) return [];
  if (product.details && Array.isArray(product.details) && product.details.length > 0) {
    return product.details;
  }
  const name = product.name.toLowerCase();
  
  if (name.includes('barcelona') || name.includes('barca')) {
    return [
      'PLAYER: MESSI',
      'SLIM FIT',
      'VAPORKNIT MATERIAL',
      'CREW NECK & SHORT SLEEVE & HEAT-APPLIED SHIELD'
    ];
  }
  if (name.includes('inter milan') || name.includes('inter')) {
    return [
      'PLAYER: ICARDI',
      'SLIM FIT',
      'DRI-FIT MATERIAL',
      'NERAZZURRI EMBROIDERY & SHORT SLEEVE'
    ];
  }
  if (name.includes('argentina')) {
    return [
      'PLAYER: MESSI',
      'SLIM FIT',
      'HEAT.RDY MATERIAL',
      'THREE STARS EMBROIDERY & SHORT SLEEVE'
    ];
  }
  if (name.includes('portugal')) {
    return [
      'PLAYER: RONALDO',
      'SLIM FIT',
      'DRI-FIT MATERIAL',
      'CRIMSON GREEN PIPING & SHORT SLEEVE'
    ];
  }
  if (name.includes('brazil') || name.includes('brasil')) {
    return [
      'PLAYER: VINICIUS JR.',
      'SLIM FIT',
      'DRI-FIT ADV MATERIAL',
      'SAMBA EMBOSSED PATTERN & SHORT SLEEVE'
    ];
  }
  if (name.includes('real madrid') || name.includes('madrid')) {
    return [
      'PLAYER: RONALDO',
      'REGULAR FIT',
      'DOTKNIT MATERIAL',
      'POLO & FULL SLEEVE & EMBROIDERY'
    ];
  }
  if (name.includes('al-nassr') || name.includes('nassr')) {
    return [
      'PLAYER: RONALDO',
      'SLIM FIT',
      'DRI-FIT MATERIAL',
      'GOLD EMBOSSED PANEL & SHORT SLEEVE'
    ];
  }
  if (name.includes('arsenal')) {
    return [
      'PLAYER: HENRY',
      'REGULAR FIT',
      'HERITAGE MESH MATERIAL',
      'REDCURRANT COLLAR & GOLD EMBROIDERY'
    ];
  }
  if (name.includes('manchester united') || name.includes('united')) {
    return [
      'PLAYER: BECKHAM',
      'REGULAR FIT',
      'RETRO POLY MATERIAL',
      'ZIP-NECK POLO & FULL SLEEVE & EMBROIDERY'
    ];
  }
  if (name.includes('france')) {
    return [
      'PLAYER: MBAPPÉ',
      'ATHLETIC FIT',
      'DRI-FIT ADV MATERIAL',
      'GIANT ROOSTER EMBROIDERY & SHORT SLEEVE'
    ];
  }
  if (name.includes('germany')) {
    return [
      'PLAYER: KROOS',
      'SLIM FIT',
      'HEAT.RDY MATERIAL',
      'FLAME PATTERN DECK & SHORT SLEEVE'
    ];
  }
  
  return [
    'PLAYER: OFFICIAL VIP',
    'REGULAR FIT',
    'PREMIUM POLYESTER MATERIAL',
    'EMBROIDERED EMBLEM & SHORT SLEEVE'
  ];
};

const ProductDetail = () => {
  const { activeHeroProduct, setActiveView, addToCart, setCartOpen, formatPrice } = useShop();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [adding, setAdding] = useState(false);

  if (!activeHeroProduct) {
    return (
      <div className="min-h-screen bg-[#07080d] pt-40 pb-20 flex flex-col items-center justify-center text-center">
        <p className="text-gray-500">No product selected.</p>
        <button 
          onClick={() => setActiveView('store')}
          className="mt-4 px-6 py-2 bg-white/5 border border-white/10 text-white rounded-xl"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const handleQtyChange = (val) => {
    if (quantity + val < 1) return;
    setQuantity(quantity + val);
  };

  const handleAddToCart = () => {
    setAdding(true);
    // Add quantity directly to context in a single batched operation
    addToCart(activeHeroProduct, selectedSize, false, null, quantity);
    setTimeout(() => {
      setAdding(false);
      setCartOpen(true);
    }, 800);
  };

  const handleWhatsAppEnquire = () => {
    const details = getProductDetails(activeHeroProduct);
    const detailLines = details.map((d) => `  • ${d}`).join('\n');

    // Build image link — use absolute URL if it's a relative path
    const imageLink = formatImageLink(activeHeroProduct.image_url);

    const messageText = [
      `🛒 *ORDER ENQUIRY — 7.10 HOUSE*`,
      ``,
      `📌 *Product:* ${activeHeroProduct.name}`,
      `🖼️ *Image:* ${imageLink}`,
      ``,
      `📋 *Product Details:*`,
      detailLines,
      ``,
      `💰 *Price:* ${formatPrice(activeHeroProduct.price * quantity)}${quantity > 1 ? ` (${formatPrice(activeHeroProduct.price)} each)` : ''}`,
      `📐 *Fitting Size:* ${selectedSize}`,
      `🔢 *Quantity:* ${quantity}`,
      ``,
      `Please confirm VIP availability and share payment details. Thank you! 🙏`,
    ].join('\n');

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918072579303&text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };



  return (
    <div className="relative min-h-screen bg-[#07080d] pt-40 pb-20 px-6 md:px-12 select-none overflow-hidden">
      
      {/* Background Soft Ambient Light */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] aspect-square rounded-full bg-radial-gradient from-[#bd922b]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] aspect-square rounded-full bg-radial-gradient from-blue-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Back navigation bar */}
        <button 
          onClick={() => {
            setActiveView('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-gray-400 hover:text-white font-extrabold text-xs uppercase tracking-wider transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Collection
        </button>

        {/* Core Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left half: Split Display Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Column 1: Front View */}
            <div className="glass-panel rounded-3xl overflow-hidden aspect-3/4 flex items-center justify-center p-8 border border-white/5 relative bg-[#090b11]/70 group">
              <div className="absolute top-4 left-4 z-10 px-2.5 py-0.5 bg-black/65 text-[#bd922b] text-[8px] font-black tracking-widest rounded-md uppercase border border-[#bd922b]/20">
                Front View
              </div>
              <TransparentProductImage 
                src={activeHeroProduct.image_url?.split(/,(?=data:|https?:|\/media)/)[0]} 
                alt={`${activeHeroProduct.name} Front View`} 
                className="w-[90%] object-contain group-hover:scale-103 transition-transform duration-500"
                style={{
                  filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.8))'
                }}
              />
            </div>

            {/* Column 2: Back View */}
            <div className="glass-panel rounded-3xl overflow-hidden aspect-3/4 flex items-center justify-center p-8 border border-white/5 relative bg-[#0a0c14]/70 group">
              <div className="absolute top-4 left-4 z-10 px-2.5 py-0.5 bg-black/65 text-gray-400 text-[8px] font-black tracking-widest rounded-md uppercase border border-white/5">
                Back View
              </div>
              <TransparentProductImage 
                src={activeHeroProduct.image_url?.split(/,(?=data:|https?:|\/media)/)[1] || activeHeroProduct.image_url?.split(/,(?=data:|https?:|\/media)/)[0]} 
                alt={`${activeHeroProduct.name} Back View`} 
                className={`w-[90%] object-contain group-hover:scale-105 transition-transform duration-500 ${!activeHeroProduct.image_url?.split(/,(?=data:|https?:|\/media)/)[1] ? 'scale-x-[-1]' : ''}`}
                style={{
                  filter: 'saturate(1.1) drop-shadow(0 20px 30px rgba(0,0,0,0.7))'
                }}
              />
            </div>

          </div>

          {/* Right half: Info and Checkout Actions Form */}
          <div className="lg:col-span-5 glass-panel p-3 sm:p-4 rounded-2xl border border-white/5 space-y-3 overflow-hidden min-w-0">
            
            {/* Header info */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-1.5 py-0.5 bg-white/5 text-gray-400 text-[7px] font-extrabold tracking-widest rounded uppercase border border-white/5">
                  {activeHeroProduct.category_name || 'AUTHENTIC APPAREL'}
                </span>
                <span className={`px-1.5 py-0.5 text-[7px] font-black tracking-widest rounded uppercase border ${
                  activeHeroProduct.in_stock !== false
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse'
                }`}>
                  {activeHeroProduct.in_stock !== false ? '● In Stock' : '○ Out of Stock'}
                </span>
              </div>
              <h1 className="text-white font-black text-base uppercase tracking-tight leading-snug">
                {activeHeroProduct.name}
              </h1>
              
              {/* Pricing section */}
              <div className="flex items-baseline gap-2 pt-0.5">
                <span className="text-[#bd922b] font-black text-sm sm:text-base">
                  {formatPrice(activeHeroProduct.price * quantity)}
                </span>
                {quantity > 1 && (
                  <span className="text-gray-500 text-[10px] sm:text-xs">
                    ({formatPrice(activeHeroProduct.price)} × {quantity})
                  </span>
                )}
              </div>

              {/* Product Specifications & Details Deck — shown below price */}
              <div className="space-y-1 min-w-0">
                <h4 className="text-white font-black text-[10px] uppercase tracking-wider">Product Details</h4>
                <div className="space-y-0.5 text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-wider leading-relaxed wrap-break-word">
                  {getProductDetails(activeHeroProduct).map((detail, idx) => (
                    <p key={idx} className="wrap-break-word whitespace-normal">{detail}</p>
                  ))}
                </div>
              </div>

            </div>

            <div className="border-t border-white/5 pt-2.5 space-y-2.5">
              
              {/* Size selectors */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[8px] font-extrabold text-gray-500 uppercase tracking-widest">
                  <span>Select Fitting Size</span>
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="text-[#bd922b] hover:underline flex items-center gap-1 transition-all"
                  >
                    <Ruler className="w-2.5 h-2.5" />
                    Size Guide
                  </button>
                </div>

                <div className="flex gap-1">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-7 h-7 rounded-md flex items-center justify-center font-black text-[10px] transition-all ${
                        selectedSize === size
                          ? 'bg-white text-black shadow-md shadow-white/5'
                          : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="space-y-1">
                <label className="text-[8px] font-extrabold text-gray-500 uppercase tracking-widest block">
                  Select Quantity
                </label>
                <div className="flex items-center w-max bg-white/5 rounded-md border border-white/5 p-0.5">
                  <button
                    type="button"
                    onClick={() => handleQtyChange(-1)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-[10px] font-black text-white w-7 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQtyChange(1)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Transaction Actions */}
              <div className="space-y-1.5 pt-1">

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={adding || activeHeroProduct.in_stock === false}
                  className={`w-full py-2 font-black text-[10px] uppercase rounded-lg tracking-widest hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5 btn-gold-shimmer ${
                    activeHeroProduct.in_stock !== false
                      ? "bg-white text-black"
                      : "bg-gray-500/10 text-gray-500 border border-gray-500/25 cursor-not-allowed opacity-50 shadow-none"
                  }`}
                >
                  {adding ? (
                    <>
                      <div className="w-3 h-3 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                      Adding to Bag...
                    </>
                  ) : activeHeroProduct.in_stock !== false ? (
                    <>
                      <ShoppingBag className="w-3 h-3" />
                      Add to Cart
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </button>

                {/* WhatsApp Enquire button */}
                <button
                  onClick={handleWhatsAppEnquire}
                  disabled={activeHeroProduct.in_stock === false}
                  className={`w-full py-2 font-black text-[10px] uppercase rounded-lg tracking-widest hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg btn-gold-shimmer ${
                    activeHeroProduct.in_stock !== false
                      ? "bg-linear-to-r from-[#25D366] to-[#20ba5a] text-white shadow-[#25D366]/10"
                      : "bg-gray-500/10 text-gray-500 border border-gray-500/25 cursor-not-allowed opacity-50 shadow-none"
                  }`}
                >
                  {activeHeroProduct.in_stock !== false ? "WhatsApp Enquire" : "Unavailable"}
                </button>

                {/* SIZE CHART Button */}
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="w-full py-2 bg-white/10 hover:bg-white/15 text-white font-black text-[10px] uppercase rounded-lg tracking-widest transition-all cursor-pointer border border-white/5 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] btn-gold-shimmer"
                >
                  Size Chart
                </button>

              </div>


            </div>

          </div>

        </div>

      </div>

      {/* Size Chart Modal Overlay */}
      {showSizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/10 space-y-6 relative">
            <h3 className="text-white font-black text-base uppercase tracking-wider">Athletic Fit Size Chart</h3>
            
            <div className="overflow-hidden rounded-xl border border-white/5">
              <table className="w-full text-left text-xs text-gray-400">
                <thead className="bg-white/5 text-white font-extrabold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">Chest (in)</th>
                    <th className="p-3">Waist (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3 font-bold text-white">S</td>
                    <td className="p-3">34 - 37</td>
                    <td className="p-3">29 - 32</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">M</td>
                    <td className="p-3">37 - 40</td>
                    <td className="p-3">32 - 35</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">L</td>
                    <td className="p-3">40 - 44</td>
                    <td className="p-3">35 - 38</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">XL</td>
                    <td className="p-3">44 - 48</td>
                    <td className="p-3">38 - 43</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">XXL</td>
                    <td className="p-3">48 - 52</td>
                    <td className="p-3">43 - 47.5</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowSizeChart(false)}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs uppercase rounded-xl tracking-wider transition-all"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetail;
