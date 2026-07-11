$(document).ready(function() {

    // FITUR LINK INTERAKTIF: Klik "Pilih Menu Ini" otomatis mengisi form & scroll ke bawah
    $('.btn-select-menu').on('click', function() {
        // Ambil nama menu dari atribut data-menu di card induk
        var namaMenu = $(this).closest('.colorful-product-card').attr('data-menu');
        
        // Pasang value ke elemen select form otomatis
        $('#formTujuan').val(namaMenu);
        
        // Tambahkan efek kilatan border ke form sebagai tanda interaksi berhasil
        $('.luxury-form-container').css('border-color', '#ff4d6d');
        setTimeout(function() {
            $('.luxury-form-container').css('border-color', 'rgba(255,77,109,0.2)');
        }, 1000);

        // Lempar scroll layar langsung menuju section kontak form dengan halus
        $('html, body').animate({
            scrollTop: $("#kontak").offset().top - 90
        }, 800);
    });

    // PROSES INPUT DATA FORM KE WHATSAPP DENGAN SPINNER INTERAKTIF
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();

        var namaUser = document.getElementById('formNama').value;
        var menuPilihan = document.getElementById('formTujuan').value;
        var catatanUser = document.getElementById('formPesan').value;

        // Tampilkan animasi spinner loading
        document.getElementById('btnText').classList.add('d-none');
        document.getElementById('btnLoading').classList.remove('d-none');
        document.getElementById('btnSubmit').disabled = true;

        setTimeout(function() {
            document.getElementById('btnText').classList.remove('d-none');
            document.getElementById('btnLoading').classList.add('d-none');
            document.getElementById('btnSubmit').disabled = false;

            // Nomor WA Utama Kebab Dara Terikat
            var waAdmin = "6282177845467"; 
            
            var teksPesan = `Halo Kebab Dara,\n\n` +
                            `• Nama Pemesan: ${namaUser}\n` +
                            `• Varian Menu: ${menuPilihan}\n\n` +
                            `Catatan & Alamat Kirim:\n"${catatanUser}"`;
            
            var textEncoded = encodeURIComponent(teksPesan);
            
            window.open(`https://api.whatsapp.com/send?phone=${waAdmin}&text=${textEncoded}`, '_blank');
            
            $('#contactForm')[0].reset();
        }, 1100);
    });
});
