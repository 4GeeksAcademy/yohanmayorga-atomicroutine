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

    /* Filtro que se aplica para mostrar sólo las listas que corresponden al usuario*/
    const filteredLists = store.lists.filter((list) => list.author.id === store.profile.id);

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">

                {/* Encabezado del componente de las listas */}
                <h4><i class="fa-solid fa-list-check"></i> Listas</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <p>Aquí podrás crear y consultar listas de pendientes. Crea una nueva lista, asignale un título, agrega tareas y ¡listo! Podrás verla en esta pantalla. Seleccionala y comienza a trabajar en ella. ¡Puedes crear tantas listas como desees! Las listas de pendientes son una forma perfecta para organizar tus tareas y mantenerte al día con tus objetivos.</p>
                    <p>{filteredLists.length == 0 ? <p>Actualmente no tienes ninguna lista creada.</p> : <p>Actualmente tienes {filteredLists.length} {filteredLists.length == 1 ? "lista creada." : "listas creadas."}</p>}</p>
                </div>


                <div className="desktopMainButton">
                    {/* Boton para crear lista nuevo */}
                    <button type="button" className="deskMainButton" onClick={() => createList()}>
                        Crear lista
                    </button>
                </div>

                <label for="fullName" class="form-label">Nombre</label>
                <input className="enterForm"
                    type="text"
                    onChange={(e) => setList({ ...list, name: e.target.value })}
                    required />
            </div>
        </div>
    )
};