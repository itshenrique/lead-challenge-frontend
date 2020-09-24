import React, { useState, useEffect } from 'react';
import {
  buscarLeads,
  confirmarDados,
  agendarReuniao,
} from '../../services/api';
import { Modal, Logo, Button, ListDnd, InputField } from '../../components';
import localStorageService from '../../services/localStorage';
import styles from './LeadList.module.css';
import constants from '../../util/constants';

function LeadList(props) {
  const [isLoading, setLoading] = useState(false);
  const [leadsList, setLeadsList] = useState([]);
  const [leadId, setLeadId] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    setLoading(true);
    const token = localStorageService.getAccessToken();

    buscarLeads(token)
      .then((response) => response.data)
      .then((data) => {
        const { resultado, payload } = data;
        if (resultado === 'SUCESSO') {
          setLeadsList([...payload.leads]);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const onChangeListHandler = (id) => {
    const lead = leadsList.find((lead) => lead.id === parseInt(id));
    if (lead.statusId === 0) {
      confirmarDadosClient(lead.id);
    } else {
      setLeadId(lead.id);
    }
  };

  const confirmarDadosClient = (id) => {
    const user = {
      id,
    };
    const token = localStorageService.getAccessToken();
    setLoading(true);
    confirmarDados(token, user)
      .then((response) => response.data)
      .then((data) => {
        const { resultado } = data;
        if (resultado === 'SUCESSO') {
          setLoading(false);
          carregarDados();
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const agendarReuniaoLead = (date) => {
    const token = localStorageService.getAccessToken();
    const user = {
      id: leadId,
    };
    agendarReuniao(token, user, date)
      .then((response) => response.data)
      .then((data) => {
        if (data.resultado === 'SUCESSO') {
          setLoading(false);
          setLeadId('');
          carregarDados();
        }
      })
      .catch((err) => {
        carregarDados();
        console.error(err);
      });
  };

  const onSubmitDate = (evt) => {
    evt.preventDefault();
    const dateTmp = date.split('-').reverse().join('/').concat(` ${hour}`);

    agendarReuniaoLead(dateTmp);
  };

  return (
    <div>
      <div className={styles['container-horizontal']}>
        <div className={styles.container}>
          <Logo />
        </div>
        <div className={styles.container}>
          <div>Painel de Leads</div>
        </div>
      </div>
      <div className={styles['container-horizontal']}>
        <Button
          value="Novo Lead (+)"
          secundary
          onClick={() => props.history.push('/create-lead')}
        />
      </div>
      <div className={styles['container-horizontal']}></div>
      <div className={styles['container-horizontal']}>
        <div className={styles['container-list']}>
          {!isLoading ? (
            <ListDnd
              headers={Object.values(constants.statusLead)}
              first={leadsList.filter((lead) => lead.statusId === 0)}
              middle={leadsList.filter((lead) => lead.statusId === 1)}
              last={leadsList.filter((lead) => lead.statusId === 2)}
              onChange={onChangeListHandler}
            />
          ) : null}
          {leadId ? (
            <form className={styles['date-selector']} onSubmit={onSubmitDate}>
              <h3 className={styles['date-selector-header']}>
                Agendar Reunião
              </h3>
              <InputField
                label="Hora"
                type="time"
                handleChange={(evt) => setHour(evt.target.value)}
              />
              <InputField
                label="Dia"
                type="date"
                handleChange={(evt) => setDate(evt.target.value)}
              />
              <Button value="Agendar" type="submit" secundary />
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default LeadList;
