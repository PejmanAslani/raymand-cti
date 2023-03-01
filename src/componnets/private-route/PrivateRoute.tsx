import React from "react";
import { Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../layout/Header";
import PlineTools from "../services/PlineTools";

interface LogoutProps {
  LogoutAction: Function;

  AlertView: any;
}

const PrivateRoute = (props: LogoutProps) => {
  const getFullaname = (): string => {
    const username = PlineTools.getCookies("username");
    const name = PlineTools.getCookies("fullname");

    if (name != undefined) {
      return PlineTools.stringToLabel(name);
    } else {
      if (username == undefined) {
        return "***";
      }
      return PlineTools.stringToLabel(username);
    }
  };

  return PlineTools.getCookies("token") != undefined ? (
    <>
      <Header
        AlertView={props.AlertView}
        fullname={getFullaname()}
        LogoutAction={() => {
          if (window.confirm("Are you sure you want to leave?"))
            props.LogoutAction();
        }}
      />

      <Row>
        <Col md={{ span: 10, offset: 1 }}></Col>
      </Row>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoute;
