import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./NotFound.css";
import { HouseDoor } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Row>
      <Col md={12}>
        <div className="error-template">
          <h1 style={{ color: "red" }} className="ops">Oops!</h1>
          <h2 style={{ color: "red" }}>Error 404</h2>
          <div className="error-details">
            Your requested page could not be found. Please contact the system
            administrator
          </div>
          <div className="error-actions">
            <Link to={"/"}>
              <Button >
                <HouseDoor /> Return to Home page
              </Button>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default NotFound;
