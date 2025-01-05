import {
    BookA,
    Group,
    HeartHandshake,
    Key,
    Settings,
    UsersRound,
} from "lucide-react";

export const buttons_admin = [
    {
        icon: Key,
        href: "/home/administrador/cuentas",
        tooltip: "Cuentas de usuarios",
    },
    {
        icon: HeartHandshake,
        href: "/home/administrador/tests",
        tooltip: "Tests de estres",
    },
    {
        icon: UsersRound,
        href: "/home/administrador/docentes",
        tooltip: "Docentes",
    },
];

export const buttons_docente = [
    {
        icon: UsersRound,
        href: "/home/docente/asignatura/:id/estudiantes",
        tooltip: "Estudiantes",
    },
    {
        icon: Group,
        href: "/home/docente/asignatura/:id/grupos",
        tooltip: "Asignaturas",
    },
    {
        icon: BookA,
        href: "/home/docente/asignacion",
        tooltip: "Asignacion de tests",
    },
    {
        icon: Settings,
        href: "/home/docente/asignatura/:id/configuracion",
        tooltip: "Configuracion",
    },
];

export const buttons_estudiante = [
    {
        icon: UsersRound,
        href: "/home/estudiante/asignaturas",
        tooltip: "Asignaturas",
    },
    {
        icon: HeartHandshake,
        href: "/home/estudiante/tests",
        tooltip: "Tests de estres",
    },
];

export default buttons_admin;
