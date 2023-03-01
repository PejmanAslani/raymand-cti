import React, { useEffect, useMemo, useState } from "react";
import DataGrid from "../../grid-view/DataGrid/DataGrid";
import {
  CheckLg, Lightbulb, LightbulbFill,
  PencilSquare,
  PlusLg,
  Trash,
  Trash3Fill,
  XLg,
} from "react-bootstrap-icons";
import PlineTools, { TypeAlert } from "../../services/PlineTools";
import ModalCustom from "../../reuseables/modal/ModalCustom";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import AddGroupUsersForm from "../add-group-users/AddGroupUsersForm";
import BulkDeleteUsers from "./bulk-user-delete/BulkDeleteUsers";

const SipUsers = () => {
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState(false);
  const gridStyle = useMemo(() => ({ height: 580, width: "100%" }), []);
  const [rowData, setRowData] = useState<any>([]);
  //Modal Hooks
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modaltype, setmodalType] = useState({});
  const [sizeModal, setSizeModal] = useState("");
  
  const saveChanges = (data: any) => {
    let url = "/sip-users";
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
    setOverlay(true);
    PlineTools.getRequest(`/sip-users/?page=${page}&size=${size}`)
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
    return params.node.data.enable ? (
      <CheckLg color="#6BBD49" size={19} />
    ) : (
      <XLg color="red" size={19} />
    );
  }
  const actions = (params: any) => {
    let id = params.node.data.id;
    return (
      <>
        <PencilSquare
          style={{ cursor: "pointer" }}
          color="green"
          size={17}
          onClick={() => {
            navigate("/sip-users/edit/" + id);
          }}
        />
        <Trash3Fill
          style={{ paddingLeft: "8px", cursor: "pointer" }}
          color="red"
          size={25}
          onClick={() => {
            DeleteRow(params);
          }}
        />
      </>
    );
  };
  function DeleteRow(e: any) {
    if (window.confirm("Are you sure you want to delete this Profile?")) {
      e.api.applyTransaction({
        remove: [e.node.data],
      });
      PlineTools.deleteRequest("/sip-users/", e.node.data.id).then((result) => {
        if (result.data.hasError) {
          PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
        } else {
          getData();
        }
      });
    }
  }

  const columns = [
    // {
    //   field: "row",
    //   valueGetter: "node.rowIndex + 1",
    //   headerName: "Row",
    //   width: "150",
    // },
    {field: "port" ,headerName: "", filter: false,sortable : false ,width: "60",cellRenderer:(params:any)=>{

          return params.node.data.port ===0 ? (
              <LightbulbFill color="#4b4b4b" size={19} />
          ) : (
              <LightbulbFill color="#3ae374" size={19} />
          );
      }},
    {field: "ipAddress" ,headerName: "User Agent Address", width: "auto",cellRenderer:(params:any)=>{
      if(params.node.data.port===0)
        return   params.node.data.ipAddress ;
      return   params.node.data.ipAddress + ':' +params.node.data.port;
      }},
    { field: "uid", headerName: "User" ,width: "250"},
    { field: "sipProfile.name", headerName: "Sip Profile", width: "250" },
    { field: "sipUserGroup.name", headerName: "Sip Group", width: "auto" },
    {
      field: "enable",
      headerName: "Status",
      cellRenderer: CheckBox,
      width: "150",
    },
    {
      field: "delete",
      headerName: "Action",
      cellRenderer: actions,
      filter: false,
      sortable: false,
      width: "auto",
    },
  ];
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Container>
        <Row>
          <ModalCustom
            size={sizeModal}
            show={modalIsOpen}
            onHide={() => setModalIsOpen(false)}
          >
            {modaltype}
          </ModalCustom>
          <Col>
            <Dropdown>
              <Dropdown.Toggle
                style={{ background: "#1B9CFC", border: "none" }}
                id="dropdown-basic"
              >
                Add Users &nbsp;
                <PlusLg size={17} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    navigate("/sip-users/create");
                  }}
                >
                  <PlusLg size={15} />
                  New User{" "}
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => {
                    setSizeModal("lg");
                    setModalIsOpen(true);
                    setmodalType(
                      <AddGroupUsersForm
                        modal={setModalIsOpen}
                        reload={() => reload()}
                      />
                    );
                  }}
                >
                  <PlusLg size={15} />
                  Bulk Addition
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    navigate("/sip-users-bulk-edit/index");
                  }}
                >
                  <PencilSquare size={15} />
                  Bulk Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSizeModal("lg");
                    setModalIsOpen(true);
                    setmodalType(
                      <BulkDeleteUsers
                        modal={setModalIsOpen}
                        reload={() => {
                          reload();
                        }}
                      />
                    );
                  }}
                >
                  <Trash size={15} />
                  Bulk Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <br />
        <h4 style={{ fontFamily: "monospace", fontWeight: "400" }}>
          Sip Users
        </h4>
        <DataGrid
          flex={0}
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

export default SipUsers;
