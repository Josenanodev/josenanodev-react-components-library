import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./NotificationsCenter.css";

//Redux
import { useSelector } from "react-redux";
import { quickNotificationsSelector } from "../../../redux/state/features/Notifications/NotificationsReducer";
import { languageSelector } from "../../../redux/state/features/AppSettings/AppSettingsReducer";

//Icons
import { BsX, BsCheckCircle, BsInfoCircle } from "react-icons/bs";
import { ImBlocked } from "react-icons/im";

//types
import { QuickNotificationsType } from "../../../common/types";

const NotificationsCenter = () => {
  //Redux
  const quickNotifications = useSelector(quickNotificationsSelector);
  const language = useSelector(languageSelector)
  //States
  const [notificationsArray, setNotificationsArray] = useState<QuickNotificationsType[]>(
    []
  );
  const [idTimeout, setIdTimeout] = useState<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    let actualizar = false;
    let clonnotificationsArray: QuickNotificationsType[] = [...notificationsArray];
    quickNotifications.forEach((notification) => {
      if (
        Date.parse(notification.creation.toString()) > Date.now() - 10000 &&
        clonnotificationsArray.every(
          (notificationParaMostrar) =>
            Date.parse(notificationParaMostrar.creation.toString()) !==
              Date.parse(notification.creation.toString()) ||
            notificationParaMostrar.text !== notification.text ||
            notificationParaMostrar.type !== notification.type
        )
      ) {
        clonnotificationsArray.push(notification);
        actualizar = true;
      }
    });
    if (actualizar) {
      setNotificationsArray(clonnotificationsArray);
      let idTimeout = setTimeout(() => {
        setNotificationsArray([]);
        setIdTimeout(undefined);
      }, 10000);
      if (idTimeout !== undefined) {
        clearTimeout(idTimeout);
        setIdTimeout(idTimeout);
      } else {
        setIdTimeout(idTimeout);
      }
    }
  }, [quickNotifications, idTimeout, notificationsArray]);
  return ReactDOM.createPortal(
    <div
      className="notifications-center"
      style={{
        top: 10,
        left: 10,
      }}
    >
      {notificationsArray.map((notification, index) => (
        <div
          className="temporal-notification"
          key={
            Date.parse(notification.creation.toString()) +
            "-" +
            notification.text +
            "-" +
            notification.type
          }
        >
          <div className="div-upper-temporal-notification">
            {notification.type === "ok" && (
              <BsCheckCircle style={{ color: "green" }} />
            )}
            {notification.type === "info" && (
              <BsInfoCircle style={{ color: "lightblue" }} />
            )}
            {notification.type === "error" && <ImBlocked style={{ color: "brown" }} />}
            <BsX
              className="x-button-temporal-notification"
              onClick={() => {
                let clonnotificationsArray = [...notificationsArray];
                clonnotificationsArray[index].creation = new Date(
                  Date.parse(notification.creation.toString()) - 10000
                );
                clonnotificationsArray.splice(index, 1);
                setNotificationsArray(clonnotificationsArray);
              }}
            />
          </div>

          <p className="temporal-notification-text">{language[notification.text]}</p>
        </div>
      ))}
    </div>,
    document.getElementById("root") as HTMLDivElement
  );
};

export default NotificationsCenter;
