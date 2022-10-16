import {useState, useEffect} from "react";
import { Button, Col, Container, Form, Row} from "react-bootstrap";
import { AiFillIdcard } from "react-icons/ai";
import {API} from '../config/api'
import { useQuery } from "react-query";
import DataTable from "../components/DataTable";
import ModalAdd from "../components/ModalAdd";
import axios from "axios";

const Home = () => {
 
  const [showAdd, setShowAdd] = useState(false);

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);

    const [fetchStatus, setFetchStatus] = useState(true)
    const [dataApi, setDataApi] = useState(null)
    const [dataFilter, setDataFilter] = useState([])


    const handleDataFilterNik = (e) => {
      if (!e.target.value) {
        setDataFilter(dataApi);
        return;
      }

  
      const filterData = dataApi?.filter((data) => {
        let dataString = data.nik.toString();
        return dataString
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
  
      setDataFilter(filterData);
    };

    const handleDataFilterNama = (e) => {
      if (!e.target.value) {
        setDataFilter(dataApi);
        return;
      }

  
      const filterData = dataApi?.filter((data) => {
        return data.namaLengkap
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
  
      setDataFilter(filterData);
    };

    useEffect(() => {
      let fetchData = () => {
        axios
        .get("https://datakaryawanistidata.herokuapp.com/api/v1/data-karyawan")
        .then((res) => {
          let resData = res.data

          let resultData = resData.map((res) => {
            let {id, alamat, jenisKelamin, namaLengkap, negara, nik, tanggalLahir} = res;

            return {
              id,
              alamat, 
              jenisKelamin, 
              namaLengkap, 
              negara, 
              nik, 
              tanggalLahir
            };
          });
          setDataApi([...resultData]);
        })
      }

      if(fetchStatus === true) {
        fetchData();
        setFetchStatus(false)
      }

    }, [fetchStatus, setFetchStatus])

    useEffect(() => {
      setDataFilter(dataApi);
    }, [dataApi]);


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
          <Form style={{ width: "30%" }} className="fw-bold">
            <Form.Group className="mb-3" controlId="formNik">
              <Form.Label>NIK</Form.Label>
              <Form.Control type="text" placeholder="Cari NIK" onChange={handleDataFilterNik} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control type="text" placeholder="Cari Nama" onChange={handleDataFilterNama}/>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end gap-3" style={{marginTop:"-20px"}}>
          <Button className="px-5 py-2">Search</Button>
          <Button onClick={handleShowAdd} className="px-5 py-2">Add</Button>
          <ModalAdd show={showAdd} handleCloseAdd={handleCloseAdd} setFetchStatus={setFetchStatus}/>
        </Col>
      </Row>

    {/* Table */}
      <Row className="mt-5">
        <Col>
          <DataTable fetchData={dataFilter} setFetchStatus={setFetchStatus}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
