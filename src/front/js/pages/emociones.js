import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export const Emociones = () => {

    const { store, actions } = useContext(Context);

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">
                {/* Encabezado del componente de los hábitos*/}
                <h4><i className="fa-solid fa-chart-column"></i> Hábitos</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <p>En esta sección, podrás llevar un registro de <strong>cómo te has sentido</strong> en los últimos días. Este registro te ayudará a <strong>crear tu propia estadística
                        y podrás ubicar patrones</strong> que te permitirán saber qué está afectando positiva o negativamente en la manera en la que te sientes. Esta herramienta
                        puede ser de gran ayuda para aprovechar aquello que te hace <strong>sentir mejor</strong>, y mejorar aquellos aspectos que no.</p>
                </div>
            </div>
        </div>
    )
};