document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imgModal");
  const imgBox = document.getElementById("imgModalContent");
  const close = modal.querySelector(".image-modal-close");
  let lastFocus;

  const open = (src, alt = "") => {
    lastFocus = document.activeElement;
    imgBox.src = src;
    imgBox.alt = alt;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("modal-lock");
    document.body.classList.add("modal-lock");
    close.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    imgBox.src = "";
    document.documentElement.classList.remove("modal-lock");
    document.body.classList.remove("modal-lock");
    lastFocus?.focus();
  };

  close.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  document.addEventListener("click", (e) => {
    const img = e.target.closest("[data-modal-img]");
    if (img) {
      e.preventDefault();
      open(img.src, img.alt);
    }
  });
});
