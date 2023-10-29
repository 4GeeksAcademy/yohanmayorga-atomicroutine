import React, { useContext } from "react";
import { Context } from "../store/appContext";
import test from "../../img/test.png";
import list from "../../img/list.png";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			{/* Primer container del Home */}
			<div id="firstContainer">
				<div className="container">
					<div id="mainContainer">
						<div id="left">
							<div id="leftContainer">
								<h1 id="mainTitle">Crea y haz seguimiento a tus metas</h1>
								<p>Encuentra todo lo que necesitas para ser más eficiente, en una sola aplicación.</p>
							</div>
							<div id="buttons">
								<a href="/login">
									<button type="button" id="homeButton1" href="/login">
										Registro
									</button>
								</a>
								<a href="/comofunciona">
									<button type="button" id="homeButton2" href="/comofunciona">
										Saber más
									</button>
								</a>
							</div>
						</div>
						<div id="rightContainer">
							<img src={list} id="homeImg" />
						</div>
					</div>
				</div>
			</div>
			<div id="secondContainer">
				<div className="container">
					<div id="secondContainerTitles">
						<h1 id="secondTitle">Crear y hacer seguimientos a tus hábitos nunca había sido tan fácil</h1>
						<p id="secondTitle">Con nuestra herramienta, encontrarás todo lo que necesitas en un sólo lugar.</p>
					</div>
				</div>
			</div>

			{/* Segundo container del Home */}
			<div id="secondContainer">
				<div class="container">
					<ul className="nav justify-content-center nav-pills" id="pills-tab" role="tablist">
						<li className="nav-item" role="presentation">
							<button className="nav-link active" id="pills-habits-tab" data-bs-toggle="pill" data-bs-target="#pills-habits" type="button" role="tab" aria-controls="pills-habits" aria-selected="true">Hábitos</button>
						</li>
						<li className="nav-item" role="presentation">
							<button className="nav-link" id="pills-journal-tab" data-bs-toggle="pill" data-bs-target="#pills-journal" type="button" role="tab" aria-controls="pills-journal" aria-selected="false">Diario</button>
						</li>
						<li className="nav-item" role="presentation">
							<button className="nav-link" id="pills-todo-tab" data-bs-toggle="pill" data-bs-target="#pills-todo" type="button" role="tab" aria-controls="pills-todo" aria-selected="false">Lista de tareas</button>
						</li>
						<li className="nav-item" role="presentation">
							<button className="nav-link" id="pills-emotion-tab" data-bs-toggle="pill" data-bs-target="#pills-emotion" type="button" role="tab" aria-controls="pills-emotion" aria-selected="false">Estado de ánimo</button>
						</li>
					</ul>

					<div className="tab-content" id="pills-tabContent">
						<div className="tab-pane fade show active" id="pills-habits" role="tabpanel" aria-labelledby="pills-habits-tab" tabindex="0">
							<div className="navTabCard">
								<img src={test} id="homeImg" />
								<div className="navTabCardButton">
									<h3>Haz seguimiento</h3>
									<p>Crea los hábitos que quieres incorporar en tu día a día, y haz seguimiento del nivel de cumplimiento. Revisa el historial de tus hábitos.</p>
									<button id="homeButton1">Conoce más</button>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="pills-journal" role="tabpanel" aria-labelledby="pills-journal-tab" tabindex="0">
							<div className="navTabCard">
								<img src={test} id="homeImg" />
								<div className="navTabCardButton">
									<h3>Crea diarios</h3>
									<p>Ya sea para un tema en específico, o para un tema en general, está comprobado que llevar un diario donde dejes un registro de tus pensamientos es muy beneficioso para ti.</p>
									<button id="homeButton1">Conoce más</button>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="pills-todo" role="tabpanel" aria-labelledby="pills-todo-tab" tabindex="0">
							<div className="navTabCard">
								<img src={test} id="homeImg" />
								<div className="navTabCardButton">
									<h3>Que no se te pase nada por alto</h3>
									<p>Crea listas de tareas pendientes, divididas por temas o listas generales, y lleva un registro de lo que tienes pendientes por hacer. Mejora el uso de tu tiempo.</p>
									<button id="homeButton1">Conoce más</button>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="pills-emotion" role="tabpanel" aria-labelledby="pills-emotion-tab" tabindex="0">
							<div className="navTabCard">
								<img src={test} id="homeImg" />
								<div className="navTabCardButton">
									<h3>Controla tus emociones</h3>
									<p>¿Sientes que las emociones controlan tu forma de pensar? Lleva un registro de tus estados de ánimo, y observa qué tienen en común los momentos felices y los tristes, aprende a identificar patrones y mejora el control de tus emociones.</p>
									<button id="homeButton1">Conoce más</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Tercer container del Home */}
			<div id="thirdContainer">
				<div className="container">
					<h1 id="secondTitle">¿Qué hábitos puedes crear?</h1>
					<p id="secondTitle">Estas son sólo algunas ideas para que comiences a hacer un cambio positivo en tu vida.</p>
					<div id="cardsContainer">
						<div className="cardHome">
							<p id="emoji">💧</p>
							<h4>Tomar agua</h4>
							<p>Crea el hábito de tomar al menos 4 vasos de 500ml al día. Cada vez que lo hagas, márcalo como "hecho" y mide tu progreso.</p>
							<a href="#">Saber más</a>
						</div>
						<div className="cardHome">
							<p id="emoji">📖</p>
							<h4>Leer 30 minutos al día</h4>
							<p>Comprométete a leer 30 minutos al dia, todas las noches. Te sorprenderá cuántos libros habrás leído en poco tiempo.</p>
							<a href="#">Saber más</a>
						</div>
						<div className="cardHome">
							<p id="emoji">🏋🏻‍♀️</p>
							<h4>Hacer ejercicio</h4>
							<p>Ya sea en tu casa o en el gimnasio, puedes comprometerte con el hábito de hacer ejercicio todos los días.</p>
							<a href="#">Saber más</a>
						</div>
						<div className="cardHome">
							<p id="emoji">🗺️</p>
							<h4>Conocer lugares nuevos</h4>
							<p>Puedes desarrollar el hábito de, al menos una vez al mes, ir a un sitio al que no hayas ido antes.</p>
							<a href="#">Saber más</a>
						</div>
					</div>
					<div id="thirdComponentButton">
						<a href="/login">
							<button type="button" id="homeButton1" href="/login">
								Registro
							</button>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};
