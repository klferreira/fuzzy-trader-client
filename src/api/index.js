import createAuthApi from "./auth";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://bxb-fuzzy-trader.herokuapp.com"
    : "http://localhost:4000";

export default {
  auth: createAuthApi(apiUrl),
};
