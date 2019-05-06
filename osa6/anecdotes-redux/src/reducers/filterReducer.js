const initialFilter = ''

const reducer = (state = initialFilter, action) => {
  switch(action.type) {
    case 'UPDATE':
      return action.data
    case 'RESET':
      return ''
    default:
      return state
  }
}

export const updateFilter = value => {
  return {
    type: 'UPDATE',
    data: value
  }
}

export const resetFilter = () => {
  return {
    type: 'RESET'
  }
}

export default reducer