import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";

export default function ItemDetail({ item }) {
  const { addItem } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAdd = (qty) => {
    addItem(item, qty);
    setAdded(true); // ocultar ItemCount luego de agregar
  };

  return (
    <div className="container">
      <div className="card">
        <div className="row" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 320px" }}>
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 14 }}
              />
            ) : (
              <div style={{ width: "100%", height: 260, borderRadius: 14, background: "#f1f1f1" }} />
            )}
          </div>

          <div style={{ flex: 1, minWidth: 260 }}>
            <h2 style={{ marginTop: 0 }}>{item.title}</h2>
            <p className="muted">{item.description}</p>
            <p><strong>${item.price}</strong></p>
            <p className="muted">Stock disponible: {item.stock}</p>

            {!added ? (
              <ItemCount stock={Number(item.stock || 0)} initial={1} onAdd={handleAdd} />
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                <p style={{ margin: 0 }}>✅ Producto agregado al carrito.</p>
                <div className="row">
                  <Link to="/cart" className="btn" style={{ textDecoration: "none", display: "inline-block" }}>
                    Ir al carrito
                  </Link>
                  <Link to="/" className="btn secondary" style={{ textDecoration: "none", display: "inline-block" }}>
                    Seguir comprando
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
