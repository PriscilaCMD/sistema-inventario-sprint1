import { useState } from "react";

function App() {
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState(0);
  const [minimo, setMinimo] = useState(0);
  const [maximo, setMaximo] = useState(0);
  const [productos, setProductos] = useState([]);
  const [entrada, setEntrada] = useState({});

  const agregarProducto = () => {
    if (!nombre) return;

    const nuevo = {
      id: Date.now(),
      nombre,
      stock: Number(stock),
      minimo: Number(minimo),
      maximo: Number(maximo)
    };

    setProductos([...productos, nuevo]);
    setNombre("");
    setStock(0);
    setMinimo(0);
    setMaximo(0);
  };

  const agregarEntrada = (id) => {
    const cantidad = Number(entrada[id] || 0);

    const actualizados = productos.map((p) => {
      if (p.id === id) {
        return { ...p, stock: p.stock + cantidad };
      }
      return p;
    });

    setProductos(actualizados);
    setEntrada({ ...entrada, [id]: 0 });
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Sistema de Inventario</h1>

      <h2>Registrar Producto</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Nombre del producto:</label><br />
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Stock inicial:</label><br />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Stock mínimo:</label><br />
        <input
          type="number"
          value={minimo}
          onChange={(e) => setMinimo(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Stock máximo:</label><br />
        <input
          type="number"
          value={maximo}
          onChange={(e) => setMaximo(e.target.value)}
        />
      </div>

      <button onClick={agregarProducto} style={{ padding: "8px 15px" }}>
        Agregar Producto
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h2>Lista de Productos</h2>

      {productos.length === 0 && <p>No hay productos registrados.</p>}

      {productos.map((p) => (
        <div key={p.id} style={{ marginBottom: "15px" }}>
          <strong>{p.nombre}</strong><br />
          Stock: {p.stock} | Mín: {p.minimo} | Máx: {p.maximo}

          <div style={{ marginTop: "5px" }}>
            <input
              type="number"
              placeholder="Cantidad a agregar"
              value={entrada[p.id] || ""}
              onChange={(e) =>
                setEntrada({ ...entrada, [p.id]: e.target.value })
              }
            />
            <button
              onClick={() => agregarEntrada(p.id)}
              style={{ marginLeft: "5px" }}
            >
              Registrar Entrada
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
