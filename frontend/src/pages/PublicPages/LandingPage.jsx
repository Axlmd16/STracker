import React from "react";
import NavbarMain from "../../components/Navigation/NavbarMain";

function LandingPage() {
    return (
        <div className="bg-gray-800 min-h-screen text-white">
            <NavbarMain />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 py-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
                        Bienvenido a{" "}
                        <span className="text-teal-400">Stress Tracker</span>
                    </h1>
                    <p className="mt-4 text-gray-300 text-lg md:text-xl">
                        Una solución innovadora para monitorear y gestionar el
                        estrés académico de estudiantes de manera eficiente.
                    </p>
                    <div className="mt-8">
                        <a
                            href="/login"
                            className="bg-teal-400 hover:bg-teal-500 text-white py-3 px-8 rounded-lg font-medium text-lg transition"
                        >
                            Comenzar Ahora
                        </a>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-900">
                <div className="container mx-auto px-6 md:px-12 lg:px-16">
                    <h2 className="text-3xl font-semibold text-center text-teal-400">
                        Características Clave
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
                            <h3 className="text-xl font-bold text-teal-400">
                                Monitoreo Continuo
                            </h3>
                            <p className="mt-4 text-gray-300">
                                Realiza un seguimiento de tus niveles de estrés
                                en tiempo real.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
                            <h3 className="text-xl font-bold text-teal-400">
                                Reportes Personalizados
                            </h3>
                            <p className="mt-4 text-gray-300">
                                Obtén análisis detallados y visualiza tu
                                progreso.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
                            <h3 className="text-xl font-bold text-teal-400">
                                Facilidad de Uso
                            </h3>
                            <p className="mt-4 text-gray-300">
                                Una interfaz intuitiva diseñada pensando en
                                estudiantes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="py-16 bg-gray-700">
                <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
                    <h2 className="text-3xl font-semibold text-teal-400">
                        ¡Únete hoy y comienza a tomar el control!
                    </h2>
                    <p className="mt-4 text-gray-300 text-lg">
                        Descubre cómo puedes reducir tu estrés y mejorar tu
                        rendimiento académico.
                    </p>
                    <div className="mt-8">
                        <a
                            href="/login"
                            className="bg-teal-400 hover:bg-teal-500 text-white py-3 px-8 rounded-lg font-medium text-lg transition"
                        >
                            Registrarse Gratis
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 py-8 text-center text-gray-300">
                <p className="text-sm">
                    &copy; 2024 Stress Tracker. Todos los derechos reservados.
                </p>
            </footer>
        </div>
    );
}

export default LandingPage;
