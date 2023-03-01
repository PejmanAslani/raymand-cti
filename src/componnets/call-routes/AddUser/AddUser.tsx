import React, {useEffect, useState} from "react";

import {Button, Form, Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import ToolTipCustom from "../../reuseables/tooltip/ToolTipCustom";
import PlineTools, {TypeAlert} from "../../services/PlineTools";
import DataGrid from "../../grid-view/DataGrid/DataGrid";
import {Trash3Fill} from "react-bootstrap-icons";
import TextInputCustom from "../../reuseables/TextInputCustom";


const AddUser = (props: any) => {
    //Define Hooks
    const [disable, setDisable] = useState({
        group: true,
        range: false
    })
    const [rowData, setRowData] = useState<any>([]);
    const [options, setOptions] = useState({
        Groups: [],
    });
    const [formdata,setFormData]=useState({
        sipUser:{
            id:0
        },
        outboundRoute: {
            id: 0,
        },
        enable: false,
    })
    //Define FormData State
    const [state, setState] = useState({
        type: "range",
        value: "",
    });
    const GetUserGroups = () => {
        PlineTools.getRequest("/sip-group-users").then((result) => {
            if (result.data.hasError) {
                PlineTools.errorDialogMessage("Filed To Get Sip UserGroups");
            } else {
                setOptions({...options, Groups: result.data.content});
            }
        });
    };
    //get Users with range or group
    const GetUsers = (e: any) => {
        e.preventDefault();
        let url = props.urlUser;
        PlineTools.postRequest(url, state)
            .then((result: any) => {
                for (let i = 0; i <= result.data.length; i++) {
                    setRowData({...rowData, users: result.data})
                }
            })
            .catch((error: any) => {
                PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
            });
    };
    const getData = () => {
        const id = props.id;
        PlineTools.getRequest("/outbound-route-users/" + id)
            .then((result: any) => {
                let data: any[] = [];
                const length = result.data.length;
                let res = result.data;
                for (let i = 0; i <= length; i++) {
                      setRowData(res[i].sipUser.uid)
                }
            })
            .catch(() => {
                console.log(rowData)
                PlineTools.errorDialogMessage(
                    "An error occurred while executing your request. Contact the system administrator"
                );
            });
    };
    const saveChanges = (data: any) => {
        let RouteID = props.id;
        setState({...rowData, outboundRoute: {id: RouteID}});
        let url = "/outbound-route-users/" + RouteID;
        PlineTools.postRequest(url, data)
            .then((result) => {
                if (result.data.hasError) {
                    PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
                } else {
                    props.reload();
                }
            })
            .catch((error) => {
                PlineTools.errorDialogMessage(
                    "An error occurred while executing your request. Contact the system administrator"
                );
            });
    };
    useEffect(() => {
        getData();
        GetUserGroups();
        setFormData({...formdata, outboundRoute: {id: props.id}});
    }, []);
    const columns = [
        {
            field: "users",
            headerName: "Sip User",
        },
        {field: "delete", headerName: "Delete", cellRenderer: DeleteRow, filter: false, sortable: false},
    ];

    function CheckBox(params: any) {
        return (
            <input
                style={{cursor: "pointer"}}
                type="checkbox"
                checked={params.value}
                onChange={(e: any) => {
                    let newRowData: any[] = [];
                    const value = e.target.checked;
                    let colId = params.column.colId;
                    params.node.setDataValue(colId, value);
                    params.api.forEachNode((node: any) => newRowData.push(node.data));
                    saveChanges(newRowData);
                }}
            />
        );
    }

    function DeleteRow(e: any) {
        return (
            <p
                style={{cursor: "pointer"}}
                onClick={() => {
                    let newRowData: any[] = [];
                    e.api.applyTransaction({
                        remove: [e.node.data],
                    });
                    e.api.forEachNodeAfterFilter((node: any) =>
                        newRowData.push(node.data)
                    );
                    // saveChanges(newRowData);
                }}>
                <Trash3Fill color="red"/>
            </p>
        );
    }
    return (
        <div className="container">
            <h3> Add Users</h3>
            <hr/>
            <Form onSubmit={AddUser}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="sipTrunks">
                            <Form.Label>Select Types</Form.Label>
                            <ToolTipCustom/>
                            <select
                                onChange={(e: any) => {
                                    if (e.target.value === "range") {
                                        setDisable({...disable, range: false, group: true})
                                    }
                                    setState({...state, type: "range"})
                                    if (e.target.value === "group") {
                                        setDisable({...disable, group: false, range: true})
                                        setState({...state, type: "group"})
                                    }
                                }}
                                className={"form-select"}>
                                <option value={"range"}>Range</option>
                                <option value={"group"}>Group</option>
                            </select>
                        </Form.Group>
                    </Col>
                    <Col md={6} hidden={disable.group}>
                        <Form.Group className="mb-3" controlId="sipTrunks">
                            <Form.Label>SIP Users</Form.Label>
                            <ToolTipCustom/>
                            <select
                                className={"form-select"}
                                value={state.value}
                                onChange={(e) => {
                                    setState({...state, value: e.target.value});
                                }}
                            >
                                <option value={0}>Select Users ...</option>
                                {options.Groups.map((opt: any) => (
                                    <option key={opt.id} value={opt.id}>
                                        {opt.name}
                                    </option>
                                ))}
                            </select>
                        </Form.Group>
                    </Col>
                    <TextInputCustom
                        disabled={disable.range}
                        name='value'
                        placeholder="Example 100-120,300-310,400-450"
                        label='Range'
                        value={state.value}
                        setState={setState}
                    />
                </Row>
                <Row>
                    <Col md={6}>
                        <Button variant="success" onClick={(e: any) => {
                            GetUsers(e)
                        }
                        }>
                            Add User
                        </Button>
                        {" "}
                        <Button variant="primary" onClick={() => {
                        }}>
                            Save
                        </Button>
                        {" "}
                        <Button variant="danger" onClick={() => {
                            props.modal(false)
                        }}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
            <hr/>
            <h3>Users</h3>
            <DataGrid
                dnd={false}
                paging={true}
                columnDefs={columns}
                rowData={rowData.users}
            />

        </div>
    );
};

export default AddUser;
