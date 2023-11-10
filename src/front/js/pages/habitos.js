import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/habitos.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const Habitos = () => {

    const [date, setDate] = useState(new Date())
    const { store, actions } = useContext(Context);

    const onChange = date => {
        setDate(date)
    }

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">

                {/* Encabezado del componente de las listas */}
                <h4><i class="fa-solid fa-chart-column"></i> Hábitos</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <p>En esta sección, podrás crear y hacer seguimiento a tus hábitos. Para crear un nuevo hábito, haz clic en el botón "crear hábito nuevo". A continuación, ingresa un nombre para tu hábito, una descripción opcional y la frecuencia con la que deseas realizarlo.</p>
                    {/*<p>{filteredLists.length == 0 ? <p>Actualmente no tienes ninguna lista creada.</p> : <p>Actualmente tienes {filteredLists.length} {filteredLists.length == 1 ? "lista creada." : "listas creadas."}</p>}</p>*/}
                </div>

                <div className="habitsBoxUnderHeader">

                    <div className="leftHabitsSide">
                        <div className="desktopMainButton">
                            {/* Boton para crear un hábito nuevo */}
                            <button type="button" className="deskMainButton" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                Crear hábito nuevo
                            </button>
                        </div>
                    </div>

                    <div className="rightHabitsSide">
                        <h1>Hábitos</h1>
                        <div>
                            <Calendar onChange={onChange} value={date} />
                        </div>
                        <div className="rightSideDateBox">
                            <p className="rightSideDate">Hoy es {date.toLocaleDateString()} </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};