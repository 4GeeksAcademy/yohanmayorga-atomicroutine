import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export const Dashboard = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        !store.token && navigate("/login");
        store.token === "undefined" && navigate("/login");
    });

    return (
        <div className="dashboard">
            <p><i className="fa-solid fa-heart"></i> Bienvenid@ a tu escritorio {store.profile.name}</p>
        </div>
    )
};