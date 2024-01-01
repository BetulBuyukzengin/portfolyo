"use strict";

const allSections = document.querySelectorAll(".section");
const nav = document.querySelector(".navbar");

const navCheck = document.querySelector(".navigation__checkbox");
const navButton = document.querySelector(".navigation__button");
const background = document.querySelector(".navigation__background");
const list = document.querySelector(".header");
const links = document.querySelectorAll(".header-link");
const linkLi = document.querySelectorAll(".header-li");
const profile = document.querySelector(".nav-profile");

const homeLink = document.querySelector('a[href="#home"]');

//! Home link scroll
homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0 });
});

//! MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains("header-link")) {
    const link = e.target;
    const siblings = link.closest(".navbar").querySelectorAll(".header-link");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//! INTERSECTION OBSERVER
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.Intersecting) return;
  entry.target.classList.remove("hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("hidden");
});

//! Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadingImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
});
imgTargets.forEach((img) => imgObserver.observe(img));

//! HAMBURGER MENU
const controlMenu = function () {
  navButton.addEventListener("click", function () {
    if (navCheck.checked) {
      closeMenu();
      navCheck.checked = true;
    } else {
      background.style.transform = "scale(180)";
      list.style.opacity = 1;
      list.style.visibility = "visible";
      nav.style.height = "100vh";
      profile.style.opacity = 0;
    }
  });
};

function isScreenBelow900px() {
  return window.innerWidth < 900;
}

const clickLink = function () {
  if (isScreenBelow900px()) {
    linkLi.forEach((link) => {
      const li = link.querySelector(".header-link");

      li.addEventListener("click", function () {
        closeMenu();

      //   const targetId = li.getAttribute("href").substring(1); // Bağlantı hedefinin ID'sini alın
      // console.log(targetId);
      // const targetElement = document.getElementById(targetId);

      // if (targetElement) {
      //   const offset =
      //   // targetElement.offsetTop-50;
      //     targetElement.getBoundingClientRect().top + window.scrollY-100; // Hedef elementin üst kenarının sayfa üstüne olan mesafesi
      //     window.scrollTo({ top: offset}); // Hedef elementin tam üstüne kaydırma işlemi
      // }
      });
      
    });
  }
};

const closeMenu = function (check = true) {
  background.style.transform = "scale(0)";
  list.style.opacity = 0;
  list.style.visibility = "hidden";
  nav.style.height = "8rem";
  profile.style.opacity = 1;
  navCheck.checked = !check;
};
window.onload = () => {
  window.scrollTo({ top: 0, behavior: 'auto' }); // Sayfanın en üstüne kaydırma işlemi
};
const init = function () {
  clickLink();
  controlMenu();
};
init();
