import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
    buttons_admin,
    buttons_docente,
    buttons_estudiante,
} from "../assets/ButtonsNav/BtnsSidebar";
import Navbar from "../components/Navigation/navbar";
import ProtectedRoute from "../components/Navigation/ProtectedRoute";
import Sidebar from "../components/Navigation/Sidebar";
import HomeAdminPage from "../pages/ProtectedPage/AdminLayout/HomeAdminPage";
import PageDocenteCrud from "../pages/ProtectedPage/AdminLayout/PageDocenteCrud";
import HomeDocentePage from "../pages/ProtectedPage/DocenteLayout/HomeDocentePage";
import HomeEstudiantePage from "../pages/ProtectedPage/EstudianteLayout/HomeEstudiantePage";
import LandingPage from "../pages/PublicPages/LandingPage";
import LoginPage from "../pages/PublicPages/LoginPage";
import AsignaturaDetallePage from "../pages/ProtectedPage/DocenteLayout/AsignaturaDetallePage";
import StudentsSubjectPage from "../pages/ProtectedPage/DocenteLayout/StudentsSubjectPage";
import PageTestEstresCrud from "../pages/ProtectedPage/AdminLayout/TestEstres";
import AsignacionTestPage from "../pages/ProtectedPage/DocenteLayout/AsignacionTestPage";
import NuevaActividadPage from "../pages/ProtectedPage/DocenteLayout/NuevaActividadPage";
import ActividadDetalles from "../pages/ProtectedPage/DocenteLayout/ActividadDetalles";
import CuentaCrudPage from "../pages/ProtectedPage/AdminLayout/CuentaCrudPage";
import AsignaturaConfigPage from "../pages/ProtectedPage/DocenteLayout/AsignaturaConfigPage";
import ResultadoTestPage from "../pages/ProtectedPage/EstudianteLayout/ResultadoTestPage";
import GroupPage from "../pages/ProtectedPage/DocenteLayout/GroupPage";
import PageRecomendaciones from "../pages/ProtectedPage/AdminLayout/PageRecomendaciones";
import RecomendacionesTestEstres from "../components/Tables/RecomendacionesTestEstres";
import GroupDetails from "../util/GroupDetails";
import PerfilPage from "../pages/PublicPages/PerfilPage";
import RecuperarPassword from "../pages/PublicPages/RecuperarPassword";
import ResetPassword from "../pages/PublicPages/ResetPassword";

function Rutas({ store, actions }) {
    const rol = store.access_role;

    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                {/* Navbar and Sidebar */}
                {store.isAuthenticated && (
                    <>
                        <div className="z-50 w-full fixed top-0">
                            <Navbar actions={actions} store={store} rol={rol} />
                        </div>
                        {rol === "ADMINISTRADOR" && (
                            <div className="fixed left-0 top-16 h-full bg-gray-800">
                                <Sidebar buttons={buttons_admin} />
                            </div>
                        )}
                    </>
                )}

                {/* Main Content */}
                <div
                    className={`flex-grow ${store.isAuthenticated
                            ? rol === "ADMINISTRADOR"
                                ? "ml-16 mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-slate-200"
                                : "mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-slate-200"
                            : ""
                        } bg-gray-100`}
                >
                    <Routes>
                        {/* Rutas públicas */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute
                                    isPublic={true}
                                    to={`/home/${rol ? rol.toLowerCase() : "default"
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
                                    to={`/home/${rol ? rol.toLowerCase() : "default"
                                        }`}
                                >
                                    <LoginPage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/login/perfil"
                            element={
                                <ProtectedRoute>
                                    <PerfilPage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/recuperar/password"
                            element={
                                <RecuperarPassword
                                    actions={actions}
                                    store={store}
                                />
                            }
                        />
                        <Route
                            path="/reset_password/:token/:id_cuenta"
                            element={
                                <ResetPassword
                                    actions={actions}
                                    store={store}
                                />
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
                            path="/home/administrador/tests"
                            element={
                                <ProtectedRoute>
                                    <PageTestEstresCrud
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/administrador/tests/recomendaciones/:idTest"
                            element={
                                <ProtectedRoute>
                                    <RecomendacionesTestEstres
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/administrador/recomendaciones"
                            element={
                                <ProtectedRoute>
                                    <PageRecomendaciones
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/administrador/cuentas"
                            element={
                                <ProtectedRoute>
                                    <CuentaCrudPage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        {/* Rutas docente */}
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
                            path="/home/docente/asignatura/:id/asignaciones"
                            element={
                                <ProtectedRoute>
                                    <AsignacionTestPage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/docente/asignatura/:id"
                            element={
                                <ProtectedRoute>
                                    <AsignaturaDetallePage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/docente/asignatura/:id/configuracion"
                            element={
                                <ProtectedRoute>
                                    <AsignaturaConfigPage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/docente/asignatura/:id/estudiantes"
                            element={
                                <ProtectedRoute>
                                    <StudentsSubjectPage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/docente/asignatura/:id/grupos"
                            element={
                                <ProtectedRoute>
                                    <GroupPage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/docente/gruposDetallesUpdate/:id/:idAsignatura"
                            element={
                                <ProtectedRoute>
                                    <GroupDetails
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/docente/asignatura/:id/actividades"
                            element={
                                <ProtectedRoute>
                                    <NuevaActividadPage
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/docente/asignatura/:asignaturaId/actividades/:actividadId"
                            element={
                                <ProtectedRoute>
                                    <ActividadDetalles
                                        actions={actions}
                                        store={store}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        {/* Rutas Estudiante */}
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
                        <Route
                            path="/home/estudiante/resultado_test/:id"
                            element={
                                <ProtectedRoute>
                                    <ResultadoTestPage
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
