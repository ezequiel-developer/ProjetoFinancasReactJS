import React, { useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FinancasContext } from '../contexts/FinancasContext';

Chart.register(...registerables);

const GraficoReceitasDespesas = () => {
  const { receitas, despesas } = useContext(FinancasContext);

  const data = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {

        label: '', // Adicionar um label vazio para remover o undefined

        data: [
          receitas.reduce((acc, receita) => acc + receita.valor, 0),
          despesas.reduce((acc, despesa) => acc + despesa.valor, 0),
        ],
        backgroundColor: ['#22C55E', '#EF4444'],
        borderColor: ['darkgreen', 'darkred'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: false, // Desativa a legenda, removendo o quadradinho
      },
      tooltip: {
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 18,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size:20,
          },
        },
      },
    },
  };
  

  return (
    <div style={{ height: '100%' }}>
      <Bar data={data} options={options} style={{ height: '100%' }} />
    </div>
  );
};

export default GraficoReceitasDespesas;
