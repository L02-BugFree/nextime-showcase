const RESPONSIVE_WIDTH = 1024;
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH;
const collapseBtn = document.getElementById("collapse-btn");
const collapseHeaderItems = document.getElementById("collapsed-header-items");

function toggleHeader() {
    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("opacity-100");
        collapseHeaderItems.style.width = "70vw";
        collapseBtn.classList.remove("bi-list");
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed");
        isHeaderCollapsed = false;
    } else {
        collapseHeaderItems.classList.remove("opacity-100");
        collapseHeaderItems.style.width = "0vw";
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed");
        collapseBtn.classList.add("bi-list");
        isHeaderCollapsed = true;
    }
}

// Injected Slideshow Images
const slideShowContainer = document.querySelector("#slideshow");
const appScreens = [
    "assets/images/home/screen1.png",
    "assets/images/home/screen2.png",
    "assets/images/home/screen3.png"
];

appScreens.forEach(src => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide tw-rounded-xl tw-overflow-hidden !tw-h-[450px]";
    slide.innerHTML = `<img src="${src}" class="tw-object-cover tw-w-full tw-h-full" alt="App Screen">`;
    slideShowContainer.appendChild(slide);
});

// Keywords Scroller
const keywords = ["Schedule Overlay", "Prompt to Checklist", "Nhóm bạn", "Câu lạc bộ", "Công ty", "Gia đình", "Dự án", "Họp mặt", "Smart Chat", "AI Assistant"];
const features = ["Mã hóa đầu cuối", "Tìm giờ rảnh", "Tự động hóa", "Đa nền tảng", "Nhắc lịch", " Checklist nhóm"];

const countriesContainer = document.querySelector(".countries-container");
const placeContainer = document.querySelector(".places-container");

function addTag(text, container) {
    const tag = `<div class="tw-min-w-fit tw-p-3 tw-px-6 tw-border tw-border-black tw-rounded-full tw-font-bold">${text}</div>`;
    container.innerHTML += tag;
}

// Double for infinite scroll effect
[...keywords, ...keywords].forEach(k => addTag(k, countriesContainer));
[...features, ...features].forEach(f => addTag(f, placeContainer));

// Swiper Init
const swiper = new Swiper(".slideshow-container", {
    effect: "creative",
    loop: true,
    centeredSlides: true,
    creativeEffect: {
        prev: { shadow: true, translate: ["-10%", 0, -200], rotate: [0, 10, 0] },
        next: { translate: ["10%", 0, -200], rotate: [0, -10, 0] },
    },
    navigation: { nextEl: '.next', prevEl: '.prev' },
    autoplay: { delay: 3000 },
});

// FAQ Logic
document.querySelectorAll('.faq-accordion').forEach(btn => {
    btn.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.className = "bi bi-plus";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.className = "bi bi-dash";
        }
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray("section");
sections.forEach((sec) => {
    gsap.fromTo(sec.querySelectorAll(".reveal-up"), 
        { opacity: 0, y: 50 },
        { 
            opacity: 1, y: 0, duration: 0.8, stagger: 0.2,
            scrollTrigger: {
                trigger: sec,
                start: "top 80%",
            }
        }
    );
});