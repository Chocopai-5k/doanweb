const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function musicTab() {
  const tabFilter = $$(".music-trending-filter-link");
  const listFilter = $$(".music-trending--list");
  console.log(listFilter);
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
    console.log(mvtabActive, mvlistFilter, mvtabActive)
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
musicTab();
mvTab();
