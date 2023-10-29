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
				<div className="accordion" id="accordionExample">
					<div className="accordion-item">
						<h2 className="accordion-header">
							<button
								className="accordion-button"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseOne"
								aria-expanded="true"
								aria-controls="collapseOne"
							>
								Accordion Item #1
							</button>
						</h2>
						<div
							id="collapseOne"
							className="accordion-collapse collapse show"
							data-bs-parent="#accordionExample"
						>
							<div className="accordion-body">
								<strong>This is the first item's accordion body.</strong> It is shown by
								default, until the collapse plugin adds the appropriate classes that we
								use to style each element. These classes control the overall appearance,
								as well as the showing and hiding via CSS transitions. You can modify
								any of this with custom CSS or overriding our default variables. It's
								also worth noting that just about any HTML can go within the{" "}
								<code>.accordion-body</code>, though the transition does limit overflow.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header">
							<button
								className="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseTwo"
								aria-expanded="false"
								aria-controls="collapseTwo"
							>
								Accordion Item #2
							</button>
						</h2>
						<div
							id="collapseTwo"
							className="accordion-collapse collapse"
							data-bs-parent="#accordionExample"
						>
							<div className="accordion-body">
								<strong>This is the second item's accordion body.</strong> It is hidden
								by default, until the collapse plugin adds the appropriate classes that
								we use to style each element. These classes control the overall
								appearance, as well as the showing and hiding via CSS transitions. You
								can modify any of this with custom CSS or overriding our default
								variables. It's also worth noting that just about any HTML can go within
								the <code>.accordion-body</code>, though the transition does limit
								overflow.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header">
							<button
								className="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseThree"
								aria-expanded="false"
								aria-controls="collapseThree"
							>
								Accordion Item #3
							</button>
						</h2>
						<div
							id="collapseThree"
							className="accordion-collapse collapse"
							data-bs-parent="#accordionExample"
						>
							<div className="accordion-body">
								<strong>This is the third item's accordion body.</strong> It is hidden
								by default, until the collapse plugin adds the appropriate classes that
								we use to style each element. These classes control the overall
								appearance, as well as the showing and hiding via CSS transitions. You
								can modify any of this with custom CSS or overriding our default
								variables. It's also worth noting that just about any HTML can go within
								the <code>.accordion-body</code>, though the transition does limit
								overflow.
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};
