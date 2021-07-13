const initState = []


export const rooms = (state=initState, action={}) => {
  console.log('state', state)
  console.log('action aaaaa', action)
  switch(action.type) {
    case 'SET_ROOMS':
      return action.payload
    default:
      return state
  }
}