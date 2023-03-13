import { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <div className={`callout ${type}`}>
      <h5>{msg}</h5>
    </div>
  );
};

export default Alert;
