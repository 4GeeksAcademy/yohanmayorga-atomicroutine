import React, { useContext, useState } from "react";
import "../../styles/journal.css";
import "../../styles/newtodo.css";
import { Context } from "../store/appContext";

export const NewTodo = ({ list_id, open, close }) => {
    if (!open) return null;

    const { store, actions } = useContext(Context);
    const [todo, setTodo] = useState("")

    /* Función para la creación de una tarea nueva (action)*/
    async function addTodo() {
        let created = true;
        try { await actions.addTodo(todo, list_id) }
        catch (error) {
            created = false;
        };
        if (created) {
            alert("La tarea se ha añadido exitosamente");
            location.reload();
        }
        else {
            alert("Ha ocurrido un error")
        }
    }

    return (
        <>
            {/* Modal que se abre para crear tarea nueva */}
            <div className="selectedAddedBackground"></div>
            <div className="selectedAddedBox">
                <div className="modal-header">
                    <h1 className="modal-title fs-5"><i class="fa-solid fa-list-check"></i> Nueva tarea</h1>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => { close(false) }}></button>
                </div>
                <div className="journalModalBox">
                    <input className="enterForm"
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Tarea a agregar"
                        onChange={(e) => setTodo(e.target.value)}
                        required />
                </div>
                <div className="selectedjournalBottom">
                    <button type="button" className="deleteButton me-2" onClick={() => { close(false) }}>Cancelar</button>
                    <button type="button" className="saveButton" onClick={() => addTodo(todo, list_id)}>Agregar</button>
                </div>
            </div>
        </>
    );
};