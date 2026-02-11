(async () => {
  const nodes = document.querySelectorAll("[data-include]");
  if (!nodes.length) return;

  for (const el of nodes) {
    const name = el.dataset.include;

    try {
      const res = await fetch(`components/${name}.html`, {
        cache: "no-cache",
      });
      if (!res.ok) throw new Error(res.status);

      el.outerHTML = await res.text();
    } catch (e) {
      console.error(`[include fail] ${name}`, e);
      el.outerHTML = `<!-- include failed: ${name} -->`;
    }
  }

  document.dispatchEvent(new CustomEvent("components:loaded"));
})();
