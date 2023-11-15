import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../styles/dashboard.css";

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
                                    <select name="fullName4" onChange={(e) => setEmotionItem({ ...emotionItem, name: e.target.options[e.target.selectedIndex].value })} required>
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