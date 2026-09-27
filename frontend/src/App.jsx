import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Clientes from './components/Clientes';
import Prendas from './components/Prendas';
import Ventas from './components/Ventas';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/prendas" element={<Prendas />} />
        <Route path="/ventas" element={<Ventas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
