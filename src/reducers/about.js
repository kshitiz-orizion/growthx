
const initialState = { };
  
  const aboutReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IMAGE_TITLE':
          return {
            ...state,
            titleImage: action.payload
          };
        case 'DECREMENT':
          return {
            ...state,
            count: state.count - 1
          };
        default:
          return state;
      }
  };
  
  export default aboutReducer;
  