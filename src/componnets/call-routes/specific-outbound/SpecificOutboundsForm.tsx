import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CheckboxCustom from "../../reuseables/CheckboxCustom";
import TextInputCustom from "../../reuseables/TextInputCustom";
import TextareaCustom from "../../reuseables/TextareaCustom";

import PlineTools, { TypeAlert } from "../../services/PlineTools";

const SpecificOutboundsForm = (props: any) => {
  const [state, setState] = useState({
    id: null,
    name: "",
    sequential: 0,
    privateRoute: true,
    enable: true,
    description: "",
  });

  const saveData = (e: any) => {
    e.preventDefault();
    let url = "/outbound-routes";
    if (state.id == null) {
      PlineTools.postRequest(url, state)
        .then((result: any) => {
          if (result.data.hasError) {
            PlineTools.errorDialogMessage(result.data.messages);
          } else {
            props.modal(false);
            props.reload();
          }
        })
        .catch((error) => {
          PlineTools.errorDialogMessage(
            "An error occurred while executing your request. Contact the system administrator"
          );
        });
    } else {
      PlineTools.patchRequest(url, state)
        .then((result) => {
          if (result.data.hasError) {
            PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
          } else {
            props.modal(false);
            props.reload();
          }
        })
        .catch((error) => {
          PlineTools.errorDialogMessage(
            "An error occurred while executing your request. Contact the system administrator"
          );
        });
    }
  };
  const getData = () => {
    const id = props.id;
    if (id != undefined) {
      PlineTools.getRequest("/outbound-routes/" + id)
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
  useEffect(() => {
    getData();

  }, []);

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h5>Specific Outbound Routes</h5>
        <hr />
        <Form onSubmit={saveData}>
          <Row>
            <TextInputCustom
              name="name"
              label="Name"
              value={state.name}
              setState={setState}
              require={true}
            />

            <TextareaCustom
              name="description"
              label="Description"
              value={state.description}
              setState={setState}
              md={12}
            />
          </Row>
          <Row>
            <Col md={12}>
              <Button variant="primary" type="submit">
                Save
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => {
                  props.modal(false);
                }}
              >
                Exit
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default SpecificOutboundsForm;

SpecificOutboundsForm.defaultProps = {
  id: null,
};
