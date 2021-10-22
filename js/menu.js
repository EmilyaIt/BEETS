// let hamburger = document.querySelector('.hamburger');
// let overlay = document.querySelector('.overlay');
// let body = document.querySelector('body');


// hamburger.addEventListener('click', () => {
//   hamburger.classList.toggle('hamburger--active');
//   overlay.classList.toggle('overlay--active');
//   body.classList.toggle('body--active-menu');
// })

// const closeMenuBtn = document.getElementById('close-menu-btn');
// closeMenuBtn.addEventListener('click', event =>{
//   event.preventDefault();
//   // modalWindow.classList.remove("modal_active");
// });

let burger  = document.querySelector('.hamburger');
let overlay = document.querySelector('.overlay');
let body = document.querySelector('body');

let links = document.querySelectorAll('.menu__link-hamburger');

links.forEach(function(element){
  element.addEventListener('click' , toggleMenu);
})

function toggleMenu(){
  burger.classList.toggle('hamburger--active');
  overlay.classList.toggle('overlay--active');
  body.classList.toggle('body--active-menu');
}

burger.addEventListener('click' , toggleMenu);
