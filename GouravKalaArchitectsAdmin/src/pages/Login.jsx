import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../../src/App.css";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("auth/login/", {
                username,
                password,
            });

            const { access, refresh } = response.data;

            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            navigate("/dashboard");
        } catch (error) {
            console.error(error);

            if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else {
                setError("Unable to login. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <h1>GKA</h1>

                    <p>Gourav Kala Architects</p>

                    <span>ADMIN CMS</span>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Login;