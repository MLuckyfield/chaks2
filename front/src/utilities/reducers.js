const rootReducer = (state = {user:''}, action) =>{
  switch (action.type) {
    case "setCurrentUser":
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer
