import { useNotificationValue } from "../context/NotificationContext";

const Notification = () => {
  const error = {
    width: "fit-content",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "5px 10px",
    color: "red",
    backgroundColor: "lightgoldenrodyellow",
    fontSize: "20px",
  };

  const msg = {
    width: "fit-content",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "5px 10px",
    color: "green",
    backgroundColor: "lightgoldenrodyellow",
    fontSize: "20px",
  };

  const notification = useNotificationValue();
  const notifMsg = notification.notifMsg;
  const notifClass = notification.notifClass;

  const style = notifClass === "MESSAGE" ? msg : error;

  if (notifMsg === "") {
    return null;
  }

  return <div style={style}>{notifMsg?.notifMsg}</div>;
};

export default Notification;
