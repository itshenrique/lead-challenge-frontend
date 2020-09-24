const validador = (function () {
  function _validaSenha(password) {
    const regexValidador = /^(?=.*\d)(?=.*[$*&@#?!;:])[0-9a-zA-Z$*&@#?!;:]{8,}$/;

    return regexValidador.test(password);
  }
  return {
    validaSenha: _validaSenha,
  };
})();

export default validador;
