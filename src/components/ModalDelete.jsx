import React, { useState } from 'react';
import {Button, Modal }from 'react-bootstrap';
import {API} from '../config/api'

function ModalDeleteData({show, handleCloseDelete, setFetchStatus ,idData}) {

    const handleDelete = async (idData) => {
        try {
          const response = await API.delete(`/data-karyawan/${idData}`);
          setFetchStatus(true);
          handleCloseDelete();
        } catch (error) {
          console.log(error);
        }
      };
    

  return (
      <Modal show={show} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Anda yakin ingin menghapus data ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Batal
          </Button>
          <Button onClick={() => handleDelete(idData)} variant="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalDeleteData;