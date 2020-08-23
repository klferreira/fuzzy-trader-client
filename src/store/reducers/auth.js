export default (state = { user: {}, token: null }, action) => {
  switch (action.type) {
    case "AUTH_LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "AUTH_LOGOUT":
      return { ...state, user: {} };
    default:
      return state;
  }
};
