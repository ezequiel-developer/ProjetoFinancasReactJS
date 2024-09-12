import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FinancasContext } from '../contexts/FinancasContext';

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoDespesas = () => {
  const { despesas } = useContext(FinancasContext);

  // Agrupar despesas por categorias
  const categorias = {};
  despesas.forEach(despesa => {
    if (!categorias[despesa.categoria]) {
      categorias[despesa.categoria] = 0;
    }
    categorias[despesa.categoria] += despesa.valor;
  });

  // Ordenar categorias por valor de forma crescente
  const categoriasOrdenadas = Object.entries(categorias).sort((a, b) => a[1] - b[1]);

  // Separar labels e dados após a ordenação
  const labels = categoriasOrdenadas.map(item => item[0]);
  const data = categoriasOrdenadas.map(item => item[1]);

  // Gerar cores aleatórias para cada categoria
  const gerarCorAleatoria = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };

  // Preparar dados para o gráfico
  const dadosGrafico = {
    labels: labels,
    datasets: [
      {
        label: 'Despesas por Categoria',
        data: data,
        backgroundColor: labels.map(() => gerarCorAleatoria()), // Cores diferentes para cada barra
        borderColor: labels.map(() => gerarCorAleatoria()), // Cores diferentes para as bordas das barras
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='bg-[#D1D5DB] shadow-black shadow-lg border-4 p-4 rounded-xl w-full' style={{ marginTop: '20px' }}>
      <h2 className='text-center text-black uppercase text-2xl font-bold mb-4'>Despesas</h2>
      <div className='w-full h-72 md:h-80 lg:h-48 xl:h-32'>
        <Bar
          data={dadosGrafico}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  font: {
                    size: 14, // Reduzido para criar mais espaço
                    color: 'white',
                  },
                  generateLabels: (chart) => {
                    const { datasets } = chart.data;
                    return datasets[0].backgroundColor.map((color, index) => {
                      return {
                        text: chart.data.labels[index],
                        fillStyle: color,
                        strokeStyle: color,
                        lineWidth: 2,
                      };
                    });
                  },
                },
                padding: {
                  top: 30, // Ajuste para aumentar a margem superior da legenda
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.raw.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
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
                  display: false,
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
    </div>
  );
};

export default GraficoDespesas;
