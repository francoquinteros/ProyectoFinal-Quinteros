import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Inicio</Link> | <Link to="/cart">Carrito</Link>
    </nav>
  );
}
