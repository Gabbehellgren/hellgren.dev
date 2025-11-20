const loadingtime = 1000

const loader = document.getElementsByClassName("loader")
setTimeout(() => {
  for (const el of document.getElementsByClassName("loader")) {
    el.style.animation = "fade 0.5s linear"
    el.style.opacity = "0"

    setTimeout(() => {
        el.style.display = "none"
    }, 500)
  }
}, loadingtime);


const activeLink = document.querySelector('nav .active');
const otherLinks = document.querySelectorAll('nav a:not(.active)');

  otherLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      activeLink.style.animation = "BG 0.2s ease reverse";
      activeLink.style.color = "var(--text_color)";
      activeLink.style.background = "black";
    });
    link.addEventListener('mouseleave', () => {
      activeLink.style.animation = "BG 0.2s ease";
      activeLink.style.color = "black";
      activeLink.style.background = "var(--text_color)";
    });
  });