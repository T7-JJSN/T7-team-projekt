const track = document.querySelector(".carousel-track");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let index = 0;
const imageWidth = 135; // Bredde inkl. margin
const visibleImages = 5; // Juster hvor mange der er synlige

function updateCarousel() {
  track.style.transform = `translateX(-${index * imageWidth}px)`;
}

prevButton.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

nextButton.addEventListener("click", () => {
  if (index < track.children.length - visibleImages) {
    index++;
    updateCarousel();
  }
});
