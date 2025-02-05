import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { encrypt } from "../../util/utilities/encriptado";
import NavbarMain from "../../components/Navigation/NavbarMain";

const RecuperarPassword = ({actions, store}) => {
  const secretKey = "reset_password";

  const [numeroIdentificacion, setNumeroIdentificacion] = useState("");
  const [gmail, setGmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Aqui 1");
    const numIdentificacion = numeroIdentificacion;
    const correo = gmail;
    
    // console.log("Aqui 2");
    const data = {
      correo,
      numIdentificacion,
    };

    // console.log("Aqui 3");
    const id_cuenta_reset_password = await actions.validar_usuario_cambio_password(data);
    // console.log("Aqui 4");
    
    if (id_cuenta_reset_password) {
      const id = id_cuenta_reset_password.toString();
      const encryptedId = encrypt(id, secretKey);
    //   console.log("Aqui 5");
      
      //   const id_descriptado = decrypt(encryptedId, secretKey);
      
      const data_info = {
        correo,
        id_cuenta_reset_password: encryptedId,
    };
    
        // console.log("Aqui 6");
        await actions.recuperar_password(data_info);
        
        // console.log("Aqui 7");
        toast.success("¡Correo de recuperación enviado!");
        navigate(`/`);
    } else {
        // console.log("Aqui 8");
      toast.error("Error, información incorrecta");
    }

    setNumeroIdentificacion("");
    setGmail("");
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <NavbarMain />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-blue-600">
            Recupera tu Contraseña
          </h1>
          <p className="mt-4 text-gray-700 text-lg md:text-xl">
            Ingresa tu información para recibir un correo con las instrucciones de recuperación.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="numeroIdentificacion" className="block text-gray-700 font-medium mb-2">
                  Número de Identificación
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    id="numeroIdentificacion"
                    type="text"
                    className={`border rounded-lg bg-gray-100 text-gray-900 p-3 w-full ${
                      errorMessage && !numeroIdentificacion ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="1104000000"
                    value={numeroIdentificacion}
                    onChange={(e) => setNumeroIdentificacion(e.target.value)}
                    required
                  />
                  <User className="text-gray-600 w-6 h-6" />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="gmail" className="block text-gray-700 font-medium mb-2">
                  Correo Electrónico
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    id="gmail"
                    type="email"
                    className={`border rounded-lg bg-gray-100 text-gray-900 p-3 w-full ${
                      errorMessage && !gmail ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="ejemplo@gmail.com"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    required
                  />
                  <User className="text-gray-600 w-6 h-6" />
                </div>
              </div>

              {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Recuperar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 py-8 text-center text-gray-700">
        <p className="text-sm">
          &copy; 2024 Stress Tracker. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default RecuperarPassword;
