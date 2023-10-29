import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/comofunciona.css";
import test from "../../img/test.png";

export const ComoFunciona = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="howContainer">
			<div className="container">
				<div className="howTitle">
					<h1>Cómo funciona</h1>
				</div>
				<div className="howMainBox">

					<div className="HowBoxColumn">
						<div className="howImage1">
							<img src={test} id="homeImg" />
						</div>
						<div className="howTextBox1">
							<h4>Registro</h4>
							<p>Para poder disfrutar de todas las herramientas que tenemos para ofrecerle, deberá contar con una cuenta en nuestra plataforma. Ingrese al portal de registro y comience hoy mismo.</p>
						</div>
					</div>

					<div className="HowBoxColumn">
						<div className="howTextBox2">
							<h4>Agregue sus metas</h4>
							<p>Puede crear nuevos hábito, comenzar un diario nuevo, crear nuevas listas de cosas pendientes por hacer, o hacer seguimiento a su estado de ánimo.</p>
						</div>
						<div className="howImage2">
							<img src={test} id="homeImg" />
						</div>
					</div>

					<div className="HowBoxColumn">
						<div className="howImage3">
							<img src={test} id="homeImg" />
						</div>
						<div className="howTextBox3">
							<h4>Haga el seguimiento</h4>
							<p>Una vez haya establecido sus objetivos, vaya llevando registro de su progreso. Cada vez que haya cumplido con una meta, lleve el control de su avance. Así la plataforma podrá elaborar las estadísticas.</p>
						</div>
					</div>

					<div className="HowBoxColumn">

						<div className="howTextBox4">
							<h4>Comparta</h4>
							<p>Si lo desea, puede descargar su progreso, para llevar un seguimiento más personalizado. Recuerde que también cuenta con nosotros en las redes sociales. No olvide compartir con sus amigos.</p>
						</div>
						<div className="howImage4">
							<img src={test} id="homeImg" />
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};
