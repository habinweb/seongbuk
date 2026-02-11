(function () {
  const BREAKPOINTS = {
    DESKTOP: 1200,
    TABLET: 1024,
    MOBILE: 768,
  };

  function initCommonComponents() {
    /* =========================
       HEADER / NAV
    ========================== */
    const hamBtn = document.querySelector(".ham-wrapper");
    const navBox = document.querySelector(".nav-box");
    const header = document.querySelector(".header-container");
    const navMenus = document.querySelectorAll(".nav-title");
    const subMenus = document.querySelectorAll(".sub-title");
    const modal = document.querySelector(".modal");
    hamBtn?.addEventListener("click", () => {
      navBox.classList.toggle("active");

      if (!navBox.classList.contains("active")) {
        navMenus.forEach((menu) => {
          menu.classList.remove("focus");
          const sub = menu.querySelector(".sub-title");
          modal?.classList.remove("active");
          if (sub) sub.classList.remove("show");
        });
      }
    });

    navMenus.forEach((menu) => {
      menu.addEventListener("click", (e) => {
        if (window.innerWidth <= BREAKPOINTS.TABLET) {
          const sub = menu.querySelector(".sub-title");
          if (!sub) return;

          e.preventDefault();
          e.stopPropagation();

          const isOpen = sub.classList.contains("show");

          // 1. 모든 메뉴와 모달을 일단 닫기 (초기화)
          navMenus.forEach((item) => {
            item.classList.remove("focus");
            item.querySelector(".sub-title")?.classList.remove("show");
          });
          modal?.classList.remove("active"); // 모달 제거

          // 2. 누른 메뉴가 닫혀있었다면 열기
          if (!isOpen) {
            menu.classList.add("focus");
            sub.classList.add("show");
            modal?.classList.add("active"); // ✅ 여기서 모달 등장!
          }
        }
      });
    });

    navBox?.addEventListener("mouseenter", () => {
      if (window.innerWidth > BREAKPOINTS.TABLET) {
        subMenus.forEach((menu) => menu.classList.add("show"));
        header.classList.add("on");
      }
    });

    navBox?.addEventListener("mouseleave", () => {
      if (window.innerWidth > BREAKPOINTS.TABLET) {
        subMenus.forEach((menu) => menu.classList.remove("show"));
        header.classList.remove("on");
      }
    });

    /* =========================
       HEADER / NAV SCROLL
    ========================== */
    initHeaderScroll();

    /* =========================
       NAV TITLE HOVER
    ========================== */
    const navTitles = document.querySelectorAll(".nav-title");

    navTitles.forEach((navTitle, index) => {
      if (index === navTitles.length - 1) return;

      const links = navTitle.querySelectorAll(".sub-title > li");

      navTitle.addEventListener("mouseenter", () => {
        navTitle.classList.add("focus");
        links.forEach((a) => a.classList.add("focus"));
      });

      navTitle.addEventListener("mouseleave", () => {
        navTitle.classList.remove("focus");
        links.forEach((a) => a.classList.remove("focus"));
      });
    });

    /* =========================
       FIX MENU
    ========================== */
    const fixWrap = document.querySelector(".fix-menu-box");
    const fixItems = document.querySelectorAll(".fix-item");

    fixWrap?.addEventListener("click", (e) => {
      if (window.innerWidth <= BREAKPOINTS.MOBILE) return;
      if (window.innerWidth <= BREAKPOINTS.TABLET) {
        const isOpen = fixItems[0].classList.contains("view");

        if (!isOpen) {
          e.preventDefault();
          fixItems.forEach((item) => item.classList.add("view"));
        }
      }
    });
    document.addEventListener("click", (e) => {
      // 클릭한 대상(e.target)이 fixWrap을 포함하고 있지 않으면 닫기
      if (fixWrap && !fixWrap.contains(e.target)) {
        fixItems.forEach((item) => item.classList.remove("view"));
      }
    });
    window.addEventListener(
      "scroll",
      () => {
        if (window.innerWidth <= BREAKPOINTS.TABLET) {
          fixItems.forEach((item) => item.classList.remove("view"));
        }
      },
      { passive: true },
    );

    fixWrap?.addEventListener("mouseenter", () => {
      if (window.innerWidth > BREAKPOINTS.TABLET) {
        fixItems.forEach((item) => item.classList.add("view"));
      }
    });

    fixWrap?.addEventListener("mouseleave", () => {
      if (window.innerWidth > BREAKPOINTS.TABLET) {
        fixItems.forEach((item) => item.classList.remove("view"));
      }
    });

    /* =========================
       FOOTER
    ========================== */
    const footerNav = document.querySelector(".nav-foot-tit-box");
    const footerNavShow = document.querySelector(".related-group-box");

    footerNav?.addEventListener("click", () => {
      footerNavShow.classList.toggle("open");
    });
  }
  //
  function initHeaderScroll() {
    if (window.innerWidth <= BREAKPOINTS.TABLET) return;

    const topHeaderBox = document.querySelector(".top-header-box");
    const nav = document.querySelector(".nav");

    let lastScrollY = window.scrollY;
    const THRESHOLD = 10;

    window.addEventListener("scroll", () => {
      const currentY = window.scrollY;

      if (currentY <= 0) {
        topHeaderBox?.classList.remove("is-collapsed");
        nav.classList.remove("scroll");
        lastScrollY = 0;
        return;
      }

      if (Math.abs(currentY - lastScrollY) < THRESHOLD) return;

      if (currentY > lastScrollY) {
        topHeaderBox?.classList.add("is-collapsed");
        nav.classList.add("scroll");
      } else {
        topHeaderBox?.classList.remove("is-collapsed");
      }

      lastScrollY = currentY;
    });
  }

  /* =========================
     진입점 통일
  ========================== */
  document.addEventListener("DOMContentLoaded", initCommonComponents);
  document.addEventListener("components:loaded", initCommonComponents);
})();
