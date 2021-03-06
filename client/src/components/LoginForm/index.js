import React, { useRef } from "react";
import "./loginForm.css";
import { UserConsumer } from "../../utils/UserContext";
import { AboutConsumer } from "../../utils/AboutContext";

function LoginForm() {

    const passwordRef = useRef();

    return (
        <div className="login-form-container">
            <h1 className="page-heading uk-text-center">Login</h1>
            <AboutConsumer>
                {
                    value => {
                        return <p className="uk-text-center">Hi {value.content.name}! Welcome back!</p>
                    }
                }
            </AboutConsumer>

            <form className="uk-form-stacked uk-flex uk-flex-column uk-flex-bottom">
                <div className="uk-margin uk-width-expand">
                    <label className="uk-form-label" htmlFor="password">password</label>
                    <div className="uk-form-controls">
                        <input className="uk-input" id="password" type="password" placeholder="***********" ref={passwordRef} />
                    </div>
                </div>
                <UserConsumer>
                    {
                        value => {
                            return <button className="uk-button uk-button-default" onClick={(e) => value.handleLogin(e, passwordRef.current.value)}>log in</button>
                        }
                    }
                </UserConsumer>
            </form>
        </div>
    )
}

export default LoginForm;