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
async function insertionSort() {
  const bars = document.querySelectorAll(".bar");
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    bars[i].style.background = "red";
    explanation.innerText = `Inserting element ${key} into the sorted part`;
    await sleep(speedSlider.value);
    while (j >= 0 && arr[j] > key) {
      bars[j].style.background = "orange";
      explanation.innerText = `Comparing ${arr[j]} and ${key} → shifting ${arr[j]}`;

      arr[j + 1] = arr[j];
      bars[j + 1].style.height = `${arr[j + 1] * 2}px`; 

      await sleep(speedSlider.value);
      bars[j].style.background = "turquoise";
      j--;
    }
    arr[j + 1] = key;
    bars[j + 1].style.height = `${key * 2}px`;  
    bars[i].style.background = "turquoise";

    explanation.innerText = `Placed ${key} at correct position`;
    await sleep(speedSlider.value);
    for (let k = 0; k <= i; k++) {
      bars[k].style.background = "green";
    }
  }

  explanation.innerText = "Array sorted successfully!";
}
async function selectionSort() {
  const bars = document.querySelectorAll(".bar");
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    bars[i].style.background = "red";
    explanation.innerText = `Selecting minimum from index ${i} to ${n - 1}`;
    await sleep(speedSlider.value);
    for (let j = i + 1; j < n; j++) {
      bars[j].style.background = "orange";
      explanation.innerText = `Comparing ${arr[j]} with current minimum ${arr[minIndex]}`;
      await sleep(speedSlider.value);
      if (arr[j] < arr[minIndex]) {
        if (minIndex !== i) bars[minIndex].style.background = "turquoise";
        minIndex = j;
        bars[minIndex].style.background = "red";
        explanation.innerText = `New minimum found: ${arr[minIndex]}`;
      } else {
        bars[j].style.background = "turquoise";
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      bars[i].style.height = `${arr[i] * 2}px`;
      bars[minIndex].style.height = `${arr[minIndex] * 2}px`;

      explanation.innerText += ` → Swapped ${arr[i]} and ${arr[minIndex]}`;
      await sleep(speedSlider.value);
    }

    bars[i].style.background = "green"; 
  }

  bars[n - 1].style.background = "green";
  explanation.innerText = "Array sorted successfully!";
}

document.getElementById("generate").addEventListener("click", generateArray);
document.getElementById("reset").addEventListener("click", generateArray);
document.getElementById("sort").addEventListener("click", () => {
  const algorithm = document.getElementById("algorithm").value;
  if (algorithm == "bubble") {
    bubbleSort();
  } 
  else if (algorithm == "insertion") {
    insertionSort();
  }
  else if (algorithm == "selection") {
    selectionSort();
  }
});
// Generate initial array
generateArray();
