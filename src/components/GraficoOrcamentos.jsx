import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FinancasContext } from '../contexts/FinancasContext';

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoOrcamentos = () => {
  const { orcamentos } = useContext(FinancasContext);

  // Calcular os totais para cada status
  const totalNegados = orcamentos.filter(orcamento => orcamento.status === 'Negado').length;
  const totalAprovados = orcamentos.filter(orcamento => orcamento.status === 'Aprovado').length;
  const totalRecebidos = orcamentos.filter(orcamento => orcamento.status === 'Recebido').length;

  // Total de orçamentos
  const totalOrcamentos = orcamentos.length;

  // Calcular porcentagens
  const calcularPorcentagem = (valor) => (totalOrcamentos === 0 ? 0 : (valor / totalOrcamentos) * 100);

  // Dados para o gráfico
  const dadosGrafico = {
    labels: ['Negados', 'Aprovados', 'Recebidos'],
    datasets: [
      {
        label: `Total de Orçamentos: ${totalOrcamentos}`,
        data: [totalNegados, totalAprovados, totalRecebidos],
        backgroundColor: [
            'rgba(139, 0, 0, 0.7)',  // Vermelho escuro para Negados
            'rgba(0, 0, 139, 0.7)',  // Azul escuro para Aprovados
            'rgba(0, 100, 0, 0.7)',  // Verde escuro para Recebidos
          ],    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>

<h2 className='text-center text-black text-xl font-semibold'>
        Total de Orçamentos: {totalOrcamentos}
      </h2>
      <Bar
      
        data={dadosGrafico}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                font: {
                  size: 18,
                  color: 'white',
                },
                generateLabels: (chart) => {
                  const { datasets, labels } = chart.data;
                  const dataset = datasets[0];
                  
                  // Criação das labels individuais
                  const labelsIndividuais = dataset.backgroundColor.map((color, index) => {
                    return {
                      text: `${labels[index]} (${calcularPorcentagem(dataset.data[index]).toFixed(2)}%)`,
                      fillStyle: color,
                      strokeStyle: color,
                      lineWidth: 2,
                    };
                  });

                  // Adicionar o total de orçamentos como uma entrada extra
                  return [...labelsIndividuais, {
                    text: `Total de Orçamentos: ${totalOrcamentos}`,
                    fillStyle: 'transparent',
                    strokeStyle: 'transparent',
                    lineWidth: 0,
                  }];
                },
              },
              padding: {
                bottom: 20,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.raw} orçamentos (${calcularPorcentagem(context.raw).toFixed(2)}%)`;
                },
              },
              bodyFont: {
                size: 18,
                color: 'white',
              },
              titleFont: {
                size: 18,
                color: 'white',
              },
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 18,
                  color: 'white',
                },
              },
            },
            y: {
              ticks: {
                font: {
                  size: 20,
                  color: 'white',
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default GraficoOrcamentos;
