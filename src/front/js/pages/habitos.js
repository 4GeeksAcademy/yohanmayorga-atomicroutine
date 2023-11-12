import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/habitos.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
        console.log(date)
        onChange(date);
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
            try {
                await actions.createHabit(updateDate(habitItem));
            } catch (error) {
                created = false;
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
    const filteredCompletedHabits = store.habits.filter((habit) => habit.author.id === store.profile.id &&  habit.completed === true && habit.date?.slice(0,16) <= new Date().toUTCString()?.slice(0,16));
    const filteredToDateHabits = store.habits.filter((habit) =>  habit.author.id === store.profile.id && habit.date?.slice(0,16) < new Date().toUTCString()?.slice(0,16));
    const totalPercentage = ((filteredCompletedHabits.length / (filteredToDateHabits.length - 1) ) * 100).toFixed(0)
    const habitsToday = store.habits.filter((habit) =>  habit.author.id === store.profile.id && habit.date?.slice(0,16) === new Date().toUTCString()?.slice(0,16) && habit.completed === false)

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">

                {/* Encabezado del componente de las listas */}
                <h4><i class="fa-solid fa-chart-column"></i> Hábitos</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <p>En esta sección, podrás crear y hacer seguimiento a tus hábitos. Para crear un nuevo hábito, haz clic en el botón "crear hábito nuevo". A continuación, ingresa un nombre para tu hábito, una descripción opcional y la frecuencia con la que deseas realizarlo.</p>
                    {/*<p>{filteredLists.length == 0 ? <p>Actualmente no tienes ninguna lista creada.</p> : <p>Actualmente tienes {filteredLists.length} {filteredLists.length == 1 ? "lista creada." : "listas creadas."}</p>}</p>*/}
                    {totalPercentage !== NaN ? <p>Hasta la fecha, tu porcentaje de eficiencia es del {totalPercentage}%.</p> : <p>No hay estadísticas disponibles.</p>}
                    {habitsToday.length == 0 ? <p>No tienes tareas programadas para hoy.</p> : <p>Tienes {habitsToday.length} {habitsToday.length == 1 ? "tarea programada para hoy." : "tareas programadas para hoy."}</p>}
                </div>

                <div className="habitsBoxUnderHeader">

                    <div className="leftHabitsSide">
                        <div className="desktopMainButton">
                            {/* Boton para crear un hábito nuevo */}
                            <button type="button" className="deskMainButton" data-bs-toggle="modal" data-bs-target="#exampleModal4">
                                Crear hábito nuevo
                            </button>
                        </div>
                        <div className="leftHabitsSideBox">
                        <div className="leftHabitsSideBoxHeader">
                        <div className="HeaderStatistics">
                            <h5>Resumen de progreso</h5>
                            {totalPercentage !== NaN ? <h1 className="habitsPercentage">{totalPercentage}%</h1> : <h5>No hay datos</h5>}
                            {totalPercentage !== NaN ? <p>{store.profile ? store.profile.name:"Hola"}, hasta la fecha, tu porcentaje de eficiencia con respecto al cumplimiento de tus hábitos es del {totalPercentage}%. Este cálculo se realiza tomando en cuenta todos los hábitos programados hasta la fecha actual y aquellos ya marcados como hechos. </p> : <p>No se han encontrado resultados de progreso de cumplimiento de hábitos. Esto puede deberse a que todavía no has creado un hábito nuevo para hacerle seguimiento, o de un error en el cálculo.</p>}
                            {console.log(filteredCompletedHabits)}
                            {console.log(filteredToDateHabits)}
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
                                    return habit.date?.slice(0, 16) == date.toUTCString()?.slice(0, 16)})?.length > 0 ? <h5 className="habitListTitle">Tareas programadas</h5> : <h5 className="emptyHabitAlert">No hay nada programado para hoy</h5>}
                            </div>
                        {filteredHabits.filter((habit) => {
                            return habit.date?.slice(0,16) == date.toUTCString()?.slice(0,16); //AQUI LAS FECHAS SE COMPARAN, PERO LA LOCAL -NO LA DEL HABITO- VIENE CON HORAS DE MAS (CUANDO AQUI SON LAS 8 DE LA NOCHE, YA PARA ELLA ES MAÑANA)
                        }).map(habit => ( <>
                            <div className="habitList" key={habit.id} >
                                <p className="habitListText">{habit.name}</p>
                                <div class="custom-radio">
                                                        <input type="checkbox" name="task" value={habit.id} checked={habit.completed} onChange={() => handleHabitClick(habit.id, habit.completed)} />
                                                    </div>
                            </div>
                            {/*<div>
                                <p className="tasksListText">{habit.date.toLocaleString()}</p> FECHA DEL HABITO, ESTA NO VA A CAMBIAR PORQUE ASI SE AGREGA POR DEFECTO
                                <p className="tasksListText">{date.toString()}</p> FECHA DEL CALENDARIO, ESTA ES LA QUE TIENES QUE CAMBIAR PARA QUE SE PAREZCA A LA DEL HABITO
                            </div>*/}
                            </>
                        ))}
                        </div>
                    </div>





                    {/* Modal que se abre para crear hábito nuevo */}
                    <div className="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content" id="journalMainModal">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-chart-column"></i> Nuevo hábito</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <div className="journalModalBox">
                                        {/*Nombre del hábito*/}
                                        <label for="fullName" className="form-label">Hábito</label>
                                        <input className="enterForm"
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            placeholder="Hábito a crear"
                                            onChange={(e) => setHabitItem({ ...habitItem, name: e.target.value })}
                                            required />

                                        {/*Descripción del hábito*/}
                                        <label for="description" className="form-label">Descripción</label>
                                        <input className="enterForm"
                                            type="text"
                                            name="description"
                                            id="description"
                                            placeholder="(Opcional)"
                                            onChange={(e) => setHabitItem({ ...habitItem, description: e.target.value })} />

                                        {/*Fecha de inicio*/}
                                        <label for="date" className="form-label">Fecha de inicio</label>
                                        <input className="enterForm" type="date" name="date" id="date" pattern="\d{4}-\d{2}-\d{2}" onChange={(e) => setHabitItem({ ...habitItem, date: e.target.value })} required />

                                        {/*Cantidad de veces*/}
                                        <label for="quantity">Repeticiones (máximo 30)</label>
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