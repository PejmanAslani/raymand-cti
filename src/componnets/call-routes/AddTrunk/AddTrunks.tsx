import React, { useEffect, useState } from 'react'
import TextInputCustom from '../../reuseables/TextInputCustom';
import { Button, Form, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import ToolTipCustom from '../../reuseables/tooltip/ToolTipCustom';
import PlineTools, { TypeAlert } from '../../services/PlineTools';
import DataGrid from '../../grid-view/DataGrid/DataGrid';
import { Trash3Fill } from 'react-bootstrap-icons';

const AddTrunks = (props: any) => {
  //Define Hooks
  const [rowData, setRowData] = useState<any>([]);
  const [options, setOptions] = useState([]);
  //Define FormData State
  const [state, setState] = useState({
    id: null,
    sipTrunk: {
      id: 0
    },
    outboundRoute: { id: null },
    duration: 0,
    enable: false,
    sequential: 0
  });

  const getTrunks = () => {
    PlineTools.getRequest("/sip-trunks").then((result) => {
      setOptions(result.data.content)
     
    })
  }
  const getData = () => {
    PlineTools.getRequest("/outbound-route-trunks/" + props.id).then((result: any) => {
      const lengh = result.data.length;
      for (let i = 0; i <= lengh; i++) {
        setRowData(result.data)
      }

    })
      .catch(() => {
        PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
      });
  }
  
  const Addtrunk = (e: any) => {
    e.preventDefault();
    let url = "/outbound-route-trunks/" + props.id;
    var data: any[] = [state].concat(rowData);
    if (PlineTools.duplicateTrunk(data)) {
      PlineTools.postRequest(url, data)
        .then((result: any) => {
          if (result.data.hasError) {
            PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
          } else {
            props.reload();
            getData()
          }
        })
        .catch((error: any) => {
          PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");

        });

    } else {
      PlineTools.errorDialogMessage("Duplicate Trunk Choose Another one")
    }

  }
  //for Grid Options
  const saveChanges = (data: any) => {
    let RouteID = props.id;
    setState({ ...state, outboundRoute: { id: RouteID } });
    let url = props.urlTrunk + RouteID;
    PlineTools.postRequest(url, data)
      .then((result) => {
        if (result.data.hasError) {
          PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
        } else {
          props.reload();
        }
      })
      .catch((error) => {
        PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
      });
  }
  useEffect(() => {
    getData();
    setState({ ...state, outboundRoute: { id: props.id } });
    getTrunks();
  }, [])
  const columns = [
    {
      field: 'sipTrunk.name', headerName: 'Sip Trunk', rowDrag: true

    },
    { field: 'duration', headerName: 'Duration', width: 120, },
    {
      field: 'enable', headerName: 'Enable', width: 100, cellRenderer: CheckBox, filter: false, sortable: false
    },
    { field: 'delete', headerName: 'Delete', cellRenderer: DeleteRow, filter: false, sortable: false },
  ];
  function CheckBox(params: any) {
    return <input style={{ cursor: "pointer" }} type="checkbox" checked={params.value} onChange={(e: any) => {
      let newRowData: any[] = [];
      const value = e.target.checked;
      let colId = params.column.colId;
      params.node.setDataValue(colId, value);
      params.api.forEachNode((node: any) => newRowData.push(node.data))
      saveChanges(newRowData)
    }} />
  }

  function DeleteRow(e: any) {
    return <p style={{ cursor: "pointer" }} onClick={
      () => {
        let newRowData: any[] = [];
        e.api.applyTransaction({
          remove: [e.node.data],
        });
        e.api.forEachNodeAfterFilter((node: any) => newRowData.push(node.data));
        saveChanges(newRowData);

      }
    }>
      <Trash3Fill color="red" /></p>
  }
  const dragSort = (params: any) => {
    let newRowData: any[] = [];
    params.api.forEachNodeAfterFilterAndSort((node: any) => newRowData.push(node.data));
    saveChanges(newRowData);
  }
  return (
    <div className='container'>
      <h3> Add Trunks</h3>
      <hr />
      <Form onSubmit={Addtrunk}>
        <Row>

          <Col md={8}>
            <Form.Group className="mb-3" controlId="sipTrunks">
              <Form.Label>SIP Tunks</Form.Label>
              <ToolTipCustom />
              <select

                className={"form-select"}
                value={state.sipTrunk.id}
                onChange={(e) => {
                  setState({ ...state, sipTrunk: { id: parseInt(e.target.value) } })
                }}>
                <option value={0}>Select Trunk ...</option>
                {options.map((opt: any) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Col>
          <TextInputCustom
            md={2}
            type="number"
            name="duration"
            label="Duration"
            value={state.duration}
            setState={setState}
            min={0}
          />
        </Row>
        <Row>
          <Col md={6}>
            <Button variant="success" type="submit">
              Add Trunk
            </Button>
            {" "}
            <Button variant="danger" onClick={() => { props.modal(false) }}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
      <h3>Trunks</h3>
      <DataGrid
        dnd={true}
        paging={false}
        dragSort={dragSort}
        columnDefs={columns}
        rowData={rowData}
      />
    </div>
  )
}

export default AddTrunks