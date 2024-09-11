import React, { useContext, useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaDollarSign, FaTimes } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { FinancasContext } from '../contexts/FinancasContext';
import { v4 as uuidv4 } from 'uuid';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrcamentoPDF from './OrcamentoPDF';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Orcamentos = () => {
    const [data, setData] = useState('');
    const [cliente, setCliente] = useState('');
    const [telefone, setTelefone] = useState('');
    const [produto, setProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [preenchido, setPreenchido] = useState(false);
    const [itens, setItens] = useState([]);


    const { adicionarOrcamento, orcamentos, formatDate, formatCurrency, mudarStatusOrcamento, getStatusClass, removerOrcamento } = useContext(FinancasContext);

    const adicionarItem = () => {

        if (produto !== '' && descricao !== '' && valor !== '') {
            setItens([...itens, {
                data,
                id: uuidv4(),
                produto,
                descricao,
                valor: parseFloat(valor),
            }]);
            setProduto('');
            setDescricao('');
            setValor('');
            setPreenchido(true);
        } else {
            toast.error('Preencha todos os campos para adicionar um item.')

        }
    };

    const totalOrcamento = itens.reduce((acc, item) => acc + item.valor, 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cliente && telefone && itens.length > 0) {
            adicionarOrcamento({
                id: uuidv4(),
                status: 'Em aberto',
                data,
                cliente,
                telefone,
                itens,
            });
            // Resetar todos os campos
            setCliente('');
            setTelefone('');
            setItens([]);
            setProduto('');
            setDescricao('');
            setValor('');
            setData('');

            setPreenchido(false);  // Reseta o estado de preenchido
        } else {
            toast.error('Preencha os dados do cliente e adicione pelo menos um item.');
        }
    };




    return (
        <div className='flex flex-col h-screen'>
            <header className='fixed top-0 left-0 w-full flex justify-around items-center bg-[#181818] shadow-black shadow-sm h-20 text-white z-50'>
                <div>
                    <Link to='/ProjetoFinancasReactJS' className='hover:text-gray-400'>
                        <FaArrowLeft size={36} />
                    </Link>
                </div>

                <div>
                    <h2 className='text-2xl font-bold uppercase'>Orçamentos</h2>
                </div>

                <div>
                    <button
                        onClick={handleSubmit}
                        type='submit'
                        form='orcamentos-form'
                        className='bg-blue-500 text-2xl px-4 py-1 rounded-full text-black font-bold'>
                        Salvar
                    </button>
                </div>
            </header>

            <div className='mt-20'>
                <form id='orcamentos-form' className='flex flex-col md:flex-row gap-6 items-center'>

                <div className='flex flex-col md:flex-row w-full gap-2'>

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

                        <input
                            type="text"
                            placeholder='Nome do Cliente'
                            onChange={(e) => setCliente(e.target.value)}
                            value={cliente}
                            className={`${preenchido ? 'bg-gray-400 cursor-not-allowed text-gray-500' : 'bg-transparent'} text-white text-2xl p-1 rounded-lg border-gray-500 border-2 w-full`}
                            disabled={preenchido}
                        />

                        <InputMask
                            mask="(99) 99999-9999"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            disabled={preenchido}
                            className={`${preenchido ? 'bg-gray-400 cursor-not-allowed text-gray-500' : 'bg-transparent'} text-white text-2xl p-1 rounded-lg border-gray-500 w-full border-2`}
                        >
                            {(inputProps) => <input {...inputProps} type="text" placeholder='Telefone' />}
                        </InputMask>

                    </div>

                    <div className='flex flex-col md:flex-row w-full gap-2'>

                        <select
                            onChange={(e) => setProduto(e.target.value)}
                            value={produto}
                            className='text-black w-full bg-white text-2xl p-1 rounded-lg border-gray-500 border-2'
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
                            className='text-black w-full text-2xl p-1 rounded-lg border-gray-500 border-2'
                        />
                        <input
                            type="number"
                            placeholder='Valor'
                            onChange={(e) => setValor(e.target.value)}
                            value={valor}
                            className='text-black w-full text-2xl p-1 rounded-lg border-gray-500 border-2'
                        />

                    </div>


                </form>


                <button
                    onClick={adicionarItem}
                    className='bg-blue-500 px-10 mt-2 w-full py-2 rounded-xl text-black font-semibold text-xl'>
                    Adicionar item
                </button>
            </div>

            <div className='mt-10'>
                {itens.length > 0 && (
                    <div className='text-xl border-2 p-4'>
                        <div>
                            <p>Data: {formatDate(data)}</p>
                            <p>Cliente: {cliente}</p>
                            <p>Telefone: {telefone}</p>
                            <p>Total: {formatCurrency(totalOrcamento)}</p>
                        </div>

                        <span className="block border-t-4 my-4 border-gray-300 w-full"></span>

                        {itens.map((item) => (
                            <div key={item.id}>
                                <p>Produto: {item.produto}</p>
                                <p>Descrição: {item.descricao}</p>
                                <p>Valor: {formatCurrency(item.valor)}</p>

                                <span className="block border-t-4 my-4 border-gray-300 w-full"></span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* EXIBIR ORÇAMENTO DEPOIS DE SALVO */}

            <div className='grid grid-cols-1 md:grid-cols-4 md:space-x-4'>
                {orcamentos.length > 0 && (
                    orcamentos.map((orcamento) => (
                        <div key={orcamento.id} className={`flex flex-col justify-between p-4 text-xl rounded shadow-xl mb-4 ${getStatusClass(orcamento.status)}`} style={{ height: '500px', overflow: 'hidden' }}>
                            <div className='flex justify-between mb-4'>
                                <button className='bg-yellow-500 px-4 py-2'>Editar</button>
                                <button 
                                className='bg-red-500 px-4 py-2'
                                onClick={()=> removerOrcamento(orcamento.id)}
                                >Remover</button>

                                <PDFDownloadLink
                                    document={<OrcamentoPDF orcamento={orcamento} formatCurrency={formatCurrency} formatDate={formatDate} />}
                                    fileName="orcamento.pdf"
                                    className='bg-blue-500 px-4 py-2'
                                >
                                    {({ loading }) => (loading ? 'Gerando PDF...' : 'Baixar PDF')}
                                </PDFDownloadLink>
                            </div>

                            <div>
                                <p><strong>Data:</strong> {formatDate(orcamento.data)}</p>
                                <p><strong>Cliente:</strong> {orcamento.cliente}</p>
                                <p><strong>Telefone:</strong> {orcamento.telefone}</p>
                            </div>

                            <span className="block border-t-4 my-4 border-black w-full"></span>

                            <div className='overflow-auto' style={{ maxHeight: '200px' }}>
                                <h4>Produtos:</h4>
                                {orcamento.itens.map((item) => (
                                    <ul key={item.id} className='list-disc py-2 pl-6 border-black border-b-4'>
                                        <li>Produto: {item.produto}</li>
                                        <li>Descrição: {item.descricao}</li>
                                        <li>Valor: {formatCurrency(item.valor)}</li>
                                    </ul>
                                ))}

                                <p className='text-2xl font-bold mt-4'>Total: {formatCurrency(orcamento.itens.reduce((acc, item) => acc + item.valor, 0))}</p>
                            </div>

                            <div className='flex justify-between'>
                                <button onClick={() => mudarStatusOrcamento(orcamento.id, 'Aprovado')} className='text-blue-600 flex flex-col items-center'>
                                    <FaCheckCircle size={30} />
                                    <span className='text-lg font-bold'>aprovado</span>
                                </button>

                                <button onClick={() => mudarStatusOrcamento(orcamento.id, 'Negado')} className='flex text-red-600 flex-col items-center'>
                                    <FaTimes size={30} />
                                    <span className='text-lg font-bold'>Negado</span>
                                </button>

                                <button onClick={() => mudarStatusOrcamento(orcamento.id, 'Recebido')} className='flex text-green-600 flex-col items-center'>
                                    <FaDollarSign size={30} />
                                    <span className='text-lg font-bold'>Recebido</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default Orcamentos;
