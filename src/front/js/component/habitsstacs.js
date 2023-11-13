import React, { useContext, useState } from "react";
import "../../styles/journal.css";
import "../../styles/habitdetail.css";
import "../../styles/habitsstacs.css";
import { Context } from "../store/appContext";
import { ProgressBar } from 'react-bootstrap';

export const HabitStacs = ({ open, close, proSummary, toToday, toTodayDone, toTodayPen, toFuture, penToday }) => {
    if (!open) return null;

    const { store, actions } = useContext(Context);

    function BasicExample() {
        return <ProgressBar now={proSummary} />;
    }

    return (
        <>
            <div className="selectedJournalBackground"></div>
            <div className="selectedJournalBox">
                <div className="selectedjournalHeader">
                    <h2><i className="fa-solid fa-chart-pie"></i> Estadísticas</h2>
                    <button type="button" className="closeButtonJournal" onClick={() => { close(false) }}>X</button>
                </div>
                <div className="selectedhabitDescription">
                    <h4>Porcentaje de eficiencia:</h4>
                    <ProgressBar variant="info" now={proSummary} label={`${proSummary}%`} />
                    {!isNaN(proSummary) ? <p className="habitsSummary">{store.profile ? store.profile.name : "Hola"},
                    hasta la fecha, tu <strong>porcentaje de eficiencia</strong> con respecto al cumplimiento de tus hábitos es del <strong>{proSummary}%</strong>.
                    Este cálculo se realiza tomando en cuenta todos los hábitos programados hasta la fecha actual y aquellos ya marcados
                    como hechos. </p> : <p className="habitsSummary">No se han encontrado resultados de progreso de cumplimiento de hábitos.
                    Esto puede deberse a que todavía no has creado un hábito nuevo para hacerle seguimiento, que no has marcado ninguno
                    como hecho, o de un error en el cálculo.</p>}
                </div>
                <div className="stacsMainBox">
                    <div className="stacsBox">
                        <div className="stacsBoxIcon">
                        <i className="fa-solid fa-calendar-days"></i>
                        </div>
                        <div className="stacsBoxTitle">
                            <h5>Hasta la fecha</h5>
                        </div>
                        <div className="stacsBoxTitle">
                            <p>Hasta hoy, el total de hábitos en tu historial es de {toToday}. </p>
                        </div>
                    </div>

                    <div className="stacsBox">
                        <div className="stacsBoxIcon">
                        <i className="fa-solid fa-square-check"></i>
                        </div>
                        <div className="stacsBoxTitle">
                            <h5>Hechos hasta la fecha</h5>
                        </div>
                        <div className="stacsBoxTitle">
                            <p>El total de hábitos en tu historial (hasta hoy), marcados como completados, es de {toTodayDone}. </p>
                        </div>
                    </div>

                    <div className="stacsBox">
                        <div className="stacsBoxIcon">
                        <i className="fa-solid fa-spinner"></i>
                        </div>
                        <div className="stacsBoxTitle">
                            <h5>Pendientes hasta la fecha</h5>
                        </div>
                        <div className="stacsBoxTitle">
                            <p>Hasta hoy, el total de hábitos en tu historial, no completados, es de {toTodayPen}. </p>
                        </div>
                    </div>

                    <div className="stacsBox">
                        <div className="stacsBoxIcon">
                        <i className="fa-regular fa-clock"></i>
                        </div>
                        <div className="stacsBoxTitle">
                            <h5>A futuro</h5>
                        </div>
                        <div className="stacsBoxTitle">
                            <p>El total de hábitos programados para las próximas fechas es de {toFuture}. </p>
                        </div>
                    </div>

                    <div className="stacsBox">
                        <div className="stacsBoxIcon">
                        <i className="fa-solid fa-calendar-day"></i>
                        </div>
                        <div className="stacsBoxTitle">
                            <h5>Para hoy</h5>
                        </div>
                        <div className="stacsBoxTitle">
                        {penToday == 0 ? 
                        <p>No tienes tareas pendientes para hoy.</p> 
                        : 
                        <p>Tienes {penToday} {penToday == 1 ? "tarea programada para hoy." 
                        : 
                        "tareas programadas para hoy."}</p>}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};