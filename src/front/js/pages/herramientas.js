import React from "react";
import "../../styles/herramientas.css";
import work2 from "../../img/work2.png";
import habit from "../../img/habit.png";
import emotion from "../../img/emotion.png";
import lists from "../../img/lists.png";
import journal from "../../img/journal.png";

export const Herramientas = () => {
	return (<>
		<div className="toolsFirstContainer">
			<div className="container">
				<div className="toolsHeaderContainer">
					<div className="leftToolsContainer">
						<h1>Organización y <br /> control en una sola <br /> app.</h1>
						<p>Disfruta de herrameintas sencillas pero muy productivas, para sacar el máximo provecho a tu tiempo y mejorar tu rendimiento.</p>
					</div>
					<div className="rightToolsContainer">
						<img src={work2} id="workTools" />
					</div>
				</div>
			</div>
		</div>

		<div className="toolsBodyContainer">
			<div className="container">

			<div className="bodyToolscard">
					<div className="bodyToolsText">
						<h4><i className="fa-solid fa-chart-column"></i> Hábitos</h4>
						<p>La herramienta de <strong>seguimiento de hábitos</strong> te ayuda a crear y mantener hábitos positivos en tu vida.
							Con esta herramienta, puedes crear hábitos personalizados, establecer objetivos de cumplimiento
							y realizar un seguimiento de tu progreso. <br/>

							La herramienta te ofrece una variedad de funciones para ayudarte a alcanzar tus objetivos,
							incluyendo una <strong>interfaz fácil de usar, un calendario de hábitos y estadísticas</strong> que te ayudan a
							ver cómo estás progresando. <br/>

							Esta herramienta poderosa puede ayudarte a mejorar tu vida. ¿Estás listo para crear hábitos
							positivos y alcanzar tus objetivos?</p>
					</div>
					<div className="bodyToolsIMG">
						<img src={habit} id="workTools" />
					</div>

				</div>

				<div className="bodyToolscard">
					<div className="bodyToolsIMG">
						<img src={journal} id="workTools" />
					</div>
					<div className="bodyToolsText">
						<h4><i className="fa-solid fa-book"></i> Diarios</h4>
						<p>La herramienta de creación de diarios te permite <strong>capturar tus pensamientos</strong>, sentimientos y experiencias en un solo lugar. <br/>
						Con esta herramienta, puedes crear diarios personalizados, identificarlos con un nombre y comenzar a escribir en ellos. <br/>
						Los diarios pueden ser una <strong>excelente manera de reflexionar</strong> sobre tu vida, procesar tus emociones y crear recuerdos duraderos. <br/>
						La herramienta de creación de diarios de es una <strong>herramienta poderosa</strong> que puede ayudarte a conectarte
						contigo mismo y con el mundo que te rodea.</p>
					</div>
				</div>

				<div className="bodyToolscard">
					<div className="bodyToolsText">
						<h4><i className="fa-solid fa-list-check"></i> Listas</h4>
						<p>La herramienta de <strong>listas de tareas</strong> te permite organizar tu vida y alcanzar tus objetivos. <br/>
						Con esta herramienta, puedes crear tantas listas de tareas como quieras, identificarlas con un nombre y agregar en ellas
						<strong>tareas pendientes por hacer</strong>. <br/>
						Cada lista tendrá una <strong>estadística individual de cumplimiento</strong>, lo que te permitirá ver cómo estás progresando en cada una
						de ellas. Además, habrá un nivel de cumplimiento global de todas las listas, lo que te dará una <strong>visión general de tu progreso</strong>. </p>
					</div>
					<div className="bodyToolsIMG">
						<img src={lists} id="workTools" />
					</div>

				</div>

				<div className="bodyToolscard">
					<div className="bodyToolsIMG">
						<img src={emotion} id="workTools" />
					</div>
					<div className="bodyToolsText">
						<h4><i className="fa-regular fa-face-smile"></i> Ánimo</h4>
						<p>La herramienta de <strong>seguimiento de emociones</strong> te ayuda a comprender mejor tus emociones y cómo influyen en tu vida.<br/>
						Con esta herramienta, puedes registrar cómo te sientes al momento, <strong>identificar los patrones</strong> que te llevan a sentirte 
						así y generar una estadística de tu estado emocional en general.<br/>
						Esta herramienta puede ayudarte a identificar las emociones que te afectan más, los factores que desencadenan tus
						emociones negativas y las <strong>estrategias que te ayudan a sentirte mejor</strong>.<br/>
						La herramienta de seguimiento de emociones es otra herramienta poderosa que puede ayudarte a mejorar tu salud
						mental y tu bienestar general.</p>
					</div>
				</div>

			</div>
		</div>
	</>
	);
};
