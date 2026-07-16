// SYSTEM DATA COMMERCIAL JAVASCRIPT
let keranjangBelanja = []; 
const daftarHarga = {
    "Kebab Original": 15000,
    "Beef Burger Crispy": 25000,
    "Kebab Spesial Daging": 25000,
    "Kebab Spesial Keju": 25000,
    "Kebab Double Cheese": 25000,
    "Sawarma Daging": 30000,
    "Sawarma Daging Keju": 30000,
    "Kebab Monster Daging": 35000,
    "Kebab Monster Ayam": 35000
};

// FUNGSI UTAMA: MENANGANI PINDAH PAGE (SINGLE PAGE APPLICATION)
function bukaHalaman(pageId) {
    // 1. Sembunyikan semua page section
    let semuaSection = document.querySelectorAll('.page-section');
    semuaSection.forEach(section => {
        section.classList.remove('active-page');
    });

    // 2. Tampilkan section halaman tujuan
    let halamanTujuan = document.getElementById(pageId);
    if (halamanTujuan) {
        halamanTujuan.classList.add('active-page');
    }

    // 3. Atur kelas active pada Navbar agar garis bawah merahnya berpindah
    let semuaNavItem = document.querySelectorAll('.navbar-nav .nav-item');
    semuaNavItem.forEach(item => {
        item.classList.remove('active');
    });
    
    let navAktif = document.querySelector('.id-nav-' + pageId);
    if (navAktif) {
        navAktif.classList.add('active');
    }

    // === SOLUSI MUTAKHIR: FORCE RELOAD MAP JALAN DELIMA ===
    if (pageId === 'order') {
        let mapIframe = document.getElementById('mapIframe');
        if (mapIframe) {
            mapIframe.src = mapIframe.src;
        }
    }

    // 4. Otomatis gulir layar kembali ke atas secara mulus
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 5. Tutup menu navbar di hp otomatis setelah diklik (Responsivitas Mobile)
    let navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        let bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
    }
}

// FUNGSI: Otomatis memilih opsi menu di form & menambah counter keranjang mini (Fitur Komersial)
function pilihMenuOtomatis(namaMenu) {
    // Tambahkan item ke array keranjang
    keranjangBelanja.push(namaMenu);
    
    // Update angka counter melayang di pojok kanan bawah
    document.getElementById('cartCount').innerText = keranjangBelanja.length;
    
    // Isi otomatis field menu ke dalam formulir sebagai pemicu utama
    document.getElementById('inputMenu').value = namaMenu;
    
    // Beri info pop-up manis instan
    alert(`🛒 ${namaMenu} berhasil dimasukkan ke draf pesanan!\nKlik ikon keranjang merah di pojok kanan bawah untuk melihat seluruh detail item belanja.`);
}

// FUNGSI: Menampilkan Detail Isi Keranjang saat Ikon Melayang Diklik
function bukaModalKeranjang() {
    let containerList = document.getElementById('listItemKeranjang');
    let containerTotal = document.getElementById('totalHargaKeranjang');
    
    if (keranjangBelanja.length === 0) {
        containerList.innerHTML = `<p class="text-center text-light-muted py-3 m-0">Keranjang masih kosong, yuk pilih menu kebabnya dulu!</p>`;
        containerTotal.innerText = "Rp 0";
    } else {
        let HTMLKonten = "";
        let hitungTotalSemua = 0;
        
        // Hitung frekuensi/kuantitas item yang sama
        let akumulasiItem = {};
        keranjangBelanja.forEach(item => {
            akumulasiItem[item] = (akumulasiItem[item] || 0) + 1;
        });
        
        // Generate list HTML secara dinamis
        for (let item in akumulasiItem) {
            let qty = akumulasiItem[item];
            let hargaSatuan = daftarHarga[item] || 0;
            let subTotal = hargaSatuan * qty;
            hitungTotalSemua += subTotal;
            
            HTMLKonten += `
                <div class="item-keranjang-row d-flex justify-content-between align-items-center p-3 rounded-3 mb-2 text-start">
                    <div>
                        <span class="fw-bold text-white d-block">${item}</span>
                        <small class="text-white-50">${qty}x @ Rp ${hargaSatuan.toLocaleString('id-ID')}</small>
                    </div>
                    <span class="fw-bold text-gold">Rp ${subTotal.toLocaleString('id-ID')}</span>
                </div>`;
        }
        
        containerList.innerHTML = HTMLKonten;
        containerTotal.innerText = "Rp " + hitungTotalSemua.toLocaleString('id-ID');
    }
    
    // Munculkan Modal Bootstrap secara programmatif
    let modalElement = new bootstrap.Modal(document.getElementById('modalKeranjang'));
    modalElement.show();
}

// FUNGSI: Melanjutkan dari Modal ke Form Isi Alamat
function lanjutKeFormCheckout() {
    // Tutup modal terlebih dahulu
    let modalElement = document.getElementById('modalKeranjang');
    let modalInstansi = bootstrap.Modal.getInstance(modalElement);
    if (modalInstansi) modalInstansi.hide();
    
    // Alihkan halaman ke form pesanan
    bukaHalaman('order');
    
    // Jika keranjang ada isinya, buat catatan ringkasan otomatis di text-area
    if (keranjangBelanja.length > 0) {
        let akumulasiItem = {};
        keranjangBelanja.forEach(item => akumulasiItem[item] = (akumulasiItem[item] || 0) + 1);
        
        let ringkasanTeks = "Pesanan Keranjang:\n";
        let hitungTotalSemua = 0;
        
        for (let item in akumulasiItem) {
            let qty = akumulasiItem[item];
            let hargaSatuan = daftarHarga[item] || 0;
            let subTotal = hargaSatuan * qty;
            hitungTotalSemua += subTotal;
            
            ringkasanTeks += `- ${item} (${qty}x) = Rp ${subTotal.toLocaleString('id-ID')}\n`;
        }
        ringkasanTeks += `\n*Total Estimasi:* Rp ${hitungTotalSemua.toLocaleString('id-ID')}\n\n`;
        ringkasanTeks += "Catatan Tambahan & Alamat Kirim: ";
        
        document.getElementById('inputCatatan').value = ringkasanTeks;
    }
}

// FUNGSI: Mengosongkan Data Keranjang
function kosongkanKeranjang() {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh daftar belanjaan?")) {
        keranjangBelanja = [];
        document.getElementById('cartCount').innerText = 0;
        document.getElementById('inputCatatan').value = "";
        
        let modalElement = document.getElementById('modalKeranjang');
        let modalInstansi = bootstrap.Modal.getInstance(modalElement);
        if (modalInstansi) modalInstansi.hide();
        
        alert("Keranjang berhasil dikosongkan.");
    }
}

// FUNGSI: Mengirim data formulir langsung terformat ke WhatsApp
function kirimKeWhatsApp() {
    let nama = document.getElementById('inputNama').value;
    let menu = document.getElementById('inputMenu').value;
    let catatan = document.getElementById('inputCatatan').value;

    // Validasi data tidak boleh ada yang kosong
    if (!nama || !menu || !catatan) {
        alert('Tolong isi seluruh kolom formulir pemesanan terlebih dahulu!');
        return;
    }

    let nomorWA = "6282177845467"; // Nomor WA aktif terdaftar[cite: 11]
    
    // Susun pesan teks rapi dengan format cetak tebal (*) bawaan WA
    let teksPesan = `Halo Kebab Dara, saya ingin memesan Kuliner Premium:%0A%0A` +
                    `*Nama Pemesan:* ${nama}%0A` +
                    `*Menu Utama:* ${menu}%0A` +
                    `*Detail Catatan & Alamat:*%0A${encodeURIComponent(catatan)}`;

    // Buka tautan WhatsApp di tab baru
    window.open(`https://api.whatsapp.com/send?phone=${nomorWA}&text=${teksPesan}`, '_blank');
}

// KETIKA WEB PERTAMA KALI DI-LOAD: Otomatis jalankan Halaman Home depan
document.addEventListener("DOMContentLoaded", function() {
    bukaHalaman('home');
});
