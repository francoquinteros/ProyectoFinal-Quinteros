import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../components/ItemList/ItemList";
import Loader from "../components/Loader/Loader";
import { getProducts } from "../firebase/firestore";

export default function ItemListContainer() {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setError(null);
    setLoading(true);

    getProducts(categoryId)
      .then((data) => {
        if (!mounted) return;
        setItems(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setItems([]);
        setError(err?.message || "Error al traer productos.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [categoryId]);

  if (loading) return <Loader text="Cargando productos..." />;

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Catálogo</h2>
          <p className="muted">No hay productos para mostrar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ display: "grid", gap: 14 }}>
      <h2 style={{ margin: 0 }}>
        {categoryId ? `Categoría: ${categoryId}` : "Catálogo"}
      </h2>
      <ItemList items={items} />
    </div>
  );
}
