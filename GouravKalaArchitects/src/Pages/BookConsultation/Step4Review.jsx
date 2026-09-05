import React from "react";

import {
    FiArrowLeft,
    FiArrowRight,
} from "react-icons/fi";

import "../../styles/Step4Review.css";


function Step4Review({
    selectedConsultation,
    selectedDate,
    selectedTime,
    customerDetails,

    formatPrice,
    formatDisplayDate,
    formatTime,

    setStep,
    handlePreviousStep,
}) {
    return (
        <section className="bc-step-section bc-step-four">


            {/* =================================================
                PROGRESS BAR
            ================================================= */}

            <div className="consultation-progress">


                {/* STEP 01 */}

                <div className="progress-step completed">

                    <span className="progress-number">
                        01
                    </span>

                    <span className="progress-label">
                        CONSULTATION
                    </span>

                </div>


                <div className="progress-line"></div>


                {/* STEP 02 */}

                <div className="progress-step completed">

                    <span className="progress-number">
                        02
                    </span>

                    <span className="progress-label">
                        DATE &amp; TIME
                    </span>

                </div>


                <div className="progress-line"></div>


                {/* STEP 03 */}

                <div className="progress-step completed">

                    <span className="progress-number">
                        03
                    </span>

                    <span className="progress-label">
                        YOUR DETAILS
                    </span>

                </div>


                <div className="progress-line"></div>


                {/* STEP 04 */}

                <div className="progress-step active">

                    <span className="progress-number">
                        04
                    </span>

                    <span className="progress-label">
                        REVIEW
                    </span>

                </div>

            </div>



            {/* =================================================
                HEADING
            ================================================= */}

            <div className="bc-step-four-heading">

                <h2>
                    Review Your Booking
                </h2>

                <p>
                    Please review your consultation details
                    before proceeding to secure payment.
                </p>

            </div>



            {/* =================================================
                REVIEW LAYOUT
            ================================================= */}

            <div className="bc-review-layout">


                {/* =================================================
                    LEFT CONTENT
                ================================================= */}

                <div className="bc-review-content">


                    {/* =================================================
                        CONSULTATION CARD
                    ================================================= */}

                    <div className="bc-review-card">


                        <div className="bc-review-card-header">

                            <div>

                                <span className="bc-eyebrow">
                                    CONSULTATION
                                </span>

                                <h3>
                                    {selectedConsultation?.title ||
                                        `${selectedConsultation?.duration}-Minute Consultation`}
                                </h3>

                            </div>


                            <button
                                type="button"
                                className="bc-review-edit"
                                onClick={() => setStep(1)}
                            >
                                EDIT
                            </button>

                        </div>



                        <div className="bc-review-info-grid">


                            <div className="bc-review-info">

                                <span>
                                    DURATION
                                </span>

                                <strong>
                                    {selectedConsultation?.duration}{" "}
                                    Minutes
                                </strong>

                            </div>



                            <div className="bc-review-info">

                                <span>
                                    PRICE
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
                        DATE & TIME CARD
                    ================================================= */}

                    <div className="bc-review-card">


                        <div className="bc-review-card-header">

                            <div>

                                <span className="bc-eyebrow">
                                    DATE &amp; TIME
                                </span>

                                <h3>
                                    Your Scheduled Consultation
                                </h3>

                            </div>


                            <button
                                type="button"
                                className="bc-review-edit"
                                onClick={() => setStep(2)}
                            >
                                EDIT
                            </button>

                        </div>



                        <div className="bc-review-info-grid">


                            <div className="bc-review-info">

                                <span>
                                    DATE
                                </span>

                                <strong>
                                    {formatDisplayDate(
                                        selectedDate
                                    )}
                                </strong>

                            </div>



                            <div className="bc-review-info">

                                <span>
                                    TIME
                                </span>

                                <strong>
                                    {formatTime(
                                        selectedTime
                                    )}
                                </strong>

                            </div>


                        </div>

                    </div>



                    {/* =================================================
                        CUSTOMER DETAILS CARD
                    ================================================= */}

                    <div className="bc-review-card">


                        <div className="bc-review-card-header">

                            <div>

                                <span className="bc-eyebrow">
                                    YOUR DETAILS
                                </span>

                                <h3>
                                    Contact Information
                                </h3>

                            </div>


                            <button
                                type="button"
                                className="bc-review-edit"
                                onClick={() => setStep(3)}
                            >
                                EDIT
                            </button>

                        </div>



                        <div className="bc-review-details">


                            <div className="bc-review-detail-row">

                                <span>
                                    FULL NAME
                                </span>

                                <strong>
                                    {customerDetails?.customer_name ||
                                        "Not provided"}
                                </strong>

                            </div>



                            <div className="bc-review-detail-row">

                                <span>
                                    EMAIL ADDRESS
                                </span>

                                <strong>
                                    {customerDetails?.customer_email ||
                                        "Not provided"}
                                </strong>

                            </div>



                            <div className="bc-review-detail-row">

                                <span>
                                    PHONE NUMBER
                                </span>

                                <strong>
                                    {customerDetails?.customer_phone ||
                                        "Not provided"}
                                </strong>

                            </div>


                        </div>

                    </div>

                </div>



                {/* =================================================
                    RIGHT SUMMARY
                ================================================= */}

                <aside className="bc-review-summary">


                    <div className="bc-review-summary-header">

                        <span className="bc-summary-label">
                            BOOKING SUMMARY
                        </span>


                        <div className="bc-review-summary-indicator">
                            <span></span>
                        </div>

                    </div>



                    <h3>
                        {selectedConsultation?.duration}
                        -Minute Consultation
                    </h3>



                    {/* DATE */}

                    <div className="bc-review-summary-item">

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

                    <div className="bc-review-summary-item">

                        <span>
                            TIME
                        </span>

                        <strong>
                            {formatTime(
                                selectedTime
                            )}
                        </strong>

                    </div>



                    {/* TOTAL */}

                    <div className="bc-review-total">

                        <span>
                            TOTAL
                        </span>

                        <strong>
                            {formatPrice(
                                selectedConsultation?.price
                            )}
                        </strong>

                    </div>



                    {/* PAYMENT NOTE */}

                    <p className="bc-payment-note">
                        You will be securely redirected to
                        Razorpay to complete your payment.
                    </p>



                    {/* PAYMENT BUTTON */}

                    <button
                        type="button"
                        className="bc-payment-button"
                        onClick={() => setStep(5)}
                    >
                        <span>
                            PROCEED TO SECURE PAYMENT
                        </span>

                        <FiArrowRight />

                    </button>


                </aside>

            </div>



            {/* =================================================
                NAVIGATION
            ================================================= */}

            <div className="bc-navigation">


                <button
                    type="button"
                    className="bc-back-button"
                    onClick={handlePreviousStep}
                >

                    <FiArrowLeft />

                    <span>
                        BACK
                    </span>

                </button>



                <button
                    type="button"
                    className="bc-next-button"
                    onClick={() => setStep(5)}
                >

                    <span>
                        PROCEED TO PAYMENT
                    </span>

                    <FiArrowRight />

                </button>


            </div>


        </section>
    );
}


export default Step4Review;


// import React from "react";
// import {
//     FiArrowLeft,
//     FiArrowRight,
// } from "react-icons/fi";

// function Step4Review({
//     renderProgressStep,
//     selectedConsultation,
//     selectedDate,
//     selectedTime,
//     customerDetails,
//     formatPrice,
//     formatDisplayDate,
//     formatTime,
//     setStep,
//     handlePreviousStep,
// }) {
//     return (
//         <section className="bc-step-section">

//             {/* PROGRESS */}

//             <div className="bc-progress">

//                 {renderProgressStep(
//                     "01",
//                     "Consultation",
//                     1
//                 )}

//                 {renderProgressStep(
//                     "02",
//                     "Date & Time",
//                     2
//                 )}

//                 {renderProgressStep(
//                     "03",
//                     "Your Details",
//                     3
//                 )}

//                 {renderProgressStep(
//                     "04",
//                     "Review",
//                     4
//                 )}

//             </div>


//             {/* HEADING */}

//             <div className="bc-section-heading">

//                 <span className="bc-eyebrow">
//                     STEP 04
//                 </span>

//                 <h2>
//                     Review Your Booking
//                 </h2>

//                 <p>
//                     Please review your consultation details
//                     before proceeding to secure payment.
//                 </p>

//             </div>


//             {/* REVIEW LAYOUT */}

//             <div className="bc-review-layout">

//                 <div className="bc-review-content">

//                     {/* CONSULTATION */}

//                     <div className="bc-review-card">

//                         <div className="bc-review-card-header">

//                             <div>

//                                 <span className="bc-eyebrow">
//                                     CONSULTATION
//                                 </span>

//                                 <h3>
//                                     {selectedConsultation?.title ||
//                                         `${selectedConsultation?.duration}-Minute Consultation`}
//                                 </h3>

//                             </div>

//                             <button
//                                 type="button"
//                                 className="bc-review-edit"
//                                 onClick={() =>
//                                     setStep(1)
//                                 }
//                             >
//                                 Edit
//                             </button>

//                         </div>


//                         <div className="bc-review-info-grid">

//                             <div className="bc-review-info">

//                                 <span>
//                                     DURATION
//                                 </span>

//                                 <strong>
//                                     {
//                                         selectedConsultation?.duration
//                                     }{" "}
//                                     Minutes
//                                 </strong>

//                             </div>


//                             <div className="bc-review-info">

//                                 <span>
//                                     PRICE
//                                 </span>

//                                 <strong>
//                                     {formatPrice(
//                                         selectedConsultation?.price
//                                     )}
//                                 </strong>

//                             </div>

//                         </div>

//                     </div>


//                     {/* DATE & TIME */}

//                     <div className="bc-review-card">

//                         <div className="bc-review-card-header">

//                             <div>

//                                 <span className="bc-eyebrow">
//                                     DATE & TIME
//                                 </span>

//                                 <h3>
//                                     Your Scheduled Consultation
//                                 </h3>

//                             </div>

//                             <button
//                                 type="button"
//                                 className="bc-review-edit"
//                                 onClick={() =>
//                                     setStep(2)
//                                 }
//                             >
//                                 Edit
//                             </button>

//                         </div>


//                         <div className="bc-review-info-grid">

//                             <div className="bc-review-info">

//                                 <span>
//                                     DATE
//                                 </span>

//                                 <strong>
//                                     {formatDisplayDate(
//                                         selectedDate
//                                     )}
//                                 </strong>

//                             </div>


//                             <div className="bc-review-info">

//                                 <span>
//                                     TIME
//                                 </span>

//                                 <strong>
//                                     {formatTime(
//                                         selectedTime
//                                     )}
//                                 </strong>

//                             </div>

//                         </div>

//                     </div>


//                     {/* CUSTOMER DETAILS */}

//                     <div className="bc-review-card">

//                         <div className="bc-review-card-header">

//                             <div>

//                                 <span className="bc-eyebrow">
//                                     YOUR DETAILS
//                                 </span>

//                                 <h3>
//                                     Contact Information
//                                 </h3>

//                             </div>

//                             <button
//                                 type="button"
//                                 className="bc-review-edit"
//                                 onClick={() =>
//                                     setStep(3)
//                                 }
//                             >
//                                 Edit
//                             </button>

//                         </div>


//                         <div className="bc-review-details">

//                             <div className="bc-review-detail-row">
//                                 <span>
//                                     FULL NAME
//                                 </span>

//                                 <strong>
//                                     {
//                                         customerDetails.customer_name
//                                     }
//                                 </strong>
//                             </div>


//                             <div className="bc-review-detail-row">
//                                 <span>
//                                     EMAIL ADDRESS
//                                 </span>

//                                 <strong>
//                                     {
//                                         customerDetails.customer_email
//                                     }
//                                 </strong>
//                             </div>


//                             <div className="bc-review-detail-row">
//                                 <span>
//                                     PHONE NUMBER
//                                 </span>

//                                 <strong>
//                                     {
//                                         customerDetails.customer_phone
//                                     }
//                                 </strong>
//                             </div>

//                         </div>

//                     </div>

//                 </div>


//                 {/* RIGHT SUMMARY */}

//                 <aside className="bc-review-summary">

//                     <span className="bc-summary-label">
//                         BOOKING SUMMARY
//                     </span>

//                     <h3>
//                         {selectedConsultation?.duration}
//                         -Minute Consultation
//                     </h3>


//                     <div className="bc-review-summary-item">

//                         <span>
//                             DATE
//                         </span>

//                         <strong>
//                             {formatDisplayDate(
//                                 selectedDate
//                             )}
//                         </strong>

//                     </div>


//                     <div className="bc-review-summary-item">

//                         <span>
//                             TIME
//                         </span>

//                         <strong>
//                             {formatTime(
//                                 selectedTime
//                             )}
//                         </strong>

//                     </div>


//                     <div className="bc-summary-divider" />


//                     <div className="bc-total-row">

//                         <span>
//                             TOTAL
//                         </span>

//                         <strong>
//                             {formatPrice(
//                                 selectedConsultation?.price
//                             )}
//                         </strong>

//                     </div>


//                     <p className="bc-payment-note">
//                         You will be securely redirected to
//                         Razorpay to complete your payment.
//                     </p>


//                     <button
//                         type="button"
//                         className="bc-payment-button"
//                         onClick={() => setStep(5)}
//                     >
//                         Proceed to Secure Payment
//                         <FiArrowRight />
//                     </button>

//                 </aside>

//             </div>


//             {/* NAVIGATION */}

//             <div className="bc-navigation">

//                 <button
//                     type="button"
//                     className="bc-back-button"
//                     onClick={handlePreviousStep}
//                 >
//                     <FiArrowLeft />
//                     Back
//                 </button>


//                 <button
//                     type="button"
//                     className="bc-next-button"
//                     onClick={() => setStep(5)}
//                 >
//                     Proceed to Payment
//                     <FiArrowRight />
//                 </button>

//             </div>

//         </section>
//     );
// }

// export default Step4Review;