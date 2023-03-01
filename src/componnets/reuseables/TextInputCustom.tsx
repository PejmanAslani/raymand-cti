import React from 'react'
import { Col, OverlayTrigger, Placeholder, Tooltip } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import * as icons from 'react-bootstrap-icons';
import ToolTipCustom from './tooltip/ToolTipCustom';
const TextInputCustom = (props: any) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (props.type === "number") {
      props.setState((state: any) => ({
        ...state,
        [name]: parseInt(value),
      }));
    } else {
      props.setState((state: any) => ({
        ...state,
        [name]: value,
      }));
    };
  }
  return (
    <Col md={props.md}>
      {props.disabled == false &&
        <Form.Group
          className="mb-3"
          controlId={props.name}>
          <Form.Label>{props.label}</Form.Label>
          <ToolTipCustom />
          <Form.Control
            name={props.name}
            disabled={props.disabled}
            type={props.type}
            required={props.required}
            value={props.value}
            isInvalid={!!props.error}
            onChange={handleChange}
            min={props.min}
            placeholder={props.placeholder}
          />
          <Form.Control.Feedback type="invalid">
            {props.error}
          </Form.Control.Feedback>
        </Form.Group>
      }
    </Col>

  )
}
TextInputCustom.defaultProps = {
  requir: false,
  disabled: false,
  type: "text",
  min: null,
  md: 6,
  Placeholder: "",
  error: "",

}
export default TextInputCustom