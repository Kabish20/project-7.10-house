import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import TransparentProductImage from './TransparentProductImage';
import { Search, ShoppingCart, SlidersHorizontal, X, Plus, Minus } from 'lucide-react';

const getProductDetails = (product) => {
  if (!product) return [];
  if (product.details && Array.isArray(product.details) && product.details.length > 0) {
    return product.details;
  }
  const name = product.name.toLowerCase();
  if (name.includes('barcelona') || name.includes('barca')) return ['PLAYER: MESSI','SLIM FIT','VAPORKNIT MATERIAL','CREW NECK & SHORT SLEEVE & HEAT-APPLIED SHIELD'];
  if (name.includes('inter milan') || name.includes('inter')) return ['PLAYER: ICARDI','SLIM FIT','DRI-FIT MATERIAL','NERAZZURRI EMBROIDERY & SHORT SLEEVE'];
  if (name.includes('argentina')) return ['PLAYER: MESSI','SLIM FIT','HEAT.RDY MATERIAL','THREE STARS EMBROIDERY & SHORT SLEEVE'];
  if (name.includes('portugal')) return ['PLAYER: RONALDO','SLIM FIT','DRI-FIT MATERIAL','CRIMSON GREEN PIPING & SHORT SLEEVE'];
  if (name.includes('brazil') || name.includes('brasil')) return ['PLAYER: VINICIUS JR.','SLIM FIT','DRI-FIT ADV MATERIAL','SAMBA EMBOSSED PATTERN & SHORT SLEEVE'];
  if (name.includes('real madrid') || name.includes('madrid')) return ['PLAYER: RONALDO','REGULAR FIT','DOTKNIT MATERIAL','POLO & FULL SLEEVE & EMBROIDERY'];
  if (name.includes('al-nassr') || name.includes('nassr')) return ['PLAYER: RONALDO','SLIM FIT','DRI-FIT MATERIAL','GOLD EMBOSSED PANEL & SHORT SLEEVE'];
  if (name.includes('arsenal')) return ['PLAYER: HENRY','REGULAR FIT','HERITAGE MESH MATERIAL','REDCURRANT COLLAR & GOLD EMBROIDERY'];
  if (name.includes('manchester united') || name.includes('united')) return ['PLAYER: BECKHAM','REGULAR FIT','RETRO POLY MATERIAL','ZIP-NECK POLO & FULL SLEEVE & EMBROIDERY'];
  if (name.includes('france')) return ['PLAYER: MBAPPÉ','ATHLETIC FIT','DRI-FIT ADV MATERIAL','GIANT ROOSTER EMBROIDERY & SHORT SLEEVE'];
  if (name.includes('germany')) return ['PLAYER: KROOS','SLIM FIT','HEAT.RDY MATERIAL','FLAME PATTERN DECK & SHORT SLEEVE'];
  return ['PLAYER: OFFICIAL VIP','REGULAR FIT','PREMIUM POLYESTER MATERIAL','EMBROIDERED EMBLEM & SHORT SLEEVE'];
};

const Store = () => {
  const { 
    products, 
    categories, 
    addToCart, 
    setActiveView, 
    setActiveHeroProduct, 
    searchQuery, 
    setSearchQuery,
    formatPrice
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // WhatsApp mini-modal state
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [enquirySize, setEnquirySize] = useState('M');
  const [enquiryQty, setEnquiryQty] = useState(1);

  const handleProductClick = (product) => {
    setActiveHeroProduct(product);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEnquiryModal = (product) => {
    setEnquiryProduct(product);
    setEnquirySize('M');
    setEnquiryQty(1);
  };

  const sendWhatsAppEnquiry = () => {
    if (!enquiryProduct) return;
    const details = getProductDetails(enquiryProduct);
    const detailLines = details.map((d) => `  • ${d}`).join('\n');

    const rawImageUrl = enquiryProduct.image_url?.split(/,(?=data:|https?:|\/media)/)[0] || '';
    const imageLink = rawImageUrl.startsWith('http')
      ? rawImageUrl
      : `${window.location.origin}${rawImageUrl}`;

    const messageText = [
      `🛒 *ORDER ENQUIRY — 7.10 HOUSE*`,
      ``,
      `📌 *Product:* ${enquiryProduct.name}`,
      `🖼️ *Image:* ${imageLink}`,
      ``,
      `📋 *Product Details:*`,
      detailLines,
      ``,
      `💰 *Price:* ${formatPrice(enquiryProduct.price)}`,
      `📐 *Fitting Size:* ${enquirySize}`,
      `🔢 *Quantity:* ${enquiryQty}`,
      ``,
      `Please confirm VIP availability and share payment details. Thank you! 🙏`,
    ].join('\n');

    const encodedText = encodeURIComponent(messageText);
    window.open(`https://wa.me/919003878494?text=${encodedText}`, '_blank');
    setEnquiryProduct(null);
  };

  // Categories helper mapping
  const getCategorySlug = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.slug : '';
  };

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((product) => {
      const matchCategory =
        selectedCategory === 'all' ||
        getCategorySlug(product.category) === selectedCategory ||
        product.category_name?.toLowerCase().replace(" ", "-") === selectedCategory;

      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category_name && product.category_name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter by stock status if selected
      const matchStock =
        sortBy === 'in-stock' ? (product.in_stock !== false) :
        sortBy === 'out-of-stock' ? (product.in_stock === false) :
        true;

      return matchCategory && matchSearch && matchStock;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });


  return (
    <div className="relative min-h-screen bg-[#07080d] pt-40 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-black tracking-widest text-[#bd922b] uppercase block mb-3 animate-pulse">
            ELITE APPAREL DECK
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            FOOTBALL JERSEY <span className="text-[#bd922b]">COLLECTION</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Explore authentic professional club retro jerseys and Euro/Copa America tournament kits made with ultimate precision.
          </p>
        </div>

        {/* Filter Controls Board */}
        <div className="glass-panel p-6 rounded-2xl mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

          {/* Category Selectors */}
          <div className="flex flex-wrap gap-2 lg:col-span-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedCategory === 'all'
                  ? 'bg-linear-to-r from-[#bd922b] to-[#E3C488] text-black shadow-lg shadow-[#bd922b]/10 btn-gold-shimmer'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                }`}
            >
              All Collection
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedCategory === cat.slug
                    ? 'bg-linear-to-r from-[#bd922b] to-[#E3C488] text-black shadow-lg shadow-[#bd922b]/10 btn-gold-shimmer'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search and Sort Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
            {/* Search */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search premium kits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/5 focus:border-[#bd922b]/30 text-white text-xs placeholder-gray-500 outline-none transition-all"
              />
            </div>

            {/* Sort */}
            <div className="relative w-full sm:w-[220px] shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-3 pr-8 py-2 rounded-xl bg-[#090A0F] border border-white/5 text-gray-400 focus:text-white text-xs outline-none cursor-pointer transition-all appearance-none"
              >
                <option value="default">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="in-stock">Stock: In Stock</option>
                <option value="out-of-stock">Stock: Out of Stock</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/2 rounded-3xl border border-white/5">
            <p className="text-gray-500 text-sm">No premium jerseys found matching your selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-panel group relative rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#bd922b]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black"
              >
                {/* Category Badge overlay */}
                <span className="absolute top-3 left-3 z-10 px-1.5 py-0.5 bg-black/65 text-gray-400 text-[7px] font-bold tracking-widest rounded-md uppercase border border-white/5">
                  {product.category_name || 'KIT'}
                </span>

                {product.in_stock === false && (
                  <span className="absolute top-3 right-3 z-10 px-1.5 py-0.5 bg-rose-500/90 text-white text-[7px] font-black tracking-widest rounded-md uppercase border border-rose-400/20 animate-pulse">
                    OUT OF STOCK
                  </span>
                )}

                {/* Jersey Presentation Area */}
                <div 
                  onClick={() => handleProductClick(product)}
                  className="aspect-square bg-linear-to-b from-white/3 to-transparent flex items-center justify-center p-3 relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute w-[60%] aspect-square rounded-full bg-linear-to-br from-[#bd922b]/5 to-transparent blur-2xl group-hover:bg-[#bd922b]/10 transition-colors duration-500" />
                  <TransparentProductImage
                    src={product.image_url?.split(/,(?=data:|https?:|\/media)/)[0]}
                    alt={product.name}
                    className="w-[85%] object-contain transition-transform duration-500 group-hover:scale-108 group-hover:rotate-2"
                    style={{
                      filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))'
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                </div>

                {/* Info Deck */}
                <div className="p-3.5 grow flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => handleProductClick(product)}
                      className="text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-tight leading-snug line-clamp-1 group-hover:text-neon-gold transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-[9px] sm:text-[10px] line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-black text-xs sm:text-sm">{formatPrice(product.price)}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); openEnquiryModal(product); }}
                          disabled={product.in_stock === false}
                          className={`p-1.5 rounded-lg transition-all duration-300 border cursor-pointer ${
                            product.in_stock !== false
                              ? "bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border-[#25D366]/20"
                              : "bg-gray-500/10 text-gray-500 border-gray-500/20 cursor-not-allowed opacity-50"
                          }`}
                          title={product.in_stock !== false ? "WhatsApp Enquire" : "Out of Stock"}
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.257 1.875 13.777.844 11.15.845c-5.448 0-9.88 4.417-9.885 9.866-.001 1.745.467 3.447 1.353 4.966L1.65 21.957l6.597-1.73zM17.13 15.34c-.287-.144-1.696-.838-1.959-.933-.263-.096-.454-.144-.645.144-.19.287-.736.933-.903 1.122-.167.19-.335.216-.622.072-2.828-1.415-4.665-2.73-6.524-5.922-.167-.287-.013-.443.13-.586.13-.13.287-.335.43-.502.144-.167.19-.287.287-.478.096-.191.048-.36-.024-.502-.072-.143-.645-1.554-.884-2.128-.233-.56-.47-.482-.645-.491-.167-.008-.358-.01-.55-.01s-.502.072-.765.358c-.263.287-1.004.981-1.004 2.392s1.028 2.774 1.171 2.965c.143.19 2.023 3.09 4.901 4.33.684.295 1.218.471 1.634.603.687.218 1.312.187 1.808.113.553-.083 1.696-.693 1.936-1.362.24-.669.24-1.242.167-1.362-.072-.12-.263-.19-.55-.335z"/>
                          </svg>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                          disabled={product.in_stock === false}
                          className={`p-1.5 rounded-lg transition-all duration-300 border cursor-pointer ${
                            product.in_stock !== false
                              ? "bg-white/5 hover:bg-linear-to-r hover:from-[#bd922b] hover:to-[#E3C488] text-white hover:text-black border-white/5"
                              : "bg-gray-500/10 text-gray-500 border-gray-500/20 cursor-not-allowed opacity-50"
                          }`}
                          title={product.in_stock !== false ? "Add to bag" : "Out of Stock"}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── WhatsApp Enquiry Mini Modal ── */}
      {enquiryProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setEnquiryProduct(null)}
        >
          <div
            className="glass-panel w-full max-w-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Product preview header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-white/2">
              <TransparentProductImage
                src={enquiryProduct.image_url?.split(/,(?=data:|https?:|\/media)/)[0]}
                alt={enquiryProduct.name}
                className="w-14 h-14 object-contain rounded-lg bg-white/5 p-1 border border-white/5 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-xs uppercase tracking-tight line-clamp-2 leading-snug">
                  {enquiryProduct.name}
                </p>
                <p className="text-[#bd922b] font-black text-sm mt-0.5">
                  {formatPrice(enquiryProduct.price * enquiryQty)}
                  {enquiryQty > 1 && (
                    <span className="text-gray-500 text-[10px] ml-1.5 font-normal">
                      ({formatPrice(enquiryProduct.price)} × {enquiryQty})
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setEnquiryProduct(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Size selector */}
              <div className="space-y-2">
                <p className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest">Select Fitting Size</p>
                <div className="flex gap-1.5">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setEnquirySize(size)}
                      className={`flex-1 py-1.5 rounded-lg font-black text-[10px] transition-all cursor-pointer ${
                        enquirySize === size
                          ? 'bg-white text-black shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <p className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest">Select Quantity</p>
                <div className="flex items-center w-max bg-white/5 rounded-lg border border-white/5 p-0.5">
                  <button
                    onClick={() => setEnquiryQty((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-4 text-[11px] font-black text-white w-10 text-center">{enquiryQty}</span>
                  <button
                    onClick={() => setEnquiryQty((q) => q + 1)}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Send button */}
              <button
                onClick={sendWhatsAppEnquiry}
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.257 1.875 13.777.844 11.15.845c-5.448 0-9.88 4.417-9.885 9.866-.001 1.745.467 3.447 1.353 4.966L1.65 21.957l6.597-1.73zM17.13 15.34c-.287-.144-1.696-.838-1.959-.933-.263-.096-.454-.144-.645.144-.19.287-.736.933-.903 1.122-.167.19-.335.216-.622.072-2.828-1.415-4.665-2.73-6.524-5.922-.167-.287-.013-.443.13-.586.13-.13.287-.335.43-.502.144-.167.19-.287.287-.478.096-.191.048-.36-.024-.502-.072-.143-.645-1.554-.884-2.128-.233-.56-.47-.482-.645-.491-.167-.008-.358-.01-.55-.01s-.502.072-.765.358c-.263.287-1.004.981-1.004 2.392s1.028 2.774 1.171 2.965c.143.19 2.023 3.09 4.901 4.33.684.295 1.218.471 1.634.603.687.218 1.312.187 1.808.113.553-.083 1.696-.693 1.936-1.362.24-.669.24-1.242.167-1.362-.072-.12-.263-.19-.55-.335z"/>
                </svg>
                Send Enquiry on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Store;
