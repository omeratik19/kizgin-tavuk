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
  initGame();
});

// Game Logic
let gameCanvas, gameCtx;
let gameRunning = false;
let gameTime = 120; // 2 minutes in seconds
let gameScore = 0;
let gameSpeed = 18; // Başlangıç hızını yüzde 15 artırdım (16 * 1.15 = 18.4, yuvarladım 18)
let gameTimer;
let gameLoop;

// Game objects
let chicken = {
  x: 50,
  y: 200,
  width: 40,
  height: 40,
  velocityY: 0,
  jumping: false,
};

let obstacles = [];
let groundY = 240;
let chickenImage = null;
let lastObstacleX = 0; // Son kaktüsün x pozisyonunu takip etmek için

function initGame() {
  gameCanvas = document.getElementById("gameCanvas");
  if (!gameCanvas) return;

  gameCtx = gameCanvas.getContext("2d");

  // Load chicken image
  chickenImage = new Image();
  chickenImage.src = "images/chicken.png"; // PNG görseli için hazır

  // Start game button
  const startBtn = document.getElementById("startGameBtn");
  if (startBtn) {
    startBtn.addEventListener("click", startGame);
  }

  // Keyboard controls
  document.addEventListener("keydown", handleKeyPress);

  // Mobile touch/click controls
  gameCanvas.addEventListener("click", handleCanvasClick);
  gameCanvas.addEventListener("touchstart", handleCanvasTouch);

  // Draw initial game state
  drawGame();
}

function startGame() {
  gameRunning = true;
  gameTime = 120;
  gameScore = 0;
  gameSpeed = 18; // Başlangıç hızını yüzde 15 artırdım (16 * 1.15 = 18.4, yuvarladım 18)
  obstacles = [];
  lastObstacleX = 0; // Son kaktüs pozisyonunu sıfırla

  // Reset chicken position
  chicken.x = 50;
  chicken.y = groundY - chicken.height;
  chicken.velocityY = 0;
  chicken.jumping = false;

  // Hide overlay
  const overlay = document.getElementById("gameOverlay");
  if (overlay) {
    overlay.classList.add("hidden");
  }

  // Start game loop
  gameLoop = setInterval(updateGame, 16); // ~60 FPS

  // Start timer
  gameTimer = setInterval(() => {
    gameTime--;
    updateGameUI();

    // Increase speed every 15 seconds (daha sık hız artışı)
    if (gameTime % 15 === 0 && gameTime > 0) {
      gameSpeed += 1.5; // Daha büyük hız artışı
    }

    if (gameTime <= 0) {
      endGame(true); // Win
    }
  }, 1000);

  updateGameUI();
}

function handleKeyPress(e) {
  if (!gameRunning) return;

  if (e.code === "Space") {
    e.preventDefault();
    jump();
  } else if (e.code === "KeyR") {
    e.preventDefault();
    resetGame();
  }
}

function jump() {
  if (!chicken.jumping) {
    chicken.velocityY = -12;
    chicken.jumping = true;
  }
}

function updateGame() {
  if (!gameRunning) return;

  // Update chicken physics
  chicken.velocityY += 0.8; // Gravity
  chicken.y += chicken.velocityY;

  // Ground collision
  if (chicken.y > groundY - chicken.height) {
    chicken.y = groundY - chicken.height;
    chicken.velocityY = 0;
    chicken.jumping = false;
  }

  // Generate obstacles with better spacing
  const minDistance = 150; // Kaktüsler arası minimum mesafeyi azalttım
  const spawnChance = 0.015; // Spawn oranını artırdım

  if (
    Math.random() < spawnChance &&
    (obstacles.length === 0 || gameCanvas.width - lastObstacleX > minDistance)
  ) {
    const newObstacle = {
      x: gameCanvas.width,
      y: groundY - 30,
      width: 20,
      height: 30,
    };

    obstacles.push(newObstacle);
    lastObstacleX = newObstacle.x;
  }

  // Update obstacles
  obstacles.forEach((obstacle, index) => {
    obstacle.x -= gameSpeed;

    // Remove off-screen obstacles
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(index, 1);
      gameScore++;
    }

    // Collision detection
    if (checkCollision(chicken, obstacle)) {
      endGame(false); // Lose
    }
  });

  drawGame();
}

function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function drawGame() {
  // Clear canvas
  gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Draw ground
  gameCtx.fillStyle = "#8B4513";
  gameCtx.fillRect(0, groundY, gameCanvas.width, gameCanvas.height - groundY);

  // Draw chicken using PNG image
  if (chickenImage && chickenImage.complete) {
    gameCtx.drawImage(
      chickenImage,
      chicken.x,
      chicken.y,
      chicken.width,
      chicken.height
    );
  } else {
    // Fallback: simple rectangle if image not loaded
    gameCtx.fillStyle = "#FFD700";
    gameCtx.fillRect(chicken.x, chicken.y, chicken.width, chicken.height);
  }

  // Draw obstacles (cacti)
  gameCtx.fillStyle = "#228B22";
  obstacles.forEach((obstacle) => {
    gameCtx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Draw cactus details
    gameCtx.fillStyle = "#006400";
    gameCtx.fillRect(obstacle.x + 5, obstacle.y + 5, 4, 8);
    gameCtx.fillRect(obstacle.x + 11, obstacle.y + 10, 4, 6);
    gameCtx.fillStyle = "#228B22";
  });

  // Draw clouds
  drawClouds();
}

function drawClouds() {
  gameCtx.fillStyle = "rgba(255, 255, 255, 0.8)";

  // Static clouds for background
  const clouds = [
    { x: 100, y: 50, size: 30 },
    { x: 300, y: 80, size: 25 },
    { x: 500, y: 60, size: 35 },
    { x: 700, y: 70, size: 20 },
  ];

  clouds.forEach((cloud) => {
    gameCtx.beginPath();
    gameCtx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
    gameCtx.fill();
  });
}

function updateGameUI() {
  const timeElement = document.getElementById("gameTime");
  const scoreElement = document.getElementById("gameScore");

  if (timeElement) {
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    timeElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  if (scoreElement) {
    scoreElement.textContent = gameScore;
  }
}

function endGame(won) {
  gameRunning = false;

  clearInterval(gameLoop);
  clearInterval(gameTimer);

  const overlay = document.getElementById("gameOverlay");
  const message = document.getElementById("gameMessage");
  const instructions = document.getElementById("gameInstructions");
  const startBtn = document.getElementById("startGameBtn");

  if (overlay) {
    overlay.classList.remove("hidden");
  }

  if (message) {
    if (won) {
      message.textContent = "Tebrikler! 🎉";
      message.parentElement.classList.add("win");
      instructions.textContent = `2 dakika boyunca sahalara toz yutturdun! 🐔 Skorun: ${gameScore}`;
    } else {
      message.textContent = "Oyun Bitti! 😢";
      message.parentElement.classList.remove("win");
      instructions.textContent = `Kaktüse çarptın! Skorun: ${gameScore}`;
    }
  }

  if (startBtn) {
    startBtn.textContent = "Tekrar Oyna";
  }
}

function resetGame() {
  if (gameRunning) {
    endGame(false);
  }
  startGame();
}

function handleCanvasClick(e) {
  if (!gameRunning) return;
  e.preventDefault();
  jump();
}

function handleCanvasTouch(e) {
  if (!gameRunning) return;
  e.preventDefault();
  jump();
}
