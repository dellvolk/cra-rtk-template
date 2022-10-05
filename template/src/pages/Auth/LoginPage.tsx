import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useLocation, useNavigate} from "react-router-dom";
import {useLoginMutation} from '../../store/auth/auth.api';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [login, {isSuccess}] = useLoginMutation();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("username") as string;
        const password = formData.get("password") as string;

        login({email, password});

        // auth.signin(username, () => {
        //     // Send them back to the page they tried to visit when they were
        //     // redirected to the login page. Use { replace: true } so we don't create
        //     // another entry in the history stack for the login page.  This means that
        //     // when they get to the protected page and click the back button, they
        //     // won't end up back on the login page, which is also really nice for the
        //     // user experience.
        //     navigate(from, { replace: true });
        // });
    }

    console.log(isSuccess)

    useEffect(() => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        if (isSuccess) {
            navigate(from, {replace: true});
        }
    }, [isSuccess, navigate, from])

    return (
        <LoginPageStyled>
            <p>You must log in to view the page at {from}</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input name="username" type="text" defaultValue=""/>
                </label>{" "}
                <label>
                    Password: <input name="password" type="text" defaultValue=""/>
                </label>{" "}
                <button type="submit">Login</button>
            </form>
        </LoginPageStyled>
    );
};

const LoginPageStyled = styled.div`
`

export default (LoginPage);
