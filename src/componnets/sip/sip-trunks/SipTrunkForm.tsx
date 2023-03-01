import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import CheckboxCustom from "../../reuseables/CheckboxCustom";
import TextareaCustom from "../../reuseables/TextareaCustom";
import TextInputCustom from "../../reuseables/TextInputCustom";
import PlineTools, { TypeAlert } from "../../services/PlineTools";
import TooltipCustom from "../../reuseables/tooltip/ToolTipCustom";
import { useNavigate, useParams } from "react-router";
const SipTrunkForm = (props: any) => {
    const params = useParams();
    const navigate = useNavigate();
    const [isrequire, setRequire] = useState({
        proxy: {
            req: false,
            disabled: false
        },
        username: false,
        password: false,

    });
    const [state, setState] = useState({
        id: null,
        name: "",
        acl: "",
        sipProfile: { id: 0 },
        username: "",
        password: "",
        fromUser: "",
        fromDomain: "",
        callerIdName: "",
        callerIdNumber: "",
        maxCalls: 0,
        proxy: "",
        enable: false,
        registerMode: "",
        description: ""

    });
    const [options, setOptions] = useState([]);

    const load = () => {
        PlineTools.getRequest("/sip-profiles/all")
            .then((result) => {
                setOptions(result.data);
            })
            .catch((error) => {
                PlineTools.errorDialogMessage("Failed To Get Profiles");
            })
            .finally(() => {
                let id = params.id;
                if (id !== undefined) {
                    const url = "/sip-trunks/" + id;
                    PlineTools.getRequest(url)
                        .then((result) => {
                            setState(result.data);
                            validationSet(result.data.registerMode);
                        })
                        .catch(() => {
                            PlineTools.errorDialogMessage("Getting Data failed");
                        });
                }
            });
    };

    const saveData = (e: any) => {
        e.preventDefault();
        if (state.sipProfile.id === 0) {
            PlineTools.showAlert(["SIP Profile not selected."], TypeAlert.Danger);
            return;
        }
        let url = "/sip-trunks";
        if (state.id == null) {
            PlineTools.postRequest(url, state)
                .then((result) => {
                    if (result.data.hasError) {
                        PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
                    } else {
                        navigate('/sip-trunks/index')
                    }
                })
                .catch((error) => {
                    PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
                });
        } else {
            PlineTools.patchRequest(url, state)
                .then((result) => {
                    if (result.data.hasError) {
                        PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
                    } else {
                        navigate('/sip-trunks/index')
                    }
                })
                .catch((error) => {
                    PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");

                });
        }

    };
    useEffect(() => {
        load();
    }, []);

    const validationSet = (register: string) => {
        if (register == "NoRegister") {
            setRequire({ ...isrequire, password: false, username: false, proxy: { req: true, disabled: false } });
        } else if (register == "Register") {
            setRequire({ ...isrequire, password: true, username: true, proxy: { req: true, disabled: false } });
        }
        else {
            setRequire({ ...isrequire, password: true, username: true, proxy: { req: false, disabled: true } });
        }
    }

    return (
        <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <h5>SIP Trunks</h5>
                <hr />
                <Form onSubmit={saveData} >
                    <Row>
                        <CheckboxCustom name="enable" label="Enable" checked={state.enable} setState={setState} />
                    </Row>
                    <Row>
                        <TextInputCustom
                            name="name"
                            label="Name"
                            required={true}
                            value={state.name}
                            setState={setState}
                        />
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="registerMode">
                                <Form.Label>Register Mode</Form.Label>
                                <TooltipCustom />
                                <select
                                    value={state.registerMode}
                                    className={"form-select"}
                                    onChange={(e) => {
                                        setState({ ...state, registerMode: e.target.value });
                                        validationSet(e.target.value);
                                    }}>
                                    <option value={"NoRegister"}>NoRegister</option>
                                    <option value={"Registrable"}>Registrable</option>
                                    <option value={"Register"}>Register</option>
                                </select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <TextInputCustom
                            name="username"
                            label="Username"
                            required={isrequire.username}
                            value={state.username}
                            setState={setState}
                        />
                        <TextInputCustom
                            name="password"
                            type="password"
                            label="Password"
                            required={isrequire.password}
                            value={state.password}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <TextInputCustom
                            name="fromUser"
                            label="From User"
                            required={false}
                            value={state.fromUser}
                            setState={setState}
                        />
                        <TextInputCustom
                            name="fromDomain"
                            label="From Domain"
                            required={false}
                            value={state.fromDomain}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <TextInputCustom
                            name="callerIdName"
                            label="Calller ID Name"
                            required={false}
                            value={state.callerIdName}
                            setState={setState}
                        />
                        <TextInputCustom
                            name="callerIdNumber"
                            label="Caller ID Number"
                            required={false}
                            value={state.callerIdNumber}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="sipProfile">
                                <Form.Label>SIP Profile</Form.Label>
                                <TooltipCustom />
                                <select
                                    className={"form-select"}
                                    value={state.sipProfile.id}
                                    onChange={(e) => {
                                        setState({ ...state, sipProfile: { id: parseInt(e.target.value) } });
                                    }}>
                                    <option value={0}>Select Profile ...</option>
                                    {options.map((opt: any) => (
                                        <option key={opt.id} value={opt.id}>
                                            {opt.name}
                                        </option>
                                    ))}
                                </select>
                            </Form.Group>
                        </Col>
                        <TextInputCustom
                            type="number"
                            name="maxCalls"
                            label="Max Call"
                            value={state.maxCalls}
                            setState={setState}
                            min={0}
                        />
                    </Row>
                    <Row>
                        <TextInputCustom
                            md={12}
                            name="proxy"
                            label="Proxy"
                            disabled={isrequire.proxy.disabled}
                            required={isrequire.proxy.req}
                            value={state.proxy}
                            setState={setState}
                            placeholder={"hostname[:port]"}
                        />
                    </Row>
                    <Row>
                        <TextareaCustom
                            name="description"
                            label="Description"
                            value={state.description}
                            setState={setState}
                        />
                        <TextareaCustom
                            name="acl"
                            label="Acl"
                            required={true}
                            value={state.acl}
                            setState={setState}
                        />
                    </Row>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    {" "}
                    <Button
                        onClick={() => {
                            navigate("/sip-trunks/index");
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

export default SipTrunkForm;
