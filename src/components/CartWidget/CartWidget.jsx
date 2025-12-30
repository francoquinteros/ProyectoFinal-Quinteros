import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartWidget() {
  const { totalUnits } = useContext(CartContext);

  return (
    <div className="row" style={{ gap: 8 }}>
      <span aria-label="carrito" title="Carrito">🛒</span>
      <span className="badge">{totalUnits}</span>
    </div>
  );
}
