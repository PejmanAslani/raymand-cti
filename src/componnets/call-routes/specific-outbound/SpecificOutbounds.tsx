import React, { useEffect, useMemo, useState } from 'react'
import DataGrid from '../../grid-view/DataGrid/DataGrid'
import {

    BuildingGear, CheckLg,
    Diagram2,
    PencilSquare,
    PersonFillAdd,
    PlusLg,
    Trash3Fill, XLg
} from 'react-bootstrap-icons';
import PlineTools, { TypeAlert } from '../../services/PlineTools';
import GlobalOutboundsForm from './SpecificOutboundsForm';
import ModalCustom from '../../reuseables/modal/ModalCustom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AddPattern from '../AddPattern/AddPattern';
import AddTrunks from '../AddTrunk/AddTrunks';
import AddUser from '../AddUser/AddUser';
import SpecificOutboundsForm from './SpecificOutboundsForm';
const SpecificOutbounds = () => {
    const gridStyle = useMemo(() => ({ height: 500, width: '100%' }), []);
    const pageSize = 10;
    const [rowData, setRowData] = useState<any>([]);
    const [searchParams, setSearchParams] = useState<any>();
    const [sortParams, setSortParams] = useState<string>();
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
        const searchUrl = new URLSearchParams(searchParams).toString();
        let sort = "";
        if (sortParams !== undefined) {
            sort = "sort=" + sortParams;
        }
        PlineTools.getRequest(
            `/outbound-routes/?page=${page}&size=${size}&${searchUrl}&${sort}`)
            .then((data) => {
                setRowData(data.data.content.filter(((privateRoute: any) => privateRoute.privateRoute === true)));
            })
            .catch((error) => {
                PlineTools.errorDialogMessage(
                    "An error occurred while executing your request. Contact the system administrator\n" +
                    error
                );
            });
    };
    useEffect(() => {
        getData()
    }, [])
    const reload = () => {
        getData();
    }
    function CheckBox(params: any) {
        return params.node.data.enable ? (
            <CheckLg color="#6BBD49" size={19} />
        ) : (
            <XLg color="red" size={19} />
        );
    }

    const Edit = (params: any) => {
        return <p style={{ cursor: "pointer" }} onClick={() => {
            setSizeModal("lg");
            setModalIsOpen(true);
            setmodalType(< GlobalOutboundsForm id={params.node.data.id} modal={setModalIsOpen} reload={reload} />);
        }}> <PencilSquare color="green" size={17} /></p>
    }
    const User = (params: any) => {
        return <p style={{ cursor: "pointer" }} onClick={() => {
            setSizeModal("lg");
            setModalIsOpen(true);
            setmodalType(< AddUser urlUser="/outbound-route-users/validation-users" id={params.node.data.id} modal={setModalIsOpen} reload={reload} />);
        }}><PersonFillAdd color="purple" size={22} /></p>
    }
    const Pattern = (params: any) => {
        return <p style={{ cursor: "pointer" }} onClick={() => {
            setSizeModal("lg");
            setModalIsOpen(true);
            setmodalType(< AddPattern urlPattern="/outbound-route-patterns/" id={params.node.data.id} modal={setModalIsOpen} reload={reload} />);
        }}><Diagram2 color="orange" size={24} /></p>
    }
    const Trunk = (params: any) => {
        return <p style={{ cursor: "pointer" }} onClick={() => {

            setSizeModal("lg");
            setModalIsOpen(true);
            setmodalType(< AddTrunks urlTrunk="/outbound-route-trunks/" id={params.node.data.id} modal={setModalIsOpen} reload={reload} />);
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
        { field: 'trunk', headerName: 'Trunk', cellRenderer: Trunk, filter: false, sortable: false },
        { field: 'user', headerName: 'User', cellRenderer: User, filter: false, sortable: false },
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
                            setmodalType(<SpecificOutboundsForm modal={setModalIsOpen} reload={() => reload()} />)
                        }}
                        >New Route <PlusLg size={18} /></Button>
                    </Col>
                </Row>
                <br />
                <h4 style={{ fontFamily: "monospace", fontWeight: "400" }}>Specific OutBound Routes</h4>
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

export default SpecificOutbounds