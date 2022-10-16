import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiFillIdcard } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";

const Detail = () => {
  let { id } = useParams();

  const { data: detailData } = useQuery("detailCache", async () => {
    const response = await API.get(`/data-karyawan/${id}`);

    return response.data;
  });

  return (
    <Container>
      <Row>
        <div className="d-flex">
          <h3>
            <span style={{ fontSize: "1.5em" }}>
              <AiFillIdcard />
            </span>{" "}
            Aplikasi Data Pribadi
          </h3>
        </div>
      </Row>

      <Row>
        <Col
          style={{ backgroundColor: "#FCE4D6", border: "2px solid salmon" }}
          className="p-3"
        >
          <h2 className="mb-4">{detailData?.nik}</h2>
          <p className="text-muted" style={{ marginTop: "-20px" }}>
            NIK
          </p>
          <h2 className="mb-4">{detailData?.namaLengkap}</h2>
          <p className="text-muted" style={{ marginTop: "-20px" }}>
            Nama Lengkap
          </p>
          <h2 className="mb-4">{detailData?.tanggalLahir}</h2>
          <p className="text-muted" style={{ marginTop: "-20px" }}>
            Tanggal Lahir
          </p>
          <h2 className="mb-4">{detailData?.alamat}</h2>
          <p className="text-muted" style={{ marginTop: "-20px" }}>
            Alamat
          </p>
          <h2 className="mb-4">{detailData?.negara}</h2>
          <p className="text-muted" style={{ marginTop: "-20px" }}>
            Negara
          </p>
        </Col>
      </Row>

      <Row>
        <Col
          className="d-flex justify-content-end gap-3"
          style={{ marginTop: "-20px" }}
        >
          <Link to='/'>
            <Button className="px-5 py-2">Kembali</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
