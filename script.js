// ==================== DATA ====================
const categoryData = [
  {
    name: "Almineta",
    price: 28,
    image: "assets/images/portfolio/almineta.webp",
  },
  {
    name: "Lisa Mariana",
    price: 45,
    image: "assets/images/portfolio/lisa.webp",
  },
  {
    name: "Selvi DA4",
    price: 25,
    image: "assets/images/portfolio/selvi.webp",
  },
  {
    name: "Tasyii",
    price: 16,
    image: "assets/images/portfolio/tasyi.webp",
  },
];

const bestsellersData = [
  {
    name: "Makeup Bride",
    price: 28,
    image: "assets/images/portfolio/IMG_3041.webp",
  },
  {
    name: "Makeup Bride",
    price: 45,
    image: "assets/images/portfolio/IMG_5841.webp",
  },
  {
    name: "Makeup Bride",
    price: 25,
    image: "assets/images/portfolio/IMG_7239.webp",
  },
  {
    name: "Makeup Bride",
    price: 16,
    image: "assets/images/portfolio/IMG_7240.webp",
  },
  {
    name: "Makeup Mom",
    price: 38,
    image: "assets/images/portfolio/IMG_7709.webp",
  },
  {
    name: "Makeup Mom",
    price: 56,
    image: "assets/images/portfolio/IMG_7710.webp",
  },
  {
    name: "Makeup Bride",
    price: 48,
    image: "assets/images/portfolio/IMG_8509.webp",
  },
  {
    name: "Graduation",
    price: 24,
    image: "assets/images/portfolio/IMG_8510.webp",
  },
  {
    name: "Makeup Bride",
    price: 48,
    image: "assets/images/portfolio/bride_1.webp",
  },
  {
    name: "Makeup Bride",
    price: 48,
    image: "assets/images/portfolio/bride_2.webp",
  },
  {
    name: "Makeup Bride",
    price: 48,
    image: "assets/images/portfolio/bride_3.webp",
  },
  {
    name: "Makeup Bride",
    price: 48,
    image: "assets/images/portfolio/bride_4.webp",
  },
  {
    name: "Makeup Bride",
    price: 48,
    image: "assets/images/portfolio/bride_5.webp",
  },
  {
    name: "Makeup Bride",
    price: 48,
    image: "assets/images/portfolio/bride_6.webp",
  },
  {
    name: "Makeup Mom",
    price: 48,
    image: "assets/images/portfolio/mom_1.webp",
  },
  {
    name: "Makeup Mom",
    price: 48,
    image: "assets/images/portfolio/mom_2.webp",
  },
  {
    name: "Makeup Mom",
    price: 48,
    image: "assets/images/portfolio/mom_3.webp",
  },
];

let activeCategoryData = categoryData;
let activeBestsellersData = bestsellersData;

const defaultFounderData = {
  name: "Vivi Nau",
  description:
    "Professional makeup artist dengan pengalaman di wedding, wisuda, dan sesi foto. Passion saya adalah membantu setiap klien tampil percaya diri di hari spesialnya.",
  image_url: "assets/images/logo.png",
  facebook_url: "",
  instagram_url: "",
  twitter_url: "",
  linkedin_url: "",
};

let activeFounderData = defaultFounderData;

const servicesData = [
  {
    name: "Makeup Wedding",
    emoji: "💍",
    label: "Wedding",
    labelClass: "text-amber-600",
    description: "Paket lengkap untuk hari pernikahan Anda",
    bgColor: "bg-amber-50",
    gradientFrom: "from-amber-100",
    gradientTo: "to-amber-200",
    items: [
      { name: "Makeup 1x Wedding", price: "Rp. 3.000.000" },
      { name: "Makeup Wedding + Retouch", price: "Rp. 4.500.000" },
      { name: "Makeup Sister Bride", price: "Rp. 2.000.000" },
      { name: "Makeup Mom", price: "Rp. 2.500.000" },
    ],
  },
  {
    name: "Makeup Reguler",
    emoji: "✨",
    label: "Reguler",
    labelClass: "text-rose-600",
    description: "Untuk Wisuda, Lamaran, dan Sesi Foto",
    bgColor: "bg-rose-50",
    gradientFrom: "from-rose-100",
    gradientTo: "to-rose-200",
    items: [
      { name: "Makeup Wisuda & Party", price: "Rp. 1.200.000" },
      { name: "Makeup Lamaran", price: "Rp. 2.000.000" },
      {
        name: "Photoshoot (Prewed, Maternity & Foto Keluarga)",
        price: "Rp. 2.500.000 (2 looks)",
      },
    ],
  },
];

// ==================== RENDER FUNCTIONS ====================
function renderCategories() {
  const container = document.getElementById("categoryContainer");
  if (!container) return;
  container.innerHTML = activeCategoryData
    .map(
      (item) => `
    <div class="group">
      <div class="relative rounded-xl overflow-hidden hover:shadow-md transition ">
        <img src="${item.image_url || item.image}" alt="${item.name}" class="w-full h-48 md:h-96 object-cover rounded-lg" />
        <button class="absolute bottom-3 right-3 text-gray-400 hover:text-rose-500 transition">♡</button>
      </div>
      <div class="mt-3">
        <h3 class="text-sm md:text-base font-semibold text-gray-800">${item.name}</h3>
        <button
            class="open-book-modal mt-3 w-full border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-medium py-2 rounded-lg text-sm transition"
          >
            Book Now
          </button>
      </div>
    </div>
  `,
    )
    .join("");
}

function renderBestsellers() {
  const container = document.getElementById("bestsellersContainer");
  if (!container) return;
  container.innerHTML = activeBestsellersData
    .map(
      (item) => `
    <div class="group">
      <div class="relative rounded-xl overflow-hidden hover:shadow-md transition ">
        <img src="${item.image_url || item.image}" alt="${item.name}" class="w-full h-48 md:h-96 object-cover rounded-lg" />
        <button class="absolute bottom-3 right-3 text-gray-400 hover:text-rose-500 transition">♡</button>
      </div>
      <div class="mt-3">
        <h3 class="text-sm md:text-base font-semibold text-gray-800">${item.name}</h3>
        <button
            class="open-book-modal mt-3 w-full border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-medium py-2 rounded-lg text-sm transition"
          >
            Book Now
          </button>
      </div>
    </div>
  `,
    )
    .join("");
}

function founderSocialIcon(type) {
  const icons = {
    facebook:
      '<path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
    instagram:
      '<path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>',
    twitter:
      '<path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    linkedin:
      '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  };
  return icons[type] || "";
}

function renderFounderCard() {
  const container = document.getElementById("founderCardContainer");
  if (!container || !activeFounderData) return;

  const f = activeFounderData;
  const imageSrc = f.image_url || defaultFounderData.image_url;
  const socials = [
    { key: "facebook_url", type: "facebook", label: "Facebook" },
    { key: "instagram_url", type: "instagram", label: "Instagram" },
    { key: "twitter_url", type: "twitter", label: "Twitter" },
    { key: "linkedin_url", type: "linkedin", label: "LinkedIn" },
  ].filter((s) => f[s.key]);

  const socialHtml = socials.length
    ? `<div class="flex flex-wrap gap-3 mt-5">
        ${socials
          .map(
            (s) => `
          <a
            href="${f[s.key]}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${s.label}"
            class="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-sm hover:opacity-90 transition"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">${founderSocialIcon(s.type)}</svg>
          </a>`,
          )
          .join("")}
      </div>`
    : "";

  container.innerHTML = `
  <article class="group bg-white rounded-2xl border border-amber-100 p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 md:gap-8 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(217,119,6,0.08)] hover:-translate-y-0.5">
  
  <!-- Container Gambar: Di mobile rata tengah & agak gede (max-w-240px), di desktop menyesuaikan -->
  <div class="shrink-0 w-full max-w-[240px] aspect-[2/3] overflow-hidden rounded-xl sm:rounded-2xl border border-amber-200/60 p-1 bg-amber-50/50">
  <img
    src="${imageSrc}"
    alt="${f.name}"
    class="w-full h-full object-cover rounded-lg sm:rounded-xl bg-gray-50 transition-transform duration-500 group-hover:scale-105"
  />
</div>

  <!-- Konten Teks: Di mobile text-center (tengah), di desktop text-left (kiri) -->
  <div class="flex-1 min-w-0 flex flex-col justify-center text-center sm:text-left items-center sm:items-start w-full">
    
    <!-- Badge Status Modern -->
    <div class="mb-2 sm:mb-3">
      <span class="inline-flex items-center px-2.5 py-0.5 text-sm font-medium tracking-wide text-amber-700 bg-amber-50 rounded-full border border-amber-200/70">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
        Available for Work
      </span>
    </div>
    
    <!-- Nama -->
    <h2 class="text-base sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-1.5 sm:mb-2">
      Hello, I'm <span class="text-amber-600 group-hover:text-amber-700 transition-colors duration-300">${f.name}</span>
    </h2>
    
    <!-- Deskripsi -->
    <p class="text-base text-gray-600 leading-relaxed font-normal">
      ${f.description || ""}
    </p>
    
  </div>
</article>
  `;
}

function renderServices() {
  const container = document.getElementById("servicesContainer");
  if (!container) return;

  container.innerHTML = servicesData
    .map(
      (item) => `
    <div class="bg-white rounded-2xl shadow-sm border border-[#f0e3db] overflow-hidden flex flex-col sm:flex-row transition hover:shadow-md scroll-fade-in">
      <div class="sm:w-2/5 ${item.bgColor} flex items-center justify-center p-5">
        <div class="w-28 h-28 rounded-full bg-gradient-to-tr ${item.gradientFrom} ${item.gradientTo} flex items-center justify-center">
          <span class="text-5xl">${item.emoji}</span>
        </div>
      </div>
      <div class="p-5 sm:p-6 flex-1 flex flex-col">
        <span class="text-xs uppercase tracking-wider ${item.labelClass} font-semibold">${item.label}</span>
        <h3 class="text-xl font-semibold text-gray-800 mt-1">${item.name}</h3>
        <p class="text-gray-500 text-sm mt-1">${item.description}</p>
        <ul class="mt-3 space-y-2 text-sm text-gray-600 flex-1">
          ${item.items
            .map(
              (row) => `
            <li class="flex justify-between gap-3 border-b border-[#f0e3db]/80 pb-2 last:border-0 last:pb-0">
              <span>${row.name}</span>
            </li>`,
            )
            .join("")}
        </ul>
        <div class="flex justify-end mt-4">
          <button
            type="button"
            class="open-book-modal bg-amber-800 hover:bg-amber-900 text-white font-medium px-5 py-2 rounded-full text-sm transition shadow-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// ==================== MOBILE MENU (sidebar kiri animated, mirip contoh) ====================
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");
const mobileMenuCloseBtn = document.getElementById("mobileMenuCloseBtn");
const hamburgerIcon = document.getElementById("hamburgerIcon");
const closeIcon = document.getElementById("closeIcon");
let isMenuOpen = false;

function syncMenuUi() {
  if (isMenuOpen) {
    mobileMenu.classList.remove("-translate-x-full", "pointer-events-none");
    mobileMenu.classList.add("pointer-events-auto");
    mobileMenuBackdrop.classList.remove("opacity-0", "pointer-events-none");
    mobileMenuBackdrop.classList.add("opacity-100", "pointer-events-auto");
    mobileMenuBackdrop.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Tutup menu");
    hamburgerIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    mobileMenu.classList.add("-translate-x-full", "pointer-events-none");
    mobileMenu.classList.remove("pointer-events-auto");
    mobileMenuBackdrop.classList.add("opacity-0", "pointer-events-none");
    mobileMenuBackdrop.classList.remove("opacity-100", "pointer-events-auto");
    mobileMenuBackdrop.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
}

function closeMobileMenu() {
  isMenuOpen = false;
  syncMenuUi();
}

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  isMenuOpen = !isMenuOpen;
  syncMenuUi();
});

mobileMenuBackdrop.addEventListener("click", closeMobileMenu);

mobileMenuCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeMobileMenu();
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("click", (e) => {
  if (!isMenuOpen) return;
  if (mobileMenu.contains(e.target)) return;
  if (menuToggle.contains(e.target)) return;
  closeMobileMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen) closeMobileMenu();
});
const bookingModal = document.getElementById("bookingModal");
const bookingModalCloseBtn = document.getElementById("bookingModalCloseBtn");
const bookingModalOuterBackdrop = document.getElementById(
  "bookingModalBackdrop",
);
const bookingModalInnerBackdrop = document.querySelector(
  ".booking-modal-backdrop",
);
const bookingModalContent = bookingModal?.querySelector('[role="dialog"]');
let isBookingModalOpen = false;

function openBookingModal() {
  if (!bookingModal || isBookingModalOpen) return;
  isBookingModalOpen = true;

  if (isMenuOpen) closeMobileMenu();

  bookingModalOuterBackdrop?.classList.remove(
    "opacity-0",
    "pointer-events-none",
  );
  bookingModalOuterBackdrop?.classList.add(
    "opacity-100",
    "pointer-events-auto",
  );
  bookingModalOuterBackdrop?.setAttribute("aria-hidden", "false");

  bookingModal.classList.remove("pointer-events-none", "opacity-0");
  bookingModal.setAttribute("aria-hidden", "false");

  bookingModalContent?.classList.remove("scale-95");
  bookingModalContent?.classList.add("scale-100");

  document.body.classList.add("overflow-hidden");
}

function closeBookingModal() {
  if (!bookingModal || !isBookingModalOpen) return;
  isBookingModalOpen = false;

  bookingModalOuterBackdrop?.classList.add("opacity-0", "pointer-events-none");
  bookingModalOuterBackdrop?.classList.remove(
    "opacity-100",
    "pointer-events-auto",
  );
  bookingModalOuterBackdrop?.setAttribute("aria-hidden", "true");

  bookingModal.classList.add("pointer-events-none", "opacity-0");
  bookingModal.setAttribute("aria-hidden", "true");

  bookingModalContent?.classList.remove("scale-100");
  bookingModalContent?.classList.add("scale-95");

  document.body.classList.remove("overflow-hidden");
}

function initBookingModal() {
  document.querySelectorAll(".open-book-modal").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  bookingModalCloseBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeBookingModal();
  });

  bookingModalInnerBackdrop?.addEventListener("click", closeBookingModal);
  bookingModalOuterBackdrop?.addEventListener("click", closeBookingModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isBookingModalOpen) closeBookingModal();
  });
}
// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all elements with scroll animation classes
function initScrollAnimations() {
  // Section headers (only add class if not already present)
  document
    .querySelectorAll("h2:not(.scroll-fade-in-left)")
    .forEach((header) => {
      header.classList.add("scroll-fade-in");
      observer.observe(header);
    });

  // Product containers
  document
    .querySelectorAll(
      "#categoryContainer > div, #bestsellersContainer > div, #servicesContainer > div",
    )
    .forEach((item) => {
      item.classList.add("scroll-scale-in", "product-item");
      observer.observe(item);
    });

  // Our Story section
  const ourStory = document.querySelector(".bg-white\\/70");
  if (ourStory) {
    ourStory.classList.add("scroll-fade-in");
    observer.observe(ourStory);
  }

  // Footer
  const footer = document.querySelector(".pt-8.pb-6");
  if (footer) {
    footer.classList.add("scroll-fade-in");
    observer.observe(footer);
  }

  // Observe all elements that already have scroll animation classes
  document.querySelectorAll('[class*="scroll-"]').forEach((element) => {
    observer.observe(element);
  });
}

// ==================== SEED DEFAULT DATA TO SUPABASE ====================
async function seedDefaultDataToSupabase() {
  try {
    const seedItems = [];
    
    // Transform categoryData (Celebrity)
    categoryData.forEach(item => {
      seedItems.push({
        name: item.name,
        image_url: item.image,
        category: 'celebrity'
      });
    });
    
    // Transform bestsellersData (Portfolio)
    bestsellersData.forEach(item => {
      seedItems.push({
        name: item.name,
        image_url: item.image,
        category: 'portfolio'
      });
    });
    
    const { error } = await supabaseClient
      .from('portfolio')
      .insert(seedItems);
      
    if (error) throw error;
    console.log("Seeding default data to Supabase successful!");
  } catch (e) {
    console.error("Failed to seed default data to Supabase:", e);
  }
}

// ==================== INIT ====================
async function initializeData() {
  const isConfigured = typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL && !SUPABASE_URL.includes("MASUKKAN_PROJECT_ID_ANDA");
  
  if (isConfigured && supabaseClient) {
    try {
      // Fetch items from Supabase portfolio table
      const { data, error } = await supabaseClient
        .from('portfolio')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        activeCategoryData = data.filter(item => item.category === 'celebrity');
        activeBestsellersData = data.filter(item => item.category === 'portfolio');
      } else {
        // Database is empty! Auto-seed default items
        await seedDefaultDataToSupabase();
        
        // Fetch again after seeding
        const { data: freshlySeeded } = await supabaseClient
          .from('portfolio')
          .select('*')
          .order('order_index', { ascending: true })
          .order('created_at', { ascending: false });
          
        if (freshlySeeded && freshlySeeded.length > 0) {
          activeCategoryData = freshlySeeded.filter(item => item.category === 'celebrity');
          activeBestsellersData = freshlySeeded.filter(item => item.category === 'portfolio');
        }
      }
      const { data: founderRow, error: founderError } = await supabaseClient
        .from("founders")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!founderError && founderRow) {
        activeFounderData = founderRow;
      }
    } catch (e) {
      console.warn("Could not connect to Supabase, falling back to static local data. Error:", e);
    }
  }

  // Render all UI components
  renderFounderCard();
  renderCategories();
  renderBestsellers();
  renderServices();
  initBookingModal();
  initScrollAnimations();
}

initializeData();
