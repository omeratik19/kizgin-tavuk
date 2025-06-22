// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Page Transition Logic
function switchPage(targetId) {
  const targetPage = document.querySelector(targetId);
  const currentPage = document.querySelector(".page.active");

  if (targetPage && currentPage && targetPage !== currentPage) {
    currentPage.classList.add("hiding");
    // Use a timeout to ensure the class is removed even if animationend doesn't fire
    setTimeout(() => {
      if (currentPage.classList.contains("hiding")) {
        currentPage.classList.remove("active", "hiding");
        targetPage.classList.add("active");
      }
    }, 500); // Should match animation duration

    currentPage.addEventListener(
      "animationend",
      () => {
        if (currentPage.classList.contains("hiding")) {
          currentPage.classList.remove("active", "hiding");
          targetPage.classList.add("active");
        }
      },
      { once: true }
    );
  }
}

// Handle all internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    // Prevent switching to a non-existent page
    if (document.querySelector(targetId)) {
      switchPage(targetId);
    }
    // Close mobile menu if it's a nav link
    if (anchor.classList.contains("nav-link")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// Menu data
const menuItems = [
  {
    id: 1,
    name: "Çıtır Tavuk Tabağı",
    description: "Altın renginde kızartılmış, çıtır çıtır tavuk parçaları.",
    price: "₺150",
    category: "chicken",
    image: "images/placeholder.svg",
  },
  {
    id: 2,
    name: "Izgara Tavuk Şöleni",
    description:
      "Özel baharatlarla marine edilmiş, sulu ve lezzetli ızgara tavuk.",
    price: "₺160",
    category: "chicken",
    image: "images/placeholder.svg",
  },
  {
    id: 3,
    name: "Barbekü Soslu Kanat",
    description:
      "İştah açıcı barbekü sosuyla kaplanmış, kemiksiz tavuk kanatları.",
    price: "₺145",
    category: "chicken",
    image: "images/placeholder.svg",
  },
  {
    id: 4,
    name: "Tavuk Pilav",
    description: "Özel baharatlarla hazırlanmış, sulu tavuk eti ile pilav.",
    price: "₺130",
    category: "chicken",
    image: "images/placeholder.svg",
  },
  {
    id: 5,
    name: "Taze Tavuk Dürüm",
    description:
      "Lavaş ekmeği arasında, bol malzemeli ve lezzetli tavuk dürüm.",
    price: "₺120",
    category: "wraps",
    image: "images/placeholder.svg",
  },
  {
    id: 6,
    name: "Patates Kızartması",
    description: "Çıtır çıtır altın sarısı patates kızartması",
    price: "₺50",
    category: "sides",
    image: "images/placeholder.svg",
  },
  {
    id: 7,
    name: "Soğan Halkası",
    description: "8 adet çıtır soğan halkası",
    price: "₺60",
    category: "sides",
    image: "images/placeholder.svg",
  },
  {
    id: 8,
    name: "Kola",
    description: "330ml Coca Cola",
    price: "₺30",
    category: "drinks",
    image: "images/placeholder.svg",
  },
  {
    id: 9,
    name: "Ayran",
    description: "300ml taze ayran",
    price: "₺25",
    category: "drinks",
    image: "images/placeholder.svg",
  },
];

// Load menu items
function loadMenuItems(category = "all") {
  const menuGrid = document.getElementById("menuGrid");
  if (!menuGrid) return; // Exit if menuGrid is not on the page

  const filteredItems =
    category === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  menuGrid.innerHTML = filteredItems
    .map(
      (item) => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.svg'">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-price">${item.price}</div>
            </div>
        </div>
    `
    )
    .join("");
}

// Menu category filtering
document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".category-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    loadMenuItems(btn.dataset.category);
  });
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector("textarea").value;

    if (!name || !email || !message) {
      showNotification("Lütfen tüm zorunlu alanları doldurun.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Lütfen geçerli bir e-posta adresi girin.", "error");
      return;
    }

    showNotification(
      "Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.",
      "success"
    );
    this.reset();
  });
}

// Notification system
function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Auto-remove
  setTimeout(() => {
    notification.classList.remove("show");
    notification.addEventListener(
      "transitionend",
      () => notification.remove(),
      { once: true }
    );
  }, 5000);
}

// Add CSS for notifications
const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-size: 1rem;
        transform: translateX(calc(100% + 20px));
        transition: transform 0.4s ease-in-out;
    }
    .notification.show {
        transform: translateX(0);
    }
    .notification-success { background: #27ae60; }
    .notification-error { background: #e74c3c; }
    .notification-info { background: #3498db; }
`;
document.head.appendChild(notificationStyle);

// Background slider functionality
let currentBgSlide = 0;
let bgSlideInterval;

function initBackgroundSlider() {
  const bgSlides = document.querySelectorAll(".bg-slide");

  if (!bgSlides.length) return;

  function goToBgSlide(slideIndex) {
    currentBgSlide = slideIndex;

    // Remove active class from all slides
    bgSlides.forEach((slide) => slide.classList.remove("active"));

    // Add active class to current slide
    bgSlides[slideIndex].classList.add("active");
  }

  function nextBgSlide() {
    currentBgSlide = (currentBgSlide + 1) % bgSlides.length;
    goToBgSlide(currentBgSlide);
  }

  // Auto-slide every 4 seconds
  function startBgAutoSlide() {
    bgSlideInterval = setInterval(nextBgSlide, 4000);
  }

  function stopBgAutoSlide() {
    clearInterval(bgSlideInterval);
  }

  // Start auto-slide
  startBgAutoSlide();

  // Pause auto-slide on hover
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", stopBgAutoSlide);
    heroSection.addEventListener("mouseleave", startBgAutoSlide);
  }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  loadMenuItems();
  initBackgroundSlider();
});
