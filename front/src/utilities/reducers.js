const rootReducer = (state = {user:''}, action) =>{
  switch (action.type) {
    case "setCurrentUser":
      console.log('reducer activated')
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer
