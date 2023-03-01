import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import TextInputCustom from '../../reuseables/TextInputCustom'
import ToolTipCustom from '../../reuseables/tooltip/ToolTipCustom'
import PlineTools, { TypeAlert } from '../../services/PlineTools'
import { useNavigate, useParams } from 'react-router'

const AddGroupUsersForm = (props: any) => {
    const params = useParams();
    const [error, setError] = useState('');
    const [state, setState] = useState({
        range: "",
        passwordType: "NoPassword",
        sipGroup: 1,
        sipProfile: 1,
    });
    const saveData = (e: any) => {
        e.preventDefault();
        if (state.sipProfile === 0) {
            PlineTools.showAlert(["SIP Profile not selected."], TypeAlert.Danger);
            return;
        }
        let url = "/sip-users/add-group-sip-users";
        PlineTools.postRequest(url, state)
            .then((result) => {
                if (result.data.hasError) {
                    setError("Duplicate Range")
                } else {
                    props.modal(false);
                    props.reload();
                }
            })
            .catch((error) => {
                PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");

            });
    };

    const navigate = useNavigate();
    const [options, setOptions] = useState({
        sipGroups: [],
        profiles: []
    });
    const load = () => {
        PlineTools.getRequest("/sip-users/get-profiles-group")
            .then((result) => {
                setOptions({ ...options, sipGroups: result.data.sipGroups, profiles: result.data.profiles });
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
                        })
                        .catch(() => {
                            PlineTools.errorDialogMessage("Getting Data failed");
                        });
                }
            });
    };
    useEffect(() => {
        load();
    }, [])
    // 
    return (
        <>
            <Row>
                <Form onSubmit={saveData}>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h5>Add Users As Group</h5>
                        <hr />
                        <Row>
                            <TextInputCustom
                                required={true}
                                error={error}
                                name="range"
                                label="Range"
                                value={state.range}
                                placeholder="Example 100-120,125,127,300-310,400,402"
                                setState={setState}
                            />
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="registerMode">
                                    <Form.Label>Register Mode</Form.Label>
                                    <ToolTipCustom />
                                    <select

                                        value={state.passwordType}
                                        onChange={(e) =>
                                            setState({ ...state, passwordType: e.target.value })
                                        }
                                        className={"form-select"}>
                                        <option value={"noPassword"}>NoPassword</option>
                                        <option value={"random"}>Random</option>
                                        <option value={"userName"}>UserName as Password</option>
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="registerMode">
                                    <Form.Label>SipGroup</Form.Label>
                                    <ToolTipCustom />
                                    <select
                                        value={state.sipGroup}
                                        onChange={(e) => {
                                            setState({ ...state, sipGroup: parseInt(e.target.value) })
                                        }}
                                        className={"form-select"}>
                                        {options.sipGroups.map((opt: any) => (
                                            <option key={opt.id} value={opt.id}>
                                                {opt.name}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="registerMode">
                                    <Form.Label>SipProfiles</Form.Label>
                                    <ToolTipCustom />
                                    <select
                                        value={state.sipProfile}
                                        onChange={(e) => {
                                            setState({ ...state, sipProfile: parseInt(e.target.value) })
                                        }}
                                        className={"form-select"}>
                                        {options.profiles.map((opt: any) => (
                                            <option key={opt.id} value={opt.id}>
                                                {opt.name}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button
                            variant="primary" type="submit">
                            Save
                        </Button>
                        {" "}
                        <Button
                            variant="danger" onClick={() => props.modal(false)}>
                            Exit
                        </Button>
                    </Col>
                </Form>
            </Row>
        </>
    )
}

export default AddGroupUsersForm