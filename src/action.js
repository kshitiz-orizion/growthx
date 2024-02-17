export const setTitleImage = (payload) => {
  return {
    type: "SET_IMAGE",
    payload: payload,
  };
};

export const setTitleText = (payload) => {
  return {
    type: "SET_TEXT",
    payload: payload,
  };
};

export const setSections = (payload) => {
  return {
    type: "SET_SECTIONS",
    payload: payload,
  };
};

export const setCount = (payload) => {
    return {
      type: "SET_COUNT",
      payload: payload,
    };
  };

  export const removeSections = (payload) => {
    console.log(payload,"==here===")
    return {
      type: "REMOVE_SECTIONS",
      payload: payload,
    };
  };
