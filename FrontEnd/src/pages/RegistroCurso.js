import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import CardComponet from "../componets/ContentHome/CardComponent";
import axios from "axios";
import Container from "react-bootstrap/Container";
import ContentModal from "../componets/ContentModal/ContentModal";
import { Link, useNavigate } from "react-router-dom"
import "./RegistroCurso.css";
import Login from "./Login";

export default function RegistroCurso(props) {
  const navigation = useNavigate();
  const sesion = JSON.parse(localStorage.getItem("user"));
  const [loadign, setLoading] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [courses, setCourses] = useState([])

  const getDataHome = async () => {
    const cursos = await axios.get(`http://localhost:4000/api-v1/register/curso/${sesion?.codigo}`)
    const curseDatabase = cursos.data.data;
    setCourses(curseDatabase)
  }
  useEffect(() => {
    setLoading(false);
    getDataHome()
  }, [loadign])

  if (!sesion) {
    return navigation('/login')
  }

  return (
    <Container className="RegistroCurso">
      <div>
        <div className="ButtonAdd">
          {!sesion ? (
            null
          ) :
            <>
              <Button onClick={() => {
                setModalShow(true)
              }} variant="success" style={{ margin: "1px" }}>Añadir curso</Button>
              <Link to={"/login"}>
                <Button variant="danger" style={{ margin: "1px" }} onClick={() => localStorage.removeItem('user')}>
                  Cerrar Sesión
                </Button>
              </Link>
            </>
          }
          {/* <Link to={"/"}>
            <Button variant="success" style={{ margin: "1px" }}>
              Volver
            </Button>
          </Link> */}
        </div>
        <div className="Card_Component">
          {
            courses?.map((course) => {
              console.log(course)
              return <CardComponet course={course} origin={"Maestro"} />
            })
          }
        </div>
      </div>
      <ContentModal show={modalShow} onHide={() => setModalShow(false)} setLoading={setLoading} />

    </Container>
  );
}
