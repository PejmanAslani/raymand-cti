import { useEffect, useState } from "react";
import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import TextInputCustom from "../../reuseables/TextInputCustom";
import { PlusLg, Trash3Fill } from "react-bootstrap-icons";
import PlineTools, { TypeAlert } from "../../services/PlineTools";
import DataGrid from "../../grid-view/DataGrid/DataGrid";

function AddPattern(props: any) {
  const [rowData, setRowData] = useState<any>([]);
  const [state, setState] = useState({
    id: null,
    outboundRoute: {
      id: props.id,
    },
    dropNumber: 0,
    prefixNum: "",
    pattern: "",
    sequential: 0,
    enable: true,
  });
  const Reset = () => {
    setState({
      id: null,
      outboundRoute: {
        id: props.id,
      },
      dropNumber: 0,
      prefixNum: "",
      pattern: "",
      sequential: 0,
      enable: true,
    })
  }
  //get Data For View
  const getData = () => {
    const id = props.id;
    PlineTools.getRequest("/outbound-route-patterns/" + id)
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
  const save = (e: any) => {
    e.preventDefault();
    let RouteID = props.id;
    setState({ ...state, outboundRoute: { id: RouteID } });
    let url = props.urlPattern + RouteID;
    PlineTools.postRequest(url, rowData)
      .then((result) => {
        if (result.data.hasError) {
          PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
        } else {
          props.reload();
          props.modal(false);
        }
      })
      .catch((error) => {
        Reset()
        PlineTools.errorDialogMessage(
          "An error occurred while executing your request. Contact the system administrator"
        );
      });
  }

  //Load Component
  useEffect(() => {
    getData();
  }, []);
  //Add New pattern
  const AddPattern = (e: any) => {
    let RouteID = props.id;
    setState({ ...state, outboundRoute: { id: RouteID } });
    e.preventDefault();
    //push data into array
    var data: any[] = [state].concat(rowData);
    //check duplication
    if (PlineTools.duplicatePattern(data)) {
      setRowData(data)
      Reset()
    } else {
      PlineTools.errorDialogMessage("Duplicate Pattern")
      Reset()
    }
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
          setRowData(newRowData)
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
          setRowData(newRowData)
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
    setRowData(newRowData)
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
    {
      field: "delete",
      headerName: "Delete",
      cellRenderer: DeleteRow,
      filter: false,
      sortable: false,
    },
  ];
  return (
    <div className="container">
      <h3> Add Pattern</h3>
      <hr />
      <Form onSubmit={AddPattern}>
        <Row>
          <TextInputCustom
            md={3}
            setState={setState}
            label="Prefix"
            name="prefixNum"
            value={state.prefixNum}
          />
          <TextInputCustom
            md={6}
            setState={setState}
            label="Pattern"
            name="pattern"
            required={true}
            value={state.pattern}
          />
          <TextInputCustom
            type="number"
            min={0}
            md={3}
            setState={setState}
            label="Drop Number"
            name="dropNumber"
            value={state.dropNumber}
          />
          <Row>
            <Col>
              <Button
                variant="success"
                type="submit">Add</Button>
              {" "}
              <Button
                variant="primary"
                onClick={(e: any) => {
                  save(e)
                }}
              >
                Save
              </Button>
              {" "}
              <Button
                variant="danger"
                onClick={() => {
                  props.modal(false)
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Row>
        <Row></Row>
      </Form>
      <hr />
      <h3>Patterns</h3>
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

export default AddPattern;
