import React, { useContext } from 'react'; 
import { FaDollarSign, FaChartBar, FaArrowDown, FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FinancasContext } from '../contexts/FinancasContext';
import GraficoReceitasDespesas from './GraficoReceitasDespesas';

const Dashboard = () => {
    const { totalReceitas, totalDespesas, saldoAtual, formatCurrency } = useContext(FinancasContext);

    return (
        <div className='flex flex-col h-screen overflow-hidden'>
            <div className='flex flex-col flex-1 py-[11px] px-4 box-border'>
                <div className='bg-[#343434] p-2 text-center text-xl rounded-xl mb-4 shadow-black shadow-sm'>
                    <h2 className='font-semibold'>Saldo Atual</h2>
                    <p className={`${saldoAtual > 0 ? 'text-green-500' : saldoAtual < 0 ? 'text-red-500' : 'text-white'} text-2xl font-bold`}>
                        {formatCurrency(saldoAtual)}
                    </p>
                </div>

                <div className='flex gap-4 mb-4 text-center'>
                    <div className='bg-[#343434] flex-1 p-2 rounded-xl shadow-black shadow-sm'>
                        <h2 className='text-xl font-semibold'>Receitas</h2>
                        <p className='text-green-500 text-2xl font-bold'>{formatCurrency(totalReceitas)}</p>
                    </div>

                    <div className='bg-[#343434] flex-1 p-2 rounded-xl shadow-black shadow-sm'>
                        <h2 className='text-xl font-semibold'>Despesas</h2>
                        <p className='text-red-500 text-2xl font-bold'>{formatCurrency(totalDespesas)}</p>
                    </div>
                </div>

                <div className='flex-1 bg-[#343434] p-4 rounded-xl overflow-auto shadow-black shadow-sm'>
                    <GraficoReceitasDespesas />
                </div>
            </div>

            <div className=' py-2'>
                <div className='flex justify-around items-center'>
                    <div className='text-center flex flex-col items-center'>
                        <Link to='/ProjetoFinancasReactJS/receitas'>
                            <FaDollarSign className='text-4xl  shadow-lg mb-2 bg-green-500 rounded-full p-2' />
                        </Link>
                        <p className='text-white text-lg'>Receitas</p>
                    </div>

                    <div className='text-center flex flex-col items-center'>
                        <Link to='/ProjetoFinancasReactJS/orcamentos'>
                            <FaFile className='text-4xl text-blue-500 mb-2' />
                        </Link>
                        <p className='text-white text-lg'>Orçamentos</p>
                    </div>

                    <div className='text-center flex flex-col items-center'>
                        <Link to='/ProjetoFinancasReactJS/relatorios'>
                            <FaChartBar className='text-4xl text-blue-500 mb-2' />
                        </Link>
                        <p className='text-white text-lg'>Relatórios</p>
                    </div>

                    <div className='text-center flex flex-col items-center'>
                        <Link to='/ProjetoFinancasReactJS/despesas'>
                            <FaArrowDown className='text-4xl text-red-500 mb-2' />
                        </Link>
                        <p className='text-white text-lg'>Despesas</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
