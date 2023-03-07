import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import PlineTools, { TypeAlert } from "../../services/PlineTools";
import TextareaCustom from "../../reuseables/TextareaCustom";
import TextInputCustom from "../../reuseables/TextInputCustom";
import CheckboxCustom from "../../reuseables/CheckboxCustom";
const SipProfileForm = (props: any) => {
  const [state, setState] = useState({
    id: null,
    name: "",
    enable: true,
    description: "",
  });
  const saveData = (e: any) => {
    e.preventDefault();
    let url = "/sip-profiles";
    if (state.id == null) {
      PlineTools.postRequest(url, state)
        .then((result: any) => {
          if (result.data.hasError) {
            PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
          } else {
            props.modal(false);
            props.reload()
          }
        })
        .catch((error: any) => {
          PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
        });

    } else {
      PlineTools.patchRequest(url, state).then((result: any) => {
        if (result.data.hasError) {
          PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
        } else {
          props.modal(false);
          props.reload()
        }
      })
        .catch((error: any) => {
          PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
        });
    }
  }

  const getData = () => {
    const id = props.id;
    if (id != undefined) {
      PlineTools.getRequest("/sip-profiles/" + id)
        .then((result: any) => {
          setState(result.data);
        })
        .catch(() => {
          PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
        });
    }
  };
  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h5>SIP Profiles</h5>
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
                name="name"
                label="Name" require={true} value={state.name} setState={setState} />
            </Row>
            <Row>
              <TextareaCustom name="description" label="Description" value={state.description} setState={setState} />
            </Row>
            <Button variant="primary" type="submit">
              Save
            </Button>{" "}
            <Button
              onClick={() => {
                props.modal(false)
              }}
              variant="danger"
              type="button"
            >
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SipProfileForm;
