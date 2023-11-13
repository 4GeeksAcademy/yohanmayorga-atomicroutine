import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/diarios.css";
import "../../styles/listas.css";
import { NewTodo } from "./../component/newTodo.js";

export const Listas = () => {

    const { store, actions } = useContext(Context);
    const [list, setList] = useState({
        name: ""
    });
    const [showAddTask, setShowAddTask] = useState(false);
    const [itemList, setItemList] = useState("");

    /* Esta función muestra u oculta la creación de una tarea*/
    const handleClick = (item) => {
        { showAddTask ? setShowAddTask(false) : setShowAddTask(true) };
        setItemList(item);
    };


    /* Función para marcar hecha una tarea (action)*/
    async function handleTaskClick(taskId, completed) {

        let done = true;
        try { await actions.markCompleted(taskId, !completed) }
        catch (error) {
            done = false;
        };
        if (done) {
            alert("La lista se ha actualizado exitosamente");
            location.reload();
        }
        else {
            alert("Ha ocurrido un error")
        }
    }

    useEffect(() => {
        actions.getLists();
        actions.getTasks();
    }, [])

    async function deleteList(listId) {
        let deleted = true;
        const todoItems = filteredTasks;
        try { await 
            todoItems.forEach((todoItem) => {
                if (todoItem.list_id === listId) {
                    actions.deletetodo(todoItem.id);
                }
              });
            actions.deleteList(listId) }
        catch (error) {
            deleted = false;
        };
        if (deleted) {
            alert("La lista se ha eliminado exitosamente.");
            location.reload();
        }
        else {
            alert("Ha ocurrido un error")
        }
    }

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
    const filteredTasks = store.todos.filter((todo) => todo.author.id === store.profile.id);

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">

                {/* Encabezado del componente de las listas */}
                <h4><i className="fa-solid fa-list-check"></i> Listas</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <p>Aquí podrás crear y consultar listas de pendientes. Crea una nueva lista, asignale un título, agrega tareas y ¡listo! Podrás verla en esta pantalla. Seleccionala y comienza a trabajar en ella. ¡Puedes crear tantas listas como desees! Las listas de pendientes son una forma perfecta para organizar tus tareas y mantenerte al día con tus objetivos.</p>
                    {filteredLists.length == 0 ? <p>Actualmente no tienes ninguna lista creada.</p> : <p>Actualmente tienes {filteredLists.length} {filteredLists.length == 1 ? "lista creada." : "listas creadas."}</p>}
                </div>

                <div className="desktopMainButton">
                    {/* Boton para crear lista nueva */}
                    <button type="button" className="deskMainButton" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                        Crear lista nueva
                    </button>
                </div>


                {/* Modal que se abre para crear lista nueva */}
                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" id="journalMainModal">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="fa-solid fa-list-check"></i> Nueva lista</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="journalModalBox">
                                    <label htmlFor="fullName" className="form-label">Nombre</label>
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

                {/* Acá se muestra el diario específico que el usuario abra*/}
                {<NewTodo
                    list_id={itemList.id}
                    listName={itemList.name}
                    open={showAddTask}
                    close={setShowAddTask} />}

                {/* Acá se muestra la lista completa de listas*/}
                <div className="listsContainer">
                    {filteredLists.length == 0 && <h1 className="emptyAlert">No se han encontrado listas.</h1>}
                    {filteredLists.length != 0 &&
                        filteredLists.map(item => (
                            <div className="ComponentList" key={item.id} >
                                <div className="cardListBody">
                                    <div className="cardListHeader">
                                        <h5 className="cardListHeaderTitle">To do list</h5>
                                        <h5 className="cardListHeaderTitle"><i className="fa-solid fa-circle-check"></i></h5>
                                    </div>
                                    <div className="cardListBox">
                                        <h5 className="card-title2">{item.name}</h5>
                                        {/*<img src={listImg} className="CardImg" />*/}
                                    </div>
                                    <p className="addItemButton" onClick={() => { handleClick(item), console.log(filteredTasks) }}><i className="fa-solid fa-circle-plus"></i></p>

                                    <ul className="nav justify-content-center nav-pills2" id="pills-tab" role="tablist">
                                        <li className="nav-item2" role="presentation">
                                            <button className="nav-link2 active" id="pills-false-tab" data-bs-toggle="pill" data-bs-target={`#pills-false-${item.id}`} type="button" role="tab" aria-controls="pills-false" aria-selected="true">Pendientes</button>
                                        </li>
                                        <li className="nav-item2" role="presentation">
                                            <button className="nav-link2" id="pills-true-tab" data-bs-toggle="pill" data-bs-target={`#pills-true-${item.id}`} type="button" role="tab" aria-controls="pills-true" aria-selected="false">Hechas</button>
                                        </li>
                                    </ul>

                                    {filteredTasks.filter((todo) => {
                                        return todo.list_id === item.id
                                    }).length > 0 && (
                                            <p className="emptyAlert">
                                                Total cumplido: {
                                                    ((
                                                        filteredTasks.filter((todo) => { return (todo.list_id === item.id && todo.completed) }).length

                                                        /

                                                        filteredTasks.filter((todo) => { return (todo.list_id === item.id) }).length)

                                                        * 100).toFixed(2)
                                                }%.
                                            </p>
                                        )}

                                    <div className="tab-content2" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id={`pills-false-${item.id}`} role="tabpanel" aria-labelledby="pills-false-tab" tabIndex="0">
                                            {filteredTasks.filter((todo) => {
                                                return todo.list_id === item.id && !todo.completed;
                                            }).length == 0 && (<p className="emptyAlert">No hay tareas pendientes.</p>)}
                                            {filteredTasks.filter((todo) => {
                                                return todo.list_id === item.id && !todo.completed;
                                            }).map(todo => (
                                                <div className="tasksList" key={todo.id} >
                                                    <p className="tasksListText me-2">{todo.name}</p>
                                                    <div className="custom-radio">
                                                        <input type="checkbox" name="task" value={todo.id} checked={todo.completed} onChange={() => handleTaskClick(todo.id, todo.completed)} />
                                                        <div className="checkmark"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>


                                        <div className="tab-pane fade" id={`pills-true-${item.id}`} role="tabpanel" aria-labelledby="pills-true-tab" tabIndex="0">
                                            {filteredTasks.filter((todo) => {
                                                return todo.list_id === item.id && todo.completed;
                                            }).length == 0 && (<p className="emptyAlert">No hay tareas hechas.</p>)}
                                            {filteredTasks.filter((todo) => {
                                                return todo.list_id === item.id && todo.completed;
                                            }).map(todo => (
                                                <div className="tasksList" key={todo.id} >
                                                    <p className="tasksListText">{todo.name}</p>
                                                    <div className="custom-radio">
                                                        <input type="checkbox" name="task" value={todo.id} checked={todo.completed} onChange={() => handleTaskClick(todo.id, todo.completed)} />
                                                        <div className="checkmark"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="deleteListButtonContainer">
                                        <button className="deleteListButton" onClick={() => deleteList(item.id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
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