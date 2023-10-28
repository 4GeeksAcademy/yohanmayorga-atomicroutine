import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light">
			<div className="container">
				<a href="/" className="navbar-brand mb-0">
					Atomic Routine
				</a>
				<button
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					className="navbar-toggler"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<a href="/comofunciona" className="nav-link">
								Cómo funciona
							</a>
						</li>
						<li className="nav-item active">
							<a href="#" className="nav-link">
								Herramientas
							</a>
						</li>
						<li className="nav-item dropdown">
							<a href="#"
								className="nav-link dropdown-toggle"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								Recursos
							</a>
							<ul className="dropdown-menu" arial-aria-labelledby="navbarDropdown">
								<li>
									<a href="#" className="dropdown-item">Recurso 1</a>
								</li>
								<li>
									<a href="#" className="dropdown-item">Recurso 2</a>
								</li>
								<li>
									<a href="#" className="dropdown-item">Recurso 3</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				{
					!store.token && <>
						<a href="/login">
							<button type="button" className="button" href="/login">
								Ingresar
							</button>
						</a>
					</>
				}
				{
					store.token && <>
						<a href="/dashboard" className="userName">
							👤 {store.profile ? store.profile.name : ""}
						</a>
						<a href="/">
							<button type="button" className="button" onClick={() => actions.logOut()}>
								Salir
							</button>
						</a>
					</>
				}
			</div>
		</nav>
	);
};
