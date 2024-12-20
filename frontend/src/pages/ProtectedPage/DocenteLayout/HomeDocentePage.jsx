import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navigation/navbar";

function HomeDocentePage({ actions, store }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.isAuthenticated) {
            navigate("/login");
        }
    }, [store.isAuthenticated, navigate]);

    return (
        <div>
            <h1>Home Docente</h1>
        </div>
    );
}

export default HomeDocentePage;
