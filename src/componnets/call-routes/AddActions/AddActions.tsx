import { useEffect, useState } from "react";
import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import TextInputCustom from "../../reuseables/TextInputCustom";
import {  Trash3Fill } from "react-bootstrap-icons";
import PlineTools, { TypeAlert } from "../../services/PlineTools";
import DataGrid from "../../grid-view/DataGrid/DataGrid";

function AddActions(props: any) {
    const [rowData, setRowData] = useState<any>([]);
    const [state, setState] = useState({
        id: null,
        inboundRoute: {
            id: props.id,
        },
        action: "",
        value: "",
        options: ""

    });

    //get Data For View
    const getData = () => {
        const id = props.id;
        PlineTools.getRequest("/inbound-route-actions/" + id)
            .then((result: any) => {
                const lengh = result.data.length;
                for (let i = 0; i <= lengh; i++) {
                    setRowData(result.data);
                }
            })
            .catch(() => {
                PlineTools.errorDialogMessage(
                    "An error occurred while executing your request. Contact the system administrator"
                );
            });
    };
    const saveChanges = (data: any) => {
        let RouteID = props.id;
        setState({ ...state, inboundRoute: { id: RouteID } });
        let url = props.urlPattern + RouteID;
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
    //Load Component
    useEffect(() => {
        getData();
    }, []);
    //Add New pattern
    const AddPattern = (e: any) => {
        let RouteID = props.id;
        setState({ ...state, inboundRoute: { id: RouteID } });
        e.preventDefault();
        let url = "/outbound-route-patterns/" + RouteID;
        var data: any[] = [state].concat(rowData);
        PlineTools.postRequest(url, data)
            .then((result) => {
                if (result.data.hasError) {
                    PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
                } else {
                    props.reload();
                    getData();
                }
            })
            .catch((error) => {
                PlineTools.errorDialogMessage(
                    "An error occurred while executing your request. Contact the system administrator"
                );
            });
    };

    function CheckBox(params: any) {
        return (
            <input
                style={{ cursor: "pointer" }}
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
                style={{ cursor: "pointer" }}
                onClick={() => {
                    let newRowData: any[] = [];
                    e.api.applyTransaction({
                        remove: [e.node.data],
                    });
                    e.api.forEachNodeAfterFilter((node: any) =>
                        newRowData.push(node.data)
                    );
                    saveChanges(newRowData);
                }}
            >
                <Trash3Fill color="red" />
            </p>
        );
    }
    const dragSort = (params: any) => {
        let newRowData: any[] = [];
        params.api.forEachNodeAfterFilterAndSort((node: any) =>
            newRowData.push(node.data)
        );
        saveChanges(newRowData);
    };
    const columns = [
        { field: "pattern", headerName: "Pattern", width: 120, rowDrag: true },
        { field: "dropNumber", headerName: "Drop Number" },
        { field: "prefixNum", headerName: "Prefix Num" },
        {
            field: "enable",
            headerName: "Enable",
            width: 100,
            cellRenderer: CheckBox,
        },
        { field: "delete", headerName: "Delete", cellRenderer: DeleteRow, filter: false, sortable: false },
    ];
    return (
        <div className="container">
            <h3> Add Actions</h3>
            <hr />
            <Form onSubmit={AddPattern}>
                <Row>
                    <Col>
                        <Row>
                            <TextInputCustom
                                setState={setState}
                                label="Action"
                                name="action"
                                value={state.action}
                            />

                            <TextInputCustom
                                setState={setState}
                                label="Value"
                                name="value"
                                value={state.value}
                            />
                        </Row>
                        <Row>
                            <TextInputCustom
                                setState={setState}
                                label="Options"
                                name="options"
                                value={state.options}
                            />
                        </Row>
                    </Col>
                    <Row>
                        <Col >
                            <Button
                                variant="primary"
                                style={{ marginTop: "30px" }}
                                type="submit"
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Row>
                <Row></Row>
            </Form>
            <hr />
            <h3>Actions</h3>
            <DataGrid
                dnd={true}
                paging={false}
                dragSort={dragSort}
                columnDefs={columns}
                rowData={rowData}
            />
        </div>
    );
}

export default AddActions;
