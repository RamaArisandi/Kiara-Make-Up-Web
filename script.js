// =======================================================
// === FUNGSI & DATA GLOBAL (DAPAT DIAKSES DARI HTML) ===
// =======================================================

// Opsi sub-layanan spesifik untuk tiap jenis make-up
const subLayananOptions = {
    'Reguller Make-Up': [
        'Make Up Graduation SD-SMK/A',
        'Make Up Pendamping',
        'Make Up Among Tamu',
        'Make Up Yearbook',
        'Make Up Bridesmaid',
        'Make Up Anak-anak (Tanpa Bulu Mata)'
    ],
    'Premium Make-Up': [
        'Make Up Engagement',
        'Make Up Pre-Wedding',
        'Make Up Graduation Univ',
        'Make Up Graduation Univ Super',
        'Make Up Akad (Make Up Only)'
    ]
};

// =======================================================
// === UPDATE SUB-LAYANAN BERDASARKAN PILIHAN UTAMA ======
// =======================================================
const updateSubLayanan = (layanan) => {
    const subLayananGroup = document.getElementById('sub-layanan-group');
    const selectSubLayanan = document.getElementById('sub-layanan');

    if (!selectSubLayanan || !subLayananGroup) return;

    // Reset isi dropdown sub-layanan
    selectSubLayanan.innerHTML = '<option value="" disabled selected>Pilih Detail Layanan</option>';
    subLayananGroup.style.display = 'none';

    if (layanan && subLayananOptions[layanan]) {
        subLayananGroup.style.display = 'block';

        subLayananOptions[layanan].forEach(subItem => {
            const option = document.createElement('option');
            option.value = subItem;
            option.textContent = subItem;
            selectSubLayanan.appendChild(option);
        });
    }
};

// =======================================================
// === SCROLL OTOMATIS KE FORM BOOKING DARI KARTU ========
// =======================================================
function goToBooking(layanan) {
    const contactSection = document.getElementById('contact');
    const selectLayananUtama = document.getElementById('layanan-utama');

    if (contactSection && selectLayananUtama) {
        contactSection.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            selectLayananUtama.value = layanan;
            updateSubLayanan(layanan);
        }, 300);
    } else {
        console.error('Elemen booking tidak ditemukan. Pastikan #contact dan #layanan-utama ada.');
    }
}

// =======================================================
// === LIGHTBOX UNTUK GALERI ==============================
// =======================================================
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightbox.style.display = 'flex';
        lightboxImg.src = src;
    } else {
        console.error('Elemen lightbox atau lightbox-img tidak ditemukan.');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
    else console.error('Elemen lightbox tidak ditemukan.');
}

// =======================================================
// === KODE YANG BERJALAN SAAT DOM SUDAH DIMUAT ===========
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Saat user ganti kategori make-up ---
    const selectLayananUtama = document.getElementById('layanan-utama');
    if (selectLayananUtama) {
        selectLayananUtama.addEventListener('change', (e) => {
            updateSubLayanan(e.target.value);
        });
    }

    // --- 2. Saat user kirim form booking ---
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Ambil semua data dari form
            const nama = bookingForm.nama.value;
            const telepon = bookingForm.telepon.value;
            const alamat = bookingForm.alamat.value;
            const tanggal = bookingForm.tanggal.value;
            const layananUtama = bookingForm['layanan-utama'].value;
            const subLayanan = bookingForm['sub-layanan'] ? bookingForm['sub-layanan'].value : '';

            // Nomor WhatsApp Admin (gunakan format internasional tanpa +)
            const adminNumber = '628882782725';

            // Buat pesan otomatis ke WhatsApp (format rapi ke bawah)
            const message = 
                `*Pemesanan Baru Kiara Make-Up*%0A` +
                `=====================%0A` +
                `*Nama:* ${nama}%0A` +
                `*No. Telepon:* ${telepon}%0A` +
                `*Alamat:* ${alamat}%0A` +
                `*Tanggal Booking:* ${tanggal}%0A` +
                `*Layanan:* ${layananUtama}%0A` +
                `*Detail Layanan:* ${subLayanan}%0A` +
                `=====================%0A` +
                `Terima kasih telah melakukan pemesanan 💖`;

            // Buka WhatsApp admin dengan isi pesan otomatis
            const waLink = `https://wa.me/${adminNumber}?text=${message}`;
            window.open(waLink, '_blank');
        });
    }

    // --- 3. Tutup lightbox kalau klik di luar gambar ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) closeLightbox();
        });
    }
});
