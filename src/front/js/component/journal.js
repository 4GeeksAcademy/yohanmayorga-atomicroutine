import React, { useContext, useState } from "react";
import "../../styles/journal.css";
import { Context } from "../store/appContext";


export const Journal = ({ nameJournal, idJournal, open, close, textJournal }) => {
    if (!open) return null;

    const { store, actions } = useContext(Context);

    const [nowText, setNowText] = useState(textJournal);

    /* Función para la creación de un diario nuevo (action)*/
    async function updateJournal() {
        let updated = true;
        try { await actions.updateJournal(idJournal, nowText) }
        catch (error) {
            updated = false;
        };
        if (updated) {
            alert("El diario se ha actualizado exitosamente");
            location.reload();
        }
        else {
            alert("Ha ocurrido un error")
        }
    }

    async function deleteJournal() {
        if (confirm("¿Confirmas que quieres borrar este diario?") == true) {
            let deleted = true;
            try { await actions.deleteJournal(idJournal) }
            catch (error) {
                deleted = false;
            };
            if (deleted) {
                alert("El diario se ha eliminado exitosamente.");
                location.reload();
            }
            else {
                alert("Ha ocurrido un error")
            }
        }
        else {
            alert("No se borró el diario.")
        }
    }

    return (
        <>
            <div className="selectedJournalBackground"></div>
            <div className="selectedJournalBox">
                <div className="selectedjournalHeader">
                    <h4><i className="fa-solid fa-book"></i> {nameJournal}</h4>
                    <button type="button" className="closeButtonJournal" onClick={() => { close(false) }}>X</button>
                </div>
                <textarea
                    type="text"
                    className="journalInput"
                    placeholder={textJournal != null ? "" : "Comience a escribir aquí."}
                    onChange={(e) => setNowText(e.target.value)}
                    value={nowText} />
                <div className="selectedjournalBottom">
                    <button className="deleteButton me-2" onClick={() => deleteJournal(idJournal)}><i className="fa-solid fa-trash-can"></i> Borrar</button>
                    <button className="saveButton" onClick={() => updateJournal(idJournal, nowText)}><i className="fa-regular fa-floppy-disk"></i> Guardar</button>
                </div>
            </div>
        </>
    );
};