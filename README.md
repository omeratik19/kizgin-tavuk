# 🍗 Kızgın Tavuk İzmit - Web Sitesi

Modern ve responsive web sitesi projesi. HTML, CSS ve JavaScript kullanılarak geliştirilmiştir.

## 📋 Özellikler

### 🎨 Tasarım

- **Modern ve Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- **Tavuk Restoranı Teması** - Kırmızı/turuncu renk paleti
- **Smooth Animasyonlar** - Kullanıcı deneyimini artıran geçişler

### 📱 Kullanıcı Deneyimi

- **Mobil Uyumlu Navigasyon** - Hamburger menü
- **Smooth Scroll** - Yumuşak sayfa geçişleri
- **Menü Filtreleme** - Kategorilere göre ürün filtreleme
- **İletişim Formu** - Müşteri geri bildirimi (doğrulama ile)
- **Bildirim Sistemi** - Kullanıcı dostu mesajlar

### 🛠️ Teknik Özellikler

- **Vanilla JavaScript** - Framework bağımsız
- **CSS Grid & Flexbox** - Modern layout sistemleri
- **SEO Optimizasyonu** - Arama motoru dostu

## 📁 Proje Yapısı

```
kızgın tavuk/
├── index.html          # Ana sayfa
├── styles.css          # CSS stilleri
├── script.js           # JavaScript fonksiyonları
├── images/             # Resim dosyaları
│   ├── logo.png
│   ├── hero-chicken.jpg
│   ├── about-us.jpg
│   ├── ... (diğer menü resimleri)
│   └── placeholder.svg   # Hata durumunda gösterilecek resim
└── README.md           # Proje dokümantasyonu
```

## 🚀 Kurulum

1. **Dosyaları Hazırlayın**

   - `images/` klasörüne gerekli resimleri ekleyin.
   - `index.html` ve `script.js` içindeki telefon, adres ve WhatsApp bilgilerini güncelleyin.

2. **Web Sunucusunda Çalıştırın**

   - Web sitenizi bir sunucu ortamında test etmek için aşağıdaki komutlardan birini kullanabilirsiniz:

   ```bash
   # Python ile
   python -m http.server 8000

   # Node.js ile (yüklü değilse: npm install -g serve)
   npx serve .
   ```

## 🔧 Özelleştirme

### Menü Öğeleri

`script.js` dosyasındaki `menuItems` dizisini düzenleyerek yeni ürünler ekleyebilir, mevcut ürünleri güncelleyebilirsiniz.

### İletişim Bilgileri

`index.html` dosyasında yer alan telefon, adres, çalışma saatleri gibi metinleri ve sipariş linklerini kendi bilgilerinizle güncellemeyi unutmayın.
