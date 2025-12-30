export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="container">
      <div className="card">
        <p>{text}</p>
      </div>
    </div>
  );
}
