// ============================================
//  POCKET RATION — script.js
//  All original IDs preserved exactly:
//  #downloadBtn, #downloadCta, #parallax, .device-card
// ============================================

"use strict";

// ── Custom Cursor ──────────────────────────────
const cursor     = document.createElement('div');
const cursorRing = document.createElement('div');
cursor.className     = 'cursor';
cursorRing.className = 'cursor-ring';
document.body.prepend(cursorRing);
document.body.prepend(cursor);

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.13;
  ringY += (mouseY - ringY) * 0.13;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '18px';
    cursor.style.height = '18px';
    cursorRing.style.width  = '56px';
    cursorRing.style.height = '56px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    cursorRing.style.width  = '38px';
    cursorRing.style.height = '38px';
  });
});


// ── Animated Canvas Background ─────────────────
const canvas = document.getElementById('bgCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;

  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Orb {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : (Math.random() > 0.5 ? -100 : H + 100);
      this.r  = 100 + Math.random() * 220;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.alpha = 0.015 + Math.random() * 0.04;
      this.hue = Math.random() > 0.6 ? '74,222,128' : (Math.random() > 0.5 ? '249,115,22' : '52,211,153');
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -this.r*2 || this.x > W+this.r*2 || this.y < -this.r*2 || this.y > H+this.r*2) {
        this.reset();
      }
    }
    draw() {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      g.addColorStop(0, `rgba(${this.hue},${this.alpha})`);
      g.addColorStop(1, `rgba(${this.hue},0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }
  }

  const orbs = Array.from({ length: 12 }, () => new Orb());

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    orbs.forEach(o => { o.update(); o.draw(); });
    requestAnimationFrame(loop);
  })();
}


// ── Sticky navbar shadow ───────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });


// ── Burger / Mobile Menu ──────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('.mm-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}


// ── Device card tilt (ORIGINAL script kept exactly) ──
const card = document.querySelector(".device-card");
if (card) {
  card.addEventListener("mousemove", (e) => {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const rotateY = (x / rect.width  - 0.5) * 20;
    const rotateX = -(y / rect.height - 0.5) * 20;
    card.style.animation = 'none'; // pause float while tilting
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.animation = '';
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}


// ── Parallax on scroll (original ID #parallax) ──
const parallaxEl = document.getElementById("parallax");
if (parallaxEl) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    parallaxEl.style.transform = `translateY(${scrolled * 0.06}px)`;
  }, { passive: true });
}


// ── Download buttons (ORIGINAL IDs kept exactly) ──
//    Opens Google Play Store link
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.mentorship.pocketration";

function openPlayStore() {
  window.open(PLAY_STORE_URL, "_blank");
}

document.querySelectorAll("#downloadBtn, #downloadCta, #downloadHow, #downloadBtnMobile").forEach(btn => {
  btn?.addEventListener("click", openPlayStore);
});


// ── Scroll reveal for cards ────────────────────
const revealItems = document.querySelectorAll('.reveal-card');
if (revealItems.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(el => revealObserver.observe(el));
}


// ── Counter animation for mini-stats ──────────
function animateCount(el, target, duration = 1400) {
  const start    = performance.now();
  const isRupee  = el.textContent.startsWith('₹');
  const from     = 0;

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const value    = Math.round(from + (target - from) * ease);
    el.textContent = isRupee ? `₹${value}` : String(value);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.mnum');
if (statNums.length) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const raw = el.textContent.replace(/[^\d]/g, '');
        const num = parseInt(raw, 10);
        if (!isNaN(num)) animateCount(el, num);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statsObserver.observe(el));
}


// ── Console signature ─────────────────────────
console.log("%cPocket Ration 🥦", "font-size:18px; font-weight:800; color:#4ade80;");
console.log("%char jeb ka saathi", "color:#7a9688; font-style:italic;");
console.log("Pocket Ration website ready");