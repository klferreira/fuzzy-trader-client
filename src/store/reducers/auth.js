export default (state = { user: {} }, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: {} };
    default:
      return state;
  }
};
