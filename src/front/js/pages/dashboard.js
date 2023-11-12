import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Escritorio } from "./escritorio";
import { Habitos } from "./habitos";
import { Diarios } from "./diarios";
import { Listas } from "./listas";
import { Emociones } from "./emociones";
import "../../styles/dashboard.css";

export const Dashboard = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        !store.token && navigate("/login");
        store.token === "undefined" && navigate("/login");
    });

    return (
        <div className="dashboard">
            <div className="dashboardSideBar">
                <ul className="nav justify-content-center nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="dashSideButton active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"><i className="fa-solid fa-house"></i>Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="dashSideButton" id="pills-journal-tab" data-bs-toggle="pill" data-bs-target="#pills-habits" role="tab" aria-controls="pills-habits" aria-selected="false"><i className="fa-solid fa-chart-column"></i>Hábitos</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="dashSideButton" id="pills-journal-tab" data-bs-toggle="pill" data-bs-target="#pills-journal" role="tab" aria-controls="pills-journal" aria-selected="false"><i className="fa-solid fa-book"></i>Diarios</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="dashSideButton" id="pills-todo-tab" data-bs-toggle="pill" data-bs-target="#pills-todo" role="tab" aria-controls="pills-todo" aria-selected="false"><i className="fa-solid fa-list-check"></i>Listas</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="dashSideButton" id="pills-emotion-tab" data-bs-toggle="pill" data-bs-target="#pills-emotion" role="tab" aria-controls="pills-emotion" aria-selected="false"><i className="fa-regular fa-face-smile"></i>Ánimo</button>
                    </li>
                </ul>
            </div>


            <div className="tab-content" id="pills-tabContent">

                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                    {<Escritorio />}
                </div>

                <div className="tab-pane fade" id="pills-habits" role="tabpanel" aria-labelledby="pills-habits-tab" tabIndex="0">
                    {<Habitos />}
                </div>

                <div className="tab-pane fade" id="pills-journal" role="tabpanel" aria-labelledby="pills-journal-tab" tabIndex="0">
                    {<Diarios />}
                </div>

                <div className="tab-pane fade" id="pills-todo" role="tabpanel" aria-labelledby="pills-todo-tab" tabIndex="0">
                    {<Listas />}
                </div>

                <div className="tab-pane fade" id="pills-emotion" role="tabpanel" aria-labelledby="pills-emotion-tab" tabIndex="0">
                    {<Emociones />}
                </div>

            </div>
        </div>
    )
};