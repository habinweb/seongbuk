(function () {
  const BREAKPOINTS = {
    DESKTOP: 1200,
    TABLET: 1024,
    MOBILE: 768,
  };

  let didInit = false;

  function initCommonComponents() {
    // ✅ 중복 실행 방지 (DOMContentLoaded + components:loaded 둘 다 걸려있으니까)
    if (didInit) return;
    didInit = true;

    /* =========================
       HEADER / NAV
    ========================== */
    const hamBtn = document.querySelector(".ham-wrapper");
    const navBox = document.querySelector(".nav-box");
    const header = document.querySelector(".header-container");
    const navMenus = document.querySelectorAll(".nav-title");
    const subMenus = document.querySelectorAll(".sub-title");
    const modal = document.querySelector(".modal");

    // ✅ navBox가 없으면 햄버거/네비 관련 동작 자체를 하지 않게
    hamBtn?.addEventListener("click", () => {
      if (!navBox) return;

      navBox.classList.toggle("active");

      if (!navBox.classList.contains("active")) {
        navMenus.forEach((menu) => {
          menu.classList.remove("focus");
          const sub = menu.querySelector(".sub-title");
          modal?.classList.remove("active");
          sub?.classList.remove("show");
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

          navMenus.forEach((item) => {
            item.classList.remove("focus");
            item.querySelector(".sub-title")?.classList.remove("show");
          });
          modal?.classList.remove("active");

          if (!isOpen) {
            menu.classList.add("focus");
            sub.classList.add("show");
            modal?.classList.add("active");
          }
        }
      });
    });

    navBox?.addEventListener("mouseenter", () => {
      if (window.innerWidth > BREAKPOINTS.TABLET) {
        subMenus.forEach((menu) => menu.classList.add("show"));
        header?.classList.add("on"); // ✅
      }
    });

    navBox?.addEventListener("mouseleave", () => {
      if (window.innerWidth > BREAKPOINTS.TABLET) {
        subMenus.forEach((menu) => menu.classList.remove("show"));
        header?.classList.remove("on"); // ✅
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
        if (!fixItems.length) return; // ✅

        const isOpen = fixItems[0].classList.contains("view");
        if (!isOpen) {
          e.preventDefault();
          fixItems.forEach((item) => item.classList.add("view"));
        }
      }
    });

    document.addEventListener("click", (e) => {
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
      footerNavShow?.classList.toggle("open"); // ✅
    });
  }

  function initHeaderScroll() {
    if (window.innerWidth <= BREAKPOINTS.TABLET) return;

    const topHeaderBox = document.querySelector(".top-header-box");
    const nav = document.querySelector(".nav");

    // ✅ 둘 중 하나라도 없으면 스크롤 로직 자체 스킵
    if (!topHeaderBox || !nav) return;

    let lastScrollY = window.scrollY;
    const THRESHOLD = 10;

    window.addEventListener("scroll", () => {
      const currentY = window.scrollY;

      if (currentY <= 0) {
        topHeaderBox.classList.remove("is-collapsed");
        nav.classList.remove("scroll");
        lastScrollY = 0;
        return;
      }

      if (Math.abs(currentY - lastScrollY) < THRESHOLD) return;

      if (currentY > lastScrollY) {
        topHeaderBox.classList.add("is-collapsed");
        nav.classList.add("scroll");
      } else {
        topHeaderBox.classList.remove("is-collapsed");
      }

      lastScrollY = currentY;
    });
  }

  document.addEventListener("DOMContentLoaded", initCommonComponents);
  document.addEventListener("components:loaded", initCommonComponents);
})();
