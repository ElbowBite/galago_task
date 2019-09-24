const initState = {
  userList: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST': {
      return {
        ...state,
        userList: action.userList,
      };
    }
    default: return (state);
  }
};

export default reducer;
