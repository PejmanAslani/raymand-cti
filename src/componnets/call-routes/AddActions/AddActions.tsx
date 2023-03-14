import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import ToolTipCustom from "../../reuseables/tooltip/ToolTipCustom";
import { IPlineActions, PlineActions } from "../../services/PlineActions";
import PlineTools from "../../services/PlineTools";

function AddActions(props: any) {

    var data = Object.values(PlineActions).filter(value => typeof value === 'string');
    const [state, setState] = useState<IPlineActions>({
        id: null,
        inboundRoute: {
            id: 1
        },
        action: PlineActions["none"],
        value: null,
        options: null,
    });
    const [dyForm, setDyForm] = useState<any>({
        label: "",
        name: "",
        type: "",
        options: [],
        optionName: "",
        optionLabel: "",
        optionName2: "",
        optionLabel2: ""
    })
    const Reset = () => {
        setState({
            id: null,
            inboundRoute: {
                id: 1
            },
            action: PlineActions["none"],
            value: null,
            options: null,
        })
        setDyForm({
            label: "",
            name: "",
            type: "",
            options: null,
            optionName: "",
            optionLabel: "",
            optionName2: "",
            optionLabel2: ""
        })
    }
    const save = (e: any) => {
        e.preventDefault();
        if (state.action === PlineActions.none) {
            PlineTools.errorDialogMessage("Select A Action Before Save")
        }else {
            PlineTools.errorDialogMessage("OK")
        }

    }
    // Option Sip User
    const getUsers = (size=9999) => {
        PlineTools.getRequest(`/sip-users/?size=${size}`).then((data) => {
            let values: any[] = [];
            for (let i = 0; i < data.data.content.length; i++) {
                var obj = {};
                obj = { id: data.data.content[i].id, name: data.data.content[i].uid }
                values.push(obj)
            }
            setDyForm({ ...dyForm, name: "sipUsers", label: "Sip Users", options: values, type: "select" })
        }).catch((error) => {
            PlineTools.errorDialogMessage(error);
        })
    }
    //Option Sip trunk Transit
    const trunkTransit = () => {
        PlineTools.getRequest("/sip-trunks/").then((data) => {
            let values: any[] = [];
            for (let i = 0; i < data.data.content.length; i++) {
                var obj = {};
                obj = { id: data.data.content[i].id, name: data.data.content[i].name }
                values.push(obj)
            }
            setDyForm({
                ...dyForm,
                name: "SIPTrunkTransit",
                label: "SIP Trunk Transit",
                options: values,
                type: "multi",
                optionLabel: "Options"
            })
        })
    }
    //Detect Action From Select
    const setActionType = (e: any) => {
        switch (e) {
            case "0":
                Reset();
                setState({ ...state, action: 0, options: null })
                getUsers();
                break;
            case "1":
                Reset();
                setState({ ...state, action: 1 })
                setDyForm({ ...dyForm, name: "RingGroup", label: "Ring Group", type: "select", options: [] })
                break;
            case "2":
                Reset();
                setState({ ...state, action: 2, options: null })
                setDyForm({ ...dyForm, name: "IVR", label: "IVR", type: "select", options: [] })
                break;
            case "3":
                Reset();
                setState({ ...state, action: 3, options: null })
                setDyForm({ ...dyForm, name: "Queue", label: "Queue", type: "select", options: [] })
                break;
            case "4":
                Reset();
                setState({ ...state, action: 4, options: null })
                setDyForm({ ...dyForm, name: "TimeCondition", label: "Time Condition", type: "select", options: [] })
                break;
            case "5":
                Reset();
                setState({ ...state, action: 5, options: null })
                setDyForm({ ...dyForm, name: "Announcement", label: "Announcement", type: "select", options: [] })
                break;
            case "6":
                Reset();
                setState({ ...state, action: 6 })
                trunkTransit()
                break;
            case "7":
                Reset();
                setState({ ...state, action: 7, options: null })
                setDyForm({ ...dyForm, name: "CallOnSIPTrunk", label: "Call On SIP Trunk", type: "select", options: [] })
                break;
            case "8":
                Reset();
                setState({ ...state, action: 8, options: null })
                setDyForm({
                    ...dyForm,
                    name: "Add Prefix",
                    label: "Add Prefix",
                    type: "multiText",
                    optionName: "DropNumber",
                    optionLabel: "Drop Number",
                    options: []
                })
                break;
            case "9":
                Reset();
                setState({ ...state, action: 9, options: null })
                setDyForm({ ...dyForm, name: "APIInterface", label: "API Interface", type: "select", options: [] })
                break;
            case "10":
                Reset();
                setState({ ...state, action: 10, options: null })
                setDyForm({ ...dyForm, name: "Reject", label: "Reject", type: "triple", options: [] })
                break;
            case "11":
                Reset();
                setState({ ...state, action: 10, options: null })
                setDyForm({ ...dyForm, name: "Fax", label: "Fax", type: "" })
                break;
            case "*":
                Reset();
                setDyForm({ ...dyForm, type: "", name: "", label: "", options: [] })
                break;
        }
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
                <Card>
                    <Card.Body>
                        <Card.Title>{dyForm.label}</Card.Title>
                        <Form onSubmit={save}>
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
                                            <option value={"*"}>Select Action Type</option>
                                            {data.map((key: any, value: any) => (
                                                <option key={key} value={value}>
                                                    {key}
                                                </option>
                                            ))}
                                        </select>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={6}>
                                    {
                                        dyForm.type === "select" ?
                                            <Form.Group className="mb-3" controlId={dyForm.name}>
                                                <Form.Label>{dyForm.label}</Form.Label>
                                                <select
                                                    className={"form-select"}
                                                    onChange={(e: any) => {
                                                        setState({ ...state, value: e.target.value })
                                                    }}
                                                >
                                                    <option value="">{`Select ${dyForm.label}`}</option>
                                                    {dyForm.options.map((opt: any) => (
                                                        <option key={opt.id} value={opt.id}>
                                                            {opt.name}
                                                        </option>
                                                    ))}
                                                </select>

                                            </Form.Group>
                                            : dyForm.type === "multi" ?
                                                <Form.Group className="mb-3" controlId={dyForm.name}>
                                                    <Form.Label>{dyForm.label}</Form.Label>
                                                    <select
                                                        className={"form-select"}
                                                        onChange={(e: any) => {
                                                            setState({ ...state, value: e.target.value })
                                                        }}
                                                    >
                                                        <option value="">{`Select ${dyForm.label}`}</option>
                                                        {dyForm.options.map((opt: any) => (
                                                            <option key={opt.id} value={opt.id}>
                                                                {opt.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <br />
                                                    <Form.Label>{dyForm.optionLabel}</Form.Label>
                                                    <ToolTipCustom />
                                                    <Form.Control
                                                        name={dyForm.name}
                                                        required={true}
                                                        onChange={(e: any) => {
                                                            setState({ ...state, options: e.target.value })
                                                        }}
                                                    />
                                                </Form.Group> :
                                                dyForm.type === "text" ?
                                                    <Form.Group>
                                                        <Form.Label>{dyForm.label}</Form.Label>
                                                        <ToolTipCustom />
                                                        <Form.Control
                                                            name={dyForm.name}
                                                            required={true}
                                                            onChange={(e: any) => {
                                                                setState({ ...state, options: e.target.value })
                                                            }}
                                                        /></Form.Group> : dyForm.type === "multiText" ?
                                                        <>
                                                            <Form.Group>
                                                                <Form.Label>{dyForm.label}</Form.Label>
                                                                <ToolTipCustom />
                                                                <Form.Control
                                                                    name={dyForm.name}
                                                                    required={true}
                                                                    onChange={(e: any) => {
                                                                        setState({ ...state, value: e.target.value })
                                                                    }}
                                                                /></Form.Group>
                                                            <Form.Group>
                                                                <Form.Label>{dyForm.optionLabel}</Form.Label>
                                                                <ToolTipCustom />
                                                                <Form.Control
                                                                    name={dyForm.optionName}
                                                                    required={false}
                                                                    onChange={(e: any) => {
                                                                        setState({ ...state, options: e.target.value })
                                                                    }}
                                                                /></Form.Group>
                                                        </> : dyForm.type === "triple" ?
                                                            <>
                                                                <Form.Group>
                                                                    <Form.Label>{dyForm.label}</Form.Label>
                                                                    <ToolTipCustom />
                                                                    <Form.Control
                                                                        name={dyForm.name}
                                                                        required={false}
                                                                        onChange={(e: any) => {
                                                                            setState({ ...state, value: e.target.value })
                                                                        }}
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group>
                                                                    <Form.Label>{dyForm.optionLabel}</Form.Label>
                                                                    <ToolTipCustom />
                                                                    <Form.Control
                                                                        name={dyForm.optionName}
                                                                        required={false}
                                                                        onChange={(e: any) => {
                                                                            setState({ ...state, options: e.target.value })
                                                                        }}
                                                                    /></Form.Group>
                                                                <Form.Group>
                                                                    <Form.Label>{dyForm.optionLabel2}</Form.Label>
                                                                    <ToolTipCustom />
                                                                    <Form.Control
                                                                        name={dyForm.optionName2}
                                                                        required={false}
                                                                        onChange={(e: any) => {
                                                                            setState({ ...state, options: e.target.value })
                                                                        }}
                                                                    />
                                                                </Form.Group>

                                                            </> : <></>
                                    }
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Button variant="primary" type="submit">
                                        SAVE
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
                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </div>
    );
}

export default AddActions;