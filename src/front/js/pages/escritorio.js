import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/escritorio.css";
import atom from "../../img/atom.png";
import list from "../../img/list.png";
import books from "../../img/books.png";

export const Escritorio = () => {

    const { store, actions } = useContext(Context);

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">

                {/* Encabezado del escritorio principal del usuario */}
                <h4>Escritorio</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <h5>¿Qué deseas hacer hoy?</h5>
                </div>

                {/* Se muestran las cards principales del escritorio (enlaces a las herramientas) */}
                <div className="desktopSecondHeader">
                    <div className="desktopCard me-2">
                        <div id="leftDesktopCard">
                            <img src={atom} className="desktopCardImg" />
                        </div>
                        <div id="rightDesktopCard">
                            <h4 className="desktopCardTitle">Hábitos</h4>
                            <p className="desktopCardText"> Incorpora hábitos positivos a tu vida y hazles seguimiento. </p>
                        </div>
                    </div>
                    <div className="desktopCard me-2">
                        <div id="leftDesktopCard">
                            <img src={books} className="desktopCardImg" />
                        </div>
                        <div id="rightDesktopCard">
                            <h4 className="desktopCardTitle">Diarios</h4>
                            <p className="desktopCardText"> Llevar un diario siempre es una buena práctica para tu día a día. </p>
                        </div>
                    </div>
                    <div className="desktopCard me-2">
                        <div id="leftDesktopCard">
                            <img src={list} className="desktopCardImg" />
                        </div>
                        <div id="rightDesktopCard">
                            <h4 className="desktopCardTitle">Listas</h4>
                            <p className="desktopCardText"> ¡Que no se te olvide nada! Lleva listas de tus tareas pendientes. </p>
                        </div>
                    </div>
                    <div className="desktopCard">
                        <div id="leftDesktopCard">
                            <img src={atom} className="desktopCardImg" />
                        </div>
                        <div id="rightDesktopCard">
                            <h4 className="desktopCardTitle">Ánimo</h4>
                            <p className="desktopCardText"> Haz seguimiento a tu estado de ánimo y ve midiendo tu evolución. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};