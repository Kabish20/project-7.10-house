import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import TransparentProductImage from './TransparentProductImage';
import {
  Lock, User, LogOut, LayoutDashboard, Shirt, PlusCircle,
  Trash2, Sparkles, CheckCircle2, TrendingUp, X, Pencil
} from 'lucide-react';

const AdminDashboard = () => {
  const {
    products,
    categories,
    adminUser,
    loginAdmin,
    logoutAdmin,
    deleteProduct,
    addProduct,
    updateProduct,
    API_URL,
    formatPrice
  } = useShop();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'orders', 'products', 'add'

  // Login Form States
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Add Product Form States
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: '',
    image_url: '/barca_jersey.png',
    rating: '5.00',
    colors: 'Red, Blue',
    is_featured: false,
    stats: {
      ranking: 'N/A',
      founded: '1900',
      country: 'Spain',
      recentMatch: 'N/A',
      matchTitle: 'Match details review',
      bgColor: 'from-brand-barcaRed to-brand-barcaBlue',
      accentColor: '#FFFFFF',
      backdropText: 'FC CLUB'
    },
    details: [
      'PLAYER: OFFICIAL VIP',
      'REGULAR FIT',
      'PREMIUM POLYESTER MATERIAL',
      'EMBROIDERED EMBLEM & SHORT SLEEVE'
    ]
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [submitError, setSubmitError] = useState('');
  const [costPrice, setCostPrice] = useState('');

  // Edit product modal state
  const [editProduct, setEditProduct] = useState(null); // null = closed
  const [editSaving, setEditSaving] = useState(false);

  // Dedicated states for front/back views
  const [frontImageUrl, setFrontImageUrl] = useState('/barca_jersey.png');
  const [backImageUrl, setBackImageUrl] = useState('');
  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack, setUploadingBack] = useState(false);

  const [editFrontImageUrl, setEditFrontImageUrl] = useState('');
  const [editBackImageUrl, setEditBackImageUrl] = useState('');
  const [editUploadingFront, setEditUploadingFront] = useState(false);
  const [editUploadingBack, setEditUploadingBack] = useState(false);

  // Derived markup & profit
  const retailVal = parseFloat(newProduct.price) || 0;
  const costVal = parseFloat(costPrice) || 0;
  const profit = retailVal - costVal;
  const markup = costVal > 0 ? ((profit / costVal) * 100) : 0;
  const profitHealth = markup >= 40 ? 'good' : markup >= 20 ? 'ok' : markup > 0 ? 'low' : 'none';

  // Front and Back Image Upload handler
  const handleUploadImage = async (e, side) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    // Reset input value to allow selecting the same file again if the previous attempt failed
    if (e.target) e.target.value = '';

    if (side === 'front') setUploadingFront(true);
    else setUploadingBack(true);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      const base64Url = await base64Promise;
      const res = await fetch(`${API_URL}/upload-images/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: [base64Url] }),
      });

      if (res.ok) {
        const data = await res.json();
        const uploadedUrl = data.urls[0];
        if (side === 'front') {
          setFrontImageUrl(uploadedUrl);
        } else {
          setBackImageUrl(uploadedUrl);
        }
      } else {
        alert('Image upload failed. Please try again.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Image upload failed. Please verify the file is a valid image.');
    } finally {
      if (side === 'front') setUploadingFront(false);
      else setUploadingBack(false);
    }
  };

  // Edit front/back image upload handler
  const handleEditUploadImage = async (e, side) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    // Reset input value to allow selecting the same file again if the previous attempt failed
    if (e.target) e.target.value = '';

    if (side === 'front') setEditUploadingFront(true);
    else setEditUploadingBack(true);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      const base64Url = await base64Promise;
      const res = await fetch(`${API_URL}/upload-images/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: [base64Url] }),
      });

      if (res.ok) {
        const data = await res.json();
        const uploadedUrl = data.urls[0];
        if (side === 'front') {
          setEditFrontImageUrl(uploadedUrl);
        } else {
          setEditBackImageUrl(uploadedUrl);
        }
      } else {
        alert('Image upload failed. Please try again.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Image upload failed. Please verify the file is a valid image.');
    } finally {
      if (side === 'front') setEditUploadingFront(false);
      else setEditUploadingBack(false);
    }
  };

  // Handle Login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) return;

    setLoginLoading(true);
    setLoginError('');

    const result = await loginAdmin(usernameInput, passwordInput);
    setLoginLoading(false);
    if (!result.success) {
      setLoginError(result.message);
    }
  };

  // Handle Delete product
  const handleDeleteProduct = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this jersey from the active catalog?');
    if (!confirm) return;

    const res = await deleteProduct(id);
    if (!res.success) {
      alert(res.message);
    }
  };

  // Open edit modal pre-populated with the selected product
  const openEditModal = (product) => {
    setEditProduct({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: String(product.price),
      category: String(product.category),
      colors: product.colors,
      rating: String(product.rating),
      is_featured: product.is_featured,
    });
    
    // Split comma-separated URLs from backend into front and back image inputs
    const urls = product.image_url ? product.image_url.split(',').map(u => u.trim()).filter(Boolean) : [];
    setEditFrontImageUrl(urls[0] || '/barca_jersey.png');
    setEditBackImageUrl(urls[1] || '');
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editProduct) return;
    setEditSaving(true);
    
    const imageUrlField = [editFrontImageUrl, editBackImageUrl].filter(url => url && url.trim() !== '').join(',');
    
    const payload = {
      name: editProduct.name,
      slug: editProduct.slug,
      description: editProduct.description,
      price: parseFloat(editProduct.price),
      category: parseInt(editProduct.category),
      colors: editProduct.colors,
      rating: parseFloat(editProduct.rating || 5),
      is_featured: editProduct.is_featured,
      image_url: imageUrlField,
    };
    const res = await updateProduct(editProduct.id, payload);
    setEditSaving(false);
    if (res.success) {
      setEditProduct(null);
    } else {
      alert(res.message);
    }
  };


  // Handle Create Product
  const handleCreateProductSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('Kindly fill name, price, and category.');
      return;
    }

    setSubmitStatus('loading');
    setSubmitError('');

    const imageUrlField = [frontImageUrl, backImageUrl].filter(url => url && url.trim() !== '').join(',');

    // Generate unique slug suffix to prevent database constraints conflict
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const cleanSlug = (newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    const finalSlug = cleanSlug ? `${cleanSlug}-${randomSuffix}` : `jersey-${Date.now()}`;

    // Prepare clean request object
    const pData = {
      ...newProduct,
      slug: finalSlug,
      price: parseFloat(newProduct.price),
      rating: parseFloat(newProduct.rating || 5.0),
      category: parseInt(newProduct.category),
      image_url: imageUrlField
    };

    const res = await addProduct(pData);
    if (res.success) {
      setSubmitStatus('success');
      // Reset form
      setNewProduct({
        name: '',
        slug: '',
        description: '',
        price: '',
        category: '',
        image_url: '/barca_jersey.png',
        rating: '5.00',
        colors: 'Red, Blue',
        is_featured: false,
        stats: {
          ranking: 'N/A',
          founded: '1900',
          country: 'Spain',
          recentMatch: 'N/A',
          matchTitle: 'Match details review',
          bgColor: 'from-brand-barcaRed to-brand-barcaBlue',
          accentColor: '#FFFFFF',
          backdropText: 'FC CLUB'
        },
        details: [
          'PLAYER: OFFICIAL VIP',
          'REGULAR FIT',
          'PREMIUM POLYESTER MATERIAL',
          'EMBROIDERED EMBLEM & SHORT SLEEVE'
        ]
      });
      setFrontImageUrl('/barca_jersey.png');
      setBackImageUrl('');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } else {
      setSubmitStatus('error');
      setSubmitError(res.message);
    }
  };

  // Generate unique slug based on name
  const handleNameChange = (e) => {
    const nameVal = e.target.value;
    const slugVal = nameVal.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setNewProduct({ ...newProduct, name: nameVal, slug: slugVal });
  };

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-[#07080d] pt-40 pb-20 flex items-center justify-center px-6 relative overflow-hidden">
        {/* Soft Background Radial Light */}
        <div className="absolute top-[30%] left-[-10%] w-[50%] aspect-square rounded-full bg-radial-gradient from-[#bd922b]/5 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] aspect-square rounded-full bg-radial-gradient from-blue-500/5 to-transparent blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/5 relative z-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-[#bd922b]/25 text-[#bd922b] shadow-lg animate-pulse">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black uppercase text-white tracking-wider">Staff Terminal</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Authorized audit directories only</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs text-center font-bold">
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest block">
                Username Reference
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/3 border border-white/5 focus:border-[#bd922b]/30 text-white text-xs outline-none transition-all placeholder-gray-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest block">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter security key"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/3 border border-white/5 focus:border-[#bd922b]/30 text-white text-xs outline-none transition-all placeholder-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 mt-2 bg-linear-to-r from-[#bd922b] to-[#E3C488] text-black font-black text-xs uppercase rounded-xl tracking-widest hover:scale-[1.01] transition-all duration-300 shadow-xl shadow-[#bd922b]/10 flex items-center justify-center gap-2 cursor-pointer btn-gold-shimmer"
            >
              {loginLoading ? 'Verifying Credentials...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080d] pt-40 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] aspect-square rounded-full bg-radial-gradient from-[#bd922b]/3 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] aspect-square rounded-full bg-radial-gradient from-blue-500/3 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#bd922b]/10 text-[#bd922b] text-[8px] font-black uppercase tracking-widest rounded-md border border-[#bd922b]/20">
                Staff Account Active
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-1.5">
              ELITE CONTROL PANEL
            </h1>
            <p className="text-gray-500 text-xs mt-1">Logged in as audit administrator: <b>{adminUser.username}</b></p>
          </div>

          <button
            onClick={logoutAdmin}
            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 rounded-xl text-xs font-bold transition-all border border-rose-500/20 flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Terminate Audit Session
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5">
          {[
            { id: 'overview', name: 'Overview board', icon: LayoutDashboard },
            { id: 'products', name: `Kits Catalog (${products.length})`, icon: Shirt },
            { id: 'add', name: 'Insert Jersey', icon: PlusCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${isActive
                    ? 'bg-linear-to-r from-[#bd922b] to-[#E3C488] text-black shadow-lg shadow-[#bd922b]/10'
                    : 'bg-white/5 hover:bg-white/8 text-gray-400 hover:text-white border border-white/5'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[4px] h-full bg-[#bd922b]" />
                <div className="flex justify-between items-center text-gray-500">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Total jerseys</span>
                  <Shirt className="w-4 h-4 text-[#bd922b]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white">{products.length}</h3>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Jerseys in database</p>
                </div>
              </div>


              <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[4px] h-full bg-purple-500" />
                <div className="flex justify-between items-center text-gray-500">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Categories</span>
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white">{categories.length}</h3>
                  <p className="text-[9px] text-purple-400 uppercase tracking-widest font-bold">Product collections</p>
                </div>
              </div>

            </div>

            {/* Quick Action Info board */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center gap-2 text-white font-extrabold uppercase text-xs tracking-wider">
                <Sparkles className="w-4 h-4 text-[#bd922b]" />
                Authorized Admin Actions
              </div>
              <p className="text-gray-400 text-xs leading-relaxed max-w-3xl">
                This dashboard communicates directly with Django's back-end database REST framework endpoints. Any operations performed here, such as deleting a jersey or inserting a new football jersey, will instantly update the database. Live updates are fetched asynchronously.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('add')}
                  className="px-4 py-2 bg-linear-to-r from-[#bd922b]/10 to-[#E3C488]/10 hover:from-[#bd922b]/20 hover:to-[#E3C488]/20 border border-[#bd922b]/20 text-[#bd922b] font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all"
                >
                  Insert New Jersey
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Jerseys Catalog */}
        {activeTab === 'products' && (
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-5 border-b border-white/5">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Products Catalog Database</h3>
              <p className="text-[10px] text-gray-500 mt-0.5">Live directory of premium retro uniforms and athletic apparel in the database</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-400">
                <thead className="bg-white/2 text-white font-extrabold uppercase text-[9px] tracking-wider border-b border-white/5">
                  <tr>
                    <th className="p-4">Jersey Preview</th>
                    <th className="p-4">Product Specs</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Colors</th>
                    <th className="p-4 text-right">Database Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-black uppercase text-[10px] tracking-tight">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/1 group transition-all">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/3 rounded-lg overflow-hidden border border-white/5 p-1 flex items-center justify-center shrink-0">
                          <TransparentProductImage 
                            src={p.image_url?.split(',')[0]} 
                            alt={p.name} 
                            className="w-full h-full object-contain filter drop-shadow-sm" 
                          />
                        </div>
                        <div>
                          <p className="text-white font-black line-clamp-1">{p.name}</p>
                          <p className="text-gray-500 text-[8px] mt-0.5">SLUG: {p.slug}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-white/5 text-gray-400 text-[8px] rounded border border-white/5">
                          {p.category_name || (categories.find(c => c.id === p.category)?.name) || 'KIT'}
                        </span>
                        {p.is_featured && (
                          <span className="px-2 py-0.5 ml-1.5 bg-[#bd922b]/10 text-[#bd922b] text-[8px] rounded border border-[#bd922b]/20 animate-pulse">
                            FEATURED
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-[#bd922b]">{formatPrice(p.price)}</td>
                      <td className="p-4 text-gray-500 text-[9px]">{p.colors}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-lg transition-all border border-blue-500/20 cursor-pointer"
                            title="Edit Jersey"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all border border-rose-500/20 cursor-pointer"
                            title="Delete Jersey from Catalog"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Add Product */}
        {activeTab === 'add' && (
          <div className="glass-panel p-3 rounded-xl border border-white/5 space-y-3">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">Insert New Football Jersey</h3>
              <p className="text-[9px] text-gray-500 mt-0.5">Submit dynamic jersey entries directly into the Django database</p>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-3">

              {submitStatus === 'success' && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs text-center font-bold flex items-center justify-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 animate-bounce" />
                  Jersey successfully saved and verified in the database!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs text-center font-bold">
                  Failed to write entry: {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest block">
                    Jersey Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Barcelona FC 2024-25 Home Kit"
                    value={newProduct.name}
                    onChange={handleNameChange}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 focus:border-[#bd922b]/30 text-white text-xs outline-none transition-all placeholder-gray-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest block">
                    Category Group
                  </label>
                  <select
                    required
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#090A0F] border border-white/5 text-gray-400 focus:text-white text-xs outline-none cursor-pointer transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest block">
                    Cost Price (₹ INR)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 75.00"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 focus:border-emerald-500/30 text-white text-xs outline-none transition-all placeholder-gray-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest block">
                    Retail / Selling Price (₹ INR)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 125.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 focus:border-[#bd922b]/30 text-white text-xs outline-none transition-all placeholder-gray-600"
                  />
                </div>

                {/* Live Markup & Profit Calculator */}
                {costVal > 0 && retailVal > 0 && (
                  <div className="col-span-1 sm:col-span-2">
                    <div className={`rounded-lg border p-3 flex items-center gap-4 ${profitHealth === 'good' ? 'bg-emerald-500/5 border-emerald-500/20' :
                        profitHealth === 'ok' ? 'bg-amber-500/5 border-amber-500/20' :
                          profitHealth === 'low' ? 'bg-rose-500/5 border-rose-500/20' :
                            'bg-white/3 border-white/5'
                      }`}>
                      {/* Markup % */}
                      <div className="flex-1 text-center">
                        <p className="text-[9px] font-extrabold uppercase tracking-widest text-gray-500 mb-0.5">Markup</p>
                        <p className={`text-lg font-black tabular-nums ${profitHealth === 'good' ? 'text-emerald-400' :
                            profitHealth === 'ok' ? 'text-amber-400' :
                              profitHealth === 'low' ? 'text-rose-400' : 'text-gray-400'
                          }`}>
                          {markup.toFixed(1)}%
                        </p>
                      </div>
                      {/* Divider */}
                      <div className="w-px h-8 bg-white/10" />
                      {/* Profit Amount */}
                      <div className="flex-1 text-center">
                        <p className="text-[9px] font-extrabold uppercase tracking-widest text-gray-500 mb-0.5">Gross Profit</p>
                        <p className={`text-lg font-black tabular-nums ${profit > 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                          {profit >= 0 ? '+' : ''}₹{Math.round(profit).toLocaleString('en-IN')}
                        </p>
                      </div>
                      {/* Divider */}
                      <div className="w-px h-8 bg-white/10" />
                      {/* Health badge */}
                      <div className="flex-1 text-center">
                        <p className="text-[9px] font-extrabold uppercase tracking-widest text-gray-500 mb-0.5">Health</p>
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${profitHealth === 'good' ? 'bg-emerald-500/20 text-emerald-400' :
                            profitHealth === 'ok' ? 'bg-amber-500/20 text-amber-400' :
                              profitHealth === 'low' ? 'bg-rose-500/20 text-rose-400' : 'bg-white/5 text-gray-500'
                          }`}>
                          {profitHealth === 'good' ? '✓ Healthy' : profitHealth === 'ok' ? '~ Moderate' : profitHealth === 'low' ? '⚠ Low' : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-span-1 sm:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Front View Image */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-extrabold text-[#bd922b] uppercase tracking-widest block">
                      Front View Image
                    </label>
                    {frontImageUrl && frontImageUrl !== '/barca_jersey.png' ? (
                      <div className="glass-panel group relative rounded-xl overflow-hidden border border-white/5 bg-white/3 flex flex-col items-center justify-center p-3 h-32">
                        <TransparentProductImage 
                          src={frontImageUrl} 
                          alt="Front View Preview" 
                          className="h-[75%] object-contain filter drop-shadow-md" 
                        />
                        <button
                          type="button"
                          onClick={() => setFrontImageUrl('/barca_jersey.png')}
                          className="absolute top-2 right-2 p-1.5 bg-black/85 hover:bg-rose-500 text-white rounded-lg transition-all shadow-md border border-white/5 cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">Active Front Image</span>
                      </div>
                    ) : (
                      <div className="relative group h-32">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadImage(e, 'front')}
                          disabled={uploadingFront}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                        />
                        <div className={`w-full h-full rounded-xl border border-dashed transition-all flex flex-col items-center justify-center gap-1 ${uploadingFront ? 'border-[#bd922b]/40 bg-[#bd922b]/5' : 'border-white/10 group-hover:border-[#bd922b]/30 bg-white/2 hover:bg-white/3'}`}>
                          {uploadingFront ? (
                            <>
                              <div className="w-5 h-5 rounded-full border-2 border-[#bd922b]/30 border-t-[#bd922b] animate-spin" />
                              <span className="text-[10px] font-bold text-[#bd922b]">Uploading...</span>
                            </>
                          ) : (
                            <>
                              <PlusCircle className="w-5 h-5 text-gray-500 group-hover:text-[#bd922b] transition-colors" />
                              <span className="text-[10px] font-bold text-gray-300 group-hover:text-white transition-colors text-center">Upload Front View</span>
                              <span className="text-[8px] text-gray-500 uppercase tracking-wider text-center px-2">PNG, JPG, WEBP formats</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Back View Image */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block">
                      Back View Image
                    </label>
                    {backImageUrl ? (
                      <div className="glass-panel group relative rounded-xl overflow-hidden border border-white/5 bg-white/3 flex flex-col items-center justify-center p-3 h-32">
                        <TransparentProductImage 
                          src={backImageUrl} 
                          alt="Back View Preview" 
                          className="h-[75%] object-contain filter drop-shadow-md" 
                        />
                        <button
                          type="button"
                          onClick={() => setBackImageUrl('')}
                          className="absolute top-2 right-2 p-1.5 bg-black/85 hover:bg-rose-500 text-white rounded-lg transition-all shadow-md border border-white/5 cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">Active Back Image</span>
                      </div>
                    ) : (
                      <div className="relative group h-32">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadImage(e, 'back')}
                          disabled={uploadingBack}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                        />
                        <div className={`w-full h-full rounded-xl border border-dashed transition-all flex flex-col items-center justify-center gap-1 ${uploadingBack ? 'border-[#bd922b]/40 bg-[#bd922b]/5' : 'border-white/10 group-hover:border-[#bd922b]/30 bg-white/2 hover:bg-white/3'}`}>
                          {uploadingBack ? (
                            <>
                              <div className="w-5 h-5 rounded-full border-2 border-[#bd922b]/30 border-t-[#bd922b] animate-spin" />
                              <span className="text-[10px] font-bold text-[#bd922b]">Uploading...</span>
                            </>
                          ) : (
                            <>
                              <PlusCircle className="w-5 h-5 text-gray-500 group-hover:text-[#bd922b] transition-colors" />
                              <span className="text-[10px] font-bold text-gray-300 group-hover:text-white transition-colors text-center">Upload Back View</span>
                              <span className="text-[8px] text-gray-500 uppercase tracking-wider text-center px-2">PNG, JPG, WEBP formats</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest block">
                  Product Description Text
                </label>
                <textarea
                  rows="2"
                  required
                  placeholder="Describe the shirt design, badges, sponsor history..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 focus:border-[#bd922b]/30 text-white text-xs outline-none transition-all resize-none placeholder-gray-600"
                />
              </div>

              {/* Advanced UI Toggle: Feature Slider */}
              <div className="flex items-center gap-2 bg-white/2 p-2 rounded-lg border border-white/5">
                <input
                  type="checkbox"
                  id="isFeaturedCheck"
                  checked={newProduct.is_featured}
                  onChange={(e) => setNewProduct({ ...newProduct, is_featured: e.target.checked })}
                  className="w-3.5 h-3.5 bg-white/5 rounded border border-white/10 outline-none text-[#bd922b] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isFeaturedCheck" className="select-none cursor-pointer">
                  <p className="text-white font-extrabold uppercase text-[9px] tracking-wider">Featured Slider Promotion</p>
                  <p className="text-gray-500 text-[9px]">Add to the Hero carousel slider</p>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full py-2 bg-linear-to-r from-[#bd922b] to-[#E3C488] text-black font-black text-xs uppercase rounded-lg tracking-widest hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-[#bd922b]/10 flex items-center justify-center gap-2 cursor-pointer btn-gold-shimmer"
              >
                {submitStatus === 'loading' ? 'Writing Entry...' : 'Save Product in Database'}
              </button>

            </form>
          </div>
        )}

      </div>
      {/* ── Edit Product Modal ── */}
      {editProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setEditProduct(null)}
        >
          <div
            className="glass-panel w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 glass-panel flex items-center justify-between px-8 py-5 border-b border-white/8 rounded-t-3xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#bd922b]/10 border border-[#bd922b]/20 flex items-center justify-center">
                  <Pencil className="w-4 h-4 text-[#bd922b]" />
                </div>
                <div>
                  <p className="text-[9px] font-extrabold text-[#bd922b] uppercase tracking-widest">Edit Jersey Entry</p>
                  <h3 className="text-base font-black text-white uppercase tracking-tight leading-tight line-clamp-1">{editProduct.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setEditProduct(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-8 space-y-6">

              {/* Row 1: Name + Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block">Jersey Name</label>
                  <input
                    type="text" required
                    value={editProduct.name}
                    onChange={(e) => {
                      const v = e.target.value;
                      const slug = v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                      setEditProduct({ ...editProduct, name: v, slug });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/3 border border-white/8 focus:border-[#bd922b]/40 text-white text-sm outline-none transition-all placeholder-gray-600"
                    placeholder="e.g. Barcelona FC 2024-25 Home Kit"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block">Slug (URL-safe ID)</label>
                  <input
                    type="text" required
                    value={editProduct.slug}
                    onChange={(e) => setEditProduct({ ...editProduct, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/3 border border-white/8 focus:border-[#bd922b]/40 text-white text-sm outline-none transition-all font-mono placeholder-gray-600"
                    placeholder="e.g. barca-2024-25-home"
                  />
                </div>
              </div>

              {/* Row 2: Category + Price + Colors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block">Category</label>
                  <select
                    required
                    value={editProduct.category}
                    onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090A0F] border border-white/8 text-gray-300 focus:text-white text-sm outline-none cursor-pointer transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block">Price (₹ INR)</label>
                  <input
                    type="number" step="0.01" required
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/3 border border-white/8 focus:border-[#bd922b]/40 text-white text-sm outline-none transition-all placeholder-gray-600"
                    placeholder="e.g. 1299"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block">Colors (comma-separated)</label>
                  <input
                    type="text"
                    value={editProduct.colors}
                    onChange={(e) => setEditProduct({ ...editProduct, colors: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/3 border border-white/8 focus:border-[#bd922b]/40 text-white text-sm outline-none transition-all placeholder-gray-600"
                    placeholder="e.g. Red, Blue, Gold"
                  />
                </div>
              </div>

              {/* Row 3: Description (full width) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block">Product Description</label>
                <textarea
                  rows="4" required
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/3 border border-white/8 focus:border-[#bd922b]/40 text-white text-sm outline-none transition-all resize-none placeholder-gray-600 leading-relaxed"
                  placeholder="Describe the jersey design, badges, fabric, sponsor history..."
                />
              </div>

              {/* Row 4: Images (Front + Back Views) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {/* Front View Image */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-[#bd922b] uppercase tracking-widest block">Front View Image</label>
                  {editFrontImageUrl && editFrontImageUrl !== '/barca_jersey.png' ? (
                    <div className="glass-panel group relative rounded-xl overflow-hidden border border-white/8 bg-white/3 flex flex-col items-center justify-center p-3 h-32">
                      <TransparentProductImage 
                        src={editFrontImageUrl} 
                        alt="Front View" 
                        className="h-[75%] object-contain filter drop-shadow-md" 
                      />
                      <button
                        type="button"
                        onClick={() => setEditFrontImageUrl('/barca_jersey.png')}
                        className="absolute top-2 right-2 p-1.5 bg-black/85 hover:bg-rose-500 text-white rounded-lg transition-all shadow-md border border-white/10 cursor-pointer"
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Active Front Image</span>
                    </div>
                  ) : (
                    <div className="relative group h-32">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleEditUploadImage(e, 'front')}
                        disabled={editUploadingFront}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                      />
                      <div className={`w-full h-full rounded-xl border border-dashed transition-all flex flex-col items-center justify-center gap-1.5 ${editUploadingFront ? 'border-[#bd922b]/50 bg-[#bd922b]/5' : 'border-white/15 group-hover:border-[#bd922b]/40 bg-white/3 group-hover:bg-white/5'}`}>
                        {editUploadingFront ? (
                          <>
                            <div className="w-5 h-5 rounded-full border-2 border-[#bd922b]/30 border-t-[#bd922b] animate-spin" />
                            <span className="text-[10px] font-bold text-[#bd922b]">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-5 h-5 text-gray-500 group-hover:text-[#bd922b] transition-colors" />
                            <span className="text-[10px] font-bold text-gray-300 group-hover:text-white transition-colors text-center">Upload Front View</span>
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider text-center">PNG, JPG, WEBP formats</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Back View Image */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Back View Image</label>
                  {editBackImageUrl ? (
                    <div className="glass-panel group relative rounded-xl overflow-hidden border border-white/8 bg-white/3 flex flex-col items-center justify-center p-3 h-32">
                      <TransparentProductImage 
                        src={editBackImageUrl} 
                        alt="Back View" 
                        className="h-[75%] object-contain filter drop-shadow-md" 
                      />
                      <button
                        type="button"
                        onClick={() => setEditBackImageUrl('')}
                        className="absolute top-2 right-2 p-1.5 bg-black/85 hover:bg-rose-500 text-white rounded-lg transition-all shadow-md border border-white/10 cursor-pointer"
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Active Back Image</span>
                    </div>
                  ) : (
                    <div className="relative group h-32">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleEditUploadImage(e, 'back')}
                        disabled={editUploadingBack}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                      />
                      <div className={`w-full h-full rounded-xl border border-dashed transition-all flex flex-col items-center justify-center gap-1.5 ${editUploadingBack ? 'border-[#bd922b]/50 bg-[#bd922b]/5' : 'border-white/15 group-hover:border-[#bd922b]/40 bg-white/3 group-hover:bg-white/5'}`}>
                        {editUploadingBack ? (
                          <>
                            <div className="w-5 h-5 rounded-full border-2 border-[#bd922b]/30 border-t-[#bd922b] animate-spin" />
                            <span className="text-[10px] font-bold text-[#bd922b]">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-5 h-5 text-gray-500 group-hover:text-[#bd922b] transition-colors" />
                            <span className="text-[10px] font-bold text-gray-300 group-hover:text-white transition-colors text-center">Upload Back View</span>
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider text-center">PNG, JPG, WEBP formats</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 5: Featured toggle + Save */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-white/5">
                <div className="flex items-center gap-3 bg-white/3 px-4 py-3 rounded-xl border border-white/8">
                  <input
                    type="checkbox" id="editFeaturedCheck"
                    checked={editProduct.is_featured}
                    onChange={(e) => setEditProduct({ ...editProduct, is_featured: e.target.checked })}
                    className="w-4 h-4 bg-white/5 rounded border border-white/10 outline-none text-[#bd922b] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="editFeaturedCheck" className="select-none cursor-pointer">
                    <p className="text-white font-extrabold uppercase text-[10px] tracking-wider">Featured Slider Promotion</p>
                    <p className="text-gray-500 text-[9px] mt-0.5">Display on the Hero carousel slider</p>
                  </label>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setEditProduct(null)}
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-bold text-xs uppercase rounded-xl tracking-widest transition-all border border-white/8 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editSaving}
                    className="flex-1 sm:flex-none px-8 py-2.5 bg-linear-to-r from-[#bd922b] to-[#E3C488] text-black font-black text-xs uppercase rounded-xl tracking-widest hover:scale-[1.01] transition-all duration-300 shadow-xl shadow-[#bd922b]/15 flex items-center justify-center gap-2 cursor-pointer btn-gold-shimmer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {editSaving ? (
                      <>
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>

  );
};

export default AdminDashboard;
