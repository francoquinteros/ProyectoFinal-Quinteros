export default function CartItem({ item, onRemove }) {
  const subtotal = Number(item.price || 0) * item.quantity;

  return (
    <div className="card" style={{ display: "grid", gap: 6 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <strong>{item.title}</strong>
        <button className="btn secondary" onClick={() => onRemove(item.id)}>Eliminar</button>
      </div>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="muted">Precio:</span>
        <span>${item.price}</span>
      </div>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="muted">Cantidad:</span>
        <span>{item.quantity}</span>
      </div>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="muted">Subtotal:</span>
        <strong>${subtotal}</strong>
      </div>
    </div>
  );
}
