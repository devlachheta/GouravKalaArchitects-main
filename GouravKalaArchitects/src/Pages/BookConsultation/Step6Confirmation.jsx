import React from "react";
import {
    FiArrowLeft,
    FiArrowRight,
    FiCheck,
} from "react-icons/fi";

import "../../styles/Step6Confirmation.css";

function Step6Confirmation({
    renderProgressStep,
    booking,
    selectedConsultation,
    selectedDate,
    selectedTime,
    formatPrice,
    formatDisplayDate,
    formatTime,
    handlePreviousStep,
}) {
    return (
        <section className="bc-step-section bc-confirmation-section bc-step-six">

            {/* =================================================
                PROGRESS
            ================================================= */}

            <div className="consultation-progress">

                {renderProgressStep(
                    "01",
                    "CONSULTATION",
                    1
                )}

                {renderProgressStep(
                    "02",
                    "DATE & TIME",
                    2
                )}

                {renderProgressStep(
                    "03",
                    "YOUR DETAILS",
                    3
                )}

                {renderProgressStep(
                    "04",
                    "REVIEW",
                    4
                )}

                {renderProgressStep(
                    "05",
                    "PAYMENT",
                    5
                )}

                {renderProgressStep(
                    "06",
                    "CONFIRMATION",
                    6
                )}

            </div>


            {/* =================================================
                CONFIRMATION
            ================================================= */}

            <div className="bc-confirmation">

                <div className="bc-confirmation-icon">
                    <FiCheck />
                </div>


                <span className="bc-eyebrow">
                    BOOKING CONFIRMED
                </span>


                <h2>
                    You're All Set.
                </h2>


                <p className="bc-confirmation-intro">
                    Your consultation has been successfully booked.
                    We look forward to speaking with you and discussing
                    your project.
                </p>


                {/* =================================================
                    BOOKING DETAILS
                ================================================= */}

                <div className="bc-confirmation-card">

                    <div className="bc-confirmation-card-header">

                        <div>

                            <span className="bc-eyebrow">
                                YOUR CONSULTATION
                            </span>

                            <h3>
                                {selectedConsultation?.title ||
                                    `${selectedConsultation?.duration}-Minute Consultation`}
                            </h3>

                        </div>


                        <span className="bc-confirmation-status">
                            CONFIRMED
                        </span>

                    </div>


                    <div className="bc-confirmation-details">

                        {/* BOOKING ID + DATE */}

                        <div className="bc-confirmation-detail">

                            <span>
                                BOOKING ID
                            </span>

                            <strong>
                                #{booking?.id || "—"}
                            </strong>


                            <span>
                                DATE
                            </span>

                            <strong>
                                {formatDisplayDate(
                                    selectedDate
                                )}
                            </strong>

                        </div>


                        {/* TIME */}

                        <div className="bc-confirmation-detail">

                            <span>
                                TIME
                            </span>

                            <strong>
                                {formatTime(
                                    selectedTime
                                )}
                            </strong>

                        </div>


                        {/* DURATION */}

                        <div className="bc-confirmation-detail">

                            <span>
                                DURATION
                            </span>

                            <strong>
                                {selectedConsultation?.duration}
                                {" "}Minutes
                            </strong>

                        </div>


                        {/* AMOUNT PAID */}

                        <div className="bc-confirmation-detail">

                            <span>
                                AMOUNT PAID
                            </span>

                            <strong>
                                {formatPrice(
                                    selectedConsultation?.price
                                )}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    NEXT STEPS
                ================================================= */}

                <div className="bc-confirmation-next">

                    <span className="bc-eyebrow">
                        WHAT HAPPENS NEXT
                    </span>

                    <p>
                        Your booking confirmation and invoice have been
                        sent to your email address. Please keep an eye
                        on your inbox for your consultation details.
                    </p>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="bc-confirmation-actions">

                    {/* BACK TO HOME */}

                    <button
                        type="button"
                        className="bc-confirmation-home"
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        Back to Home
                    </button>


                    {/* CONTACT US */}

                    <button
                        type="button"
                        className="bc-confirmation-contact"
                        onClick={() => {
                            window.location.href = "/contact";
                        }}
                    >
                        Contact Us

                        <FiArrowRight />

                    </button>

                </div>

            </div>


            {/* =================================================
                STEP NAVIGATION
            ================================================= */}

            <div className="consultation-step-footer single-button">

                <button
                    type="button"
                    className="consultation-back-button"
                    onClick={handlePreviousStep}
                >
                    <FiArrowLeft />

                    <span>
                        BACK
                    </span>

                </button>

            </div>

        </section>
    );
}

export default Step6Confirmation;