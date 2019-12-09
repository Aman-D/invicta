// character hover effects
const character = document.getElementsByClassName("character");

for (let i = 0; i < character.length; i++) {
  character[i].addEventListener("mouseenter", () => {
    character[i].style.filter = "grayscale(0)";
    character[i].style.transform = "scale(1.1)";
  });
  character[i].addEventListener("mouseout", () => {
    character[i].style.filter = "grayscale(1)";
    character[i].style.transform = "scale(1)";
  });
}

function show(event) {
  var swipe = document.getElementById(event);
  var comp = document.getElementsByClassName("comp_list");
  var title = document.getElementsByClassName("title");
  var goback = document.getElementsByClassName("goback");
  for (let i = 0; i < comp.length; i++) {
    comp[i].style.opacity = "0";
    title[i].style.opacity = "0";
    goback[i].style.opacity = "0";
  }
  swipe.style.opacity = "1";
  swipe.style.zIndex = "1";
}

function back_slide() {
  var swipe = document.getElementsByClassName("swiper-container");
  var comp = document.getElementsByClassName("comp_list");
  var title = document.getElementsByClassName("title");
  var goback = document.getElementsByClassName("goback");
  for (let i = 0; i < swipe.length; i++) {
    swipe[i].style.opacity = "0";
    swipe[i].style.zIndex = "-1";
  }
  for (let i = 0; i < comp.length; i++) {
    comp[i].style.opacity = "1";
    title[i].style.opacity = "1";
    goback[i].style.opacity = "1";
    comp[i].style.zIndex = "1";
    title[i].style.zIndex = "1";
    goback[i].style.zIndex = "1";
  }
}
