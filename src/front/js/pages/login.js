import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isShow, setIsShown] = useState(false);

    useEffect(() => {
        store.token && store.token != "undefined" && navigate("/dashboard");
    });

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password_check: "",
        is_active: true
    });

    async function addUser() {
        let created = true;

        if (user.password == user.password_check) {
            try {
                await actions.createUser(user)
            }
            catch (error) {
                created = false;
            };
            if (created) {
                alert("¡Usuario creado correctamente! Ya puede conectarse usando su usuario y contraseña.");
                location.reload();
            }
        }
        else {
            alert("Ha ocurrido un error")
        }
    }

    async function loginUser({ email, password }) {
        let isValid = true;
        try { actions.loginUser(email, password) }
        catch (error) { isValid = false };
        if (isValid) {
            navigate("/dashboard");
        } else {
            alert(`No se ha podido iniciar sesión.`);
        }
    }

    return (
        <div id="loginContainer">
            <section onSubmit={(e) => e.preventDefault}>
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
                        <form id="loginForm" onSubmit={(event) => { event.preventDefault() }} >
                            {isShow && (
                                <div className="formLine">
                                    <p className="formEmoji">👤</p>
                                    <input className="enterForm"
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        placeholder="Ingrese su nombre"
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                                        onChange={(e) => setUser({ ...user, password_check: e.target.value })}
                                        required />
                                </div>
                            )}
                            <input className="FormButton" type="button" value={!isShow ? "Ingresar" : "Registro"} onClick={() => {
                                if (!isShow) {
                                    return loginUser(user);
                                } else {
                                    return addUser();
                                }
                            }} />
                        </form>
                        {!isShow && (
                            <a href="#" id="recoverPassword">¿Olvidaste la contraseña? Haz click aquí.</a>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};
