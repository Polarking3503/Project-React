import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logoPotato from "../img/potato.png";
import NavbarComponet from "../componets/NavbarComponet";
import axios from "axios";
import swal from 'sweetalert';
import "./RegistroMaestro.css";

export default function RegistroMaestro() {

  const [dataRegisterTeacher, setDataRegisterTeacher] = useState({
    nombre: "",
    email: "",
    password: ""
  })

  const addDataRegisterTeacher = (event) => {
    setDataRegisterTeacher({
      ...dataRegisterTeacher,
      [event.target.name]: event.target.value
    })
  }
  const sentDataRegisterTeacher = async (event) => {
    try {
      const saveRegisterTeacher = await axios.post("http://localhost:4000/api-v1/register", {
        nombre: dataRegisterTeacher.nombre,
        correo: dataRegisterTeacher.email,
        password: dataRegisterTeacher.password
      })
      console.log("SaveRegisterTeacher", saveRegisterTeacher)
      swal("Buen trabajo!", "Tus datos se enviaron correctamente", "success");
    } catch (error) {
      console.log("Error", error)
      swal("Lo sentimos", "Datos incorrectos", "error");
    }
  }

  return (
    <div>
      <NavbarComponet />
      <div className="Content_Registrer">
        <div>
          <div className="RegistrerMaestro">
            <div className="Img_Content">
              <img
                className="logoPotato"
                src={logoPotato}
                alt="LogoPotato"
                style={{ width: "100%" }}
              />
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ingresa tu nombre"
                  onChange={(event) => {
                    addDataRegisterTeacher(event)
                  }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Correo Electronico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo"
                  onChange={(event) => {
                    addDataRegisterTeacher(event)
                  }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Ingresa la contraseña"
                  onChange={(event) => {
                    addDataRegisterTeacher(event)
                  }} />
              </Form.Group>
              <Button 
              variant="outline-dark"
              style={{ width: "100%" }}
              onClick={() => {
                sentDataRegisterTeacher()
              }}>
                Registrate
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
