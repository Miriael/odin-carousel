/*let allMenuButtons = document.querySelectorAll('.menu-button')

function toggleMenu(a) {
  (window.getComputedStyle(a).getPropertyValue('visibility') === 'hidden' ?
   a.style.visibility = 'visible' :
   a.style.visibility = 'hidden') 
}

//onclick version
allMenuButtons.forEach(button => {
//  button.addEventListener('click', () => toggleMenu(button.nextElementSibling))
})

//hover version
allMenuButtons.forEach(button => {
  button.addEventListener('mouseenter', () => toggleMenu(button.nextElementSibling));
  button.addEventListener('mouseout', () => toggleMenu(button.nextElementSibling));
})
*/
let next = document.querySelector('.image-carousel__next');
let prev = document.querySelector('.image-carousel__prev');
let carousel = document.querySelector('.image-carousel');
let carstyl = getComputedStyle(carousel);
let autoTimer = setInterval(autoSlide, 5000)

carousel.style.right = "0px";

function slideCarousel(direction) {
  if (direction == "next") {
    if (parseInt(carstyl.right.replace(/\D/g,'')) < ((carousel.children.length - 1) * 640)) {
      carousel.style.right = parseInt(carstyl.right.replace(/\D/g,'')) + 640 + "px";
    }
  }
  if (direction == "prev") {
    if (parseInt(carstyl.right.replace(/\D/g,'')) > 0) {
      carousel.style.right = parseInt(carstyl.right.replace(/\D/g,'')) - 640 + "px";
    }
  }
}

function updateCircles() {
  Array.from(document.querySelector('.circle-container').children).forEach(child => child.classList.remove('visible'));
  document.querySelector('.circle-container').children.item((carstyl.right.replace(/\D/g,'') / 640)).classList.add('visible');
}

next.addEventListener('click', () => {
  slideCarousel("next");
  })
prev.addEventListener('click', () => {
  slideCarousel("prev");
  })

for (let i = 0; i < carousel.children.length; i++) {
  let newCircle = document.createElement('div');
  newCircle.classList.add('circle');
  if (i == 0) {
    newCircle.classList.add('visible');
  }
  newCircle.addEventListener('click', (e) => {
    Array.from(document.querySelector('.circle-container').children).forEach(child => child.classList.remove('visible'))
    e.target.classList.add('visible');
    carousel.style.right = (640 * i) + "px";   
  })
  document.querySelector('.circle-container').appendChild(newCircle);
}

function autoSlide() {
  if (parseInt(carstyl.right.replace(/\D/g,'')) < ((carousel.children.length - 1) * 640)) {
    carousel.style.right = parseInt(carstyl.right.replace(/\D/g,'')) + 640 + "px";
  } else {
    carousel.style.right = "0px";
  }
}

document.querySelector('.image-carousel').addEventListener('transitionend', () => {
  updateCircles();
  clearInterval(autoTimer)
  autoTimer = setInterval(autoSlide, 5000)
})

