const initialState = {};

const sectionValue = (sections, payload) => {
  console.log(sections, payload, "===here===");
  const index = sections.indexOf(payload);
  console.log("index", index);
  sections.splice(index, 1);
  return sections;
};

const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IMAGE":
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    case "SET_TEXT":
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    case "SET_SECTIONS":
      return {
        ...state,
        sections: state?.sections
          ? [...state.sections, action.payload]
          : [action.payload],
      };
    case "SET_COUNT":
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    case "REMOVE_SECTIONS":
      return {
        ...state,
        sections:
          state.sections.length === 1
            ? []
            : sectionValue(state.sections, action.payload),
      };
    default:
      return state;
  }
};

export default heroReducer;
