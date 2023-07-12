import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import CardComponetModal from "../componets/ContentModalTema/CardComponentModal";
import axios from "axios";
import Container from "react-bootstrap/Container";
import ContentModalTema from "../componets/ContentModalTema/ContentModalTema";
import { Link } from "react-router-dom"
import "./RegistroTema.css";

export default function RegistroTema(props) {
  const sesion = JSON.parse(localStorage.getItem("user"));
  const [modalShow, setModalShow] = React.useState(false)
  const [loadign, setLoadign] = React.useState(false)
  const [temas, setTemas] = useState([])

  const getDataTema = async () => {
    try {
      const temaActual = JSON.parse(localStorage.getItem("cursoActual"))
      console.log(temaActual.id_curso)
      const tems = await axios.get(`http://localhost:4000/api-v1/registro/tema/${temaActual.id_curso}`)

      const temasDatabase = tems?.data?.data;
      setTemas(temasDatabase)
    } catch (error) {
      console.log(error, "error")
    }
  }

  useEffect(() => {
    setLoadign(false)
    getDataTema()
  }, [loadign]);

  return (
    <Container className="RegistroTema">
      <div>
        <div className="ButtonAdd">
          {!sesion ? null : (
            <Button onClick={() => {
              setModalShow(true)
            }} variant="success" style={{ margin: "1px" }}>Añadir tema</Button>
          )}
          <Link to={!sesion ? "/" : '/registro-curso'}>
            <Button variant="success" style={{ margin: "1px" }}>
              Volver
            </Button>
          </Link>
        </div>
        <div className="Card_Component">
          {
            temas.map((temacurso) => {
              return <CardComponetModal temacurso={temacurso} setLoadign={setLoadign} />
            })
          }
        </div>
      </div>
      <ContentModalTema show={modalShow} onHide={() => setModalShow(false)} setLoadign={setLoadign} />

    </Container>
  )
}