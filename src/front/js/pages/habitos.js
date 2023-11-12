import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/habitos.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import How1 from "../../img/How1.jpg";

export const Habitos = () => {

    const [date, setDate] = useState(new Date())
    const { store, actions } = useContext(Context);
    const [habitItem, setHabitItem] = useState({
        name: "",
        description: "",
        date: "",
        completed: false
    });
    const [habitSet, setHabitSet] = useState("")

    const onChange = (date) => {
        setDate(date)
    }

    useEffect(() => {
        setDate(new Date)
        actions.getHabits();
    }, [])


    function updateDate(habitItem) {
        const date = new Date(habitItem.date);
        date.setDate(date.getDate() + 1);
        habitItem.date = date.toISOString();
        return habitItem;
    }

    /* Función para la creación de un hábito nuevo (action)*/
    async function createHabit(habitSet) {
        let created = true;

        for (let i = 0; i < habitSet; i++) {
            if (i === 0) {
                await actions.createHabit(habitItem);
            } else {
                await actions.createHabit(updateDate(habitItem));
            }
        }

        if (created) {
            alert("El hábito se ha creado exitosamente");
            location.reload();
        } else {
            alert("Ha ocurrido un error");
        }
    }

    /* Función para marcar hecho un hábito (action)*/
    async function handleHabitClick(habitId, completed) {

        let done = true;
        try { await actions.markHabitCompleted(habitId, !completed) }
        catch (error) {
            done = false;
        };
        if (done) {
            alert("El hábito se ha actualizado exitosamente");
            location.reload();
        }
        else {
            alert("Ha ocurrido un error")
        }
    }

    /* Filtro que se aplica para mostrar sólo los hábitos que corresponden al usuario*/
    const filteredHabits = store.habits.filter((habit) => habit.author.id === store.profile.id);
    const filteredCompletedHabits = store.habits.filter((habit) => habit.author.id === store.profile.id && habit.completed === true && new Date(habit.date).toLocaleDateString('es-VE', {timeZone: "UTC"}) <= new Date().toLocaleDateString());
    const filteredToDateHabits = store.habits.filter((habit) => habit.author.id === store.profile.id && new Date(habit.date).toLocaleDateString('es-VE', {timeZone: "UTC"}) <= new Date().toLocaleDateString());
    const totalPercentage = ((filteredCompletedHabits.length / (filteredToDateHabits.length)) * 100).toFixed(0)
    const habitsToday = store.habits.filter((habit) => habit.author.id === store.profile.id && new Date(habit.date).toLocaleDateString('es-VE', {timeZone: "UTC"}) === new Date().toLocaleDateString() && habit.completed === false)

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">
                {/* Encabezado del componente de los hábitos*/}
                <h4><i className="fa-solid fa-chart-column"></i> Hábitos</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <p>En esta sección, podrás crear y hacer seguimiento a tus hábitos. Para crear un nuevo hábito, haz clic en el botón "crear hábito nuevo". A continuación, ingresa un nombre para tu hábito, una descripción opcional y la frecuencia con la que deseas realizarlo.</p>
                    {!isNaN(totalPercentage) ? <p>Hasta la fecha, tu porcentaje de eficiencia es del {totalPercentage}%.</p> : <p>No hay estadísticas disponibles.</p>}
                    {habitsToday.length == 0 ? <p>No tienes tareas pendientes para hoy.</p> : <p>Tienes {habitsToday.length} {habitsToday.length == 1 ? "tarea pendiente para hoy." : "tareas pendientes para hoy."}</p>}
                </div>

                <div className="habitsBoxUnderHeader">


                    <div className="leftHabitsSide">
                        <div className="desktopMainButton">
                        </div>
                        <div className="leftHabitsSideBox">
                            <div className="leftHabitsSideBoxHeader">
                                <div className="HeaderStatistics">
                                    <h5>Resumen de progreso</h5>
                                    {!isNaN(totalPercentage) ? <h1 className="habitsPercentage">{totalPercentage}%</h1> : <h5>No hay datos</h5>}
                                    {!isNaN(totalPercentage) ? <p className="habitsSummary">{store.profile ? store.profile.name : "Hola"}, hasta la fecha, tu porcentaje de eficiencia con respecto al cumplimiento de tus hábitos es del {totalPercentage}%. Este cálculo se realiza tomando en cuenta todos los hábitos programados hasta la fecha actual y aquellos ya marcados como hechos. </p> : <p className="habitsSummary">No se han encontrado resultados de progreso de cumplimiento de hábitos. Esto puede deberse a que todavía no has creado un hábito nuevo para hacerle seguimiento, que no has marcado ninguno como hecho, o de un error en el cálculo.</p>}
                                </div>

                                <div className="HeaderButtons">
                                    <div className="cardHabitButton" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal4">
                                        <div className="cardHabitButtonHeader">
                                            <p className="cardHabitButtonIcon"><i className="fa-solid fa-feather"></i></p>
                                        </div>
                                        <h5>Agregar nuevo hábito</h5>
                                        <p className="cardHabitButtonBottom">Haz click para agregar un hábito nuevo.</p>
                                    </div>
                                    <div className="cardHabitButton">
                                        <div className="cardHabitButtonHeader">
                                            <p className="cardHabitButtonIcon"><i className="fa-solid fa-clipboard-question"></i></p>
                                        </div>
                                        <h5>Preguntas frecuentes</h5>
                                        <p className="cardHabitButtonBottom">Haz click para revisar las F.A.Q. de los hábitos.</p>
                                    </div>
                                    <div className="cardHabitButton">
                                        <div className="cardHabitButtonHeader">
                                            <p className="cardHabitButtonIcon"><i className="fa-solid fa-bars-progress"></i></p>
                                        </div>
                                        <h5>Estadísticas</h5>
                                        <p className="cardHabitButtonBottom">Haz click para ver el resumen de tus estadísticas.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="rightHabitsSide">
                        <h1>Hábitos</h1>
                        <div>
                            <Calendar onChange={onChange} value={date} />
                        </div>
                        <div className="rightSideDateBox">
                            <p className="rightSideDate">{date.toLocaleDateString()} </p>
                        </div>

                        <div className="habitsContainer">
                            <div>


                                {filteredHabits.filter((habit) => {
                                    return new Date(habit.date).toLocaleDateString('es-VE', {timeZone: "UTC"}) == date.toLocaleDateString()
                                })?.length > 0 ? <h5 className="habitListTitle">Tareas programadas</h5> : <h5 className="emptyHabitAlert">No hay nada programado para hoy</h5>}
                            </div>


                            {filteredHabits.filter((habit) => {
                                return new Date(habit.date).toLocaleDateString('es-VE', {timeZone: "UTC"}) == date.toLocaleDateString();
                            }).map((habit) => (<>
                                <div className="habitList" key={habit.id} >
                                    <p className="habitListText">{habit.name}</p>
                                    <p className="habitListText">{new Date(habit.date).toLocaleDateString('es-VE', {timeZone: "UTC"})}</p>
                                    <div className="custom-radio">
                                        <input
                                            type="checkbox"
                                            name="task"
                                            value={habit.id}
                                            checked={habit.completed}
                                            onChange={() => handleHabitClick(habit.id, habit.completed)}
                                        />
                                    </div>
                                </div>
                            </>
                            ))}
                        </div>
                    </div>





                    {/* Modal que se abre para crear hábito nuevo */}
                    <div className="modal fade" id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content" id="journalMainModal">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="fa-solid fa-chart-column"></i> Nuevo hábito</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <div className="journalModalBox">
                                        {/*Nombre del hábito*/}
                                        <label htmlFor="fullName2" className="form-label">Hábito</label>
                                        <input className="enterForm"
                                            type="text"
                                            name="fullName2"
                                            id="fullName2"
                                            placeholder="Hábito a crear"
                                            onChange={(e) => setHabitItem({ ...habitItem, name: e.target.value })}
                                            required />

                                        {/*Descripción del hábito*/}
                                        <label htmlFor="description" className="form-label">Descripción</label>
                                        <input className="enterForm"
                                            type="text"
                                            name="description"
                                            id="description"
                                            placeholder="(Opcional)"
                                            onChange={(e) => setHabitItem({ ...habitItem, description: e.target.value })} />

                                        {/*Fecha de inicio*/}
                                        <label htmlFor="date" className="form-label">Fecha de inicio</label>
                                        <input className="enterForm" type="date" name="date" id="date" pattern="\d{4}-\d{2}-\d{2}" onChange={(e) => setHabitItem({ ...habitItem, date: e.target.value })} required />

                                        {/*Cantidad de veces*/}
                                        <label htmlFor="quantity">Repeticiones (máximo 30)</label>
                                        <input className="enterForm" type="number" id="quantity" name="quantity" min="1" max="30" onChange={(e) => setHabitSet(e.target.value)}></input>

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" className="btn btn-primary" onClick={() => createHabit(habitSet)}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};