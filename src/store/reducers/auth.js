const initialState = { user: {}, token: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "AUTH_LOGOUT":
      return initialState;
    default:
      return state;
  }
};
