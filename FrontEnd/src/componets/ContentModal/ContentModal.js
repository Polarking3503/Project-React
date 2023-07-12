import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import swal from 'sweetalert';

export default function ContentModal(props) {
  const [dataModal, setDataModal] = useState({
    nombre: "",
    descripcion: ""
  })

  const editDataModal = (event) => {
    setDataModal({
      ...dataModal,
      [event.target.name]: event.target.value
    })
  }

  const sentDataModal = async (event) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      console.log(user)
      const saveModal = await axios.post("http://localhost:4000/api-v1/register/curso", {
        nombreCurso: dataModal.nombre,
        descripcion_curso: dataModal.descripcion,
        id_usuario: user.codigo
      })
      console.log("SaveModal", saveModal)
      props.onHide()
      props.setLoading(true);
      swal("Buen trabajo!", "Tus datos se enviaron correctamente", "success");
    } catch (error) {
      console.log("Error", error)
      swal("Lo sentimos", "Datos incorrectos", "error");
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Añade tu curso
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Ingresa solo letras"
              autoFocus
              onChange={(event) => {
                editDataModal(event)
              }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              name="descripcion"
              onChange={(event) => {
                editDataModal(event)
              }} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Cancelar</Button>
        <Button
          variant="dark"
          onClick={() => {
            sentDataModal()
          }}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
