import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify'; // Importa o ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa o CSS necessário
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-right" // posição da notificação
      autoClose={5000} // tempo em milissegundos para auto fechamento
      hideProgressBar={false} // mostrar ou esconder a barra de progresso
      newestOnTop={false} // se as notificações mais recentes ficam no topo
      closeOnClick
      rtl={false} // se as notificações são exibidas da direita para a esquerda
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" // tema claro ou escuro
    />  </StrictMode>,
);
