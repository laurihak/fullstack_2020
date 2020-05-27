const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)

  let newState = {...state}
  switch (action.type) {
    case 'GOOD':
      newState = {
        good: +1,
        ok: newState.ok,
        bad: newState.bad,
      }
      return newState
    case 'OK':
      newState = {
        good: newState.good,
        ok: +1,
        bad: newState.bad,
      }
      return newState
    case 'BAD':
      newState = {
        good: newState.good,
        ok: newState.ok,
        bad: +1,
      }
      return newState
    case 'ZERO':
      newState = {
        good: 0,
        ok: 0,
        bad: 0,
      }
      return newState
    default: return state
  }
  
}

export default counterReducer