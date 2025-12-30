import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { createOrder } from "../../firebase/firestore";

export default function CheckoutForm() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const canSubmit = useMemo(() => {
    return buyer.name.trim() && buyer.phone.trim() && buyer.email.trim() && cart.length > 0;
  }, [buyer, cart.length]);

  const handleChange = (e) => {
    setBuyer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const items = cart.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        quantity: p.quantity,
      }));

      const id = await createOrder({ buyer, items, total: totalPrice });
      setOrderId(id);
      clearCart();
    } catch (err) {
      setError(err?.message || "Error al generar la orden.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Generando orden..." />;

  if (orderId) {
    return (
      <div className="container">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Compra confirmada ✅</h2>
          <p>Tu ID de orden es:</p>
          <p style={{ fontSize: 18 }}><strong>{orderId}</strong></p>
          <Link to="/" className="btn" style={{ textDecoration: "none", display: "inline-block" }}>
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Checkout</h2>
          <p className="muted">No hay productos en el carrito.</p>
          <Link to="/" className="btn" style={{ textDecoration: "none", display: "inline-block" }}>
            Ir al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <h2 style={{ marginTop: 0 }}>Checkout</h2>
        <p className="muted" style={{ marginTop: -6 }}>Total a pagar: <strong>${totalPrice}</strong></p>

        {error && (
          <div className="card" style={{ borderColor: "#ffb3b3" }}>
            <strong style={{ color: "crimson" }}>Error:</strong> {error}
            <p className="muted" style={{ marginBottom: 0 }}>
              Verificá que completaste el archivo <code>.env</code> y que existe la colección <code>orders</code>.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
          <label>
            Nombre y apellido
            <input
              name="name"
              value={buyer.name}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid #ddd", marginTop: 6 }}
              required
            />
          </label>

          <label>
            Teléfono
            <input
              name="phone"
              value={buyer.phone}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid #ddd", marginTop: 6 }}
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              value={buyer.email}
              onChange={handleChange}
              type="email"
              style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid #ddd", marginTop: 6 }}
              required
            />
          </label>

          <button className="btn" disabled={!canSubmit}>
            Confirmar compra
          </button>
        </form>

        <Link to="/cart" className="btn secondary" style={{ textDecoration: "none", display: "inline-block" }}>
          Volver al carrito
        </Link>
      </div>
    </div>
  );
}
