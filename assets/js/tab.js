document.querySelectorAll(".tab-group").forEach((group) => {
  // 1️⃣ 이 tab-group 안에 있는 모든 탭 / 패널 가져오기
  const allTabs = group.querySelectorAll("[data-tab]");
  const allPanels = group.querySelectorAll("[data-panel]");

  // 2️⃣ 중첩 tab-group 제외 → "이 그룹 소속"만 필터링
  const tabs = [];
  const panels = [];

  allTabs.forEach((tab) => {
    if (tab.closest(".tab-group") === group) {
      tabs.push(tab);
    }
  });

  allPanels.forEach((panel) => {
    if (panel.closest(".tab-group") === group) {
      panels.push(panel);
    }
  });

  // 3️⃣ 탭 활성화 함수
  function activate(key) {
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.tab === key);
    });

    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === key);
    });
  }

  // 4️⃣ 초기 탭 설정
  let startKey;
  const activeTab = tabs.find((tab) => tab.classList.contains("active"));

  if (activeTab) {
    startKey = activeTab.dataset.tab;
  } else {
    startKey = tabs[0].dataset.tab;
  }

  activate(startKey);

  // 5️⃣ 클릭 이벤트
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activate(tab.dataset.tab);
    });
  });
});
