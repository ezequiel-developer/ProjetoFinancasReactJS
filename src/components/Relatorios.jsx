import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import GraficoReceitas from './GraficoReceitas';
import GraficoDespesas from './GraficoDespesas';
import GraficoOrcamentos from './GraficoOrcamentos';

const Relatorios = () => {
    return (
        <div className='flex flex-col h-screen'>
            <header className='bg-[#181818] fixed top-0 left-0 w-full flex justify-between items-center shadow-black shadow-sm h-20 text-white z-50 px-4'>
                <div>
                    <Link to='/ProjetoFinancasReactJS' className='hover:text-gray-400'>
                        <FaArrowLeft size={36} />
                    </Link>
                </div>
                <div>
                    <h2 className='text-2xl font-bold uppercase'>Relatórios</h2>
                </div>
            </header>

            <main
                className="flex-grow flex flex-col items-center justify-center p-4 pt-24 md:pt-20" // Padding-top ajustado
               md:style={{ height: 'calc(100vh - 80px)' }} // Altura do main ajustada para descontar a altura do header
            >
                <div className='flex flex-col md:flex-row gap-3 w-full max-w-6xl mx-auto items-center justify-center'>
                    {/* Receitas */}
                    <div className='w-full md:w-1/2'>
                        <GraficoReceitas />
                    </div>
                    {/* Despesas */}
                    <div className='w-full md:w-1/2'>
                        <GraficoDespesas />
                    </div>
                </div>
                <div className='w-full max-w-6xl mx-auto mt-4'>
                    <GraficoOrcamentos />
                </div>
            </main>
        </div>
    );
}

export default Relatorios;
