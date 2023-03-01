import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ToolTipCustom from "../../../reuseables/tooltip/ToolTipCustom";
import PlineTools, { TypeAlert } from "../../../services/PlineTools";
import TextInputCustom from "../../../reuseables/TextInputCustom";
import TextareaCustom from "../../../reuseables/TextareaCustom";
const BulkEditUsers = () => {
  const params = useParams();
  const [state, setState] = useState({
    usersRange: "",
    password: "",
    upPassword: false,
    callerIdNumber: "",
    upCallerIdNumber: false,
    callerIdName: "",
    upCallerIdName: false,
    outboundCallerIdNumber: "",
    upOutboundCallerIdNumber: false,
    outboundCallerIdName: "",
    upOutboundCallerIdName: false,
    sipProfile: {
      id: 0,
    },
    upSipProfile: false,
    sipUserGroup: {
      id: 0,
    },
    upSipUserGroup: false,
    acl: "",
    upAcl: false,
    enable: true,
    upEnable: false,
  });
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    profileOptions: [],
    sipGroupOptions: [],
  });
  const saveData = (e: any) => {
    e.preventDefault();

    let url = "/sip-users/bulk-edit-sip-users";
    PlineTools.postRequest(url, state)

      .then((result) => {
        if (result.data.hasError) {
          PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
        } else {
          navigate("/sip-users/index");
        }
      })
      .catch((error) => {
        PlineTools.errorDialogMessage(
          "An error occurred while executing your request. Contact the system administrator"
        );
      });
  };
  const load = () => {
    PlineTools.getRequest("/sip-users/get-profiles-group")
      .then((result) => {
        setOptions({
          ...options,
          profileOptions: result.data.profiles,
          sipGroupOptions: result.data.sipGroups,
        });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          error.response.data.forEach((value: any) => {
            PlineTools.errorDialogMessage(value.message);
          });
        }
      })
      .finally(() => {
        let id = params.id;
        if (id !== undefined) {
          const url = "/sip-users/" + id;
          PlineTools.getRequest(url)
            .then((result: any) => {
              setState(result.data);
            })
            .catch(() => {
              PlineTools.errorDialogMessage("Getting Data failed");
            });
        }
      });
  };
  useEffect(() => {
    load();
  }, []);
  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h5>Bulk Edit SIP Users</h5>
        <hr />
        <Form onSubmit={saveData}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId={"usersRange"}>
                <Form.Label style={{ marginLeft: "6px" }}>
                  Users Range
                </Form.Label>
                <ToolTipCustom />
                <Form.Control
                  name="usersRange"
                  required={true}
                  placeholder="Example 100-120,300-310,400-450"
                  onChange={(e) =>
                    setState({
                      ...state,
                      usersRange: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId={"password"}>
                <input
                  style={{ marginLeft: "6px" }}
                  onChange={(e) => {
                    setState({ ...state, upPassword: e.target.checked });
                  }}
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <Form.Label style={{ marginLeft: "6px" }}>Password</Form.Label>
                <ToolTipCustom />
                <Form.Control
                  name="password"
                  onChange={(e) =>
                    setState({
                      ...state,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId={"callerIdNumber"}>
                <input
                  style={{ marginLeft: "6px" }}
                  onChange={(e) => {
                    setState({ ...state, upCallerIdNumber: e.target.checked });
                  }}
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <Form.Label style={{ marginLeft: "6px" }}>
                  Caller ID Number
                </Form.Label>
                <ToolTipCustom />
                <Form.Control
                  name="callerIdNumber"
                  onChange={(e) =>
                    setState({
                      ...state,
                      callerIdNumber: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId={"callerIdName"}>
                <input
                  style={{ marginLeft: "6px" }}
                  onChange={(e) => {
                    setState({ ...state, upCallerIdName: e.target.checked });
                  }}
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <Form.Label style={{ marginLeft: "6px" }}>
                  Caller ID Name
                </Form.Label>
                <ToolTipCustom />
                <Form.Control
                  name="callerIdName"
                  onChange={(e) =>
                    setState({
                      ...state,
                      callerIdName: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId={"outboundCallerIdNumber"}>
                <input
                  onChange={(e) => {
                    setState({
                      ...state,
                      upOutboundCallerIdNumber: e.target.checked,
                    });
                  }}
                  style={{ marginLeft: "6px" }}
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <Form.Label style={{ marginLeft: "6px" }}>
                  Outbound Caller ID Number
                </Form.Label>
                <ToolTipCustom />
                <Form.Control
                  name="outBoundCallerIdNumber"
                  onChange={(e) =>
                    setState({
                      ...state,
                      outboundCallerIdNumber: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId={"outboundCallerIdName"}>
                <input
                  onChange={(e) => {
                    setState({
                      ...state,
                      upOutboundCallerIdName: e.target.checked,
                    });
                  }}
                  style={{ marginLeft: "6px" }}
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <Form.Label style={{ marginLeft: "6px" }}>
                  Outbound Caller ID Name
                </Form.Label>
                <ToolTipCustom />
                <Form.Control
                  name="outboundCallerIdName"
                  onChange={(e) =>
                    setState({
                      ...state,
                      outboundCallerIdName: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="sipProfiles">
                <input
                  onChange={(e) => {
                    setState({ ...state, upSipProfile: e.target.checked });
                  }}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />

                <Form.Label style={{ marginLeft: "6px" }}>
                  SIP User Groups
                </Form.Label>
                <ToolTipCustom />
                <select
                  className={"form-select"}
                  value={state.sipUserGroup.id}
                  onChange={(e) => {
                    setState({
                      ...state,
                      sipUserGroup: { id: parseInt(e.target.value) },
                    });
                  }}
                >
                  <option value={0}>Select User Group ...</option>
                  {options.sipGroupOptions.map((opt: any) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="sipProfiles">
                <input
                  onChange={(e) => {
                    setState({ ...state, upSipUserGroup: e.target.checked });
                  }}
                  style={{ marginLeft: "6px" }}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <Form.Label style={{ marginLeft: "6px" }}>
                  SIP Profiles
                </Form.Label>
                <ToolTipCustom />
                <select
                  className={"form-select"}
                  value={state.sipProfile.id}
                  onChange={(e) => {
                    setState({
                      ...state,
                      sipProfile: { id: parseInt(e.target.value) },
                    });
                  }}
                >
                  <option value={0}>Select Profile ...</option>
                  {options.profileOptions.map((opt: any) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId={"acl"}>
                <input
                  onChange={(e) => {
                    setState({ ...state, upAcl: e.target.checked });
                  }}
                  style={{ marginLeft: "6px" }}
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <Form.Label style={{ marginLeft: "6px" }}>Acl</Form.Label>
                <ToolTipCustom />
                <Form.Control
                  as={"textarea"}
                  rows={3}
                  name="acl"
                  onChange={(e) =>
                    setState({
                      ...state,
                      acl: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="enable">
                <input
                  onChange={(e) => {
                    setState({ ...state, upEnable: e.target.checked });
                  }}
                  style={{ marginLeft: "6px" }}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <Form.Label style={{ marginLeft: "6px" }}>Enable</Form.Label>
                <ToolTipCustom />
                <select
                  className={"form-select"}
                  onChange={(e) => {
                    let result;
                    if (e.target.value === "true") {
                      result = true;
                    } else {
                      result = false;
                    }
                    setState({ ...state, enable: result });
                  }}
                >
                  <option value={"true"}>Enable</option>
                  <option value={"false"}>Disable</option>
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Save
          </Button>{" "}
          <Button
            onClick={() => {
              navigate("/sip-users/index");
            }}
            variant="danger"
            type="button"
          >
            Cancel
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default BulkEditUsers;
