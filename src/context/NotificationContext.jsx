import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "MESSAGE":
      return { ...state, notifMsg: action.payload, notifClass: "MESSAGE" };
    case "ERROR":
      return { ...state, notifMsg: action.payload, notifClass: "ERROR" };
    case "CLEAR":
      return { ...state, notifMsg: "", notifClass: "" };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    notifMsg: "",
    notifClass: "",
  });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContextProvider };
