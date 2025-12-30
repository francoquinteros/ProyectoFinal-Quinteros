import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  fontWeight: isActive ? 700 : 500,
  opacity: isActive ? 1 : 0.85,
});

export default function NavBar() {
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
      <div className="container row" style={{ justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <strong>TechShop</strong>
        </Link>

        <nav className="row">
          <NavLink to="/" style={linkStyle}>Catálogo</NavLink>
          <NavLink to="/category/teclados" style={linkStyle}>Teclados</NavLink>
          <NavLink to="/category/mouses" style={linkStyle}>Mouses</NavLink>
          <NavLink to="/category/auriculares" style={linkStyle}>Auriculares</NavLink>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <CartWidget />
          </Link>
        </nav>
      </div>
    </header>
  );
}
