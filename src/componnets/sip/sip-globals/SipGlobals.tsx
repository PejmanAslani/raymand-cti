import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import PlineTools, { TypeAlert } from "../../services/PlineTools";

const SipGlobals = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    debug: false,
    disableMultiDomain: false,
    ignoreUriUserOptions: false,
    mwiDisableInitialUnsolicited: false,
    contactExpirationCheckInterval: 0,
    defaultFromUser: "",
    defaultOutboundEndpoint: "",
    defaultRealm: "",
    defaultVoicemailExtension: "",
    endpointIdentifierOrder: "",
    keepAliveInterval: 0,
    maxForwards: 0,
    mwiTpsQueueHigh: 0,
    mwiTpsQueueLow: 0,
    regcontext: "false",
    unidentifiedRequestCount: 0,
    unidentifiedRequestPruneInterval: 0,
    userAgent: "pline",
    maxInitialQualifyTime: 0,
    unidentifiedRequestPeriod: 0,
  });
  useEffect(() => {
    PlineTools.getRequest("/settings/sip-globals")
      .then((result: any) => {
        setState(result.data);
      })
      .catch(() => {
        PlineTools.errorDialogMessage("Getting Data failed");
      });
  }, []);

  const saveData = (e: any) => {
    e.preventDefault();
    PlineTools.postRequest("/settings/save-sip-globals", state).then((result) => {
      if (result.data.hasError) {
        PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
      } else {
        //PlineTools.successDialogMessage("Saved completed successfully");
        navigate("/home");

      }
    });
  };

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h3>SIP Globals Settings</h3>
        <hr />
        <Form onSubmit={saveData}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="debug">
                <Form.Check
                  type="checkbox"
                  label="Debug"
                  onChange={(e) => {
                    setState({ ...state, debug: e.target.checked });
                  }}
                  checked={state.debug}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="disableMultiDomain">
                <Form.Check
                  type="checkbox"
                  label="Disable Multi Domain"
                  onChange={(e) => {
                    setState({ ...state, disableMultiDomain: e.target.checked });
                  }}
                  checked={state.disableMultiDomain}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="ignoreUriUserOptions">
                <Form.Check
                  type="checkbox"
                  label="Ignore Uri User Options"
                  onChange={(e) => {
                    setState({ ...state, ignoreUriUserOptions: e.target.checked });
                  }}
                  checked={state.ignoreUriUserOptions}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="mwiDisableInitialUnsolicited"
              >
                <Form.Check
                  type="checkbox"
                  label="Mwi Disable Initial Unsolicited"
                  onChange={(e) => {
                    setState({ ...state, mwiDisableInitialUnsolicited: e.target.checked });
                  }}
                  checked={state.mwiDisableInitialUnsolicited}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="contactExpirationCheckInterval"
              >
                <Form.Label>Contact Expiration Check Interval</Form.Label>
                <Form.Control
                  type="number"
                  required={true}
                  onChange={(e) => {
                    setState({ ...state, contactExpirationCheckInterval: parseInt(e.target.value) });
                  }}
                  value={state.contactExpirationCheckInterval}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="defaultFromUser">
                <Form.Label>Default From User</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => {
                    setState({ ...state, defaultFromUser: e.target.value });
                  }}
                  value={state.defaultFromUser}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="defaultOutboundEndpoint">
                <Form.Label>Default Outbound Endpoint</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => {
                    setState({ ...state, defaultOutboundEndpoint: e.target.value });
                  }}
                  value={state.defaultOutboundEndpoint}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="defaultRealm">
                <Form.Label>Default Realm</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => {
                    setState({ ...state, defaultRealm: e.target.value });
                  }}
                  value={state.defaultRealm}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="defaultVoicemailExtension">
                <Form.Label>Default Voicemail Extension</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setState({ ...state, defaultVoicemailExtension: e.target.value });
                  }}
                  value={state.defaultVoicemailExtension}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="endpointIdentifierOrder">
                <Form.Label>Endpoint Identifier Order</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setState({ ...state, endpointIdentifierOrder: e.target.value });
                  }}
                  value={state.endpointIdentifierOrder}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="keepAliveInterval">
                <Form.Label>Keep Alive nterval</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => {
                    setState({ ...state, keepAliveInterval: parseInt(e.target.value) });
                  }}
                  value={state.keepAliveInterval}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="maxForwards">
                <Form.Label>Max Forwards</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => {
                    setState({ ...state, maxForwards: parseInt(e.target.value) });
                  }}
                  value={state.maxForwards}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="mwiTpsQueueHigh">
                <Form.Label>MWI TPS Queue High</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => {
                    setState({ ...state, mwiTpsQueueHigh: parseInt(e.target.value) });
                  }}
                  value={state.mwiTpsQueueHigh}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="mwiTpsQueueLow">
                <Form.Label>MWI TPS Queue Low</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => {
                    setState({ ...state, mwiTpsQueueLow: parseInt(e.target.value) });
                  }}
                  value={state.mwiTpsQueueLow}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="regcontext">
                <Form.Label>Regcontext</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setState({ ...state, regcontext: e.target.value });
                  }}
                  value={state.regcontext}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="unidentifiedRequestCount">
                <Form.Label>Unidentified Request Count</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => {
                    setState({ ...state, unidentifiedRequestCount: parseInt(e.target.value) });
                  }}
                  value={state.unidentifiedRequestCount}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="unidentifiedRequestPeriod">
                <Form.Label>Unidentified Request Period</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => {
                    setState({ ...state, unidentifiedRequestPeriod: parseInt(e.target.value) });
                  }}
                  value={state.unidentifiedRequestPeriod}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="unidentifiedRequestPruneInterval"
              >
                <Form.Label>Unidentified Request Prune Interval</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => {
                    setState({ ...state, unidentifiedRequestPruneInterval: parseInt(e.target.value) });
                  }}
                  value={state.unidentifiedRequestPruneInterval}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="userAgent">
                <Form.Label>User Agent</Form.Label>
                <Form.Control
                  type="text"
                  required
                  minLength={1}
                  onChange={(e) => {
                    setState({ ...state, userAgent: e.target.value });
                  }}
                  value={state.userAgent}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="maxInitialQualifyTime">
                <Form.Label>Max Initial Qualify Time</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  max={100}
                  onChange={(e) => {
                    setState({ ...state, maxInitialQualifyTime: parseInt(e.target.value) });
                  }}
                  value={state.maxInitialQualifyTime}
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

export default SipGlobals;
