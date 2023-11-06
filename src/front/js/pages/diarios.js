import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/diarios.css";
import books from "../../img/books.png";
import { Journal } from "./../component/journal.js";

export const Diarios = () => {

    const { store, actions } = useContext(Context);
    const [journal, setJournal] = useState({
        name: "",
        color: "",
    });
    const [showJournal, setShowJournal] = useState(false);
    const [itemJournal, setItemJournal] = useState("");

    /* Esta función muestra u oculta un diario específico seleccionado*/
    const handleClick = (item) => {
        { showJournal ? setShowJournal(false) : setShowJournal(true) };
        setItemJournal(item);
    };

    useEffect(() => {
        actions.getJournals();
    }, [])

    /* Función para la creación de un diario nuevo (action)*/
    async function createJournal() {
        let created = true;
        try { await actions.createJournal(journal) }
        catch (error) {
            created = false;
        };
        if (created) {
            alert("El diario se ha creado exitosamente");
            location.reload();
        }
        else {
            alert("Ha ocurrido un error")
        }
    }

    /* Filtro que se aplica para mostrar sólo los diarios que corresponden al usuario*/
    const filteredJournals = store.journals.filter((journal) => journal.author.id === store.profile.id);

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">

                {/* Encabezado del componente de los diarios */}
                <h4><i class="fa-solid fa-book"/> Diarios</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <p>Aquí podrás crear y consultar diarios personales. Crea un nuevo diario, asignale un nombre, personalízalo con un color y ¡listo! Podrás verlo en esta pantalla. Seleccionalo y comienza a escribir. ¡Puedes crear tantos diarios como desees, y cada uno será un espacio único para ti! Los diarios personales son una forma perfecta para registrar tus pensamientos, sentimientos y experiencias.</p>
                    <p>{filteredJournals.length == 0 ? <p>Actualmente no tienes ningún diario.</p> : <p>Actualmente tienes {filteredJournals.length} {filteredJournals.length == 1 ? "diario creado." : "diarios creados."}</p>}</p>
                </div>
                <div className="desktopMainButton">
                    {/* Boton para crear diario nuevo */}
                    <button type="button" className="deskMainButton" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Crear diario nuevo
                    </button>
                </div>



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

                {/* Acá se muestra el diario específico que el usuario abra*/}
                {<Journal
                    idJournal={itemJournal.id}
                    nameJournal={itemJournal.name}
                    textJournal={itemJournal.text}
                    open={showJournal}
                    close={setShowJournal} />}

                {/* Acá se muestra la lista completa de diarios*/}
                <div className="journalsContainer">
                    {filteredJournals.length == 0 && <h1 className="emptyAlert">No se han encontrado diarios.</h1>}
                    {filteredJournals.length != 0 &&
                        filteredJournals.map(item => (
                            <div className="ComponentCard" key={item.id} >
                                <div className="cardBody" style={{ background: `linear-gradient(to bottom, ${item.color} 0,1%, white)` }} onClick={() => { handleClick(item) }} >
                                    <h5 className="card-title">{item.name}</h5>
                                    <img src={books} className="CardImg" />
                                    <div className="journalTextPreview">
                                            <p className="journalTextPreview">{item.text != null ? item.text.substr(0, 20) + "\n" + " ...leer más." : "Selecciona para comenzar a escribir."}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};