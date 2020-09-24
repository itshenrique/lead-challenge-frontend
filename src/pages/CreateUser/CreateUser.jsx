import React, { useState } from 'react';
import styles from './CreateUser.module.css';
import { InputField, Modal, Logo, Button } from '../../components';
import { cadastrarUsuario } from '../../services/api';
import localStorageService from '../../services/localStorage';
import validador from '../../util/validador';

function CreateUser(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);

  const validaSenhas = (password, passwordConfirmation) => {
    switch (true) {
      case passwordConfirmation !== password:
        mostrarModal(
          'Password inválido. Password e confirmação devem ser iguais'
        );
        return false;
      case !validador.validaSenha(password):
        mostrarModal(
          'Password inválido. Password deve possuir ao menos 8 caracteres, contendo ao menos, um caracter especial, um caracter numérico, um caracter alfanumérico'
        );
        return false;
      default:
        return true;
    }
  };

  const submitHandler = (evt) => {
    evt.preventDefault();

    if (validaSenhas(password, passwordConfirmation)) {
      const user = {
        username: username,
        password: password,
      };

      cadastrarUsuario(user)
        .then((response) => response.data)
        .then((data) => {
          if (data.resultado === 'SUCESSO') {
            localStorageService.setToken(data.token);
            props.history.push('/leads');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const desabilitaBotaoRegistrar = (
    username,
    password,
    passwordConfirmation
  ) => {
    if (!username || !password || !passwordConfirmation) {
      return true;
    }
    return false;
  };

  const mostrarModal = (message) => {
    setModalMessage(message);
    setModalVisibility(true);
  };

  const onCloseModal = () => {
    setModalVisibility(false);
  };

  return (
    <div className={styles.container}>
      <Modal
        message={modalMessage}
        visible={modalVisibility}
        onCloseModal={onCloseModal}
      />
      <div className={styles.form}>
        <Logo />
        <form className={styles['form-fields']} onSubmit={submitHandler}>
          <InputField
            label="Usuário *"
            type="text"
            handleChange={(evt) => setUsername(evt.target.value)}
          />
          <InputField
            label="Password *"
            placeholder="*******"
            type="password"
            handleChange={(evt) => setPassword(evt.target.value)}
          />
          <InputField
            label="Confirmação Password *"
            placeholder="*******"
            type="password"
            handleChange={(evt) => setPasswordConfirmation(evt.target.value)}
          />
          <Button
            type="submit"
            value="Registrar"
            disabled={desabilitaBotaoRegistrar(
              username,
              password,
              passwordConfirmation
            )}
          />
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
