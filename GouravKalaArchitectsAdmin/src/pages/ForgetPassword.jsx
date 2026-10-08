import { useState } from "react";

import {
  Link,
} from "react-router-dom";

import api from "../services/api";

import "../../src/App.css";


function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);


  // -----------------------------------------
  // Submit
  // -----------------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);


    try {

      await api.post(
        "auth/forgot-password/",
        {
          email,
        }
      );


      // ---------------------------------
      // Show success message
      // ---------------------------------

      setIsSubmitted(true);


    } catch (error) {

      console.error(error);


      if (
        error.response?.data?.detail
      ) {

        setError(
          error.response.data.detail
        );

      } else {

        setError(
          "Unable to process your request. Please try again."
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
            RESET PASSWORD
          </span>

        </div>


        {/* Form or Success Message */}

        {isSubmitted ? (
          <div style={{ textAlign: "center", margin: "20px 0", color: "#333" }}>
            <p style={{ marginBottom: "20px", fontSize: "16px", lineHeight: "1.5" }}>
              If an account exists for <strong>{email}</strong>, a password reset link has been sent to it.
            </p>
            <Link to="/login" style={{ color: "#555", textDecoration: "none", fontWeight: "bold" }}>
              ← Back to Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
          >


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


          {/* Error */}

          {error && (

            <div className="login-error">

              {error}

            </div>

          )}


          {/* Continue */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Checking..."
              : "Continue"
            }

          </button>


          {/* Back */}

          <div className="back-to-login">

            <Link to="/login">

              ← Back to Login

            </Link>

          </div>


          </form>
        )}


      </div>

    </div>

  );
}


export default ForgotPassword;