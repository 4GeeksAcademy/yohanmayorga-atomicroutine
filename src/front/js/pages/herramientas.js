import React from "react";
import "../../styles/herramientas.css";
import work2 from "../../img/work2.png";

export const Herramientas = () => {
	return (
		<div className="toolsFirstContainer">
			<div className="container">
				<div className="lefttToolsContainer">
					<p>Hola</p>
				</div>
				<div className="rightToolsContainer">
					<img src={work2} id="workTools" />
				</div>
			</div>
		</div>
	);
};
