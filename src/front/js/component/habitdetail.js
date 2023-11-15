import React, { useContext, useState } from "react";
import "../../styles/journal.css";
import "../../styles/habitdetail.css";
import { Context } from "../store/appContext";

export const HabitDetail = ({ habitName, habitDescription, habitId, open, close, habitCompleted }) => {
    if (!open) return null;

    const { store, actions } = useContext(Context);

    /* Función para marcar hecho un hábito (action)*/
    async function handleHabitClick() {

        let done = true;
        try { await actions.markHabitCompleted(habitId, !habitCompleted) }
        catch (error) {
            done = false;
        };
        if (done) {
            alert("El hábito se ha actualizado exitosamente");
            location.reload();
        }
        else {
            alert("Ha ocurrido un error")
        }
    }

    async function deleteHabit() {
        if (confirm("¿Confirmas que quieres borrar este hábito?") == true) {
            let deleted = true;
            try { await actions.deleteHabit(habitId) }
            catch (error) {
                deleted = false;
            };
            if (deleted) {
                alert("El hábito se ha eliminado exitosamente.");
                location.reload();
            }
            else {
                alert("Ha ocurrido un error")
            }
        } else {
            alert("No se borró el hábito.")
        }
    }

    return (
        <>
            <div className="selectedJournalBackground"></div>
            <div className="selectedJournalBox">
                <div className="selectedjournalHeader">
                    <h2><i className="fa-solid fa-atom"></i> {habitName}</h2>
                    <button type="button" className="closeButtonJournal" onClick={() => { close(false) }}>X</button>
                </div>
                <div className="selectedhabitDescription">
                    <h5>Descripción:</h5>
                    <p>{habitDescription ? habitDescription : "No se ha encontrado descripción para este hábito."}</p>
                </div>

                <div className="selectedjournalBottom">
                    <button className="deleteButton me-2" onClick={() => deleteHabit(habitId)}><i className="fa-solid fa-trash-can"></i> Borrar hábito</button>
                    <button className="saveButton" onClick={() => handleHabitClick(habitId, habitCompleted)}><i className="fa-solid fa-check"></i>{habitCompleted ? " Desmarcar" : " Confirmar"}</button>
                </div>
            </div>
        </>
    );
};