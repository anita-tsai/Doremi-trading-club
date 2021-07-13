export const setUserLogin = ({ login, token, name }) => {
  return {
    type: 'SET_USER_LOGIN',
    payload: {
      login,
      token,
      name
    }
  }
}