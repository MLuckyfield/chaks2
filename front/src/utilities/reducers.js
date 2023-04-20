import {combineReducers} from 'redux'

const userReducer = (state = {user:''}, action) =>{
  switch (action.type) {
    case "setCurrentUser":
      console.log('reducer activated')
      return {
        ...state,
        user: action.payload
      };
      case "updateInSession":
        console.log('updateInSession activated')
        return {
          ...state,
          inSession: action.payload
        };

    default:
      return state;
  }
};
const rootReducer = combineReducers({userReducer})

export default rootReducer
