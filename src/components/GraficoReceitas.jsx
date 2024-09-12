import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FinancasContext } from '../contexts/FinancasContext';

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoReceitas = () => {
  const { receitas } = useContext(FinancasContext);

  // Agrupar receitas por categorias
  const categorias = {};
  receitas.forEach(receita => {
    if (!categorias[receita.servico]) {
      categorias[receita.servico] = 0;
    }
    categorias[receita.servico] += receita.valor;
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
        label: 'Receitas por Categoria',
        data: data,
        backgroundColor: labels.map(() => gerarCorAleatoria()), // Cores diferentes para cada barra
        borderColor: labels.map(() => gerarCorAleatoria()), // Cores diferentes para as bordas das barras
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='bg-[#D1D5DB] shadow-black shadow-lg border-4 p-4 rounded-xl  w-full'>
      <h2 className='text-center text-black uppercase text-2xl font-bold mb-4'>Receitas</h2>
      <div className='w-full h-72  md:h-80 lg:h-48 xl:h-32'> {/* Ajuste a altura conforme necessário */}
        <Bar
          data={dadosGrafico}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Permite que o gráfico se ajuste ao contêiner
            plugins: {
              legend: {
                display: true, // Exibe a legenda
                position: 'top',
                labels: {
                  font: {
                    size: 18, // Ajuste o tamanho da fonte da legenda aqui
                    color: 'white', // Cor da fonte da legenda
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
                  bottom: 40, // Margem inferior da legenda
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.raw.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
                  },
                },
                bodyFont: {
                  size: 18, // Ajuste o tamanho da fonte do corpo do tooltip aqui
                  color: 'white', // Cor da fonte do corpo do tooltip
                },
                titleFont: {
                  size: 18, // Ajuste o tamanho da fonte do título do tooltip aqui
                  color: 'white', // Cor da fonte do título do tooltip
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  display: false, // Oculta as labels do eixo X
                  font: {
                    size: 18, // Ajuste o tamanho da fonte do eixo X aqui
                    color: 'white', // Cor da fonte do eixo X
                  },
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 20, // Ajuste o tamanho da fonte do eixo Y aqui
                    color: 'white', // Cor da fonte do eixo Y
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

export default GraficoReceitas;
