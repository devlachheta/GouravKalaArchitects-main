import React from "react";
import {
    FiArrowRight,
    FiCheck,
} from "react-icons/fi";

function Step6Confirmation({
    renderProgressStep,
    selectedConsultation,
    selectedDate,
    selectedTime,
    formatPrice,
    formatDisplayDate,
    formatTime,
}) {
    return (
        <section className="bc-step-section bc-confirmation-section">

            {/* PROGRESS */}

            <div className="bc-progress">

                {renderProgressStep(
                    "01",
                    "Consultation",
                    1
                )}

                {renderProgressStep(
                    "02",
                    "Date & Time",
                    2
                )}

                {renderProgressStep(
                    "03",
                    "Your Details",
                    3
                )}

                {renderProgressStep(
                    "04",
                    "Review",
                    4
                )}

            </div>


            {/* CONFIRMATION */}

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


                {/* BOOKING DETAILS */}

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

                        <div className="bc-confirmation-detail">

                            <span>
                                DATE
                            </span>

                            <strong>
                                {formatDisplayDate(
                                    selectedDate
                                )}
                            </strong>

                        </div>


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


                        <div className="bc-confirmation-detail">

                            <span>
                                DURATION
                            </span>

                            <strong>
                                {selectedConsultation?.duration}
                                {" "}Minutes
                            </strong>

                        </div>


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


                {/* NEXT STEPS */}

                <div className="bc-confirmation-next">

                    <span className="bc-eyebrow">
                        WHAT HAPPENS NEXT
                    </span>

                    <p>
                        A confirmation with your consultation details
                        will be sent to your email. Please keep an eye
                        on your inbox before the scheduled appointment.
                    </p>

                </div>


                {/* ACTIONS */}

                <div className="bc-confirmation-actions">

                    <button
                        type="button"
                        className="bc-confirmation-home"
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        Back to Home
                    </button>


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

        </section>
    );
}

export default Step6Confirmation;