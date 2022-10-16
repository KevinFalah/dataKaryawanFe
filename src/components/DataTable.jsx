import { useState } from "react";
import { Table } from "react-bootstrap";
import { API } from "../config/api";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import { Link } from "react-router-dom";

const DataTable = ({ fetchData, setFetchStatus }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);


  return (
    <Table style={{ border: "1px solid black" }} striped bordered hover>
      <thead
        style={{
          backgroundColor: "SteelBlue",
          color: "Lightblue",
          textAlign: "center",
        }}
      >
        <tr>
          <th>No</th>
          <th>NIK</th>
          <th>Nama Lengkap</th>
          <th>Jenis Kelamin</th>
          <th>Tanggal Lahir</th>
          <th>Alamat</th>
          <th>Negara</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {fetchData?.map((data, index) => (
          <tr key={index}>
            <td className="text-center">{index + 1}</td>
            <td>{data.nik}</td>
            <td>{data.namaLengkap}</td>
            <td>{data.jenisKelamin}</td>
            <td>{data.tanggalLahir}</td>
            <td>{data.alamat}</td>
            <td>{data.negara}</td>
            <td className="d-flex gap-1 justify-content-center">
              <Link to={`/detail/${data.id}`}>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "orange",
                    fontWeight: "bold",
                  }}
                >
                  Detail
                </button>
              </Link>

              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "darkBlue",
                  fontWeight: "bold",
                }}
                onClick={handleShowEdit}
              >
                Edit
              </button>
              <ModalEdit
                show={showEdit}
                handleCloseEdit={handleCloseEdit}
                idData={data.id}
                setFetchStatus={setFetchStatus}
              />
              <button
                onClick={handleShowDelete}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Delete
              </button>
              <ModalDelete
                show={showDelete}
                handleCloseDelete={handleCloseDelete}
                idData={data.id}
                setFetchStatus={setFetchStatus}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
