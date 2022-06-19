const UserContext = React.createContext({});

const UserContextProvider = (props) => {
  const addUser = async (user) => {
    userDispatch({ type: "FETCHING_USERS", fetching: true });
    try {
      const newUsers = user;
      userDispatch({ type: "ADD_USERS", newUsers });
      userDispatch({
        type: "FETCHING_USERS",
        fetching: false,
      });
    } catch (err) {
      userDispatch({
        type: "FETCHING_USERS",
        fetching: false,
      });
    }
  };
  const userReducer = (state, action) => {
    switch (action.type) {
      case "ADD_USERS":
        return {
          ...state,
          users: [...state.users, action.newUsers],
        };
      case "FETCHING_USERS":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };
  const [userData, userDispatch] = React.useReducer(userReducer, {
    users: [],
    fetching: true,
  });
  const value = {
    userData,
    addUser,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
