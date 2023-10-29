import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/comofunciona.css";

export const ComoFunciona = () => {
	const { store, actions } = useContext(Context);

	return (
		<div id="howContainer">
			<div className="container">
				<div className="howTitles">
					<h1>CREA - SIGUE - MEJORA</h1>
				</div>
				<div className="mainHowContainer">
					<div className="howCard">
						<p className="howCardIcon"><i class="fa-solid fa-chart-column"></i></p>
						<h4 className="howCardTitle">HÁBITOS</h4>
						<p className="howCardText">Con Atomic Routine podrás hacer seguimiento a tus hábitos y medir tu nivel de rendimiento y mejora. ¿Te has propuesto realizar un cambio positivo en tu vida y no lo has logrado? La constancia es un factor clave. Identifica ese hábito que quieres incorporar en tu día a día y hazle seguimiento con nuestra aplicación.</p>
					</div>
					<div className="howCard">
						<p className="howCardIcon"><i class="fa-solid fa-chart-column"></i></p>
						<h4 className="howCardTitle">HÁBITOS</h4>
						<p className="howCardText">Con Atomic Routine podrás hacer seguimiento a tus hábitos y medir tu nivel de rendimiento y mejora. ¿Te has propuesto realizar un cambio positivo en tu vida y no lo has logrado? La constancia es un factor clave. Identifica ese hábito que quieres incorporar en tu día a día y hazle seguimiento con nuestra aplicación.</p>
					</div>
					<div className="howCard">
						<p className="howCardIcon"><i class="fa-solid fa-chart-column"></i></p>
						<h4 className="howCardTitle">HÁBITOS</h4>
						<p className="howCardText">Con Atomic Routine podrás hacer seguimiento a tus hábitos y medir tu nivel de rendimiento y mejora. ¿Te has propuesto realizar un cambio positivo en tu vida y no lo has logrado? La constancia es un factor clave. Identifica ese hábito que quieres incorporar en tu día a día y hazle seguimiento con nuestra aplicación.</p>
					</div>
					<div className="howCard">
						<p className="howCardIcon"><i class="fa-solid fa-chart-column"></i></p>
						<h4 className="howCardTitle">HÁBITOS</h4>
						<p className="howCardText">Con Atomic Routine podrás hacer seguimiento a tus hábitos y medir tu nivel de rendimiento y mejora. ¿Te has propuesto realizar un cambio positivo en tu vida y no lo has logrado? La constancia es un factor clave. Identifica ese hábito que quieres incorporar en tu día a día y hazle seguimiento con nuestra aplicación.</p>
					</div>
				</div>
			</div>
		</div>
	);
};
