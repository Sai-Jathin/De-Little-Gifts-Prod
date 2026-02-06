import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";


const OWNER_PHONE = "919989311081";

const PRODUCTS = [
  {
    id: "Mystery Box",
    name: "Mystery Box (Customizable)",
    priceRange: "₹1000 - ₹2000",
    category: "2026 Collection",
    occasions: ["Birthday", "Anniversary", "Valentine"],
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
    priceRange: "₹300",
    category: "Calendar",
	occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description:
      "Heart frame/Calendar, marked with your loved memorable date. Price varies significantly based on custom rose types and embroidery requests.",
    media: [
      { type: "image", url: "/assets/heart_calendar/heart_calendar.jpeg" },
      { type: "video", url: "/assets/heart_calendar/heart_calendar.mp4" }
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
    priceRange: "₹350",
    category: "Greeting Card",
	occasions: ["Birthday", "Anniversary", "Valentine"],
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
      }
    ],
  },
  {
    id: "Heart Album",
    name: "Heart Album",
    priceRange: "₹300",
    category: "Album",
	occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description:
      "Heart Album looks as small box but when you open, it will make big surpise.",
    media: [{ type: "video", url: "/assets/heart_album/heart_album.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Burning Card",
    name: "Burning Card",
    priceRange: "₹350",
    category: "2026 Collection",
	occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description:
      "Burning Card comes with customized shapes and your loved one will  be waiting to see the surpirce.",
    media: [{ type: "video", url: "/assets/burning_card/burning_card.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Photo Frame",
    name: "Photo Frame",
    priceRange: "₹300",
    category: "Photo Frame",
	occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description:
      "Photo Frame comes with customized shapes and your memorable moments by wishing.",
    media: [{ type: "video", url: "/assets/photo_frame/photo_frame.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Gallery of memories",
    name: "Gallery of memories",
    priceRange: "₹350",
    category: "Album",
	occasions: ["Birthday", "Anniversary", "Valentine"],
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
    priceRange: "₹400",
    category: "Photo Frame",
	occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description:
      "3D - Frame comes with photo frames actuallly looks like 3D and images can be customized",
    media: [{ type: "video", url: "/assets/3d_frame/3d_frame.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Vintage Card",
    name: "Vintage Card",
    priceRange: "₹280",
    category: "Photo Frame",
	occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description:
      "Vintage Card comes with your loved photos and greeting them with you hearful feelings.",
    media: [{ type: "video", url: "/assets/vintage_card/vintage_card.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
];
const MINI_PRODUCTS = [
  {
    id: "Gallery of memories",
    name: "Gallery of memories",
    priceRange: "₹350",
    category: "Album",
	occasions: ["Birthday", "Anniversary", "Valentine"],
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
    priceRange: "₹400",
    category: "Photo Frame",
	occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description:
      "3D - Frame comes with photo frames actuallly looks like 3D and images can be customized",
    media: [{ type: "video", url: "/assets/3d_frame/3d_frame.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Vintage Card",
    name: "Vintage Card",
    priceRange: "₹280",
    category: "Photo Frame",
	occasions: ["Birthday", "Anniversary", "Valentine"], 
    rating: 5.0,
    description:
      "Vintage Card comes with your loved photos and greeting them with you hearful feelings.",
    media: [{ type: "video", url: "/assets/vintage_card/vintage_card.mp4" }],
    reviews: [{ id: 1, user: "Ishani S.", rating: 5, comment: "Awesome" }],
  },
];
const FAQS = [
  {
    q: "Is the gift fully customizable?",
    a: "Yes ❤️ Every gift can be customized based on occasion, message, photos, and design. Final pricing depends on customization."
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–6 working days. Express delivery may be available on request."
  },
  {
    q: "Will I get a preview before making it?",
    a: "Yes. We discuss everything on WhatsApp and share a preview before finalizing."
  },
  {
    q: "Is advance payment required?",
    a: "Yes, advance confirmation is required once customization is finalized."
  }
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
const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mt-16">
      <h3 className="text-xl font-black uppercase tracking-widest text-red-600 mb-6 text-center">
        FAQs
      </h3>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center px-5 py-4 text-left"
            >
              <span className="text-sm font-bold">
                {faq.q}
              </span>
              <span className="text-red-600 font-black">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-4 text-white/70 text-sm"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
const ReviewsSection = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-sm font-black uppercase tracking-widest text-red-600 mb-4">
        Customer Love ❤️
      </h3>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white/5 border border-white/10 p-4 rounded-xl"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold uppercase">{r.user}</p>
              <Stars rating={r.rating} />
            </div>
            <p className="text-sm text-white/60">“{r.comment}”</p>
          </div>
        ))}
      </div>
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
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
const ProductPage = ({ onAddToCart }) => {
	

  const { slug } = useParams();

  const product = PRODUCTS.find(
    (p) => slugify(p.id) === slug
  );
const [customization, setCustomization] = useState({
  occasion: "",
  message: "",
});
  if (!product) {
    return (
      <div className="pt-40 text-center text-white/40">
        Product not found
      </div>
    );
  }

  return (
    <div className="px-6 max-w-5xl mx-auto">
      <button
        onClick={() => window.history.back()}
        className="mb-6 bg-black/60 border border-white/20 px-6 py-3 rounded-full"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2">
          <ProductGallery
            media={product.media}
            height="h-[500px]"
          />
        </div>

        <div className="w-full md:w-1/2">
          <span className="text-red-600 text-[10px] font-black uppercase tracking-widest">
            {product.category}
          </span>

          <h1 className="text-4xl font-black mt-2">
            {product.name}
          </h1>

          <p className="text-3xl font-black mt-2">
            {product.priceRange}
          </p>

          <p className="text-white/60 mt-6">
            {product.description}
          </p>
		  {/* DELIVERY INFO */}
<div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
  <div className="flex items-center gap-2 text-sm">
    <span>🚚</span>
    <span className="text-white/80">
      Delivery in <b>3–7 working days</b>
    </span>
  </div>

  <div className="flex items-center gap-2 text-sm">
    <span>🎨</span>
    <span className="text-white/80">
      Fully handmade & customizable
    </span>
  </div>

  <div className="flex items-center gap-2 text-sm">
    <span>📍</span>
    <span className="text-white/80">
      Delivered across India
    </span>
  </div>

  <p className="text-[11px] text-white/40 italic mt-2">
    *Final delivery timeline may vary based on customization.*
  </p>
</div>

			{/* CUSTOMIZATION */}
<div className="mt-8 space-y-4">
  {/* Occasion */}
  <div>
    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">
      Occasion
    </label>
    <select
      value={customization.occasion}
      onChange={(e) =>
        setCustomization({ ...customization, occasion: e.target.value })
      }
      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-red-600"
    >
      <option value="">Select occasion</option>
      <option>Birthday</option>
      <option>Anniversary</option>
      <option>Valentine</option>
      <option>Proposal</option>
      <option>Other</option>
    </select>
  </div>

  {/* Message */}
  <div>
    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">
      Message on Gift
    </label>
    <textarea
      rows="3"
      placeholder="Write the message you want on the gift..."
      value={customization.message}
      onChange={(e) =>
        setCustomization({ ...customization, message: e.target.value })
      }
      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-red-600 resize-none"
    />
  </div>
</div>

          <button
            onClick={() =>
  onAddToCart({
    ...product,
    customization,
  })
}

            className="mt-8 w-full bg-red-600 py-5 rounded-full font-black uppercase text-xs tracking-widest"
          >Add to Inquiry
          </button>
		  <FAQAccordion />
		  {/* REVIEWS */}
<ReviewsSection reviews={product.reviews} />
        </div>
      </div>
    </div>
  );
};
const HomePage = ({ productsRef, navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState("All");

  // ✅ FILTER LOGIC — MUST BE HERE (before return)
  const filteredProducts = PRODUCTS.filter((p) => {
    const categoryMatch =
      selectedCategory === "All" || p.category === selectedCategory;

    const occasionMatch =
      selectedOccasion === "All" ||
      (p.occasions && p.occasions.includes(selectedOccasion));

    return categoryMatch && occasionMatch;
  });

  return (
    <>
      {/* HERO SECTION */}
      <section className="pt-4 pb-4 text-center bg-gradient-to-b from-red-600/20 to-transparent">
        <h1 className="text-4xl md:text-3xl font-black text-red-600">
          Gifts That Create Memories{" "}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            style={{ display: "inline-block" }}
          >
            ❤️
          </motion.span>
        </h1>
        <p className="text-white/70 mt-4 text-sm">
          Handmade customized gifts for birthdays, anniversary & special moments.
        </p>
        <button
          onClick={() =>
            productsRef.current.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-6 bg-red-600 px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest"
        >
          Explore Handmade Gifts
        </button>
      </section>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 mb-6 px-6">
        <select
          className="bg-black border border-red-700 text-white px-4 py-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Album">Album</option>
          <option value="Photo Frame">Photo Frame</option>
          <option value="Greeting Card">Greeting Card</option>
          <option value="Calendar">Calendar</option>
          <option value="2026 Collection">2026 Collection</option>
        </select>

        <select
          className="bg-black border border-red-700 text-white px-4 py-2 rounded"
          value={selectedOccasion}
          onChange={(e) => setSelectedOccasion(e.target.value)}
        >
          <option value="All">All Occasions</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Valentine">Valentine</option>
          <option value="Proposal">Proposal</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <main ref={productsRef} className="pt-12 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
           {filteredProducts.length === 0 ? (
  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
    <p className="text-red-600 text-2xl font-black mb-2">
      No gifts found 😔
    </p>
    <p className="text-white/60 text-sm max-w-sm mb-6">
      Try changing the occasion or category — we’re sure you’ll find
      something beautiful ❤️
    </p>
    <button
      onClick={() => {
        setSelectedCategory("All");
        setSelectedOccasion("All");
      }}
      className="bg-red-600 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest"
    >
      Reset Filters
    </button>
  </div>
) : (
  filteredProducts.map((product) => (
    <div
      key={product.id}
      className="bg-[#0f0f0f] border border-white/5 p-3 rounded-[2rem] cursor-pointer"
      onClick={() =>
        navigate(`/product/${slugify(product.id)}`)
      }
    >
      <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4 bg-zinc-900">
        <ProductGallery media={product.media} height="h-full" />
      </div>

      <h3 className="text-[12px] font-bold uppercase truncate">
        {product.name}
      </h3>
      <p className="text-red-600 font-black text-sm">
        {product.priceRange}
      </p>
    </div>
  ))
)}

          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
};



export default function App() {
	const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  //const [viewingProduct, setViewingProduct] = useState(null);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [customer, setCustomer] = useState({ name: "", mobile: "" });

  const productsRef = useRef(null);
  // -------------------------------
  // EXIT CONFIRMATION (BACK / CLOSE / REFRESH)
  // -------------------------------
  useEffect(() => {
    // Browser tab close, refresh, back
    const handleBeforeUnload = (e) => {
      if (cart.length > 0) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    // Mobile hardware back (popstate)
    const handlePopState = (e) => {
      if (
        cart.length > 0 &&
        !window.confirm(
          "You have items in your inquiry. Are you sure you want to leave?"
        )
      ) {
        window.history.pushState(null, null, window.location.href); // prevent going back
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // Push initial state to catch back button
    window.history.pushState(null, null, window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [cart]);
  // ------------------------------
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

  let msg =
    `*✨ NEW CUSTOM INQUIRY - DE LITTLE GIFTS ✨*\n\n` +
    `👤 *Customer:* ${customer.name}\n` +
    `📞 *Mobile:* ${customer.mobile}\n\n` +
    `--- *REQUESTED CRAFTS* ---\n`;

  cart.forEach((item, i) => {
    msg += `${i + 1}. *${item.name}* (x${item.quantity}) - ${item.priceRange}\n`;

    if (item.customization?.occasion) {
      msg += `   • Occasion: ${item.customization.occasion}\n`;
    }

    if (item.customization?.message) {
      msg += `   • Message: "${item.customization.message}"\n`;
    }

    msg += `\n`;
  });

  msg += `💬 _I want to discuss customization and get the final pricing._`;

  window.location.href = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(
    msg
  )}`;
};


  const MiniProductCard = ({ product, onAdd, onPreview }) => (
    <div className="min-w-[110px] bg-[#111] border border-white/10 rounded-xl p-2 flex-shrink-0">
      {/* IMAGE / VIDEO (CLICK TO PREVIEW) */}
      <div
        className="w-full h-20 rounded-lg overflow-hidden bg-zinc-900 mb-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onPreview(product);
        }}
      >
        {product.media[0]?.type === "video" ? (
          <video
            src={product.media[0].url}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
        ) : (
          <img
            src={product.media[0].url}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <p className="text-[9px] font-bold truncate uppercase">{product.name}</p>
      <p className="text-red-600 text-[10px] font-black">
        {product.priceRange}
      </p>

      {/* ADD BUTTON */}
      <button
        onClick={() => onAdd(product)}
        className="mt-2 w-full bg-red-600 text-white rounded-full text-[10px] py-1 font-bold"
      >
        +
      </button>
    </div>
  );

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
         onClick={() => navigate("/")}
        >
          <h1 className="text-3xl font-black text-red-600 tracking-tighter capitalize leading-tight">
            De Little Gifts
          </h1>
          <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/85 -mt-0.5">
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

      

      {/* TRUST SECTION */}
      {/*
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pb-10 text-center">
        <div className="bg-white/5 p-4 rounded-xl">🚚 Fast Delivery</div>
        <div className="bg-white/5 p-4 rounded-xl">🖐 Handmade</div>
        <div className="bg-white/5 p-4 rounded-xl">💯 Custom Made</div>
        <div className="bg-white/5 p-4 rounded-xl">❤️ Loved by Couples</div>
      </section>
*/}
      
<div className="pt-[140px]">
  <Routes>
    <Route
      path="/"
      element={<HomePage productsRef={productsRef} navigate={navigate} />}
    />
    <Route
      path="/product/:slug"
      element={
        <ProductPage
          onAddToCart={(product) => handleUpdateCart(product, 1)}
        />
      }
    />
  </Routes>
</div>



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

              <div className="flex-1 overflow-y-auto space-y-6">
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
						{item.customization?.occasion && (
  <p className="text-[9px] text-white/40">
    Occasion: {item.customization.occasion}
  </p>
)}

{item.customization?.message && (
  <p className="text-[9px] text-white/40 line-clamp-2">
    “{item.customization.message}”
  </p>
)}

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

                {/* MINI PRODUCT LIST */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2">
                    Add More Gifts
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {MINI_PRODUCTS.map((product) => (
                      <MiniProductCard
                        key={product.id}
                        product={product}
                        onAdd={(p) => handleUpdateCart(p, 1)}
                        onPreview={(p) => setPreviewProduct(p)}
                      />
                    ))}
                  </div>
                </div>
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
      {/* MINI PRODUCT PREVIEW MODAL */}
      <AnimatePresence>
        {previewProduct && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewProduct(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-[#111] p-6 rounded-[2rem] w-full max-w-sm border border-white/10 shadow-2xl z-[310]"
            >
              <button
                onClick={() => setPreviewProduct(null)}
                className="absolute top-3 right-3 bg-white/10 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>

              <div className="w-full h-64 rounded-xl overflow-hidden bg-zinc-900 mb-4">
                {previewProduct.media[0]?.type === "video" ? (
                  <video
                    src={previewProduct.media[0].url}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={previewProduct.media[0].url}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <h3 className="text-lg font-black uppercase mb-1">
                {previewProduct.name}
              </h3>

              <p className="text-red-600 font-black mb-2">
                {previewProduct.priceRange}
              </p>

              <p className="text-white/60 text-sm mb-4">
                {previewProduct.description}
              </p>

              <button
                onClick={() => {
                  handleUpdateCart(previewProduct, 1);
                  setPreviewProduct(null);
                }}
                className="w-full bg-red-600 py-3 rounded-full font-black uppercase text-xs tracking-widest"
              >
                Add to Inquiry
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
	  {/* WhatsApp Floating Button */}
<a
  href={`https://wa.me/${OWNER_PHONE}`}
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-[400] w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
>
  <img
    src="/assets/whatsapp_logo/whatsapp_logo.png" // your WhatsApp logo
    alt="WhatsApp"
    className="w-8 h-8"
  />
</a>

    </div>
  );
}
