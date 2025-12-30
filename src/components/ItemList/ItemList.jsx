import Item from "../Item/Item";

export default function ItemList({ items }) {
  return (
    <div className="grid">
      {items.map((p) => (
        <Item key={p.id} item={p} />
      ))}
    </div>
  );
}
