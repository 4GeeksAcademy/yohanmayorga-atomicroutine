import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../styles/dashboard.css";
import "../../styles/emociones.css";
import journal1 from "../../img/journal.png";

export const Emociones = () => {

    /* Declaración de variables varias */
    const [date, setDate] = useState(new Date());
    const { store, actions } = useContext(Context);
    const [options, setOptions] = useState(["Trabajo", "Familia", "Pareja", "Salud", "Dinero", "Amistades", "Estudios"]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [emotionItem, setEmotionItem] = useState({
        name: "feliz",
        description: "",
        date: "",
    });

    /* Filtro que se aplica para mostrar el registro de emociones que corresponden al usuario*/
    const filteredEmotions = store.emotions.filter((emotion) => emotion.author.id === store.profile.id);
    const filteredHappy = store.emotions.filter((emotion) => emotion.author.id === store.profile.id && emotion.name == "feliz");
    const filteredSad = store.emotions.filter((emotion) => emotion.author.id === store.profile.id && emotion.name == "triste");
    const filteredUn = store.emotions.filter((emotion) => emotion.author.id === store.profile.id && emotion.name == "indiferente");
    const filteredAngry = store.emotions.filter((emotion) => emotion.author.id === store.profile.id && emotion.name == "enojado");
    const filteredAnx = store.emotions.filter((emotion) => emotion.author.id === store.profile.id && emotion.name == "ansiedad");
    const filteredNerv = store.emotions.filter((emotion) => emotion.author.id === store.profile.id && emotion.name == "nervioso");

    const countValues = (recieved) => {
        let totalValues = 0;
        for (const item of recieved) {
            const values = item.description.split(",");
            totalValues += values.length;
        }
        return totalValues;
    };

    const handleChange = (e) => {
        const selectedOption = e.target.value;
        // Agrega la opción elegida a la lista
        if (selectedOptions.indexOf(selectedOption) === -1) {
            // Actualiza las opciones
            setSelectedOptions([...selectedOptions, selectedOption]);
            // Actualiza emotionItem.description al unirla con el valor existente
            setEmotionItem((prevEmotionItem) => ({
                ...prevEmotionItem,
                description: [...prevEmotionItem.description, selectedOption],
            }));
        } else {
            // Actualiza selectedOptions
            setSelectedOptions(selectedOptions.filter((option) => option !== selectedOption));
            // Actualiza emotionItem.description al filtrarla
            setEmotionItem((prevEmotionItem) => ({
                ...prevEmotionItem,
                description: prevEmotionItem.description.filter((option) => option !== selectedOption),
            }));
        }
    };

    /* Se ejecuta al cargar la página */
    useEffect(() => {
        setDate(new Date)
        actions.getEmotions();

    }, [])

    /* Esta función cambia la fecha del calendario cuando se selecciona */
    const onChange = (date) => { setDate(date) }

    /* Función para la creación de un estado de ánimo nuevo (action)*/
    async function createEmotion() {
        let created = true;
        try { await actions.createEmotion(emotionItem) }
        catch (error) {
            created = false;
        };
        if (created) {
            alert("El registro se ha creado exitosamente");
            location.reload();
        }
        else {
            alert("Ha ocurrido un error")
        }
    }

    function renderParagraph(text) {
        return <p className="detailedListStacts">{text}</p>;
    }

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">
                {/* Encabezado del componente de los hábitos*/}
                <h4><i className="fa-regular fa-face-smile"></i> Ánimo</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <p>En esta sección, podrás llevar un registro de <strong>cómo te has sentido</strong> en los últimos días. Este registro te ayudará a <strong>crear tu propia estadística
                        y podrás ubicar patrones</strong> que te permitirán saber qué está afectando positiva o negativamente en la manera en la que te sientes. Esta herramienta
                        puede ser de gran ayuda para aprovechar aquello que te hace <strong>sentir mejor</strong>, y mejorar aquellos aspectos que no.</p>
                </div>

                <div className="desktopMainButton">
                    {/* Boton para registrar nuevo estado de ánimo */}
                    <button type="button" className="deskMainButton" data-bs-toggle="modal" data-bs-target="#exampleModal5">
                        Crear nuevo registro
                    </button>
                </div>

                {/* Cuerpo de la página de hábitos (todo lo que está debajo del header) */}
                <div className="habitsBoxUnderHeader">

                    {/* Lado izquiero del cuerpo de la página de hábitos */}
                    <div className="leftHabitsSide">
                        <div className="leftHabitsSideBox">
                            <div className="leftHabitsSideBoxHeader">
                                {/* Acá se muestra la lista completa de diarios*/}
                                <div className="feelingsContainer">

                                    {/* FELIZ */}
                                    <div className="ComponentEmotion">
                                        <div className="cardEmotionBody" >
                                            <h5 className="card-title">Feliz</h5>
                                            <img src={journal1} className="CardImg" />
                                            <h5>Registros: {filteredHappy.length}</h5>
                                            <div className="emotionsStacsDetails">
                                                {(filteredHappy.filter((item) => item.description.includes("Trabajo"))).length > 0 ?
                                                    renderParagraph("Trabajo: " + ((filteredHappy.filter((item) => item.description.includes("Trabajo")).length / countValues(filteredHappy)) * 100).toFixed(0) + "%") : null}
                                                {(filteredHappy.filter((item) => item.description.includes("Familia"))).length > 0 ?
                                                    renderParagraph("Familia: " + ((filteredHappy.filter((item) => item.description.includes("Familia")).length / countValues(filteredHappy)) * 100).toFixed(0) + "%") : null}
                                                {(filteredHappy.filter((item) => item.description.includes("Pareja"))).length > 0 ?
                                                    renderParagraph("Pareja: " + ((filteredHappy.filter((item) => item.description.includes("Pareja")).length / countValues(filteredHappy)) * 100).toFixed(0) + "%") : null}
                                                {(filteredHappy.filter((item) => item.description.includes("Salud"))).length > 0 ?
                                                    renderParagraph("Salud: " + ((filteredHappy.filter((item) => item.description.includes("Salud")).length / countValues(filteredHappy)) * 100).toFixed(0) + "%") : null}
                                                {(filteredHappy.filter((item) => item.description.includes("Dinero"))).length > 0 ?
                                                    renderParagraph("Dinero: " + ((filteredHappy.filter((item) => item.description.includes("Dinero")).length / countValues(filteredHappy)) * 100).toFixed(0) + "%") : null}
                                                {(filteredHappy.filter((item) => item.description.includes("Amistades"))).length > 0 ?
                                                    renderParagraph("Amistades: " + ((filteredHappy.filter((item) => item.description.includes("Amistades")).length / countValues(filteredHappy)) * 100).toFixed(0) + "%") : null}
                                                {(filteredHappy.filter((item) => item.description.includes("Estudios"))).length > 0 ?
                                                    renderParagraph("Estudios: " + ((filteredHappy.filter((item) => item.description.includes("Estudios")).length / countValues(filteredHappy)) * 100).toFixed(0) + "%") : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* TRISTE */}
                                    <div className="ComponentEmotion">
                                        <div className="cardEmotionBody" >
                                            <h5 className="card-title">Triste</h5>
                                            <img src={journal1} className="CardImg" />
                                            <h5>Registros: {filteredSad.length}</h5>
                                            <div className="emotionsStacsDetails">
                                                {(filteredSad.filter((item) => item.description.includes("Trabajo"))).length > 0 ?
                                                    renderParagraph("Trabajo: " + ((filteredSad.filter((item) => item.description.includes("Trabajo")).length / countValues(filteredSad)) * 100).toFixed(0) + "%") : null}
                                                {(filteredSad.filter((item) => item.description.includes("Familia"))).length > 0 ?
                                                    renderParagraph("Familia: " + ((filteredSad.filter((item) => item.description.includes("Familia")).length / countValues(filteredSad)) * 100).toFixed(0) + "%") : null}
                                                {(filteredSad.filter((item) => item.description.includes("Pareja"))).length > 0 ?
                                                    renderParagraph("Pareja: " + ((filteredSad.filter((item) => item.description.includes("Pareja")).length / countValues(filteredSad)) * 100).toFixed(0) + "%") : null}
                                                {(filteredSad.filter((item) => item.description.includes("Salud"))).length > 0 ?
                                                    renderParagraph("Salud: " + ((filteredSad.filter((item) => item.description.includes("Salud")).length / countValues(filteredSad)) * 100).toFixed(0) + "%") : null}
                                                {(filteredSad.filter((item) => item.description.includes("Dinero"))).length > 0 ?
                                                    renderParagraph("Dinero: " + ((filteredSad.filter((item) => item.description.includes("Dinero")).length / countValues(filteredSad)) * 100).toFixed(0) + "%") : null}
                                                {(filteredSad.filter((item) => item.description.includes("Amistades"))).length > 0 ?
                                                    renderParagraph("Amistades: " + ((filteredSad.filter((item) => item.description.includes("Amistades")).length / countValues(filteredSad)) * 100).toFixed(0) + "%") : null}
                                                {(filteredSad.filter((item) => item.description.includes("Estudios"))).length > 0 ?
                                                    renderParagraph("Estudios: " + ((filteredSad.filter((item) => item.description.includes("Estudios")).length / countValues(filteredSad)) * 100).toFixed(0) + "%") : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Indiferente */}
                                    <div className="ComponentEmotion">
                                        <div className="cardEmotionBody" >
                                            <h5 className="card-title">Indiferente</h5>
                                            <img src={journal1} className="CardImg" />
                                            <h5>Registros: {filteredUn.length}</h5>
                                            <div className="emotionsStacsDetails">
                                                {(filteredUn.filter((item) => item.description.includes("Trabajo"))).length > 0 ?
                                                    renderParagraph("Trabajo: " + ((filteredUn.filter((item) => item.description.includes("Trabajo")).length / countValues(filteredUn)) * 100).toFixed(0) + "%") : null}
                                                {(filteredUn.filter((item) => item.description.includes("Familia"))).length > 0 ?
                                                    renderParagraph("Familia: " + ((filteredUn.filter((item) => item.description.includes("Familia")).length / countValues(filteredUn)) * 100).toFixed(0) + "%") : null}
                                                {(filteredUn.filter((item) => item.description.includes("Pareja"))).length > 0 ?
                                                    renderParagraph("Pareja: " + ((filteredUn.filter((item) => item.description.includes("Pareja")).length / countValues(filteredUn)) * 100).toFixed(0) + "%") : null}
                                                {(filteredUn.filter((item) => item.description.includes("Salud"))).length > 0 ?
                                                    renderParagraph("Salud: " + ((filteredUn.filter((item) => item.description.includes("Salud")).length / countValues(filteredUn)) * 100).toFixed(0) + "%") : null}
                                                {(filteredUn.filter((item) => item.description.includes("Dinero"))).length > 0 ?
                                                    renderParagraph("Dinero: " + ((filteredUn.filter((item) => item.description.includes("Dinero")).length / countValues(filteredUn)) * 100).toFixed(0) + "%") : null}
                                                {(filteredUn.filter((item) => item.description.includes("Amistades"))).length > 0 ?
                                                    renderParagraph("Amistades: " + ((filteredUn.filter((item) => item.description.includes("Amistades")).length / countValues(filteredUn)) * 100).toFixed(0) + "%") : null}
                                                {(filteredUn.filter((item) => item.description.includes("Estudios"))).length > 0 ?
                                                    renderParagraph("Estudios: " + ((filteredUn.filter((item) => item.description.includes("Estudios")).length / countValues(filteredUn)) * 100).toFixed(0) + "%") : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enojado */}
                                    <div className="ComponentEmotion">
                                        <div className="cardEmotionBody" >
                                            <h5 className="card-title">Enojado</h5>
                                            <img src={journal1} className="CardImg" />
                                            <h5>Registros: {filteredAngry.length}</h5>
                                            <div className="emotionsStacsDetails">
                                                {(filteredAngry.filter((item) => item.description.includes("Trabajo"))).length > 0 ?
                                                    renderParagraph("Trabajo: " + ((filteredAngry.filter((item) => item.description.includes("Trabajo")).length / countValues(filteredAngry)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAngry.filter((item) => item.description.includes("Familia"))).length > 0 ?
                                                    renderParagraph("Familia: " + ((filteredAngry.filter((item) => item.description.includes("Familia")).length / countValues(filteredAngry)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAngry.filter((item) => item.description.includes("Pareja"))).length > 0 ?
                                                    renderParagraph("Pareja: " + ((filteredAngry.filter((item) => item.description.includes("Pareja")).length / countValues(filteredAngry)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAngry.filter((item) => item.description.includes("Salud"))).length > 0 ?
                                                    renderParagraph("Salud: " + ((filteredAngry.filter((item) => item.description.includes("Salud")).length / countValues(filteredAngry)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAngry.filter((item) => item.description.includes("Dinero"))).length > 0 ?
                                                    renderParagraph("Dinero: " + ((filteredAngry.filter((item) => item.description.includes("Dinero")).length / countValues(filteredAngry)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAngry.filter((item) => item.description.includes("Amistades"))).length > 0 ?
                                                    renderParagraph("Amistades: " + ((filteredAngry.filter((item) => item.description.includes("Amistades")).length / countValues(filteredAngry)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAngry.filter((item) => item.description.includes("Estudios"))).length > 0 ?
                                                    renderParagraph("Estudios: " + ((filteredAngry.filter((item) => item.description.includes("Estudios")).length / countValues(filteredAngry)) * 100).toFixed(0) + "%") : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ansiedad */}
                                    <div className="ComponentEmotion">
                                        <div className="cardEmotionBody" >
                                            <h5 className="card-title">Ansiedad</h5>
                                            <img src={journal1} className="CardImg" />
                                            <h5>Registros: {filteredAnx.length}</h5>
                                            <div className="emotionsStacsDetails">
                                                {(filteredAnx.filter((item) => item.description.includes("Trabajo"))).length > 0 ?
                                                    renderParagraph("Trabajo: " + ((filteredAnx.filter((item) => item.description.includes("Trabajo")).length / countValues(filteredAnx)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAnx.filter((item) => item.description.includes("Familia"))).length > 0 ?
                                                    renderParagraph("Familia: " + ((filteredAnx.filter((item) => item.description.includes("Familia")).length / countValues(filteredAnx)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAnx.filter((item) => item.description.includes("Pareja"))).length > 0 ?
                                                    renderParagraph("Pareja: " + ((filteredAnx.filter((item) => item.description.includes("Pareja")).length / countValues(filteredAnx)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAnx.filter((item) => item.description.includes("Salud"))).length > 0 ?
                                                    renderParagraph("Salud: " + ((filteredAnx.filter((item) => item.description.includes("Salud")).length / countValues(filteredAnx)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAnx.filter((item) => item.description.includes("Dinero"))).length > 0 ?
                                                    renderParagraph("Dinero: " + ((filteredAnx.filter((item) => item.description.includes("Dinero")).length / countValues(filteredAnx)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAnx.filter((item) => item.description.includes("Amistades"))).length > 0 ?
                                                    renderParagraph("Amistades: " + ((filteredAnx.filter((item) => item.description.includes("Amistades")).length / countValues(filteredAnx)) * 100).toFixed(0) + "%") : null}
                                                {(filteredAnx.filter((item) => item.description.includes("Estudios"))).length > 0 ?
                                                    renderParagraph("Estudios: " + ((filteredAnx.filter((item) => item.description.includes("Estudios")).length / countValues(filteredAnx)) * 100).toFixed(0) + "%") : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nervioso */}
                                    <div className="ComponentEmotion">
                                        <div className="cardEmotionBody" >
                                            <h5 className="card-title">Nervioso</h5>
                                            <img src={journal1} className="CardImg" />
                                            <h5>Registros: {filteredNerv.length}</h5>
                                            <div className="emotionsStacsDetails">
                                                {(filteredNerv.filter((item) => item.description.includes("Trabajo"))).length > 0 ?
                                                    renderParagraph("Trabajo: " + ((filteredNerv.filter((item) => item.description.includes("Trabajo")).length / countValues(filteredNerv)) * 100).toFixed(0) + "%") : null}
                                                {(filteredNerv.filter((item) => item.description.includes("Familia"))).length > 0 ?
                                                    renderParagraph("Familia: " + ((filteredNerv.filter((item) => item.description.includes("Familia")).length / countValues(filteredNerv)) * 100).toFixed(0) + "%") : null}
                                                {(filteredNerv.filter((item) => item.description.includes("Pareja"))).length > 0 ?
                                                    renderParagraph("Pareja: " + ((filteredNerv.filter((item) => item.description.includes("Pareja")).length / countValues(filteredNerv)) * 100).toFixed(0) + "%") : null}
                                                {(filteredNerv.filter((item) => item.description.includes("Salud"))).length > 0 ?
                                                    renderParagraph("Salud: " + ((filteredNerv.filter((item) => item.description.includes("Salud")).length / countValues(filteredNerv)) * 100).toFixed(0) + "%") : null}
                                                {(filteredNerv.filter((item) => item.description.includes("Dinero"))).length > 0 ?
                                                    renderParagraph("Dinero: " + ((filteredNerv.filter((item) => item.description.includes("Dinero")).length / countValues(filteredNerv)) * 100).toFixed(0) + "%") : null}
                                                {(filteredNerv.filter((item) => item.description.includes("Amistades"))).length > 0 ?
                                                    renderParagraph("Amistades: " + ((filteredNerv.filter((item) => item.description.includes("Amistades")).length / countValues(filteredNerv)) * 100).toFixed(0) + "%") : null}
                                                {(filteredNerv.filter((item) => item.description.includes("Estudios"))).length > 0 ?
                                                    renderParagraph("Estudios: " + ((filteredNerv.filter((item) => item.description.includes("Estudios")).length / countValues(filteredNerv)) * 100).toFixed(0) + "%") : null}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lado derecho del cuerpo de la página de hábitos */}
                    <div className="rightHabitsSide">
                        <h1>Estado de ánimo</h1>
                        {/* Calendario de react */}
                        <div>
                            <Calendar onChange={onChange} value={date} />
                        </div>
                        <div className="rightSideDateBox">
                            <p className="rightSideDate">{date.toLocaleDateString()} </p>
                        </div>
                    </div>
                </div>

                {/* Modal que se abre para crear nuevo registro */}
                <div className="modal fade" id="exampleModal5" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" id="journalMainModal">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="fa-regular fa-face-smile"></i> Nuevo registro de estado de ánimo</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="journalModalBox">
                                    {/*Estado de ánimo*/}
                                    <label htmlFor="fullName4" className="form-label">¿Cómo te sientes?</label>
                                    <select name="fullName4" id="fullName4" onChange={(e) => setEmotionItem({ ...emotionItem, name: e.target.options[e.target.selectedIndex].value })} required>
                                        <option value="feliz">Feliz</option>
                                        <option value="indiferente">Indiferente</option>
                                        <option value="triste">Triste</option>
                                        <option value="enojado">Enojado</option>
                                        <option value="ansiedad">Con ansiedad</option>
                                        <option value="nervioso">Nervioso</option>
                                    </select>

                                    {/*Descripción del ánimo*/}
                                    <label htmlFor="description" className="form-label">¿Qué ha influido en tu estado de ánimo este día? <br /> <strong>Nota:</strong> puedes
                                        seleccionar más de una opción.</label>
                                    <select multiple onChange={handleChange} >
                                        {options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <p>Opciones seleccionadas: {selectedOptions.length == 0 ? "ninguna, debes seleccionar al menos una." : selectedOptions.join(", ")}</p>

                                    {/*Fecha del registro*/}
                                    <label htmlFor="date" className="form-label">Fecha del registro</label>
                                    <input className="enterForm" type="date" name="date" id="date" pattern="\d{4}-\d{2}-\d{2}" onChange={(e) => setEmotionItem({ ...emotionItem, date: e.target.value })} required />

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={() => createEmotion()}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
};