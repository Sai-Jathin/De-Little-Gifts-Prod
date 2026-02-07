import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

const OWNER_PHONE = "919989311081";
const CARE_INSTRUCTIONS = [
  "Handle with clean, dry hands to avoid smudges.",
  "Keep away from water, moisture, and direct sunlight.",
  "Store flat or frame to preserve shape and colors.",
  "Avoid placing heavy objects on top of the card.",
  "✨ Each Grify card is handmade with love—treat it like a keepsake!",
];

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
      { type: "video", url: "/assets/heart_calendar/heart_calendar.mp4" },
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
      },
    ],
  },
  {
    id: "Birthday Fire Card",
    name: "Birthday Fire Card",
    priceRange: "₹350",
    category: "2026 Collection",
    occasions: ["Birthday"],
    rating: 5.0,
    description: [
      "📏 17 x 12 cm compact size",
      "🔥 Creates stunning fire effect",
      "🎩 Perfect for magic & pranks",
      "♻️ Reusable with proper care",
      "🎁 Fun gift & surprise idea",
    ],
    media: [
      {
        type: "image",
        url: "/assets/birthday_fire_card/birthday_fire_card1.webp",
      },
      {
        type: "image",
        url: "/assets/birthday_fire_card/birthday_fire_card2.webp",
      },
      {
        type: "image",
        url: "/assets/birthday_fire_card/birthday_fire_card3.webp",
      },
      {
        type: "image",
        url: "/assets/birthday_fire_card/birthday_fire_card4.webp",
      },
      {
        type: "video",
        url: "/assets/birthday_fire_card/birthday_fire_card.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Nagendra", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Swing Photo Frame",
    name: "Swing Photo Frame",
    priceRange: "₹649",
    category: "2026 Collection",
    occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description: [
      // This line now has the highlight
      "<span class='text-red-600 font-black uppercase tracking-widest'>Personalized Swing Photo Frame</span>",
      "Make your memories come alive with this elegant Swing Photo Frame, thoughtfully designed to display your favorite photos in a unique, rotating style. Handcrafted with a smooth white finish and classy design, it adds a warm, personalized touch to any space.",
      "Whether it’s a birthday, anniversary, wedding, or simply a way to say “you’re special”, this frame makes every memory stand out beautifully.",
      "✨ <span class='text-red-600 font-black uppercase tracking-widest'>Features:</span>",
      "Premium handcrafted quality",
      "Swing-style rotating photo design",
      "Suitable for all occasions – birthdays, anniversaries, weddings & more",
      "Elegant white finish with modern typography",
      "Perfect for home décor or thoughtful gifting",
      "Celebrate moments that matter with a frame that moves — just like your memories!",
    ],
    media: [
      {
        type: "image",
        url: "/assets/swing_photo_frame/swing_photo_frame1.webp",
      },
      {
        type: "image",
        url: "/assets/swing_photo_frame/swing_photo_frame2.webp",
      },
      {
        type: "image",
        url: "/assets/swing_photo_frame/swing_photo_frame3.webp",
      },
      {
        type: "video",
        url: "/assets/swing_photo_frame/swing_photo_frame.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Nagendra", rating: 5, comment: "Awesome" }],
  },
  {
    id: "Wheel of Memories",
    name: "Wheel of Memories",
    priceRange: "₹899",
    category: "2026 Collection",
    occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description: [
      "📏 21 x 20 cm medium size",
      "⌚ Stylish design with fine details",
      "🎁 Great for gifting & décor",
      "🌟 Premium quality finish",
      "🏡 Perfect keepsake for any space",
    ],
    media: [
      {
        type: "image",
        url: "/assets/wheel_of_memories/wheel_of_memories1.webp",
      },
      {
        type: "image",
        url: "/assets/wheel_of_memories/wheel_of_memories2.webp",
      },
      {
        type: "video",
        url: "/assets/wheel_of_memories/wheel_of_memories.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Nagendra", rating: 5, comment: "Awesome" }],
  },
  {
    id: "The Vintage Foldbook",
    name: "The Vintage Foldbook",
    priceRange: "₹669",
    category: "Vintage Vibe",
    occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description: [
		"🎉 Elegant kraft-style birthday card with black ribbon bow",
		"🎁 Unique gift box design – perfect for surprises",
		"💌 Spacious inside for photos, messages & personal notes",
		"🌿 Handmade with premium textured paper",
		"✨ Ideal for birthdays, parties & special celebrations",
    ],
    media: [
      {
        type: "image",
        url: "/assets/the_vintage_foldbook/the_vintage_foldbook1.webp",
      },
      {
        type: "image",
        url: "/assets/the_vintage_foldbook/the_vintage_foldbook2.webp",
      },
      {
        type: "video",
        url: "/assets/the_vintage_foldbook/the_vintage_foldbook.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Prasanth", rating: 5, comment: "Beautiful Vintage vibe" }],
  },
  {
    id: "Mini Scrapebook",
    name: "Mini Scrapebook",
    priceRange: "₹669",
    category: "2026 Collection",
    occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description: [
		"🎉 Handmade black scrapbook with “Happy Birthday” banner design",
		"📔 Sturdy square shape, bound with metal rings for easy page turning",
		"✨ Ideal for storing photos, messages & memories",
		"📏 Compact size: approx. 15 x 15 cm",
		"🎁 Perfect keepsake gift for birthdays",
    ],
    media: [
      {
        type: "image",
        url: "/assets/mini_scrapebook/mini_scrapebook1.webp",
      },
      {
        type: "image",
        url: "/assets/mini_scrapebook/mini_scrapebook2.webp",
      },
	  {
        type: "image",
        url: "/assets/mini_scrapebook/mini_scrapebook3.webp",
      },
      {
        type: "image",
        url: "/assets/mini_scrapebook/mini_scrapebook4.webp",
      },
	  {
        type: "image",
        url: "/assets/mini_scrapebook/mini_scrapebook5.webp",
      },
      {
        type: "video",
        url: "/assets/mini_scrapebook/mini_scrapebook.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Shreeya", rating: 5, comment: "Fell in love with this mini lovable book" }],
  },
  {
    id: "Double Waterfall Card",
    name: "Double Waterfall Card",
    priceRange: "₹649",
    category: "2026 Collection",
    occasions: ["Birthday", "Anniversary", "Valentine"],
    rating: 5.0,
    description: [
		"📐 13 x 15 cm handy size",
		"💌 Customizable with photo/text",
		"🎉 Perfect for birthdays & occasions",
		"🌸 Premium quality finish",
		"🎁 Thoughtful keepsake",
    ],
    media: [
      {
        type: "image",
        url: "/assets/double_waterfall_card/double_waterfall_card1.webp",
      },
      {
        type: "image",
        url: "/assets/double_waterfall_card/double_waterfall_card2.webp",
      },
	  {
        type: "image",
        url: "/assets/double_waterfall_card/double_waterfall_card3.webp",
      },
      {
        type: "video",
        url: "/assets/double_waterfall_card/double_waterfall_card.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Lakshmi", rating: 5, comment: "Looks simple but feels like heartfull of emotions as lot of memories" }],
  },
  {
    id: "Heart light Card",
    name: "Heart light Card",
    priceRange: "₹649",
    category: "2026 Collection",
    occasions: ["Birthday", "Anniversary", "Valentine","Proposal"],
    rating: 5.0,
    description: [
		"📐 14.5 x 21 cm romantic card",
		"💡 LED light-up heart design",
		"🖼️ Personalized with couple photo",
		"🎁 Perfect for anniversaries & gifting",
		"❤️ Keepsake full of love & memories",
    ],
    media: [
      {
        type: "image",
        url: "/assets/heart_light_card/heart_light_card1.webp",
      },
      {
        type: "image",
        url: "/assets/heart_light_card/heart_light_card2.webp",
      },
      {
        type: "video",
        url: "/assets/heart_light_card/heart_light_card.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Nikhil", rating: 5, comment: "I have given git to my wife and she loved it" }],
  },
  {
    id: "Ferris Wheel Card",
    name: "Ferris Wheel Card",
    priceRange: "₹729",
    category: "2026 Collection",
    occasions: ["Birthday", "Anniversary", "Valentine","Proposal"],
    rating: 5.0,
    description: [
		"🌟 Elegant handcrafted design",
		"📏 Size: 17 x 23 cm (medium & versatile)",
		"🎁 Ideal for gifting & décor purposes",
		"✨ Durable & stylish finishing",
		"🏡 Perfect for home, office, or events",
    ],
    media: [
      {
        type: "image",
        url: "/assets/ferris_wheel_card/ferris_wheel_card1.webp",
      },
      {
        type: "image",
        url: "/assets/ferris_wheel_card/ferris_wheel_card2.webp",
      },
	  {
        type: "image",
        url: "/assets/ferris_wheel_card/ferris_wheel_card3.webp",
      },
      {
        type: "video",
        url: "/assets/ferris_wheel_card/ferris_wheel_card1.mp4",
      },
	  {
        type: "video",
        url: "/assets/ferris_wheel_card/ferris_wheel_card2.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Sachin", rating: 5, comment: "Unexpected, it is awesome my girl suprised" }],
  },
  {
    id: "Chocolate Card",
    name: "Chocolate Card",
    priceRange: "₹499",
    category: "Greeting Card",
    occasions: ["Birthday", "Anniversary", "Valentine","Proposal"],
    rating: 5.0,
    description: [
		"🌟 Elegant handcrafted design",
		"🎁 Ideal for gifting purposes",
		"✨ Durable & stylish finishing",
		"🏡 Perfect for gifting",
    ],
    media: [
      {
        type: "image",
        url: "/assets/chocolate_card/chocolate_card1.webp",
      },
      {
        type: "image",
        url: "/assets/chocolate_card/chocolate_card2.webp",
      },
	  {
        type: "video",
        url: "/assets/chocolate_card/chocolate_card.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Bharath", rating: 5, comment: "I have written customized with all promise notes to my wife and it was very nice" }],
  },
  {
    id: "HBD Pop Box",
    name: "HBD Pop Box",
    priceRange: "₹499",
    category: "Vintage Vibe",
    occasions: ["Birthday", "Anniversary", "Valentine","Proposal"],
    rating: 5.0,
    description: [
		"📐 10 x 21 cm elegant size",
		"🎀 Wrapped with pink satin ribbon",
		"💌 Romantic “Love” design cover",
		"🎁 Perfect for gifting & surprises",
		"🌸 Premium quality keepsake",
    ],
    media: [
      {
        type: "image",
        url: "/assets/hbd_pop_box/hbd_pop_box1.webp",
      },
      {
        type: "image",
        url: "/assets/hbd_pop_box/hbd_pop_box2.webp",
      },
	  {
        type: "image",
        url: "/assets/hbd_pop_box/hbd_pop_box3.webp",
      },
      {
        type: "image",
        url: "/assets/hbd_pop_box/hbd_pop_box4.webp",
      },
	  {
        type: "video",
        url: "/assets/hbd_pop_box/hbd_pop_box.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Ashish", rating: 5, comment: "I have my colleague and she kept it infornt of desk, It was so good" }],
  },
  {
    id: "HeartSlide Card",
    name: "HeartSlide Card",
    priceRange: "₹499",
    category: "Vintage Vibe",
    occasions: ["Birthday", "Anniversary", "Valentine","Proposal"],
    rating: 5.0,
    description: [
		"💌 Romantic & Love",
		"🎁 Perfect for gifting & surprises",
		"🌸 Premium quality keepsake",
    ],
    media: [
      {
        type: "image",
        url: "/assets/heartslide_card/heartslide_card1.webp",
      },
      {
        type: "image",
        url: "/assets/heartslide_card/heartslide_card2.webp",
      },
	  {
        type: "video",
        url: "/assets/heartslide_card/heartslide_card1.mp4",
      },
	  {
        type: "video",
        url: "/assets/heartslide_card/heartslide_card2.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Rakesh", rating: 5, comment: "I gifted it to my favoriteperson in my life and it a beautiful memory" }],
  },
  {
    id: "Endless Love Box",
    name: "Endless Love Box",
    priceRange: "₹469",
    category: "2026 Collection",
    occasions: ["Birthday", "Anniversary", "Valentine","Proposal"],
    rating: 5.0,
    description: [
		"💌 Romantic & Love",
		"🎁 Perfect for gifting & surprises",
		"🌸 Premium quality keepsake",
    ],
    media: [
      {
        type: "image",
        url: "/assets/endless_love_box/endless_love_box1.webp",
      },
      {
        type: "image",
        url: "/assets/endless_love_box/endless_love_box2.webp",
      },
	  {
        type: "video",
        url: "/assets/endless_love_box/endless_love_box.mp4",
      },
    ],
    reviews: [{ id: 1, user: "Amith", rating: 5, comment: "I gifted it to my girlfried and she loved it" }],
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
    name: "Burning Card (Heart Shape)",
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
    category: "Vintage Vibe",
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
    a: "Yes ❤️ Every gift can be customized based on occasion, message, photos, and design. Final pricing depends on customization.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–6 working days. Express delivery may be available on request.",
  },
  {
    q: "Will I get a preview before making it?",
    a: "Yes. We discuss everything on WhatsApp and share a preview before finalizing.",
  },
  {
    q: "Is advance payment required?",
    a: "Yes, advance confirmation is required once customization is finalized.",
  },
];

// --- SHARED COMPONENTS ---
const CareInstructions = () => {
  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-xs font-black uppercase tracking-widest text-red-600 mb-3">
        Care Instructions
      </h3>

      <ul className="space-y-2 text-sm text-white/70">
        {CARE_INSTRUCTIONS.map((item, index) => (
          <li key={index} className="flex gap-2 items-start">
            <span className="text-red-500 mt-1">•</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

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
              <span className="text-sm font-bold">{faq.q}</span>
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

const ProductGallery = ({
  media,
  height = "h-96",
  activeIndex = 0,
  onChange,
  onOpen,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(activeIndex);
  }, [activeIndex]);

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
    setIndex((prev) => {
      const newIndex = (prev + 1) % media.length;
      onChange?.(newIndex);
      return newIndex;
    });
    resetTimer();
  };

  const prev = (e) => {
    e?.stopPropagation();
    setIndex((prev) => {
      const newIndex = (prev - 1 + media.length) % media.length;
      onChange?.(newIndex);
      return newIndex;
    });
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
          onClick={() => onOpen?.(index)}
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
          <div className="hidden md:flex absolute inset-0 items-center justify-between px-4 opacity-0 group-hover/gallery:opacity-100 transition-opacity pointer-events-none">
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
const ProductPage = ({ onAddToCart, cart, openCart }) => {
  const { slug } = useParams();

  const product = PRODUCTS.find((p) => slugify(p.id) === slug);

  const cartItem = product ? cart.find((c) => c.id === product.id) : null;

  const quantity = cartItem?.quantity ?? 0;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const lastTap = useRef(0);
  const [pincode, setPincode] = useState(
    () => localStorage.getItem("pincode") || ""
  );
  const [deliveryInfo, setDeliveryInfo] = useState(
    () => localStorage.getItem("deliveryInfo") || ""
  );
  const [locationInfo, setLocationInfo] = useState(
    () => JSON.parse(localStorage.getItem("locationInfo")) || null
  );
  const [checking, setChecking] = useState(false);

  const [customization, setCustomization] = useState({
    occasion: "",
    message: "",
  });
  const thumbnailsRef = useRef([]);

  useEffect(() => {
    if (thumbnailsRef.current[activeIndex]) {
      thumbnailsRef.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % product.media.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex(
          (prev) => (prev - 1 + product.media.length) % product.media.length
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, product.media.length]);

  useEffect(() => {
    setZoom(1);
  }, [activeIndex]);

  useEffect(() => {
    if (pincode && deliveryInfo) return;
  }, []);

  useEffect(() => {
    if (pincode.length === 6) {
      checkDeliveryTimeline();
    }
  }, [pincode]);

  const checkDeliveryTimeline = async () => {
    if (checking) return;
    if (pincode.length !== 6) {
      setDeliveryInfo("Please enter a valid 6-digit pincode");
      return;
    }

    try {
      setChecking(true);
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await res.json();

      if (data[0].Status !== "Success") {
        setDeliveryInfo("Delivery not available for this pincode");
        return;
      }

      const postOffice = data[0].PostOffice[0];
      const city = postOffice.District;
      const state = postOffice.State;

      let timeline = "3–5 working days";
      if (["Kerala", "Tamil Nadu", "Karnataka", "Telangana"].includes(state)) {
        timeline = "2–4 working days";
      }

      const infoText = `📍 Delivery available in ${city}, ${state}. Estimated delivery: ${timeline}.`;
      setDeliveryInfo(infoText);
      setLocationInfo({ city, state, timeline });

      localStorage.setItem("pincode", pincode);
      localStorage.setItem("deliveryInfo", infoText);
      localStorage.setItem(
        "locationInfo",
        JSON.stringify({ city, state, timeline })
      );
    } catch (err) {
      setDeliveryInfo("Something went wrong. Try again.");
    } finally {
      setChecking(false);
    }
  };

  if (!product) {
    return (
      <div className="pt-40 text-center text-white/40">Product not found</div>
    );
  }

  return (
    <div className="px-6 max-w-6xl mx-auto pt-10">
      {/*<button
        onClick={() => window.history.back()}
        className="mb-6 bg-black/60 border border-white/20 px-6 py-3 rounded-full"
      >
        ← Back
      </button>
	*/}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* LEFT COLUMN: Sticky Wrapper */}
        <div className="w-full md:w-1/2 md:sticky md:top-24">
          {/* FIX: items-center centers the vertical thumbnails relative to the image */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Desktop Thumbnails */}
            {product.media.length > 1 && (
              <div className="hidden md:flex flex-col gap-2 overflow-y-auto max-h-[500px] no-scrollbar">
                {product.media.map((item, i) => (
                  <div
                    key={i}
                    ref={(el) => (thumbnailsRef.current[i] = el)}
                    onClick={() => setActiveIndex(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border flex-shrink-0 transition-all
                      ${
                        i === activeIndex
                          ? "border-red-600 scale-105"
                          : "border-transparent opacity-60"
                      }
                    `}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                      />
                    ) : (
                      <img
                        src={item.url}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Main Display */}
            <div className="flex-1 w-full">
              <ProductGallery
                media={product.media}
                height="h-[500px]"
                activeIndex={activeIndex}
                onChange={setActiveIndex}
                onOpen={(i) => {
                  setActiveIndex(i);
                  setLightboxOpen(true);
                }}
              />
            </div>
          </div>

          {/* Mobile Thumbnails */}
          {product.media.length > 1 && (
            <div className="flex md:hidden mt-4 gap-2 overflow-x-auto pb-2">
              {product.media.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (thumbnailsRef.current[i] = el)}
                  onClick={() => setActiveIndex(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border flex-shrink-0
                    ${
                      i === activeIndex
                        ? "border-red-600"
                        : "border-transparent opacity-60"
                    }
                  `}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                    />
                  ) : (
                    <img
                      src={item.url}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-1/2">
          <span className="text-red-600 text-[10px] font-black uppercase tracking-widest">
            {product.category}
          </span>
          <h1 className="text-4xl font-black mt-2">{product.name}</h1>
          <p className="text-3xl font-black mt-2">{product.priceRange}</p>

          {/* Info Card */}
          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span>🚚</span> Delivery in <b>3–7 working days</b>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span>🎨</span> Fully handmade & customizable
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span>📍</span> Delivered across India
            </div>
          </div>

          {/* Pincode Check */}
          <div className="mt-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setPincode(val);
                  if (val.length < 6) setDeliveryInfo("");
                }}
                placeholder="Enter pincode"
                maxLength={6}
                className="flex-1 bg-black border border-white/20 rounded-full px-4 py-3 text-sm text-white outline-none focus:border-red-500"
              />
              <button
                onClick={checkDeliveryTimeline}
                disabled={checking}
                className="bg-red-600 px-6 rounded-full text-xs font-bold uppercase text-white disabled:opacity-50"
              >
                {checking ? "..." : "Check"}
              </button>
            </div>
            {deliveryInfo && (
              <p className="mt-2 text-sm text-white/70">{deliveryInfo}</p>
            )}
          </div>

          {/* Customization */}
          <div className="mt-8 space-y-4">
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
            <textarea
              rows="3"
              placeholder="Message on gift..."
              value={customization.message}
              onChange={(e) =>
                setCustomization({ ...customization, message: e.target.value })
              }
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-red-600 resize-none"
            />
          </div>
          {/* Cart Button */}
          <div className="mt-8 flex justify-center">
            {quantity === 0 ? (
              <button
                onClick={() => {
                  onAddToCart({ ...product, customization }, 1);
                  setTimeout(openCart, 120);
                }}
                className="bg-red-600 px-10 py-4 rounded-full font-black uppercase text-xs text-white"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-6 bg-black/40 px-6 py-3 rounded-full border border-white/10">
                <button
                  onClick={() => onAddToCart(product, -1)}
                  className="text-red-500 font-black text-xl"
                >
                  −
                </button>
                <span className="text-white font-black text-xl">
                  {quantity}
                </span>
                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="text-green-500 font-black text-xl"
                >
                  +
                </button>
              </div>
            )}
          </div>
          {/* Description */}
          {typeof product.description === "string" ? (
            <p
              className="text-white/60 mt-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          ) : (
            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-widest text-white/50 mb-3">
                Description
              </h3>
              <ul className="space-y-3 text-sm text-white/80">
                {product.description.map((point, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span className="text-red-500 mt-1">•</span>
                    <span
                      className="leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* PHOTO INFO BOX */}
          <div className="mt-6 p-4 bg-white/5 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg">📸</span>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                Photo Personalization
              </p>
            </div>
            <div className="bg-black/50 border border-red-600/20 p-3 rounded-2xl">
              <p className="text-[11px] font-bold text-white flex items-center gap-2">
                <span className="text-green-500">✓</span> Send via WhatsApp
              </p>
              <p className="text-[9px] text-white/50 mt-1 leading-relaxed">
                No need to upload now! You can share your photos directly on
                WhatsApp once you place this inquiry.
              </p>
            </div>
          </div>
          {/* CARE INSTRUCTIONS */}
          <CareInstructions />

          <FAQAccordion />
          <ReviewsSection reviews={product.reviews} />
        </div>
      </div>

      {/* LIGHTBOX (Logic unchanged) */}
      <AnimatePresence>
        {lightboxOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 bg-black/95 z-[500]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-[510] flex items-center justify-center"
              onTouchStart={(e) =>
                (touchStartX.current = e.changedTouches[0].screenX)
              }
              onTouchEnd={(e) => {
                touchEndX.current = e.changedTouches[0].screenX;
                if (touchStartX.current - touchEndX.current > 50)
                  setActiveIndex((prev) => (prev + 1) % product.media.length);
                if (touchEndX.current - touchStartX.current > 50)
                  setActiveIndex(
                    (prev) =>
                      (prev - 1 + product.media.length) % product.media.length
                  );
              }}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-6 right-6 text-white text-3xl"
              >
                ✕
              </button>
              <div className="max-w-[90vw] max-h-[90vh]">
                {product.media[activeIndex].type === "video" ? (
                  <video
                    src={product.media[activeIndex].url}
                    controls
                    autoPlay
                    muted
                    playsInline
                    webkit-playsinline
                    preload="metadata"
                    className="max-h-[90vh] rounded-xl bg-black"
                  />
                ) : (
                  <motion.img
                    src={product.media[activeIndex].url}
                    className="max-h-[90vh] object-contain rounded-xl"
                    style={{ scale: zoom }}
                    onWheel={(e) =>
                      setZoom((z) =>
                        Math.min(Math.max(z + e.deltaY * -0.001, 1), 3)
                      )
                    }
                  />
                )}
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-3 py-2 rounded-xl">
                {product.media.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border ${
                      i === activeIndex
                        ? "border-white"
                        : "border-transparent opacity-60"
                    }`}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
          Handmade customized gifts for birthdays, anniversary & special
          moments.
        </p>
        {/*<button
          onClick={() =>
            productsRef.current.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-6 bg-red-600 px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest"
        >
          Explore Handmade Gifts
        </button>*/}
      </section>

      {/* FILTERS */}
      <div className="flex gap-3 mb-3 px-4 overflow-x-auto no-scrollbar md:flex-wrap md:px-6">
        <select
          className="
  bg-black
  border border-red-700
  text-white
  px-3 py-2
  rounded-full
  text-xs
  min-w-[140px]
  focus:outline-none
  focus:border-red-500
"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Album">Album</option>
          <option value="Photo Frame">Photo Frame</option>
          <option value="Greeting Card">Greeting Card</option>
          <option value="Calendar">Calendar</option>
          <option value="2026 Collection">2026 Collection</option>
		  <option value="Vintage Vibe">Vintage Vibe</option>

        </select>

        <select
          className="
  bg-black
  border border-red-700
  text-white
  px-3 py-2
  rounded-full
  text-xs
  min-w-[140px]
  focus:outline-none
  focus:border-red-500
"
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
      <main ref={productsRef} className="pt-3 pb-12">
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
                  onClick={() => navigate(`/product/${slugify(product.id)}`)}
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
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const [isCartOpen, setCartOpen] = useState(false);
  //const [viewingProduct, setViewingProduct] = useState(null);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [customer, setCustomer] = useState({ name: "", mobile: "" });

  const productsRef = useRef(null);
  // -------------------------------
  // EXIT CONFIRMATION (BACK / CLOSE / REFRESH)
  // -------------------------------

  const handleUpdateCart = (product, delta, e) => {
    if (e) e.stopPropagation();

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);

      // 🟢 If item already exists → update it
      if (existingIndex !== -1) {
        const updated = [...prev];

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.max(updated[existingIndex].quantity + delta, 0),
          customization:
            product.customization ?? updated[existingIndex].customization,
        };

        // remove item if quantity becomes 0
        return updated.filter((item) => item.quantity > 0);
      }

      // 🟢 Add new item only if delta is positive
      if (delta > 0) {
        return [
          ...prev,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      // 🟢 If trying to remove non-existing item → do nothing
      return prev;
    });
  };

  const isInCart = (id) => cart.some((item) => item.id === id);
  const handleWhatsAppOrder = (e) => {
    e.preventDefault();

    let msg =
      `*✨ DE LITTLE GIFTS - NEW CUSTOM INQUIRY ✨*\n\n` +
      `👤 *Customer:* ${customer.name}\n` +
      `📞 *Mobile:* ${customer.mobile}\n\n`;

    // 📍 DELIVERY INFO (from pincode)
    const savedLocation = JSON.parse(localStorage.getItem("locationInfo"));
    if (savedLocation) {
      msg +=
        `📍 *Delivery Location*\n` +
        `City: ${savedLocation.city}\n` +
        `State: ${savedLocation.state}\n` +
        `Estimated Delivery: ${savedLocation.timeline}\n\n`;
    }

    msg += `--- *REQUESTED CRAFTS* ---\n`;

    cart.forEach((item, i) => {
      msg += `${i + 1}. *${item.name}* (x${item.quantity}) - ${
        item.priceRange
      }\n`;
      // 👇 ADD THIS LINE HERE
      msg += `   📸 *Photos:* Customer will send via WhatsApp later if required\n`;
      if (item.customization?.occasion) {
        msg += `   • Occasion: ${item.customization.occasion}\n`;
      }

      if (item.customization?.message) {
        msg += `   • Message: "${item.customization.message}"\n`;
      }

      msg += `\n`;
    });

    msg += `💬 _I want to discuss customization and get the final pricing._`;

    const whatsappURL = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(
      msg
    )}`;

    // ✅ Desktop → WhatsApp Web | Mobile → WhatsApp App (automatic)
    window.open(whatsappURL, "_blank");

    // ✅ RESET FLOW (premium UX)
    setCart([]);
    setCustomer({ name: "", mobile: "" });
    setCheckoutOpen(false);
    setCartOpen(false);

    navigate("/");
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
      <div className="flex gap-2 mt-2 justify-center items-center">
        <button
          onClick={() => onAdd(product, -1)}
          className="bg-black/40 w-6 h-6 rounded-full flex items-center justify-center text-red-500 font-bold"
        >
          −
        </button>
        <span className="text-white font-bold text-sm">
          {cart.find((c) => c.id === product.id)?.quantity || 0}
        </span>
        <button
          onClick={() => onAdd(product, 1)}
          className="bg-red-600 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"
        >
          ＋
        </button>
      </div>
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
      <nav className="fixed top-[28px] w-full z-[100] bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Left placeholder only on md+ */}
        <div className="hidden md:block w-20" />

        {/* Center logo & tagline */}
        <div className="flex flex-col items-center flex-1 text-center cursor-pointer">
          <h1 className="text-2xl md:text-3xl font-black text-red-600 tracking-tight md:tracking-tighter capitalize leading-tight">
            De Little Gifts
          </h1>
          <p className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/85 -mt-0.5">
            Big Joy in Every Little Box
          </p>
        </div>

        {/* Right Inquiry button */}
        <button
          onClick={() => setCartOpen(true)}
          className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-3"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-white/50">
            Cart
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
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<HomePage productsRef={productsRef} navigate={navigate} />}
          />
          <Route
            path="/product/:slug"
            element={
              <ProductPage
                onAddToCart={handleUpdateCart} // pass the function directly
                cart={cart} // <- pass cart here
                openCart={() => setCartOpen(true)} // 👈 ADD THIS
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
                  Your Cart
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
                        onAdd={handleUpdateCart} // pass directly
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
                {/* Name input: only letters */}
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  pattern="[A-Za-z\s]+"
                  inputMode="text"
                  onKeyPress={(e) => {
                    if (!/[A-Za-z\s]/.test(e.key)) e.preventDefault();
                  }}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 text-sm"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                    setCustomer({ ...customer, name: value });
                  }}
                />

                {/* WhatsApp number input: only digits */}
                <input
                  type="tel"
                  placeholder="WhatsApp Number"
                  required
                  pattern="\d+"
                  inputMode="numeric"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 text-sm"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setCustomer({ ...customer, mobile: value });
                  }}
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
