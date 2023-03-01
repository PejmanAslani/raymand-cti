import React, { useEffect, useState } from "react";
import "./App.css";
import PlineTools, {
  TypeAlert,
  TypeMessage,
} from "./componnets/services/PlineTools";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AppRoutes, IAppRouteNode } from "./componnets/routes/AppRoutes";
import PrivateRoute from "./componnets/private-route/PrivateRoute";
import Home from "./componnets/home/Home";
import Login from "./componnets/login/Login";
import NotFound from "./componnets/errors/NotFound";
import Footer from "./componnets/layout/Footer";
import { Alert, Button, Container, Modal } from "react-bootstrap";
import {
  BugFill,
  CheckCircleFill,
  ExclamationCircleFill,
  InfoCircleFill,
} from "react-bootstrap-icons";
import "react-loading-skeleton/dist/skeleton.css";

interface ILoginObject {
  username: string;
  token: string;
  name: string;
  uid: string;
  fullname: string;
}

/******************************************************************** */
const App = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    isShow: false,
    message: "",
    title: "",
    icon: <InfoCircleFill />,
    backdrop: false,
  });
  const [alert, setAlert] = useState({
    isShow: false,
    variant: TypeAlert.Info,
    messages: [""],
  });

  useEffect(() => {
    setState(PlineTools.getCookies("token") != null);
    PlineTools.appMessage = (
      message: string,
      title: string,
      type: TypeMessage = TypeMessage.INFO,
      backdrop: boolean
    ) => {
      switch (type) {
        case TypeMessage.ERROR:
          setDialog({
            isShow: true,
            backdrop: backdrop,
            icon: <BugFill />,
            message: message,
            title: title,
          });
          break;
        case TypeMessage.INFO:
          setDialog({
            isShow: true,
            backdrop: backdrop,
            icon: <InfoCircleFill />,
            message: message,
            title: title,
          });
          break;
        case TypeMessage.SUCCESS:
          setDialog({
            isShow: true,
            backdrop: backdrop,
            icon: <CheckCircleFill />,
            message: message,
            title: title,
          });
          break;
        case TypeMessage.WARINING:
          setDialog({
            isShow: true,
            backdrop: backdrop,
            icon: <ExclamationCircleFill />,
            message: message,
            title: title,
          });
          break;

        default:
          window.alert(message);
          break;
      }
    };
    PlineTools.appAlert = (
      messages: string[],
      variant: TypeAlert,
      timeOut = 1000
    ) => {
      setAlert({
        messages: messages,
        variant: variant,
        isShow: true,
      });
      if (timeOut > 0) {
        setTimeout(() => {
          setAlert({ ...alert, isShow: false });
        }, timeOut);
      }
      window.scrollTo(0, 0);
    };
  }, []);
  
  const login = (result: ILoginObject) => {
    PlineTools.setCookies("username", result.username);
    PlineTools.setCookies("token", result.token);
    PlineTools.setCookies("uid", result.uid);
    PlineTools.setCookies("fullname", result.fullname);
    setState(false);
    navigate("/");
  };
  const logout = () => {
    PlineTools.setCookies("username", "");
    PlineTools.setCookies("token", "");
    PlineTools.setCookies("uid", "");
    PlineTools.setCookies("fullname", "");
    setState(false);
    navigate("/login");
  };
  
  const mainAlert = () => {
    return (
      <Container>
        <Alert
          onClose={() => {
            setAlert({ ...alert, isShow: false });
          }}
          hidden={!alert.isShow}
          dismissible
          variant={alert.variant}
        >
          {alert.messages.length == 1 && <span>{alert.messages[0]}</span>}
          {alert.messages.length > 1 && (
            <ul>
              {alert.messages.map((v: string, i) => {
                return <li key={i}>{v}</li>;
              })}
            </ul>
          )}
        </Alert>
      </Container>
    );
  };
  return (
    <div>
      <Modal
        show={dialog.isShow}
        centered
        onHide={() => {
          setDialog({ ...dialog, isShow: false });
        }}
        backdrop={dialog.backdrop}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {dialog.icon} {dialog.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{dialog.message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setDialog({ ...dialog, isShow: false });
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Routes>
        <Route
          element={
            <PrivateRoute
              LogoutAction={logout}
              AlertView={alert.isShow && mainAlert()}
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {AppRoutes.map((v: IAppRouteNode, i: number) => {
            return <Route key={i} path={v.path} element={v.element} />;
          })}
        </Route>
        <Route path="/login" element={<Login LoginAction={login} />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
