// =======================================================
// === DATA SUB-LAYANAN ==================================
// =======================================================
const subLayananOptions = {
  "Reguller Make-Up": [
    "Make Up Graduation SD-SMK/A",
    "Make Up Pendamping",
    "Make Up Among Tamu",
    "Make Up Yearbook",
    "Make Up Bridesmaid",
    "Make Up Anak-anak (Tanpa Bulu Mata)"
  ],
  "Premium Make-Up": [
    "Make Up Engagement",
    "Make Up Pre-Wedding",
    "Make Up Graduation Univ",
    "Make Up Graduation Univ Super",
    "Make Up Akad (Make Up Only)"
  ]
};

// =======================================================
// === UPDATE SUB-LAYANAN ================================
// =======================================================
function updateSubLayanan(layanan) {
  const group = document.getElementById("sub-layanan-group");
  const select = document.getElementById("sub-layanan");

  if (!group || !select) return;

  select.innerHTML =
    '<option value="" disabled selected>Pilih Detail Layanan</option>';
  group.style.display = "none";

  if (subLayananOptions[layanan]) {
    group.style.display = "block";
    subLayananOptions[layanan].forEach(item => {
      const opt = document.createElement("option");
      opt.value = item;
      opt.textContent = item;
      select.appendChild(opt);
    });
  }
}

// =======================================================
// === SCROLL KE FORM BOOKING ============================
// =======================================================
function goToBooking(layanan) {
  const contact = document.getElementById("contact");
  const selectLayanan = document.getElementById("layanan-utama");

  if (!contact || !selectLayanan) return;

  contact.scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    selectLayanan.value = layanan;
    updateSubLayanan(layanan);
  }, 300);
}

// =======================================================
// === LIGHTBOX GALERI ===================================
// =======================================================
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  if (!lightbox || !img) return;

  img.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) lightbox.style.display = "none";
}

// =======================================================
// === DOM READY =========================================
// =======================================================
document.addEventListener("DOMContentLoaded", () => {
  // Ganti kategori layanan
  const layananUtama = document.getElementById("layanan-utama");
  if (layananUtama) {
    layananUtama.addEventListener("change", e => {
      updateSubLayanan(e.target.value);
    });
  }

  // Submit form booking → WhatsApp
  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const nama = form.nama.value;
      const telepon = form.telepon.value;
      const alamat = form.alamat.value;
      const tanggal = form.tanggal.value;
      const layanan = form["layanan-utama"].value;
      const detail = form["sub-layanan"]
        ? form["sub-layanan"].value
        : "-";

      const admin = "628882782725";

      const pesan = `
*Pemesanan Baru Kiara Make-Up*
=====================
Nama: ${nama}
No. HP: ${telepon}
Alamat: ${alamat}
Tanggal: ${tanggal}
Layanan: ${layanan}
Detail: ${detail}
=====================
Terima kasih 💖
`;

      window.open(
        `https://wa.me/${admin}?text=${encodeURIComponent(pesan)}`,
        "_blank"
      );
    });
  }

  // Tutup lightbox klik luar
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) closeLightbox();
    });
  }
});
