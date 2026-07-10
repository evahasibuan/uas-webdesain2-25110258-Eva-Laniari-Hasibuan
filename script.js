$(document).ready(function() {
    // 1. LOGIKA SPA (PINDAH HALAMAN TANPA BROWSER RELOAD) Sesuai Rencana Bab 3.2
    $('[data-page]').on('click', function(e) {
        e.preventDefault();
        var targetPage = $(this).attr('data-page');

        // Sembunyikan semua section, tampilkan kontainer target
        $('.page-section').removeClass('active');
        $('#' + targetPage).addClass('active');

        // Sinkronisasi status link aktif pada navbar 
        $('.navbar-nav .nav-item').removeClass('active');
        $(`.navbar-nav .nav-link[data-page="${targetPage}"]`).parent().addClass('active');

        // Otomatis tutup hamburger menu mobile setelah link diklik
        $('.navbar-collapse').collapse('hide');
        
        // Scroll kembali ke atas halaman secara halus
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. TRIGGER DETAIL MODAL PRODUK VIA DATA ATTRIBUTE
    $('.view-detail').on('click', function() {
        var name = $(this).attr('data-name');
        var desc = $(this).attr('data-desc');

        $('#modalProductName').text(name);
        $('#modalProductDesc').text(desc);
        $('#productModal').modal('show');
    });
});

// 3. HANDLER FORM VALIDASI & BUTTON LOADING STATE (KIRIM WHATSAPP)
function handleFormSubmit(event) {
    event.preventDefault();

    var nama = document.getElementById('formNama').value;
    var tujuan = document.getElementById('formTujuan').value;
    var pesan = document.getElementById('formPesan').value;

    // Memulai Efek Loading State pada Button
    document.getElementById('btnText').classList.add('d-none');
    document.getElementById('btnLoading').classList.remove('d-none');
    document.getElementById('btnSubmit').disabled = true;

    // Simulasi loading pemrosesan pesan selama 1.5 Detik
    setTimeout(function() {
        // Mengembalikan Button State semula
        document.getElementById('btnText').classList.remove('d-none');
        document.getElementById('btnLoading').classList.add('d-none');
        document.getElementById('btnSubmit').disabled = false;

        // Hubungkan ke kontak WA
        var phone = "6282177845467"; 
        var textEncoded = encodeURIComponent(
            `Halo Kebab Dara,\n\nSaya: ${nama}\nKeperluan: ${tujuan}\nPesan/Order:\n${pesan}`
        );
        
        // Redirect otomatis membuka tab WhatsApp baru
        window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${textEncoded}`, '_blank');
        
        // Reset form input setelah terkirim
        document.getElementById('contactForm').reset();
    }, 1500);
}