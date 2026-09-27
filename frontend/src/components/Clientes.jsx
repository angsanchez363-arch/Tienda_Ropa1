import { useEffect, useState } from 'react';
import api from '../services/api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ nombre: '', contacto: '', departamento: '', ciudad: '' });
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const cargar = () => {
    setCargando(true);
    api.get('/clientes')
      .then(res => {
        setClientes(res.data);
        setCargando(false);
        setError(null);
      })
      .catch(() => {
        setError('No se pudo cargar la lista de clientes. ¿Está el backend corriendo?');
        setCargando(false);
      });
  };

  useEffect(() => { cargar(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      api.put(`/clientes/${editando}`, form).then(() => {
        setEditando(null);
        setForm({ nombre: '', contacto: '', departamento: '', ciudad: '' });
        setMostrarForm(false);
        cargar();
      });
    } else {
      api.post('/clientes', form).then(() => {
        setForm({ nombre: '', contacto: '', departamento: '', ciudad: '' });
        setMostrarForm(false);
        cargar();
      });
    }
  };

  const handleEditar = (j) => {
    setEditando(j.id_cliente);
    setForm({
      nombre: j.nombre,
      contacto: j.contacto || '',
      departamento: j.departamento || '',
      ciudad: j.ciudad || '',
    });
    setMostrarForm(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar este cliente?')) {
      api.delete(`/clientes/${id}`).then(() => cargar());
    }
  };

  const cancelar = () => {
    setEditando(null);
    setForm({ nombre: '', contacto: '', departamento: '', ciudad: '' });
    setMostrarForm(false);
  };

  if (cargando) return <div className="state-msg loading">Cargando clientes</div>;
  if (error) return <div className="state-msg error">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><span className="icon">♡</span> Clientes</h2>
        <button
          className="btn-boutique btn-primary-boutique btn-sm-boutique"
          onClick={() => { setMostrarForm(!mostrarForm); if (editando) cancelar(); }}
        >
          {mostrarForm && !editando ? '✕ Cerrar' : '+ Añadir cliente'}
        </button>
      </div>

      {mostrarForm && (
        <div className="form-panel">
          <h5>{editando ? '✏️ Modificar cliente' : '➕ Nuevo cliente'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control-boutique"
                  placeholder="Nombre completo"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contacto</label>
                <input
                  type="text"
                  name="contacto"
                  className="form-control-boutique"
                  placeholder="Teléfono / email"
                  value={form.contacto}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Departamento</label>
                <input
                  type="text"
                  name="departamento"
                  className="form-control-boutique"
                  placeholder="Ej: Antioquia"
                  value={form.departamento}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  className="form-control-boutique"
                  placeholder="Ej: Medellín"
                  value={form.ciudad}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                <button type="submit" className="btn-boutique btn-primary-boutique btn-sm-boutique" style={{ flex: 1 }}>
                  {editando ? 'Guardar' : 'Añadir'}
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

      {clientes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <p>No hay clientes registrados. ¡Añade el primero!</p>
        </div>
      ) : (
        <div className="table-panel">
          <table className="boutique-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Departamento</th>
                <th>Ciudad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id_cliente}>
                  <td><span className="badge-id">#{cliente.id_cliente}</span></td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.contacto || '—'}</td>
                  <td>{cliente.departamento || '—'}</td>
                  <td>{cliente.ciudad || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button className="btn-boutique btn-edit-boutique" onClick={() => handleEditar(cliente)}>
                        Editar
                      </button>
                      <button className="btn-boutique btn-danger-boutique" onClick={() => handleEliminar(cliente.id_cliente)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Clientes;
