const startTime = Date.now(); // enklare sätt
  const timeElement = document.getElementById("time");

  const interval = setInterval(() => {
    const currentTime = Date.now();
    const liveTime = currentTime - startTime; // i ms
    timeElement.innerHTML = (liveTime / 1000).toFixed(2) + " s";

    if (liveTime >= 70000) { // 70 sekunder
      clearInterval(interval);
      console.log("Klart!");
    }
  }, 100); // uppdatera var 100 ms