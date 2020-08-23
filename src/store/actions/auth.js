export const AUTH = {
  LOGIN: 'AUTH_LOGIN',
  LOGOUT: 'AUTH_LOGOUT',
};

export const login = ({ user, token }) => ({
  type: AUTH.LOGIN,
  payload: { user, token }
});

export const logout = () => ({ type: AUTH.LOGOUT });
