import React, { useContext, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importa o componente Link
import { FinancasContext } from '../contexts/FinancasContext';
import { v4 as uuidv4 } from 'uuid';


const Receitas = () => {

    const [data, setData] = useState('');
    const [produto, setProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const { adicionarReceita, receitas, formatCurrency, formatDate, removerReceita } = useContext(FinancasContext);

    const handleSubmit = (e) => {
        e.preventDefault(); // impede comportamento padrão
        console.log('Dados:', data, produto, descricao, valor);
        adicionarReceita({
            id: uuidv4(),
            data,
            produto,
            descricao,
            valor: parseFloat(valor)
        })

        // Limpar os campos depois de enviar
        setData('')
        setProduto('')
        setDescricao('')
        setValor('')
    }


    return (
        <div className='flex flex-col h-screen'>
            <header className='fixed top-0 left-0 w-full flex justify-around items-center shadow-black shadow-sm h-20 text-white bg-[#181818] z-50'>
                <div>
                    <Link to='/' className='hover:text-gray-400'>
                        <FaArrowLeft size={36} />
                    </Link>
                </div>

                <div>
                    <h2 className='text-2xl font-bold uppercase'>Receitas</h2>
                </div>

                <div>
                    <button
                        type='submit' // Adicionado type='submit'
                        form='receitas-form' // Adicionado form='receitas-form' para associar o botão ao formulário
                        className='bg-green-500 text-2xl px-4 py-1 rounded-full text-black font-bold'>
                        Salvar
                    </button>
                </div>
            </header>

            <div className='mt-20'>
                <form
                    id='receitas-form' // Adicionado id='receitas-form'
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-2'>

                    <input
                        type="date"
                        onChange={(e) => setData(e.target.value)}
                        value={data}
                        className='text-white text-2xl p-1 rounded-lg bg-transparent border-gray-500 border-2'
                    />

                    <select
                        onChange={(e) => setProduto(e.target.value)}
                        value={produto}
                        className='text-black bg-white text-2xl p-1 rounded-lg bg-transparent border-gray-500 border-2'
                    >
                        <option value="" disabled>Selecione o produto</option>
                        <option value="Capota">Capota</option>
                        <option value="Estofado">Estofado</option>
                        <option value="Fechamento">Fechamento</option>
                        <option value="Reparo">Reparo</option>
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

            <div className='mt-10 border-2 border-green-500 p-4'>
                {receitas.length > 0 ? (
                    receitas.map((receita) => (
                        <div key={receita.id} className='mb-4 p-2 border-b border-gray-300'>
                            <p className='text-xl'>Data: {formatDate(receita.data)}</p>
                            <h3 className='text-xl '> Produto: {receita.produto}</h3>
                            <p className='text-xl'>Descrição: {receita.descricao}</p>
                            <p className='text-xl font-semibold'>Valor: <strong className='text-green-500'>{formatCurrency(receita.valor)}</strong> </p>

                            <div>
                                <button
                                onClick={()=> removerReceita(receita.id)}
                                >
deletar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-white'>Não há receitas para exibir.</p>
                )}
            </div>

        </div>
    );
}

export default Receitas;
