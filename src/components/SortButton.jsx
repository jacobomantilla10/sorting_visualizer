export default function SortButton({ name, onClick }) {
  return <button onClick={() => onClick()}>{name}</button>;
}
