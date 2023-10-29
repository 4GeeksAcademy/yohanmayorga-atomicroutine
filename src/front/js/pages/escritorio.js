import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export const Escritorio = () => {

    const { store, actions } = useContext(Context);

    return (
        <div className="dashboard">
            <h1>Escritorio de {store.profile ? store.profile.name : ""}</h1>
        </div>
    )
};