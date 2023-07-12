import { BrowserRouter, Routes, Route } from "react-router-dom" //Llamamos libreria que nos ayuda a enrutar la aplicacion
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegistroCurso from "./pages/RegistroCurso";
import RegistroTema from "./pages/RegistroTema";
import RegistroMaestro from "./pages/RegistroMaestro";
import NavbarComponet from "./componets/NavbarComponet";




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {
            //Estas son las rutas de la aplicacion
          }
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="registro-maestro" element={<RegistroMaestro />} />
          <Route path="registro-curso" element={<RegistroCurso />} />
          <Route path="registro-temas" element={<RegistroTema />} />
          <Route path="*" element={<p>Este elemento no existe</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
