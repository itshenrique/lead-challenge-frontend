import React, { useState, useEffect } from 'react';
import { InputField, Modal, Logo, Button } from '../../components';
import CONSTANTS from '../../util/constants';
import styles from './CreateLead.module.css';
import { cadastrarLead } from '../../services/api';
import localStorageService from '../../services/localStorage';

function CreateLead(props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [opportunities, setOpportunities] = useState([]);

  const selectAll = (evt) => {
    const { checked } = evt.target;
    if (checked) {
      setOpportunities(CONSTANTS.opportunities);
    } else {
      setOpportunities([]);
    }
  };

  const handleInputChange = (evt) => {
    const { name, checked } = evt.target;
    let opportunitiesTmp = opportunities;
    if (!checked) {
      opportunitiesTmp = opportunitiesTmp.filter(
        (opportunity) => opportunity !== name
      );
    } else {
      opportunitiesTmp.push(name);
    }
    setOpportunities([...opportunitiesTmp]);
  };

  const isChecked = (name) =>
    opportunities.find((opportunity) => name === opportunity) !== undefined;

  const renderOpportunities = () =>
    CONSTANTS.opportunities.map((opportunity, index) => (
      <tbody key={index}>
        <tr>
          <td>
            <input
              name={opportunity}
              type="checkbox"
              onChange={handleInputChange}
              checked={isChecked(opportunity)}
            />
          </td>
          <td>
            <label>{opportunity}</label>
          </td>
        </tr>
      </tbody>
    ));

  const desabilitaBotaoSalvar = () => {
    switch (true) {
      case opportunities.length === 0:
      case name === '':
      case phone === '':
      case email === '':
        return true;
      default:
        return false;
    }
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    const lead = {
      name,
      phone,
      email,
    };

    const token = localStorageService.getAccessToken();

    cadastrarLead(token, lead, opportunities)
      .then((response) => response.data)
      .then((data) => {
        if (data.resultado === 'SUCESSO') {
          console.log(data);
          props.history.push('/leads');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className={styles['container-horizontal']}>
        <div className={styles.container}>
          <Logo />
        </div>
        <div className={styles.container}>Novo Lead</div>
      </div>
      <form onSubmit={submitHandler}>
        <div className={styles['container-horizontal']}>
          <div className={styles.container}>
            <InputField
              label="Nome *"
              type="text"
              handleChange={(evt) => setName(evt.target.value)}
            />

            <InputField
              label="Telefone *"
              type="text"
              handleChange={(evt) => setPhone(evt.target.value)}
            />

            <InputField
              label="Email *"
              type="text"
              handleChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
          <div className={styles.container}>
            Oportunidades *
            <table className={styles.opportunities}>
              <thead>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      id="all"
                      onChange={selectAll}
                      checked={
                        opportunities.length === CONSTANTS.opportunities.length
                      }
                    />
                  </td>
                  <td></td>
                </tr>
              </thead>
              {renderOpportunities()}
            </table>
            <Button
              value="Salvar"
              secundary
              type="submit"
              disabled={desabilitaBotaoSalvar()}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateLead;
