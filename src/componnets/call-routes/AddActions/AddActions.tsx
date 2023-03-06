import { useEffect, useState } from "react";
import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ToolTipCustom from "../../reuseables/tooltip/ToolTipCustom";
import { PlineActions } from "../../services/PlineActions";
import ModalCustom from "../../reuseables/modal/ModalCustom";
import ActionsForm from "./ActionsForm";
import PlineTools from "../../services/PlineTools";

function AddActions(props: any) {
    var data = Object.values(PlineActions).filter(value => typeof value === 'string');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modaltype, setmodalType] = useState({});
    const [sizeModal, setSizeModal] = useState("");
    const [state, setState] = useState({
        action: "",
        options: []
    });
    const setActionType = (e: any) => {
        switch (e) {
            case "0":
                getActionLists(0);
                setSizeModal("lg");
                setModalIsOpen(true);
                setmodalType(
                    <ActionsForm data={state} title="Sip User" type="text" label="Sip User" name="sipUser" />
                );
                break;
            case "1":
                setModalIsOpen(true);
                setmodalType(
                    <ActionsForm title="Ring Group" type="list" />
                );
                break;
            case "2":
                setModalIsOpen(true);
                setmodalType(
                    <ActionsForm title="IVR" type="list" />
                );
                break;
            case "3":
                setModalIsOpen(true);
                setmodalType(
                    <ActionsForm title="Queue" type="list" />
                );
                break;
            case "4":
                setModalIsOpen(true);
                setmodalType(
                    <ActionsForm title="Time Condition" type="time" />
                );
                break;
            case "5":
                setModalIsOpen(true);
                setmodalType(
                    <ActionsForm
                        title="Announcement"
                        type="list"
                    />
                );
                break;
            case "6":
                setModalIsOpen(true);
                setmodalType(
                    <ActionsForm
                        title="SIP Trunk Transit"
                        type="list"
                    />
                );
                break;
            case "7":
                setModalIsOpen(true);
                setmodalType(
                    <ActionsForm
                        title="Call On SIP Trunk"
                        type="list"
                    />
                )
                break;
            case "8":
                setModalIsOpen(true);
                setmodalType(
                    <ActionsForm
                        title="Direct Dial"
                        type="text2"
                    />
                );
                break;
            case "9":
                setModalIsOpen(true);
                setmodalType(
                    <ActionsForm
                        title="API Interface"
                        type="list"
                    />
                );
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
            <Row>
                <ModalCustom
                    size={sizeModal}
                    show={modalIsOpen}
                    onHide={() => setModalIsOpen(false)}
                >
                    {modaltype}
                </ModalCustom>
            </Row>
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
                                <option value={0}>Select Action Type</option>
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
                            <Button
                                variant="primary"
                                onClick={() => {

                                }}
                            >
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