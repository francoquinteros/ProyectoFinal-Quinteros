import { useState } from "react";

/**
 * - Validaciones: mínimo 1, máximo stock
 * - onAdd recibe la cantidad elegida
 */
export default function ItemCount({ stock, initial = 1, onAdd }) {
  const safeInitial = Math.max(1, Math.min(initial, stock || 1));
  const [count, setCount] = useState(safeInitial);

  const dec = () => setCount((c) => Math.max(1, c - 1));
  const inc = () => setCount((c) => Math.min(stock, c + 1));

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <button className="btn secondary" onClick={dec} disabled={count <= 1}>-</button>
        <strong>{count}</strong>
        <button className="btn secondary" onClick={inc} disabled={count >= stock}>+</button>
      </div>

      <button className="btn" onClick={() => onAdd(count)} disabled={stock <= 0}>
        Agregar al carrito
      </button>

      {stock <= 0 && <small style={{ color: "crimson" }}>Producto sin stock</small>}
    </div>
  );
}
