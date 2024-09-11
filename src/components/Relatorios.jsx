import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importa o componente Link
import GraficoReceitas from './GraficoReceitas';
import GraficoDespesas from './GraficoDespesas';
import GraficoOrcamentos from './GraficoOrcamentos';

const Relatorios = () => {
    return (
        <div className='flex flex-col h-screen p-4'>
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

            <div className='flex flex-col md:flex-row gap-4 mt-20 pt-4 pb-4'>
                <div className='bg-green-200 flex-1 p-4 rounded-xl'>
                    <h2 className='text-center text-black uppercase text-2xl font-bold mb-4'>Receitas</h2>
                    <GraficoReceitas className='text-white' />
                </div>

                <div className='bg-red-200 p-4 flex-1 rounded-xl'>
                    <h2 className='text-center text-black uppercase text-2xl font-bold mb-4'>Despesas</h2>
                    <GraficoDespesas className='text-white' />
                </div>

                <div className='bg-blue-200 p-4 flex-1 rounded-xl'>
                    <h2 className='text-center text-black uppercase text-2xl font-bold mb-4'>Orçamentos</h2>
                    <GraficoOrcamentos />
                </div>
            </div>
        </div>
    );
}

export default Relatorios;
