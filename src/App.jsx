import './App.css';
import Dashboard from './components/Dashboard';
import Receitas from './components/Receitas';
import Orcamentos from './components/Orcamentos';
import Relatorios from './components/Relatorios';
import Despesas from './components/Despesas';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FinancasProvider } from './contexts/FinancasContext'; 

function App() {
  return (
    <Router>
      <FinancasProvider> 
          <Routes>
            <Route path='/ProjetoFinancasReactJS/' element={<Dashboard />} />
            <Route path='/ProjetoFinancasReactJS/receitas' element={<Receitas />} />
            <Route path='/ProjetoFinancasReactJS/orcamentos' element={<Orcamentos />} />
            <Route path='/ProjetoFinancasReactJS/relatorios' element={<Relatorios />} />
            <Route path='/ProjetoFinancasReactJS/despesas' element={<Despesas />} />
          </Routes>
      </FinancasProvider>
    </Router>
  );
}

export default App;
