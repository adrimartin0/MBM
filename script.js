document.documentElement.classList.add("js-enabled");

const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");
const body = document.body;

const closeMenu = () => {
  navLinks.classList.remove("open");
  body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
};

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const scrollToCurrentHash = () => {
  const id = window.location.hash.slice(1);
  const target = id ? document.getElementById(id) : null;

  if (target) {
    target.scrollIntoView();
  }
};

window.addEventListener("load", () => {
  window.setTimeout(scrollToCurrentHash, 0);
});

window.addEventListener("hashchange", () => {
  window.setTimeout(scrollToCurrentHash, 0);
});

const revealElement = (element) => {
  element.classList.add("is-visible");
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach(revealElement);
}
