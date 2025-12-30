import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";

export default function Cart() {
  const { cart, totalPrice, clearCart, removeItem } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Carrito</h2>
          <p className="muted">Carrito vacío.</p>
          <Link to="/" className="btn" style={{ textDecoration: "none", display: "inline-block" }}>
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ display: "grid", gap: 14 }}>
      <h2 style={{ margin: 0 }}>Carrito</h2>

      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={removeItem} />
      ))}

      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <strong>Total</strong>
          <strong>${totalPrice}</strong>
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn secondary" onClick={clearCart}>Vaciar carrito</button>
          <Link to="/checkout" className="btn" style={{ textDecoration: "none", display: "inline-block" }}>
            Ir a checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
