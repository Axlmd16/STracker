import { BookA, HeartHandshake, Key, UsersRound } from "lucide-react";
import { React } from "react";

export const buttons_admin = [
    { icon: Key, href: "/home/admin/cuentas", tooltip: "Cuentas de usuarios" },
    {
        icon: HeartHandshake,
        href: "/home/admin/tests",
        tooltip: "Tests de estres",
    },
    {
        icon: UsersRound,
        href: "/home/admin/docentes",
        tooltip: "Docentes",
    },
];

export const buttons_docente = [
    {
        icon: UsersRound,
        href: "/home/docente/estudiantes",
        tooltip: "Estudiantes",
    },
    {
        icon: BookA,
        href: "/home/docente/asignaturas",
        tooltip: "Asignaturas",
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
