import React from "react";
import {
    FiArrowLeft,
    FiArrowRight,
    FiCheck,
} from "react-icons/fi";

function Step5Payment({
    renderProgressStep,
    selectedConsultation,
    selectedDate,
    selectedTime,
    formatPrice,
    formatDisplayDate,
    formatTime,
    processingPayment,
    handlePayment,
    paymentError,
    handlePreviousStep,
}) {
    return (
        <section className="bc-step-section">

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


            {/* HEADING */}

            <div className="bc-section-heading">

                <span className="bc-eyebrow">
                    STEP 05
                </span>

                <h2>
                    Complete Your Payment
                </h2>

                <p>
                    Secure your consultation by completing
                    the payment below.
                </p>

            </div>


            {/* PAYMENT LAYOUT */}

            <div className="bc-payment-layout">

                {/* LEFT */}

                <div className="bc-payment-content">

                    <div className="bc-payment-card">

                        <span className="bc-eyebrow">
                            SECURE PAYMENT
                        </span>

                        <h3>
                            Your consultation is almost booked.
                        </h3>

                        <p className="bc-payment-description">
                            Complete the payment to confirm your
                            consultation appointment. You will be
                            redirected to Razorpay's secure payment
                            gateway.
                        </p>


                        {/* PAYMENT METHOD */}

                        <div className="bc-payment-method">

                            <div className="bc-payment-method-icon">
                                ₹
                            </div>

                            <div>

                                <strong>
                                    Razorpay
                                </strong>

                                <span>
                                    Secure online payment
                                </span>

                            </div>

                        </div>


                        {/* SECURITY */}

                        <div className="bc-security-info">

                            <div className="bc-security-item">
                                <FiCheck />

                                <span>
                                    Secure payment gateway
                                </span>
                            </div>

                            <div className="bc-security-item">
                                <FiCheck />

                                <span>
                                    Your payment information is protected
                                </span>
                            </div>

                            <div className="bc-security-item">
                                <FiCheck />

                                <span>
                                    Instant booking confirmation
                                </span>
                            </div>

                        </div>


                        <div className="bc-payment-gateway-note">

                            <span>
                                PAYMENT PROCESSING
                            </span>

                            <p>
                                Clicking the payment button will open
                                Razorpay in a secure payment window.
                            </p>

                        </div>

                    </div>

                </div>


                {/* RIGHT SUMMARY */}

                <aside className="bc-payment-summary">

                    <span className="bc-summary-label">
                        PAYMENT SUMMARY
                    </span>

                    <h3>
                        {selectedConsultation?.duration}
                        -Minute Consultation
                    </h3>


                    <div className="bc-payment-summary-item">

                        <span>
                            DATE
                        </span>

                        <strong>
                            {formatDisplayDate(
                                selectedDate
                            )}
                        </strong>

                    </div>


                    <div className="bc-payment-summary-item">

                        <span>
                            TIME
                        </span>

                        <strong>
                            {formatTime(
                                selectedTime
                            )}
                        </strong>

                    </div>


                    <div className="bc-summary-divider" />


                    <div className="bc-payment-total">

                        <span>
                            TOTAL TO PAY
                        </span>

                        <strong>
                            {formatPrice(
                                selectedConsultation?.price
                            )}
                        </strong>

                    </div>


                    <button
                        type="button"
                        className="bc-pay-button"
                        onClick={handlePayment}
                        disabled={processingPayment}
                    >
                        {processingPayment
                            ? "Processing..."
                            : `Pay ${formatPrice(
                                selectedConsultation?.price
                            )} Securely`}

                        {!processingPayment && (
                            <FiArrowRight />
                        )}
                    </button>


                    {paymentError && (
                        <div className="bc-payment-error">
                            {paymentError}
                        </div>
                    )}


                    <p className="bc-secure-note">
                        By proceeding, you agree to the consultation
                        booking terms and payment conditions.
                    </p>

                </aside>

            </div>


            {/* NAVIGATION */}

            <div className="bc-navigation">

                <button
                    type="button"
                    className="bc-back-button"
                    onClick={handlePreviousStep}
                >
                    <FiArrowLeft />
                    Back
                </button>

            </div>

        </section>
    );
}

export default Step5Payment;