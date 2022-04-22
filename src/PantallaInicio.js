import { loginConGoogle } from "./firebase/firebase.js";

import group from "./group.jpg";
import titulppal from "./tituloppal.jpg";
import googleicon from "./googleicon.jpg";
import beta from "./beta.jpg";
import lorem from "./lorem.jpg";
import lorem2 from "./lorem2.jpg";

function PantallaInicio() {
  return (
    <div className="primerapantalla">
      <img src={group} alt="" className="group2" />
      <img src={titulppal} alt="" className="titulppal" />
      <img src={lorem} className="lorem" alt="" />
      <img src={lorem2} className="lorem2" alt="" />
      <div className="login-btn" onClick={loginConGoogle}>
        Login con Google
        <div className="contenedoricono">
          <img src={googleicon} alt="" className="googleicon" />
        </div>
      </div>
      <img src={beta} alt="" className="beta" />
    </div>
  );
}

export default PantallaInicio;
