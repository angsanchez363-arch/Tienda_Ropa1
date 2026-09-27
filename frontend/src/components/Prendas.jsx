import { useEffect, useState } from 'react';
import api from '../services/api';

const CLOTHING_ICONS = ['👗', '👚', '👖', '🧥', '👕', '🩳', '🧶', '👜', '👟', '🧢'];

function Prendas() {
  const [prendas, setPrendas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ nombre: '', cantidad: '', precio: '' });
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const cargar = () => {
    setCargando(true);
    api.get('/prendas')
      .then(res => {
        setPrendas(res.data);
        setCargando(false);
        setError(null);
      })
      .catch(() => {
        setError('No se pudo cargar la colección. ¿Está el backend corriendo?');
        setCargando(false);
      });
  };

  useEffect(() => { cargar(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = editando
      ? api.put(`/prendas/${editando}`, form)
      : api.post('/prendas', form);

    request.then(() => {
      setEditando(null);
      setForm({ nombre: '', cantidad: '', precio: '' });
      setMostrarForm(false);
      cargar();
    });
  };

  const handleEditar = (prenda) => {
    setEditando(prenda.id_prenda);
    setForm({ nombre: prenda.nombre, cantidad: prenda.cantidad, precio: prenda.precio });
    setMostrarForm(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar esta prenda de la colección?')) {
      api.delete(`/prendas/${id}`).then(() => cargar());
    }
  };

  const cancelar = () => {
    setEditando(null);
    setForm({ nombre: '', cantidad: '', precio: '' });
    setMostrarForm(false);
  };

  if (cargando) return <div className="state-msg loading">Cargando colección</div>;
  if (error) return <div className="state-msg error">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <span className="eyebrow">CATÁLOGO</span>
          <h2><span className="icon">✦</span> Colección</h2>
        </div>
        <button
          className="btn-boutique btn-primary-boutique btn-sm-boutique"
          onClick={() => { setMostrarForm(!mostrarForm); if (editando) cancelar(); }}
        >
          {mostrarForm && !editando ? 'Cerrar' : '+ Nueva prenda'}
        </button>
      </div>

      {mostrarForm && (
        <div className="form-panel">
          <h5>{editando ? 'Editar prenda' : 'Nueva prenda'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre de la prenda</label>
                <input type="text" name="nombre" className="form-control-boutique"
                  placeholder="Ej: Vestido satinado negro" value={form.nombre}
                  onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Unidades disponibles</label>
                <input type="number" name="cantidad" className="form-control-boutique"
                  placeholder="0" value={form.cantidad} onChange={handleChange}
                  required min="0" />
              </div>
              <div className="form-group">
                <label>Precio (COP)</label>
                <input type="number" name="precio" className="form-control-boutique"
                  placeholder="0" value={form.precio} onChange={handleChange}
                  required min="0" step="1000" />
              </div>
              <div className="form-group form-actions">
                <button type="submit" className="btn-boutique btn-primary-boutique btn-sm-boutique">
                  {editando ? 'Guardar cambios' : 'Añadir prenda'}
                </button>
                {editando && (
                  <button type="button" className="btn-boutique btn-outline-boutique btn-sm-boutique" onClick={cancelar}>
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

      {prendas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👗</div>
          <p>No hay prendas en la colección. ¡Añade la primera!</p>
        </div>
      ) : (
        <div className="prendas-grid">
          {prendas.map((prenda, i) => (
            <div className="prenda-card" key={prenda.id_prenda}>
              <div className="prenda-card-header">
                <span>{CLOTHING_ICONS[i % CLOTHING_ICONS.length]}</span>
                <small>ATELIER 27</small>
              </div>
              <div className="prenda-card-body">
                <div className="prenda-card-title">{prenda.nombre}</div>
                <div className="prenda-card-meta">
                  <span className="prenda-price">${Number(prenda.precio).toLocaleString('es-CO')}</span>
                  <span className={`prenda-stock ${prenda.cantidad < 10 ? 'low' : ''}`}>
                    {prenda.cantidad} disponibles
                  </span>
                </div>
                <div className="prenda-card-actions">
                  <button className="btn-boutique btn-edit-boutique" onClick={() => handleEditar(prenda)}>Editar</button>
                  <button className="btn-boutique btn-danger-boutique" onClick={() => handleEliminar(prenda.id_prenda)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Prendas;
