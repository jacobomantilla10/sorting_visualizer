import { useState } from "react";
import {
  insertionSort,
  quickSort,
  mergeSort,
} from "../sorting-algos/sortingAlgorithms";
import SortButton from "./SortButton";
import Slider from "./Slider";

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
  const [sortingSpeed, setSortingSpeed] = useState(12);

  const arrayBars = document.getElementsByClassName("array-bar");

  function resetItems() {
    setItems(createRandomArray(numItems));
  }

  async function handleInsertionSortClick() {
    if (isSorting) {
      return;
    }
    setIsSorting(true);

    let res = await insertionSort(arrayBars, sortingSpeed);

    let nextItems = [];

    for (let i = 0; i < res.length; i++) {
      nextItems.push(parseInt(res[i].getAttribute("height")));
    }
    setItems(nextItems);
    setIsSorting(false);
  }

  async function handleQuickSortClick() {
    if (isSorting) {
      return;
    }
    setIsSorting(true);

    let res = await quickSort(arrayBars, 0, arrayBars.length - 1, sortingSpeed);

    let nextItems = [];

    for (let i = 0; i < res.length; i++) {
      nextItems.push(parseInt(res[i].getAttribute("height")));
    }
    setItems(nextItems);
    setIsSorting(false);
  }

  async function handleMergeSortClick() {
    if (isSorting) {
      return;
    }
    setIsSorting(true);

    let res = await mergeSort(arrayBars, 0, arrayBars.length - 1, sortingSpeed);

    let nextItems = [];

    for (let i = 0; i < res.length; i++) {
      nextItems.push(parseInt(res[i].getAttribute("height")));
    }
    setItems(nextItems);
    setIsSorting(false);
  }

  function onSpeedChange(e) {
    if (isSorting) {
      return;
    }
    setSortingSpeed(parseInt(e.target.value));
  }

  function onNumItemsChange(e) {
    if (isSorting) {
      return;
    }
    setNumItems(parseInt(e.target.value));
    resetItems();
  }

  return (
    <div className="container" style={{ width: "100%", height: "100%" }}>
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
        <Slider
          name="number"
          min={15}
          max={120}
          value={numItems}
          onChange={onNumItemsChange}
          text="Array Size"
        />
        <Slider
          name="number"
          min={8}
          max={35}
          value={sortingSpeed}
          onChange={onSpeedChange}
          text="🕒 Per Swap"
        />
      </div>
      <div className="button-container">
        <SortButton name="Insertion Sort" onClick={handleInsertionSortClick} />
        <SortButton name="Quicksort" onClick={handleQuickSortClick} />
        <SortButton name="Mergesort" onClick={handleMergeSortClick} />
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
