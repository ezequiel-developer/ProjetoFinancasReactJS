import React, { useContext } from 'react';
import { FaDollarSign, FaChartBar, FaArrowDown, FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FinancasContext } from '../contexts/FinancasContext';
import GraficoReceitasDespesas from './GraficoReceitasDespesas';

const Dashboard = () => {
    const { totalReceitas, totalDespesas, saldoAtual, formatCurrency } = useContext(FinancasContext);

    return (
        <div className='flex flex-col '>
            <div className='flex flex-col  '>
                <h1 className='text-white text-2xl uppercase font-bold text-center mb-4'>Dashboard</h1>

                <div className='bg-[#343434] w-full p-4 text-center text-xl rounded-xl'>
                    <h2 className='font-semibold'>Saldo Atual</h2>
                    <p className={`${saldoAtual > 0 ? 'text-green-500' : saldoAtual < 0 ? 'text-red-500' : 'text-white'} text-2xl font-bold`}>
                        {formatCurrency(saldoAtual)}
                    </p>
                </div>

                <div className='flex mt-4 justify-between gap-4 text-center'>
                    <div className='bg-[#343434] flex-1 p-4 rounded-xl'>
                        <h2 className='text-xl font-semibold'>Receitas</h2>
                        <p className='text-green-500 text-2xl font-bold'>{formatCurrency(totalReceitas)}</p>
                    </div>

                    <div className='bg-[#343434] flex-1 p-4 rounded-xl'>
                        <h2 className='text-xl font-semibold'>Despesas</h2>
                        <p className='text-red-500 text-2xl font-bold'>{formatCurrency(totalDespesas)}</p>
                    </div>
                </div>

                <div className='bg-[#343434] h-[300px] p-3 mt-4 rounded-xl'>
                    <GraficoReceitasDespesas className='h-full' />
                </div>
            </div>

            <div className='fixed bottom-0 left-0 w-full '>
                <div className='flex justify-around'>
                    <div className='text-center flex flex-col items-center'>
                        <Link to='/receitas'>
                            <FaDollarSign className='text-4xl text-black mb-2 bg-green-500 rounded-full p-2' />
                        </Link>
                        <p className='text-white text-lg'>Receitas</p>
                    </div>

                    <div className='text-center flex flex-col items-center'>
                        <Link to='/orcamentos'>
                            <FaFile className='text-4xl text-blue-500 mb-2' />
                        </Link>
                        <p className='text-white text-lg'>Orçamentos</p>
                    </div>

                    <div className='text-center flex flex-col items-center'>
                        <Link to='/relatorios'>
                            <FaChartBar className='text-4xl text-blue-500 mb-2' />
                        </Link>
                        <p className='text-white text-lg'>Relatórios</p>
                    </div>

                    <div className='text-center flex flex-col items-center'>
                        <Link to='/despesas'>
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
