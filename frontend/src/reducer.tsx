const reducer = (state: any, action: any) => {
  if (action.type === "FETCH_DATA_FROM_API") {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === "DELETE_DATA") {
    let filteredData = state.data.filter((x: any) => x.id !== action.payload);
    return {
      ...state,
      data: filteredData,
    };
  } else if (action.type === "POST_DATA") {
    const newArr = [...state.data];
    newArr.push(action.payload);
    return {
      ...state,
      data: newArr,
    };
  } else if (action.type === "UPDATE_DATA") {
    const newArr = state.data.map((item: any) => {
      if (action.payload.id === item.id) {
        return {
          ...item,
          id: 1,
          title: action.payload.title,
          body: action.payload.body,
        };
      } else {
        return item;
      }
    });
    return {
      ...state,
      data: newArr,
    };
  }

  return state;
};

export default reducer;
