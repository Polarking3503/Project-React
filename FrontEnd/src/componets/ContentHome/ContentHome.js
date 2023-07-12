import React, { useEffect, useState } from "react";
import CardComponet from "./CardComponent";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "./ContentHome.css";

export default function ContentHome() {
  const [modalShow, setModalShow] = React.useState(false);
  const [courses, setCourses] = useState([])

  const getDataHome = async () => {
    const cursos = await axios.get("http://localhost:4000/api-v1/home")
    const curseDatabase = cursos.data.data;
    setCourses(curseDatabase)


  }
  useEffect(() => {
    getDataHome()
  }, [])

  return (
    <Container className="ContentHome">
      {
        courses.map((course) => {
          console.log(course)
          return <CardComponet course={course} />
        })
      }
    </Container>
  );
}
