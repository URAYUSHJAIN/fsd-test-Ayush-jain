const startButton = document.querySelector("#start");
const container = document.querySelector(".container");
const bulbContainer = document.querySelector(".bulb-container");
const input = document.querySelector("input");
const submit = document.querySelector("#submit");
const reset = document.querySelector("#reset");
reset.style.display = "none";

let bulbCount = 0;

startButton.addEventListener("click", () => {
  container.style.display = "flex";
  startButton.style.display = "none";
});

submit.addEventListener("click", () => {
  reset.style.display = "block";
  bulbCount = input.value;
  container.style.display = "none";
  bulbContainer.style.display = "flex";
  bulbContainer.innerHTML = null;

  for (let i = 0; i < bulbCount; i++) {
    const bulbSwitchContainer = document.createElement("div");
    bulbSwitchContainer.classList.add("bulb-switch-combo");

    const bulb = document.createElement("img");
    const switchButton = document.createElement("button");
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.style.width = "0%";
    progressBar.style.height = "20px";
    progressBar.style.backgroundColor = "gray";

    switchButton.innerText = "OFF";
    switchButton.style.background = "red";

    bulb.id = `bulb${i}`;
    bulb.src = "assets/Yellow_Light_Bulb_ON.png";
    bulb.style.filter = "grayscale(100%)";
    bulb.width = 100;
    bulb.height = 150;
    bulbSwitchContainer.appendChild(bulb);
    bulbSwitchContainer.appendChild(switchButton);
    bulbSwitchContainer.appendChild(progressBar);

    let timeoutId;
    let intervalId;
    let countdown = 10;

    switchButton.addEventListener("click", () => {
      if (bulb.style.filter === "grayscale(100%)") {
        bulb.style.filter = "grayscale(0%)";
        switchButton.innerText = "ON";
        switchButton.style.background = "limegreen";

        countdown = 10;
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "green";

        intervalId = setInterval(() => {
          countdown--;
          progressBar.style.width = `${(countdown / 10) * 100}%`;
          if (countdown <= 0) {
            clearInterval(intervalId);
            bulb.style.filter = "grayscale(100%)";
            switchButton.innerText = "OFF";
            switchButton.style.background = "red";
            progressBar.style.backgroundColor = "gray";
          }
        }, 1000);

        timeoutId = setTimeout(() => {
          bulb.style.filter = "grayscale(100%)";
          switchButton.innerText = "OFF";
          switchButton.style.background = "red";
          progressBar.style.width = "0%";
          progressBar.style.backgroundColor = "gray";
        }, 10000);
      } else {
        bulb.style.filter = "grayscale(100%)";
        switchButton.innerText = "OFF";
        switchButton.style.background = "red";
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        progressBar.style.width = "0%";
        progressBar.style.backgroundColor = "gray";
      }
    });

    bulbContainer.appendChild(bulbSwitchContainer);

    reset.addEventListener("click", () => {
      input.value = "";
      bulbContainer.style.display = "none";
      startButton.style.display = "block";
      reset.style.display = "none";
    });
  }
});
