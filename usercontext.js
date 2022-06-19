const UserContext = React.createContext({});

const UserContextProvider = (props) => {
  const updateUser = async (user) => {
    try {
      const newUsers = user;
      userDispatch({ type: "UPDATE_USERS", newUsers });
    } catch (err) {}
  };
  const addUser = async (user) => {
    try {
      const newUsers = user;
      userDispatch({ type: "ADD_USERS", newUsers });
    } catch (err) {}
  };
  const userReducer = (state, action) => {
    switch (action.type) {
      case "ADD_USERS":
        console.log("actions", action);
        return {
          ...state,
          users: [...state.users, action.newUsers],
        };
      case "UPDATE_USERS":
        const filterUsers = state.users.filter(
          (u) => u.email !== action.newUsers.email
        );

        console.log("filtered", filterUsers);

        return {
          ...state,
          users: [...filterUsers, action.newUsers],
        };
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
    updateUser,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
