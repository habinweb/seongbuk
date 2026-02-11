const slides = document.querySelectorAll(".banner-slide");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const indexBox = document.querySelector(".show-index");

let count = 0;
const total = slides.length;

function updateSlide() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[count].classList.add("active");
  indexBox.textContent = `${count + 1}/${total}`;
}

// 자동 슬라이드 (3초)
setInterval(() => {
  count++;
  if (count >= total) count = 0;
  updateSlide();
}, 3000);

// 다음 버튼
nextBtn.addEventListener("click", () => {
  count++;
  if (count >= total) count = 0;
  updateSlide();
});

// 이전 버튼
prevBtn.addEventListener("click", () => {
  count--;
  if (count < 0) count = total - 1;
  updateSlide();
});

// 초기 상태
updateSlide();

// 1. 현재 활성화된 스크롤 박스 찾기
const getWrapper = () =>
  document.querySelector(".poster-container.active .poster-wrapper");

// 2. 휠 가로 스크롤 (끝점 체크 로직 추가)
document.querySelectorAll(".poster-wrapper").forEach((box) => {
  box.addEventListener(
    "wheel",
    (e) => {
      if (e.deltaY === 0) return;

      // 현재 스크롤 위치와 최대 스크롤 가능 범위를 계산
      const isScrollRight = e.deltaY > 0;
      const canScroll = isScrollRight
        ? box.scrollLeft + box.clientWidth < box.scrollWidth // 오른쪽으로 더 갈 수 있나?
        : box.scrollLeft > 0; // 왼쪽으로 더 갈 수 있나?

      if (canScroll) {
        // 가로로 움직일 수 있을 때만 세로 스크롤을 막음
        e.preventDefault();
        const fast = 3; // 숫자가 클수록 한 번에 많이 움직임 (감도)
        box.scrollBy({
          left: e.deltaY * fast,
          behavior: "auto", // 'smooth'로 하면 휠 반응이 느려 보일 수 있어 'auto' 추천
        });
      }
    },
    { passive: false },
  );
});

// 3. 버튼 클릭 시 이동
const move = (dir) => {
  const box = getWrapper();

  const scrollAmount = box.clientWidth * 0.5;
  box.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
};

// 버튼 이벤트 연결 (기존 코드가 null일 경우 대비해 안전장치 추가)
document.querySelector(".prev-box")?.addEventListener("click", () => move(-1));
document.querySelector(".next-box")?.addEventListener("click", () => move(1));

//
const BREAKPOINTS = { TABLET: 540 };

function updateBannerImages() {
  const isMobile = window.innerWidth <= BREAKPOINTS.TABLET;
  const banners = document.querySelectorAll(".banner-img, .banner-img-front");

  banners.forEach((img) => {
    const src = img.getAttribute("src");
    if (!src) return;

    let newSrc;

    if (isMobile) {
      // 모바일일 때: _tall이 없을 때만 붙여준다
      newSrc = src.includes("_tall")
        ? src
        : src.replace(/(\.[\w\d]+)$/, "_tall$1");
    } else {
      // PC일 때: _tall을 무조건 제거한다
      newSrc = src.replace("_tall", "");
    }

    // 결과적으로 주소가 바뀌어야 할 때만 이미지 교체
    if (src !== newSrc) {
      img.src = newSrc;
    }
  });
}

let timer;
["resize", "load"].forEach((event) =>
  window.addEventListener(event, () => {
    clearTimeout(timer);
    timer = setTimeout(updateBannerImages, 150);
  }),
);
