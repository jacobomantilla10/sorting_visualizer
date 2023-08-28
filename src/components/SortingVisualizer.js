import { useState } from "react";
import {
  insertionSort,
  quickSort,
  mergeSort,
} from "../sorting-algos/sortingAlgorithms";

function createRandomArray(numItems) {
  let arr = [];

  for (let i = 0; i < numItems; i++) {
    let num = Math.floor(Math.random() * 50);
    arr.push(num);
  }

  return arr;
}

function SortingVisualizer() {
  const numItems = 50;
  const [items, setItems] = useState(createRandomArray(numItems));
  const [isSorting, setIsSorting] = useState(false);

  const arrayBars = document.getElementsByClassName("array-bar");

  function resetItems() {
    setItems(createRandomArray(numItems));
  }

  async function handleInsertionSortClick() {
    let res = await insertionSort(arrayBars);
    let nextItems = [];

    for (let i = 0; i < res.length; i++) {
      nextItems.push(parseInt(res[i].getAttribute("height")));
    }
    //console.log(nextItems);
    setItems(nextItems);
  }

  async function handleQuickSortClick() {
    let res = await quickSort(arrayBars, 0, arrayBars.length - 1);
    let nextItems = [];

    for (let i = 0; i < res.length; i++) {
      nextItems.push(parseInt(res[i].getAttribute("height")));
    }
    console.log(nextItems);
    setItems(nextItems);
  }

  async function handleMergeSortClick() {
    let res = await mergeSort(arrayBars, 0, arrayBars.length - 1);
    let nextItems = [];

    for (let i = 0; i < res.length; i++) {
      nextItems.push(parseInt(res[i].getAttribute("height")));
    }
    console.log(nextItems);
    setItems(nextItems);
  }

  return (
    <div className="container">
      <div className="array-container">
        {items.map((item, idx) => (
          <div
            className="array-bar"
            key={idx}
            height={item}
            style={{ backgroundColor: "black", height: `${item}px` }}
          ></div>
        ))}
      </div>
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
  );
}

export default SortingVisualizer;
