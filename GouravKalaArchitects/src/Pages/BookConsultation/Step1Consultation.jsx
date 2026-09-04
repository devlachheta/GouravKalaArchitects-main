import React from "react";
import {
    FiArrowLeft,
    FiArrowRight,
    FiCheck,
} from "react-icons/fi";

function Step1Consultation({
    consultations,
    selectedConsultation,
    setSelectedConsultation,
    loadingConsultations,
    consultationError,
    handleNextStep,
    handlePreviousStep,
}) {
    const consultationFeatures = {
        15: [
            "Quick project discussion",
            "Ideal for initial questions and guidance",
        ],
        30: [
            "Detailed project discussion",
            "Ideal for discussing design requirements, ideas and planning",
        ],
    };


    const handleSelect = (consultation) => {
        setSelectedConsultation(consultation);
    };

    const getFeatures = (duration) => {
        return (
            consultationFeatures[duration] || [
                "One-on-one consultation session",
                "Discuss your requirements and questions",
            ]
        );
    };


    return (
        <section className="bc-step-section">

            {/* =========================================
                PROGRESS
            ========================================= */}

            <div className="bc-progress">

                <div className="bc-progress-step active">
                    <span>01</span>
                    <p>Consultation</p>
                </div>

                <div className="bc-progress-line" />

                <div className="bc-progress-step">
                    <span>02</span>
                    <p>Date &amp; Time</p>
                </div>

                <div className="bc-progress-line" />

                <div className="bc-progress-step">
                    <span>03</span>
                    <p>Your Details</p>
                </div>

                <div className="bc-progress-line" />

                <div className="bc-progress-step">
                    <span>04</span>
                    <p>Review</p>
                </div>

                <div className="bc-progress-line" />

                <div className="bc-progress-step">
                    <span>05</span>
                    <p>Payment</p>
                </div>

                <div className="bc-progress-line" />

                <div className="bc-progress-step">
                    <span>06</span>
                    <p>Confirmation</p>
                </div>

            </div>


            {/* =========================================
                HEADING
            ========================================= */}

            <div className="bc-section-heading">

                <span className="bc-eyebrow">
                    CONSULTATION
                </span>

                <h2>
                    Choose Your Consultation
                </h2>

                <p>
                    Select the consultation duration that
                    best suits your requirements.
                </p>

            </div>


            {/* =========================================
                CONSULTATION OPTIONS
            ========================================= */}

            {loadingConsultations && (
                <div className="bc-message">
                    Loading consultation options...
                </div>
            )}

            {!loadingConsultations &&
                consultationError && (
                    <div className="bc-message bc-error">
                        {consultationError}
                    </div>
                )}

            {!loadingConsultations &&
                !consultationError &&
                consultations.length === 0 && (
                    <div className="bc-message">
                        No consultation options are
                        currently available.
                    </div>
                )}

            {!loadingConsultations &&
                !consultationError &&
                consultations.length > 0 && (

                    <div className="bc-consultation-grid">

                        {consultations.map((consultation) => {

                            const isSelected =
                                selectedConsultation?.id ===
                                consultation.id;

                            const features =
                                getFeatures(
                                    consultation.duration
                                );

                            return (
                                <div
                                    key={consultation.id}
                                    className={`bc-consultation-card ${isSelected
                                        ? "selected"
                                        : ""
                                        }`}
                                >

                                    {/* RADIO */}

                                    <button
                                        type="button"
                                        className="bc-card-select-area"
                                        onClick={() =>
                                            handleSelect(
                                                consultation
                                            )
                                        }
                                        aria-label={`Select ${consultation.title}`}
                                    >

                                        <span
                                            className={`bc-card-radio ${isSelected
                                                ? "active"
                                                : ""
                                                }`}
                                        >
                                            {isSelected && (
                                                <span />
                                            )}
                                        </span>

                                    </button>



                                    {/* CONTENT */}

                                    <div className="bc-card-content">

                                        <div className="bc-card-duration">
                                            {consultation.duration}
                                            -Minute Consultation
                                        </div>

                                        <h3>
                                            {consultation.title ||
                                                "1-on-1 Consultation"}
                                        </h3>


                                        {/* PRICE */}

                                        <div className="bc-card-price">
                                            ₹
                                            {Number(
                                                consultation.price
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </div>


                                        {/* FEATURES */}

                                        <div className="bc-card-features">

                                            {features.map(
                                                (
                                                    feature,
                                                    index
                                                ) => (
                                                    <div
                                                        key={
                                                            index
                                                        }
                                                        className="bc-card-feature"
                                                    >
                                                        <FiCheck />

                                                        <span>
                                                            {
                                                                feature
                                                            }
                                                        </span>
                                                    </div>
                                                )
                                            )}

                                        </div>


                                        {/* SELECT BUTTON */}

                                        <button
                                            type="button"
                                            className="bc-card-button"
                                            onClick={() =>
                                                handleSelect(
                                                    consultation
                                                )
                                            }
                                        >
                                            {isSelected
                                                ? "Selected"
                                                : "Select"}

                                            {isSelected && (
                                                <FiCheck />
                                            )}
                                        </button>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}


            {/* =========================================
                NAVIGATION
            ========================================= */}

            <div className="bc-navigation">

                <button
                    type="button"
                    className="bc-back-button"
                    onClick={handlePreviousStep}
                >
                    <FiArrowLeft />
                    Back
                </button>


                <button
                    type="button"
                    className="bc-next-button"
                    disabled={!selectedConsultation}
                    onClick={handleNextStep}
                >
                    Next: Select Date &amp; Time
                    <FiArrowRight />
                </button>

            </div>

        </section>
    );
}

export default Step1Consultation;