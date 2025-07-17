'use client';
import Error from "@/app/_components/common/Error";
import Link from "next/link";
import useLoginSubmit from "@/app/_hooks/useLoginSubmit";
import Image from "next/image";
const LoginForm = () => {
    const { handleSubmit, submitHandler, register, errors } = useLoginSubmit();
    return (
        <>
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
                        <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                        <div className="row">
                            <div className="col-lg-6 pr-30 d-none d-lg-block">
                            <Image
                                alt=""
                                className="border-radius-15"
                                src="/assets/imgs/page/login-1.png"
                                width={400}
                                height={400}
                            />
                            </div>
                            <div className="col-lg-6 col-md-8">
                                <div className="login_wrap widget-taber-content background-white">
                                    <div className="padding_eight_all bg-white">
                                        <div className="heading_s1">
                                            <h1 className="mb-5">Login</h1>
                                            <p className="mb-30">
                                            Don&apos;t have an account?{" "}
                                            <Link href="/auth/register">Sign up</Link>
                                            </p>
                                        </div>
                                        <form    onSubmit={handleSubmit(submitHandler)}  >
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
                                                    placeholder="Username or Email *"
                                                    required
                                                    type="text"
                                                />
                                                <Error errorName={errors.email} />

                                            </div>

                                            <div className="form-group">
                                                <input
                                                    {...register("password", {
                                                        required: "Password is required",
                                                    })} 
                                                    name="password"
                                                    placeholder="Your password *"
                                                    required
                                                    type="password"
                                                />
                                                <Error errorName={errors.password} />

                                            </div>
                                        
                                         
                                            <div className="form-group">
                                                <button
                                                    className="btn btn-heading btn-block hover-up"
                                                    name="login"
                                                    type="submit">
                                                    Log in
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

        </>
    );

}


export default LoginForm;