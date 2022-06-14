const UsersContext = React.createContext({});

const UserContextProvider = (props) => {
  const [users, setUsers] = React.useState([
    {
      name: "abel",
      email: "abel@mit.edu",
      password: "secretsecretsecret",
      balance: 100,
    },
  ]);
  const loadUsers = async () => {
    userDispatch({ type: "FETCHING_USERS", fetching: true });
    try {
      // const user = await getUsersApi();
      const newUsers = users.data.sort((a, b) => sortStrings(a.name, b.name));
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
          users: action.newUsers,
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
    users,
    userData,
    setUsers,
    loadUsers,
  };
  return (
    <UsersContext.Provider value={value}>
      {props.children}
    </UsersContext.Provider>
  );
};
