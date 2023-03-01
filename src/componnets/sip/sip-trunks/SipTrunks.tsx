import React, { useEffect, useMemo, useState } from "react";
import DataGrid from "../../grid-view/DataGrid/DataGrid";
import SipTrunkForm from "./SipTrunkForm";
import { CheckLg, Gear, PencilFill, PencilSquare, PlusLg, Trash3Fill, XLg } from "react-bootstrap-icons";
import PlineTools, { TypeAlert } from "../../services/PlineTools";
import ModalCustom from "../../reuseables/modal/ModalCustom";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const SipTrunks = () => {
  const navigate = useNavigate();
  const gridStyle = useMemo(() => ({ height: 580, width: "100%" }), []);
  const [rowData, setRowData] = useState<any>([]);

  const saveChanges = (data: any) => {
    let url = "/sip-trunks";
    PlineTools.patchRequest(url, data)
      .then((result) => {
        if (result.data.hasError) {
          PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
        } else {
          reload();
        }
      })
      .catch((error) => {
        PlineTools.errorDialogMessage(
          "An error occurred while executing your request. Contact the system administrator"
        );
      });
  };
  const getData = (page = 0, size = 99999) => {
    PlineTools.getRequest(`/sip-trunks/?page=${page}&size=${size}`)
      .then((data) => {
        
        setRowData(data.data.content);
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
  }, []);
  const reload = () => {
    getData();
  };

  function CheckBox(params: any) {
    return params.node.data.enable ? <CheckLg color='#6BBD49' size={19} /> : <XLg color='red' size={19} />;
  }
  const actions = (params: any) => {
    let id = params.node.data.id;
    return (<>
      <PencilSquare style={{ cursor: "pointer" }} color="green" size={17} onClick={() => { navigate("/sip-trunks/edit/" + id) }} />
      <Trash3Fill style={{ paddingLeft: "8px", cursor: "pointer" }} color="red" size={25} onClick={() => { DeleteRow(params) }} />
    </>
    );
  }
  function DeleteRow(e: any) {
    if (window.confirm("Are you sure you want to delete this Profile?")) {
      e.api.applyTransaction({
        remove: [e.node.data],
      });
      PlineTools.deleteRequest("/sip-trunks/", e.node.data.id).then((result) => {
        if (result.data.hasError) {
          PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
        } else {

          getData();
        }
      });
    }
  }

  const columns = [
    { field: "row", valueGetter: "node.rowIndex + 1", headerName: "Row" },
    { field: "name", headerName: "Name", width: 80 },

    { field: "sipProfile.name", headerName: "Profile" },
    { field: "username", headerName: "UserName" },
    {
      field: "enable",
      headerName: "Status",
      width: 30,
      cellRenderer: CheckBox,
    },
    {
      field: "edit",
      headerName: "Options",
      width: 30,
      cellRenderer: actions,
      filter: false,
      sortable: false,
    },

  ];
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Container>
        <Row>
          <Col>
            <Button style={{ background: "#1B9CFC", border: "none" }} onClick={() => {
              navigate("/sip-trunks/create");
            }}>Add Trunk <PlusLg size={18} /></Button>
          </Col>
        </Row>
        <br />
        <h4 style={{ fontFamily: "monospace", fontWeight: "400" }}>Sip Trunks</h4>
        <DataGrid
          dnd={false}
          paging={true}
          style={gridStyle}
          columnDefs={columns}
          rowData={rowData}
        />
      </Container>
    </div>
  );
};

export default SipTrunks;
