import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavbarMain() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-white font-semibold text-2xl flex items-center space-x-3"
                    >
                        <img
                            src="public/img/logo.png"
                            className="h-10 w-10 rounded-full"
                            alt="logo"
                        />
                        <span className="tracking-wide">Stress Tracker</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link
                            to="/about"
                            className="text-gray-300 hover:text-white transition duration-300"
                        >
                            Acerca de
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-300 hover:text-white transition duration-300"
                        >
                            Contacto
                        </Link>
                    </div>

                    {/* Login/Register Buttons */}
                    <div className="hidden md:flex space-x-4">
                        <Link to="/login">
                            <button className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                                Iniciar sesión
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isMenuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-gray-800 text-gray-300 space-y-4 py-4 px-6">
                        <Link
                            to="/about"
                            className="block hover:text-white transition duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Acerca de
                        </Link>
                        <Link
                            to="/contact"
                            className="block hover:text-white transition duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contacto
                        </Link>
                        <Link to="/login">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                            >
                                Iniciar sesión
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavbarMain;
