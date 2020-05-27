const initialState = ''

const filterReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)


  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.data.filter
      default:
      return state
  }
}
export const addFilter = (filter) => {
  return {
    type: 'CHANGE_FILTER',
    data: { filter }
  }
}

export default filterReducer