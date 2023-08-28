const Notification = ({ notifMsg, notifClass }) => {
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

  const style = notifClass === "message" ? msg : error;

  if (notifMsg === null) {
    return null;
  }

  return <div style={style}>{notifMsg}</div>;
};

export default Notification;
