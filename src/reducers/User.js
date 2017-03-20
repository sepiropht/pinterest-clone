import { LOGGED_IN } from "../actions/User";
const initialState = {
  logged: false
};

function User(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, state, { logged: true }, payload);
    default:
      return state;
  }
}

export default User;
