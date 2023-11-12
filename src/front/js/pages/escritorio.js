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

    /* Filtro que se aplica para mostrar sólo los diarios que corresponden al usuario*/
    const filteredJournals = store.journals.filter((journal) => journal.author.id === store.profile.id);
    const filteredLists = store.lists.filter((list) => list.author.id === store.profile.id);
    const habitsToday = store.habits.filter((habit) =>  habit.author.id === store.profile.id && habit.date?.slice(0,16) === new Date().toUTCString()?.slice(0,16) && habit.completed === false)

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
                            {habitsToday.length == 0 ? <p>No tienes tareas programadas para hoy.</p> : <p>Tienes {habitsToday.length} {habitsToday.length == 1 ? "tarea programada para hoy." : "tareas programadas para hoy."}</p>}
                        </div>
                    </div>
                    <div className="desktopCard me-2">
                        <div id="leftDesktopCard">
                            <img src={books} className="desktopCardImg" />
                        </div>
                        <div id="rightDesktopCard">
                            <h4 className="desktopCardTitle">Diarios</h4>
                            <p className="desktopCardText"> Llevar un diario siempre es una buena práctica para tu día a día. </p>
                            {filteredJournals.length == 0 ? <p>No tienes ningún diario.</p> : <p>Tienes {filteredJournals.length} {filteredJournals.length == 1 ? "diario creado." : "diarios creados."}</p>}
                        </div>
                    </div>
                    <div className="desktopCard me-2">
                        <div id="leftDesktopCard">
                            <img src={list} className="desktopCardImg" />
                        </div>
                        <div id="rightDesktopCard">
                            <h4 className="desktopCardTitle">Listas</h4>
                            <p className="desktopCardText"> ¡Que no se te olvide nada! Lleva listas de tus tareas pendientes. </p>
                            {filteredLists.length == 0 ? <p>No tienes ninguna lista creada.</p> : <p>Tienes {filteredLists.length} {filteredLists.length == 1 ? "lista creada." : "listas creadas."}</p>}
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