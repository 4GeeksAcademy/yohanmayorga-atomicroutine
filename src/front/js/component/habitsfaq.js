import React, { useContext, useState } from "react";
import "../../styles/journal.css";
import "../../styles/habitdetail.css";
import { Context } from "../store/appContext";

export const HabitsFAQ = ({ open, close }) => {
    if (!open) return null;

    return (
        <>
            <div className="selectedJournalBackground"></div>
            <div className="selectedJournalBox">
            <div className="selectedjournalHeader">
                    <h4><i className="fa-solid fa-clipboard-question"></i> F.A.Q.s</h4>
                    <button type="button" className="closeButtonJournal" onClick={() => { close(false) }}>X</button>
                </div>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                ¿Para qué sirve esta herramienta?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p>Esta herramienta te permite crear y hacer seguimiento a todas las tareas que desees realizar de manera recurrente. Al crear un hábito indicarás
                                    durante cuántos días querrás hacerlo, y al ver tu calendario, podrás comprobar si tienes tareas pendientes para el día. Además de esto, podrás
                                    ver el nivel de cumplimiento realizado hasta la fecha.</p>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                ¿Cómo crear un hábito?
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p>Para crear un hábito deberás seleccionar el botón correspondiente, que abrirá un formulario sencillo, en él deberás colocar el nombre
                                    del hábito que deseas hacer (por ejemplo, <strong>"Tomar agua todos los días"</strong>), luego una breve descripción (esto es opcional),
                                    la fecha en la que quieres que comience a contar y los días que quieras hacerlo. La aplicación creará automaticamente la tarea en los
                                    días que corresponda, y podrás verlo en tu calendario.</p>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                ¿Cómo funciona el resumen del progreso?
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p>En la parte superior de esta página podrás ver tu <strong>"Resumen de progreso"</strong>, que contiene un porcentaje de cumplimiento.
                                Este porcentaje se calcula tomando en cuenta los hábitos creados hasta la fecha y aquellos ya marcados como hechos. Por ejemplo, si hasta
                                la fecha tienes creadas dos tareas por hacer, y ambas están marcadas como completadas, tu resumen de progreso será de <strong>100%</strong>,
                                independientemente de todas las tareas que tengas a futuro, pues se considera que hasta la fecha has cumplido con todo lo programado.
                                De igual forma, si de las dos tareas programadas hasta la fecha, sólo tienes una marcada como completada, tu progreso será del <strong>50%</strong>.</p>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                ¿Y si quiero borrar un hábito?
                            </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p>También puedes hacerlo. Debajo del calendario tienes la lista de las tareas pendientes para cumplir en la fecha seleccionada. Si quieres
                                    eliminar un hábito, ve a la fecha correspondiente, y selecciona el hábito que quieres borrar, se abrirá un cuadro con el detalle del hábito (nombre 
                                    y descripción), y tendrás la opción de borrarlo (o de marcarlo como completado o desmarcarlo).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};