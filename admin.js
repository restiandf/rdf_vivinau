// ==================== APP STATE & AUTH ====================
const ADMIN_PASSCODE = "jokowi123";
let currentTab = "all";
let allItems = [];
let filteredItems = []; // Menyimpan item terfilter untuk reordering

// DOM Elements
const loginScreen = document.getElementById("loginScreen");
const adminDashboard = document.getElementById("adminDashboard");
const loginForm = document.getElementById("loginForm");
const passcodeField = document.getElementById("passcode");
const btnLogout = document.getElementById("btnLogout");
const btnManualSetup = document.getElementById("btnManualSetup");
const connWarning = document.getElementById("connWarning");

const portfolioForm = document.getElementById("portfolioForm");
const itemNameInput = document.getElementById("itemName");
const itemCategorySelect = document.getElementById("itemCategory");
const fileInput = document.getElementById("fileInput");
const dropzone = document.getElementById("dropzone");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");
const imagePreview = document.getElementById("imagePreview");
const btnRemovePreview = document.getElementById("btnRemovePreview");
const btnSubmit = document.getElementById("btnSubmit");
const btnSubmitText = document.getElementById("btnSubmitText");
const submitSpinner = document.getElementById("submitSpinner");

const itemsLoadingState = document.getElementById("itemsLoadingState");
const itemsEmptyState = document.getElementById("itemsEmptyState");
const itemsGrid = document.getElementById("itemsGrid");
const itemCountBadge = document.getElementById("itemCountBadge");

const tabAll = document.getElementById("tabAll");
const tabPortfolio = document.getElementById("tabPortfolio");
const tabCelebrity = document.getElementById("tabCelebrity");

const founderForm = document.getElementById("founderForm");
const founderLoadingState = document.getElementById("founderLoadingState");
const founderIdInput = document.getElementById("founderId");
const founderImageUrlInput = document.getElementById("founderImageUrl");
const founderNameInput = document.getElementById("founderName");
const founderDescriptionInput = document.getElementById("founderDescription");
const founderFacebookInput = document.getElementById("founderFacebook");
const founderInstagramInput = document.getElementById("founderInstagram");
const founderTwitterInput = document.getElementById("founderTwitter");
const founderLinkedinInput = document.getElementById("founderLinkedin");
const founderFileInput = document.getElementById("founderFileInput");
const founderDropzone = document.getElementById("founderDropzone");
const founderPreview = document.getElementById("founderPreview");
const founderPreviewContainer = document.getElementById("founderPreviewContainer");
const btnRemoveFounderPreview = document.getElementById("btnRemoveFounderPreview");
const btnFounderSubmit = document.getElementById("btnFounderSubmit");
const btnFounderSubmitText = document.getElementById("btnFounderSubmitText");
const founderSubmitSpinner = document.getElementById("founderSubmitSpinner");

let currentFounder = null;
let pendingFounderFile = null;
let isReordering = false;

// Urutan per kategori: order_index naik, lalu created_at lama dulu (stabil)
function sortPortfolioByOrder(items) {
  return [...items].sort((a, b) => {
    const orderA = a.order_index ?? 0;
    const orderB = b.order_index ?? 0;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(a.created_at || 0) - new Date(b.created_at || 0);
  });
}

async function persistCategoryOrder(orderedItems) {
  for (let i = 0; i < orderedItems.length; i++) {
    const newOrder = (i + 1) * 10;
    const itemId = orderedItems[i].id;

    const { data, error } = await supabaseClient
      .from("portfolio")
      .update({ order_index: newOrder })
      .eq("id", itemId)
      .select("id, order_index");

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error(
        "Update urutan ditolak database (RLS). Jalankan file supabase/portfolio_policies.sql di SQL Editor Supabase.",
      );
    }

    orderedItems[i].order_index = newOrder;
    const ref = allItems.find((x) => x.id === itemId);
    if (ref) ref.order_index = newOrder;
  }
}

async function ensureCategoryOrders(category) {
  const items = allItems.filter((i) => i.category === category);
  if (items.length === 0) return;

  const needsNormalize = items.every((i) => i.order_index == null || i.order_index === 0);
  if (!needsNormalize) return;

  const sorted = sortPortfolioByOrder(items);
  await persistCategoryOrder(sorted);
}

// Urutan sama seperti index.html: celebrity (atas) lalu portfolio (bawah)
function splitPortfolioByCategory(data) {
  return {
    celebrity: sortPortfolioByOrder(data.filter((i) => i.category === "celebrity")),
    portfolio: sortPortfolioByOrder(data.filter((i) => i.category === "portfolio")),
  };
}

function buildWebsiteOrderList(data) {
  const split = splitPortfolioByCategory(data);
  return [...split.celebrity, ...split.portfolio];
}

function getItemsForTab(tab) {
  const split = splitPortfolioByCategory(allItems);
  if (tab === "celebrity") return split.celebrity;
  if (tab === "portfolio") return split.portfolio;
  return buildWebsiteOrderList(allItems);
}

// TOAST CONTROLLER
function showToast(title, message, isSuccess = true) {
  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");
  const toastIcon = document.getElementById("toastIcon");

  toastTitle.textContent = title;
  toastMessage.textContent = message;

  if (isSuccess) {
    toastIcon.className = "w-8 h-8 rounded-full flex items-center justify-center bg-green-50 text-green-700";
    toastIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    `;
  } else {
    toastIcon.className = "w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-700";
    toastIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.3c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    `;
  }

  // Animation classes
  toast.classList.remove("translate-y-[-100px]", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-[-100px]", "opacity-0");
  }, 4000);
}

// AUTH CHECK
function checkAuth() {
  const adminLoggedIn = localStorage.getItem("vivinau_admin_auth") === "true";
  if (adminLoggedIn) {
    loginScreen.classList.add("opacity-0", "pointer-events-none");
    setTimeout(() => loginScreen.classList.add("hidden"), 300);
    adminDashboard.classList.remove("hidden");
    initDashboard();
  } else {
    loginScreen.classList.remove("hidden");
    setTimeout(() => loginScreen.classList.remove("opacity-0", "pointer-events-none"), 50);
    adminDashboard.classList.add("hidden");
  }
}

// LOGIN SUBMIT
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputPasscode = passcodeField.value.trim();

  if (inputPasscode === ADMIN_PASSCODE) {
    localStorage.setItem("vivinau_admin_auth", "true");
    showToast("Login Berhasil", "Selamat datang di dasbor admin Vivinau Makeup!", true);
    checkAuth();
  } else {
    showToast("Passcode Salah", "Silakan coba lagi dengan kode yang benar.", false);
    passcodeField.value = "";
    passcodeField.focus();
  }
});

// LOGOUT
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("vivinau_admin_auth");
  showToast("Logout Berhasil", "Sesi Anda telah diakhiri.", true);
  checkAuth();
});

// MANUAL SETUP SMOOTH SCROLL
btnManualSetup.addEventListener("click", () => {
  document.getElementById("manualSetupSection").scrollIntoView({ behavior: "smooth" });
});

// ==================== DASHBOARD BUSINESS LOGIC ====================

function isSupabaseConfigured() {
  return SUPABASE_URL && !SUPABASE_URL.includes("MASUKKAN_PROJECT_ID_ANDA");
}

function initDashboard() {
  if (!isSupabaseConfigured()) {
    connWarning.classList.remove("hidden");
    if (founderLoadingState) founderLoadingState.classList.add("hidden");
    if (founderForm) {
      founderForm.classList.remove("hidden");
      populateFounderForm(null);
    }
    itemsLoadingState.classList.add("hidden");
    itemsEmptyState.classList.remove("hidden");
    itemsEmptyState.querySelector("p").textContent = "Supabase URL Belum Dikonfigurasi!";
    itemsEmptyState.querySelectorAll("p")[1].textContent = "Silakan ikuti Panduan Setup di bagian bawah halaman ini.";
    return;
  }

  connWarning.classList.add("hidden");
  fetchFounder();
  fetchItems();
}

// DRAG AND DROP HANDLERS
dropzone.addEventListener("click", () => fileInput.click());

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("border-amber-500", "bg-amber-50/60");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("border-amber-500", "bg-amber-50/60");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("border-amber-500", "bg-amber-50/60");
  
  if (e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith("image/")) {
      fileInput.files = e.dataTransfer.files;
      handleFileSelected(file);
    } else {
      showToast("Gagal", "File harus berupa file gambar!", false);
    }
  }
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    handleFileSelected(fileInput.files[0]);
  }
});

function handleFileSelected(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.src = e.target.result;
    dropzone.classList.add("hidden");
    imagePreviewContainer.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

btnRemovePreview.addEventListener("click", () => {
  fileInput.value = "";
  imagePreview.src = "";
  imagePreviewContainer.classList.add("hidden");
  dropzone.classList.remove("hidden");
});

// SUBMIT / UPLOAD NEW PORTFOLIO ITEM
portfolioForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!isSupabaseConfigured()) {
    showToast("Error", "Supabase belum dikonfigurasi. Harap setup terlebih dahulu.", false);
    return;
  }

  const name = itemNameInput.value.trim();
  const category = itemCategorySelect.value;
  const file = fileInput.files[0];

  if (!file) {
    showToast("Gambar Kosong", "Silakan pilih gambar terlebih dahulu.", false);
    return;
  }

  // Set loading state
  btnSubmit.disabled = true;
  btnSubmitText.textContent = "Mengunggah Gambar...";
  submitSpinner.classList.remove("hidden");

  try {
    // 1. Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('portfolio-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error(`Gagal mengunggah file: ${uploadError.message}. Pastikan bucket 'portfolio-images' sudah dibuat dan diset Public.`);
    }

    // 2. Get Public URL
    const { data: urlData } = supabaseClient.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);
      
    const publicUrl = urlData.publicUrl;

    // order_index hanya dalam kategori yang sama (terpisah celebrity / portfolio)
    const sameCategory = allItems.filter((item) => item.category === category);
    let nextOrder = 10;
    if (sameCategory.length > 0) {
      const orders = sameCategory.map((item) => item.order_index ?? 0);
      nextOrder = Math.max(...orders) + 10;
    }

    // 3. Save into Supabase Database
    const { error: dbError } = await supabaseClient
      .from('portfolio')
      .insert([
        {
          name: name,
          image_url: publicUrl,
          category: category,
          order_index: nextOrder
        }
      ]);

    if (dbError) {
      console.error("DB Insert error:", dbError);
      // Rollback uploaded storage file
      await supabaseClient.storage.from('portfolio-images').remove([filePath]);
      throw new Error(`Gagal menyimpan data ke database: ${dbError.message}`);
    }

    // Reset Form & State
    portfolioForm.reset();
    btnRemovePreview.click();
    showToast("Sukses", "Portfolio baru berhasil disimpan!", true);
    
    // Refresh Data
    fetchItems();
  } catch (error) {
    showToast("Gagal Unggah", error.message, false);
  } finally {
    btnSubmit.disabled = false;
    btnSubmitText.textContent = "Simpan Portfolio";
    submitSpinner.classList.add("hidden");
  }
});

// ==================== FOUNDER CARD ====================

function populateFounderForm(founder) {
  currentFounder = founder;
  founderIdInput.value = founder?.id || "";
  founderImageUrlInput.value = founder?.image_url || "";
  founderNameInput.value = founder?.name || "";
  founderDescriptionInput.value = founder?.description || "";
  founderFacebookInput.value = founder?.facebook_url || "";
  founderInstagramInput.value = founder?.instagram_url || "";
  founderTwitterInput.value = founder?.twitter_url || "";
  founderLinkedinInput.value = founder?.linkedin_url || "";

  const previewSrc = founder?.image_url || "assets/images/logo.png";
  founderPreview.src = previewSrc;
  pendingFounderFile = null;
  founderFileInput.value = "";
  btnRemoveFounderPreview.classList.add("hidden");
}

async function fetchFounder() {
  if (!founderForm || !founderLoadingState) return;

  founderLoadingState.classList.remove("hidden");
  founderForm.classList.add("hidden");

  try {
    const { data, error } = await supabaseClient
      .from("founders")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    populateFounderForm(data);
    founderLoadingState.classList.add("hidden");
    founderForm.classList.remove("hidden");
  } catch (error) {
    console.error("Fetch founder error:", error);
    showToast("Error Founder", `Gagal memuat data founder: ${error.message}. Pastikan tabel founders sudah dibuat.`, false);
    populateFounderForm(null);
    founderLoadingState.classList.add("hidden");
    founderForm.classList.remove("hidden");
  }
}

founderDropzone.addEventListener("click", () => founderFileInput.click());

founderFileInput.addEventListener("change", () => {
  if (founderFileInput.files.length > 0) {
    pendingFounderFile = founderFileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      founderPreview.src = e.target.result;
      btnRemoveFounderPreview.classList.remove("hidden");
    };
    reader.readAsDataURL(pendingFounderFile);
  }
});

btnRemoveFounderPreview.addEventListener("click", () => {
  pendingFounderFile = null;
  founderFileInput.value = "";
  founderPreview.src = founderImageUrlInput.value || "assets/images/logo.png";
  btnRemoveFounderPreview.classList.add("hidden");
});

founderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!isSupabaseConfigured()) {
    showToast("Error", "Supabase belum dikonfigurasi.", false);
    return;
  }

  const name = founderNameInput.value.trim();
  const description = founderDescriptionInput.value.trim();
  const facebook_url = founderFacebookInput.value.trim();
  const instagram_url = founderInstagramInput.value.trim();
  const twitter_url = founderTwitterInput.value.trim();
  const linkedin_url = founderLinkedinInput.value.trim();

  if (!name || !description) {
    showToast("Form Kosong", "Nama dan deskripsi wajib diisi.", false);
    return;
  }

  btnFounderSubmit.disabled = true;
  btnFounderSubmitText.textContent = "Menyimpan...";
  founderSubmitSpinner.classList.remove("hidden");

  let imageUrl = founderImageUrlInput.value.trim();
  let uploadedPath = null;

  try {
    if (pendingFounderFile) {
      const fileExt = pendingFounderFile.name.split(".").pop();
      const fileName = `founder_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      uploadedPath = `founders/${fileName}`;

      const { error: uploadError } = await supabaseClient.storage
        .from("portfolio-images")
        .upload(uploadedPath, pendingFounderFile);

      if (uploadError) {
        throw new Error(`Gagal mengunggah foto: ${uploadError.message}`);
      }

      const { data: urlData } = supabaseClient.storage
        .from("portfolio-images")
        .getPublicUrl(uploadedPath);

      imageUrl = urlData.publicUrl;
    }

    if (!imageUrl) {
      imageUrl = "assets/images/logo.png";
    }

    const payload = {
      name,
      description,
      image_url: imageUrl,
      facebook_url: facebook_url || null,
      instagram_url: instagram_url || null,
      twitter_url: twitter_url || null,
      linkedin_url: linkedin_url || null,
      is_active: true,
    };

    const founderId = founderIdInput.value;

    if (founderId) {
      const { error: updateError } = await supabaseClient
        .from("founders")
        .update(payload)
        .eq("id", founderId);

      if (updateError) throw updateError;
      showToast("Sukses", "Card founder berhasil diperbarui!", true);
    } else {
      const { data: inserted, error: insertError } = await supabaseClient
        .from("founders")
        .insert([payload])
        .select()
        .single();

      if (insertError) throw insertError;
      founderIdInput.value = inserted.id;
      showToast("Sukses", "Card founder berhasil dibuat!", true);
    }

    founderImageUrlInput.value = imageUrl;
    founderPreview.src = imageUrl;
    pendingFounderFile = null;
    founderFileInput.value = "";
    btnRemoveFounderPreview.classList.add("hidden");

    await fetchFounder();
  } catch (error) {
    if (uploadedPath) {
      await supabaseClient.storage.from("portfolio-images").remove([uploadedPath]);
    }
    showToast("Gagal Simpan", error.message, false);
  } finally {
    btnFounderSubmit.disabled = false;
    btnFounderSubmitText.textContent = "Simpan Card Founder";
    founderSubmitSpinner.classList.add("hidden");
  }
});

// FETCH ALL ITEMS FROM DATABASE
async function fetchItems() {
  itemsLoadingState.classList.remove("hidden");
  itemsEmptyState.classList.add("hidden");
  itemsGrid.classList.add("hidden");

  try {
    const { data, error } = await supabaseClient
      .from("portfolio")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    allItems = data || [];
    await ensureCategoryOrders("celebrity");
    await ensureCategoryOrders("portfolio");
    allItems = buildWebsiteOrderList(allItems);
    renderItemsList();
  } catch (error) {
    console.error("Fetch error:", error);
    showToast("Error Koneksi", `Gagal memuat portfolio: ${error.message}`, false);
    itemsLoadingState.classList.add("hidden");
    itemsEmptyState.classList.remove("hidden");
    itemsEmptyState.querySelector("p").textContent = "Gagal Menghubungkan ke Database!";
    itemsEmptyState.querySelectorAll("p")[1].textContent = "Harap pastikan struktur tabel dan policy Anda sudah tepat.";
  }
}

// RENDER ALL CARDS LIST
function renderItemsList() {
  itemsLoadingState.classList.add("hidden");

  filteredItems = getItemsForTab(currentTab);

  const canReorder = currentTab !== "all";
  itemCountBadge.textContent = `${filteredItems.length} Items`;

  if (filteredItems.length === 0) {
    itemsEmptyState.classList.remove("hidden");
    itemsGrid.classList.add("hidden");
    return;
  }

  itemsEmptyState.classList.add("hidden");
  itemsGrid.classList.remove("hidden");

  itemsGrid.innerHTML = filteredItems.map((item, index) => `
    <div class="bg-stone-50 rounded-2xl overflow-hidden border border-stone-150 shadow-sm flex flex-col group hover:shadow-md transition">
      <div class="relative h-44 overflow-hidden bg-stone-100 shrink-0">
        <img src="${item.image_url}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <span class="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
          item.category === 'celebrity' 
            ? 'bg-amber-100 text-amber-900 border border-amber-200' 
            : 'bg-stone-850/80 text-white backdrop-blur-[2px]'
        }">
          ${item.category === 'celebrity' ? 'Celebrity' : 'Portfolio'}
        </span>

        <!-- REORDER: hanya di tab Celebrity / Portfolio (bukan Semua) -->
        <div class="absolute bottom-2 right-2 flex gap-1 bg-white/95 backdrop-blur-[2px] rounded-xl p-1 shadow-md border border-stone-200/60 transition duration-300">
          <button
            type="button"
            ${canReorder ? `onclick="moveItem(${index}, 'up')"` : "disabled"}
            class="w-7 h-7 flex items-center justify-center bg-stone-50 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold transition disabled:opacity-30 disabled:pointer-events-none"
            title="${canReorder ? "Pindahkan Ke Atas" : "Pilih tab Celebrity atau Portfolio untuk atur urutan"}"
            ${!canReorder || index === 0 ? "disabled" : ""}
          >
            ▲
          </button>
          <button
            type="button"
            ${canReorder ? `onclick="moveItem(${index}, 'down')"` : "disabled"}
            class="w-7 h-7 flex items-center justify-center bg-stone-50 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold transition disabled:opacity-30 disabled:pointer-events-none"
            title="${canReorder ? "Pindahkan Ke Bawah" : "Pilih tab Celebrity atau Portfolio untuk atur urutan"}"
            ${!canReorder || index === filteredItems.length - 1 ? "disabled" : ""}
          >
            ▼
          </button>
        </div>
      </div>
      <div class="p-3 flex-1 flex flex-col justify-between gap-3">
        <h4 class="text-xs font-bold text-gray-800 line-clamp-1">${item.name}</h4>
        <button
          onclick="deleteItem('${item.id}', '${String(item.image_url || "").replace(/'/g, "%27")}')"
          class="w-full bg-red-50 hover:bg-red-100 text-red-650 font-semibold text-[11px] py-2 rounded-xl transition border border-red-100 hover:border-red-200 flex items-center justify-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          Hapus Item
        </button>
      </div>
    </div>
  `).join("");
}

// MOVE ITEM — urutan per kategori (selaras dengan index.html)
window.moveItem = async function(currentIndex, direction) {
  if (isReordering) return;

  if (currentTab === "all") {
    showToast(
      "Pilih Tab Kategori",
      "Atur urutan di tab Celebrity atau Portfolio Utama, bukan Semua.",
      false,
    );
    return;
  }

  if (!isSupabaseConfigured() || !supabaseClient) {
    showToast("Error", "Supabase belum dikonfigurasi.", false);
    return;
  }

  const category = currentTab;
  const items = [...getItemsForTab(category)];
  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (targetIndex < 0 || targetIndex >= items.length) return;

  [items[currentIndex], items[targetIndex]] = [items[targetIndex], items[currentIndex]];

  isReordering = true;

  try {
    showToast("Mengatur Urutan...", "Menyimpan urutan ke Supabase.", true);
    await persistCategoryOrder(items);
    showToast("Sukses", "Urutan tersimpan ke database.", true);
    await fetchItems();
  } catch (error) {
    console.error("Reorder error:", error);
    showToast("Gagal Urutkan", error.message, false);
    await fetchItems();
  } finally {
    isReordering = false;
  }
};

// DELETE AN ITEM
window.deleteItem = async function(id, imageUrl) {
  if (!confirm("Apakah Anda yakin ingin menghapus portfolio ini? Gambar ini akan hilang permanen.")) return;

  try {
    // 1. Delete from Supabase Database
    const { error: dbError } = await supabaseClient
      .from('portfolio')
      .delete()
      .eq('id', id);

    if (dbError) throw dbError;

    // 2. Delete from Supabase Storage (if url points to storage)
    if (imageUrl.includes("storage/v1/object/public/portfolio-images/")) {
      // Extract file path from URL
      const storagePath = imageUrl.split("portfolio-images/").pop();
      if (storagePath) {
        await supabaseClient.storage
          .from('portfolio-images')
          .remove([storagePath]);
      }
    }

    showToast("Sukses Dihapus", "Portfolio berhasil dihapus dari website.", true);
    fetchItems();
  } catch (error) {
    showToast("Gagal Menghapus", error.message, false);
  }
};

// ==================== TAB CONTROLLERS ====================

function setTab(tab, buttonElement) {
  currentTab = tab;
  
  // Reset other buttons
  [tabAll, tabPortfolio, tabCelebrity].forEach(btn => {
    btn.className = "flex-1 text-center py-2 px-3 text-xs font-semibold rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition";
  });

  // Activate this button
  buttonElement.className = "flex-1 text-center py-2 px-3 text-xs font-semibold rounded-xl bg-amber-800 text-white shadow-sm transition";

  renderItemsList();
}

tabAll.addEventListener("click", () => setTab("all", tabAll));
tabPortfolio.addEventListener("click", () => setTab("portfolio", tabPortfolio));
tabCelebrity.addEventListener("click", () => setTab("celebrity", tabCelebrity));

// INITIAL KICKSTART
checkAuth();
