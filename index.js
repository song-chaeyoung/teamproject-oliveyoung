const header = document.querySelector("header");
const sidebar = document.querySelector(".sidebar_common");
const footer = document.querySelector("footer");

fetch("./component/header.html")
  .then((res) => res.text())
  .then((data) => {
    header.innerHTML = data;
    const script = document.createElement("script");
    script.src = "/component/header.js";
    script.defer = true;
    document.body.appendChild(script);
  });

fetch("./component/sidebar.html")
  .then((res) => res.text())
  .then((data) => {
    sidebar.innerHTML = data;
    const script = document.createElement("script");
    script.src = "/component/sidebar.js";
    script.defer = true;
    document.body.appendChild(script);
  });

fetch("./component/footer.html")
  .then((res) => res.text())
  .then((data) => {
    footer.innerHTML = data;
  });

// Main Page

// Main Slide Event

const slideinfo = "./indexslide.json";
fetch(slideinfo)
  .then((response) => response.json())
  .then((data) => {
    // const [firstData, ...otherData] = data;
    const slideList = document.querySelector(".mainslide");
    // console.log(slideList);

    function createSlideItem(slideData) {
      // const slideItem = document.createElement("div");
      // slideItem.classList.add("slider_item");
      slideList.innerHTML = `
        <img src="${slideData.img}" alt="${slideData.title}">
        <div class="inner">
          <div class="mianslide_text">
            <p class="sub_title">${slideData.subdessc}</p>
            <h2 class="title">${slideData.title}</h2>
            <p class="description">${slideData.description}</p>
                        <div class="mainslide_arrow">
              <div class="mainslide_arrow_left">
                <i class="fa-solid fa-chevron-left"></i>
              </div>
              <div class="mainslide_arrow_right">
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
      `;
      return slideItem;
    }

    // data.forEach((slide) => {
    //   slideList.appendChild(createSlideItem(slide));
    // });
  });

// Shortcut Tab Change Event
const shortcutTabs = document.querySelectorAll(".shortcut_tab > p");
shortcutTabs.forEach((tab, i) => {
  tab.addEventListener("click", function () {
    const shortcutContents = document.querySelectorAll(".shortcut_icons");
    for (let i = 0; i < shortcutTabs.length; i++) {
      let tab = shortcutTabs[i];
      tab.classList.remove("active");
    }
    for (let i = 0; i < shortcutContents.length; i++) {
      let content = shortcutContents[i];
      content.classList.remove("active");
    }
    tab.classList.add("active");
    shortcutContents[i].classList.add("active");

    this.classList.add("active");
  });
});

// Shortcut Modal Event
const shortcutSetting = document.querySelector(".shortcut_header_setting");

shortcutSetting.addEventListener("click", () => {
  const shortcutModal = document.querySelector(".shortcut_modal_container");
  shortcutModal.classList.add("active");

  const xMark = shortcutModal.querySelector(".fa-xmark");
  const cancelBtn = shortcutModal.querySelector(
    ".shortcut_modal_btnarea button:nth-child(1)"
  );
  xMark.addEventListener("click", () => {
    shortcutModal.classList.remove("active");
  });
  cancelBtn.addEventListener("click", () => {
    shortcutModal.classList.remove("active");
  });

  const modalTabs = document.querySelectorAll(".shortcut_modal_tab > div");
  const contents = document.querySelectorAll(".shortcut_modal_contents");

  modalTabs.forEach((tab, i) => {
    tab.addEventListener("click", function () {
      for (let i = 0; i < modalTabs.length; i++) {
        let tab = modalTabs[i];
        tab.classList.remove("active");
      }
      for (let i = 0; i < contents.length; i++) {
        let content = contents[i];
        content.classList.remove("active");
      }
      tab.classList.add("active");
      contents[i].classList.add("active");
    });
  });
  const modalIcon = document.querySelectorAll(".shortcut_modal_content_icon");

  modalIcon.forEach((icon) => {
    icon.addEventListener("click", function () {
      this.classList.toggle("check");
    });
  });
});
