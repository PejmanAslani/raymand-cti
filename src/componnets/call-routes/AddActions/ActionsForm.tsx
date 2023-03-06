import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from "react-bootstrap";
import TextInputCustom from "../../reuseables/TextInputCustom";


const ActionsForm = (props: any) => {
    const [state, setState] = useState({
        id: null,
        action: "",
        value: ""
    });
    const save = (e: any) => {
        e.preventDefault();
    }
    useEffect(() => {
    }, [])

    return (
        <div>
            <h3>{props.title}</h3>
            <hr />
            <Row>
                <Col>
                    <Form onSubmit={save}>
                        {
                            props.type === "text" ?
                                <TextInputCustom
                                    name={props.name}
                                    label={props.label}
                                />
                                : props.type === "list" ?
                                    <Col md={6}>
                                        <Form.Group className="md-6 " controlId="sipProfiles">
                                            <Form.Label>{props.label}</Form.Label>
                                            <select className={"form-select"}>
                                                <option>Select</option>
                                            </select>
                                        </Form.Group>
                                    </Col>
                                    : props.type === "dualtext" ?
                                        <>
                                            <TextInputCustom />
                                            <TextInputCustom />
                                        </>
                                        : <>
                                        </>
                        }
                        {" "}
                        <br />
                        <Button variant="primary">
                            save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default ActionsForm