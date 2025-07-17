'use client';
import { Suspense } from "react";
import LoginForm from "./LoginForm";


const Login = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );

}


export default Login;