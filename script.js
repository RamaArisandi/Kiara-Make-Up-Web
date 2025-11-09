// =======================================================
// === FUNGSI & DATA GLOBAL (DAPAT DIAKSES DARI HTML) ===
// =======================================================

// Definisikan opsi sub-layanan spesifik untuk Make-Up
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

// Fungsi 1: Update Sub-Layanan (Perlu di luar DOMContentLoaded)
const updateSubLayanan = (layanan) => {
    const subLayananGroup = document.getElementById('sub-layanan-group');
    const selectSubLayanan = document.getElementById('sub-layanan');

    // Pastikan elemen ada sebelum mencoba mengakses propertinya
    if (!selectSubLayanan || !subLayananGroup) return; 
    
    // Reset dan sembunyikan sub-layanan
    selectSubLayanan.innerHTML = '<option value="" disabled selected>Pilih Detail Layanan</option>';
    subLayananGroup.style.display = 'none';

    if (layanan && subLayananOptions[layanan]) {
        // Tampilkan kembali grup sub-layanan
        subLayananGroup.style.display = 'block';

        subLayananOptions[layanan].forEach(subItem => {
            const option = document.createElement('option');
            option.value = subItem; 
            option.textContent = subItem;
            selectSubLayanan.appendChild(option);
        });
    }
};

// Fungsi 2: Go To Booking (Dipanggil oleh Kartu Layanan di HTML)
function goToBooking(layanan) {
    const contactSection = document.getElementById('contact');
    const selectLayananUtama = document.getElementById('layanan-utama');

    if (contactSection && selectLayananUtama) {
        // A. Gulir ke bagian Kontak/Booking (#contact)
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // B. Tunda sebentar, lalu set nilai dan picu perubahan
        setTimeout(() => {
            selectLayananUtama.value = layanan;
            
            // C. Panggil fungsi updateSubLayanan secara manual
            updateSubLayanan(layanan); 
        }, 300); 
    } else {
        console.error('Elemen booking tidak ditemukan. Pastikan #contact dan #layanan-utama ada.');
    }
}

// Fungsi 3: Lightbox - Buka
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

// Fungsi 4: Lightbox - Tutup
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.style.display = 'none';
    } else {
        console.error('Elemen lightbox tidak ditemukan.');
    }
} 

// ==================================================
// === KODE YANG BERJALAN SETELAH DOM DIMUAT (AMAN) ===
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Event Listener Perubahan Pilihan Utama (Sub-Layanan) ---
    const selectLayananUtama = document.getElementById('layanan-utama');
    if (selectLayananUtama) {
        selectLayananUtama.addEventListener('change', (e) => {
            updateSubLayanan(e.target.value);
        });
    }

    // --- 2. Simulasi Form Submission ---
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Ambil data form di sini
            alert('🎉 Booking Anda berhasil dikirim! Kami akan menghubungi Anda segera.');
            // bookingForm.reset(); 
        });
    }
    
    // --- 3. Lightbox Event Listener (untuk menutup saat klik di luar gambar) ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(event) {
            // Jika klik di luar gambar (pada background), tutup lightbox
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }
});