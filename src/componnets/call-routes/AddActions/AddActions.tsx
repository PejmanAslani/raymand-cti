import { useEffect, useState } from "react";
import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ToolTipCustom from "../../reuseables/tooltip/ToolTipCustom";
import { IPlineActions, PlineActions } from "../../services/PlineActions";
import ModalCustom from "../../reuseables/modal/ModalCustom";
import ActionsForm from "./ActionsForm";
import PlineTools from "../../services/PlineTools";


function AddActions(props: any) {

    var data = Object.values(PlineActions).filter(value => typeof value === 'string');
    const [state, setState] = useState<IPlineActions>({
        id: props.id,
        action: PlineActions.SIPUser,
        value: null,
        options: null,
    });

    const setActionType = (e: PlineActions) => {
        switch (e) {
            case PlineActions.SIPUser:

                break;
            case PlineActions.RingGroup:

                break;
            case PlineActions.IVR:

                break;
            case PlineActions.Queue:

                break;
            case PlineActions.TimeCondition:

                break;
            case PlineActions.Announcement:

                break;
            case PlineActions.SIPTrunkTransit:

                break;
            case PlineActions.CallOnSIPTrunk:

                break;
            case PlineActions.DirectDial:

                break;
            case PlineActions.APIInterface:

                break;
        }
    }
    const getActionLists = (action: any) => {

    }
    //Load Component
    useEffect(() => {

    }, []);
    //Add New pattern
    return (
        <div className="container">
            <h3> Add Action</h3>
            <hr />

            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="sipProfiles">
                            <Form.Label>Actions</Form.Label>
                            <ToolTipCustom />
                            <select
                                className={"form-select"}
                                onChange={(e: any) => {
                                    setActionType(e.target.value)
                                }}
                            >
                                <option value={10}>Select Action Type</option>
                                {data.map((key: any, value: any) => (
                                    <option key={key} value={value}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </Form.Group>
                    </Col>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={() => { }}>
                                Save
                            </Button>
                            {" "}
                            <Button
                                variant="danger"
                                onClick={() => {
                                    props.modal(false)
                                }}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Row>
                <Row></Row>
            </Form>

        </div>
    );
}
export default AddActions;