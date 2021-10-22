// const left = document.querySelector ('#left');
// const right = document.querySelector ('#right');
// const itemsList = document.querySelector ('#items');

// function showFirst() {
//   let temp = document.querySelectorAll('.item');

//   temp.forEach((el) => {
//     el.classList.remove('show')
//   })

//   temp[0].classList.add('show');
// }

// function loop(dir,e) {
//   e.preventDefault();

//   if (dir === "right") {
//     itemsList.appendChild(itemsList.firstElementChild);
//   } else {
//     itemsList.insertBefore(itemsList.firstElementChild, items.firstElementChild);
//   }
// }

// right.addEventListener("click", (e) => {
//   loop("right", e);
//   showFirst();
// });

// left.addEventListener("click", (e) => {
//   loop("left", e);
//   showFirst();
// });

const slider = $('.products').bxSlider({
  pager: false,
  controls: false
});

$(".product-slider__arrow--direction--prev").click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
})

$(".product-slider__arrow--direction--next").click(e => {
  e.preventDefault();
  slider.goToNextSlide();
})