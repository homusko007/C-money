export const setToken = (token) => {
  localStorage.setItem('Basic', token);
};

export const getToken = (log, pass) => {
  const token = localStorage.getItem('Basic') || '';
  setToken(token);

  return token;
};
