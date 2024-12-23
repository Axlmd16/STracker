import { useNavigate, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Bell, Search } from "lucide-react";

function Navbar({ actions, store, rol }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.isAuthenticated) {
            navigate("/login");
        }
    }, [store.isAuthenticated, navigate]);

    return (
        <div className="navbar bg-base-100 shadow-lg px-4 fixed top-0 left-0 w-full z-[1000]">
            {/* Logo */}
            <div className="navbar-start">
                <Link
                    className="w-auto flex items-center"
                    to={`/home/${rol ? rol.toLowerCase() : "default"}`}
                >
                    <img
                        className="rounded-full shadow-lg w-12 h-12 mr-2"
                        src="/img/logo.png"
                        alt="logo"
                    />
                    <span className="font-semibold text-lg">Stress Traker</span>
                </Link>
            </div>

            {/* Navigation Links */}
            {/* <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <Link to="/home">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/features">Características</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contacto</Link>
                    </li>
                </ul>
            </div> */}

            {/* Icons and User Dropdown */}
            <div className="navbar-end flex items-center gap-2">
                {/* Search Icon */}
                <button
                    className="btn btn-ghost btn-circle"
                    aria-label="Buscar"
                >
                    <Search size="24" />
                </button>

                {/* Notification Icon */}

                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar mx-2"
                        aria-label="Menú de Usuario"
                    >
                        <div className="indicator">
                            <Bell size="24" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box * z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <span>
                                <strong>Notificación 1</strong>
                            </span>
                            <span>
                                <strong>Notificación 2</strong>
                            </span>
                        </li>
                    </ul>
                </div>

                {/* User Dropdown */}
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar mx-2"
                        aria-label="Menú de Usuario"
                    >
                        <div className="w-10 rounded-full">
                            <img alt="User Avatar" src="/img/user.png" />{" "}
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to="#">Perfil</Link>
                        </li>
                        <li>
                            <Link to="#">Ajustes</Link>
                        </li>
                        <li>
                            <button onClick={actions.cerrar_sesion}>
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
