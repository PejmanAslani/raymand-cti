import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import TextInputCustom from '../../../reuseables/TextInputCustom'
import PlineTools, { TypeAlert } from '../../../services/PlineTools'


const BulkDeleteUsers = (props: any) => {

  const [state, setState] = useState({
    range: ""
  })
  const saveData = (e: any) => {
    e.preventDefault();
    if (window.confirm(`Are you sure of deleting sip users in the range ${state.range} ?`)) {
      let url = "/sip-users/delete-group-sip-users";
      PlineTools.postRequest(url, state)
        .then((result) => {
          if (result.data.hasError) {
            PlineTools.errorDialogMessage("Invalid Range");
          } else {
            props.modal(false);
            props.reload()
          }
        })
        .catch((error) => {
          PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");

        });
    }
  };
  return (
    <Row>
      <Form onSubmit={saveData} >
        <Col md={{ span: 8, offset: 2 }}>
          <h5>Delete Users As Group</h5>
          <hr />
          <Row>
            <TextInputCustom
              md={8}
              name="range"
              label="Range"
              value={state.range}
              placeholder="Example 100-120,125,127,300-310,400,402"
              setState={setState}
            />
          </Row>
          <Button
            variant="primary" type="submit">
            Delete
          </Button>
          {" "}
          <Button
            variant="danger" onClick={() => props.modal(false)}>
            Exit
          </Button>
        </Col>
      </Form>
    </Row>
  )
}

export default BulkDeleteUsers