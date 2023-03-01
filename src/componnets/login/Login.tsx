import "./Login.css";
import "../../App.css";
import Avatar from "../../images/user.png";
import PlineTools, {TypeMessage} from "../services/PlineTools";
import React, {useCallback, useRef, useState} from 'react';
import Captcha from 'react-captcha-code';
import CheckboxCustom from "../reuseables/CheckboxCustom";
import { Col, Row} from "react-bootstrap";


import {ArrowRepeat,} from "react-bootstrap-icons";

interface LoginProps {
    LoginAction: Function;
}

function Login(props: LoginProps) {

    const captchaRef = useRef<any>();

    const handleClick = () => {
        captchaRef.current.refresh();
    };
    const handleChange = useCallback((captcha: any) => {
        setCapth({...captcha, image: captcha})
    }, []);

    const [state, setState] = useState({
        username: "",
        password: "",
        RememberMe: false,
    });
    const [captcha, setCapth] = useState({
        input: "",
        image: ""
    });

    const Login = (e: any) => {
        e.preventDefault();
        if (captcha.image === captcha.input) {
            PlineTools.postRequest("/users/login", state).then((result) => {
                if (result.data.hasError === false) {
                    props.LoginAction(result.data);
                } else {
                    result.data.messages.forEach((v: string) => {
                        PlineTools.dialogMessage(v, "Error", TypeMessage.ERROR);
                    });
                }
            });
        } else {
            PlineTools.dialogMessage('Wrong Captcha ,Try Again...', 'Captcha Error')
        }
    };

    return (
        <>
            <div className="demo-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12 mx-auto login-warpper">
                            <div className="text-center image-size-small position-relative">
                                <img src={Avatar} className="rounded-circle p-2 bg-white"/>
                                <div className="icon-camera">
                                    <a href="" className="text-primary"><i className="lni lni-camera"></i></a>
                                </div>
                            </div>
                            <div className="p-5 login-body bg-white rounded shadow-lg">
                                <h3 className="mb-2 text-center pt-5">KAJ</h3>
                                <form onSubmit={Login}>
                                    <label htmlFor="inp" className="inp">
                                        <input type="text" onChange={(e) => {
                                            state.username = e.target.value
                                        }} id="inp" placeholder="&nbsp;"/>
                                        <span className="label">User</span>
                                        <span className="focus-bg"></span>
                                    </label>
                                    <label htmlFor="inp" className="inp">
                                        <input type="password" onChange={(e) => {
                                            state.password = e.target.value
                                        }} id="inp" placeholder="&nbsp;"/>
                                        <span className="label">Password</span>
                                        <span className="focus-bg"></span>
                                    </label>
                                    <br/>
                                    <br/>
                                    <Row>
                                        <Col md={10}>
                                            <Captcha className="captcha" ref={captchaRef} height={60} bgColor="#DAD7E9" width={250}
                                                     fontSize={30} charNum={4}
                                                     onChange={handleChange}/>
                                        </Col>
                                        <Col md={2}>
                                            <button type="button" className="captcha-btn" onClick={handleClick}>
                                                <ArrowRepeat
                                                    color="blue" size={22}/></button>
                                        </Col>

                                    </Row>
                                    <label htmlFor="inp" className="inp">
                                        <input type="text" id="inp" placeholder="&nbsp;" onChange={(e) => {
                                            setCapth({...captcha, input: e.target.value});
                                        }}/>
                                        <span className="label">Captcha</span>
                                        <span className="focus-bg"></span>
                                    </label>
                                    <div className="text-center submitLogin">
                                        <CheckboxCustom
                                            name="rememberMe"
                                            label="RemmeberMe"
                                            setState={setState}
                                        />
                                        <button className="button">Login</button>
                                    </div>
                                </form>
                                {/*<div className="social-box px-1 py-2">*/}
                                {/*    <QuestionDiamond size={25} className="information"/>*/}
                                {/*</div>*/}
                                {/*<div className="social-box px-1 py-2">*/}
                                {/*    <QuestionDiamond size={25} className="information"/>*/}
                                {/*</div>*/}
                                {/*<div className="px-1 py-2">*/}
                                {/*    <QuestionDiamond size={25} className="information"/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
        ;
}

export default Login;
