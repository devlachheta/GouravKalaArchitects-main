import React from "react";

import {
    FiArrowLeft,
    FiArrowRight,
    FiCalendar,
} from "react-icons/fi";

import "../../styles/Step3Details.css";


function Step3Details({
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

                <div className="progress-step active">

                    <span className="progress-number">
                        03
                    </span>

                    <span className="progress-label">
                        YOUR DETAILS
                    </span>

                </div>


                <div className="progress-line"></div>


                {/* STEP 04 */}

                <div className="progress-step">

                    <span className="progress-number">
                        04
                    </span>

                    <span className="progress-label">
                        PAYMENT
                    </span>

                </div>

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

            <div className="bc-navigation">


                {/* BACK */}

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


                {/* NEXT */}

                <button
                    type="button"
                    className="bc-next-button"
                    onClick={handleNextStep}
                >

                    <span>
                        NEXT : REVIEW BOOKING
                    </span>

                    <FiArrowRight />

                </button>

            </div>

        </section>
    );
}


export default Step3Details;


// import React from "react";
// import {
//     FiArrowLeft,
//     FiArrowRight,
// } from "react-icons/fi";

// function Step3Details({
//     renderProgressStep,
//     customerDetails,
//     handleCustomerChange,
//     selectedConsultation,
//     selectedDate,
//     selectedTime,
//     formatDisplayDate,
//     setStep,
//     formError,
//     handlePreviousStep,
//     handleNextStep,
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
//                     "Payment",
//                     4
//                 )}

//             </div>


//             {/* HEADING */}

//             <div className="bc-section-heading">

//                 <span className="bc-eyebrow">
//                     STEP 03
//                 </span>

//                 <h2>
//                     Tell Us About Yourself
//                 </h2>

//                 <p>
//                     Please provide your details so we can
//                     prepare for your consultation.
//                 </p>

//             </div>


//             {/* TWO COLUMN */}

//             <div className="bc-details-layout">

//                 {/* FORM */}

//                 <div className="bc-details-form">

//                     <div className="bc-details-heading">

//                         <span className="bc-eyebrow">
//                             YOUR DETAILS
//                         </span>

//                         <h3>
//                             Let's get to know you
//                         </h3>

//                     </div>


//                     {/* FULL NAME */}

//                     <div className="bc-form-group">

//                         <label htmlFor="customer_name">
//                             FULL NAME *
//                         </label>

//                         <input
//                             id="customer_name"
//                             type="text"
//                             placeholder="Your full name"
//                             value={
//                                 customerDetails.customer_name
//                             }
//                             onChange={
//                                 handleCustomerChange
//                             }
//                         />

//                     </div>


//                     {/* EMAIL */}

//                     <div className="bc-form-group">

//                         <label htmlFor="customer_email">
//                             EMAIL ADDRESS *
//                         </label>

//                         <input
//                             id="customer_email"
//                             type="email"
//                             placeholder="your@email.com"
//                             value={
//                                 customerDetails.customer_email
//                             }
//                             onChange={
//                                 handleCustomerChange
//                             }
//                         />

//                     </div>


//                     {/* PHONE */}

//                     <div className="bc-form-group">

//                         <label htmlFor="customer_phone">
//                             PHONE NUMBER *
//                         </label>

//                         <input
//                             id="customer_phone"
//                             type="tel"
//                             placeholder="+91 98765 43210"
//                             value={
//                                 customerDetails.customer_phone
//                             }
//                             onChange={
//                                 handleCustomerChange
//                             }
//                         />

//                     </div>

//                 </div>


//                 {/* SUMMARY */}

//                 <aside className="bc-details-summary">

//                     <span className="bc-summary-label">
//                         YOUR CONSULTATION
//                     </span>

//                     <h3>
//                         {selectedConsultation?.duration}
//                         -Minute Consultation
//                     </h3>

//                     <div className="bc-summary-price">
//                         ₹
//                         {Number(
//                             selectedConsultation?.price || 0
//                         ).toLocaleString("en-IN")}
//                     </div>

//                     <div className="bc-summary-divider" />


//                     <div className="bc-summary-item">
//                         <span>DATE</span>

//                         <strong>
//                             {formatDisplayDate(
//                                 selectedDate
//                             )}
//                         </strong>
//                     </div>


//                     <div className="bc-summary-item">

//                         <span>
//                             TIME
//                         </span>

//                         <strong>
//                             {selectedTime}
//                         </strong>

//                     </div>


//                     <div className="bc-summary-divider" />


//                     <button
//                         type="button"
//                         className="bc-change-button"
//                         onClick={() => setStep(2)}
//                     >
//                         Change Date & Time
//                         <FiArrowRight />
//                     </button>

//                 </aside>

//             </div>


//             {formError && (
//                 <div className="bc-form-error">
//                     {formError}
//                 </div>
//             )}


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
//                     onClick={handleNextStep}
//                 >
//                     Next: Review Booking
//                     <FiArrowRight />
//                 </button>

//             </div>

//         </section>
//     );
// }

// export default Step3Details;