import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
  const [stats, setStats] = useState({ prendas: 0, clientes: 0, ventas: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/prendas').catch(() => ({ data: [] })),
      api.get('/clientes').catch(() => ({ data: [] })),
      api.get('/ventas').catch(() => ({ data: [] })),
    ]).then(([prendasRes, clientesRes, ventasRes]) => {
      setStats({
        prendas: prendasRes.data?.length || 0,
        clientes: clientesRes.data?.length || 0,
        ventas: ventasRes.data?.length || 0,
      });
    });
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-badge">✦ Colección nueva · Temporada 2026</div>
      <h1 className="hero-title">
        Viste tu<br /><span>estilo.</span>
      </h1>
      <p className="hero-subtitle">
        Administra tu catálogo de prendas, clientes y ventas
        desde una tienda moderna y elegante.
      </p>

      <div className="hero-stats">
        <div className="stat-box">
          <div className="stat-value">{stats.prendas}</div>
          <div className="stat-label">Prendas</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{stats.clientes}</div>
          <div className="stat-label">Clientes</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{stats.ventas}</div>
          <div className="stat-label">Ventas</div>
        </div>
      </div>

      <div className="hero-actions">
        <Link to="/prendas" className="btn-boutique btn-primary-boutique btn-fashion">
          Ver colección
        </Link>
        <Link to="/clientes" className="btn-boutique btn-outline-boutique">
          Clientes
        </Link>
        <Link to="/ventas" className="btn-boutique btn-outline-boutique">
          Ventas
        </Link>
      </div>
    </section>
  );
}

export default Home;
