import { Link } from "react-router-dom";

export default function Item({ item }) {
  return (
    <article className="card">
      <h3 style={{ marginTop: 0 }}>{item.title}</h3>
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12 }}
        />
      ) : (
        <div style={{ width: "100%", height: 160, borderRadius: 12, background: "#f1f1f1" }} />
      )}

      <p style={{ marginBottom: 6 }}><strong>${item.price}</strong></p>
      <p className="muted" style={{ marginTop: 0 }}>
        Categoría: {item.category} · Stock: {item.stock}
      </p>

      <Link to={`/item/${item.id}`}>Ver detalle</Link>
    </article>
  );
}
