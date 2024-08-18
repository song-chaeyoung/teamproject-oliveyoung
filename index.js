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
const indexInfo = "./indexslide.json";
const slideList = document.querySelector(".mainslide");
const slideListImg = slideList.getElementsByTagName("img");
const slideArrowLeft = document.querySelector(".mainslide_arrow_left");
const slideArrowRight = document.querySelector(".mainslide_arrow_right");

fetch(indexInfo)
  .then((response) => response.json())
  .then((data) => {
    console.log("슬라이드 데이터 ==>", JSON.parse(JSON.stringify(data)));
    slideData = data.mainsilde;
  });

let slideIndex = Number(slideListImg[0].dataset.index);
slideArrowLeft.addEventListener("click", () => {
  slideIndex--;
  if (slideIndex == 0) slideIndex = slideData.length;

  let currentSlideData = {};
  slideData.forEach((item) => {
    if (slideIndex === Number(item.id)) currentSlideData = item;
  });

  createSlideItem(currentSlideData);
});

slideArrowRight.addEventListener("click", () => {
  // let slideIndex = Number(slideListImg[0].dataset.index);
  slideIndex++;
  if (slideIndex == slideData.length + 1) slideIndex = 1;

  let currentSlideData = {};
  slideData.forEach((item) => {
    if (slideIndex === Number(item.id)) currentSlideData = item;
  });

  createSlideItem(currentSlideData);
});

const startMainSlide = () => {
  const startSlide = setInterval(() => {
    slideIndex++;

    let currentSlideData = {};
    slideData.forEach((item) => {
      if (slideIndex === Number(item.id)) currentSlideData = item;
    });
    createSlideItem(currentSlideData);

    if (slideIndex == slideData.length) slideIndex = 0;
  }, 5000);

  const stopSlide = () => {
    clearInterval(startSlide);
  };

  slideList.addEventListener("mouseover", stopSlide);
};

startMainSlide();
slideList.addEventListener("mouseout", startMainSlide);

function createSlideItem(currentSlideData) {
  slideListImg[0].src = currentSlideData.img;
  slideListImg[0].alt = currentSlideData.title;
  slideListImg[0].dataset.index = currentSlideData.id;
  let mainSlideTxt = document.querySelector(".mianslide_text");
  const slideArrowText = document.querySelector(".mainslide_arrow_text");
  mainSlideTxt.querySelector(".sub_title").innerHTML =
    currentSlideData.subdessc;
  mainSlideTxt.querySelector(".title").innerHTML = currentSlideData.title;
  mainSlideTxt.querySelector(".description").innerHTML =
    currentSlideData.description;
  slideArrowText.innerText = `${slideIndex}/${slideData.length}`;
  if (currentSlideData.id === 6) {
    mainSlideTxt.style.color = "#000";
    slideArrowText.style.color = "#000";
  } else {
    mainSlideTxt.style.color = "#fff";
    slideArrowText.style.color = "#fff";
  }
}

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
  const pushBtn = shortcutModal.querySelector(
    ".shortcut_modal_btnarea button:nth-child(2)"
  );
  xMark.addEventListener("click", () => {
    shortcutModal.classList.remove("active");
    // modalIcon.forEach((icon) => {
    //   icon.classList.remove("check");
    // });
  });
  cancelBtn.addEventListener("click", () => {
    shortcutModal.classList.remove("active");
    // modalIcon.forEach((icon) => {
    //   icon.classList.remove("check");
    // });
  });

  modalTabs.forEach((tab, i) => {
    tab.addEventListener("click", function () {
      modalTabs.forEach((t) => {
        t.classList.remove("active");
      });
      contents.forEach((content) => {
        content.classList.remove("active");
      });
      tab.classList.add("active");
      contents[i].classList.add("active");
    });
  });
  const modalIcon = document.querySelectorAll(".shortcut_modal_content_icon");

  let activeCount = 0;
  modalIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      // this.classList.toggle("check");
      if (activeCount < 8) {
        icon.classList.add("active");
        activeCount++;
      } else {
        alert("최대 8개까지의 카테고리만 선택할 수 있습니다.");
      }
    });
  });
});

// update tab Event
fetch(indexInfo)
  .then((response) => response.json())
  .then((data) => {
    updateDate = data.update;
    // console.log(updateDate);
  });

const updateContents = document.querySelectorAll(".update_content");
const updateChangeBtn = document.querySelector(".update_changetab");

// updateDate.forEach((data, idx) => {});

// updateContents.forEach((content) => {
//   let updateData = content;
// });

// todayprice Timer
const todayPriceTimers = document.querySelectorAll(
  ".todayprice_content_item_timer_num"
);

function dateCalc() {
  const nowTime = new Date();
  const tomorrow = new Date(
    nowTime.getFullYear(),
    nowTime.getMonth(),
    nowTime.getDate() + 1
  );
  const remainingMs = tomorrow - nowTime;

  const seconds = Math.floor(remainingMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;

  return {
    hours: String(remainingHours).padStart(2, "0"),
    minutes: String(remainingMinutes).padStart(2, "0"),
    seconds: String(remainingSeconds).padStart(2, "0"),
  };
}

todayPriceTimers.forEach((timer) => {
  setInterval(() => {
    const { hours, minutes, seconds } = dateCalc();
    timer.innerText = `${hours} : ${minutes} : ${seconds}`;
  }, 1000);
});

// update tab Event
const updateContentsContainer = document.querySelector(
  ".update_content_container"
);
const updateContents = document.querySelectorAll(".update_content");
const updateChangeBtn = document.querySelector(".update_changetab");
const updateNum = document.querySelector(".update_number");

fetch(indexInfo)
  .then((response) => response.json())
  .then((data) => {
    updateData = data.update;
    updateNum.innerHTML = `<span>1</span><span></span><span> ${
      updateData.length / 2
    }</span>`;
  });

let updateSectionIndex = Number(updateContentsContainer.dataset.index);

const updateItem = (updateSlideData) => {
  updateContents.forEach((content, idx) => {
    content.children[0].children[0].src = updateSlideData[idx].img;
    content.children[1].children[0].innerText = updateSlideData[idx].title;
    content.children[1].children[1].innerText = updateSlideData[idx].desc;
  });
  updateNum.innerHTML = `<span>${updateSectionIndex}</span><span></span><span> ${
    updateData.length / 2
  }</span>`;
};

const updateSlide = () => {
  updateSectionIndex++;
  if (updateSectionIndex == updateData.length / 2 + 1) updateSectionIndex = 1;
  let updateSlideData = [];
  updateData.forEach((data, i) => {
    if (updateSectionIndex == 1) {
      if (i == 0 || i == 1) updateSlideData.push(data);
    } else if (updateSectionIndex == 2) {
      if (i == 2 || i == 3) updateSlideData.push(data);
    } else if (updateSectionIndex == 3) {
      if (i == 4 || i == 5) updateSlideData.push(data);
    }
  });
  updateItem(updateSlideData);
};
updateChangeBtn.addEventListener("click", updateSlide);

// TodayRanking Timer
const timeWrapper = document.querySelector(".todayranking_title > p");

setInterval(() => {
  const nowTime = new Date();
  let nowHour = nowTime.getHours();
  let nowMin = nowTime.getMinutes();

  nowHour = nowHour < 10 ? `0${nowHour}` : nowHour;
  nowMin = nowMin < 10 ? `0${nowMin}` : nowMin;

  timeWrapper.innerText = `${nowHour}:${nowMin}`;
}, 1000);

// TodayRanking Category
const todayRankingTabs = document.querySelectorAll(".todayranking_tab li");
const todayRankingItems = document.querySelectorAll(".todayranking_item");

let categoryItems = [];
const productChange = (tab, i) => {
  productData.forEach(() => {
    categoryItems = productData.filter((data) => data.category == tab.id);
  });

  todayRankingItems.forEach((item, idx) => {
    if (categoryItems == "all") {
      item.innerHTML = "";
    } else {
      price = new Intl.NumberFormat("ko-kr", {
        currency: "KRW",
      }).format(productData[idx].salePrice);
      item.innerHTML = `
        <div class="productitem_img">
          <img src="${categoryItems[idx].img}" alt="${categoryItems[idx].id}" />
          <ul class="productitem_img_hoverbox">
            <li>
              <a href="javascript:void(0)">
                <i class="fa-regular fa-heart"></i>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <i class="fa-solid fa-cart-arrow-down"></i>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <i class="fa-regular fa-credit-card"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="productitem_text">
          <p>${categoryItems[idx].title}</p>
          <h5>${price}</h5>
          <ul> 
          </ul>
          <ul>
            <li><i class="fa-solid fa-star"></i></li>
            <li>${categoryItems[idx].score}</li>
            <li>(${categoryItems[idx].review})</li>
          </ul>
        </div>
        `;
    }
  });
};

todayRankingTabs.forEach((tab, i) => {
  tab.addEventListener("click", function () {
    todayRankingTabs.forEach((t) => {
      t.classList.remove("active");
    });
    this.classList.add("active");
    productChange(tab, i);
  });
});

// Brand Event
const brandTabs = document.querySelectorAll(".brand_tab li");
const brandContent = document.querySelector(".brand_content");
const brandSlide = brandContent.querySelector(".brand_content_slide");
const brandItems = document.querySelectorAll(".brand_content_item");

fetch(indexInfo)
  .then((response) => response.json())
  .then((data) => {
    brandData = data.brand;
  });

brandTabs.forEach((tab, idx) => {
  tab.addEventListener("click", () => {
    brandTabs.forEach((t) => {
      t.classList.remove("active");
    });
    tab.classList.add("active");

    // contentChange(tab, idx);

    const makeContent = (data, i) => {
      if (idx == i) {
        brandSlide.querySelector("img").src = data.img;
        brandSlide.querySelector("h4").innerText = data.brandname;
        brandSlide.querySelector(
          "p"
        ).innerHTML = `<i class="fa-regular fa-heart"></i> ${data.likenum}명이 좋아합니다.`;
      }
    };

    brandData.forEach(makeContent);
  });
});

// oliveyoung Live
const videoMain = document.querySelector(".video_main");

videoMain.addEventListener("pause", () => {
  const videoHover = document.querySelector(
    ".oliveyounglive_right_video_hover"
  );
  videoHover.classList.add("active");

  videoHover.addEventListener("mouseover", () => {
    videoHover.classList.remove("active");
  });
  videoMain.addEventListener("mouseout", () => {
    videoHover.classList.add("active");
  });
});

const cartbtn = document.querySelectorAll(".productitem_img");
