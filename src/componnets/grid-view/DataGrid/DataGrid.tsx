import React, { useMemo, useRef } from 'react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './style.css';
import { AgGridReact } from 'ag-grid-react';
import './Overlay.css'
import Overlay from './Overlay';

const DataGrid = (props: any) => {
    
    const gridRef = useRef<AgGridReact>(null);
    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            filter: true,
            flex: props.flex,
        };
    }, []);
    const gridOptions = {
        suppressMenuHide: true

    }
    const loadingOverlayComponent = useMemo(() => {
        return Overlay;
    }, []);
    function Loading() {
        gridRef.current?.api.showLoadingOverlay()
    }
    function hideLoading() {
        gridRef.current?.api.hideOverlay()
    }
    const icons = useMemo(() => {
        return {
            // use font awesome for menu icons
            // menu: '<i class="fa fa-bath" style="width: 10px"/>',
            // filter: '<i class="fa fa-long-arrow-alt-down"/>',
            // columns: '<i class="fa fa-handshake"/>',
            // sortAscending: '<i class="fa fa-long-arrow-alt-down"/>',
            // sortDescending: '<i class="fa fa-long-arrow-alt-up"/>',
            // columnMovePin: '<i class="far fa-hand-rock"/>',
            // columnMoveAdd: '<i class="fa fa-plus-square"/>',
            // columnMoveHide: '<i class="fa fa-times"/>',
            // columnMoveMove: '<i class="fa fa-link"/>',
            // columnMoveLeft: '<i class="fa fa-arrow-left"/>',
            // columnMoveRight: '<i class="fa fa-arrow-right"/>',
            // columnMoveGroup: '<i class="fa fa-users"/>',
            // rowGroupPanel: '<i class="fa fa-university"/>',
            // pivotPanel: '<i class="fa fa-magic"/>',
            // valuePanel: '<i class="fa fa-magnet"/>',
            // menuPin: 'P',
            // menuValue: 'V',
            // menuAddRowGroup: 'A',
            // menuRemoveRowGroup: 'R',
            // clipboardCopy: '>>',
            // clipboardCut: '<<',
            // clipboardPaste: '>>',
            // rowDrag: '<i class="fa fa-circle"/>',
        };
    }, []);
    return (
     
            <div className="ag-theme-alpine" style={props.style}>
                <AgGridReact
                    ref={gridRef}
                    icons={icons}
                    gridOptions={gridOptions}
                    onRowDragEnd={props.dragSort}
                    rowData={props.rowData}
                    defaultColDef={defaultColDef}
                    loadingOverlayComponent={loadingOverlayComponent}
                    rowDragManaged={props.dnd}
                    pagination={props.paging}
                    paginationPageSize={props.pageSize}
                    columnDefs={props.columnDefs}>
                </AgGridReact>
            </div>
       
    )
}
DataGrid.defaultProps = {
    style: {
        height: 300, width: '100%'
    },
    paging: false,//pagination
    pageSize: 15,
    flex: 1
}
export default DataGrid