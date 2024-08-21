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

// Product Json Data
const productJson = "./db.json";
let productData = [];
const productItem = document.querySelectorAll(".productitem");

// fetch(productJson)
//   .then((response) => response.json())
//   .then((data) => {
//     data.oliveyoungProduct.forEach((item) => {
//       item.price = new Intl.NumberFormat("ko-kr", { currency: "KRW" }).format(
//         item.price
//       );
//       item.salePrice = new Intl.NumberFormat("ko-kr", {
//         currency: "KRW",
//       }).format(item.salePrice);
//     });
//     productData = data.oliveyoungProduct;
//     allProductData = data.oliveyoungProduct.slice(
//       10,
//       data.oliveyoungProduct.length - 1
//     );

//     const productItem = document.querySelectorAll(".productitem");
//     let madeLi = document.createElement("li");

//     productItem.forEach((product, i) => {
//       let price = new Intl.NumberFormat("ko-kr", {
//         currency: "KRW",
//       }).format(productData[i].salePrice);

//       product.innerHTML = commonChangeElement(productData[i]);

//       const uls = product.querySelectorAll(
//         ".productitem_text > ul:nth-of-type(1)"
//       );
//       const tags = productData[i].tag;

//       for (let b = 0; b < tags.length; b++) {
//         let madeLi = document.createElement("li");
//         madeLi.innerText = tags[b].name;
//         uls.forEach((ul) => {
//           ul.appendChild(madeLi);
//         });
//       }

//       // productItem.forEach((item) => {
//       //   item.addEventListener("click", () => {
//       //     const url = `/product/productDetail.html?category=${encodeURIComponent(
//       //       productData[i].category
//       //     )}&name=${productData[i].id}`;
//       //     window.location.href = url;
//       //   });
//       // });
//     });
//   });

fetch(productJson)
  .then((response) => response.json())
  .then((data) => {
    return new Promise(async (resolve) => {
      try {
        await createProductData(data);
        resolve();
      } catch (error) {
        console.error(error);
      }
    });
  });

createProductData = (data) => {
  console.log("createProductData ==>", data);
  data.oliveyoungProduct.forEach((item) => {
    item.price = new Intl.NumberFormat("ko-kr", { currency: "KRW" }).format(
      item.price
    );
    item.salePrice = new Intl.NumberFormat("ko-kr", {
      currency: "KRW",
    }).format(item.salePrice);
  });
  productData = data.oliveyoungProduct;
  allProductData = data.oliveyoungProduct.slice(
    10,
    data.oliveyoungProduct.length - 1
  );

  productItem.forEach((product, i) => {
    product.innerHTML = commonChangeElement(productData[i]);

    const uls = product.querySelectorAll(
      ".productitem_text > ul:nth-of-type(1)"
    );
    const tags = productData[i].tag;

    for (let b = 0; b < tags.length; b++) {
      let madeLi = document.createElement("li");
      madeLi.innerText = tags[b].name;
      uls.forEach((ul) => {
        ul.appendChild(madeLi);
      });
    }
  });
};

// Product Common
let saveData = [];
const commonChangeElement = (data) => {
  let newElement = document.createElement("div");
  // saveData.push(data);
  return (newElement.innerHTML = `
          <div class="productitem_img" data-category="${data.category}" data-id="${data.id}">
            <img src="${data.img}" alt="${data.id}" />
            <ul class="productitem_img_hoverbox">
              <li>
                <a href="javascript:void(0)">
                  <i class="fa-regular fa-heart"></i>
                </a>
              </li>
              <li class="cart_btn">
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
            <p>${data.title}</p>
            <h5>${data.price}</h5>
            <ul> 
            </ul>
            <ul>
              <li><i class="fa-solid fa-star"></i></li>
              <li>${data.score}</li>
              <li>(${data.review})</li>
            </ul>
          </div>
          `);
};

productItem.forEach((item, idx) => {
  item.addEventListener("click", (e) => {
    console.log("target ==>", e.currentTarget);
    console.log(
      "target category ==>",
      e.currentTarget.children[0].dataset.category
    );
    console.log("target ID ==>", e.currentTarget.children[0].dataset.id);
    let category = e.currentTarget.children[0].dataset.category;
    let targetId = e.currentTarget.children[0].dataset.id;
    const url = `/product/productDetail.html?category=${encodeURIComponent(
      category
    )}&id=${targetId}`;
    window.location.href = url;
    console.log("url", url);
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
const modalIcon2 = document.querySelectorAll(
  ".modal_content_category .shortcut_modal_content_icon"
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
  });
  cancelBtn.addEventListener("click", () => {
    shortcutModal.classList.remove("active");
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

  let activeCount0 = 0;
  let activeCount1 = 0;
  let serviceArray = [];
  let serviceArray1 = [];

  const modalEvent = (icon) => {
    icon.addEventListener("click", (event) => {
      if (activeCount0 < 8) {
        icon.classList.toggle("check");
        activeCount0 = Math.max(
          0,
          activeCount0 + (icon.classList.contains("check") ? 1 : -1)
        );
      } else {
        if (icon.classList.contains("check")) {
          event.currentTarget.classList.remove("check");
          activeCount0--;
        }
      }

      if (activeCount0 === 8) {
        if (!icon.classList.contains("check") && event.currentTarget)
          alert("최대 8개까지의 카테고리만 선택할 수 있습니다.");
      }

      if (serviceArray.length) event.currentTarget.classList.toggle("check");
    });
  };

  const modalEvent1 = (icon) => {
    icon.addEventListener("click", (event) => {
      if (activeCount1 < 8) {
        icon.classList.toggle("check");
        activeCount1 = Math.max(
          0,
          activeCount1 + (icon.classList.contains("check") ? 1 : -1)
        );
      } else {
        if (icon.classList.contains("check")) {
          event.currentTarget.classList.remove("check");
          activeCount1--;
        }
      }

      if (activeCount1 === 8) {
        if (!icon.classList.contains("check") && event.currentTarget)
          alert("최대 8개까지의 카테고리만 선택할 수 있습니다.");
      }

      if (serviceArray1.length) event.currentTarget.classList.toggle("check");
    });
  };

  modalIcon.forEach(modalEvent);
  modalIcon2.forEach(modalEvent1);

  const listPush = () => {
    modalIcon.forEach((item) => {
      if (item.classList.contains("check")) {
        serviceArray.push({
          name: item.dataset.name,
          icon: item.children[0].className,
        });
      }
    });
    modalIcon2.forEach((item) => {
      if (item.classList.contains("check")) {
        serviceArray1.push({
          name: item.dataset.name,
          icon: item.children[0].className,
        });
      }
    });

    let serviceFirstTab = document.querySelectorAll(".first-short > div");
    let serviceSecondTab = document.querySelectorAll(".second-short > div");

    const tabPush = (division, index) => {
      division.children[0].children[0].className = "fa-solid fa-plus";
      division.children[0].children[0].style.color = "";
      division.children[1].innerHTML = "바로가기";
      serviceArray.forEach((userchoice, idx) => {
        if (index == idx) {
          division.children[0].children[0].className = userchoice.icon;
          division.children[0].children[0].style.color = "#9ac75b";
          division.children[1].innerHTML = userchoice.name;
        }
      });
    };

    const tabPush2 = (division, index) => {
      division.children[0].children[0].className = "fa-solid fa-plus";
      division.children[0].children[0].style.color = "";
      division.children[1].innerHTML = "바로가기";
      serviceArray1.forEach((userchoice, idx) => {
        if (index == idx) {
          division.children[0].children[0].className = userchoice.icon;
          division.children[0].children[0].style.color = "#9ac75b";
          division.children[1].innerHTML = userchoice.name;
        }
      });
    };

    serviceFirstTab.forEach(tabPush);
    serviceSecondTab.forEach(tabPush2);

    shortcutModal.classList.remove("active");
  };
  pushBtn.addEventListener("click", listPush);
});

// personalitem Event
const form = document.querySelector(".personalitem_select_container");

const personalItemRandom = () => {
  const personalProducts = document.querySelectorAll(
    ".personalitem_product_itme"
  );
  let randomNum = new Set();
  personalProducts.forEach((product, idx) => {
    for (let i = 0; i <= idx; i++) {
      randomNum = Math.floor(Math.random() * productData.length);
    }

    price = new Intl.NumberFormat("ko-kr", {
      currency: "KRW",
    }).format(productData[randomNum].salePrice);

    if (randomNum == productData[randomNum].id) {
      product.innerHTML = commonChangeElement(productData[randomNum]);
    }
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll(".personalitem_select_type input");
  let isChecked = false;
  inputs.forEach((input) => {
    if (input.checked) {
      isChecked = true;
    }
  });
  if (!isChecked) {
    alert("피부 정보를 입력해주세요!");
  } else {
    document
      .querySelector(".personalitem_product_itmes_loading")
      .classList.add("loading");
    setTimeout(() => {
      document
        .querySelector(".personalitem_product_itmes_loading")
        .classList.remove("loading");
    }, 3000);
    personalItemRandom();
  }
});

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
    if (tab.id == "all") {
      item.innerHTML = commonChangeElement(allProductData[idx]);
    } else item.innerHTML = commonChangeElement(categoryItems[idx]);
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
const brandSlideContainer = document.querySelector(
  ".brand_content_slide_container"
);
const brandItems = document.querySelectorAll(".brand_content_item");
// const slideWidth = slides[0].clientWidth;
// const slideWidth = 1300;

fetch(indexInfo)
  .then((response) => response.json())
  .then((data) => {
    brandData = data.brand;

    brandData.forEach((item) => {
      let newElement = document.createElement("div");
      newElement.classList.add("brand_content_slide");
      newElement.innerHTML = `
          <div class="brand_content_img">
            <img src="${item.img}" alt="brandimg01" />
            <div class="brand_content_text">
              <h4>${item.brandname}</h4>
              <p>
                <i class="fa-regular fa-heart"></i> ${item.likenum}명이 좋아합니다.
              </p>
            </div>
          </div>
        `;
      brandSlideContainer.appendChild(newElement);
    });

    const slides = document.querySelectorAll(".brand_content_slide");
    const slideWidth = slides[0].clientWidth;
    console.log(slideWidth);

    const updateWidth = () => {
      const newSlideCount = slides.length;
      const newWidth = `${slideWidth * newSlideCount}px`;
      brandSlideContainer.computedStyleMap.width = newWidth;
    };

    const setInitialPos = () => {
      const initialTranslateValue = -slideWidth * slides.length;
      brandSlideContainer.style.transform = `translateX(${initialTranslateValue}px)`;
    };

    const makeClone = () => {
      for (let i = 0; i < slides.length; i++) {
        const cloneSlide = slides[i].cloneNode(true);
        cloneSlide.classList.add("clone");
        brandSlideContainer.appendChild(cloneSlide);
      }
      for (let i = slides.length - 1; i >= 0; i--) {
        const cloneSlide = slides[i].cloneNode(true);
        cloneSlide.classList.add("clone");
        brandSlideContainer.prepend(cloneSlide);
      }
      updateWidth();
      setInitialPos();
      // setTimeout(() => {
      //   brandSlideContainer.classList.add("animated");
      // }, 100);
    };
    makeClone();
  });

let currentSlide = 0;
let brandItemData = [];
const contentChange = (tab) => {
  productData.forEach(() => {
    brandItemData = productData.filter((data) => data.company == tab.innerText);
  });
  brandItems.forEach((item, i) => {
    item.innerHTML = `
                <div class="brand_content_item_img">
                  <img src="${brandItemData[i].img}" alt="${brandItemData[i].id}" />
                </div>
                <div class="brand_content_item_info">
                <p>${brandItemData[i].company}</p>
                  <h6>${brandItemData[i].title}</h6>
                  <div>
                    <p><span>${brandItemData[i].price}</span>원</p>
                    <p><span>${brandItemData[i].salePrice}</span>원</p>
                  </div>
                </div>
    `;
  });
};
brandTabs.forEach((tab, idx) => {
  tab.addEventListener("click", () => {
    brandTabs.forEach((t) => {
      t.classList.remove("active");
    });
    tab.classList.add("active");

    // const slides = document.querySelectorAll(".brand_content_slide");

    currentSlide = idx;
    slide(currentSlide, slideWidth);

    contentChange(tab);
  });
});

const brandArrowLeft = document.querySelector(".brand_content_arrow_left");
const brandArrowRight = document.querySelector(".brand_content_arrow_right");

brandArrowLeft.addEventListener("click", () => {
  const slides = document.querySelectorAll(".brand_content_slide");
  const slideWidth = slides[0].clientWidth;
  let slideCount = slides.length;
  brandTabs.forEach((item) => {
    item.classList.remove("active");
  });

  currentSlide--;
  if (currentSlide < 0) currentSlide = slideCount - 1;
  // if (currentSlide == -1) currentSlide = slideCount - 1;

  let newbrandItem = [];
  brandTabs.forEach((item, idx) => {
    if (idx === currentSlide) {
      item.classList.add("active");
      newbrandItem = item;
    }
  });
  contentChange(newbrandItem);
  slide(currentSlide, slideWidth);
});

brandArrowRight.addEventListener("click", () => {
  const slides = document.querySelectorAll(".brand_content_slide");
  // const slideWidth = slides[0].clientWidth;
  brandTabs.forEach((item) => {
    item.classList.remove("active");
  });

  currentSlide++;
  // if (currentSlide == 10) currentSlide = 0;

  let newbrandItem = [];
  brandTabs.forEach((item, idx) => {
    if (idx === currentSlide) {
      item.classList.add("active");
      newbrandItem = item;
    }
  });
  contentChange(newbrandItem);
  slide(currentSlide, slideWidth);
});

function slide(currentSlide, slideWidth) {
  // if (currentSlide == 0) brandSlideContainer.style.transform = `translateX(0)`;
  // else
  //   brandSlideContainer.style.transform = `translateX(-${
  //     currentSlide * slideWidth
  //   }px)`;

  // const slideCount = brandItems.length; // 총 슬라이드 개수 (복제된 슬라이드 포함)
  // let translateX = 0;

  // // 왼쪽 끝으로 이동했을 때 처리
  // if (currentSlide === 0) {
  //   translateX = -slideWidth * (slideCount - 1);
  //   // 오른쪽 끝으로 이동했을 때 처리
  // } else if (currentSlide === slideCount - 1) {
  //   translateX = -slideWidth;
  // } else {
  //   translateX = -currentSlide * slideWidth;
  // }

  setTimeout(() => {
    slides.classList.remove("animated");
    slides.style.left = "0px";
    currentIdx = 0;
  }, 500);

  brandSlideContainer.style.transform = `translateX(${translateX}px)`;
}

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

// Product Common
// let saveData = [];
// commonChangeElement = (data) => {
//   let newElement = document.createElement("div");
//   saveData.push(data);
//   return (newElement.innerHTML = `
//           <div class="productitem_img">
//             <img src="${data.img}" alt="${data.id}" />
//             <ul class="productitem_img_hoverbox">
//               <li>
//                 <a href="javascript:void(0)">
//                   <i class="fa-regular fa-heart"></i>
//                 </a>
//               </li>
//               <li class="cart_btn" data-id="${data.id}">
//                 <a href="javascript:void(0)">
//                   <i class="fa-solid fa-cart-arrow-down"></i>
//                 </a>
//               </li>
//               <li>
//                 <a href="javascript:void(0)">
//                   <i class="fa-regular fa-credit-card"></i>
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div class="productitem_text">
//             <p>${data.title}</p>
//             <h5>${data.price}</h5>
//             <ul>
//             </ul>
//             <ul>
//               <li><i class="fa-solid fa-star"></i></li>
//               <li>${data.score}</li>
//               <li>(${data.review})</li>
//             </ul>
//           </div>
//           `);
// };

// let saveCategoryList = [];

// window.onload = function () {
//   console.log("saveData", saveData);

//   // 타 컴포넌트에 연결되어있는 사이드 바를 불러온다.
//   let cartTabWrap = sidebar.querySelectorAll(".sidebar_items > .sidebar_item");
//   let cartTab = cartTabWrap[0].querySelector(" a > p");

//   let cartBtn = document.querySelectorAll(".cart_btn");
//   cartBtn.forEach((item, idx) => {
//     item.addEventListener("click", () => {
//       console.log("item", item.dataset.id);

//       const itemId = Number(item.dataset.id);
//       const itemIndex = saveCategoryList.findIndex(
//         (item) => item.id === itemId
//       );

//       // 이미 존재하는 경우 삭제
//       if (itemIndex !== -1) saveCategoryList.splice(itemIndex, 1);
//       // 신규로 추가하는 경우
//       else {
//         saveData.forEach((v, i, a) => {
//           if (a[i].id === itemId) saveCategoryList.push(v);
//         });
//       }

//       console.log("saveCategoryList", saveCategoryList);

//       // 사이드 바 장바구니 숫자 카운트
//       cartTab.innerHTML = saveCategoryList.length;
//     });
//   });
// };

// LocalStorage Event
// window.onload = function () {
//   const cartBtns = document.querySelectorAll(".cart_btn");

//   cartBtns.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       console.log(saveData);
//       // conso$le.log(btn.dataset.id);
//     });
//   });
// };
// async function localStorageEvent() {
//   try {
//     const localEvent = await awaitEvent();
//     const awaitEvent = () => {
//       const cartBtns = document.querySelectorAll(".cart_btn");

//       cartBtns.forEach((btn) => {
//         btn.addEventListener("click", (e) => {
//           e.stopPropagation();
//           console.log(saveData);
//           // console.log(btn.dataset.id);
//         });
//       });
//     };
//   } catch (error) {
//     console.log("error");
//   }
// }

// const time = function () {
//   const cartBtns = document.querySelectorAll(".cart_btn");

//   cartBtns.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       console.log(saveData);
//       // conso$le.log(btn.dataset.id);
//     });
//   });
// };

// async function f() {
//   const promise = new Promise((resolve, reject) => {
//     // resolve(commonChangeElement())
//     resolve(time());
//   });
// }

// localStorageEvent();

// async function commonChangeElementStart() {
//   commonChangeElement();
// }

// function time() {
//   const cartBtns = document.querySelectorAll(".cart_btn");

//   cartBtns.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       console.log(saveData);
//       // conso$le.log(btn.dataset.id);
//     });
//   });
// }

// // 바로 commonChangeElement 함수 호출
// commonChangeElementStart().then(() => {
//   time();
// });
