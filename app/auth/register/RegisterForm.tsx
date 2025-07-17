
'use client';

import Link from 'next/link'
import React from 'react'
import useLoginSubmit from "@/app/_hooks/useLoginSubmit";
import Error from "@/app/_components/common/Error";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
    const { handleSubmit, submitHandler, register, errors,watch } = useLoginSubmit();
    const _password = watch("password"); 

    return (
        <main className="main pages">
            <div className="page-header breadcrumb-wrap">
            <div className="container">
                <div className="breadcrumb">
                <a href="index.html" rel="nofollow">
                    <i className="fi-rs-home mr-5" />
                    Home
                </a>
                <span /> Pages <span /> My Account
                </div>
            </div>
            </div>
            <div className="page-content pt-150 pb-150">
            <div className="container">
                <div className="row">
                <div className="col-xl-6 m-auto">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="login_wrap widget-taber-content background-white">
                        <div className="padding_eight_all bg-white">
                            <div className="heading_s1">
                            <h1 className="mb-5">Create an Account</h1>
                            <p className="mb-30">
                                Already have an account? 
                                <Link href="/auth/login"     >
                                Login
                                </Link>
                            </p>
                            </div>
                            <form  onSubmit={handleSubmit(submitHandler)}
        >
                            <div className="form-group">
                                <input
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                    value: 3,
                                    message: "Name must be at least 3 characters long"
                                    }
                                })}
                                name="name"
                                placeholder="Username"
                                required
                                type="text"
                                />
                                <Error errorName={errors.name} />

                            </div>
                            <div className="form-group">
                                <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                    }
                                })}
                                name="email"
                                placeholder="Email"
                                required
                                type="text"
                                />
                                <Error errorName={errors.email} />

                            </div>
                            <div className="form-group">
                                <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                    }
                                })}
                                placeholder="Password"
                                required
                                type="password"
                                />
                                <Error errorName={errors.password} />

                            </div>

                            <div className="form-group">
                                <input
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) => {
                                    return value === _password  || "Passwords do not match";
                                    }
                                })}
                                placeholder="Confirm password"
                                required
                                type="password"
                                />
                                <Error errorName={errors.confirmPassword} />
                            </div>
                            
                            
                            <div className="form-group mb-30">
                                <button
                                className="btn btn-fill-out btn-block hover-up font-weight-bold"
                                name="login"
                                type="submit">
                                Submit & Register
                                </button>
                            </div>
                            
                            </form>
                        </div>
                        </div>
                    </div>
                
                    </div>
                </div>
                </div>
            </div>
            </div>
        </main>
    );
}

export default RegisterForm
