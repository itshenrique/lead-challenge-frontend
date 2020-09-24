import axios from 'axios';

const BUSCAR_LEADS = '/buscar/leads';
const CADASTRAR_USUARIO = '/cadastrar/usuario';
const CADASTRAR_LEAD = '/cadastrar/lead';
const CONFIRMAR_DADOS = '/atualizar/dados';
const AGENDAR_REUNIAO = '/atualizar/reuniao';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const buscarLeads = async (token) => {
  const headers = { Authorization: token };
  return api.get(BUSCAR_LEADS, { headers });
};

export const cadastrarUsuario = async (user) => {
  const body = {
    username: user.username,
    password: user.password,
  };
  return api.post(CADASTRAR_USUARIO, body);
};

export const cadastrarLead = async (token, lead, opportunities) => {
  const headers = { Authorization: token };
  const body = {
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    opportunities: opportunities,
  };
  return api.post(CADASTRAR_LEAD, body, { headers });
};

export const confirmarDados = async (token, user) => {
  const headers = { Authorization: token };
  const body = {
    leadId: user.id,
  };
  return api.put(CONFIRMAR_DADOS, body, { headers });
};

export const agendarReuniao = async (token, user, date) => {
  const headers = { Authorization: token };
  const body = {
    leadId: user.id,
    date: date,
  };
  return api.put(AGENDAR_REUNIAO, body, { headers });
};
