import React, { createContext, useEffect, useState } from 'react';

// Cria o contexto
export const FinancasContext = createContext();

// Cria o provider do contexto
export const FinancasProvider = ({ children }) => {
  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (stringData) => {
    const data = new Date(stringData).toLocaleDateString();
    return data;
  };

  // RECEITAS
  const [receitas, setReceitas] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState(0);

  const adicionarReceita = (novaReceita) => {
    setReceitas((prevReceitas) => {
      const novasReceitas = [...prevReceitas, novaReceita];
      localStorage.setItem('receitas', JSON.stringify(novasReceitas));
      return novasReceitas;
    });
  };

  const removerReceita = (id) => {
    setReceitas((prevReceitas) => {
      const receitaAtualizada = prevReceitas.filter((elemento) => elemento.id !== id);
      localStorage.setItem('receitas', JSON.stringify(receitaAtualizada));
      return receitaAtualizada;
    });
  };

  const calculoTotalReceitas = () => {
    const total = receitas.reduce((acc, receita) => acc + receita.valor, 0);
    setTotalReceitas(total);
  };

  // DESPESAS
  const [despesas, setDespesas] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState(0);

  const adicionarDespesa = (novaDespesa) => {
    setDespesas((prevDespesas) => {
      const novasDespesas = [...prevDespesas, novaDespesa];
      localStorage.setItem('despesas', JSON.stringify(novasDespesas));
      return novasDespesas;
    });
  };

  const removerDespesa = (id) => {
    setDespesas((prevDespesas) => {
      const despesaAtualizada = prevDespesas.filter((elemento) => elemento.id !== id);
      localStorage.setItem('despesas', JSON.stringify(despesaAtualizada));
      return despesaAtualizada;
    });
  };

  const calculoTotalDespesas = () => {
    const total = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
    setTotalDespesas(total);
  };

  // SALDO ATUAL
  const [saldoAtual, setSaldoAtual] = useState(0);

  const calculoSaldoAtual = () => {
    const saldo = totalReceitas - totalDespesas;
    setSaldoAtual(saldo);
  };

  // ORÇAMENTOS
  const [orcamentos, setOrcamentos] = useState([]);
  const [orcamentosAprovados, setOrcamentosAprovados] = useState([]);
  const [orcamentosNegados, setOrcamentosNegados] = useState([]);
  const [orcamentosRecebidos, setOrcamentosRecebidos] = useState([]);

  const adicionarOrcamento = (novoOrcamento) => {
    setOrcamentos((prevOrcamentos) => {
      const novosOrcamentos = [...prevOrcamentos, novoOrcamento];
      localStorage.setItem('orcamentos', JSON.stringify(novosOrcamentos));
      return novosOrcamentos;
    });
  };

  const removerOrcamento = (id) => {
    setOrcamentos((prevOrcamentos) => {
      // Encontrar o orçamento a ser removido
      const orcamentoParaRemover = prevOrcamentos.find((orcamento) => orcamento.id === id);
      if (orcamentoParaRemover) {
        // Obter os IDs das receitas associadas ao orçamento
        const receitaIds = orcamentoParaRemover.itens.map((item) => item.id);
  
        // Remover as receitas associadas
        receitaIds.forEach((receitaId) => {
          removerReceita(receitaId);
        });
      }
  
      // Atualizar a lista de orçamentos
      const orcamentosAtualizados = prevOrcamentos.filter((orcamento) => orcamento.id !== id);
      localStorage.setItem('orcamentos', JSON.stringify(orcamentosAtualizados));
  
      // Atualizar as listas de status
      setOrcamentosAprovados((prev) => prev.filter((orcamento) => orcamento.id !== id));
      setOrcamentosNegados((prev) => prev.filter((orcamento) => orcamento.id !== id));
      setOrcamentosRecebidos((prev) => prev.filter((orcamento) => orcamento.id !== id));
      
      return orcamentosAtualizados;
    });
  };
  

  const mudarStatusOrcamento = (id, novoStatus) => {
    setOrcamentos(prevOrcamentos => {
      const updatedOrcamentos = prevOrcamentos.map(orcamento => {
        if (orcamento.id === id) {
          const receitaIds = orcamento.itens.map(item => item.id); // IDs das receitas associadas ao orçamento

          switch (novoStatus) {
            case 'Aprovado':
              setOrcamentosAprovados(prev => [...prev, { ...orcamento, status: 'Aprovado' }]);
              receitaIds.forEach(receitaId => removerReceita(receitaId));
              break;
            case 'Negado':
              setOrcamentosNegados(prev => [...prev, { ...orcamento, status: 'Negado' }]);
              receitaIds.forEach(receitaId => removerReceita(receitaId));
              break;
            case 'Recebido':
              setOrcamentosRecebidos(prev => [...prev, { ...orcamento, status: 'Recebido' }]);
              orcamento.itens.forEach(item => {
                adicionarReceita({
                  id: item.id,
                  data: formatDate(orcamento.data),
                  servico: item.servico,
                  descricao: item.descricao,
                  valor: item.valor,
                  cliente: orcamento.cliente,
                  telefone: orcamento.telefone,
                });
              });
              break;
            default:
              break;
          }

          return { ...orcamento, status: novoStatus };
        }
        return orcamento;
      });

      localStorage.setItem('orcamentos', JSON.stringify(updatedOrcamentos));
      return updatedOrcamentos;
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-blue-300 text-black'; // Azul para aprovado
      case 'Negado':
        return 'bg-red-300 text-black'; // Vermelho para negado
      case 'Recebido':
        return 'bg-green-300 text-black'; // Verde para recebido
      default:
        return 'bg-gray-300 text-black'; // Cor padrão para outros estados
    }
  };

  // Recupera dados do localStorage ao iniciar o contexto
  useEffect(() => {
    const storedReceitas = JSON.parse(localStorage.getItem('receitas')) || [];
    const storedDespesas = JSON.parse(localStorage.getItem('despesas')) || [];
    const storedOrcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];

    setReceitas(storedReceitas);
    setDespesas(storedDespesas);
    setOrcamentos(storedOrcamentos);

    calculoTotalReceitas();
    calculoTotalDespesas();
    calculoSaldoAtual();
  }, []);

  useEffect(() => {
    calculoTotalReceitas();
    calculoTotalDespesas();
  }, [receitas, despesas]);

  useEffect(() => {
    calculoSaldoAtual();
  }, [totalReceitas, totalDespesas]);

  return (
    <FinancasContext.Provider
      value={{
        adicionarReceita,
        totalReceitas,
        adicionarDespesa,
        totalDespesas,
        saldoAtual,
        formatCurrency,
        receitas,
        formatDate,
        despesas,
        removerReceita,
        removerDespesa,
        adicionarOrcamento,
        removerOrcamento,
        orcamentos,
        mudarStatusOrcamento,
        orcamentosNegados,
        orcamentosAprovados,
        orcamentosRecebidos,
        getStatusClass,
      }}
    >
      {children}
    </FinancasContext.Provider>
  );
};
