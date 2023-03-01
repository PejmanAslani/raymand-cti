import React, { useState } from "react";
import { Col, Row, Table, Pagination } from "react-bootstrap";
import { SortAlphaDown, SortAlphaDownAlt } from "react-bootstrap-icons";
import "./GridView.css";

export interface IPagination {
  pageSize: number;
  offset: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
}

export interface IFilter {
  label: string;
  value: string;
}

export interface IColumns {
  label: string;
  id: string;
  search?: boolean;
  sort?: boolean;
  filter?: IFilter[];
  value?: Function;
}

export interface IEvents {
  first: Function;
  pre: Function;
  next: Function;
  last: Function;
}

export interface IGridView {
  Pagination: IPagination;
  Columns: IColumns[];
  SortEvent: Function;
  SearchEvent: Function;
  Data: [];
  Events: IEvents;
}

export interface IGridViewState {
  content: [];
  pageable: IPagination;
  totalPages: number;
  totalElements: number;
  size: number;
}

// {
//   "content": [],
//     "pageable":
//   {
//     "sort": {
//       "empty": true,
//         "sorted": false,
//           "unsorted": true
//     },
//     "offset": 0,
//       "pageNumber": 0,
//         "pageSize": 10,
//           "paged": true,
//             "unpaged": false
//   },
//   "totalPages": 1,
//     "totalElements": 2,
//       "last": true,
//         "size": 10,
//           "number": 0,
//             "sort": {
//     "empty": true,
//       "sorted": false,
//         "unsorted": true
//   },
//   "first": true,
//     "numberOfElements": 2,
//       "empty": false
// };

const GridView = (props: IGridView) => {
  const [state] = useState({ sort: "-" });

  return (
    <div style={{ marginBottom: "3vw" }} className="border">
      <Row>
        <Col>
          <p>
            <span>Row</span> {props.Pagination.offset + 1} <span>of</span>{" "}
            {props.Pagination.pageSize * (props.Pagination.pageNumber + 1)}
            {" ["}
            <span>Max Rows</span> {props.Pagination.totalElements}
            {"]"}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr>
                {props.Columns.map((v: IColumns, i: number) => {
                  return (
                    <th className="table-dark" key={i}>
                      {v.sort === true ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (v.sort) {
                              if (state.sort.startsWith("-")) {
                                state.sort = v.id;
                              } else {
                                state.sort = "-" + v.id;
                              }
                              props.SortEvent(state.sort);
                            }
                          }}
                        >
                          {state.sort.indexOf(v.id) >= 0 ? (
                            <>
                              {state.sort.startsWith("-") ? (
                                <SortAlphaDownAlt />
                              ) : (
                                <SortAlphaDown />
                              )}
                            </>
                          ) : (
                            ""
                          )}{" "}
                          {v.label}
                        </span>
                      ) : (
                        v.label
                      )}
                    </th>
                  );
                })}
              </tr>
              <tr>
                {props.Columns.map((v, i) => {
                  return (
                    <td key={i}>
                      {v.search &&
                        (v.filter == undefined ? (
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              props.SearchEvent(v.id, e.target.value);
                            }}
                          />
                        ) : (
                          <select
                            className="form-select"
                            onChange={(e) => {
                              props.SearchEvent(v.id, e.target.value);
                            }}
                          >
                            <option></option>
                            {v.filter.map((opt: IFilter, oi) => {
                              return (
                                <option key={"op" + oi} value={opt.value}>
                                  {opt.label}
                                </option>
                              );
                            })}
                          </select>
                        ))}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {props.Data.map((row: string, iR: number) => {
                return (
                  <tr key={iR}>
                    {props.Columns.map((col: any, iC: number) => {
                      return (
                        <td key={iC}>
                          {col.value === undefined
                            ? col.id === "#"
                              ? iR + 1
                              : row[col.id]
                            : col.value(row[col.id])}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination>
            <Pagination.Item
              onClick={() => {
                props.Events.first();
              }}
            >
              {"Next Page"}
            </Pagination.Item>
            <Pagination.Item
              onClick={() => {
                props.Events.pre();
              }}
            >
              {"Previous Page"}
            </Pagination.Item>
            <Pagination.Item active>
              {"Page "}
              {props.Pagination.pageNumber + 1}
            </Pagination.Item>
            <Pagination.Item
              onClick={() => {
                props.Events.next();
              }}
            >
              {"Next Page"}
            </Pagination.Item>
            <Pagination.Item
              onClick={() => {
                props.Events.last();
              }}
            >
              {"Last Page"}
            </Pagination.Item>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default GridView;
