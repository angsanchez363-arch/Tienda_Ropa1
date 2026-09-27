import { useEffect, useState } from 'react';
import api from '../services/api';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/ventas')
      .then(response => {
        setVentas(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo cargar la lista de ventas. ¿Está el backend corriendo?');
        setCargando(false);
        console.error(err);
      });
  }, []);

  if (cargando) return <div className="state-msg loading">Cargando historial de ventas</div>;
  if (error) return <div className="state-msg error">{error}</div>;

  const totalGeneral = ventas.reduce((acc, v) => acc + Number(v.total || 0), 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><span className="icon">♡</span> Historial de ventas</h2>
        {ventas.length > 0 && (
          <div className="stat-box" style={{ padding: '0.6rem 1.2rem', minWidth: 'auto' }}>
            <div className="stat-value" style={{ fontSize: '1.2rem' }}>
              ${totalGeneral.toLocaleString('es-CO')}
            </div>
            <div className="stat-label">Total vendido</div>
          </div>
        )}
      </div>

      {ventas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💰</div>
          <p>Aún no hay ventas registradas.</p>
        </div>
      ) : (
        <div className="table-panel">
          <table className="boutique-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Departamento</th>
                <th>Ciudad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(v => (
                <tr key={v.id_venta}>
                  <td><span className="badge-id">#{v.id_venta}</span></td>
                  <td>
                    {v.fecha_venta
                      ? new Date(v.fecha_venta).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td>{v.nombre_cliente}</td>
                  <td>{v.contacto || '—'}</td>
                  <td>{v.departamento || '—'}</td>
                  <td>{v.ciudad || '—'}</td>
                  <td className="price-cell">
                    ${Number(v.total).toLocaleString('es-CO')}
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

export default Ventas;
