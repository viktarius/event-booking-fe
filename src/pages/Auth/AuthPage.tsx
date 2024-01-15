import React, { FormEvent, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "@eb-state/auth.state";
import { container, TYPES } from '@eb-core/services/inversify.config';
import { IAuthRequestService } from '@eb-core/services/auth-request.service';
import { ILoginRequestBody, IRegisterRequestBody } from '@eb-core/models/request';

import './AuthPage.css';

const AuthPage = () => {
    const authRequestService = container.get<IAuthRequestService>(TYPES.AuthRequestService);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const surnameRef = useRef<HTMLInputElement>(null);
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const dispatch = useDispatch();

    const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isLogin && (passwordRef.current?.value.trim() === '' || confirmPasswordRef.current?.value !== passwordRef.current?.value)) {
            // TODO: use notification service here
            console.log('Passwords is not valid');
            return;
        }

        try {
            const result = isLogin ?
                await authRequestService.login(getLoginQuery()) :
                await authRequestService.register(getSignupQuery());
            const { isAuthorized, userId } = result;
            dispatch(login({ isAuthorized, userId }))
        } catch (err) {
            console.error(err)
        }
    }

    const getLoginQuery = (): ILoginRequestBody => ({
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || ""
    })

    const getSignupQuery = (): IRegisterRequestBody => ({
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || "",
        name: nameRef.current?.value || "",
        surname: surnameRef.current?.value || "",
    })

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={ onFormSubmit }>
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" ref={ emailRef }/>
                </div>
                <div className="form-control">
                    <label htmlFor="passowrd">Password</label>
                    <input type="password" id="password" ref={ passwordRef }/>
                    { isLogin && <Link className="help-link" to="/auth">Forgot password?</Link> }
                </div>
                {
                    !isLogin &&
                    <>
                        <div className="form-control">
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input type="password" id="confirmPassword" ref={ confirmPasswordRef }/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" ref={ nameRef }/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="surname">Surname</label>
                            <input type="text" id="surname" ref={ surnameRef }/>
                        </div>
                    </>
                }
                <button className="btn btn-primary submit-btn" type="submit">{ isLogin ? 'Login' : 'Sign up' }</button>
                <div className="form-view-toggler">
                    { isLogin ? 'Don\'t h' : 'H' }ave an account?
                    <button type="button"
                            onClick={ () => setIsLogin(!isLogin) }>{ isLogin ? 'Create new' : 'Login' }</button>
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
