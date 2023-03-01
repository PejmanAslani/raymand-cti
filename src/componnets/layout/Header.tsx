import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Col,
  Button,
} from "react-bootstrap";
import {
  ArrowBarLeft,
  ArrowRight,
  List,
  ListTask,
  PersonCircle,
} from "react-bootstrap-icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PlineTools, { TypeMessage } from "../services/PlineTools";
import "./Header.css";
import SideBar from "./SideBar";

interface IHeaderProps {
  LogoutAction: Function;
  fullname: string;
  AlertView: any;
}

const Header = (props: IHeaderProps) => {
  const navigate = useNavigate();
  const navDropdownTitle = (
    <>
      <PersonCircle />
    </>
  );
  const [visable, setVisable] = useState(false);
  const ToggleSidebar = () => {
    visable === true ? setVisable(false) : setVisable(true);
  };
  const apply = () => {
    if (window.confirm("Are you sure you want to apply the changes?")) {
      PlineTools.postRequest("/configs/apply", {
        token: PlineTools.getCookies("token"),
      })
        .then((result) => {
          PlineTools.successDialogMessage("Apply configuration successful");
        })
        .catch((error) => {
          PlineTools.dialogMessage(
            "An error occurred while executing your request. Contact the system administrator\n" +
              error,
            "Error",
            TypeMessage.ERROR
          );
        });
    }
  };

  return (
    <div className="main-container d-flex">
      <SideBar visable={visable} toggle={ToggleSidebar} />
      <div className="content">
        <Navbar
          className="text-white"
          expand="lg"
          style={{ backgroundColor: "#3B3B98 ", boxShadow: "2px 2px #C4C4C5" }}
          variant="dark"
        >
          <Container fluid>
            {!visable && (
              <List color="#fff" onClick={ToggleSidebar} size={25} />
            )}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown
                  className="nav-menu"
                  title="SIP"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown
                    title="Sip Settings"
                    id="basic-nav-dropdown"
                    drop="end"
                  >
                    <NavDropdown.Item as={Link} to="/settings/sip-globals">
                      Global SIP Settings
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/settings/system-sip-settings"
                    >
                      System SIP Settings
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/sip-profiles/index">
                    SIP Profiles
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/sip-trunks/index">
                    SIP Trunks
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/sip-group-users/index">
                    Sip User Groups
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/sip-users/index">
                    Sip Users
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Call Routes">
                  <NavDropdown.Item
                    as={Link}
                    to="/call-routes/global-outbounds/index"
                  >
                    Global Outbound Routes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Link}
                    to="/call-routes/specific-outbounds/index"
                  >
                    Specific Outbound Routes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/call-routes/inbounds/index">
                    InBound Routes
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Timing">
                  <NavDropdown.Item
                    as={Link}
                    to="/call-routes/global-outbounds/index"
                  >
                    Schedules
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/call-routes/global-outbounds/index"
                  >
                    New Schedule
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  onClick={() => {
                    navigate("/call-reports/index");
                  }}
                >
                  Call Reports
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/online-view/index");
                  }}
                >
                  Online View
                </Nav.Link>
                <NavDropdown title={"Modules"}>
                  <NavDropdown.Item>

                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <NavDropdown
                  className="nav-left"
                  title={navDropdownTitle}
                  id="basic-nav-dropdown dropleft"
                >
                  <NavDropdown.Item>{props.fullname}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/change-password/index">
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      props.LogoutAction();
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link onClick={apply} className="apply">
                  Apply
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div
          className="dashboard-content px-3 pt-4"
          style={{ paddingBottom: "3.5vw" }}
        >
          {props.AlertView}

          <Outlet />
        </div>
      </div>
    </div>
    // <header className="header">

    // </header>
  );
};

export default Header;
