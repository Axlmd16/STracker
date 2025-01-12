import {
    ClipboardList,
    HeartHandshake,
    HomeIcon,
    Key,
    Group,
    Settings,
    Star,
    UsersRound,
} from "lucide-react";

export const buttons_admin = [
    {
        icon: HomeIcon,
        href: "/home/administrador",
        tooltip: "Inicio",
    },
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
        icon: Star,
        href: "/home/administrador/recomendaciones",
        tooltip: "Recomendaciones",
    },
    {
        icon: UsersRound,
        href: "/home/administrador/docentes",
        tooltip: "Docentes",
    },
];

export const buttons_docente = [
    {
        icon: HomeIcon,
        href: "/home/docente",
        tooltip: "Inicio",
    },
    {
        icon: UsersRound,
        href: "/home/docente/asignatura/:id/estudiantes",
        tooltip: "Estudiantes",
    },
    {
        icon: ClipboardList,
        href: "/home/docente/asignatura/:id/asignaciones",
        tooltip: "Asignaciones",
    },
    {
        icon: Group,
        href: "/home/docente/asignatura/:id/grupos",
        tooltip: "Asignaturas",
    },
    {
        icon: Settings,
        href: "/home/docente/asignatura/:id/configuracion",
        tooltip: "Configuracion",
    },
];

export const buttons_estudiante = [
    {
        icon: HomeIcon,
        href: "/home/estudiante",
        tooltip: "Inicio",
    },
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
