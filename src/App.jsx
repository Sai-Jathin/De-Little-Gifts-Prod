import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OWNER_PHONE = "919493456186";

const PRODUCTS = [
  { 
    id: "Mystery Box", 
    name: "Mystery Box", 
    price: "100 - 500", 
    category: "2024 Collection", 
    rating: 4.8,
    description: "A premium limited-edition calendar featuring deep crimson floral aesthetics. Perfect for organizing your year with a touch of gothic elegance. High-quality matte finish 300gsm paper with gold-foil accents.",
    details: ["12 Custom Illustrations", "A3 Size (29.7 x 42 cm)", "Eco-friendly Ink"],
    media: [
      { type: "image", url: "/assets/Calender/Calender1.jpeg" },
      { type: "video", url: "/assets/Calender/Calender2.mp4" }
    ],
    reviews: [
      { id: 1, user: "Anya K.", rating: 5, comment: "The gold foil accents are stunning. Best purchase this year.", images: ["/assets/Calender/Calender1.jpeg"] },
      { id: 2, user: "Rahul M.", rating: 4, comment: "Beautiful design, arrived very securely packed.", images: [] }
    ]
  },
  { 
    id: "Heart", 
    name: "Velvet Heart Box", 
    price: 2499, 
    category: "Luxury Gifts", 
    rating: 5.0,
    description: "Our signature luxury gift box. Wrapped in deep midnight velvet, it contains a curated selection of premium roses. A timeless statement of affection designed to last.",
    details: ["Handmade Velvet Box", "Premium Silk Lining", "Includes Care Card"],
    media: [
      { type: "video", url: "/assets/Heart/Heart1.mp4" },
      { type: "image", url: "/assets/Heart/Heart2.jpeg" }
    ],
    reviews: [
      { id: 1, user: "Ishani S.", rating: 5, comment: "The velvet is so soft and the roses smell amazing!", images: ["/assets/Heart/Heart2.jpeg"] }
    ]
  }
];

// --- SHARED COMPONENTS ---

const Stars = ({ rating, size = "text-[10px]" }) => (
  <div className={`flex gap-0.5 ${size} text-red-600`}>
    {[...Array(5)].map((_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "opacity-100" : "opacity-20"}>★</span>
    ))}
  </div>
);

const CustomTicker = () => {
  const tickerItems = [
    "✨ Full Customization Available",
    "🎁 Personalized Gift Notes",
    "🎀 Bespoke Packaging",
    "🌹 Custom Rose Arrangements",
    "✍️ Hand-written Calligraphy",
  ];

  return (
    <div className="fixed top-[112px] w-full z-[90] bg-white/5 backdrop-blur-md border-b border-white/5 overflow-hidden py-2">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex whitespace-nowrap gap-10 items-center"
      >
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const ProductGallery = ({ media, height = "h-96" }) => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const timerRef = useRef(null);
  
  const current = media[index];
  const isVideo = current?.type === "video" || current?.url.endsWith('.mp4');

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, 5000); // Increased to 5s for better mobile viewing
  };

  const next = (e) => { 
    e?.stopPropagation(); 
    setIndex((prev) => (prev + 1) % media.length);
    resetTimer(); 
  };

  const prev = (e) => { 
    e?.stopPropagation(); 
    setIndex((prev) => (prev - 1 + media.length) % media.length);
    resetTimer();
  };

  // TOUCH SWIPE LOGIC
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const touchEnd = e.targetTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) { // Swipe Left
      next();
      setTouchStart(null);
    } else if (distance < -50) { // Swipe Right
      prev();
      setTouchStart(null);
    }
  };

  useEffect(() => {
    if (media.length > 1) resetTimer();
    return () => clearInterval(timerRef.current);
  }, [media.length]);

  if (!current) return <div className={`w-full ${height} bg-zinc-900`} />;

  return (
    <div 
      className={`relative w-full ${height} bg-zinc-900 overflow-hidden group/gallery`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={current.url} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.4 }} 
          className="w-full h-full"
        >
          {isVideo ? (
            <video 
              src={current.url} 
              className="w-full h-full object-cover" 
              autoPlay 
              muted 
              playsInline 
              loop 
              preload="metadata"
            />
          ) : (
            <img 
              src={current.url} 
              alt="Product" 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          )}
        </motion.div>
      </AnimatePresence>
      
      {media.length > 1 && (
        <>
          {/* Controls: Always visible on small screens, hover on large */}
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-100 lg:opacity-0 lg:group-hover/gallery:opacity-100 transition-opacity pointer-events-none">
            <button onClick={prev} className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center active:bg-red-600 transition-colors">
              <span className="text-white text-sm">←</span>
            </button>
            <button onClick={next} className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center active:bg-red-600 transition-colors">
              <span className="text-white text-sm">→</span>
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {media.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-red-600' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", mobile: "" });

  useEffect(() => {
    const saved = localStorage.getItem("midnight_cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("midnight_cart", JSON.stringify(cart));
  }, [cart]);

  const handleUpdateCart = (product, delta, e) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const isInCart = (id) => cart.some(item => item.id === id);

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    const total = cart.reduce((a, c) => a + c.price * c.quantity, 0);
    let msg = `*✨ NEW ORDER - DE LITTLE GIFTS ✨*\n\n👤 *Customer:* ${customer.name}\n📞 *Mobile:* ${customer.mobile}\n\n--- *ORDER ITEMS* ---\n`;
    cart.forEach((item, i) => msg += `${i + 1}. *${item.name}* (x${item.quantity}) - ₹${item.price * item.quantity}\n`);
    msg += `\n💰 *TOTAL: ₹${total}*`;
    window.location.href = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Outfit'] antialiased">
      
      <div className="fixed top-0 w-full z-[110] bg-red-600 py-2 px-6 shadow-lg">
        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[9px] font-black uppercase tracking-[0.3em] text-center text-white">
          Welcome to DE LITTLE GIFTS • Handcrafted Elegance Delivered
        </motion.p>
      </div>

      <nav className="fixed top-[28px] w-full z-[100] bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="w-20 hidden md:block" /> 
        
        <div className="flex flex-col items-center flex-1 cursor-pointer" onClick={() => setViewingProduct(null)}>
          <h1 className="text-2xl font-black text-red-600 tracking-tighter capitalize leading-tight">
            De Little Gifts
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/85 -mt-0.5">
            Big Joy in Every Little Box
          </p>
        </div>

        <button onClick={() => setCartOpen(true)} className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 active:scale-95 transition">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Bag</span>
          <span className="bg-red-600 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {cart.reduce((a, c) => a + c.quantity, 0)}
          </span>
        </button>
      </nav>

      <CustomTicker />

      <main className="pt-52 pb-20">
        <AnimatePresence mode="wait">
          {!viewingProduct ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="px-4 max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="relative bg-[#0f0f0f] border border-white/5 p-3 rounded-[2rem] cursor-pointer group hover:border-white/20 transition-all">
                  <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4 bg-zinc-900" onClick={() => setViewingProduct(product)}>
                    <ProductGallery media={product.media} height="h-full" />
                  </div>
                  
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { handleUpdateCart(product, 1, e); if(!isInCart(product.id)) setCartOpen(true); }}
                    className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center shadow-2xl z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all ${isInCart(product.id) ? 'bg-white text-black' : 'bg-red-600 text-white'}`}
                  >
                    <span className="text-xl font-bold">{isInCart(product.id) ? '✓' : '+'}</span>
                  </motion.button>

                  <div className="px-2" onClick={() => setViewingProduct(product)}>
                    <div className="flex flex-col mb-1">
                      <h3 className="text-[12px] font-bold truncate opacity-90 uppercase tracking-widest">{product.name}</h3>
                      <Stars rating={product.rating} />
                    </div>
                    <p className="text-red-600 font-black text-lg">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="product-page" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-5xl mx-auto px-6">
              <motion.button whileHover={{ x: -5 }} onClick={() => setViewingProduct(null)} className="mb-8 flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3.5 rounded-full group">
                <span className="text-red-600">←</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Back to Collection</span>
              </motion.button>

              <div className="flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/2 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-[#0f0f0f]">
                  <ProductGallery media={viewingProduct.media} height="h-[450px] md:h-[650px]" />
                </div>

                <div className="w-full md:w-1/2">
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">{viewingProduct.category}</span>
                  <h2 className="text-4xl md:text-5xl font-black italic mb-2 leading-none tracking-tighter">{viewingProduct.name}</h2>
                  <div className="flex items-center gap-3 mb-6">
                    <Stars rating={viewingProduct.rating} size="text-xs" />
                    <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">{viewingProduct.rating} Rating</span>
                  </div>
                  <p className="text-3xl font-black mb-8">₹{viewingProduct.price}</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-8">{viewingProduct.description}</p>
                  
                  <button 
                    onClick={() => { handleUpdateCart(viewingProduct, 1); setCartOpen(true); }} 
                    className={`w-full py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-2xl transition-all mb-4 active:scale-95 ${
                      isInCart(viewingProduct.id) 
                      ? "bg-white text-black" 
                      : "bg-red-600 text-white shadow-red-900/20"
                    }`}
                  >
                    {isInCart(viewingProduct.id) ? "✓ Added to Bag" : `Add to Bag — ₹${viewingProduct.price}`}
                  </button>

                  <div className="pt-12 border-t border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Verified Reviews</h4>
                    <div className="space-y-4">
                      {viewingProduct.reviews.map((rev) => (
                        <div key={rev.id} className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                          <div className="flex justify-between mb-3 text-[10px] font-black uppercase text-red-600 tracking-widest">
                            <span>{rev.user}</span>
                            <Stars rating={rev.rating} />
                          </div>
                          <p className="text-sm text-white/70 italic leading-relaxed">"{rev.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/90 z-[110] backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full md:max-w-md bg-[#0a0a0a] z-[120] p-8 flex flex-col border-l border-white/5">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Bag</h3>
                <button onClick={() => setCartOpen(false)} className="bg-white/5 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 uppercase text-[10px] font-black tracking-widest text-center">Your bag is empty</div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-[1.5rem] items-center border border-white/5">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0">
                        {item.media[0]?.type === "video" || item.media[0]?.url.endsWith('.mp4') ? (
                          <video src={item.media[0].url} className="w-full h-full object-cover" muted playsInline />
                        ) : (
                          <img src={item.media[0].url} className="w-full h-full object-cover" loading="lazy" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold truncate uppercase">{item.name}</p>
                        <p className="text-red-600 font-black text-sm">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                        <button onClick={() => handleUpdateCart(item, -1)} className="text-red-500 font-black text-xs">－</button>
                        <span className="text-[10px] font-black">{item.quantity}</span>
                        <button onClick={() => handleUpdateCart(item, 1)} className="text-green-500 font-black text-xs">＋</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="pt-8 border-t border-white/5 mt-6">
                  <div className="flex justify-between items-center mb-6 px-2">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Subtotal</span>
                    <span className="text-2xl font-black text-red-600">₹{cart.reduce((a,c)=>a+(c.price*c.quantity),0)}</span>
                  </div>
                  <button onClick={() => setCheckoutOpen(true)} className="w-full bg-red-600 py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-xl shadow-red-900/20 active:scale-95">Proceed to Checkout</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setCheckoutOpen(false)} className="fixed inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-[#111] p-8 rounded-[2.5rem] w-full max-w-sm border border-white/10 shadow-2xl">
              <form onSubmit={handleWhatsAppOrder} className="space-y-4">
                <div className="text-center mb-4"><h3 className="text-xl font-black italic uppercase tracking-tighter">Delivery Details</h3></div>
                <input type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 text-sm" onChange={e => setCustomer({...customer, name: e.target.value})} />
                <input type="tel" placeholder="WhatsApp Mobile" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 text-sm" onChange={e => setCustomer({...customer, mobile: e.target.value})} />
                <button type="submit" className="w-full bg-green-600 py-5 rounded-full font-black uppercase text-[10px] tracking-widest mt-2 active:scale-95 shadow-lg shadow-green-900/20">Send Order to WhatsApp ➔</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}