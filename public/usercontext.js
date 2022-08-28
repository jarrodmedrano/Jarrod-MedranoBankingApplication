const UserContext = React.createContext({});

const UserContextProvider = (props) => {
  const getAllUsers = async () => {
    const response = await fetch("/account/all");
    const data = await response.json();
    const newUsers = data;
    userDispatch({ type: "ALL_USERS", newUsers });
  };
  const loginUser = async (user) => {
    try {
      console.log("this user", user);
      const loginUser = user;
      const url = `/account/login/${user.email}/${encodeURIComponent(
        user.password
      )}`;
      (async () => {
        const res = await fetch(url);
        const data = await res.json();
        console.log("data", data);
      })();

      userDispatch({ type: "LOGIN_USERS", loginUser });
    } catch (err) {}
  };
  const logoutUser = async (user) => {
    try {
      const newUser = user;
      userDispatch({ type: "LOGOUT_USERS", newUser });
    } catch (err) {}
  };
  const updateUser = async (user) => {
    try {
      const newUsers = user;
      userDispatch({ type: "UPDATE_USERS", newUsers });
    } catch (err) {}
  };
  const addUser = async (user) => {
    try {
      const url = `/account/create/${user.name}/${
        user.email
      }/${encodeURIComponent(user.password)}`;
      (async () => {
        const res = await fetch(url);
        const data = await res.json();
        console.log("data", data);
      })();
    } catch (err) {}
  };
  const userReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_USER":
        console.log("actions", action);
        return {
          ...state,
          loggedIn: [...action.loginUser],
        };
      case "LOGOUT_USER":
        console.log("actions", action);
        return {
          ...state,
          loggedIn: [],
        };
      case "ALL_USERS":
        console.log("actions", action);
        return {
          ...state,
          users: [...action.newUsers],
        };
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
    getAllUsers,
    loginUser,
    logoutUser,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
