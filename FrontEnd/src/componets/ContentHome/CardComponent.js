import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

export default function CardComponet({ course, origin = "home" }) {


  const navegation = useNavigate()
  const sentDataTema = async (event) => {
    try {
      localStorage.setItem("cursoActual", JSON.stringify(course))
      navegation("/registro-temas")
    } catch (error) {
      console.log("Error", error)
      swal("Lo sentimos", "Datos incorrectos", "error");
    }
  }
  console.log(course.id_curso)
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title>{course.nombreCurso}</Card.Title>

        <Card.Text>
        <div>
            <h5 style={{ marginRight: "5px" }}>Descripcion:</h5>
            <div dangerouslySetInnerHTML={{ __html: course.descripcion_curso}} style={{textOverflow: "ellipsis !important", overflow: "auto", height: "250px"}}>
            </div>
          </div>
        </Card.Text>
        {
          origin === "home" ? (
            <Link to={"/registro-temas"}>
              <Button variant="outline-success" style={{ width: "100%" }} onClick={() => {
                sentDataTema()
              }}>
                Ver tema
              </Button>
            </Link>
          ) : (
            <Button variant="outline-secondary"
              style={{ width: "100%" }}
              onClick={() => {
                sentDataTema()
              }}>
              Ir a temas
            </Button>
          )
        }

      </Card.Body>
    </Card>
  );
}
