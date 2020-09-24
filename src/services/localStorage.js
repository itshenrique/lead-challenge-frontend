const localStorageService = (function () {
  function _setToken(token) {
    localStorage.setItem('x-access-token', token);
  }
  function _getAccessToken() {
    return localStorage.getItem('x-access-token');
  }
  function _clearToken() {
    localStorage.removeItem('x-access-token');
  }
  return {
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    clearToken: _clearToken,
  };
})();

export default localStorageService;
