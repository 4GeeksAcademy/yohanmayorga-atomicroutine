import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const LogIn = () => {
    const { store, actions } = useContext(Context);
    const [isShow, setIsShown] = useState(false);


    return (
        <div id="loginContainer">
            <div className="container">
                <div id="loginBox">
                    <h3>Bienvenid@</h3>
                    {isShow && (
                            <p className="formHeadText">Registrarse es muy sencillo, sólo debes completar los datos solicitados. ¡Importante! Todos los datos son obligatorios.</p>
                        )}
                    {!isShow && (
                            <p className="formHeadText">Introduce tus datos para ingresar a tu cuenta. Si no recuerdas la contraseña, haz click abajo.</p>
                        )}
                    <div>
                        <button className="FormButton" onClick={() => setIsShown(false)}>Ingresar</button>
                        <button className="FormButton" onClick={() => setIsShown(true)}>Registro</button>
                    </div>
                    <form id="loginForm">
                        {isShow && (
                            <div className="formLine">
                            <p className="formEmoji">👤</p>
                            <input className="enterForm"
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Ingrese su nombre"
                                required />
                                </div>
                        )}
                         <div className="formLine">
                            <p className="formEmoji">✉️</p>
                        <input className="enterForm"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                        />
                        </div>
                        
                        <div className="formLine">
                            <p className="formEmoji">🗝️</p>
                        <input className="enterForm"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Contraseña"
                            required />
                        </div>

                        {isShow && (
                             <div className="formLine">
                             <p className="formEmoji">🗝️</p>
                            <input className="enterForm"
                                type="password"
                                name="password_check"
                                id="password_check"
                                placeholder="Repita su contraseña"
                                required />
                                </div>
                        )}
                        <input className="FormButton" type="submit" value={!isShow ? "Ingresar" : "Registro"} />
                    </form>
                    {!isShow && (
                            <a href="#" id="recoverPassword">¿Olvidaste la contraseña? Haz click aquí.</a>
                        )}
                </div>
            </div>
        </div>
    );
};
