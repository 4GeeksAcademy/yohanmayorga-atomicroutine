import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/diarios.css";
import books from "../../img/books.png";

export const Diarios = () => {

    const { store, actions } = useContext(Context);
    const [journal, setJournal] = useState({
        name: "",
        color: "",
    });

    useEffect(() => {
        actions.getJournals();
    }, [])

    async function createJournal() {
        let created = true;
        try {await actions.createJournal(journal)}
        catch (error) {
            created = false;
        };
        if (created) {
            alert("El diario se ha creado exitosamente");
            location.reload(); }
        else {
            alert("Ha ocurrido un error")
        }
    }

    const filteredJournals = store.journals.filter((journal) => journal.author.id === store.profile.id);

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">

                {/* Encabezado del componente de los diarios */}
                <h4>Diarios</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <h5>¿Qué deseas hacer hoy?</h5>
                </div>

                {/* Boton para crear diario nuevo */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Crear diario nuevo
                </button>

                {/* Modal que se abre para crear diario nuevo */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" id="journalMainModal">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-book"></i> Nuevo diario</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="journalModalBox">
                                    <label for="fullName" class="form-label">Nombre</label>
                                    <input className="enterForm"
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        placeholder="Nombre del diario"
                                        onChange={(e) => setJournal({ ...journal, name: e.target.value })}
                                        required />
                                    <label for="colorpicker" class="form-label">Color principal</label>
                                    <input type="color" id="colorpicker" onChange={(e) => setJournal({ ...journal, color: e.target.value })} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={() => createJournal()}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acá se muestran todos los diarios del usuario */}
                <div className="journalsContainer">
                    {filteredJournals.length == 0 && <span>No se han encontrado diarios</span>}
                    {filteredJournals.length != 0 &&
                        filteredJournals.map(item => (
                            <div className="ComponentCard" key={item.id}>
                                <div className="cardBody" style={{ background: `linear-gradient(to bottom, ${item.color}, white)` }}>
                                <img src={books} className="CardImg" />
                                    <h5 className="card-title">{item.name}</h5>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};