import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);

  const finish = () => {
    setOrderId("ORDEN123");
    clearCart();
  };

  if (orderId) return <h2>Orden generada: {orderId}</h2>;

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ${total}</p>
      <button onClick={finish}>Confirmar compra</button>
    </div>
  );
}
