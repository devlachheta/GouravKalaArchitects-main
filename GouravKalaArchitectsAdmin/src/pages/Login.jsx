import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

import "../../src/App.css";


function Login() {

    const navigate = useNavigate();


    // -----------------------------------------
    // Form State
    // -----------------------------------------

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    // -----------------------------------------
    // UI State
    // -----------------------------------------

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // -----------------------------------------
    // Login
    // -----------------------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        try {

            const response = await api.post(
                "auth/login/",
                {
                    email,
                    password,
                }
            );


            const {
                access,
                refresh
            } = response.data;


            localStorage.setItem(
                "access_token",
                access
            );


            localStorage.setItem(
                "refresh_token",
                refresh
            );


            navigate("/dashboard");


        } catch (error) {

            console.error(error);


            if (
                error.response?.data?.detail
            ) {

                setError(
                    error.response.data.detail
                );

            } else if (
                error.response?.data?.non_field_errors
            ) {

                setError(
                    error.response.data
                        .non_field_errors[0]
                );

            } else {

                setError(
                    "Unable to login. Please try again."
                );
            }

        } finally {

            setLoading(false);

        }
    };


    // -----------------------------------------
    // UI
    // -----------------------------------------

    return (

        <div className="login-page">

            <div className="login-card">


                {/* Header */}

                <div className="login-header">

                    <h1>
                        GKA
                    </h1>


                    <p>
                        Gourav Kala Architects
                    </p>


                    <span>
                        ADMIN CMS
                    </span>

                </div>


                {/* Login Form */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* Email */}

                    <div className="form-group">

                        <label>
                            Email Address
                        </label>


                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your email address"
                            required
                        />

                    </div>


                    {/* Password */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>


                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your password"
                            required
                        />


                        {/* Forgot Password */}

                        <div className="forgot-password">

                            <Link
                                to="/forgot-password"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="login-error">

                            {error}

                        </div>

                    )}


                    {/* Login Button */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>


                </form>


            </div>

        </div>

    );
}


export default Login;