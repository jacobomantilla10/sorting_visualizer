const backgroundColor = "#575757";
const switchColor = "#7a5af5";

export async function insertionSort(arr, swapTime) {
  for (let i = 1; i < arr.length; i++) {
    let x = arr[i].getAttribute("height");
    let j = i - 1;
    while (j >= 0 && parseInt(arr[j].getAttribute("height")) > x) {
      let rightBarStyle = arr[j + 1].style;
      let leftBarStyle = arr[j].style;
      await delay(swapTime);
      rightBarStyle["backgroundColor"] = switchColor;
      leftBarStyle["backgroundColor"] = switchColor;
      await delay(swapTime);
      arr[j + 1].setAttribute("height", arr[j].getAttribute("height"));
      rightBarStyle["height"] = leftBarStyle["height"];
      await delay(swapTime);
      rightBarStyle["backgroundColor"] = backgroundColor;
      leftBarStyle["backgroundColor"] = backgroundColor;
      j--;
    }
    await delay(swapTime);
    arr[j + 1].style["backgroundColor"] = switchColor;
    await delay(swapTime);
    arr[j + 1].setAttribute("height", x);
    arr[j + 1].style["height"] = `${x}px`;
    await delay(swapTime);
    arr[j + 1].style["backgroundColor"] = backgroundColor;
  }
  return arr;
}

export async function quickSort(arr, s, e, swapTime) {
  if (e - s + 1 <= 1) {
    return;
  }

  let pivot = arr[e].getAttribute("height");
  let left = s;

  for (let i = s; i < e; i++) {
    if (parseInt(arr[i].getAttribute("height")) < pivot) {
      let tmp = arr[left].getAttribute("height");

      await delay(swapTime);
      arr[left].style["backgroundColor"] = switchColor;
      arr[i].style["backgroundColor"] = switchColor;

      await delay(swapTime);
      arr[left].style["height"] = arr[i].style["height"];
      arr[left].setAttribute("height", arr[i].getAttribute("height"));

      await delay(swapTime);
      arr[i].style["height"] = `${tmp}px`;
      arr[i].setAttribute("height", tmp);

      await delay(swapTime);
      arr[left].style["backgroundColor"] = backgroundColor;
      arr[i].style["backgroundColor"] = backgroundColor;

      left++;
    }
  }
  await delay(swapTime);
  arr[e].style["backgroundColor"] = switchColor;
  arr[left].style["backgroundColor"] = switchColor;

  await delay(swapTime);
  arr[e].style["height"] = arr[left].style["height"];
  arr[e].setAttribute("height", arr[left].getAttribute("height"));

  await delay(swapTime);
  arr[left].style["height"] = `${pivot}px`;
  arr[left].setAttribute("height", pivot);

  await delay(swapTime);
  arr[e].style["backgroundColor"] = backgroundColor;
  arr[left].style["backgroundColor"] = backgroundColor;

  await quickSort(arr, s, left - 1);
  await quickSort(arr, left + 1, e);

  return arr;
}

export async function mergeSort(arr, s, e, swapTime) {
  if (e - s + 1 <= 1) return arr;

  //Find the middle index of the array
  let m = Math.floor((s + e) / 2);

  // Merge sort the left half
  await mergeSort(arr, s, m);

  // Merge sort the right half
  await mergeSort(arr, m + 1, e);

  //Merge sorted halves
  await merge(arr, s, m, e, swapTime);

  return arr;
}

let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function merge(arr, s, m, e, swapTime) {
  let elements = Array.from(arr);
  let L = elements
    .slice(s, m + 1)
    .map((el) => parseInt(el.getAttribute("height")));
  let R = elements
    .slice(m + 1, e + 1)
    .map((el) => parseInt(el.getAttribute("height")));

  let i = 0; // index for L
  let j = 0; // index for R
  let k = s; // index for arr

  // Merge the two sorted halves into the original array
  while (i < L.length && j < R.length) {
    if (L[i] <= R[j]) {
      await delay(swapTime);
      arr[k].style["backgroundColor"] = switchColor;
      arr[s + i].style["backgroundColor"] = switchColor;

      await delay(swapTime);
      arr[k].setAttribute("height", L[i]);
      arr[k].style["height"] = `${L[i]}px`;

      await delay(swapTime);
      arr[k].style["backgroundColor"] = backgroundColor;
      arr[s + i].style["backgroundColor"] = backgroundColor;

      i++;
    } else {
      await delay(swapTime);
      arr[k].style["backgroundColor"] = switchColor;
      arr[m + j + 1].style["backgroundColor"] = switchColor;

      await delay(swapTime);
      arr[k].setAttribute("height", R[j]);
      arr[k].style["height"] = `${R[j]}px`;

      await delay(swapTime);
      arr[k].style["backgroundColor"] = backgroundColor;
      arr[m + j + 1].style["backgroundColor"] = backgroundColor;

      j++;
    }
    k++;
  }

  //one of the halves will have elements remaining
  while (i < L.length) {
    await delay(swapTime);
    arr[k].style["backgroundColor"] = switchColor;
    arr[s + i].style["backgroundColor"] = switchColor;

    await delay(swapTime);
    arr[k].setAttribute("height", L[i]);
    arr[k].style["height"] = `${L[i]}px`;

    await delay(swapTime);
    arr[k].style["backgroundColor"] = backgroundColor;
    arr[s + i].style["backgroundColor"] = backgroundColor;

    i++;
    k++;
  }
  while (j < R.length) {
    await delay(swapTime);
    arr[k].style["backgroundColor"] = switchColor;
    arr[m + j + 1].style["backgroundColor"] = switchColor;

    await delay(swapTime);
    arr[k].setAttribute("height", R[j]);
    arr[k].style["height"] = `${R[j]}px`;

    await delay(swapTime);
    arr[k].style["backgroundColor"] = backgroundColor;
    arr[m + j + 1].style["backgroundColor"] = backgroundColor;

    j++;
    k++;
  }
}
