import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/diarios.css";
import "../../styles/listas.css";
import listImg from "../../img/list.png";
import { Journal } from "./../component/journal.js";

export const Listas = () => {

    const { store, actions } = useContext(Context);
    const [list, setList] = useState({
        name: ""
    });

    useEffect(() => {
        actions.getLists();
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
                    {/* Boton para crear lista nueva */}
                    <button type="button" className="deskMainButton" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                    Crear lista nueva
                    </button>
                </div>


                {/* Modal que se abre para crear lista nueva */}
                <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" id="journalMainModal">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-list-check"></i> Nueva lista</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="journalModalBox">
                                    <label for="fullName" class="form-label">Nombre</label>
                                    <input className="enterForm"
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        placeholder="Nombre de la lista"
                                        onChange={(e) => setList({ ...list, name: e.target.value })}
                                        required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={() => createList()}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>




                {/* Acá se muestra la lista completa de listas*/}
                <div className="listsContainer">
                    {filteredLists.length == 0 && <h1 className="emptyAlert">No se han encontrado listas.</h1>}
                    {filteredLists.length != 0 &&
                        filteredLists.map(item => (
                            <div className="ComponentList" key={item.id} >
                                <div className="cardListBody">
                                    <div className="cardListHeader">
                                        <h5 className="cardListHeaderTitle">To do list</h5>
                                        <h5 className="cardListHeaderTitle"><i class="fa-solid fa-circle-check"></i></h5>
                                    </div>
                                    <div className="cardListBox">
                                        <h5 className="card-title">{item.name}</h5>
                                        {/*<img src={listImg} className="CardImg" />*/}
                                    </div>
                                    <p className="addItemButton"><i class="fa-solid fa-circle-plus"></i></p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};