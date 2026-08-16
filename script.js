// =========================================================
// 1. 日本語 / 英語 切り替え
// =========================================================
const html = document.documentElement;
const langButtons = document.querySelectorAll("[data-lang-btn]");
const translatable = document.querySelectorAll("[data-en][data-ja]");

function setLanguage(lang) {
  html.setAttribute("data-lang", lang);
  html.setAttribute("lang", lang);

  translatable.forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.langBtn === lang);
  });

  localStorage.setItem("preferred-lang", lang);
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.langBtn));
});

// 前回選んだ言語があれば復元。なければブラウザの言語設定から推測。
const savedLang = localStorage.getItem("preferred-lang");
if (savedLang) {
  setLanguage(savedLang);
} else {
  const browserLang = navigator.language.startsWith("ja") ? "ja" : "en";
  setLanguage(browserLang);
}

// =========================================================
// 2. モバイルメニューの開閉
// =========================================================
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // リンクをタップしたらメニューを閉じる
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// =========================================================
// 3. スクロールで作品がふわっと表示される演出
// =========================================================
const works = document.querySelectorAll(".work");

if ("IntersectionObserver" in window && works.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  works.forEach((work) => observer.observe(work));
} else {
  // 対応していない環境では最初から表示しておく
  works.forEach((work) => work.classList.add("is-visible"));
}
