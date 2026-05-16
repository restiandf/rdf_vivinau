// ==================== DATA ====================
const categoryData = [
  {
    name: "Portfolio",
    price: 28,
    image:
      "assets/images/portfolio/IMG_3041.webp",
  },
  {
    name: "Makeup",
    price: 45,
    image:
      "assets/images/portfolio/IMG_5841.webp",
  },
  {
    name: "Haircare",
    price: 25,
    image:
      "assets/images/portfolio/IMG_7239.webp",
  },
  {
    name: "Tools",
    price: 16,
    image:
      "assets/images/portfolio/IMG_7240.webp",
  },
];

const bestsellersData = [
  {
    name: "Serum",
    price: 38,
    image:
      "assets/images/portfolio/IMG_7709.webp",
  },
  {
    name: "Moisturizer",
    price: 56,
    image:
      "assets/images/portfolio/IMG_7710.webp",
  },
  {
    name: "Face oil",
    price: 48,
    image:
      "assets/images/portfolio/IMG_8509.webp",
  },
  {
    name: "Eye Cream",
    price: 24,
    image:
      "assets/images/portfolio/IMG_8510.webp",
  },
];

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
      { name: "Makeup 1x wedding", price: "Rp. 3.000.000" },
      { name: "Makeup wedding + Retouch", price: "Rp. 4.500.000" },
      { name: "Makeup Sister Bride", price: "Rp. 2.000.000" },
      { name: "Makeup Mom", price: "Rp. 2.500.000" },
    ],
  },
  {
    name: "Makeup Reguler",
    emoji: "✨",
    label: "Reguler",
    labelClass: "text-rose-600",
    description: "Untuk wisuda, lamaran, dan sesi foto",
    bgColor: "bg-rose-50",
    gradientFrom: "from-rose-100",
    gradientTo: "to-rose-200",
    items: [
      { name: "Makeup wisuda & party", price: "Rp. 1.200.000" },
      { name: "Makeup lamaran", price: "Rp. 2.000.000" },
      {
        name: "Photoshoot (Prewed, maternity & foto keluarga)",
        price: "Rp. 2.500.000 (2 looks)",
      },
    ],
  },
];

// ==================== RENDER FUNCTIONS ====================
function renderCategories() {
  const container = document.getElementById("categoryContainer");
  container.innerHTML = categoryData
    .map(
      (item) => `
    <div class="group">
      <div class="relative rounded-xl overflow-hidden hover:shadow-md transition ">
        <img src="${item.image}" alt="${item.name}" class="w-full h-48 md:h-96 object-cover rounded-lg" />
        <button class="absolute bottom-3 right-3 text-gray-400 hover:text-rose-500 transition">♡</button>
      </div>
      <div class="mt-3">
        <h3 class="text-sm md:text-base font-semibold text-gray-800">${item.name}</h3>
        <p class="text-sm font-medium text-gray-700 mt-1">$${item.price}</p>
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
  container.innerHTML = bestsellersData
    .map(
      (item) => `
    <div class="group">
      <div class="relative rounded-xl overflow-hidden hover:shadow-md transition ">
        <img src="${item.image}" alt="${item.name}" class="w-full h-48 md:h-96 object-cover rounded-lg" />
        <button class="absolute bottom-3 right-3 text-gray-400 hover:text-rose-500 transition">♡</button>
      </div>
      <div class="mt-3">
        <h3 class="text-sm md:text-base font-semibold text-gray-800">${item.name}</h3>
        <p class="text-sm font-medium text-gray-700 mt-1">$${item.price}</p>
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
              <span class="font-medium text-amber-800 shrink-0 text-right">${row.price}</span>
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
  bookingModalOuterBackdrop?.classList.add("opacity-100", "pointer-events-auto");
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

// ==================== INIT ====================
renderCategories();
renderBestsellers();
renderServices();
initBookingModal();
initScrollAnimations();
