import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/PublicPages/LandingPage";
import LoginPage from "../pages/PublicPages/LoginPage";
import HomeAdminPage from "../pages/ProtectedPage/AdminLayout/HomeAdminPage";
import HomeDocentePage from "../pages/ProtectedPage/DocenteLayout/HomeDocentePage";
import HomeEstudiantePage from "../pages/ProtectedPage/EstudianteLayout/HomeEstudiantePage";
import ProtectedRoute from "../components/Navigation/ProtectedRoute";
import Navbar from "../components/Navigation/navbar";
import Sidebar from "../components/Navigation/Sidebar";
import { Toaster } from "react-hot-toast";
import {
    buttons_docente,
    buttons_admin,
    buttons_estudiante,
} from "../assets/ButtonsNav/BtnsSidebar";
import PageDocenteCrud from "../pages/ProtectedPage/AdminLayout/PageDocenteCrud";

function Rutas({ store, actions }) {
    const rol = store.access_role;

    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                {/* Navbar and Sidebar */}
                {store.isAuthenticated && (
                    <>
                        <div className="z-50 w-full fixed top-0">
                            <Navbar actions={actions} store={store} />
                        </div>
                        <div className="fixed left-0 top-16 h-full bg-gray-800">
                            <Sidebar
                                buttons={
                                    rol === "ADMINISTRADOR"
                                        ? buttons_admin
                                        : rol === "DOCENTE"
                                        ? buttons_docente
                                        : buttons_estudiante
                                }
                            />
                        </div>
                    </>
                )}

                {/* Main Content */}
                <div
                    className={`flex-grow ${
                        store.isAuthenticated
                            ? "ml-16 mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-slate-200"
                            : ""
                    }  bg-gray-100 `}
                >
                    <Routes>
                        {/* Rutas públicas */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute
                                    isPublic={true}
                                    to={`/home/${
                                        rol ? rol.toLowerCase() : "default"
                                    }`}
                                >
                                    <LandingPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <ProtectedRoute
                                    isPublic={true}
                                    to={`/home/${
                                        rol ? rol.toLowerCase() : "default"
                                    }`}
                                >
                                    <LoginPage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />

                        {/* Rutas protegidas */}
                        <Route
                            path="/home/administrador"
                            element={
                                <ProtectedRoute>
                                    <HomeAdminPage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/administrador/docentes"
                            element={
                                <ProtectedRoute>
                                    <PageDocenteCrud
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/docente"
                            element={
                                <ProtectedRoute>
                                    <HomeDocentePage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/estudiante"
                            element={
                                <ProtectedRoute>
                                    <HomeEstudiantePage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
                <Toaster />
            </div>
        </BrowserRouter>
    );
}

export default Rutas;
