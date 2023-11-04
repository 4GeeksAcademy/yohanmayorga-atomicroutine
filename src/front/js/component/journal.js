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

    return (
        <>
            <div className="selectedJournalBackground"></div>
            <div className="selectedJournalBox">
                <div className="selectedjournalHeader">
                    <h4>{nameJournal}</h4>
                    <button type="button" className="closeButtonJournal" onClick={() => { close(false) }}>X</button>
                </div>
                <textarea
                    type="text"
                    className="journalInput"
                    placeholder={textJournal != null ? "" : "Comience a escribir aquí."}
                    onChange={(e) => setNowText(e.target.value )}
                    value={nowText}/>
                <div className="selectedjournalBottom">
                    <button className="me-2"><i class="fa-solid fa-trash-can"></i> Borrar</button>
                    <button onClick={() => updateJournal(idJournal, nowText)}><i class="fa-regular fa-floppy-disk"></i> Guardar</button>
                </div>
            </div>
        </>
    );
};