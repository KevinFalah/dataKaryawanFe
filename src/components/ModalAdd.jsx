import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { AiFillIdcard } from "react-icons/ai";
import { useMutation } from "react-query";
import {DataFakeCountry} from '../dataFakeCountry/DataFakeCountry'
import {API} from '../config/api'

function ModalAdd({ show, handleCloseAdd, setFetchStatus}) {

    const [formData, setFormData] = useState({
        nik: 0,
        namaLengkap: "",
        jenisKelamin: "",
        tanggalLahir: "",
        alamat: "",
        negara: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const body = JSON.stringify(formData);

            const response = await API.post("/data-karyawan", body, config);
            setFetchStatus(true)
            handleCloseAdd();
        } catch (error) {
            console.log(error)
        }   
    })

  return (
    <>
      <Modal show={show} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>
              <span style={{ fontSize: "1.5em" }}>
                <AiFillIdcard />
              </span>{" "}
              Aplikasi Data Pribadi
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Modal.Body>
            <h5 className="mb-4">Tambah Data Baru</h5>
            {/* NIK */}
            <Form.Group className="mb-3" controlId="formNik">
              <Form.Label>NIK</Form.Label>
              <Form.Control type="text" placeholder="NIK" name="nik" onChange={handleChange}/>
            </Form.Group>
            {/* Nama */}
            <Form.Group className="mb-3" controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control type="text" placeholder="Nama" name="namaLengkap" onChange={handleChange}/>
            </Form.Group>
            {/* Jenis Kelamin */}
            <Form.Group className="mb-3" controlId="formJenisKelamin">
              <input type="radio" value="Laki-laki" name="jenisKelamin" onChange={handleChange}/>
              <Form.Label className="me-3">Laki-laki</Form.Label>
              <input type="radio" value="Perempuan" name="jenisKelamin" onChange={handleChange} />
              <Form.Label>Perempuan</Form.Label>
            </Form.Group>
            {/* Tanggal Lahir */}
            <Form.Group className="mb-3" controlId="formTanggal">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control type="date" placeholder="Date" name="tanggalLahir" onChange={handleChange}/>
            </Form.Group>
            {/* Alamat */}
            <Form.Group className="mb-3 d-flex flex-column" controlId="formAlamat">
              <Form.Label>Alamat</Form.Label>
              <textarea style={{resize:"none"}} rows={4} name="alamat" onChange={handleChange}></textarea>
            </Form.Group>
            {/* Negara */}
            <Form.Group className="mb-3 d-flex flex-column" controlId="formNegara">
              <Form.Label>Negara</Form.Label>
              <select name="negara" onChange={handleChange}>
                <option disabled>Pilih Negara</option>
                {DataFakeCountry?.map((data, index) => (
                    <option key={index}>{data.name}</option>
                ))}
              </select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAdd;
