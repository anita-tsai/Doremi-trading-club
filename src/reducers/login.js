const initState = {
  login: false,
  token: '',
  name: ''
}


export const userLogin = (state=initState, action={}) => {
  console.log('state', state)
  console.log('action', action)
  switch(action.type) {
    case 'SET_USER_LOGIN':
      return {
        ...state,
        login: action.login,
        token: action.token,
        name: action.name
      }
    default:
      return state
  }
}