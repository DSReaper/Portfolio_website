// Initialize Swiper carousel
window.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line no-undef
  const swiper = new Swiper(".portfolio-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    grabCursor: true,
    loop: false,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 1.2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
});
