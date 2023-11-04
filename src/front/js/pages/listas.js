import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/diarios.css";
import books from "../../img/books.png";
import { Journal } from "./../component/journal.js";

export const Listas = () => {

    const { store, actions } = useContext(Context);
    const [list, setList] = useState({
        name: "",
    });

    useEffect(() => {
        actions.getJournals();
    }, [])

    /* Función para la creación de un diario nuevo (action)*/
    async function createList() {
        let created = true;
        try { await actions.createList(list) }
        catch (error) {
            created = false;
        };
        if (created) {
            alert("La lista se ha creado exitosamente");
            location.reload();
        }
        else {
            alert("Ha ocurrido un error")
        }
    }

    /* Filtro que se aplica para mostrar sólo los diarios que corresponden al usuario*/
    const filteredJournals = store.lists.filter((list) => list.author.id === store.profile.id);

    return (
        <div className="dashboard">

            <label for="fullName" class="form-label">Nombre</label>
            <input className="enterForm"
                type="text"
                onChange={(e) => setList({ ...list, name: e.target.value })}
                required />

            <div className="desktopMainButton">
                {/* Boton para crear diario nuevo */}
                <button type="button" className="deskMainButton" onClick={() => createList()}>
                    Crear diario nuevo
                </button>
            </div>
        </div>
    )
};