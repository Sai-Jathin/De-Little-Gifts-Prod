import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OWNER_PHONE = "919989311081";

const PRODUCTS = [
  {
    id: "Mystery Box",
    name: "Mystery Box (Customizable)",
    priceRange: "₹1000 - ₹2000",
    category: "2026 Collection",
    rating: 5,
    description:
      "Our signature luxury gift box, A hand-curated mystery box filled with artisanal surprises. Final price varies based on the size and specific craft items included inside.",
    media: [{ type: "video", url: "/assets/mystery_box/mystery_box.mp4" }],
    reviews: [
      {
        id: 1,
        user: "Anya K.",
        rating: 5,
        comment: "Such a beautiful surprise!",
      },
    ],
  },
  {
    id: "Heart frame/Calendar",
    name: "Heart frame/Calendar",
    priceRange: "₹250 - ₹500",
    category: "Calendar",
    rating: 5.0,
    description:
      "Heart frame/Calendar, marked with your loved memorable date. Price varies significantly based on custom rose types and embroidery requests.",
    media: [
      { type: "image", url: "/assets/heart_calendar/heart_calendar.jpeg" },
    ],
    reviews: [
      {
        id: 1,
        user: "Ishani S.",
        rating: 5,
        comment: "The quality is incredible.",
      },
    ],
  },
  {
    id: "Photo PopUp",
    name: "Photo PopUp",
    priceRange: "₹250 - ₹350",
    category: "Greeting Card",
    rating: 5.0,
    description:
      "Photo PopUp is a type of greeting card which popup's your memorable moments and heartfull words.",
    media: [{ type: "video", url: "/assets/photo_popUp/photo_popUp.mp4" }],
    reviews: [
      {
        id: 1,
        user: "Ishani S.",
        rating: 5,
        comment: "I given it to my boyfriend and he loved it",
      },
    ],
  },
  {
    id: "Heart Album",
    name: "Heart Album",
    priceRange: "₹300 - ₹500",
    category: "Album",
    rating: 5.0,
    description:
      "Heart Album looks as small box but when you open, it will make big surpise.",
    media: [{ type: "video", url: "/assets/heart_album/heart_album.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Burning Card",
    name: "Burning Card",
    priceRange: "₹299 - 399",
    category: "2026 Collection",
    rating: 5.0,
    description:
      "Burning Card comes with customized shapes and your loved one will  be waiting to see the surpirce.",
    media: [{ type: "video", url: "/assets/burning_card/burning_card.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Photo Frame",
    name: "Photo Frame",
    priceRange: "₹299 - 399",
    category: "Photo Frame",
    rating: 5.0,
    description:
      "Photo Frame comes with customized shapes and your memorable moments by wishing.",
    media: [{ type: "video", url: "/assets/photo_frame/photo_frame.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Gallery of memories",
    name: "Gallery of memories",
    priceRange: "₹279 - 400",
    category: "Album",
    rating: 5.0,
    description:
      "Gallery of memories comes with customized quotes and images your memorable moments by images.",
    media: [
      {
        type: "video",
        url: "/assets/gallery_of_memories/gallery_of_memories.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
  {
    id: "3D - Frame",
    name: "3D - Frame",
    priceRange: "₹350 - 450",
    category: "Photo Frame",
    rating: 5.0,
    description:
      "3D - Frame comes with photo frames actuallly looks like 3D and images can be customized",
    media: [{ type: "video", url: "/assets/3d_frame/3d_frame.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Vintage Card",
    name: "Vintage Card",
    priceRange: "₹219 - 279",
    category: "Photo Frame",
    rating: 5.0,
    description:
      "Vintage Card comes with your loved photos and greeting them with you hearful feelings.",
    media: [{ type: "video", url: "/assets/vintage_card/vintage_card.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
];

// --- SHARED COMPONENTS ---

const Stars = ({ rating, size = "text-[10px]" }) => (
  <div className={`flex gap-0.5 ${size} text-red-600`}>
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? "opacity-100" : "opacity-20"}
      >
        ★
      </span>
    ))}
  </div>
);

const CustomTicker = ({ text, topOffset }) => {
  return (
    <div
      className="fixed w-full z-[90] bg-white/5 backdrop-blur-md border-b border-white/5 overflow-hidden py-2"
      style={{ top: topOffset }}
    >
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex whitespace-nowrap gap-10 items-center"
      >
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-white/65"
          >
            {text}
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
  const isVideo = current?.type === "video" || current?.url.endsWith(".mp4");

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, 5000);
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

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const touchEnd = e.targetTouches[0].clientX;
    if (touchStart - touchEnd > 50) {
      next();
      setTouchStart(null);
    } else if (touchStart - touchEnd < -50) {
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
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-100 lg:opacity-0 lg:group-hover/gallery:opacity-100 transition-opacity pointer-events-none">
            <button
              onClick={prev}
              className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
            >
              <span className="text-white text-sm">←</span>
            </button>
            <button
              onClick={next}
              className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
            >
              <span className="text-white text-sm">→</span>
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {media.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index ? "w-6 bg-red-600" : "w-1.5 bg-white/30"
                }`}
              />
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

  const productsRef = useRef(null);

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
        return prev
          .map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + delta }
              : item
          )
          .filter((item) => item.quantity > 0);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const isInCart = (id) => cart.some((item) => item.id === id);

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    let msg = `*✨ NEW CUSTOM INQUIRY - DE LITTLE GIFTS ✨*\n\n👤 *Customer:* ${customer.name}\n📞 *Mobile:* ${customer.mobile}\n\n--- *REQUESTED CRAFTS* ---\n`;
    cart.forEach(
      (item, i) =>
        (msg += `${i + 1}. *${item.name}* (x${item.quantity}) - Est: ${
          item.priceRange
        }\n`)
    );
    msg += `\n💬 _I want to discuss customization and get the final pricing._`;
    window.location.href = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(
      msg
    )}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Outfit'] antialiased">
      {/* RED TOP WELCOME BAR */}
      <div className="fixed top-0 w-full z-[110] bg-red-600 py-2 px-6 shadow-lg">
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] font-black uppercase tracking-[0.3em] text-center text-white"
        >
          Welcome to DE LITTLE GIFTS • Handcrafted Elegance Delivered
        </motion.p>
      </div>

      {/* NAVIGATION BAR */}
      <nav className="fixed top-[28px] w-full z-[100] bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="w-20 hidden md:block" />
        <div
          className="flex flex-col items-center flex-1 cursor-pointer"
          onClick={() => setViewingProduct(null)}
        >
          <h1 className="text-2xl font-black text-red-600 tracking-tighter capitalize leading-tight">
            De Little Gifts
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/85 -mt-0.5">
            Big Joy in Every Little Box
          </p>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-3"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-white/50">
            Inquiry
          </span>
          <span className="bg-red-600 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {cart.reduce((a, c) => a + c.quantity, 0)}
          </span>
        </button>
      </nav>

      {/* GLASSY SCROLLING TICKERS */}
      <CustomTicker
        topOffset="112px"
        text="✨ Price varies based on customization • Handmade with love"
      />

      {/* HERO SECTION */}
      <section className="pt-40 pb-16 text-center bg-gradient-to-b from-red-600/20 to-transparent">
        <h1 className="text-4xl md:text-5xl font-black text-red-600">
          Gifts That Create Memories{" "}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            style={{ display: "inline-block" }}
          >
            ❤️
          </motion.span>
        </h1>
        <p className="text-white/70 mt-4 text-sm">
          Handmade customized gifts for birthdays, anniversaries & special
          moments.
        </p>
        <button
          onClick={() =>
            productsRef.current.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-6 bg-red-600 px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest"
        >
          View Handmade Gifts
        </button>
      </section>

      {/* TRUST SECTION */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pb-10 text-center">
        <div className="bg-white/5 p-4 rounded-xl">🚚 Fast Delivery</div>
        <div className="bg-white/5 p-4 rounded-xl">🖐 Handmade</div>
        <div className="bg-white/5 p-4 rounded-xl">💯 Custom Made</div>
        <div className="bg-white/5 p-4 rounded-xl">❤️ Loved by Couples</div>
      </section>

      <main ref={productsRef} className="pt-20 pb-20">
        <AnimatePresence mode="wait">
          {!viewingProduct ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#0f0f0f] border border-white/5 p-3 rounded-[2rem] group hover:border-white/20 transition-all cursor-pointer relative"
                >
                  <div
                    className="aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4 bg-zinc-900"
                    onClick={() => setViewingProduct(product)}
                  >
                    <ProductGallery media={product.media} height="h-full" />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      handleUpdateCart(product, 1, e);
                      if (!isInCart(product.id)) setCartOpen(true);
                    }}
                    className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center shadow-2xl z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all ${
                      isInCart(product.id)
                        ? "bg-white text-black"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    <span className="text-xl font-bold">
                      {isInCart(product.id) ? "✓" : "+"}
                    </span>
                  </motion.button>

                  <div
                    className="px-2"
                    onClick={() => setViewingProduct(product)}
                  >
                    <h3 className="text-[12px] font-bold truncate opacity-90 uppercase tracking-widest">
                      {product.name}
                    </h3>
                    <p className="text-red-600 font-black text-sm">
                      {product.priceRange}
                    </p>
                    <p className="text-[8px] text-white/30 uppercase mt-1 italic">
                      Price depends on details
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="product-page"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-5xl mx-auto px-6"
            >
              <button
                onClick={() => setViewingProduct(null)}
                className="mb-8 flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3.5 rounded-full"
              >
                <span className="text-red-600">←</span>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Back
                </span>
              </button>

              <div className="flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/2 rounded-[2.5rem] overflow-hidden bg-[#0f0f0f]">
                  <ProductGallery
                    media={viewingProduct.media}
                    height="h-[450px] md:h-[650px]"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
                    {viewingProduct.category}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black italic mb-2 leading-none tracking-tighter">
                    {viewingProduct.name}
                  </h2>
                  <p className="text-3xl font-black mb-1">
                    {viewingProduct.priceRange}
                  </p>
                  <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest mb-8 italic">
                    Final price varies with customization
                  </p>

                  <p className="text-white/60 text-sm leading-relaxed mb-8">
                    {viewingProduct.description}
                  </p>

                  <button
                    onClick={() => {
                      handleUpdateCart(viewingProduct, 1);
                      setCartOpen(true);
                    }}
                    className={`w-full py-5 rounded-full font-black uppercase text-xs tracking-widest transition-all ${
                      isInCart(viewingProduct.id)
                        ? "bg-white text-black"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {isInCart(viewingProduct.id)
                      ? "✓ Added to Inquiry"
                      : "Add to Inquiry List"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* INQUIRY DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/90 z-[110] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full md:max-w-md bg-[#0a0a0a] z-[120] p-8 flex flex-col border-l border-white/5"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-red-600">
                  Your Inquiry
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="bg-white/5 w-8 h-8 rounded-full flex items-center justify-center text-[10px]"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 uppercase text-[10px] font-black tracking-widest text-center leading-relaxed">
                    Your list <br /> is empty
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-white/5 p-3 rounded-[1.5rem] items-center border border-white/5"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-900">
                        {item.media[0]?.type === "video" ? (
                          <video
                            src={item.media[0].url}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={item.media[0].url}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold truncate uppercase">
                          {item.name}
                        </p>
                        <p className="text-red-600 font-black text-xs">
                          {item.priceRange}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-full">
                        <button
                          onClick={() => handleUpdateCart(item, -1)}
                          className="text-red-500 font-black text-xs"
                        >
                          －
                        </button>
                        <span className="text-[10px] font-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateCart(item, 1)}
                          className="text-green-500 font-black text-xs"
                        >
                          ＋
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="pt-8 border-t border-white/5 mt-6">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-6 text-center italic">
                    Final price settled after custom discussion
                  </p>
                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full bg-red-600 py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-xl active:scale-95"
                  >
                    Inquire on WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CHECKOUT MODAL */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setCheckoutOpen(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-[#111] p-8 rounded-[2.5rem] w-full max-w-sm border border-white/10 shadow-2xl"
            >
              <form
                onSubmit={handleWhatsAppOrder}
                className="space-y-4 text-center"
              >
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-red-600">
                  Request Custom Quote
                </h3>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 text-sm"
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Number"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 text-sm"
                  onChange={(e) =>
                    setCustomer({ ...customer, mobile: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 py-5 rounded-full font-black uppercase text-[10px] tracking-widest mt-2 active:scale-95"
                >
                  Send Inquiry ➔
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
