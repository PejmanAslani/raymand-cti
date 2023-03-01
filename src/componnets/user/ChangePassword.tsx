import React, {useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../reuseables/TextInputCustom'
import PlineTools, {TypeAlert} from '../services/PlineTools'

const ChangePassword = () => {
    const [state, setState] = useState({
        oldPassword: "",
        newPassword: "",
        repeatPassword: ""
    });
    const saveData = (e: any) => {
        e.preventDefault();
        let url = "/change-password/";
        if (state.newPassword != state.repeatPassword) {
            PlineTools.showAlert(["new password and repeat does not match"], TypeAlert.Danger, 5000)
        }
        PlineTools.postRequest(url, state)
            .then((result) => {
                if (result.data.hasError) {
                    PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
                }
            })
            .catch((error) => {
                PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
            });
    };
    return (
        <Row>
            <Col md={{span: 8, offset: 4}}>
                <Form onSubmit={saveData}>
                    <Row>
                        <Col md={6}>
                            <h5>Change Password</h5>
                            <hr/>
                        </Col>
                    </Row>
                    <Row>
                        <TextInput
                            label="Old Password"
                            name="oldPassword"
                            type="password"
                            requir={true}
                            value={state.oldPassword}
                            setState={setState}/>
                    </Row>
                    <Row>
                        <TextInput
                            label="New Password"
                            name="newPassword"
                            type="password"
                            requir={true}
                            value={state.newPassword}
                            setState={setState}/>
                    </Row>

                    <Row>
                        <TextInput
                            label="Repeat Password"
                            name="repeatPassword"
                            requir={true}
                            type="password"
                            value={state.repeatPassword}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="text-center">
                                <button type="submit"  className="btn btn-primary">Change Password</button>
                            </div>
                        </Col>
                    </Row>
                </Form>

            </Col>

        </Row>


    )
}

export default ChangePassword
