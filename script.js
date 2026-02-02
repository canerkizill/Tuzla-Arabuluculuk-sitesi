// Intersection Observer API kullanarak animasyonları tetikleme

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry) // Test için konsola yazdırır
        if (entry.isIntersecting) {
            // Öğe ekranda görünür olduğunda 'show' sınıfını ekle
            entry.target.classList.add('show');
        } else {
            
        }
    });
});


const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// 1. İkona tıklayınca menüyü aç/kapat
hamburger.addEventListener('click', () => {
    // Hem menüye hem ikona 'active' sınıfını ekle/çıkar
    navMenu.classList.toggle('active');
});

// 2. Menüdeki bir linke tıklanırsa menüyü kapat (UX için önemli)
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
// --- İLETİŞİM FORMU SİMÜLASYONU ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Sayfanın yenilenmesini engelle

        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        const status = document.getElementById("status"); // Varsa durum mesajı için
        
        // 1. Butonu "Gönderiliyor..." moduna al
        btn.innerText = 'Gönderiliyor...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        // Form verilerini hazırla
        const data = new FormData(e.target);

        // 2. Formspree'ye veriyi gönder (AJAX)
        fetch(e.target.action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // --- BAŞARILI OLURSA ---
                btn.innerText = 'Mesajınız İletildi ✓';
                btn.style.backgroundColor = '#28a745'; // Yeşil
                btn.style.opacity = '1';
                
                contactForm.reset(); // Formu temizle
                
                // 3 saniye sonra butonu eski haline getir
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = ''; 
                    btn.disabled = false;
                }, 3000);

            } else {
                // --- HATA OLURSA ---
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert("Hata: " + data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Bir sorun oluştu, lütfen daha sonra tekrar deneyin.");
                    }
                    // Butonu eski haline getir
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
            }
        }).catch(error => {
            // --- İNTERNET KOPUKSA VS. ---
            alert("Gönderim hatası! İnternet bağlantınızı kontrol edin.");
            btn.innerText = originalText;
            btn.disabled = false;
        });
    });
}