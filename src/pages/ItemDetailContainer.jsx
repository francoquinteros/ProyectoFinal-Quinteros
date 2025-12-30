import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import ItemDetail from "../components/ItemDetail/ItemDetail";
import { getProductById } from "../firebase/firestore";

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setError(null);
    setLoading(true);

    getProductById(itemId)
      .then((data) => {
        if (!mounted) return;
        setItem(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setItem(null);
        setError(err?.message || "Error al traer el producto.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [itemId]);

  if (loading) return <Loader text="Cargando detalle..." />;

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

  if (!item) {
    return (
      <div className="container">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Producto no encontrado</h2>
          <p className="muted">Revisá que el ID exista en Firestore.</p>
        </div>
      </div>
    );
  }

  return <ItemDetail item={item} />;
}
