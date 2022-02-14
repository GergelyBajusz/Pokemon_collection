export const pokemonProfileState = {
    name: '',
    id: '',
    image: '',
    height: 0,
    weight: 0,
    abilities: [],
    catched: false,
  }
  
  export const pokemonProfileStateReducer = (state, action) => {
    switch (action.type) {
      case 'SET':
        return {...state, ...action.payload}
        case 'CATCH':
          return {...state, ...action.payload}
      default:
        return state
    }
  }