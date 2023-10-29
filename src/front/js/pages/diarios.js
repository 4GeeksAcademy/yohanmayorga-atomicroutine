import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/diarios.css";

export const Diarios = () => {

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
                                        required />
                                    <label for="colorpicker" class="form-label">Color principal</label>
                                    <input type="color" id="colorpicker" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};