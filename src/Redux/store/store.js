import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk" 
  
 const pokemonListReducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH':
        return action.payload
        case 'CATCH':
          return [...action.payload]
      default:
        return state
    }
  }

  const store = createStore(pokemonListReducer,  applyMiddleware(thunk))

  export default store