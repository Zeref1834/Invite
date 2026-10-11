
/* =========================================
   MỞ THIỆP - HIỆU ỨNG CỬA SONG HỶ
========================================= */

document.body.classList.add("locked");

const gateScreen = document.getElementById("gateScreen");
const openInvitation = document.getElementById("openInvitation");

if (gateScreen && openInvitation) {
  openInvitation.addEventListener("click", () => {
    // Không cho click nhiều lần
    openInvitation.disabled = true;
    // Bắt đầu tách 2 cánh
    gateScreen.classList.add("is-opening");
    /*
     * Chờ hiệu ứng cánh cửa mở xong
     */
    setTimeout(() => {
      gateScreen.classList.add("is-opened");
      // Cho phép scroll
      document.body.classList.remove("locked");
      // Đưa trang về đầu
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      /*
       * PHÁT NHẠC
       * Giữ nguyên cơ chế hiện tại của bạn:
       * người dùng vừa click nên trình duyệt
       * cho phép play audio.
       */
      const openingMusic = document.getElementById("music");

      if (openingMusic) {

        openingMusic.play()
          .then(() => {
            const btn =
              document.getElementById("musicBtn");
            if (btn) {
              btn.textContent = "❚❚";
            }
            if (typeof playing !== "undefined") {
              playing = true;
            }
          })
          .catch(() => { });
      }

      // Chạy Auto scroll
      setTimeout(() => {
        lastTime = performance.now();
        animationId = requestAnimationFrame(autoScroll);
      }, 2000);
    }, 1500);
  });
}

// =============================
// THIỆP CƯỚI ONLINE
// Chỉnh ngày cưới tại WEDDING_DATE
// =============================

const WEDDING_DATE = new Date("2026-11-28T17:30:00+07:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = WEDDING_DATE - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML =
      "<div style='grid-column:1/-1'><b>❤️</b><span>HÔM NAY LÀ NGÀY HẠNH PHÚC</span></div>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Background music
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
let playing = false;

musicBtn.addEventListener("click", async () => {
  if (playing) {
    music.pause();
    musicBtn.textContent = "♫";
  } else {
    try {
      await music.play();
      musicBtn.textContent = "❚❚";
    } catch {
      alert("Hãy thêm file assets/music.mp3 để sử dụng nhạc nền.");
    }
  }
  playing = !playing;
});

// RSVP demo
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzb0S0e8U2Z2Td4wl4ZEfvpNfbaZ8-WxVu2KpT0S-lE-vDydf3IVaFqrbm7yoQOU6HT/exec";

document.getElementById("rsvpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const guestName = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const message = document.getElementById("message").value.trim();

  const success = document.getElementById("success");
  const submitButton = form.querySelector('button[type="submit"]');

  if (!guestName) return;

  submitButton.disabled = true;

  try {
    if (attendance === "yes") {
      const data = new URLSearchParams({
        name: guestName,
        attendance: attendance,
        message: message
      });

      // Gửi yêu cầu cross-origin đến Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: data
      });
    }

    success.textContent = attendance === "yes"
      ? "Cảm ơn bạn! Hẹn gặp bạn trong ngày vui của chúng mình ❤️"
      : "Cảm ơn bạn đã phản hồi. Chúng mình rất tiếc vì bạn không thể tham dự ❤️";

    success.style.display = "block";
    form.reset();

  } catch (error) {
    console.error("Lỗi gửi RSVP:", error);
    alert("Không gửi được yêu cầu. Vui lòng kiểm tra kết nối và thử lại.");
  } finally {
    submitButton.disabled = false;
  }
});

// Falling petals
function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.setProperty("--x", (Math.random() * 240 - 120) + "px");
  petal.style.animationDuration = (5 + Math.random() * 5) + "s";
  petal.style.opacity = .35 + Math.random() * .45;
  document.getElementById("petals").appendChild(petal);
  setTimeout(() => petal.remove(), 11000);
}
setInterval(createPetal, 650);

// ============================
// SCROLL
// ============================

const container = document.querySelector('#content');

let isUserScrolling = false;
let resumeTimer = null;
let animationId = null;
const SCROLL_SPEED = 30;
const RESUME_DELAY = 2000;
let lastTime = performance.now();


// ============================
// AUTO SCROLL
// ============================

function autoScroll(currentTime) {

  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  if (!isUserScrolling) {

    const maxScrollTop =
      container.scrollHeight - container.clientHeight;

    if (container.scrollTop < maxScrollTop) {

      // Scroll theo thời gian thực
      const distance = SCROLL_SPEED * deltaTime;

      container.scrollTop += distance;

      // Không vượt quá bottom
      if (container.scrollTop > maxScrollTop) {
        container.scrollTop = maxScrollTop;
      }
    }
  }

  animationId = requestAnimationFrame(autoScroll);
}



// ============================
// USER SCROLL
// ============================

function userScroll() {

  // Dừng auto-scroll ngay
  isUserScrolling = true;

  // Reset timer
  clearTimeout(resumeTimer);

  // User không thao tác nữa trong 2 giây
  resumeTimer = setTimeout(() => {

    isUserScrolling = false;

    // Reset thời gian để tránh jump
    lastTime = performance.now();

  }, RESUME_DELAY);
}



// ============================
// MOUSE WHEEL / TRACKPAD
// ============================

container.addEventListener(
  'wheel',
  userScroll,
  { passive: true }
);



// ============================
// KÉO THANH SCROLL
// ============================

container.addEventListener(
  'pointerdown',
  userScroll
);

// ============================
// START
// ============================

