import React, { useMemo } from 'react'
import DataGrid from '../grid-view/DataGrid/DataGrid';
import { Col, Row } from 'react-bootstrap';

const OnlineView = () => {
    const gridStyle = useMemo(() => ({ height: 600, width: "100%" }), []);
    const columns = [
        {
            field: "row",
            valueGetter: "node.rowIndex + 1",
            headerName: "Row"
        },
        { field: "name", headerName: "From" },
        { field: "name", headerName: "To" },
        {
            field: "timeStart",
            headerName: "Time Start",
        },
        {
            field: "timeEnd",
            headerName: "Time End",
        },
        {
            field: "trunk",
            headerName: "Source Trunk",
        },
        {
            field: "trunk",
            headerName: "Destination Trunk",
        },
        {
            field: "options",
            filter: false,
            sortable: false,
        },
    ];
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Row>
                <Col>
                    <h3>
                        Online View
                    </h3>
                </Col>
            </Row>
            <br />
            <DataGrid
                dnd={false}
                paging={true}
                style={gridStyle}
                columnDefs={columns}
            />
        </div >
    )
}

export default OnlineView