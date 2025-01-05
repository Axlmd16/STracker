import React from "react";
import NavbarMain from "../../components/Navigation/NavbarMain";

function LandingPage() {
    return (
        <div className="bg-white min-h-screen text-gray-900">
            <NavbarMain />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 py-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
                        Bienvenido a{" "}
                        <span className="text-blue-600">Stress Tracker</span>
                    </h1>
                    <p className="mt-4 text-gray-700 text-lg md:text-xl">
                        Una solución innovadora para monitorear y gestionar el
                        estrés académico de estudiantes de manera eficiente.
                    </p>
                    <div className="mt-8">
                        <a
                            href="/login"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium text-lg transition"
                        >
                            Comenzar Ahora
                        </a>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-100">
                <div className="container mx-auto px-6 md:px-12 lg:px-16">
                    <h2 className="text-3xl font-semibold text-center text-blue-600">
                        Características Clave
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        <div className="bg-white p-6 rounded-lg text-center shadow-lg border border-gray-300">
                            <h3 className="text-xl font-bold text-blue-600">
                                Monitoreo Continuo
                            </h3>
                            <p className="mt-4 text-gray-700">
                                Realiza un seguimiento de tus niveles de estrés
                                en tiempo real.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg text-center shadow-lg border border-gray-300">
                            <h3 className="text-xl font-bold text-blue-600">
                                Reportes Personalizados
                            </h3>
                            <p className="mt-4 text-gray-700">
                                Obtén análisis detallados y visualiza tu
                                progreso.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg text-center shadow-lg border border-gray-300">
                            <h3 className="text-xl font-bold text-blue-600">
                                Facilidad de Uso
                            </h3>
                            <p className="mt-4 text-gray-700">
                                Una interfaz intuitiva diseñada pensando en
                                estudiantes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="py-16 bg-blue-100">
                <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
                    <h2 className="text-3xl font-semibold text-blue-600">
                        ¡Únete hoy y comienza a tomar el control!
                    </h2>
                    <p className="mt-4 text-gray-700 text-lg">
                        Descubre cómo puedes reducir tu estrés y mejorar tu
                        rendimiento académico.
                    </p>
                    <div className="mt-8">
                        <a
                            href="/login"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium text-lg transition"
                        >
                            Registrarse Gratis
                        </a>
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
}

export default LandingPage;
