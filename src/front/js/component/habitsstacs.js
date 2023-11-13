import React, { useContext, useState } from "react";
import "../../styles/journal.css";
import "../../styles/habitdetail.css";
import { Context } from "../store/appContext";

export const HabitStacs = ({ open, close, proSummary, toToday, toTodayDone, toTodayPen, toFuture, penToday }) => {
    if (!open) return null;

    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="selectedJournalBackground"></div>
            <div className="selectedJournalBox">
                <div className="selectedjournalHeader">
                    <h2><i className="fa-solid fa-chart-pie"></i> Estadísticas</h2>
                    <button type="button" className="closeButtonJournal" onClick={() => { close(false) }}>X</button>
                </div>
                {proSummary} /
                {toToday} /
                {toTodayDone} /
                {toTodayPen} /
                {toFuture} /
                {penToday} /
                <div className="selectedhabitDescription">
                    <h5>Descripción:</h5>
                
                </div>

            </div>
        </>
    );
};