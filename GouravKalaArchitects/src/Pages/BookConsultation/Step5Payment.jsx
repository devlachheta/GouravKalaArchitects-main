import React, { useState } from "react";
import {
    FiArrowLeft,
    FiArrowRight,
    FiCheck,
} from "react-icons/fi";
import "../../styles/Step5Payment.css";

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

    const [refundPolicyAccepted, setRefundPolicyAccepted] =
        useState(false);

    const [policyError, setPolicyError] = useState("");

    const handleProceedToPayment = () => {

        if (!refundPolicyAccepted) {
            setPolicyError(
                "Please confirm that you understand the cancellation and refund policy."
            );
            return;
        }

        setPolicyError("");

        handlePayment();
    };

    const handlePolicyChange = (event) => {

        setRefundPolicyAccepted(
            event.target.checked
        );

        if (event.target.checked) {
            setPolicyError("");
        }
    };

    return (
        <section className="bc-step-section">

            {/* PROGRESS */}
            <div className="consultation-progress">

                {renderProgressStep("01", "CONSULTATION", 1)}
                {renderProgressStep("02", "DATE & TIME", 2)}
                {renderProgressStep("03", "YOUR DETAILS", 3)}
                {renderProgressStep("04", "REVIEW", 4)}
                {renderProgressStep("05", "PAYMENT", 5)}
                {renderProgressStep("06", "CONFIRMATION", 6)}

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


                        {/* CANCELLATION & REFUND POLICY */}

                        <div className="bc-refund-policy">

                            <span className="bc-refund-policy-title">
                                CANCELLATION & REFUND POLICY
                            </span>

                            <p>
                                Once payment has been successfully
                                completed, the consultation fee is
                                <strong> non-refundable</strong>.
                                Cancelling a confirmed booking does
                                not qualify for a refund.
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


                    {/* POLICY CHECKBOX */}

                    <label className="bc-refund-checkbox">

                        <input
                            type="checkbox"
                            checked={refundPolicyAccepted}
                            onChange={handlePolicyChange}
                            disabled={processingPayment}
                        />

                        <span>
                            I understand that the consultation
                            fee is non-refundable once payment
                            is completed.
                        </span>

                    </label>


                    {policyError && (
                        <div className="bc-policy-error">
                            {policyError}
                        </div>
                    )}


                    <button
                        type="button"
                        className="bc-pay-button"
                        onClick={handleProceedToPayment}
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

            <div className="consultation-step-footer single-button">

                <button
                    type="button"
                    className="consultation-back-button"
                    onClick={handlePreviousStep}
                    disabled={processingPayment}
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

export default Step5Payment;