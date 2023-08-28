export async function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let x = arr[i].getAttribute("height");
    let j = i - 1;
    while (j >= 0 && parseInt(arr[j].getAttribute("height")) > x) {
      let rightBarStyle = arr[j + 1].style;
      let leftBarStyle = arr[j].style;
      await delay(30);
      rightBarStyle["backgroundColor"] = "green";
      leftBarStyle["backgroundColor"] = "green";
      await delay(35);
      arr[j + 1].setAttribute("height", arr[j].getAttribute("height"));
      rightBarStyle["height"] = leftBarStyle["height"];
      await delay(30);
      rightBarStyle["backgroundColor"] = "black";
      leftBarStyle["backgroundColor"] = "black";
      j--;
    }
    await delay(30);
    arr[j + 1].style["backgroundColor"] = "green";
    await delay(35);
    arr[j + 1].setAttribute("height", x);
    arr[j + 1].style["height"] = `${x}px`;
    await delay(30);
    arr[j + 1].style["backgroundColor"] = "black";
  }
  return arr;
}

export async function quickSort(arr, s, e) {
  if (e - s + 1 <= 1) {
    return;
  }

  let pivot = arr[e].getAttribute("height");
  let left = s;

  for (let i = s; i < e; i++) {
    if (parseInt(arr[i].getAttribute("height")) < pivot) {
      let tmp = arr[left].getAttribute("height");

      await delay(35);
      arr[left].style["backgroundColor"] = "green";
      arr[i].style["backgroundColor"] = "green";

      await delay(35);
      arr[left].style["height"] = arr[i].style["height"];
      arr[left].setAttribute("height", arr[i].getAttribute("height"));

      await delay(35);
      arr[i].style["height"] = `${tmp}px`;
      arr[i].setAttribute("height", tmp);

      await delay(35);
      arr[left].style["backgroundColor"] = "black";
      arr[i].style["backgroundColor"] = "black";

      left++;
    }
  }
  await delay(35);
  arr[e].style["backgroundColor"] = "green";
  arr[left].style["backgroundColor"] = "green";

  await delay(35);
  arr[e].style["height"] = arr[left].style["height"];
  arr[e].setAttribute("height", arr[left].getAttribute("height"));

  await delay(35);
  arr[left].style["height"] = `${pivot}px`;
  arr[left].setAttribute("height", pivot);

  await delay(35);
  arr[e].style["backgroundColor"] = "black";
  arr[left].style["backgroundColor"] = "black";

  await quickSort(arr, s, left - 1);
  await quickSort(arr, left + 1, e);

  return arr;
}

export async function mergeSort(arr, s, e) {
  if (e - s + 1 <= 1) return arr;

  //Find the middle index of the array
  let m = Math.floor((s + e) / 2);

  // Merge sort the left half
  await mergeSort(arr, s, m);

  // Merge sort the right half
  await mergeSort(arr, m + 1, e);

  //Merge sorted halves
  await merge(arr, s, m, e);

  return arr;
}

let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function merge(arr, s, m, e) {
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
      await delay(35);
      arr[k].style["backgroundColor"] = "green";
      arr[s + i].style["backgroundColor"] = "green";

      await delay(35);
      arr[k].setAttribute("height", L[i]);
      arr[k].style["height"] = `${L[i]}px`;

      await delay(35);
      arr[k].style["backgroundColor"] = "black";
      arr[s + i].style["backgroundColor"] = "black";

      i++;
    } else {
      await delay(35);
      arr[k].style["backgroundColor"] = "green";
      arr[m + j + 1].style["backgroundColor"] = "green";

      await delay(35);
      arr[k].setAttribute("height", R[j]);
      arr[k].style["height"] = `${R[j]}px`;

      await delay(35);
      arr[k].style["backgroundColor"] = "black";
      arr[m + j + 1].style["backgroundColor"] = "black";

      j++;
    }
    k++;
  }

  //one of the halves will have elements remaining
  while (i < L.length) {
    await delay(35);
    arr[k].style["backgroundColor"] = "green";
    arr[s + i].style["backgroundColor"] = "green";

    await delay(35);
    arr[k].setAttribute("height", L[i]);
    arr[k].style["height"] = `${L[i]}px`;

    await delay(35);
    arr[k].style["backgroundColor"] = "black";
    arr[s + i].style["backgroundColor"] = "black";

    i++;
    k++;
  }
  while (j < R.length) {
    await delay(35);
    arr[k].style["backgroundColor"] = "green";
    arr[m + j + 1].style["backgroundColor"] = "green";

    await delay(35);
    arr[k].setAttribute("height", R[j]);
    arr[k].style["height"] = `${R[j]}px`;

    await delay(35);
    arr[k].style["backgroundColor"] = "black";
    arr[m + j + 1].style["backgroundColor"] = "black";

    j++;
    k++;
  }
}
