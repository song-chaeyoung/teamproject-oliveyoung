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
console.log(slideListImg);
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
  // let slideIndex = Number(slideListImg[0].dataset.index);
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

// Product Json Data
const productJson = "./db.json";

fetch(productJson)
  .then((response) => response.json())
  .then((data) => {
    productData = data.oliveyoungProduct;

    const productItem = document.querySelectorAll(".productitem");

    productItem.forEach((product, i) => {
      product.innerHTML = `                
      <div class="productitem_img">
        <img src="${productData[i].img}" alt="" />
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
        <p>${productData[i].title}</p>
        <h5>${productData[i].salePrice}</h5>
        <ul> 
        </ul>
        <ul>
          <li><i class="fa-solid fa-star"></i></li>
          <li>${productData[i].score}</li>
          <li>${productData[i].review}</li>
        </ul>
      </div>`;

      let madeLi;
      const uls = document.querySelectorAll(
        ".productitem_text > ul:nth-of-type(1)"
      );
      console.log(uls);
      const tags = productData[i].tag;
      // console.log(tags);
      for (let a = 0; a < product.length; a++) {
        for (let b = 0; b < tags.length; b++) {
          // console.log("click");
          // madeLi = document.createElement("li");
          // console.log(madeLi);
          // madeLi.innerText = tags[b].name;
          document.createElement("li");
        }
      }

      // console.log(uls);
      uls.forEach((ul, idx) => {
        console.log("test");
        // for (let k = 0; k < productData[i].tag.length; k++) {
        //   // li.innerText = productData[i].tag[i].name;
        //   // console.log(productData[idx].tag[0].name);
        // }
        // console.log(productData[i].tag.length);
        // for (let k = 0; k < productData[i].tag.length; k++) {
        //   li.innerText = productData[i].tag[i].name;
        //   ul.appendChild(li);
        // }
      });
    });
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
const modalTabs = document.querySelectorAll(".shortcut_modal_tab > div");
const contents = document.querySelectorAll(".shortcut_modal_contents");
const modalIcon = document.querySelectorAll(
  ".modal_content_service .shortcut_modal_content_icon"
);

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

  let activeCount = 0;
  let serviceArray = [];
  modalIcon.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      if (activeCount < 8) {
        icon.classList.toggle("check");
        activeCount = Math.max(
          0,
          activeCount + (icon.classList.contains("check") ? 1 : -1)
        );
      } else {
        if (icon.classList.contains("check")) {
          event.currentTarget.classList.remove("check");
          activeCount--;
        }
      }

      if (activeCount === 8) {
        if (!icon.classList.contains("check") && event.currentTarget)
          alert("최대 8개까지의 카테고리만 선택할 수 있습니다.");
      }

      if (serviceArray.length) event.currentTarget.classList.toggle("check");

      console.log("체크 갯수 ==>", activeCount);
    });
  });

  const listPush = () => {
    serviceArray = [];
    modalIcon.forEach((item) => {
      if (item.classList.contains("check")) {
        serviceArray.push({
          name: item.dataset.name,
          icon: item.children[0].className,
        });
      }
    });
    console.log("serviceArray", serviceArray);

    let serviceFirstTab = document.querySelectorAll(".first-short > div");
    serviceFirstTab.forEach((division, index) => {
      division.children[0].children[0].className = "fa-solid fa-plus";
      division.children[1].innerHTML = "바로가기";
      serviceArray.forEach((userchoice, idx) => {
        if (index == idx) {
          division.children[0].children[0].className = userchoice.icon;
          division.children[1].innerHTML = userchoice.name;
        }
      });
    });
    shortcutModal.classList.remove("active");
  };
  pushBtn.addEventListener("click", listPush);
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

todayPriceTimers.forEach((timer) => {
  setInterval(() => {
    const nowTime = new Date();

    let todayRemainHour = 24 - nowTime.getHours();
    let todayRemainMin = 59 - nowTime.getMinutes();
    let todayRemainSec = 59 - nowTime.getSeconds();

    todayRemainHour =
      todayRemainHour < 10 ? `0${todayRemainHour}` : todayRemainHour;
    todayRemainMin =
      todayRemainMin < 10 ? `0${todayRemainMin}` : todayRemainMin;
    todayRemainSec =
      todayRemainSec < 10 ? `0${todayRemainSec}` : todayRemainSec;

    timer.innerText = `${todayRemainHour} : ${todayRemainMin} : ${todayRemainSec}`;
  }, 1000);
});

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
