import { createContext, useContext, useReducer } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

const UserContext = createContext();

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  if (userAndDispatch) {
    return userAndDispatch[0];
  }
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  if (userAndDispatch) {
    return userAndDispatch[1];
  }
};

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, {
    user: null,
    isAuthenticated: false,
  });

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  );
};
