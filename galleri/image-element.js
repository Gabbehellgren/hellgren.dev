document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("pictures");

  // Läs path och antal bilder från data-attribut
  const path = gallery.getAttribute("data-path") || "";
  const count = parseInt(gallery.getAttribute("data-count")) || 0;

  // Skapa bilderna
  for (let i = 1; i <= count; i++) {
    const img = document.createElement("img");
    img.src = `${path}bild${i}.jpg`;  // Sätt path + bild#.jpg
    img.alt = `Bild ${i}`;
    img.style.height = "200px";  // samma höjd
    img.style.width = "auto";    // proportionell bredd
    img.style.margin = "5px";    // lite mellanrum
    img.style.flexShrink = "0";  // för flexbox

    gallery.appendChild(img);
  }
});