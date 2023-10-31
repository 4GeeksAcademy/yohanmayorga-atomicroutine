import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
	const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    // Ocultar la navbar si no estamos en la página de inicio
    setIsNavbarVisible(pathname !== "/ejemplo");
  }, [pathname]);

	const { store, actions } = useContext(Context);

	const location = useLocation()

	function logOut() {
		let loggedOut = actions.logOut();
		if (loggedOut) {
			navigate("/");
		}
	}

	if (isNavbarVisible) {

	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light" >
			<div className="container">
				<a href="/" className="navbar-brand mb-0">
					Atomic Routine {location.pathname}
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
									<a href="#" className="dropdown-item">F.A.Q.</a>
								</li>
								<li>
									<a href="#" className="dropdown-item">Blog</a>
								</li>
								<li>
									<a href="#" className="dropdown-item">Contacto</a>
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
						<div className="nav-item dropdown">
							<button type="button" role="button" className="dropdown-toggle button" data-bs-toggle="dropdown" aria-expanded="false" id="navbarDropdown2">
								👤 {store.profile ? store.profile.name : ""}
							</button>
							<ul className="dropdown-menu" arial-aria-labelledby="navbarDropdown2">
								<li>
									<a href="/dashboard" className="dropdown-item">Escritorio</a>
								</li>
								<li>
									<a href="#" className="dropdown-item">Perfil</a>
								</li>
								<li>
									<a href="/" className="dropdown-item text-danger" onClick={() => logOut()}>Salir</a>
								</li>
							</ul>
						</div>
					</>
				}

			</div>
		</nav> 
	); } else {
		return null;
	  }
};
