import React from "react";
import LoginForm from "../../components/Forms/LoginForm";

function LoginPage({ actions, store }) {
    return (
        <div className="flex h-screen ">
            {/* Lado Izquierdo: Formulario de Login */}
            <div className="w-full md:w-2/5 flex flex-col justify-center items-center  ">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-semibold tracking-wide text-gray-800">
                        Bienvenido
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Inicia sesión para continuar
                    </p>
                </div>
                <div className="w-4/5">
                    <LoginForm actions={actions} store={store} />
                </div>
            </div>

            <div className="hidden md:flex w-3/5 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 items-center justify-center relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/src/util/imgs/cerebro.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
            </div>
            {/* //* Version antigua */}
            {/* <div className="hidden md:flex w-3/5 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 items-center justify-center relative">
                <div className="absolute top-0 left-0 h-full w-full bg-gray-900 opacity-50"></div>
                <div className="relative z-10 text-center text-white px-8">
                    <h2 className="text-3xl font-semibold tracking-wide">
                        Gestión del Estrés
                    </h2>
                    <p className="mt-4 text-gray-300">
                        Una herramienta diseñada para ayudarte a comprender y
                        manejar tu estrés académico.
                    </p>
                </div>
            </div> */}
        </div>
    );
}

export default LoginPage;
