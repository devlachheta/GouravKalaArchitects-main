import { useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../services/api";

import "../../src/App.css";


function ResetPassword() {

  const navigate = useNavigate();

  const {
    uid,
    token
  } = useParams();


  // -----------------------------------------
  // Form State
  // -----------------------------------------

  const [password, setPassword] = useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");


  // -----------------------------------------
  // UI State
  // -----------------------------------------

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  // -----------------------------------------
  // Submit
  // -----------------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");

    setLoading(true);


    try {

      const response = await api.post(
        `auth/reset-password/${uid}/${token}/`,
        {
          password,
          confirm_password:
            confirmPassword,
        }
      );


      setSuccess(
        response.data.detail ||
        "Password has been reset successfully."
      );


      setPassword("");

      setConfirmPassword("");


      // ---------------------------------
      // Go back to login
      // ---------------------------------

      setTimeout(() => {

        navigate("/login");

      }, 1500);


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
          "Unable to reset password. Please try again."
        );

      }

    } finally {

      setLoading(false);

    }
  };


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
            CREATE NEW PASSWORD
          </span>

        </div>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
        >


          {/* New Password */}

          <div className="form-group">

            <label>
              New Password
            </label>


            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Enter new password"
              required
            />

          </div>


          {/* Confirm Password */}

          <div className="form-group">

            <label>
              Confirm Password
            </label>


            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm new password"
              required
            />

          </div>


          {/* Error */}

          {error && (

            <div className="login-error">

              {error}

            </div>

          )}


          {/* Success */}

          {success && (

            <div className="forgot-password-success">

              {success}

            </div>

          )}


          {/* Reset */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Resetting..."
              : "Reset Password"
            }

          </button>


          {/* Back */}

          {!success && (

            <div className="back-to-login">

              <Link to="/login">

                ← Back to Login

              </Link>

            </div>

          )}


        </form>


      </div>

    </div>

  );
}


export default ResetPassword;