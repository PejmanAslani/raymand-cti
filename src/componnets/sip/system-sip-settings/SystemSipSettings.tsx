import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlineTools, { TypeAlert } from "../../services/PlineTools";

const SystemSipSettings = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    compactHeaders: false,
    disableTcpSwitch: false,
    followEarlyMediaFork: false,
    acceptMultipleSdpAnswers: false,
    disableRport: false,
    threadPoolAutoIncrement: 0,
    threadPoolIdleTimeout: 0,
    threadPoolInitialSize: 0,
    threadPoolMaxSize: 0,
    timerB: 0,
    timerT1: 0,
  });
  useEffect(() => {
    PlineTools.getRequest("/settings/system-sip-settings")
      .then((result) => {
        setState(result.data);
      })
      .catch(() => {
        PlineTools.errorDialogMessage("Getting Data failed");
      });
  }, []);

  const saveData = (e: any) => {
    e.preventDefault();
    PlineTools.postRequest("/settings/save-system-sip-settings", state).then((result) => {
      if (result.data.hasError) {
        PlineTools.appAlert(result.data.messages, TypeAlert.Danger);
      } else {
        navigate("/home");
      }
    });
  };
  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h3>System Sip Settings</h3>
        <hr />
        <Form onSubmit={saveData}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="compactHeaders">
                <Form.Check
                  type="checkbox"
                  label="Compact Headers"
                  onChange={(e) => {
                    setState({ ...state, compactHeaders: e.target.checked });
                  }}
                  checked={state.compactHeaders}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="disableTcpSwitch">
                <Form.Check
                  type="checkbox"
                  label="Disable Tcp Switch"
                  onChange={(e) => {
                    setState({ ...state, disableTcpSwitch: e.target.checked });
                  }}
                  checked={state.disableTcpSwitch}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="followEarlyMediaFork">
                <Form.Check
                  type="checkbox"
                  label="Follow Early Media Fork"
                  onChange={(e) => {
                    setState({ ...state, followEarlyMediaFork: e.target.checked });
                  }}
                  checked={state.followEarlyMediaFork}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="acceptMultipleSdpAnswers">
                <Form.Check
                  type="checkbox"
                  label="Accept Multiple Sdp Answers"
                  onChange={(e) => {
                    setState({ ...state, acceptMultipleSdpAnswers: e.target.checked });
                  }}
                  checked={state.acceptMultipleSdpAnswers}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="disableRport">
                <Form.Check
                  type="checkbox"
                  label="Disable Rport"
                  onChange={(e) => {

                    setState({ ...state, disableRport: e.target.checked });
                  }}
                  checked={state.disableRport}
                />
              </Form.Group>
            </Col>
            <Col md={6}></Col>
          </Row>

          <Row>
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="threadPoolAutoIncrement">
                <Form.Label>Thread Pool Auto Increment</Form.Label>
                <Form.Control
                  type="number"
                  required={true}
                  min={0}
                  onChange={(e) => {
                    setState({ ...state, threadPoolAutoIncrement: parseInt(e.target.value) });
                  }}
                  value={state.threadPoolAutoIncrement}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="threadPoolIdleTimeout">
                <Form.Label>Thread Pool Idle Timeout</Form.Label>
                <Form.Control
                  type="number"
                  required={true}
                  min={0}
                  onChange={(e) => {
                    setState({ ...state, threadPoolIdleTimeout: parseInt(e.target.value) });
                  }}
                  value={state.threadPoolIdleTimeout}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="threadPoolInitialSize">
                <Form.Label>Thread Pool Initial Size</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  required={true}
                  onChange={(e) => {
                    setState({ ...state, threadPoolInitialSize: parseInt(e.target.value) });
                  }}
                  value={state.threadPoolInitialSize}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="threadPoolMaxSize">
                <Form.Label>Thread Pool Max Size</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  required={true}
                  onChange={(e) => {
                    setState({ ...state, threadPoolMaxSize: parseInt(e.target.value) });
                  }}
                  value={state.threadPoolMaxSize}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="timerB">
                <Form.Label>Timer B</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  required={true}
                  onChange={(e) => {
                    setState({ ...state, timerB: parseInt(e.target.value) });
                  }}
                  value={state.timerB}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="timerT1">
                <Form.Label>Timer T1</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  required={true}
                  onChange={(e) => {
                    setState({ ...state, timerT1: parseInt(e.target.value) });
                  }}
                  value={state.timerT1}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Button variant="primary" type="submit">
                Save
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Cancel
              </Button>{" "}
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default SystemSipSettings;
