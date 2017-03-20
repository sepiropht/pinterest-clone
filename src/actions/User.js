export const LOGGED_IN = "LOGGED_IN";

export function loggedIn(a) {
  return {
    payload: a,
    type: LOGGED_IN
  };
}
