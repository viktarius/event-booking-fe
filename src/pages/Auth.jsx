import React, { useRef } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../state/auth.state";

import './Auth.css';

function AuthPage() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const [isLogin, setIsLogin] = useState(true)
    const dispatch = useDispatch();

    function onToggleAuthForm() {
        setIsLogin(!isLogin);
    }

    async function onFormSubmit(event) {
        event.preventDefault();
        if (!isLogin && (passwordRef.current.value.trim() === '' || confirmPasswordRef.current.value !== passwordRef.current.value)) {
            console.log('Passwords is not valid');
            return;
        }
        const requestBody = isLogin ? getLoginQuery() : getSignupQuery();
        try {
            const res = await fetch(`http://localhost:3000/${isLogin ? 'login' : 'register'}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            const result = await res.json();
            const { isAuthorized, userId } = result;
            dispatch(login({ isAuthorized, userId }))
        } catch (err) {
            console.error(err)
        }
    }

    function getLoginQuery() {
        return {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
    }

    function getSignupQuery() {
        return {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            surname: surnameRef.current.value,
        };
    }

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={onFormSubmit}>
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" ref={emailRef}/>
                </div>
                <div className="form-control">
                    <label htmlFor="passowrd">Password</label>
                    <input type="password" id="password" ref={passwordRef}/>
                    {isLogin && <Link className="help-link" to="/auth">Forgot password?</Link>}
                </div>
                {
                    !isLogin &&
                    <>
                        <div className="form-control">
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input type="password" id="confirmPassword" ref={confirmPasswordRef}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" ref={nameRef}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="surname">Surname</label>
                            <input type="text" id="surname" ref={surnameRef}/>
                        </div>
                    </>
                }
                <button className="btn btn-primary submit-btn" type="submit">{isLogin ? 'Login' : 'Sign up'}</button>
                <div className="form-view-toggler">
                    {isLogin ? 'Don\'t h' : 'H'}ave an account?
                    <button type="button" onClick={onToggleAuthForm}>{isLogin ? 'Create new' : 'Login'}</button>
                </div>
            </form>
            <div className="auth__other-auth-methods">
                <div className="separator"></div>
                <span>Or login with</span>
                <div className="thirds-systems-methods">
                    <button className="btn btn-primary-outline">Google</button>
                    <button className="btn btn-primary-outline">Github</button>
                </div>
            </div>
            <div className="decor left-decor"></div>
            <div className="decor right-decor"></div>
        </div>)
}

export default AuthPage;
