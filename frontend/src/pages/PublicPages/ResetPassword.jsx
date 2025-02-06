import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { decrypt } from "../../util/utilities/encriptado";
import NavbarMain from "../../components/Navigation/NavbarMain";

const ResetPassword = ({ actions, store }) => {
  const secretKey = "reset_password";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  let { id_cuenta, token } = useParams();
    // console.log(`DATOS PARAMS: ID: ${id_cuenta}, TOKEN: ${token}`);
//   Función para validar la contraseña
  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isPasswordValid(password)) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas nuevas no coinciden");
      return;
    }
    // console.log(`id_cuenta: ${id_cuenta}`);
    const id = decrypt(id_cuenta, secretKey);
    // console.log(`id: ${id}`);

    const data = {
      id_cuenta: id,
      password,
      token,
    };

    const response = await actions.reset_password(data);
    console.log(`response:  ${response}`);
    if (response) {
      toast.success("Contraseña Cambiada Exitosamente!");
      navigate(`/`);
    } else if (response === false) {
      toast.error("Error, Tiempo terminado para cambiar contraseña!");
      navigate(`/`);
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <NavbarMain />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-blue-600">
            Restablecer Contraseña
          </h1>
          <p className="mt-4 text-gray-700 text-lg md:text-xl">
            Ingresa una nueva contraseña para tu cuenta.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Nueva Contraseña
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    id="password"
                    type="password"
                    className={`border rounded-lg bg-gray-100 text-gray-900 p-3 w-full ${
                      errorMessage && !password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Nueva Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                  Confirmar Contraseña
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`border rounded-lg bg-gray-100 text-gray-900 p-3 w-full ${
                      errorMessage && !confirmPassword ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Restablecer Contraseña
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

export default ResetPassword;
