'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'

// --- Ícones (Outline SVGs) ---
function IconClientes({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> }
function IconOS({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }
function IconFaturamento({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 8v2m0-10c-1.11 0-2.08.402-2.599 1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
function IconEstoque({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> }
function IconDespesas({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> }
function IconRelatorio({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> }
function IconRefresh({ className = "w-4 h-4" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> }
function IconLogout({ className = "w-4 h-4" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> }
function IconUsuarios({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }

export default function NetRedeDashboard() {
  // Autenticação
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [emailAuth, setEmailAuth] = useState('')
  const [passwordAuth, setPasswordAuth] = useState('')
  const [submittingAuth, setSubmittingAuth] = useState(false)

  // Layout & Filtros Partilhados
  const [abaAtiva, setAbaAtiva] = useState('clientes')
  const [loading, setLoading] = useState(true)
  const [filtroFaturamento, setFiltroFaturamento] = useState('') // Guarda o ID do cliente para filtrar faturas

  // Listas de Dados
  const [clientes, setClientes] = useState([])
  const [ordens, setOrdens] = useState([])
  const [pagamentos, setPagamentos] = useState([])
  const [estoque, setEstoque] = useState([])
  const [despesas, setDespesas] = useState([])
  const [usuarios, setUsuarios] = useState([])

  // Formulários
  const [novoCliente, setNovoCliente] = useState({ nome: '', endereco: '', telefone: '', status: 'Ativo' })
  const [clienteEmEdicao, setClienteEmEdicao] = useState(null)
  const [pesquisaCliente, setPesquisaCliente] = useState('')
  
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', funcao: 'Técnico', status: 'Ativo' })
  const [novaOS, setNovaOS] = useState({ cliente_id: '', tipo: 'instalacao', data_agendamento: '', responsavel: '', observacoes: '' })
  const [novoPagamento, setNovoPagamento] = useState({ cliente_id: '', valor: '', mes_referencia: '', data_vencimento: '' })
  const [novoMaterial, setNovoMaterial] = useState({ nome: '', quantidade: '', unidade: 'un', quantidade_minima: '5' })
  const [novaDespesa, setNovaDespesa] = useState({ descricao: '', categoria: 'Gasolina', valor: '', data: new Date().toISOString().split('T')[0], observacoes: '' })

  // Monitorização de Sessão
  useEffect(() => {
    const timeout = setTimeout(() => setAuthLoading(false), 1000);

    const verificarSessao = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
      } catch (err) {
        console.error("Erro sessão:", err);
      } finally {
        clearTimeout(timeout);
        setAuthLoading(false);
      }
    };

    verificarSessao();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => { if (subscription) subscription.unsubscribe(); };
  }, [])

  useEffect(() => {
    if (session) carregarDados();
  }, [session])

  // --- Funções de Autenticação ---
  async function handleLogin(e) {
    e.preventDefault()
    setSubmittingAuth(true)
    const { error } = await supabase.auth.signInWithPassword({ email: emailAuth, password: passwordAuth })
    if (error) toast.error('Erro de autenticação: Verifique o e-mail e palavra-passe.')
    else toast.success('Sessão iniciada!')
    setSubmittingAuth(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    toast.success('Sessão terminada.')
  }

  // --- Carregamento Geral de Dados ---
  async function carregarDados() {
    setLoading(true)
    const [
      { data: dataClientes }, { data: dataOrdens }, { data: dataPagamentos },
      { data: dataEstoque }, { data: dataDespesas }, { data: dataUsuarios }
    ] = await Promise.all([
      supabase.from('clientes').select('*').order('created_at', { ascending: false }),
      supabase.from('ordens_servico').select('*, clientes(nome)').order('created_at', { ascending: false }),
      supabase.from('pagamentos').select('*, clientes(nome)').order('created_at', { ascending: false }),
      supabase.from('estoque').select('*').order('nome', { ascending: true }),
      supabase.from('despesas').select('*').order('data', { ascending: false }),
      supabase.from('usuarios').select('*').order('nome', { ascending: true })
    ])

    if (dataClientes) setClientes(dataClientes)
    if (dataOrdens) setOrdens(dataOrdens)
    if (dataPagamentos) setPagamentos(dataPagamentos)
    if (dataEstoque) setEstoque(dataEstoque)
    if (dataDespesas) setDespesas(dataDespesas)
    if (dataUsuarios) setUsuarios(dataUsuarios)
    setLoading(false)
  }

  // --- Interligação Clientes <-> Faturamento ---
  function abrirFaturamentoCliente(clienteId) {
    setFiltroFaturamento(clienteId)
    setNovoPagamento(prev => ({ ...prev, cliente_id: clienteId }))
    setAbaAtiva('faturamento')
  }

  function limparFiltroFaturamento() {
    setFiltroFaturamento('')
    setNovoPagamento(prev => ({ ...prev, cliente_id: '' }))
  }

  // --- Ações de Utilizadores (Equipa) ---
  async function cadastrarUsuario(e) {
    e.preventDefault()
    if (!novoUsuario.nome || !novoUsuario.email) return toast.error('Preencha nome e e-mail.')

    const { error } = await supabase.from('usuarios').insert([novoUsuario])
    if (error) toast.error('Erro ao registar utilizador: ' + error.message)
    else {
      toast.success('Membro da equipa registado!')
      setNovoUsuario({ nome: '', email: '', funcao: 'Técnico', status: 'Ativo' })
      carregarDados()
    }
  }

  async function alternarStatusUsuario(id, statusAtual) {
    const novoStatus = statusAtual === 'Ativo' ? 'Inativo' : 'Ativo'
    const { error } = await supabase.from('usuarios').update({ status: novoStatus }).eq('id', id)
    if (error) toast.error('Erro ao alterar status: ' + error.message)
    else {
      toast.success(`Utilizador ${novoStatus === 'Ativo' ? 'reativado' : 'desativado'}!`)
      carregarDados()
    }
  }

  // --- Ações de Clientes ---
  async function cadastrarCliente(e) {
    e.preventDefault()
    if (!novoCliente.nome || !novoCliente.endereco) return toast.error('Preencha nome e endereço do cliente.')
    const { error } = await supabase.from('clientes').insert([novoCliente])
    if (error) toast.error('Erro ao cadastrar cliente: ' + error.message)
    else {
      toast.success('Cliente cadastrado!')
      setNovoCliente({ nome: '', endereco: '', telefone: '', status: 'Ativo' })
      carregarDados()
    }
  }

  async function salvarEdicaoCliente(e) {
    e.preventDefault()
    if (!clienteEmEdicao.nome || !clienteEmEdicao.endereco) return toast.error('Nome e endereço são obrigatórios.')
    const { error } = await supabase.from('clientes').update({ nome: clienteEmEdicao.nome, endereco: clienteEmEdicao.endereco, telefone: clienteEmEdicao.telefone }).eq('id', clienteEmEdicao.id)
    if (error) toast.error('Erro ao atualizar: ' + error.message)
    else {
      toast.success('Cliente atualizado!')
      setClienteEmEdicao(null)
      carregarDados()
    }
  }

  async function alternarStatusCliente(id, statusAtual) {
    const novoStatus = statusAtual === 'Ativo' ? 'Desligado' : 'Ativo'
    const { error } = await supabase.from('clientes').update({ status: novoStatus }).eq('id', id)
    if (error) toast.error('Erro ao alterar status: ' + error.message)
    else {
      toast.success(`Cliente ${novoStatus === 'Ativo' ? 'reativado' : 'desligado'}!`)
      carregarDados()
    }
  }

  // --- Ações de OS ---
  async function cadastrarOS(e) {
    e.preventDefault()
    if (!novaOS.cliente_id || !novaOS.data_agendamento || !novaOS.responsavel) return toast.error('Preencha os campos obrigatórios da OS.')
    const { error } = await supabase.from('ordens_servico').insert([novaOS])
    if (error) toast.error('Erro ao criar OS: ' + error.message)
    else {
      toast.success('Ordem de serviço criada!')
      setNovaOS({ cliente_id: '', tipo: 'instalacao', data_agendamento: '', responsavel: '', observacoes: '' })
      carregarDados()
    }
  }

  // --- Ações de Faturamento ---
  async function cadastrarPagamento(e) {
    e.preventDefault()
    if (!novoPagamento.cliente_id || !novoPagamento.valor || !novoPagamento.mes_referencia) return toast.error('Preencha todos os campos.')
    const { error } = await supabase.from('pagamentos').insert([novoPagamento])
    if (error) toast.error('Erro ao lançar cobrança: ' + error.message)
    else {
      toast.success('Cobrança lançada!')
      setNovoPagamento({ cliente_id: filtroFaturamento || '', valor: '', mes_referencia: '', data_vencimento: '' })
      carregarDados()
    }
  }

  async function alternarStatusPagamento(id, statusAtual) {
    const novoStatus = !statusAtual
    const { error } = await supabase.from('pagamentos').update({ pago: novoStatus, data_pagamento: novoStatus ? new Date().toISOString() : null }).eq('id', id)
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success(novoStatus ? 'Marcado como pago!' : 'Pagamento desfeito!')
      carregarDados()
    }
  }

  // --- Ações de Estoque ---
  async function cadastrarMaterial(e) {
    e.preventDefault()
    if (!novoMaterial.nome || !novoMaterial.quantidade) return toast.error('Preencha o nome e quantidade.')
    const { error } = await supabase.from('estoque').insert([{ ...novoMaterial, quantidade: parseInt(novoMaterial.quantidade), quantidade_minima: parseInt(novoMaterial.quantidade_minima) }])
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Material adicionado!')
      setNovoMaterial({ nome: '', quantidade: '', unidade: 'un', quantidade_minima: '5' })
      carregarDados()
    }
  }

  async function editarQuantidadeEstoque(id, nome, qtdAtual) {
    const valorDigitado = prompt(`Digite a nova quantidade para "${nome}":`, String(qtdAtual))
    if (valorDigitado === null) return
    const novaQtd = parseInt(valorDigitado, 10)
    if (isNaN(novaQtd) || novaQtd < 0) return toast.error('Quantidade inválida.')
    const { error } = await supabase.from('estoque').update({ quantidade: novaQtd }).eq('id', id)
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Quantidade atualizada!')
      carregarDados()
    }
  }

  // --- Ações de Despesas ---
  async function cadastrarDespesa(e) {
    e.preventDefault()
    if (!novaDespesa.descricao || !novaDespesa.valor || !novaDespesa.data) return toast.error('Preencha todos os dados.')
    const { error } = await supabase.from('despesas').insert([{ ...novaDespesa, valor: parseFloat(novaDespesa.valor) }])
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Despesa registada!')
      setNovaDespesa({ descricao: '', categoria: 'Gasolina', valor: '', data: new Date().toISOString().split('T')[0], observacoes: '' })
      carregarDados()
    }
  }

  async function removerDespesa(id) {
    if (!confirm('Remover despesa?')) return
    const { error } = await supabase.from('despesas').delete().eq('id', id)
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Removida!')
      carregarDados()
    }
  }

  const clientesFiltrados = clientes.filter(c => c.nome.toLowerCase().includes(pesquisaCliente.toLowerCase()) || c.endereco.toLowerCase().includes(pesquisaCliente.toLowerCase()) || (c.telefone && c.telefone.includes(pesquisaCliente)))
  
  // Filtra pagamentos consoante o cliente selecionado através do botão interligado
  const pagamentosExibidos = filtroFaturamento ? pagamentos.filter(p => p.cliente_id === filtroFaturamento) : pagamentos

  // --- Cálculo do Status de Pagamento por Cliente ---
  function obterStatusPagamento(clienteId) {
    const cobrancasCliente = pagamentos.filter(p => p.cliente_id === clienteId)
    
    if (cobrancasCliente.length === 0) {
      return { texto: 'Sem faturas', estilo: 'bg-slate-100 text-slate-600 border border-slate-200' }
    }

    const pendentes = cobrancasCliente.filter(p => !p.pago)
    
    if (pendentes.length === 0) {
      return { texto: 'Em dia', estilo: 'bg-emerald-100 text-emerald-800 font-medium' }
    }

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0) 

    let maiorAtrasoDias = 0
    let temAtraso = false

    pendentes.forEach(p => {
      const dataVencimento = new Date(p.data_vencimento + 'T00:00:00')
      
      if (dataVencimento < hoje) {
        temAtraso = true
        const diffTempo = Math.abs(hoje - dataVencimento)
        const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24))
        if (diffDias > maiorAtrasoDias) maiorAtrasoDias = diffDias
      }
    })

    if (temAtraso) {
      return { texto: `Atrasado há ${maiorAtrasoDias} dia(s)`, estilo: 'bg-rose-100 text-rose-800 font-bold border border-rose-200 shadow-sm' }
    } else {
      return { texto: 'Pendente (No prazo)', estilo: 'bg-amber-100 text-amber-800 font-medium' }
    }
  }

  // --- Ecrãs ---
  if (authLoading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300">A carregar sistema...</div>

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
        <Toaster position="top-right" />
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-blue-400">NetRede</h1>
            <p className="text-slate-400 text-sm mt-1">Gestão de Clientes</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">E-mail</label>
              <input type="email" value={emailAuth} onChange={e => setEmailAuth(e.target.value)} placeholder="exemplo@netrede.com" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-blue-500" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Palavra-passe</label>
              <input type="password" value={passwordAuth} onChange={e => setPasswordAuth(e.target.value)} placeholder="••••••••" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-blue-500" required />
            </div>
            <button type="submit" disabled={submittingAuth} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-sm transition mt-2 shadow-lg shadow-blue-600/30">
              {submittingAuth ? 'A verificar...' : 'Entrar no Sistema'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // --- Relatórios (Cálculos Base) ---
  const mesAtualNome = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const dataInicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const totalFaturadoMes = pagamentos.filter(p => p.pago).reduce((acc, p) => acc + Number(p.valor || 0), 0)
  const totalDespesasMes = despesas.filter(d => { if (!d.data) return false; return new Date(d.data + 'T00:00:00') >= dataInicioMes }).reduce((acc, d) => acc + Number(d.valor || 0), 0)
  const lucroLiquidoMes = totalFaturadoMes - totalDespesasMes
  const clientesDesligados = clientes.filter(c => c.status === 'Desligado' || c.status === 'Inativo')
  const novosClientesMes = clientes.filter(c => new Date(c.created_at) >= dataInicioMes)
  const clientesAtivosCount = clientes.filter(c => c.status !== 'Desligado' && c.status !== 'Inativo').length
  const cobrancasPagasCount = pagamentos.filter(p => p.pago).length
  const clientesFaltamFaturar = Math.max(0, clientesAtivosCount - cobrancasPagasCount)
  const valorPendente = pagamentos.filter(p => !p.pago).reduce((acc, p) => acc + Number(p.valor || 0), 0)
  const materiaisEstoqueBaixo = estoque.filter(item => item.quantidade <= item.quantidade_minima)

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        
        <div className="bg-slate-900 text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">NetRede</h1>
            <p className="text-slate-300 text-sm mt-1">Gestão de Clientes</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={carregarDados} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 px-4 rounded-lg border border-slate-700 transition">
              <IconRefresh /> Atualizar
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold py-2.5 px-4 rounded-lg border border-rose-800/50 transition">
              <IconLogout /> Sair
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 scrollbar-hide">
          {[{ id: 'clientes', icon: IconClientes, label: `Clientes (${clientes.length})` },
            { id: 'os', icon: IconOS, label: `Instalações & OS (${ordens.length})` },
            { id: 'faturamento', icon: IconFaturamento, label: `Faturamento (${pagamentos.length})` },
            { id: 'estoque', icon: IconEstoque, label: `Estoque (${estoque.length})` },
            { id: 'despesas', icon: IconDespesas, label: `Despesas (${despesas.length})` },
            { id: 'usuarios', icon: IconUsuarios, label: `Equipa (${usuarios.length})` },
            { id: 'relatorios', icon: IconRelatorio, label: `Relatórios` }
          ].map(aba => (
            <button key={aba.id} onClick={() => setAbaAtiva(aba.id)} className={`flex items-center justify-center gap-2 py-4 px-4 font-bold text-sm transition border-b-2 whitespace-nowrap ${abaAtiva === aba.id ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
              <aba.icon /> {aba.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {loading ? <div className="text-center py-12 text-slate-500 font-medium">A carregar informações da NetRede...</div> : (
            <>
              {/* --- ABA USUÁRIOS (EQUIPA) --- */}
              {abaAtiva === 'usuarios' && (
                <div className="space-y-6">
                  <form onSubmit={cadastrarUsuario} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input type="text" placeholder="Nome Completo *" value={novoUsuario.nome} onChange={e => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <input type="email" placeholder="E-mail *" value={novoUsuario.email} onChange={e => setNovoUsuario({ ...novoUsuario, email: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <select value={novoUsuario.funcao} onChange={e => setNovoUsuario({ ...novoUsuario, funcao: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white">
                      <option value="Administrador">Administrador</option>
                      <option value="Técnico">Técnico de Rua</option>
                      <option value="Atendente">Atendimento</option>
                    </select>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition">+ Adicionar Utilizador</button>
                  </form>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b">
                          <th className="p-3">Nome</th>
                          <th className="p-3">E-mail</th>
                          <th className="p-3">Função / Cargo</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {usuarios.length === 0 ? <tr><td colSpan="5" className="p-6 text-center text-slate-400">Nenhum membro na equipa registado.</td></tr> : usuarios.map(u => (
                          <tr key={u.id} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-semibold text-slate-800">{u.nome}</td><td className="p-3 text-slate-600">{u.email}</td><td className="p-3 text-slate-600 font-medium">{u.funcao}</td>
                            <td className="p-3"><span className={`px-2.5 py-1 text-xs font-bold rounded-full ${u.status === 'Inativo' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>{u.status || 'Ativo'}</span></td>
                            <td className="p-3 text-center"><button onClick={() => alternarStatusUsuario(u.id, u.status || 'Ativo')} className={`px-2.5 py-1 text-xs font-semibold rounded border transition ${u.status === 'Inativo' ? 'border-emerald-600 text-emerald-600' : 'border-rose-500 text-rose-600'}`}>{u.status === 'Inativo' ? 'Reativar' : 'Desativar'}</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- ABA CLIENTES --- */}
              {abaAtiva === 'clientes' && (
                <div className="space-y-6">
                  <div className="relative"><input type="text" placeholder="Pesquisar cliente por nome, endereço ou telefone..." value={pesquisaCliente} onChange={e => setPesquisaCliente(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg text-sm outline-blue-600 bg-slate-50 focus:bg-white transition" /></div>
                  {clienteEmEdicao ? (
                    <form onSubmit={salvarEdicaoCliente} className="bg-blue-50 p-4 rounded-lg border border-blue-200 grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div><label className="text-xs font-bold text-blue-900 block mb-1">Editar Nome *</label><input type="text" value={clienteEmEdicao.nome} onChange={e => setClienteEmEdicao({ ...clienteEmEdicao, nome: e.target.value })} className="w-full p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required /></div>
                      <div><label className="text-xs font-bold text-blue-900 block mb-1">Editar Endereço *</label><input type="text" value={clienteEmEdicao.endereco} onChange={e => setClienteEmEdicao({ ...clienteEmEdicao, endereco: e.target.value })} className="w-full p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required /></div>
                      <div><label className="text-xs font-bold text-blue-900 block mb-1">Editar Telefone</label><input type="text" value={clienteEmEdicao.telefone || ''} onChange={e => setClienteEmEdicao({ ...clienteEmEdicao, telefone: e.target.value })} className="w-full p-2.5 border rounded-md text-sm outline-blue-600 bg-white" /></div>
                      <div className="flex items-end gap-2"><button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition">Guardar</button><button type="button" onClick={() => setClienteEmEdicao(null)} className="flex-1 bg-slate-400 hover:bg-slate-500 text-white font-bold py-2.5 rounded-md text-sm transition">Cancelar</button></div>
                    </form>
                  ) : (
                    <form onSubmit={cadastrarCliente} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3">
                      <input type="text" placeholder="Nome do Cliente *" value={novoCliente.nome} onChange={e => setNovoCliente({ ...novoCliente, nome: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                      <input type="text" placeholder="Endereço (Rua, Nº) *" value={novoCliente.endereco} onChange={e => setNovoCliente({ ...novoCliente, endereco: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                      <input type="text" placeholder="Telefone / Contacto" value={novoCliente.telefone} onChange={e => setNovoCliente({ ...novoCliente, telefone: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" />
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition">+ Cadastrar Cliente</button>
                    </form>
                  )}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b">
                          <th className="p-3">Nome</th>
                          <th className="p-3">Endereço</th>
                          <th className="p-3">Telefone</th>
                          <th className="p-3">Financeiro</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {clientesFiltrados.length === 0 ? <tr><td colSpan="6" className="p-6 text-center text-slate-400">Nenhum cliente corresponde à pesquisa.</td></tr> : clientesFiltrados.map(c => {
                            const statusPag = obterStatusPagamento(c.id)
                            return (
                              <tr key={c.id} className="hover:bg-slate-50 transition">
                                <td className="p-3 font-semibold text-slate-800">{c.nome}</td>
                                <td className="p-3 text-slate-600">{c.endereco}</td>
                                <td className="p-3 text-slate-600">{c.telefone || '-'}</td>
                                <td className="p-3">
                                  <button onClick={() => abrirFaturamentoCliente(c.id)} className={`px-2.5 py-1 text-xs rounded-full cursor-pointer hover:opacity-80 transition ${statusPag.estilo}`} title="Ver Faturas deste cliente">
                                    {statusPag.texto}
                                  </button>
                                </td>
                                <td className="p-3">
                                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${c.status === 'Desligado' || c.status === 'Inativo' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                    {c.status || 'Ativo'}
                                  </span>
                                </td>
                                <td className="p-3 text-center">
                                  <div className="flex justify-center items-center gap-2">
                                    <button onClick={() => abrirFaturamentoCliente(c.id)} className="px-2.5 py-1 text-xs font-semibold rounded border border-amber-500 text-amber-600 hover:bg-amber-50 transition" title="Lançar ou Ver Faturas">Faturas</button>
                                    <button onClick={() => setClienteEmEdicao(c)} className="px-2.5 py-1 text-xs font-semibold rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">Editar</button>
                                    <button onClick={() => alternarStatusCliente(c.id, c.status || 'Ativo')} className={`px-2.5 py-1 text-xs font-semibold rounded border transition ${c.status === 'Desligado' ? 'border-emerald-600 text-emerald-600' : 'border-rose-500 text-rose-600'}`}>
                                      {c.status === 'Desligado' ? 'Reativar' : 'Desligar'}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- ABA OS --- */}
              {abaAtiva === 'os' && (
                <div className="space-y-6">
                  <form onSubmit={cadastrarOS} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select value={novaOS.cliente_id} onChange={e => setNovaOS({ ...novaOS, cliente_id: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required><option value="">Selecione o Cliente *</option>{clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}</select>
                    <select value={novaOS.tipo} onChange={e => setNovaOS({ ...novaOS, tipo: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white"><option value="instalacao">Instalação</option><option value="religamento">Religamento</option><option value="manutencao">Manutenção</option></select>
                    <input type="date" value={novaOS.data_agendamento} onChange={e => setNovaOS({ ...novaOS, data_agendamento: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <input type="text" placeholder="Técnico Responsável *" value={novaOS.responsavel} onChange={e => setNovaOS({ ...novaOS, responsavel: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <input type="text" placeholder="Observações técnicas" value={novaOS.observacoes} onChange={e => setNovaOS({ ...novaOS, observacoes: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white md:col-span-2" />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition md:col-span-3">+ Criar Ordem de Serviço</button>
                  </form>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead><tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b"><th className="p-3">Cliente</th><th className="p-3">Tipo</th><th className="p-3">Data Agendada</th><th className="p-3">Técnico</th><th className="p-3">Observações</th></tr></thead>
                      <tbody className="divide-y divide-slate-200">
                        {ordens.length === 0 ? <tr><td colSpan="5" className="p-4 text-center text-slate-400">Nenhuma ordem registada.</td></tr> : ordens.map(o => (
                          <tr key={o.id} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-semibold text-slate-800">{o.clientes?.nome || 'Removido'}</td><td className="p-3 font-medium capitalize text-blue-700">{o.tipo}</td><td className="p-3 text-slate-600">{o.data_agendamento}</td><td className="p-3 text-slate-600">{o.responsavel}</td><td className="p-3 text-slate-500 italic">{o.observacoes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- ABA FATURAMENTO --- */}
              {abaAtiva === 'faturamento' && (
                <div className="space-y-6">
                  
                  {/* Alerta de Filtro Ativo */}
                  {filtroFaturamento && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg flex justify-between items-center text-sm shadow-sm">
                      <span>A mostrar o histórico de faturas do cliente: <strong>{clientes.find(c => c.id === filtroFaturamento)?.nome}</strong></span>
                      <button onClick={limparFiltroFaturamento} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-bold transition">Limpar Filtro</button>
                    </div>
                  )}

                  <form onSubmit={cadastrarPagamento} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-5 gap-3">
                    <select value={novoPagamento.cliente_id} onChange={e => setNovoPagamento({ ...novoPagamento, cliente_id: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required><option value="">Selecione o Cliente *</option>{clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}</select>
                    <input type="number" step="0.01" placeholder="Valor (R$) *" value={novoPagamento.valor} onChange={e => setNovoPagamento({ ...novoPagamento, valor: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <input type="text" placeholder="Mês Ref. (10/2026) *" value={novoPagamento.mes_referencia} onChange={e => setNovoPagamento({ ...novoPagamento, mes_referencia: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <input type="date" value={novoPagamento.data_vencimento} onChange={e => setNovoPagamento({ ...novoPagamento, data_vencimento: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition">+ Lançar Cobrança</button>
                  </form>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead><tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b"><th className="p-3">Cliente</th><th className="p-3">Mês Ref.</th><th className="p-3">Valor</th><th className="p-3">Vencimento</th><th className="p-3">Status</th><th className="p-3 text-center">Ação</th></tr></thead>
                      <tbody className="divide-y divide-slate-200">
                        {pagamentosExibidos.length === 0 ? <tr><td colSpan="6" className="p-4 text-center text-slate-400">Nenhuma cobrança registada para os filtros atuais.</td></tr> : pagamentosExibidos.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-semibold text-slate-800">{p.clientes?.nome || 'Removido'}</td><td className="p-3 text-slate-600">{p.mes_referencia}</td><td className="p-3 font-bold text-slate-800">R$ {Number(p.valor).toFixed(2)}</td><td className="p-3 text-slate-600">{p.data_vencimento}</td>
                            <td className="p-3"><span className={`px-2.5 py-1 text-xs font-bold rounded-full ${p.pago ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{p.pago ? 'PAGO' : 'PENDENTE'}</span></td>
                            <td className="p-3 text-center"><button onClick={() => alternarStatusPagamento(p.id, p.pago)} className={`px-3 py-1.5 text-xs font-bold rounded transition text-white ${p.pago ? 'bg-slate-500 hover:bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}>{p.pago ? 'Desfazer Pago' : 'Marcar Pago'}</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- ABA ESTOQUE --- */}
              {abaAtiva === 'estoque' && (
                <div className="space-y-6">
                  <form onSubmit={cadastrarMaterial} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-5 gap-3">
                    <input type="text" placeholder="Nome do Material *" value={novoMaterial.nome} onChange={e => setNovoMaterial({ ...novoMaterial, nome: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white md:col-span-2" required />
                    <input type="number" placeholder="Qtd. Inicial *" value={novoMaterial.quantidade} onChange={e => setNovoMaterial({ ...novoMaterial, quantidade: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <select value={novoMaterial.unidade} onChange={e => setNovoMaterial({ ...novoMaterial, unidade: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white"><option value="un">Unidades (un)</option><option value="metros">Metros (m)</option><option value="caixas">Caixas (cx)</option><option value="pacotes">Pacotes (pct)</option></select>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition">+ Novo Material</button>
                  </form>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead><tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b"><th className="p-3">Material / Item</th><th className="p-3">Unidade</th><th className="p-3">Qtd. em Estoque</th><th className="p-3">Status do Saldo</th><th className="p-3 text-center">Ação</th></tr></thead>
                      <tbody className="divide-y divide-slate-200">
                        {estoque.length === 0 ? <tr><td colSpan="5" className="p-4 text-center text-slate-400">Nenhum material registado.</td></tr> : estoque.map(item => {
                          const alerta = item.quantidade <= item.quantidade_minima
                          return (
                            <tr key={item.id} className="hover:bg-slate-50 transition">
                              <td className="p-3 font-semibold text-slate-800">{item.nome}</td><td className="p-3 text-slate-500 uppercase text-xs font-bold">{item.unidade}</td><td className="p-3 font-bold text-base text-slate-900">{item.quantidade}</td>
                              <td className="p-3"><span className={`px-2.5 py-1 text-xs font-bold rounded-full ${alerta ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{alerta ? 'Estoque Baixo' : 'Normal'}</span></td>
                              <td className="p-3 text-center"><button onClick={() => editarQuantidadeEstoque(item.id, item.nome, item.quantidade)} className="px-3 py-1.5 text-xs font-semibold rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">Editar Quantidade</button></td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- ABA DESPESAS --- */}
              {abaAtiva === 'despesas' && (
                <div className="space-y-6">
                  <form onSubmit={cadastrarDespesa} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-5 gap-3">
                    <input type="text" placeholder="Descrição *" value={novaDespesa.descricao} onChange={e => setNovaDespesa({ ...novaDespesa, descricao: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <select value={novaDespesa.categoria} onChange={e => setNovaDespesa({ ...novaDespesa, categoria: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white"><option value="Gasolina">Gasolina</option><option value="Almoço">Almoço</option><option value="Manutenção">Manutenção</option><option value="Outros">Outros</option></select>
                    <input type="number" step="0.01" placeholder="Valor (R$) *" value={novaDespesa.valor} onChange={e => setNovaDespesa({ ...novaDespesa, valor: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <input type="date" value={novaDespesa.data} onChange={e => setNovaDespesa({ ...novaDespesa, data: e.target.value })} className="p-2.5 border rounded-md text-sm outline-blue-600 bg-white" required />
                    <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-md text-sm transition">+ Registar Despesa</button>
                  </form>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead><tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b"><th className="p-3">Data</th><th className="p-3">Descrição</th><th className="p-3">Categoria</th><th className="p-3">Valor</th><th className="p-3 text-center">Ação</th></tr></thead>
                      <tbody className="divide-y divide-slate-200">
                        {despesas.length === 0 ? <tr><td colSpan="5" className="p-4 text-center text-slate-400">Nenhuma despesa registada.</td></tr> : despesas.map(d => (
                          <tr key={d.id} className="hover:bg-slate-50 transition">
                            <td className="p-3 text-slate-600 font-medium">{d.data}</td><td className="p-3 font-semibold text-slate-800">{d.descricao}</td>
                            <td className="p-3"><span className={`px-2.5 py-1 text-xs font-bold rounded-full ${d.categoria === 'Gasolina' ? 'bg-amber-100 text-amber-800' : d.categoria === 'Almoço' ? 'bg-orange-100 text-orange-800' : 'bg-slate-200 text-slate-700'}`}>{d.categoria}</span></td>
                            <td className="p-3 font-bold text-rose-600">R$ {Number(d.valor).toFixed(2)}</td><td className="p-3 text-center"><button onClick={() => removerDespesa(d.id)} className="px-2.5 py-1 text-xs font-semibold rounded border border-rose-300 text-rose-600 hover:bg-rose-50 transition">Remover</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- ABA RELATÓRIOS --- */}
              {abaAtiva === 'relatorios' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Faturado (Mês)</p><p className="text-xl font-black text-emerald-600 mt-2">R$ {totalFaturadoMes.toFixed(2)}</p><p className="text-xs text-slate-400 mt-1 capitalize">{mesAtualNome}</p></div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Despesas (Mês)</p><p className="text-xl font-black text-rose-600 mt-2">R$ {totalDespesasMes.toFixed(2)}</p><p className="text-xs text-slate-400 mt-1">Gasolina, almoço, etc.</p></div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Lucro Líquido</p><p className={`text-xl font-black mt-2 ${lucroLiquidoMes >= 0 ? 'text-blue-600' : 'text-rose-700'}`}>R$ {lucroLiquidoMes.toFixed(2)}</p><p className="text-xs text-slate-400 mt-1">Faturado − Despesas</p></div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pendentes</p><p className="text-xl font-black text-amber-600 mt-2">R$ {valorPendente.toFixed(2)}</p><p className="text-xs text-slate-400 mt-1">{clientesFaltamFaturar} a receber</p></div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Novos Clientes</p><p className="text-xl font-black text-slate-800 mt-2">{novosClientesMes.length}</p><p className="text-xs text-slate-400 mt-1">Ativos: {clientesAtivosCount}</p></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>Materiais em Estoque Baixo ({materiaisEstoqueBaixo.length})</h3>
                      {materiaisEstoqueBaixo.length === 0 ? <p className="text-sm text-slate-400 italic">Nenhum item com estoque crítico.</p> : <ul className="divide-y divide-slate-100 text-sm">{materiaisEstoqueBaixo.map(item => <li key={item.id} className="py-2 flex justify-between items-center"><span className="font-medium text-slate-700">{item.nome}</span><span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs">{item.quantidade} {item.unidade} (Mín: {item.quantidade_minima})</span></li>)}</ul>}
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>Clientes Desligados / Inativos ({clientesDesligados.length})</h3>
                      {clientesDesligados.length === 0 ? <p className="text-sm text-slate-400 italic">Nenhum cliente inativo.</p> : <ul className="divide-y divide-slate-100 text-sm">{clientesDesligados.map(c => <li key={c.id} className="py-2 flex justify-between items-center"><div><p className="font-medium text-slate-800">{c.nome}</p><p className="text-xs text-slate-400">{c.endereco}</p></div><button onClick={() => alternarStatusCliente(c.id, c.status)} className="text-xs font-semibold text-blue-600 hover:underline">Reativar</button></li>)}</ul>}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}