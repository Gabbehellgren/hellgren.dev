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