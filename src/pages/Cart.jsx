import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, total, clearCart } = useContext(CartContext);

  if (cart.length === 0) return <p>Carrito vacío</p>;

  return (
    <div>
      {cart.map((i, idx) => (
        <p key={idx}>{i.title} x {i.qty}</p>
      ))}
      <h3>Total: ${total}</h3>
      <button onClick={clearCart}>Vaciar</button>
      <Link to="/checkout">Finalizar compra</Link>
    </div>
  );
}
