import { useState } from "react";
import {
  insertionSort,
  quickSort,
  mergeSort,
} from "../sorting-algos/sortingAlgorithms";

function createRandomArray(numItems) {
  let arr = [];
  let max = 400;

  if (document.getElementById("array_container")) {
    max =
      parseInt(document.getElementById("array_container").clientHeight) - 10;
  }

  for (let i = 0; i < numItems; i++) {
    let num = Math.floor(Math.random() * max);
    arr.push(num);
  }

  return arr;
}

function SortingVisualizer() {
  const [numItems, setNumItems] = useState(100);
  const [items, setItems] = useState(createRandomArray(numItems));
  const [isSorting, setIsSorting] = useState(false);
  const [sortTime, setSortTime] = useState(null);
  const [sortingSpeed, setSortingSpeed] = useState(30);

  const arrayBars = document.getElementsByClassName("array-bar");

  function resetItems() {
    setSortTime(null);
    setItems(createRandomArray(numItems));
  }

  async function handleInsertionSortClick() {
    setIsSorting(true);

    const start = Date.now();
    let res = await insertionSort(arrayBars, sortingSpeed);
    const end = Date.now();
    setSortTime(end - start);

    let nextItems = [];

    for (let i = 0; i < res.length; i++) {
      nextItems.push(parseInt(res[i].getAttribute("height")));
    }
    //console.log(nextItems);
    setItems(nextItems);
    setIsSorting(false);
  }

  async function handleQuickSortClick() {
    setIsSorting(true);

    const start = Date.now();
    let res = await quickSort(arrayBars, 0, arrayBars.length - 1, sortingSpeed);
    const end = Date.now();
    setSortTime(end - start);

    let nextItems = [];

    for (let i = 0; i < res.length; i++) {
      nextItems.push(parseInt(res[i].getAttribute("height")));
    }
    console.log(nextItems);
    setItems(nextItems);
    setIsSorting(false);
  }

  async function handleMergeSortClick() {
    setIsSorting(true);

    const start = Date.now();
    let res = await mergeSort(arrayBars, 0, arrayBars.length - 1, sortingSpeed);
    const end = Date.now();
    setSortTime(end - start);

    let nextItems = [];

    for (let i = 0; i < res.length; i++) {
      nextItems.push(parseInt(res[i].getAttribute("height")));
    }
    console.log(nextItems);
    setItems(nextItems);
    setIsSorting(false);
  }

  function onSpeedChange(e) {
    console.log("triggered");
    setSortingSpeed(parseInt(e.target.value));
  }

  function onNumItemsChange(e) {
    console.log("triggered");
    setNumItems(parseInt(e.target.value));
    resetItems();
  }

  return (
    <div className="container" style={{ width: "100%", height: "100%" }}>
      {/* {sortTime && <h3>{`Last array was sorted in ${sortTime}ms`}</h3>} */}
      <div id="array_container" className="array-container">
        {items.map((item, idx) => (
          <div
            className="array-bar"
            key={idx}
            height={item}
            style={{ height: `${item}px` }}
          ></div>
        ))}
      </div>
      <div className="sliders-container">
        <div>
          <input
            type="range"
            name="number"
            min="15"
            max="120"
            class="slider"
            value={numItems}
            onChange={onNumItemsChange}
          ></input>
          <label for="number">Array Size</label>
        </div>
        <div>
          <input
            type="range"
            name="speed"
            min="10"
            max="60"
            class="slider"
            value={sortingSpeed}
            onChange={onSpeedChange}
          ></input>
          <label for="speed">🕒 Per Swap</label>
        </div>
      </div>
      <div className="button-container">
        <button
          className="insertion-sort-button"
          onClick={() => handleInsertionSortClick()}
        >
          Insertion Sort
        </button>
        <button
          className="quicksort-button"
          onClick={() => handleQuickSortClick()}
        >
          Quicksort
        </button>
        <button
          className="mergesort-button"
          onClick={() => handleMergeSortClick()}
        >
          Mergesort
        </button>
        {!isSorting && (
          <button className="reset-button" onClick={() => resetItems()}>
            Reset Items
          </button>
        )}
      </div>
    </div>
  );
}

export default SortingVisualizer;
