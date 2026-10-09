'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'

// --- Ícones (Outline SVGs) ---
function IconMenu({ className = "w-6 h-6" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg> }
function IconClose({ className = "w-6 h-6" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> }
function IconClientes({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> }
function IconOS({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }
function IconFaturamento({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 8v2m0-10c-1.11 0-2.08.402-2.599 1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
function IconEstoque({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> }
function IconDespesas({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> }
function IconDiretoria({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> }
function IconRelatorio({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> }
function IconRefresh({ className = "w-4 h-4" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> }
function IconLogout({ className = "w-4 h-4" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> }
function IconUsuarios({ className = "w-5 h-5" }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }

export default function NetRedeDashboard() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [emailAuth, setEmailAuth] = useState('')
  const [passwordAuth, setPasswordAuth] = useState('')
  const [submittingAuth, setSubmittingAuth] = useState(false)
  const [tipoUsuario, setTipoUsuario] = useState('Padrão')

  const [abaAtiva, setAbaAtiva] = useState('clientes')
  const [menuLateralAberto, setMenuLateralAberto] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filtroFaturamento, setFiltroFaturamento] = useState('')
  
  const [filtroStatusCliente, setFiltroStatusCliente] = useState('todos') 
  const [filtroStatusFaturamento, setFiltroStatusFaturamento] = useState('todos')
  const [tipoExportacaoRelatorio, setTipoExportacaoRelatorio] = useState('completo')

  const primeiroDiaMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
  const ultimoDiaMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
  const [dataInicioRelatorio, setDataInicioRelatorio] = useState(primeiroDiaMes)
  const [dataFimRelatorio, setDataFimRelatorio] = useState(ultimoDiaMes)

  const [clientes, setClientes] = useState([])
  const [ordens, setOrdens] = useState([])
  const [pagamentos, setPagamentos] = useState([])
  const [estoque, setEstoque] = useState([])
  const [despesas, setDespesas] = useState([])
  const [despesasDiretoria, setDespesasDiretoria] = useState([])
  const [funcionarios, setFuncionarios] = useState([])

  const [novoCliente, setNovoCliente] = useState({ nome: '', cep: '', endereco: '', telefone: '', funcionario_id: '', status: 'Ativo' })
  const [clienteEmEdicao, setClienteEmEdicao] = useState(null)
  const [pesquisaCliente, setPesquisaCliente] = useState('')
  const [pesquisaFaturamento, setPesquisaFaturamento] = useState('')
  
  const [novoFuncionario, setNovoFuncionario] = useState({ nome: '', email: '', cargo: 'Auxiliar', telefone: '', status: 'Ativo' })
  const [novaOS, setNovaOS] = useState({ cliente_id: '', tipo: 'instalacao', data_agendamento: new Date().toISOString().split('T')[0], funcionario_id: '', observacoes: '' })
  const [novoPagamento, setNovoPagamento] = useState({ cliente_id: '', valor: '', data_vencimento: new Date().toISOString().split('T')[0], data_pagamento: new Date().toISOString().split('T')[0], pago: true })
  const [novoMaterial, setNovoMaterial] = useState({ nome: '', quantidade: '', unidade: 'un', quantidade_minima: '5' })
  const [novaDespesa, setNovaDespesa] = useState({ descricao: '', categoria: 'Gasolina', valor: '', data: new Date().toISOString().split('T')[0], funcionario_id: '', observacoes: '' })
  const [novaDespesaDiretoria, setNovaDespesaDiretoria] = useState({ descricao: '', valor: '', data: new Date().toISOString().split('T')[0], usuario_id: '' })

  function mudarAba(novaAba) {
    setAbaAtiva(novaAba)
    setMenuLateralAberto(false)
    setNovoCliente({ nome: '', cep: '', endereco: '', telefone: '', funcionario_id: '', status: 'Ativo' })
    setClienteEmEdicao(null)
    setNovoFuncionario({ nome: '', email: '', cargo: 'Auxiliar', telefone: '', status: 'Ativo' })
    setNovaOS({ cliente_id: '', tipo: 'instalacao', data_agendamento: new Date().toISOString().split('T')[0], funcionario_id: '', observacoes: '' })
    if (novaAba !== 'faturamento') {
      setFiltroFaturamento('')
      setPesquisaFaturamento('')
    }
    setNovoPagamento({ cliente_id: '', valor: '', data_vencimento: new Date().toISOString().split('T')[0], data_pagamento: new Date().toISOString().split('T')[0], pago: true })
    setNovoMaterial({ nome: '', quantidade: '', unidade: 'un', quantidade_minima: '5' })
    setNovaDespesa({ descricao: '', categoria: 'Gasolina', valor: '', data: new Date().toISOString().split('T')[0], funcionario_id: '', observacoes: '' })
    setNovaDespesaDiretoria({ descricao: '', valor: '', data: new Date().toISOString().split('T')[0], usuario_id: '' })
  }

  async function buscarCep(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        const enderecoCompleto = `${data.logradouro}, Bairro: ${data.bairro} - ${data.localidade}/${data.uf}`;
        setNovoCliente(prev => ({ ...prev, endereco: enderecoCompleto }));
        toast.success('Endereço encontrado pelo CEP!');
      } else {
        toast.error('CEP não encontrado.');
      }
    } catch (err) {
      console.error('Erro ao buscar CEP:', err);
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        if (session?.user?.email) {
          await detectarTipoUsuario(session.user.email);
        }
      } catch (err) {
        console.error("Erro sessão:", err);
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user?.email) {
        await detectarTipoUsuario(session.user.email);
      } else {
        setTipoUsuario('Padrão');
      }
      setAuthLoading(false);
    });

    return () => { if (subscription) subscription.unsubscribe(); };
  }, [])

  async function detectarTipoUsuario(email) {
    if (!email) return;
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('cargo, funcao')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error("Erro ao detectar tipo de usuário:", error);
      }

      const cargoOuFuncao = data?.cargo || data?.funcao;
      if (data && (cargoOuFuncao === 'Responsável' || cargoOuFuncao === 'Administrador' || cargoOuFuncao === 'Técnico')) {
        setTipoUsuario('Administrador');
      } else {
        setTipoUsuario('Padrão');
      }
    } catch (err) {
      console.error("Erro crítico detectar cargo:", err);
      setTipoUsuario('Padrão');
    }
  }

  useEffect(() => {
    if (session) carregarDados();
  }, [session])

  async function handleLogin(e) {
    e.preventDefault()
    setSubmittingAuth(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email: emailAuth, password: passwordAuth })
    if (error) {
      toast.error('Erro de autenticação: Verifique o e-mail e a senha.')
    } else {
      toast.success('Sessão iniciada!')
      if (data.session?.user?.email) {
        await detectarTipoUsuario(data.session.user.email);
      }
    }
    setSubmittingAuth(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setTipoUsuario('Padrão')
    toast.success('Sessão encerrada.')
  }

  async function carregarDados() {
    setLoading(true)
    const [
      { data: dataClientes }, { data: dataOrdens }, { data: dataPagamentos },
      { data: dataEstoque }, { data: dataDespesas }, { data: dataDespesasDir }, { data: dataFuncionarios }
    ] = await Promise.all([
      supabase.from('clientes').select('*, usuarios(nome)').order('created_at', { ascending: false }),
      supabase.from('ordens_servico').select('*, clientes(nome), usuarios(nome)').order('created_at', { ascending: false }),
      supabase.from('pagamentos').select('*, clientes(nome)').order('created_at', { ascending: false }),
      supabase.from('estoque').select('*').order('nome', { ascending: true }),
      supabase.from('despesas').select('*, usuarios(nome)').order('data', { ascending: false }),
      supabase.from('despesas_diretoria').select('*, usuarios(nome)').order('data', { ascending: false }),
      supabase.from('usuarios').select('*').order('nome', { ascending: true })
    ])

    if (dataClientes) setClientes(dataClientes)
    if (dataOrdens) setOrdens(dataOrdens)
    if (dataPagamentos) setPagamentos(dataPagamentos)
    if (dataEstoque) setEstoque(dataEstoque)
    if (dataDespesas) setDespesas(dataDespesas)
    if (dataDespesasDir) setDespesasDiretoria(dataDespesasDir)
    if (dataFuncionarios) setFuncionarios(dataFuncionarios)
    setLoading(false)
  }

  function abrirFaturamentoCliente(clienteId) {
    setFiltroFaturamento(clienteId)
    setNovoPagamento(prev => ({ ...prev, cliente_id: clienteId }))
    setAbaAtiva('faturamento')
    setMenuLateralAberto(false)
  }

  function limparFiltroFaturamento() {
    setFiltroFaturamento('')
    setNovoPagamento(prev => ({ ...prev, cliente_id: '' }))
  }

  async function registrarFuncionario(e) {
    e.preventDefault()
    if (tipoUsuario !== 'Administrador') return toast.error('Acesso restrito a Administradores.')
    if (!novoFuncionario.nome || !novoFuncionario.email) return toast.error('Preencha o nome e o e-mail do funcionário.')
    
    const { error } = await supabase.from('usuarios').insert([{
      nome: novoFuncionario.nome,
      email: novoFuncionario.email,
      cargo: novoFuncionario.cargo,
      funcao: novoFuncionario.cargo,
      telefone: novoFuncionario.telefone,
      status: 'Ativo'
    }])

    if (error) toast.error('Erro ao registrar: ' + error.message)
    else {
      toast.success('Funcionário registrado com sucesso!')
      setNovoFuncionario({ nome: '', email: '', cargo: 'Auxiliar', telefone: '', status: 'Ativo' })
      carregarDados()
    }
  }

  async function alternarStatusFuncionario(id, statusAtual) {
    if (tipoUsuario !== 'Administrador') return toast.error('Acesso restrito a Administradores.')
    const novoStatus = statusAtual === 'Ativo' ? 'Inativo' : 'Ativo'
    const { error } = await supabase.from('usuarios').update({ status: novoStatus }).eq('id', id)
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Status atualizado!')
      carregarDados()
    }
  }

  async function cadastrarCliente(e) {
    e.preventDefault()
    if (!novoCliente.nome || !novoCliente.endereco) return toast.error('Preencha nome e endereço.')
    
    const { cep, ...dadosCliente } = novoCliente;

    const { error } = await supabase.from('clientes').insert([dadosCliente])
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Cliente cadastrado!')
      setNovoCliente({ nome: '', cep: '', endereco: '', telefone: '', funcionario_id: '', status: 'Ativo' })
      carregarDados()
    }
  }

  async function salvarEdicaoCliente(e) {
    e.preventDefault()
    if (tipoUsuario !== 'Administrador') return toast.error('Funcionários padrão não podem editar clientes.')
    const { error } = await supabase.from('clientes').update({ nome: clienteEmEdicao.nome, endereco: clienteEmEdicao.endereco, telefone: clienteEmEdicao.telefone, funcionario_id: clienteEmEdicao.funcionario_id }).eq('id', clienteEmEdicao.id)
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Cliente atualizado!')
      setClienteEmEdicao(null)
      carregarDados()
    }
  }

  async function alternarStatusCliente(id, statusAtual) {
    if (tipoUsuario !== 'Administrador') return toast.error('Funcionários padrão não podem alterar o status de clientes.')
    const novoStatus = statusAtual === 'Desligado' ? 'Ativo' : 'Desligado'
    const { error } = await supabase.from('clientes').update({ status: novoStatus }).eq('id', id)
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Status alterado!')
      carregarDados()
    }
  }

  async function cadastrarOS(e) {
    e.preventDefault()
    if (!novaOS.cliente_id || !novaOS.data_agendamento || !novaOS.funcionario_id) return toast.error('Preencha todos os campos obrigatórios, incluindo o técnico.')
    
    const { error } = await supabase.from('ordens_servico').insert([novaOS])
    if (error) {
      toast.error('Erro: ' + error.message)
    } else {
      toast.success('OS criada com sucesso!')
      const clienteObj = clientes.find(c => c.id === novaOS.cliente_id)
      const tecnicoObj = funcionarios.find(f => f.id === novaOS.funcionario_id)
      gerarMiniOSHTML(clienteObj, tecnicoObj, novaOS)
      setNovaOS({ cliente_id: '', tipo: 'instalacao', data_agendamento: new Date().toISOString().split('T')[0], funcionario_id: '', observacoes: '' })
      carregarDados()
    }
  }

  function gerarMiniOSHTML(cliente, tecnico, os) {
    const htmlMiniOS = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Ordem de Serviço - NetRede</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; background: #fff; }
          .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px; }
          h1 { color: #2563eb; margin: 0; font-size: 22px; }
          .box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 15px; border-radius: 6px; margin-bottom: 15px; }
          .box p { margin: 6px 0; font-size: 14px; }
          .footer { text-align: center; font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>NetRede - Ordem de Serviço</h1>
          <p style="font-size: 12px; color: #64748b; margin: 4px 0;">Comprovante de atendimento técnico</p>
        </div>
        <div class="box">
          <p><strong>Tipo de Serviço:</strong> <span style="text-transform: uppercase; color: #2563eb;">${os.tipo}</span></p>
          <p><strong>Data Agendada:</strong> ${os.data_agendamento.split('-').reverse().join('/')}</p>
          <p><strong>Técnico Responsável:</strong> ${tecnico ? tecnico.nome : 'Não especificado'}</p>
        </div>
        <div class="box">
          <p><strong>Cliente:</strong> ${cliente ? cliente.nome : 'N/A'}</p>
          <p><strong>Endereço:</strong> ${cliente ? cliente.endereco : 'N/A'}</p>
          <p><strong>Telefone:</strong> ${cliente ? (cliente.telefone || 'N/A') : 'N/A'}</p>
        </div>
        <div class="box">
          <p><strong>Observações Técnicas:</strong></p>
          <p style="color: #475569; font-style: italic;">${os.observacoes || 'Nenhuma observação registrada.'}</p>
        </div>
        <div class="footer">
          <p>NetRede Gestão de Clientes e Rede — Emitido em ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      </body>
      </html>
    `
    const blob = new Blob([htmlMiniOS], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `OS_${cliente ? cliente.nome.replace(/\s+/g, '_') : 'Atendimento'}.html`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function registrarPagamento(e) {
    e.preventDefault()
    if (!novoPagamento.cliente_id || !novoPagamento.valor || !novoPagamento.data_vencimento || !novoPagamento.data_pagamento) {
      return toast.error('Preencha todos os campos da cobrança.')
    }
    
    const partesData = novoPagamento.data_vencimento.split('-'); 
    const mesRef = `${partesData[1]}/${partesData[0]}`;

    const payload = {
      cliente_id: novoPagamento.cliente_id,
      valor: parseFloat(novoPagamento.valor),
      data_vencimento: novoPagamento.data_vencimento,
      data_pagamento: `${novoPagamento.data_pagamento}T00:00:00`,
      mes_referencia: mesRef,
      pago: true
    };

    const { error } = await supabase.from('pagamentos').insert([payload]);
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Cobrança registrada com sucesso!')
      setNovoPagamento({ cliente_id: filtroFaturamento || '', valor: '', data_vencimento: new Date().toISOString().split('T')[0], data_pagamento: new Date().toISOString().split('T')[0], pago: true })
      carregarDados()
    }
  }

  async function alternarStatusPagamento(id, statusAtual) {
    const novoStatus = !statusAtual
    const { error } = await supabase.from('pagamentos').update({ pago: novoStatus, data_pagamento: novoStatus ? new Date().toISOString() : null }).eq('id', id)
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Status de pagamento atualizado!')
      carregarDados()
    }
  }

  async function cadastrarMaterial(e) {
    e.preventDefault()
    if (!novoMaterial.nome || !novoMaterial.quantidade) return toast.error('Preencha nome e quantidade.')
    const { error } = await supabase.from('estoque').insert([{ ...novoMaterial, quantidade: parseInt(novoMaterial.quantidade), quantidade_minima: parseInt(novoMaterial.quantidade_minima) }])
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Material adicionado!')
      setNovoMaterial({ nome: '', quantidade: '', unidade: 'un', quantidade_minima: '5' })
      carregarDados()
    }
  }

  async function editarQuantidadeEstoque(id, nome, qtdAtual) {
    if (tipoUsuario !== 'Administrador') return toast.error('Funcionários padrão só podem adicionar itens, não modificar quantidades.')
    const valorDigitado = prompt(`Digite a nova quantidade para "${nome}":`, String(qtdAtual))
    if (valorDigitado === null) return
    const novaQtd = parseInt(valorDigitado, 10)
    if (isNaN(novaQtd) || novaQtd < 0) return toast.error('Quantidade inválida.')
    const { error } = await supabase.from('estoque').update({ quantidade: novaQtd }).eq('id', id)
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Estoque atualizado!')
      carregarDados()
    }
  }

  async function registrarDespesa(e) {
    e.preventDefault()
    if (novaDespesa.categoria === 'Outros' && !novaDespesa.descricao) {
      return toast.error('A descrição é obrigatória para a categoria "Outros".')
    }
    const descricaoFinal = novaDespesa.descricao ? novaDespesa.descricao : novaDespesa.categoria
    const { error } = await supabase.from('despesas').insert([{ ...novaDespesa, descricao: descricaoFinal, valor: parseFloat(novaDespesa.valor) }])
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Despesa registrada!')
      setNovaDespesa({ descricao: '', categoria: 'Gasolina', valor: '', data: new Date().toISOString().split('T')[0], funcionario_id: '', observacoes: '' })
      carregarDados()
    }
  }

  async function removerDespesa(id) {
    if (tipoUsuario !== 'Administrador') return toast.error('Apenas Administradores podem remover despesas.')
    if (!confirm('Remover esta despesa?')) return
    const { error } = await supabase.from('despesas').delete().eq('id', id)
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Removida!')
      carregarDados()
    }
  }

  async function registrarDespesaDiretoria(e) {
    e.preventDefault()
    if (tipoUsuario !== 'Administrador') return toast.error('Acesso restrito a administradores.')
    if (!novaDespesaDiretoria.descricao || !novaDespesaDiretoria.valor || !novaDespesaDiretoria.usuario_id) {
      return toast.error('Preencha todos os campos obrigatórios.')
    }
    const { error } = await supabase.from('despesas_diretoria').insert([{
      ...novaDespesaDiretoria,
      valor: parseFloat(novaDespesaDiretoria.valor)
    }])
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Despesa da diretoria registrada!')
      setNovaDespesaDiretoria({ descricao: '', valor: '', data: new Date().toISOString().split('T')[0], usuario_id: '' })
      carregarDados()
    }
  }

  async function removerDespesaDiretoria(id) {
    if (tipoUsuario !== 'Administrador') return toast.error('Acesso restrito a administradores.')
    if (!confirm('Remover esta despesa da diretoria?')) return
    const { error } = await supabase.from('despesas_diretoria').delete().eq('id', id)
    if (error) toast.error('Erro: ' + error.message)
    else {
      toast.success('Removida!')
      carregarDados()
    }
  }

  const pagamentosFiltradosPeriodo = pagamentos.filter(p => {
    const dataRef = p.data_pagamento ? p.data_pagamento.split('T')[0] : p.data_vencimento;
    if (!dataRef) return false;
    return dataRef >= dataInicioRelatorio && dataRef <= dataFimRelatorio;
  });

  const despesasFiltradasPeriodo = despesas.filter(d => {
    if (!d.data) return false;
    return d.data >= dataInicioRelatorio && d.data <= dataFimRelatorio;
  });

  const despesasDiretoriaFiltradasPeriodo = despesasDiretoria.filter(d => {
    if (!d.data) return false;
    return d.data >= dataInicioRelatorio && d.data <= dataFimRelatorio;
  });

  const ordensFiltradasPeriodo = ordens.filter(o => {
    if (!o.data_agendamento) return false;
    return o.data_agendamento >= dataInicioRelatorio && o.data_agendamento <= dataFimRelatorio;
  });

  const totalFaturadoPeriodo = pagamentosFiltradosPeriodo.filter(p => p.pago).reduce((acc, p) => acc + Number(p.valor || 0), 0);
  const totalDespesasPeriodo = despesasFiltradasPeriodo.reduce((acc, d) => acc + Number(d.valor || 0), 0);
  const totalDespesasDiretoriaPeriodo = despesasDiretoriaFiltradasPeriodo.reduce((acc, d) => acc + Number(d.valor || 0), 0);
  const lucroLiquidoPeriodo = totalFaturadoPeriodo - (totalDespesasPeriodo + totalDespesasDiretoriaPeriodo);
  const valorPendentePeriodo = pagamentosFiltradosPeriodo.filter(p => !p.pago).reduce((acc, p) => acc + Number(p.valor || 0), 0);

  function gerarRelatorioSelecionado() {
    if (tipoUsuario !== 'Administrador') return toast.error('Acesso restrito a administradores.')

    const dataInicioFormatada = dataInicioRelatorio.split('-').reverse().join('/')
    const dataFimFormatada = dataFimRelatorio.split('-').reverse().join('/')

    let conteudoHtml = '';

    if (tipoExportacaoRelatorio === 'completo' || tipoExportacaoRelatorio === 'faturamento') {
      const desempenhoFuncionarios = funcionarios.map(f => {
        const clientesDoFunc = clientes.filter(c => c.funcionario_id === f.id && c.created_at >= dataInicioRelatorio && c.created_at <= dataFimRelatorio + 'T23:59:59').length
        const despesasDoFunc = despesasFiltradasPeriodo.filter(d => d.funcionario_id === f.id).reduce((acc, d) => acc + Number(d.valor || 0), 0)
        const osDoFunc = ordensFiltradasPeriodo.filter(o => o.funcionario_id === f.id).length
        return { nome: f.nome, cargo: f.cargo || f.funcao || 'Auxiliar', clientes: clientesDoFunc, os: osDoFunc, despesas: despesasDoFunc }
      })

      const desempenhoHtml = desempenhoFuncionarios.length === 0 
        ? '<p>Nenhum funcionário registrado.</p>'
        : `<table style="width:100%; border-collapse: collapse; margin-top: 10px;">
             <tr style="background:#f1f5f9;"><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Funcionário</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Cargo</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">Clientes</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">OS Realizadas</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">Total Despesas</th></tr>
             ${desempenhoFuncionarios.map(df => `<tr><td style="padding: 8px; border: 1px solid #cbd5e1;">${df.nome}</td><td style="padding: 8px; border: 1px solid #cbd5e1;">${df.cargo}</td><td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">${df.clientes}</td><td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">${df.os}</td><td style="padding: 8px; border: 1px solid #cbd5e1; text-align: right; color: #e11d48;">R$ ${df.despesas.toFixed(2)}</td></tr>`).join('')}
           </table>`

      const despesasDiretoriaHtml = despesasDiretoriaFiltradasPeriodo.length === 0
        ? '<p>Nenhuma despesa da diretoria no período.</p>'
        : `<table style="width:100%; border-collapse: collapse; margin-top: 10px;">
             <tr style="background:#f1f5f9;"><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Data</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Diretor</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Descrição</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">Valor</th></tr>
             ${despesasDiretoriaFiltradasPeriodo.map(dd => `<tr><td style="padding: 8px; border: 1px solid #cbd5e1;">${dd.data}</td><td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>${dd.usuarios?.nome || 'Diretoria'}</strong></td><td style="padding: 8px; border: 1px solid #cbd5e1;">${dd.descricao}</td><td style="padding: 8px; border: 1px solid #cbd5e1; text-align: right; color: #e11d48; font-weight:bold;">R$ ${Number(dd.valor).toFixed(2)}</td></tr>`).join('')}
           </table>`

      const faturamentoPorCliente = clientes.map(c => {
        const totalPago = pagamentosFiltradosPeriodo
          .filter(p => p.cliente_id === c.id && p.pago)
          .reduce((acc, p) => acc + Number(p.valor || 0), 0)
        return { nome: c.nome, endereco: c.endereco, total: totalPago }
      }).filter(c => c.total > 0).sort((a, b) => b.total - a.total)

      const faturamentoTotalGeral = faturamentoPorCliente.reduce((acc, c) => acc + c.total, 0)
      let faturamentoAcumulado = 0

      const curvaABCLista = faturamentoPorCliente.slice(0, 10).map(c => {
        faturamentoAcumulado += c.total
        const percentualAcumulado = faturamentoTotalGeral > 0 ? (faturamentoAcumulado / faturamentoTotalGeral) * 100 : 0
        let classe = 'C'
        if (percentualAcumulado <= 80) classe = 'A'
        else if (percentualAcumulado <= 95) classe = 'B'
        return { ...c, classe, percentual: percentualAcumulado }
      })

      const curvaABCHtml = curvaABCLista.length === 0
        ? '<p>Sem dados de faturamento pago neste período para Curva ABC.</p>'
        : `<table style="width:100%; border-collapse: collapse; margin-top: 10px;">
             <tr style="background:#f1f5f9;"><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Cliente (Top 10)</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Endereço</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">Total Pago</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">Classe ABC</th></tr>
             ${curvaABCLista.map(cb => `<tr><td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>${cb.nome}</strong></td><td style="padding: 8px; border: 1px solid #cbd5e1; color:#64748b;">${cb.endereco}</td><td style="padding: 8px; border: 1px solid #cbd5e1; text-align: right; color: #059669; font-weight:bold;">R$ ${cb.total.toFixed(2)}</td><td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;"><span style="padding: 3px 8px; border-radius: 4px; font-weight: bold; background: ${cb.classe === 'A' ? '#dcfce7; color:#166534;' : cb.classe === 'B' ? '#fef9c3; color:#854d0e;' : '#f1f5f9; color:#475569;'};">${cb.classe}</span></td></tr>`).join('')}
           </table>`

      conteudoHtml += `
        <div class="card">
          <h2>Resumo Financeiro do Período</h2>
          <div class="grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="stat"><p>Total Faturado</p><h3 style="color: #059669;">R$ ${totalFaturadoPeriodo.toFixed(2)}</h3></div>
            <div class="stat"><p>Despesas Operacionais</p><h3 style="color: #e11d48;">R$ ${totalDespesasPeriodo.toFixed(2)}</h3></div>
            <div class="stat"><p>Despesas da Diretoria</p><h3 style="color: #e11d48;">R$ ${totalDespesasDiretoriaPeriodo.toFixed(2)}</h3></div>
            <div class="stat"><p>Lucro Líquido</p><h3 style="color: #2563eb;">R$ ${lucroLiquidoPeriodo.toFixed(2)}</h3></div>
          </div>
        </div>
        <div class="card">
          <h2>Despesas da Diretoria</h2>
          ${despesasDiretoriaHtml}
        </div>
        <div class="card">
          <h2>Curva ABC de Clientes (Top 10)</h2>
          ${curvaABCHtml}
        </div>
        <div class="card">
          <h2>Desempenho por Funcionário</h2>
          ${desempenhoHtml}
        </div>
      `;
    }

    if (tipoExportacaoRelatorio === 'completo' || tipoExportacaoRelatorio === 'clientes') {
      const listaClientesHtml = clientes.length === 0 
        ? '<p>Nenhum cliente registrado.</p>' 
        : `<table style="width:100%; border-collapse: collapse; margin-top: 10px;">
             <tr style="background:#f1f5f9;"><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Nome</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Endereço</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Telefone</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Responsável</th><th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">Status</th></tr>
             ${clientes.map(c => `<tr><td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>${c.nome}</strong></td><td style="padding: 8px; border: 1px solid #cbd5e1;">${c.endereco}</td><td style="padding: 8px; border: 1px solid #cbd5e1;">${c.telefone || 'N/A'}</td><td style="padding: 8px; border: 1px solid #cbd5e1;">${c.usuarios?.nome || 'Geral'}</td><td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;"><span style="color: ${c.status === 'Desligado' || c.status === 'Inativo' ? '#e11d48' : '#059669'}; font-weight: bold;">${c.status || 'Ativo'}</span></td></tr>`).join('')}
           </table>`

      conteudoHtml += `
        <div class="card">
          <h2>Base Completa de Clientes (${clientes.length})</h2>
          ${listaClientesHtml}
        </div>
      `;
    }

    const htmlRelatorio = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Relatório - NetRede</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 800px; margin: auto; background: #f9f9f9; }
          .card { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-bottom: 20px; }
          h1 { color: #2563eb; text-align: center; }
          h2 { border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; color: #1e293b; font-size: 18px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .stat { background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #2563eb; }
          .stat p { margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold; }
          .stat h3 { margin: 5px 0 0 0; font-size: 20px; color: #0f172a; }
          .footer { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>NetRede - Relatório de Gestão (${tipoExportacaoRelatorio.toUpperCase()})</h1>
          <p style="text-align: center; color: #64748b;">Período: <strong>${dataInicioFormatada} até ${dataFimFormatada}</strong> | Emitido em: ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        ${conteudoHtml}
        <div class="footer"><p>Gerado automaticamente pelo Sistema NetRede Gestão.</p></div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlRelatorio], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Relatorio_${tipoExportacaoRelatorio}_${dataInicioRelatorio}_a_${dataFimRelatorio}.html`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Relatório gerado com sucesso!')
  }

  function exportarListaClientesFiltrados() {
    const htmlLista = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Lista de Clientes Filtrados - NetRede</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 800px; margin: auto; background: #fff; }
          h1 { color: #2563eb; text-align: center; }
          p { text-align: center; color: #64748b; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 8px 10px; border: 1px solid #cbd5e1; font-size: 13px; text-align: left; }
          th { background: #f1f5f9; color: #1e293b; }
          .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 30px; }
        </style>
      </head>
      <body>
        <h1>NetRede - Lista de Clientes (${filtroStatusCliente.toUpperCase()})</h1>
        <p>Total de registros encontrados: <strong>${clientesFiltrados.length}</strong> | Emitido em: ${new Date().toLocaleDateString('pt-BR')}</p>
        <table>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Status</th>
          </tr>
          ${clientesFiltrados.map(c => `
            <tr>
              <td><strong>${c.nome}</strong></td>
              <td>${c.endereco}</td>
              <td>${c.telefone || 'N/A'}</td>
              <td>${c.status || 'Ativo'}</td>
            </tr>
          `).join('')}
        </table>
        <div class="footer"><p>Gerado pelo Sistema NetRede Gestão.</p></div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlLista], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Lista_Clientes_${filtroStatusCliente}_${new Date().toISOString().split('T')[0]}.html`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Lista de clientes exportada com sucesso!')
  }

  function verificarEstadoCliente(clienteId) {
    const cobrancasCliente = pagamentos.filter(p => p.cliente_id === clienteId);
    if (cobrancasCliente.length === 0) return 'em_dia';
    
    const pendentes = cobrancasCliente.filter(p => !p.pago);
    if (pendentes.length === 0) return 'em_dia';

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    for (const p of pendentes) {
      const dataVenc = new Date(p.data_vencimento + 'T00:00:00');
      if (dataVenc < hoje) return 'atrasado';
    }
    return 'em_dia';
  }

  const clientesFiltrados = clientes.filter(c => {
    const matchPesquisa = c.nome.toLowerCase().includes(pesquisaCliente.toLowerCase()) || 
                          c.endereco.toLowerCase().includes(pesquisaCliente.toLowerCase()) || 
                          (c.telefone && c.telefone.includes(pesquisaCliente));
    if (!matchPesquisa) return false;

    const isAtivo = c.status !== 'Desligado' && c.status !== 'Inativo';
    const estadoPag = verificarEstadoCliente(c.id);

    if (filtroStatusCliente === 'ativos') return isAtivo;
    if (filtroStatusCliente === 'inativos') return !isAtivo;
    if (filtroStatusCliente === 'em_dia') return estadoPag === 'em_dia' && isAtivo;
    if (filtroStatusCliente === 'atrasados') return estadoPag === 'atrasado' && isAtivo;

    return true; 
  });

  const pagamentosFiltradosPorStatus = pagamentos.filter(p => {
    if (filtroFaturamento && p.cliente_id !== filtroFaturamento) return false;

    const nomeCliente = p.clientes?.nome || '';
    const matchPesquisa = nomeCliente.toLowerCase().includes(pesquisaFaturamento.toLowerCase()) || 
                          p.mes_referencia.includes(pesquisaFaturamento);
    if (!matchPesquisa) return false;

    const statusDet = obterStatusPagamentoDetalhado(p);
    const isAtivo = p.clientes?.status !== 'Desligado' && p.clientes?.status !== 'Inativo';

    if (filtroStatusFaturamento === 'ativos') return isAtivo;
    if (filtroStatusFaturamento === 'inativos') return !isAtivo;
    if (filtroStatusFaturamento === 'em_dia') return p.pago && statusDet.texto.includes('Dia');
    if (filtroStatusFaturamento === 'atrasados') return !p.pago || statusDet.texto.includes('Atrasado') || statusDet.texto.includes('Atraso');

    return true;
  });

  function obterStatusPagamentoDetalhado(p) {
    if (!p.pago) {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const venc = new Date(p.data_vencimento + 'T00:00:00');
      if (venc < hoje) {
        const diffDias = Math.ceil(Math.abs(hoje - venc) / (1000 * 60 * 60 * 24));
        return { texto: `Atrasado há ${diffDias} dia(s)`, estilo: 'bg-rose-100 text-rose-800 font-bold border border-rose-200' };
      }
      return { texto: 'Pendente (No prazo)', estilo: 'bg-amber-100 text-amber-800 font-medium' };
    }

    if (p.data_pagamento && p.data_vencimento) {
      const dataPag = new Date(p.data_pagamento.split('T')[0] + 'T00:00:00');
      const dataVenc = new Date(p.data_vencimento + 'T00:00:00');
      if (dataPag > dataVenc) {
        return { texto: 'Pago com Atraso', estilo: 'bg-orange-100 text-orange-800 font-bold border border-orange-200' };
      }
    }
    return { texto: 'Pago em Dia', estilo: 'bg-emerald-100 text-emerald-800 font-medium' };
  }

  function obterStatusPagamento(clienteId) {
    const cobrancasCliente = pagamentos.filter(p => p.cliente_id === clienteId)
    if (cobrancasCliente.length === 0) return { texto: 'Sem faturas', estilo: 'bg-slate-100 text-slate-600 border border-slate-200' }
    const pendentes = cobrancasCliente.filter(p => !p.pago)
    if (pendentes.length === 0) return { texto: 'Em dia', estilo: 'bg-emerald-100 text-emerald-800 font-medium' }

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

    if (temAtraso) return { texto: `Atrasado há ${maiorAtrasoDias} dia(s)`, estilo: 'bg-rose-100 text-rose-800 font-bold border border-rose-200 shadow-sm' }
    else return { texto: 'Pendente (No prazo)', estilo: 'bg-amber-100 text-amber-800 font-medium' }
  }

  if (authLoading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300">Carregando sistema...</div>

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
              <input type="email" value={emailAuth} onChange={e => setEmailAuth(e.target.value)} placeholder="exemplo@netrede.com" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-blue-500" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Senha</label>
              <input type="password" value={passwordAuth} onChange={e => setPasswordAuth(e.target.value)} placeholder="••••••••" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-blue-500" required />
            </div>
            <button type="submit" disabled={submittingAuth} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-sm transition mt-2 shadow-lg shadow-blue-600/30">
              {submittingAuth ? 'Verificando...' : 'Entrar no Sistema'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const abasDisponiveis = [
    { id: 'clientes', icon: IconClientes, label: `Clientes (${clientes.length})`, titulo: 'Gestão de Clientes', desc: 'Registro, consulta e acompanhamento dos assinantes da rede.' },
    { id: 'os', icon: IconOS, label: `Instalações & OS (${ordens.length})`, titulo: 'Ordens de Serviço & Atendimentos', desc: 'Controle de instalações, religamentos, manutenções e emissão de mini OS.' },
    { id: 'faturamento', icon: IconFaturamento, label: `Faturamento (${pagamentos.length})`, titulo: 'Controle de Faturamento', desc: 'Registro e marcação presencial de mensalidades e faturas pagas.' },
    { id: 'estoque', icon: IconEstoque, label: `Estoque (${estoque.length})`, titulo: 'Gestão de Estoque', desc: 'Controle de materiais, equipamentos e alertas de saldo baixo.' },
    { id: 'despesas', icon: IconDespesas, label: `Despesas (${despesas.length})`, titulo: 'Despesas Operacionais', desc: 'Registro de gastos com gasolina, almoços, manutenção e campo.' }
  ];

  if (tipoUsuario === 'Administrador') {
    abasDisponiveis.push({ id: 'diretoria', icon: IconDiretoria, label: `Despesas Diretoria`, titulo: 'Despesas da Diretoria', desc: 'Registro e acompanhamento de gastos administrativos e da diretoria.' });
    abasDisponiveis.push({ id: 'funcionarios', icon: IconUsuarios, label: `Funcionários (${funcionarios.length})`, titulo: 'Gestão de Funcionários', desc: 'Controle de equipe, e-mails de acesso e definição de cargos.' });
    abasDisponiveis.push({ id: 'relatorios', icon: IconRelatorio, label: `Relatórios`, titulo: 'Relatórios de Gestão', desc: 'Indicadores financeiros consolidados, Curva ABC, desempenho técnico e exportação em HTML.' });
  }

  const abaAtualInfo = abasDisponiveis.find(a => a.id === abaAtiva) || abasDisponiveis[0];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      <Toaster position="top-right" />

      {/* Menu Lateral Fixo / Gaveta */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 ${menuLateralAberto ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div>
          <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">NetRede</h1>
              <p className="text-xs text-slate-400 mt-1">Usuário: <strong className="text-slate-200">{tipoUsuario}</strong></p>
            </div>
            <button onClick={() => setMenuLateralAberto(false)} className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 transition">
              <IconClose />
            </button>
          </div>

          <nav className="space-y-1.5">
            {abasDisponiveis.map(aba => (
              <button
                key={aba.id}
                onClick={() => mudarAba(aba.id)}
                className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-semibold transition ${abaAtiva === aba.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
              >
                <aba.icon /> {aba.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button onClick={() => { carregarDados(); setMenuLateralAberto(false); }} className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 px-4 rounded-xl transition border border-slate-700">
            <IconRefresh /> Atualizar Dados
          </button>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold py-2.5 px-4 rounded-xl transition border border-rose-800/50">
            <IconLogout /> Encerrar Sessão
          </button>
        </div>
      </aside>

      {menuLateralAberto && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMenuLateralAberto(false)}></div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 md:ml-72 p-4 md:p-8 min-h-screen flex flex-col">
        
        <div className="md:hidden bg-slate-900 text-white p-4 rounded-xl mb-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuLateralAberto(true)} className="p-2 bg-slate-800 text-white rounded-lg border border-slate-700">
              <IconMenu />
            </button>
            <div>
              <h2 className="font-bold text-blue-400">NetRede</h2>
              <p className="text-[11px] text-slate-300 uppercase font-semibold">{tipoUsuario}</p>
            </div>
          </div>
          <button onClick={carregarDados} className="p-2 bg-slate-800 text-slate-200 rounded-lg border border-slate-700">
            <IconRefresh />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col">
          
          <div className="mb-6 pb-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">{abaAtualInfo.titulo}</h2>
              <p className="text-xs md:text-sm text-slate-500 mt-0.5">{abaAtualInfo.desc}</p>
            </div>
            {abaAtiva === 'clientes' && (
              <button onClick={exportarListaClientesFiltrados} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-lg shadow transition flex items-center gap-2 whitespace-nowrap">
                📄 Exportar Lista Filtrada (.html)
              </button>
            )}
          </div>

          <div className="flex-1">
            {loading ? <div className="text-center py-12 text-slate-500 font-medium">Carregando informações...</div> : (
              <>
                {/* --- ABA DESPESAS DA DIRETORIA --- */}
                {abaAtiva === 'diretoria' && tipoUsuario === 'Administrador' && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <h3 className="font-bold text-slate-800 mb-3 text-sm">Registrar Despesa da Diretoria</h3>
                      <form onSubmit={registrarDespesaDiretoria} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <input type="text" placeholder="Descrição do gasto *" value={novaDespesaDiretoria.descricao} onChange={e => setNovaDespesaDiretoria({ ...novaDespesaDiretoria, descricao: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400 md:col-span-2" required />
                        <input type="number" step="0.01" placeholder="Valor (R$) *" value={novaDespesaDiretoria.valor} onChange={e => setNovaDespesaDiretoria({ ...novaDespesaDiretoria, valor: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" required />
                        <input type="date" value={novaDespesaDiretoria.data} onChange={e => setNovaDespesaDiretoria({ ...novaDespesaDiretoria, data: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required />
                        <select value={novaDespesaDiretoria.usuario_id} onChange={e => setNovaDespesaDiretoria({ ...novaDespesaDiretoria, usuario_id: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required>
                          <option value="">Selecione o Diretor *</option>
                          {funcionarios.map(f => <option key={f.id} value={f.id}>{f.nome} ({f.cargo || f.funcao || 'Diretor'})</option>)}
                        </select>
                        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-md text-sm transition md:col-span-5">+ Registrar Despesa Diretoria</button>
                      </form>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b">
                            <th className="p-3">Data</th>
                            <th className="p-3">Diretor / Usuário</th>
                            <th className="p-3">Descrição</th>
                            <th className="p-3">Valor</th>
                            <th className="p-3 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {despesasDiretoria.length === 0 ? <tr><td colSpan="5" className="p-6 text-center text-slate-400">Nenhuma despesa da diretoria registrada.</td></tr> : despesasDiretoria.map(dd => (
                            <tr key={dd.id} className="hover:bg-slate-50 transition">
                              <td className="p-3 text-slate-600 font-medium">{dd.data}</td>
                              <td className="p-3 font-semibold text-slate-800">{dd.usuarios?.nome || 'Diretoria'}</td>
                              <td className="p-3 text-slate-600">{dd.descricao}</td>
                              <td className="p-3 font-bold text-purple-700">R$ {Number(dd.valor).toFixed(2)}</td>
                              <td className="p-3 text-center">
                                <button onClick={() => removerDespesaDiretoria(dd.id)} className="px-2.5 py-1 text-xs font-semibold rounded border border-rose-300 text-rose-600 hover:bg-rose-50 transition">Remover</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* --- ABA FUNCIONÁRIOS --- */}
                {abaAtiva === 'funcionarios' && tipoUsuario === 'Administrador' && (
                  <div className="space-y-6">
                    <form onSubmit={registrarFuncionario} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-5 gap-3">
                      <input type="text" placeholder="Nome *" value={novoFuncionario.nome} onChange={e => setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" required />
                      <input type="email" placeholder="E-mail de acesso *" value={novoFuncionario.email} onChange={e => setNovoFuncionario({ ...novoFuncionario, email: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" required />
                      <select value={novoFuncionario.cargo} onChange={e => setNovoFuncionario({ ...novoFuncionario, cargo: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800">
                        <option value="Responsável">Responsável (Admin)</option>
                        <option value="Auxiliar">Auxiliar (Padrão)</option>
                      </select>
                      <input type="text" placeholder="Telefone" value={novoFuncionario.telefone} onChange={e => setNovoFuncionario({ ...novoFuncionario, telefone: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" />
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition">+ Registrar</button>
                    </form>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b">
                            <th className="p-3">Nome</th>
                            <th className="p-3">E-mail</th>
                            <th className="p-3">Cargo</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {funcionarios.length === 0 ? <tr><td colSpan="5" className="p-6 text-center text-slate-400">Nenhum funcionário registrado.</td></tr> : funcionarios.map(f => (
                            <tr key={f.id} className="hover:bg-slate-50 transition">
                              <td className="p-3 font-semibold text-slate-800">{f.nome}</td>
                              <td className="p-3 text-slate-600">{f.email || '-'}</td>
                              <td className="p-3 text-slate-600">{f.cargo || f.funcao || 'Auxiliar'}</td>
                              <td className="p-3"><span className={`px-2.5 py-1 text-xs font-bold rounded-full ${f.status === 'Inativo' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>{f.status || 'Ativo'}</span></td>
                              <td className="p-3 text-center">
                                <button onClick={() => alternarStatusFuncionario(f.id, f.status || 'Ativo')} className={`px-2.5 py-1 text-xs font-semibold rounded border transition ${f.status === 'Inativo' ? 'border-emerald-600 text-emerald-600' : 'border-rose-500 text-rose-600'}`}>
                                  {f.status === 'Inativo' ? 'Ativar' : 'Desativar'}
                                </button>
                              </td>
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
                    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                      <div className="relative flex-1 w-full">
                        <input type="text" placeholder="Pesquisar cliente por nome, endereço ou telefone..." value={pesquisaCliente} onChange={e => setPesquisaCliente(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400 transition" />
                      </div>
                      <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
                        <button onClick={() => setFiltroStatusCliente('todos')} className={`px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${filtroStatusCliente === 'todos' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Todos</button>
                        <button onClick={() => setFiltroStatusCliente('ativos')} className={`px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${filtroStatusCliente === 'ativos' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Ativos</button>
                        <button onClick={() => setFiltroStatusCliente('inativos')} className={`px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${filtroStatusCliente === 'inativos' ? 'bg-rose-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Inativos</button>
                        <button onClick={() => setFiltroStatusCliente('em_dia')} className={`px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${filtroStatusCliente === 'em_dia' ? 'bg-teal-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Em Dia</button>
                        <button onClick={() => setFiltroStatusCliente('atrasados')} className={`px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${filtroStatusCliente === 'atrasados' ? 'bg-amber-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Atrasados</button>
                      </div>
                    </div>
                    
                    {clienteEmEdicao ? (
                      tipoUsuario === 'Administrador' ? (
                        <form onSubmit={salvarEdicaoCliente} className="bg-blue-50 p-4 rounded-lg border border-blue-200 grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div><label className="text-xs font-bold text-blue-900 block mb-1">Nome *</label><input type="text" value={clienteEmEdicao.nome} onChange={e => setClienteEmEdicao({ ...clienteEmEdicao, nome: e.target.value })} className="w-full p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required /></div>
                          <div><label className="text-xs font-bold text-blue-900 block mb-1">Endereço *</label><input type="text" value={clienteEmEdicao.endereco} onChange={e => setClienteEmEdicao({ ...clienteEmEdicao, endereco: e.target.value })} className="w-full p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required /></div>
                          <div><label className="text-xs font-bold text-blue-900 block mb-1">Telefone</label><input type="text" value={clienteEmEdicao.telefone || ''} onChange={e => setClienteEmEdicao({ ...clienteEmEdicao, telefone: e.target.value })} className="w-full p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" /></div>
                          <div>
                            <label className="text-xs font-bold text-blue-900 block mb-1">Funcionário Responsável</label>
                            <select value={clienteEmEdicao.funcionario_id || ''} onChange={e => setClienteEmEdicao({ ...clienteEmEdicao, funcionario_id: e.target.value })} className="w-full p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800">
                              <option value="">Selecione...</option>
                              {funcionarios.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                            </select>
                          </div>
                          <div className="flex items-end gap-2 md:col-span-4"><button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition">Salvar Alterações</button><button type="button" onClick={() => setClienteEmEdicao(null)} className="flex-1 bg-slate-400 hover:bg-slate-500 text-white font-bold py-2.5 rounded-md text-sm transition">Cancelar</button></div>
                        </form>
                      ) : null
                    ) : (
                      <form onSubmit={cadastrarCliente} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-6 gap-3">
                        <input type="text" placeholder="Nome do Cliente *" value={novoCliente.nome} onChange={e => setNovoCliente({ ...novoCliente, nome: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" required />
                        
                        <input type="text" placeholder="CEP (Opcional)" maxLength="8" value={novoCliente.cep || ''} onChange={e => {
                          const val = e.target.value;
                          setNovoCliente({ ...novoCliente, cep: val });
                          if (val.length === 8) buscarCep(val);
                        }} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" />

                        <input type="text" placeholder="Endereço (Rua, Nº) *" value={novoCliente.endereco} onChange={e => setNovoCliente({ ...novoCliente, endereco: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400 md:col-span-2" required />
                        
                        <input type="text" placeholder="Telefone / Contato" value={novoCliente.telefone} onChange={e => setNovoCliente({ ...novoCliente, telefone: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" />
                        
                        <select value={novoCliente.funcionario_id} onChange={e => setNovoCliente({ ...novoCliente, funcionario_id: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800">
                          <option value="">Funcionário Resp. *</option>
                          {funcionarios.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                        </select>

                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition md:col-span-6">+ Cadastrar Cliente</button>
                      </form>
                    )}

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b">
                            <th className="p-3">Nome</th>
                            <th className="p-3">Endereço</th>
                            <th className="p-3">Telefone</th>
                            <th className="p-3">Funcionário Resp.</th>
                            <th className="p-3">Financeiro</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {clientesFiltrados.length === 0 ? <tr><td colSpan="7" className="p-6 text-center text-slate-400">Nenhum cliente encontrado com este filtro.</td></tr> : clientesFiltrados.map(c => {
                            const statusPag = obterStatusPagamento(c.id)
                            return (
                              <tr key={c.id} className="hover:bg-slate-50 transition">
                                <td className="p-3 font-semibold text-slate-800">{c.nome}</td>
                                <td className="p-3 text-slate-600">{c.endereco}</td>
                                <td className="p-3 text-slate-600">{c.telefone || '-'}</td>
                                <td className="p-3 font-medium text-blue-600">{c.usuarios?.nome || 'Não atribuído'}</td>
                                <td className="p-3">
                                  <button onClick={() => abrirFaturamentoCliente(c.id)} className={`px-2.5 py-1 text-xs rounded-full cursor-pointer hover:opacity-80 transition ${statusPag.estilo}`}>
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
                                    <button onClick={() => abrirFaturamentoCliente(c.id)} className="px-2.5 py-1 text-xs font-semibold rounded border border-amber-500 text-amber-600 hover:bg-amber-50 transition">Faturas</button>
                                    {tipoUsuario === 'Administrador' && (
                                      <>
                                        <button onClick={() => setClienteEmEdicao(c)} className="px-2.5 py-1 text-xs font-semibold rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">Editar</button>
                                        <button onClick={() => alternarStatusCliente(c.id, c.status || 'Ativo')} className={`px-2.5 py-1 text-xs font-semibold rounded border transition ${c.status === 'Desligado' ? 'border-emerald-600 text-emerald-600' : 'border-rose-500 text-rose-600'}`}>
                                          {c.status === 'Desligado' ? 'Reativar' : 'Desligar'}
                                        </button>
                                      </>
                                    )}
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
                      <select value={novaOS.cliente_id} onChange={e => setNovaOS({ ...novaOS, cliente_id: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required>
                        <option value="">Selecione o Cliente *</option>
                        {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                      </select>

                      <select value={novaOS.tipo} onChange={e => setNovaOS({ ...novaOS, tipo: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800">
                        <option value="instalacao">Instalação</option>
                        <option value="religamento">Religamento</option>
                        <option value="manutencao">Manutenção</option>
                      </select>

                      <input type="date" value={novaOS.data_agendamento} onChange={e => setNovaOS({ ...novaOS, data_agendamento: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required />

                      <select value={novaOS.funcionario_id} onChange={e => setNovaOS({ ...novaOS, funcionario_id: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required>
                        <option value="">Técnico Responsável *</option>
                        {funcionarios.map(f => <option key={f.id} value={f.id}>{f.nome} ({f.cargo || f.funcao || 'Auxiliar'})</option>)}
                      </select>

                      <input type="text" placeholder="Observações técnicas" value={novaOS.observacoes} onChange={e => setNovaOS({ ...novaOS, observacoes: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400 md:col-span-2" />

                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition md:col-span-3">+ Criar Ordem de Serviço e Gerar Mini OS</button>
                    </form>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b">
                            <th className="p-3">Cliente</th>
                            <th className="p-3">Tipo</th>
                            <th className="p-3">Data Agendada</th>
                            <th className="p-3">Técnico Resp.</th>
                            <th className="p-3">Observações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {ordens.length === 0 ? <tr><td colSpan="5" className="p-4 text-center text-slate-400">Nenhuma ordem registrada.</td></tr> : ordens.map(o => (
                            <tr key={o.id} className="hover:bg-slate-50 transition">
                              <td className="p-3 font-semibold text-slate-800">{o.clientes?.nome || 'Removido'}</td>
                              <td className="p-3 font-medium capitalize text-blue-700">{o.tipo}</td>
                              <td className="p-3 text-slate-600">{o.data_agendamento}</td>
                              <td className="p-3 font-medium text-slate-700">{o.usuarios?.nome || 'Não atribuído'}</td>
                              <td className="p-3 text-slate-500 italic">{o.observacoes || '-'}</td>
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
                    {filtroFaturamento && (
                      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg flex justify-between items-center text-sm shadow-sm">
                        <span>Faturas do cliente: <strong>{clientes.find(c => c.id === filtroFaturamento)?.nome}</strong></span>
                        <button onClick={limparFiltroFaturamento} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-bold transition">Limpar Filtro</button>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                      <div className="relative flex-1 w-full">
                        <input type="text" placeholder="Pesquisar por nome do cliente ou mês (ex: 10/2026)..." value={pesquisaFaturamento} onChange={e => setPesquisaFaturamento(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400 transition" />
                      </div>
                      <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
                        <button onClick={() => setFiltroStatusFaturamento('todos')} className={`px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${filtroStatusFaturamento === 'todos' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Todas</button>
                        <button onClick={() => setFiltroStatusFaturamento('ativos')} className={`px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${filtroStatusFaturamento === 'ativos' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Ativos</button>
                        <button onClick={() => setFiltroStatusFaturamento('inativos')} className={`px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${filtroStatusFaturamento === 'inativos' ? 'bg-rose-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Inativos</button>
                        <button onClick={() => setFiltroStatusFaturamento('em_dia')} className={`px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${filtroStatusFaturamento === 'em_dia' ? 'bg-teal-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Em Dia</button>
                        <button onClick={() => setFiltroStatusFaturamento('atrasados')} className={`px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${filtroStatusFaturamento === 'atrasados' ? 'bg-amber-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Atrasados</button>
                      </div>
                    </div>

                    <form onSubmit={registrarPagamento} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-5 gap-3">
                      <select value={novoPagamento.cliente_id} onChange={e => setNovoPagamento({ ...novoPagamento, cliente_id: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required>
                        <option value="">Selecione o Cliente *</option>
                        {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                      </select>

                      <input type="number" step="0.01" placeholder="Valor (R$) *" value={novoPagamento.valor} onChange={e => setNovoPagamento({ ...novoPagamento, valor: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" required />

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Data de Vencimento *</label>
                        <input type="date" value={novoPagamento.data_vencimento} onChange={e => setNovoPagamento({ ...novoPagamento, data_vencimento: e.target.value })} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Data do Pagamento *</label>
                        <input type="date" value={novoPagamento.data_pagamento} onChange={e => setNovoPagamento({ ...novoPagamento, data_pagamento: e.target.value })} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required />
                      </div>

                      <div className="flex items-end">
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition">+ Registrar Recebimento</button>
                      </div>
                    </form>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b">
                            <th className="p-3">Cliente</th>
                            <th className="p-3">Mês Ref.</th>
                            <th className="p-3">Valor</th>
                            <th className="p-3">Vencimento</th>
                            <th className="p-3">Data Pagamento</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {pagamentosFiltradosPorStatus.length === 0 ? <tr><td colSpan="7" className="p-4 text-center text-slate-400">Nenhuma cobrança encontrada com este filtro.</td></tr> : pagamentosFiltradosPorStatus.map(p => {
                            const statusDet = obterStatusPagamentoDetalhado(p);
                            return (
                              <tr key={p.id} className="hover:bg-slate-50 transition">
                                <td className="p-3 font-semibold text-slate-800">{p.clientes?.nome || 'Removido'}</td>
                                <td className="p-3 text-slate-600">{p.mes_referencia}</td>
                                <td className="p-3 font-bold text-slate-800">R$ {Number(p.valor).toFixed(2)}</td>
                                <td className="p-3 text-slate-600">{p.data_vencimento}</td>
                                <td className="p-3 text-slate-600">{p.data_pagamento ? p.data_pagamento.split('T')[0] : '-'}</td>
                                <td className="p-3"><span className={`px-2.5 py-1 text-xs rounded-full ${statusDet.estilo}`}>{statusDet.texto}</span></td>
                                <td className="p-3 text-center">
                                  <button onClick={() => alternarStatusPagamento(p.id, p.pago)} className={`px-3 py-1.5 text-xs font-bold rounded transition text-white ${p.pago ? 'bg-slate-500 hover:bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}>{p.pago ? 'Desfazer' : 'Marcar Pago'}</button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* --- ABA ESTOQUE --- */}
                {abaAtiva === 'estoque' && (
                  <div className="space-y-6">
                    <form onSubmit={cadastrarMaterial} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-5 gap-3">
                      <input type="text" placeholder="Nome do Material *" value={novoMaterial.nome} onChange={e => setNovoMaterial({ ...novoMaterial, nome: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400 md:col-span-2" required />
                      <input type="number" placeholder="Qtd. Inicial *" value={novoMaterial.quantidade} onChange={e => setNovoMaterial({ ...novoMaterial, quantidade: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" required />
                      <select value={novoMaterial.unidade} onChange={e => setNovoMaterial({ ...novoMaterial, unidade: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800"><option value="un">Unidades (un)</option><option value="metros">Metros (m)</option><option value="caixas">Caixas (cx)</option><option value="pacotes">Pacotes (pct)</option></select>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md text-sm transition">+ Novo Material</button>
                    </form>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead><tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b"><th className="p-3">Material / Item</th><th className="p-3">Unidade</th><th className="p-3">Qtd. em Estoque</th><th className="p-3">Status do Saldo</th><th className="p-3 text-center">Ação</th></tr></thead>
                        <tbody className="divide-y divide-slate-200">
                          {estoque.length === 0 ? <tr><td colSpan="5" className="p-4 text-center text-slate-400">Nenhum material registrado.</td></tr> : estoque.map(item => {
                            const alerta = item.quantidade <= item.quantidade_minima
                            return (
                              <tr key={item.id} className="hover:bg-slate-50 transition">
                                <td className="p-3 font-semibold text-slate-800">{item.nome}</td><td className="p-3 text-slate-500 uppercase text-xs font-bold">{item.unidade}</td><td className="p-3 font-bold text-base text-slate-900">{item.quantidade}</td>
                                <td className="p-3"><span className={`px-2.5 py-1 text-xs font-bold rounded-full ${alerta ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{alerta ? 'Estoque Baixo' : 'Normal'}</span></td>
                                <td className="p-3 text-center">
                                  {tipoUsuario === 'Administrador' ? (
                                    <button onClick={() => editarQuantidadeEstoque(item.id, item.nome, item.quantidade)} className="px-3 py-1.5 text-xs font-semibold rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">Editar Qtd</button>
                                  ) : <span className="text-xs text-slate-400 italic">Só Leitura</span>}
                                </td>
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
                    <form onSubmit={registrarDespesa} className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-6 gap-3">
                      <input 
                        type="text" 
                        placeholder={novaDespesa.categoria === 'Outros' ? "Descrição Obrigatória *" : "Descrição (Opcional)"} 
                        value={novaDespesa.descricao} 
                        onChange={e => setNovaDespesa({ ...novaDespesa, descricao: e.target.value })} 
                        className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" 
                        required={novaDespesa.categoria === 'Outros'}
                      />
                      <select value={novaDespesa.categoria} onChange={e => setNovaDespesa({ ...novaDespesa, categoria: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800"><option value="Gasolina">Gasolina</option><option value="Almoço">Almoço</option><option value="Manutenção">Manutenção</option><option value="Outros">Outros</option></select>
                      <input type="number" step="0.01" placeholder="Valor (R$) *" value={novaDespesa.valor} onChange={e => setNovaDespesa({ ...novaDespesa, valor: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800 placeholder:text-slate-400" required />
                      <input type="date" value={novaDespesa.data} onChange={e => setNovaDespesa({ ...novaDespesa, data: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800" required />
                      <select value={novaDespesa.funcionario_id} onChange={e => setNovaDespesa({ ...novaDespesa, funcionario_id: e.target.value })} className="p-2.5 border border-slate-300 rounded-md text-sm outline-blue-600 bg-white text-slate-800">
                        <option value="">Funcionário...</option>
                        {funcionarios.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                      </select>
                      <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-md text-sm transition">+ Registrar</button>
                    </form>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead><tr className="bg-slate-100 text-slate-700 uppercase text-xs border-b"><th className="p-3">Data</th><th className="p-3">Descrição</th><th className="p-3">Categoria</th><th className="p-3">Funcionário</th><th className="p-3">Valor</th><th className="p-3 text-center">Ação</th></tr></thead>
                        <tbody className="divide-y divide-slate-200">
                          {despesas.length === 0 ? <tr><td colSpan="6" className="p-4 text-center text-slate-400">Nenhuma despesa registrada.</td></tr> : despesas.map(d => (
                            <tr key={d.id} className="hover:bg-slate-50 transition">
                              <td className="p-3 text-slate-600 font-medium">{d.data}</td>
                              <td className="p-3 font-semibold text-slate-800">{d.descricao}</td>
                              <td className="p-3"><span className={`px-2.5 py-1 text-xs font-bold rounded-full ${d.categoria === 'Gasolina' ? 'bg-amber-100 text-amber-800' : d.categoria === 'Almoço' ? 'bg-orange-100 text-orange-800' : 'bg-slate-200 text-slate-700'}`}>{d.categoria}</span></td>
                              <td className="p-3 font-medium text-slate-700">{d.usuarios?.nome || 'Geral'}</td>
                              <td className="p-3 font-bold text-rose-600">R$ {Number(d.valor).toFixed(2)}</td>
                              <td className="p-3 text-center">
                                {tipoUsuario === 'Administrador' && (
                                  <button onClick={() => removerDespesa(d.id)} className="px-2.5 py-1 text-xs font-semibold rounded border border-rose-300 text-rose-600 hover:bg-rose-50 transition">Remover</button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* --- ABA RELATÓRIOS --- */}
                {abaAtiva === 'relatorios' && tipoUsuario === 'Administrador' && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">Configuração do Relatório</h3>
                        <p className="text-xs text-slate-500">Selecione o período e o que deseja incluir no documento exportado.</p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block">Tipo de Relatório:</label>
                          <select value={tipoExportacaoRelatorio} onChange={e => setTipoExportacaoRelatorio(e.target.value)} className="p-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 font-semibold">
                            <option value="completo">Relatório Completo</option>
                            <option value="faturamento">Apenas Faturamento & Financeiro</option>
                            <option value="clientes">Apenas Clientes</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block">De:</label>
                          <input type="date" value={dataInicioRelatorio} onChange={e => setDataInicioRelatorio(e.target.value)} className="p-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block">Até:</label>
                          <input type="date" value={dataFimRelatorio} onChange={e => setDataFimRelatorio(e.target.value)} className="p-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800" />
                        </div>
                        <button onClick={gerarRelatorioSelecionado} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow transition flex items-center gap-2">
                          📥 Salvar Relatório (.html)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Faturado</p><p className="text-xl font-black text-emerald-600 mt-2">R$ {totalFaturadoPeriodo.toFixed(2)}</p></div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Desp. Operacionais</p><p className="text-xl font-black text-rose-600 mt-2">R$ {totalDespesasPeriodo.toFixed(2)}</p></div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Desp. Diretoria</p><p className="text-xl font-black text-purple-600 mt-2">R$ {totalDespesasDiretoriaPeriodo.toFixed(2)}</p></div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Lucro Líquido</p><p className={`text-xl font-black mt-2 ${lucroLiquidoPeriodo >= 0 ? 'text-blue-600' : 'text-rose-700'}`}>R$ {lucroLiquidoPeriodo.toFixed(2)}</p></div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pendentes</p><p className="text-xl font-black text-amber-600 mt-2">R$ {valorPendentePeriodo.toFixed(2)}</p></div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}