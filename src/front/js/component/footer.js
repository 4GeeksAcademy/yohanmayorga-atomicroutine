import React, { Component } from "react";
import "../../styles/footer.css";
import atom from "../../img/atom.png";
import { Link, useParams } from "react-router-dom";

export const Footer = () => (
	<div className="footerBackground">
		<div className="container">
			<div className="footerBox">
				<div className="footerSecondaryBox">
					<a href="/"><img src={atom} className="desktopCardImg"/></a>
					<h5>Atomic Routine</h5>
					<p>Caracas | Venezuela</p>
				</div>
				<div className="footerSecondaryBox">
					<h5>Enlaces de interés</h5>
					<Link to="/comofunciona" style={{ textDecoration: 'none' }}>Cómo funciona</Link>
					<Link to="/herramientas" style={{ textDecoration: 'none' }}>Herramientas</Link>
					<Link to="/login" style={{ textDecoration: 'none' }}>Registro / Login</Link>
				</div>
				<div className="footerSecondaryBox">
					<h5>RRSS.</h5>
					<div className="footersn">
						<h3><a href="https://www.instagram.com/atomicroutine" target="_blank"><i className="fa-brands fa-instagram"></i></a></h3>
						<h3><a href="#"><i class="fa-brands fa-x-twitter ms-2"></i></a></h3>
						<h3><a href="#"><i class="fa-brands fa-tiktok ms-2"></i></a></h3>
					</div>
				</div>
			</div>
		</div>
	</div>
);
