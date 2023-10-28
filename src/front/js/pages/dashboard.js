import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export const Dashboard = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        !store.token && navigate("/login");
    });

    return (
        <div className="Private">
            <h1>Hello! {store.profile ? store.profile.name : ""}</h1>
            <h1>Hello! {store.profile ? store.profile.name : ""}</h1>
            <h1>Hello! {store.profile ? store.profile.name : ""}</h1>
            <h1>Hello! {store.profile ? store.profile.name : ""}</h1>
            <h1>Hello! {store.profile ? store.profile.name : ""}</h1>
            <h1>Hello! {store.profile ? store.profile.name : ""}</h1>
        </div>
    )
};