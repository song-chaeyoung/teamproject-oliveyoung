const header = document.querySelector("header");
const sidebar = document.querySelector(".sidebar_common");
const footer = document.querySelector("footer");
<<<<<<< HEAD
<<<<<<< HEAD
=======
console.log(header)
>>>>>>> 18f9cd84d5e2c398472edb3389fd853d7e975842
=======
>>>>>>> ea2254796e5269a4fa595ef18a9d8ea3c8df7b61

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
