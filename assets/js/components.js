(function () {
  const BP = {
    DESKTOP: 1200,
    TABLET: 1024,
    MOBILE: 768,
  };

  // =========================
  // Utils
  // =========================
  const qs = (sel, scope = document) => scope.querySelector(sel);
  const qsa = (sel, scope = document) =>
    Array.from(scope.querySelectorAll(sel));

  // 요소별 중복 바인딩 방지
  function bindOnce(el, key, binder) {
    if (!el) return false;
    const k = `bound_${key}`;
    if (el.dataset[k] === "1") return false;
    el.dataset[k] = "1";
    binder(el);
    return true;
  }

  function isMobile() {
    return window.innerWidth <= BP.MOBILE;
  }
  function isTabletOrDown() {
    return window.innerWidth <= BP.TABLET;
  }
  function isDesktop() {
    return window.innerWidth > BP.TABLET;
  }

  // =========================
  // HEADER / NAV
  // =========================
  function setupHamburgerNav() {
    const hamBtn = qs(".ham-wrapper");
    const navBox = qs(".nav-box");
    const modal = qs(".modal");

    bindOnce(hamBtn, "ham_click", () => {
      hamBtn.addEventListener("click", () => {
        if (!navBox) return;

        navBox.classList.toggle("active");

        // 닫힐 때 초기화
        if (!navBox.classList.contains("active")) {
          qsa(".nav-title").forEach((menu) => {
            menu.classList.remove("focus");
            menu.querySelector(".sub-title")?.classList.remove("show");
          });
          modal?.classList.remove("active");
        }
      });
    });
  }

  function setupNavMenuClickAccordion() {
    const modal = qs(".modal");

    // nav-title은 여러 개라 각 요소별로 bindOnce
    qsa(".nav-title").forEach((menu) => {
      bindOnce(menu, "nav_title_click", () => {
        menu.addEventListener("click", (e) => {
          if (!isTabletOrDown()) return;

          const sub = menu.querySelector(".sub-title");
          if (!sub) return;

          e.preventDefault();
          e.stopPropagation();

          const isOpen = sub.classList.contains("show");

          // 전체 닫기
          qsa(".nav-title").forEach((item) => {
            item.classList.remove("focus");
            item.querySelector(".sub-title")?.classList.remove("show");
          });
          modal?.classList.remove("active");

          // 현재만 열기
          if (!isOpen) {
            menu.classList.add("focus");
            sub.classList.add("show");
            modal?.classList.add("active");
          }
        });
      });
    });
  }

  function setupNavBoxHoverOpenAll() {
    const navBox = qs(".nav-box");
    const header = qs(".header-container");

    bindOnce(navBox, "nav_hover", () => {
      navBox.addEventListener("mouseenter", () => {
        if (!isDesktop()) return;
        qsa(".sub-title").forEach((menu) => menu.classList.add("show"));
        header?.classList.add("on");
      });

      navBox.addEventListener("mouseleave", () => {
        if (!isDesktop()) return;
        qsa(".sub-title").forEach((menu) => menu.classList.remove("show"));
        header?.classList.remove("on");
      });
    });
  }

  function setupNavTitleHoverFocus() {
    const navTitles = qsa(".nav-title");
    navTitles.forEach((navTitle, index) => {
      if (index === navTitles.length - 1) return;

      bindOnce(navTitle, "nav_title_hover", () => {
        const links = qsa(".sub-title > li", navTitle);

        navTitle.addEventListener("mouseenter", () => {
          navTitle.classList.add("focus");
          links.forEach((a) => a.classList.add("focus"));
        });

        navTitle.addEventListener("mouseleave", () => {
          navTitle.classList.remove("focus");
          links.forEach((a) => a.classList.remove("focus"));
        });
      });
    });
  }

  function setupHeaderScroll() {
    // 스크롤 이벤트는 전역에서 1번만 걸고 내부에서 요소 존재할 때만 동작
    bindOnce(document.documentElement, "header_scroll", () => {
      let lastScrollY = window.scrollY;
      const THRESHOLD = 10;

      window.addEventListener(
        "scroll",
        () => {
          if (!isDesktop()) return;

          const topHeaderBox = qs(".top-header-box");
          const nav = qs(".nav");
          if (!topHeaderBox || !nav) return;

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
        },
        { passive: true },
      );
    });
  }

  // =========================
  // FIX MENU
  // =========================
  function setupFixMenu() {
    const fixWrap = qs(".fix-menu-box");
    if (!fixWrap) return;

    // fixWrap 기준으로 item을 항상 최신으로 가져오게
    const items = () => qsa(".fix-item", fixWrap);

    bindOnce(fixWrap, "fix_menu", () => {
      // Tablet: click to open (Mobile 제외)
      fixWrap.addEventListener("click", (e) => {
        if (isMobile()) return;

        if (isTabletOrDown()) {
          const list = items();
          if (!list.length) return;

          const isOpen = list[0].classList.contains("view");
          if (!isOpen) {
            e.preventDefault();
            list.forEach((item) => item.classList.add("view"));
          }
        }
      });

      // Desktop: hover to open
      fixWrap.addEventListener("mouseenter", () => {
        if (!isDesktop()) return;
        items().forEach((item) => item.classList.add("view"));
      });

      fixWrap.addEventListener("mouseleave", () => {
        if (!isDesktop()) return;
        items().forEach((item) => item.classList.remove("view"));
      });
    });
  }

  function setupGlobalCloseHandlers() {
    // document click / window scroll 같은 전역 이벤트는 1번만
    bindOnce(document.documentElement, "global_close_handlers", () => {
      document.addEventListener("click", (e) => {
        // FIX MENU close
        const fixWrap = qs(".fix-menu-box");
        if (fixWrap && !fixWrap.contains(e.target)) {
          qsa(".fix-item", fixWrap).forEach((item) =>
            item.classList.remove("view"),
          );
        }
      });

      window.addEventListener(
        "scroll",
        () => {
          // Tablet 이하에서 FIX MENU 닫기
          if (isTabletOrDown()) {
            const fixWrap = qs(".fix-menu-box");
            if (fixWrap) {
              qsa(".fix-item", fixWrap).forEach((item) =>
                item.classList.remove("view"),
              );
            }
          }
        },
        { passive: true },
      );
    });
  }

  // =========================
  // FOOTER
  // =========================
  function setupFooterRelatedToggle() {
    const footerNav = qs(".nav-foot-tit-box");
    const footerNavShow = qs(".related-group-box");

    bindOnce(footerNav, "footer_toggle", () => {
      footerNav.addEventListener("click", () => {
        footerNavShow?.classList.toggle("open");
      });
    });
  }

  // =========================
  // Bootstrap
  // =========================
  function init() {
    // HEADER / NAV
    setupHamburgerNav();
    setupNavMenuClickAccordion();
    setupNavBoxHoverOpenAll();
    setupNavTitleHoverFocus();
    setupHeaderScroll();

    // FIX MENU
    setupFixMenu();
    setupGlobalCloseHandlers();

    // FOOTER
    setupFooterRelatedToggle();
  }

  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("components:loaded", init);
})();
