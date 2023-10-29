import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/escritorio.css";

export const Escritorio = () => {

    const { store, actions } = useContext(Context);

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">
                <h4>Escritorio</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                </div>
            </div>
        </div>
    )
};