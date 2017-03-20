import { LOGGED_IN } from "../actions/User";
const initialState = {
  name: "",
  logged: false,
  id: ""
};

function User(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, state, { logged: true });
    default:
      return state;
  }
}

export default User;
