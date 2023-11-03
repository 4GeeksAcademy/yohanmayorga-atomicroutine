import React, {useContext} from "react";
import "../../styles/journal.css";
import { Context } from "../store/appContext";


export const Journal = ({nameJournal, openJournal, open, close}) => {
    if (!open) return null;

    const { store, actions } = useContext(Context);

    return (
        <>
        <div className="selectedJournalBackground"></div>
        <div className="selectedJournalBox">
            <div className="selectedjournalHeader">
                <h4>Diario: {nameJournal}</h4>
                <button type="button" className="closeButtonJournal" onClick={() => { close(false) }}>X</button>
                
            </div>
            <input type="text" className="journalInput"/>
        </div>
        </>
    );
};