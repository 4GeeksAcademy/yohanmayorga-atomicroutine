import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/diarios.css";

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
        let created = await actions.createJournal(journal)
        if (created) { alert("Journal registered successfully") }
        else {
            alert("Ha ocurrido un error")
        }
    }

    const filteredJournals = store.journals.filter((journal) => journal.author.id === store.profile.id);

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">
                <h4>Diarios</h4>

                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Crear diario nuevo
                </button>

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

                <div id="heroesContainer">
                    {filteredJournals.length == 0 && <span>No se han encontrado diarios</span>}
                    {filteredJournals.length != 0 &&
                        filteredJournals.map(item => (
                            <div className="card" key={item.id}>
                                <div className="card-body" style={{ background: item.color }}>
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