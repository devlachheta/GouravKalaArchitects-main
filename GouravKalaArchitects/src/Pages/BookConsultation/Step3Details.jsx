import React from "react";

import {
    FiArrowLeft,
    FiArrowRight,
    FiCalendar,
} from "react-icons/fi";

import "../../styles/Step3Details.css";
import "../../styles/BookConsultation.css";

function Step3Details({
    renderProgressStep,
    customerDetails,
    handleCustomerChange,

    selectedConsultation,
    selectedDate,
    selectedTime,

    formatDisplayDate,

    setStep,

    formError,

    handlePreviousStep,
    handleNextStep,
}) {
    return (
        <section className="bc-step-section bc-step-three">

            {/* =====================================================
                PROGRESS
            ===================================================== */}

            <div className="consultation-progress">
                {renderProgressStep("01", "CONSULTATION", 1)}
                {renderProgressStep("02", "DATE & TIME", 2)}
                {renderProgressStep("03", "YOUR DETAILS", 3)}
                {renderProgressStep("04", "REVIEW", 4)}
                {renderProgressStep("05", "PAYMENT", 5)}
                {renderProgressStep("06", "CONFIRMATION", 6)}
            </div>

            {/* =====================================================
                HEADING
            ===================================================== */}

            <div className="bc-step-three-heading">


                <h2>
                    Tell Us About Yourself
                </h2>

                <p>
                    Please provide your details so we can
                    prepare for your consultation.
                </p>

            </div>


            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <div className="bc-details-layout">


                {/* =================================================
                    DETAILS FORM
                ================================================= */}

                <div className="bc-details-form">


                    {/* FORM HEADER */}

                    <div className="bc-details-heading">

                        <span className="bc-eyebrow">
                            YOUR DETAILS
                        </span>

                        <h3>
                            Let&apos;s get to know you
                        </h3>

                    </div>


                    {/* =================================================
                        FULL NAME
                    ================================================= */}

                    <div className="bc-form-group">

                        <label htmlFor="customer_name">
                            FULL NAME *
                        </label>

                        <input
                            id="customer_name"
                            name="customer_name"
                            type="text"
                            placeholder="Your full name"
                            value={
                                customerDetails?.customer_name || ""
                            }
                            onChange={handleCustomerChange}
                        />

                    </div>


                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <div className="bc-form-group">

                        <label htmlFor="customer_email">
                            EMAIL ADDRESS *
                        </label>

                        <input
                            id="customer_email"
                            name="customer_email"
                            type="email"
                            placeholder="your@email.com"
                            value={
                                customerDetails?.customer_email || ""
                            }
                            onChange={handleCustomerChange}
                        />

                    </div>


                    {/* =================================================
                        PHONE
                    ================================================= */}

                    <div className="bc-form-group">

                        <label htmlFor="customer_phone">
                            PHONE NUMBER *
                        </label>

                        <input
                            id="customer_phone"
                            name="customer_phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={
                                customerDetails?.customer_phone || ""
                            }
                            onChange={handleCustomerChange}
                        />

                    </div>

                </div>


                {/* =================================================
                    CONSULTATION SUMMARY
                ================================================= */}

                <aside className="bc-details-summary">


                    {/* SUMMARY HEADER */}

                    <div className="bc-summary-header">

                        <span className="bc-summary-label">
                            YOUR CONSULTATION
                        </span>

                        <div className="bc-summary-indicator">
                            <span></span>
                        </div>

                    </div>


                    {/* CONSULTATION TITLE */}

                    <h3>
                        {selectedConsultation?.duration}
                        -Minute Consultation
                    </h3>


                    {/* PRICE */}

                    <div className="bc-summary-price">

                        ₹
                        {Number(
                            selectedConsultation?.price || 0
                        ).toLocaleString("en-IN")}

                    </div>


                    <div className="bc-summary-divider"></div>


                    {/* DATE */}

                    <div className="bc-summary-item">

                        <span>
                            DATE
                        </span>

                        <strong>
                            {selectedDate
                                ? formatDisplayDate(selectedDate)
                                : "Not selected"}
                        </strong>

                    </div>


                    {/* TIME */}

                    <div className="bc-summary-item">

                        <span>
                            TIME
                        </span>

                        <strong>
                            {selectedTime || "Not selected"}
                        </strong>

                    </div>


                    <div className="bc-summary-divider"></div>


                    {/* CHANGE DATE */}

                    <button
                        type="button"
                        className="bc-change-button"
                        onClick={() => setStep(2)}
                    >

                        <span>
                            CHANGE DATE &amp; TIME
                        </span>

                        <FiCalendar />

                    </button>

                </aside>

            </div>


            {/* =====================================================
                FORM ERROR
            ===================================================== */}

            {formError && (
                <div className="bc-form-error">
                    {formError}
                </div>
            )}


            {/* =====================================================
                NAVIGATION
            ===================================================== */}

            <div className="consultation-step-footer">

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

                <button
                    type="button"
                    className="consultation-next-button"
                    onClick={handleNextStep}
                >
                    <span>
                        NEXT
                    </span>

                    <FiArrowRight />
                </button>

            </div>
        </section>
    );
}


export default Step3Details;
