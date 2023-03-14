import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,

} from "react-bootstrap";
import {

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
  const [toggleNav, setToggleNav] = useState(true)
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
          collapseOnSelect
          expand="lg"
          style={{ backgroundColor: "#1D3557 ", boxShadow: "2px 2px #C4C4C5" }}
          variant="dark"
        >
          <Container>
            {/* {!visable && (
              <List color="#fff" onClick={ToggleSidebar} size={25} />
            )} */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown
                  className="nav-menu"
                  title="SIP"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown
                    title="Sip Settings"
                    id="nav-dropdown"
                    drop="end"
                    
                  >
                    <NavDropdown.Item href="#/settings/sip-globals">
                      Global SIP Settings
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="#/settings/system-sip-settings"
                    >
                      System SIP Settings
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/sip-profiles/index">
                    SIP Profiles
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/sip-trunks/index">
                    SIP Trunks
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#/sip-group-users/index">
                    Sip User Groups
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#/sip-users/index">
                    Sip Users
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Call Routes">
                  <NavDropdown.Item
                    href="#/call-routes/global-outbounds/index"
                  >
                    Global Outbound Routes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#/call-routes/specific-outbounds/index"
                  >
                    Specific Outbound Routes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/call-routes/inbounds/index">
                    InBound Routes
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Timing">
                  <NavDropdown.Item
                    href="#/call-routes/global-outbounds/index"
                  >
                    Schedules
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#/call-routes/global-outbounds/index"
                  >
                    New Schedule
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  href="#/call-reports/index"
                >
                  Call Reports
                </Nav.Link>
                <Nav.Link
                  href="#/online-view/index"

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
                  className="nav-left me-auto"
                  title={navDropdownTitle}

                  id="basic-nav-dropdown dropleft"
                >
                  <NavDropdown.Item disabled  >{props.fullname}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="#" to="/change-password/index">
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    onClick={() => {
                      props.LogoutAction();
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link onClick={apply} className="apply" href="#">
                  Apply
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <div
            className="dashboard-content px-3 pt-4"
            style={{ paddingBottom: "3.5vw" }}
          >
            {props.AlertView}

            <Outlet />
          </div>
        </Container>
      </div>
    </div >
    // <header className="header">

    // </header>
  );
};

export default Header;
