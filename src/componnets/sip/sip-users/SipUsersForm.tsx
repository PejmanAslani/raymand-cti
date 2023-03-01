import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CheckboxCustom from "../../reuseables/CheckboxCustom";
import TextareaCustom from "../../reuseables/TextareaCustom";
import TextInputCustom from "../../reuseables/TextInputCustom";
import PlineTools, { TypeAlert } from "../../services/PlineTools";
import * as icons from "react-bootstrap-icons";
import ToolTipCustom from "../../reuseables/tooltip/ToolTipCustom";
const SipUsersForm = (props: any) => {
  const params = useParams();
  const [state, setState] = useState({
    id: null,
    uid: "",
    parallel: "",
    acl: "",
    password: "",
    callerIdNumber: "",
    callerIdName: "",
    outboundCallerIdNumber: "",
    outboundCallerIdName: "",
    sipProfile: {
      id: 0,
    },
    sipUserGroup: {
      id: 0,
    },
    enable: true,
  });
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    profileOptions: [],
    sipGroupOptions: [],
  });
  const saveData = (e: any) => {
    e.preventDefault();
    let url = "/sip-users";
    if (state.id == null) {
      PlineTools.postRequest(url, state)
        .then((result: any) => {
          if (result.data.hasError) {
            PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
          } else {
            navigate("/sip-users/index");
          }
        })
        .catch((error: any) => {
          PlineTools.errorDialogMessage(
            "An error occurred while executing your request. Contact the system administrator"
          );
        });
    } else {
      PlineTools.patchRequest(url, state)
        .then((result: any) => {
          if (result.data.hasError) {
            PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
          } else {
            navigate("/sip-users/index");
          }
        })
        .catch((error: any) => {
          PlineTools.errorDialogMessage(
            "An error occurred while executing your request. Contact the system administrator"
          );
        });
    }
  };
  const getData = () => {
    const id = params.id;
    if (id != undefined) {
      PlineTools.getRequest("/sip-users/" + id)
        .then((result) => {
          setState(result.data);
        })
        .catch(() => {
          PlineTools.errorDialogMessage(
            "An error occurred while executing your request. Contact the system administrator"
          );
        });
    }
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
    getData();
    load();
  }, []);

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h5>SIP User</h5>
        <hr />
        <Form onSubmit={saveData}>
          <Row>
            <CheckboxCustom
              label="Enable"
              name="enable"
              checked={state.enable}
              setState={setState}
            />
          </Row>
          <Row>
            <TextInputCustom
              name="uid"
              label="SIP User"
              type="text"
              requir={true}
              value={state.uid}
              setState={setState}
            />
            <TextInputCustom
              name="password"
              label="Password"
              type="text"
              require={true}
              value={state.password}
              setState={setState}
            />
          </Row>
          <Row>
            <TextInputCustom
              name="callerIdNumber"
              label="CallerId Number"
              type="text"
              require={true}
              value={state.callerIdNumber}
              setState={setState}
            />
            <TextInputCustom
              name="callerIdName"
              label="CallerId Name"
              type="text"
              require={true}
              value={state.callerIdName}
              setState={setState}
            />
          </Row>
          <Row>
            <TextInputCustom
              name="outboundCallerIdNumber"
              label="Outbound CallerId Number"
              type="text"
              require={true}
              value={state.outboundCallerIdNumber}
              setState={setState}
            />
            <TextInputCustom
              name="outboundCallerIdName"
              label="Outbound CallerId Name"
              type="text"
              require={true}
              value={state.outboundCallerIdName}
              setState={setState}
            />
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="sipProfiles">
                <Form.Label>SIP User Groups</Form.Label>
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
                <Form.Label>SIP Profiles</Form.Label>
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
            <TextareaCustom
              name="acl"
              label="Acl"
              value={state.acl}
              setState={setState}
            />
            <TextInputCustom
              label="Parallel"
              name="parallel"
              type="text"
              require={true}
              value={state.parallel}
              setState={setState}
            />
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

export default SipUsersForm;
