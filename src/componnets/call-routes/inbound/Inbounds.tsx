import React, { useEffect, useMemo, useState } from 'react'
import DataGrid from '../../grid-view/DataGrid/DataGrid'
import { BuildingGear, Diagram2, PencilSquare, PlusLg, Trash3Fill } from 'react-bootstrap-icons';
import PlineTools, { TypeAlert } from '../../services/PlineTools';
import ModalCustom from '../../reuseables/modal/ModalCustom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AddPattern from '../AddPattern/AddPattern';
import AddTrunks from '../AddTrunk/AddTrunks';
import { useNavigate } from 'react-router';
import InboundsForm from './InboundsForm';
import AddActions from '../AddActions/AddActions';

const Inbounds = () => {
    const gridStyle = useMemo(() => ({ height: 500, width: '100%' }), []);
    const pageSize = 10;
    const [rowData, setRowData] = useState<any>([]);
    const navigate = useNavigate();
    //Modal Hooks
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modaltype, setmodalType] = useState({});
    const [sizeModal, setSizeModal] = useState("")
    const saveChanges = (data: any) => {
        let url = "/outbound-routes";
        PlineTools.patchRequest(url, data)
            .then((result) => {
                if (result.data.hasError) {
                    PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
                } else {
                    reload();
                }
            })
            .catch((error) => {
                PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
            });
    }
    const getData = (page = 0, size = pageSize) => {

        PlineTools.getRequest(
            `/outbound-routes/?page=${page}&size=${size}`)
            .then((data) => {
                setRowData(data.data.content.filter(((privateRoute: any) => privateRoute.privateRoute === false)));
            })
            .catch((error) => {
                PlineTools.errorDialogMessage(
                    "An error occurred while executing your request. Contact the system administrator\n" +
                    error
                );
            });
    };
    useEffect(() => {

        getData();

    }, [])
    const reload = () => {
        getData();
    }
    function CheckBox(params: any) {
        return <input style={{ cursor: "pointer" }} type="checkbox" checked={params.value} onChange={(e: any) => {
            const value = e.target.checked;
            let colId = params.column.colId;
            params.node.setDataValue(colId, value);
            saveChanges(params.node.data)
        }} />
    }

    const Edit = (params: any) => {
        return <p style={{ cursor: "pointer" }} onClick={() => {

            setSizeModal("lg");
            setModalIsOpen(true);
            // setmodalType(< GlobalOutboundsForm id={params.node.data.id} modal={setModalIsOpen} reload={reload} />);
        }}> <PencilSquare color="green" size={17} /></p>
    }
    const Actions = (params: any) => {
        return <p
            style={{ cursor: "pointer" }}
            onClick={() => {
                setSizeModal("lg");
                setModalIsOpen(true);
                setmodalType(<AddActions />)
            }}
        >
        </p>
    }
    const Pattern = (params: any) => {
        return <p style={{ cursor: "pointer" }} onClick={() => {

            setSizeModal("lg");
            setModalIsOpen(true);
            setmodalType(< AddPattern id={params.node.data.id} modal={setModalIsOpen} reload={reload} />);
        }}><Diagram2 color="orange" size={22} /></p>
    }
    const Trunk = (params: any) => {
        return <p style={{ cursor: "pointer" }} onClick={() => {

            setSizeModal("lg");
            setModalIsOpen(true);
            setmodalType(< AddTrunks id={params.node.data.id} modal={setModalIsOpen} reload={reload} />);
        }}><BuildingGear color="blue" size={20} /></p>
    }
    function DeleteRow(e: any) {
        return <p style={{ cursor: "pointer" }} onClick={
            () => {

                if (window.confirm("Are you sure you want to delete this Profile?")) {
                    e.api.applyTransaction({
                        remove: [e.node.data],
                    });
                    PlineTools.deleteRequest("/outbound-routes/", e.node.data.id).then((result) => {
                        if (result.data.hasError) {
                            PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
                        } else {

                            getData();
                        }
                    });
                }
            }
        }>
            <Trash3Fill color="red" /></p>
    }
    const dragSort = (params: any) => {
        let newRowData: any[] = [];
        params.api.forEachNodeAfterFilterAndSort((node: any) => newRowData.push(node.data));
        saveChanges(newRowData);
    }
    const columns = [
        { field: 'name', headerName: 'Name', width: 120, rowDrag: true },
        {
            field: 'enable', headerName: 'Enable', width: 100, cellRenderer: CheckBox,
        },
        { field: 'pattern', headerName: 'Pattern', cellRenderer: Pattern, filter: false, sortable: false },
        { field: 'actions', headerName: 'Actions', cellRenderer: Actions, filter: false, sortable: false },
        { field: 'trunk', headerName: 'Trunk', cellRenderer: Trunk, filter: false, sortable: false },
        { field: 'edit', headerName: 'Edit', cellRenderer: Edit, filter: false, sortable: false },
        { field: 'delete', headerName: 'Delete', cellRenderer: DeleteRow, filter: false, sortable: false },

    ];
    return (
        <Container>
            <div style={{ width: '100%', height: '100%' }} >
                <Row>
                    <ModalCustom size={sizeModal} show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
                        {modaltype}
                    </ModalCustom>
                    <Col>
                        <Button style={{ background: "#1B9CFC", border: "none" }} className='btn-grid' onClick={() => {
                            setSizeModal("lg");
                            setModalIsOpen(true);
                            setmodalType(<InboundsForm modal={setModalIsOpen} reload={() => reload()} />)
                        }}
                        >New Route <PlusLg size={18} /></Button>
                    </Col>
                </Row>
                <br />
                <h4 style={{ fontFamily: "monospace", fontWeight: "400" }}>InBound Routes</h4>
                <DataGrid
                    style={gridStyle}
                    dragSort={dragSort}
                    columnDefs={columns}
                    rowData={rowData}
                />

            </div>
        </Container>
    )
}

export default Inbounds