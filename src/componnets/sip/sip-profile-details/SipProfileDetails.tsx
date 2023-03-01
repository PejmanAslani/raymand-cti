import { Button, Container, Tab } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { Col, Form, Row, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import PlineTools, { TypeAlert } from "../../services/PlineTools";

const SipProfileDetails = () => {
  const profileParam = useParams();
  const [params, setParams] = useState({
    endpoint: [],
    auth: [],
    transport: [],
    contact: [],
    aor: [],
  });
  const [state, setState] = useState<any>({});
  const [key, setKey] = useState("endpoint");
  const navigate = useNavigate();

  useEffect(() => {
    const id = profileParam.id;
    PlineTools.getRequest("/sip-profile-details/get?id=" + id).then((data) => {
      setState(data);
      PlineTools.getRequest("/sip-profile-details/params").then((result) => {
        if (result.data.hasError) {
          PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
        } else {
          setParams(result.data);
        }
      });
    });
  }, []);

  const draw = (_type: string, v: any, i: number) => {
    if (state[_type] == undefined) {
      state[_type] = {};
    }

    let select: any = {};

    if (v[1] == "Custom") {
      let obj: any = [];
      Object.keys(v[2]).forEach((val: any) => {
        obj.push({
          value: val,
          label: PlineTools.stringToLabel(v[2][val]),
        });

        if (state[_type][v[0]] == undefined) {
          if (v[3] == val) {
            select = { value: val, label: PlineTools.stringToLabel(v[2][val]) };
          }
        } else {
          let data = state[_type][v[0]];
          try {
            data = JSON.parse(data);
          } catch { }

          if (Array.isArray(data)) {
            select = [];
            data.forEach((e) => {
              e = e.trim();
              select.push({
                value: e,
                label: stringToLabel(v[2][e]),
              });
            });
          } else {
            select = {
              value: data,
              label: stringToLabel(data),
            };
          }
        }
      });

      return (
        <Container>
          <Row key={i}>
            <Col>
              <Row>
                <Col md={5}>
                  <Form.Group className="mb-3" controlId={v[0]}>
                    <Form.Label>{PlineTools.stringToLabel(v[0])}</Form.Label>
                    <Select
                      isMulti={v[5] === undefined ? false : v[5]}
                      options={obj}
                      defaultValue={select}
                      onChange={(e) => {
                        let tmp = { ...state };
                        if (Array.isArray(e)) {
                          let arr: any[] = [];
                          e.forEach((val) => {
                            arr.push(val.value);
                          });
                          tmp[_type][v[0]] = JSON.stringify(arr);
                        } else {
                          tmp[_type][v[0]] = e.value;
                        }
                        // setState(tmp)

                      }}
                    />
                    <Form.Text className="text-muted">{v[4]}</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    } else if (v[1] == "Boolean") {
      if (state[_type][v[0]] == undefined) {
        select = v[3];
      } else {
        select = state[_type][v[0]];
      }
      return (
        <Container>
          <Row key={i}>
            <Col>
              <Row>
                <Col md={5}>
                  <Form.Group className="mb-3" controlId={v[0]}>
                    <Form.Check
                      type="checkbox"
                      label={PlineTools.stringToLabel(v[0])}
                      defaultChecked={select}
                      onChange={(e) => {
                        let tmp = { ...state };
                        tmp[_type][v[0]] = e.target.value;
                        setState(tmp);
                      }}
                    />
                    <Form.Text className="text-muted">{v[4]}</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    } else if (v[1] == "Integer") {
      if (state[_type][v[0]] === undefined) {
        select = v[3];
      } else {
        select = state[_type][v[0]];
      }
      return (
        <Container>
          <Row key={i}>
            <Col>
              <Row>
                <Col md={5}>
                  <Form.Group className="mb-3" controlId={v[0]}>
                    <Form.Label>{PlineTools.stringToLabel(v[0])}</Form.Label>
                    <Form.Control
                      type="number"
                      name={v[0]}
                      defaultValue={select}
                      onChange={(e) => {
                        let tmp = { ...state };
                        tmp[_type][v[0]] = e.target.value;
                        setState(tmp);
                      }}
                    />
                    <Form.Text className="text-muted">{v[4]}</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    } else {
      if (state[_type][v[0]] === undefined) {
        select = v[3];
      } else {
        select = state[_type][v[0]];
      }

      return (
        <Container>
          <Row key={i}>
            <Col>
              <Row>
                <Col md={5}>
                  <Form.Group className="mb-3" controlId={v[0]}>
                    <Form.Label>{PlineTools.stringToLabel(v[0])}</Form.Label>
                    <Form.Control
                      type="text"
                      name={v[0]}
                      defaultValue={select}
                      onChange={(e) => {
                        let tmp = { ...state };
                        tmp[_type][v[0]] = e.target.value;
                        setState(tmp);
                      }}
                    />
                    <Form.Text className="text-muted">{v[4]}</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
  };

  const submit = (e: any) => {
    e.preventDefault();
    console.log(state);
    // state.id = profileParam.id;
    // PlineTools.postRequest("/sip-profile-details/save", state)
    //   .then((result) => {
    //     if (result.status) {
    //       PlineTools.errorDialogMessage(
    //         "An error occurred while executing your request. Contact the system administrator",
    //         true
    //       );
    //     } else {
    //       PlineTools.successDialogMessage(
    //         "Information successfully recorded",
    //         true
    //       );
    //       navigate("/sip-profiles/index");
    //     }
    //   })
    //   .catch((error) => {
    //     PlineTools.errorDialogMessage(
    //       "An error occurred while executing your request. Contact the system administrator\n" +
    //         error,
    //       true
    //     );
    //   });
  };

  return (
    <Container>
      <div>
        <Form onSubmit={submit}>
          <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k: any) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="endpoint" title="Endpoint">
              {params.endpoint.map((v, i) => {
                return draw("endpoint", v, i);
              })}
            </Tab>
            <Tab eventKey="auth" title="Auth">
              {params.auth.map((v, i) => {
                return draw("auth", v, i);
              })}
            </Tab>
            <Tab eventKey="transport" title="Transport">
              {params.transport.map((v, i) => {
                return draw("transport", v, i);
              })}
            </Tab>
            <Tab eventKey="contact" title="Contact">
              {params.contact.map((v, i) => {
                return draw("contact", v, i);
              })}
            </Tab>
            <Tab eventKey="aor" title="AOR">
              {params.aor.map((v, i) => {
                return draw("aor", v, i);
              })}
            </Tab>
          </Tabs>
          <Button variant="primary" type="submit">
            Save
          </Button>{" "}
          <Button
            onClick={() => {
              navigate("/sip-profiles/index");
            }}
            variant="danger"
            type="button"
          >
            Back
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default SipProfileDetails;
function stringToLabel(arg0: any) {
  throw new Error("Function not implemented.");
}
