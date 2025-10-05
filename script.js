const barsContainer = document.getElementById("bars");
const explanation = document.getElementById("explanation");
const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");

let arr = [];

function generateArray() {
  arr = [];
  barsContainer.innerHTML = "";
  for (let i = 0; i < sizeSlider.value; i++) {
    let val = Math.floor(Math.random() * 100) + 5;
    arr.push(val);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val * 2}px`;
    barsContainer.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.querySelectorAll(".bar");
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      bars[j].style.background = "red";
      bars[j + 1].style.background = "red";
      explanation.innerText = `Comparing elements ${arr[j]} and ${arr[j + 1]}`;
      await sleep(speedSlider.value);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        bars[j].style.height = `${arr[j] * 2}px`;
        bars[j + 1].style.height = `${arr[j + 1] * 2}px`;
        explanation.innerText += ` → Swap!`;
      }
      bars[j].style.background = "turquoise";
      bars[j + 1].style.background = "turquoise";
    }
    bars[n - 1 - i].style.background = "green";
  }
  explanation.innerText = "Array sorted successfully!";
}

document.getElementById("generate").addEventListener("click", generateArray);
document.getElementById("sort").addEventListener("click", bubbleSort);
document.getElementById("reset").addEventListener("click", generateArray);

// Generate initial array
generateArray();
