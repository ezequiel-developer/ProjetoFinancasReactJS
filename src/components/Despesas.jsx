import React, { useContext, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importa o componente Link
import { FinancasContext } from '../contexts/FinancasContext';
import { parse, v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCalendarAlt } from 'react-icons/fa'; // Importa o ícone de calendário


const Despesas = () => {

    const [data, setData] = useState('')
    const [categoria, setCategoria] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')

    const { adicionarDespesa, despesas, formatCurrency, formatDate, removerDespesa } = useContext(FinancasContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (data !== '' && categoria !== '' && descricao !== '' && valor !== '') {

            console.log('Despesas: ', data, categoria, descricao, valor)

            adicionarDespesa({
                id: uuidv4(),
                categoria,
                descricao,
                valor: parseFloat(valor)
            })
            // limpa os campos

            setData('')
            setCategoria('')
            setDescricao('')
            setValor('')
        } else {
            toast.error('Por favor, preencha todos os campos.');
        }

    }

    return (
        <div className='flex flex-col h-screen'>

            <header className='fixed top-0 left-0 w-full flex justify-around items-center shadow-black shadow-sm h-20 text-white z-50'>
                <div>
                    <Link to='/ProjetoFinancasReactJS' className='hover:text-gray-400'>
                        <FaArrowLeft size={36} />
                    </Link>
                </div>

                <div>
                    <h1 className='text-2xl font-bold uppercase'>Despesas</h1>
                </div>

                <div>
                    <button
                        type='submit' // Adicionado type='submit'
                        form='despesas-form' // Adicionado form='despesas-form' para associar o botão ao formulário
                        className='bg-red-500 text-2xl px-4 py-1 rounded-full text-black font-bold'>
                        Salvar
                    </button>
                </div>
            </header>

            <div className='mt-20'>
                <form
                    id='despesas-form' // Adicionado id='despesas-form'
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-2'>

                    <div className='relative'>
                        <input
                            type="date"
                            onChange={(e) => setData(e.target.value)}
                            value={data}
                            className='text-white w-full text-2xl p-1 pl-12 rounded-lg bg-transparent border-gray-500 border-2'
                        />
                        <FaCalendarAlt
                            className='absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500'
                            size={24}
                        />
                    </div>

                    <select
                        onChange={(e) => setCategoria(e.target.value)}
                        value={categoria}
                        className='text-black bg-white text-2xl p-1 rounded-lg bg-transparent border-gray-500 border-2'
                    >
                        <option value="" disabled>Selecione a categoria</option>
                        <option value="Material">Material</option>
                        <option value="Gasolina">Gasolina</option>
                        <option value="Imposto">Imposto</option>
                        <option value="Comissão">Comissão</option>
                    </select>

                    <input
                        type="text"
                        placeholder='Descrição'
                        onChange={(e) => setDescricao(e.target.value)}
                        value={descricao}
                        className='text-white text-2xl p-1 rounded-lg bg-transparent border-gray-500 border-2'
                    />

                    <input
                        type="number"
                        placeholder='Valor'
                        onChange={(e) => setValor(e.target.value)}
                        value={valor}
                        className='text-white text-2xl p-1 rounded-lg bg-transparent border-gray-500 border-2'
                    />
                </form>
            </div>

            <div className='mt-10 border-2 border-red-500 p-4'>
                {despesas.length > 0 ? (
                    despesas.map((despesa) => (
                        <div key={despesa.id} className='mb-8 p-2 border-b-4 border-gray-300 relative'>
                            <p className='text-xl'>Data: {formatDate(despesa.data)}</p>
                            <h3 className='text-xl '> Categoria: {despesa.categoria}</h3>
                            <p className='text-xl'>Descrição: {despesa.descricao}</p>
                            <p className='text-xl font-semibold'>Valor: <strong className='text-red-500'>{formatCurrency(despesa.valor)}</strong> </p>

                            <div>
                                <button
                                    onClick={() => removerReceita(receita.id)}
                                    className='bg-red-500 px-4 py-2 rounded-lg font-semibold absolute right-0 bottom-2'
                                >
                                    deletar
                                </button>
                            </div>

                        </div>
                    ))
                ) : (
                    <p className='text-white'>Não há despesas para exibir.</p>
                )}
            </div>




        </div>
    );
}

export default Despesas;
