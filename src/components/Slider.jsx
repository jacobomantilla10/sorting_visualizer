export default function Slider(props) {
  return (
    <div>
      <input
        type="range"
        name={props.name}
        min={props.min}
        max={props.max}
        class="slider"
        value={props.value}
        onChange={props.onChange}
      ></input>
      <label for="number">{props.text}</label>
    </div>
  );
}
