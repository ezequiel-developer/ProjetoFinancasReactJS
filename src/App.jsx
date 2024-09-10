import './App.css';
import Dashboard from './components/Dashboard';
import Receitas from './components/Receitas';
import Orcamentos from './components/Orcamentos';
import Relatorios from './components/Relatorios';
import Despesas from './components/Despesas';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FinancasProvider } from './contexts/FinancasContext'; // Importa o provider

function App() {
  return (
    <Router>
      <FinancasProvider> {/* Envolva o conteúdo do Router com o FinancasProvider */}
        <div className='m-4'>
          <Routes>
            <Route path='/ProjetoFinancasReactJS/' element={<Dashboard />} />
            <Route path='/receitas' element={<Receitas />} />
            <Route path='/orcamentos' element={<Orcamentos />} />
            <Route path='/relatorios' element={<Relatorios />} />
            <Route path='/despesas' element={<Despesas />} />
          </Routes>
        </div>
      </FinancasProvider>
    </Router>
  );
}

export default App;
