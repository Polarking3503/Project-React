import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logoPotato from "../img/potato.png";
import NavbarComponet from "../componets/NavbarComponet";
import axios from "axios";
import swal from 'sweetalert';
import {useNavigate} from "react-router-dom"
import "./Login.css";

export default function Login() {
  const navegation = useNavigate ()

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: ""
  })

  const editDataLogin = (event) => {
    setDataLogin({
      ...dataLogin,
      [event.target.name]: event.target.value
    })
  }

  const sentDataLogin = async (event) => {
    try {
      const saveLogin = await axios.post("http://localhost:4000/api-v1/login", {
        correo: dataLogin.email,
        password: dataLogin.password
      })
      console.log("Savelogin", saveLogin.data.data.data)

      localStorage.setItem("user", JSON.stringify(saveLogin.data.data.data))
      navegation("/registro-curso")
    } catch (error) {
      console.log("Error", error)
      swal("Lo sentimos", "Datos incorrectos", "error");
    }
  };

  useEffect(() => {
    localStorage.removeItem("user")
  }, [])

  return (
    <div>
      <NavbarComponet />
      <div className="content_login">
        <div className="LoginContent">
          <div className="Img_Content">
            <img
              className="logoPotato"
              src={logoPotato}
              alt="LogoPotato"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            {/* aqui va el contenido */}
            <Form>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="TextInput">Correo</Form.Label>
                  <Form.Control
                    id="TextInput"
                    type="email"
                    value={dataLogin.email}
                    placeholder="Ingresa tu correo"
                    name="email"
                    onChange={(event) => {
                      editDataLogin(event)
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="TextInput">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    id="TextInput"
                    value={dataLogin.password}
                    placeholder="Ingresa la contraseña"
                    name="password"
                    onChange={(event) => {
                      editDataLogin(event)
                    }}
                  />
                </Form.Group>
                <Button
                variant="outline-dark"
                  style={{ width: "100%" }}
                  onClick={() => {
                    sentDataLogin()
                  }}>
                  Iniciar Sesion
                </Button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
