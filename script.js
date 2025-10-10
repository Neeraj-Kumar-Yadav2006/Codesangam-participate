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
      await sleep(1000-speedSlider.value);
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
  bars[0].style.background = "green";
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
    await sleep(1000-speedSlider.value);
    while (j >= 0 && arr[j] > key) {
      bars[j].style.background = "orange";
      explanation.innerText = `Comparing ${arr[j]} and ${key} → shifting ${arr[j]}`;

      arr[j + 1] = arr[j];
      bars[j + 1].style.height = `${arr[j + 1] * 2}px`; 

      await sleep(1000-speedSlider.value);
      bars[j].style.background = "turquoise";
      j--;
    }
    arr[j + 1] = key;
    bars[j + 1].style.height = `${key * 2}px`;  
    bars[i].style.background = "turquoise";

    explanation.innerText = `Placed ${key} at correct position`;
    await sleep(1000-speedSlider.value);
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
    await sleep(1000-speedSlider.value);
    for (let j = i + 1; j < n; j++) {
      bars[j].style.background = "orange";
      explanation.innerText = `Comparing ${arr[j]} with current minimum ${arr[minIndex]}`;
      await sleep(1000-speedSlider.value);
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
      await sleep(1000-speedSlider.value);
    }

    bars[i].style.background = "green"; 
  }

  bars[n - 1].style.background = "green";
  explanation.innerText = "Array sorted successfully!";
}


async function mergeSort(start, end) {
  const bars = document.querySelectorAll(".bar");
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);

  await merge(start, mid, end, bars);
  explanation.innerText = "Array sorted successfully!";
}

async function merge(start, mid, end, bars) {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  explanation.innerText = `Merging subarrays [${start}…${mid}] and [${mid + 1}…${end}]`;
  await sleep(1000-speedSlider.value);

  while (i < left.length && j < right.length) {
    bars[k].style.background = "orange";
    await sleep(1000-speedSlider.value);

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      bars[k].style.height = `${arr[k] * 2}px`;
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = `${arr[k] * 2}px`;
      j++;
    }

    bars[k].style.background = "red";
    explanation.innerText = `Placing ${arr[k]} in position ${k}`;
    await sleep(1000-speedSlider.value);
    bars[k].style.background = "green";
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = `${arr[k] * 2}px`;
    bars[k].style.background = "green";
    i++; k++;
    await sleep(1000-speedSlider.value);
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = `${arr[k] * 2}px`;
    bars[k].style.background = "green";
    j++; k++;
    await sleep(1000-speedSlider.value);
  }

  explanation.innerText = `Merged subarray [${start}…${end}] successfully`;
}
async function quickSort(start, end) {
  const bars = document.querySelectorAll(".bar");
  if (start >= end) return;

  let pivotIndex = await partition(start, end, bars);
  await quickSort(start, pivotIndex - 1);
  await quickSort(pivotIndex + 1, end);
}

async function partition(start, end, bars) {
  let pivot = arr[end];
  bars[end].style.background = "red";
  explanation.innerText = `Pivot chosen: ${pivot}`;
  await sleep(1000 - speedSlider.value);

  let i = start - 1;

  for (let j = start; j < end; j++) {
    bars[j].style.background = "orange";
    explanation.innerText = `Comparing ${arr[j]} with pivot ${pivot}`;
    await sleep(1000 - speedSlider.value);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      bars[i].style.height = `${arr[i] * 2}px`;
      bars[j].style.height = `${arr[j] * 2}px`;
      bars[i].style.background = "yellow";
      explanation.innerText = `Swapped ${arr[i]} and ${arr[j]}`;
      await sleep(1000 - speedSlider.value);
    }
    bars[j].style.background = "turquoise";
  }

  [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
  bars[i + 1].style.height = `${arr[i + 1] * 2}px`;
  bars[end].style.height = `${arr[end] * 2}px`;

  bars[i + 1].style.background = "green";
  bars[end].style.background = "turquoise";

  explanation.innerText = `Placed pivot ${pivot} at correct position`;
  await sleep(1000 - speedSlider.value);

  return i + 1;
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
  else if (algorithm == "merge") {
    mergeSort(0, arr.length - 1);
  }
  else if (algorithm == "quick") {
    quickSort(0, arr.length - 1);
  }
});
