const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function musicTab() {
  const tabFilter = $$(".music-trending-filter-link");
  const listFilter = $$(".music-trending--list");
  const tabActive = $(".music-trending-filter-link.active");

  tabFilter.forEach((tab, index) => {
    const list = listFilter[index];
    tab.onclick = function () {
      $(".music-trending-filter-link.active").classList.remove("active");
      $(".music-trending--list.active").classList.remove("active");

      this.classList.add("active");
      list.classList.add("active");
    };
  });
}
function mvTab() {
  const mvtabFilter = $$(".mv-trending-filter-link");
  const mvlistFilter = $$(".mv-trending--list");
  const mvtabActive = $(".mv-trending-filter-link.active");
  mvtabFilter.forEach((mvtab, index) => {
    const list = mvlistFilter[index];
    mvtab.onclick = function () {
      $(".mv-trending-filter-link.active").classList.remove("active");
      $(".mv-trending--list.active").classList.remove("active");

      this.classList.add("active");
      list.classList.add("active");
    };
  });
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}
function ValidateForm() {
  
 
}
ValidateForm()
musicTab();
mvTab();
