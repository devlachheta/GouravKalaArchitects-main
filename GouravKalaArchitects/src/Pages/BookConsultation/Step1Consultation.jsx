import { FiCheck, FiArrowRight } from "react-icons/fi";


function Step1Consultation({
    consultations,
    selectedConsultation,
    setSelectedConsultation,
    loadingConsultations,
    consultationError,
    handleNextStep,
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

        const durationNumber = parseInt(
            duration,
            10
        );

        return (
            consultationFeatures[durationNumber] || [
                "One-on-one consultation session",
                "Discuss your requirements and questions",
            ]
        );
    };


    const handleNext = () => {

        if (!selectedConsultation) {
            return;
        }

        handleNextStep();
    };


    return (
        <section className="consultation-step-one">


            {/* =========================================
                PROGRESS BAR
            ========================================= */}

            <div className="consultation-progress">

                <div className="progress-step active">
                    <span className="progress-number">
                        01
                    </span>

                    <span className="progress-label">
                        CONSULTATION
                    </span>
                </div>


                <div className="progress-line"></div>


                <div className="progress-step">
                    <span className="progress-number">
                        02
                    </span>

                    <span className="progress-label">
                        DETAILS
                    </span>
                </div>


                <div className="progress-line"></div>


                <div className="progress-step">
                    <span className="progress-number">
                        03
                    </span>

                    <span className="progress-label">
                        DATE & TIME
                    </span>
                </div>


                <div className="progress-line"></div>


                <div className="progress-step">
                    <span className="progress-number">
                        04
                    </span>

                    <span className="progress-label">
                        CONFIRMATION
                    </span>
                </div>

            </div>


            {/* =========================================
                INTRODUCTION
            ========================================= */}

            <div className="consultation-intro">

                <h1>
                    BEGIN WITH A CONVERSATION
                </h1>

                <p>
                    Every project begins with understanding
                    your vision, requirements and possibilities.
                </p>

            </div>


            {/* =========================================
                LOADING
            ========================================= */}

            {loadingConsultations && (

                <div className="consultation-status">
                    Loading consultation options...
                </div>

            )}


            {/* =========================================
                ERROR
            ========================================= */}

            {!loadingConsultations &&
                consultationError && (

                    <div className="consultation-status error">
                        {consultationError}
                    </div>

                )}


            {/* =========================================
                NO CONSULTATIONS
            ========================================= */}

            {!loadingConsultations &&
                !consultationError &&
                consultations?.length === 0 && (

                    <div className="consultation-status">
                        No consultation options are currently available.
                    </div>

                )}


            {/* =========================================
                CONSULTATION CARDS
            ========================================= */}

            {!loadingConsultations &&
                !consultationError &&
                consultations?.length > 0 && (

                    <div className="consultation-cards-wrapper">

                        <div className="consultation-cards">

                            {consultations.map(
                                (consultation) => {

                                    const isSelected =
                                        selectedConsultation?.id ===
                                        consultation.id;


                                    const features =
                                        getFeatures(
                                            consultation.duration
                                        );


                                    return (

                                        <article
                                            key={
                                                consultation.id
                                            }
                                            className={`consultation-card ${isSelected
                                                ? "selected"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                handleSelect(
                                                    consultation
                                                )
                                            }
                                        >


                                            {/* =================================
                                                CARD HEADER
                                            ================================= */}

                                            <div className="consultation-card-header">

                                                <span className="consultation-duration">

                                                    {consultation.duration}
                                                    {String(
                                                        consultation.duration
                                                    ).toLowerCase().includes(
                                                        "minute"
                                                    )
                                                        ? ""
                                                        : "-MINUTE CONSULTATION"}

                                                </span>


                                                <div
                                                    className={`consultation-radio ${isSelected
                                                        ? "active"
                                                        : ""
                                                        }`}
                                                >

                                                    {isSelected && (

                                                        <span className="consultation-radio-dot"></span>

                                                    )}

                                                </div>

                                            </div>


                                            {/* =================================
                                                CARD BODY
                                            ================================= */}

                                            <div className="consultation-card-body">

                                                <h2>
                                                    {
                                                        consultation.title ||
                                                        "1-on-1 Consultation"
                                                    }
                                                </h2>


                                                <div className="consultation-price">

                                                    ₹
                                                    {Number(
                                                        consultation.price
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}

                                                </div>


                                                <div className="consultation-divider"></div>


                                                {/* FEATURES */}

                                                <div className="consultation-features">

                                                    {features.map(
                                                        (
                                                            feature,
                                                            index
                                                        ) => (

                                                            <div
                                                                className="consultation-feature"
                                                                key={
                                                                    index
                                                                }
                                                            >

                                                                <FiCheck className="feature-check" />

                                                                <span>
                                                                    {
                                                                        feature
                                                                    }
                                                                </span>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>


                                            {/* =================================
                                                SELECT BUTTON
                                            ================================= */}

                                            <button
                                                type="button"
                                                className={`consultation-select-button ${isSelected
                                                    ? "selected-button"
                                                    : ""
                                                    }`}
                                                onClick={(
                                                    event
                                                ) => {

                                                    event.stopPropagation();

                                                    handleSelect(
                                                        consultation
                                                    );

                                                }}
                                            >

                                                {isSelected ? (

                                                    <>
                                                        <span>
                                                            SELECTED
                                                        </span>

                                                        <FiCheck />
                                                    </>

                                                ) : (

                                                    <>
                                                        <span>
                                                            SELECT
                                                        </span>

                                                        <FiArrowRight />
                                                    </>

                                                )}

                                            </button>

                                        </article>

                                    );

                                }
                            )}

                        </div>

                    </div>

                )}


            {/* =========================================
                NEXT BUTTON
            ========================================= */}

            <div className="consultation-step-footer">

                <button
                    type="button"
                    className="consultation-next-button"
                    disabled={!selectedConsultation}
                    onClick={handleNext}
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


export default Step1Consultation;

// import React from "react";
// import {
//     FiArrowLeft,
//     FiArrowRight,
//     FiCheck,
// } from "react-icons/fi";

// function Step1Consultation({
//     consultations,
//     selectedConsultation,
//     setSelectedConsultation,
//     loadingConsultations,
//     consultationError,
//     handleNextStep,
//     handlePreviousStep,
// }) {
//     const consultationFeatures = {
//         15: [
//             "Quick project discussion",
//             "Ideal for initial questions and guidance",
//         ],
//         30: [
//             "Detailed project discussion",
//             "Ideal for discussing design requirements, ideas and planning",
//         ],
//     };


//     const handleSelect = (consultation) => {
//         setSelectedConsultation(consultation);
//     };

//     const getFeatures = (duration) => {
//         return (
//             consultationFeatures[duration] || [
//                 "One-on-one consultation session",
//                 "Discuss your requirements and questions",
//             ]
//         );
//     };


//     return (
//         <section className="bc-step-section">

//             {/* =========================================
//                 PROGRESS
//             ========================================= */}

//             <div className="bc-progress">

//                 <div className="bc-progress-step active">
//                     <span>01</span>
//                     <p>Consultation</p>
//                 </div>

//                 <div className="bc-progress-line" />

//                 <div className="bc-progress-step">
//                     <span>02</span>
//                     <p>Date &amp; Time</p>
//                 </div>

//                 <div className="bc-progress-line" />

//                 <div className="bc-progress-step">
//                     <span>03</span>
//                     <p>Your Details</p>
//                 </div>

//                 <div className="bc-progress-line" />

//                 <div className="bc-progress-step">
//                     <span>04</span>
//                     <p>Review</p>
//                 </div>

//                 <div className="bc-progress-line" />

//                 <div className="bc-progress-step">
//                     <span>05</span>
//                     <p>Payment</p>
//                 </div>

//                 <div className="bc-progress-line" />

//                 <div className="bc-progress-step">
//                     <span>06</span>
//                     <p>Confirmation</p>
//                 </div>

//             </div>


//             {/* =========================================
//                 HEADING
//             ========================================= */}

//             <div className="bc-section-heading">

//                 <span className="bc-eyebrow">
//                     CONSULTATION
//                 </span>

//                 <h2>
//                     Choose Your Consultation
//                 </h2>

//                 <p>
//                     Select the consultation duration that
//                     best suits your requirements.
//                 </p>

//             </div>


//             {/* =========================================
//                 CONSULTATION OPTIONS
//             ========================================= */}

//             {loadingConsultations && (
//                 <div className="bc-message">
//                     Loading consultation options...
//                 </div>
//             )}

//             {!loadingConsultations &&
//                 consultationError && (
//                     <div className="bc-message bc-error">
//                         {consultationError}
//                     </div>
//                 )}

//             {!loadingConsultations &&
//                 !consultationError &&
//                 consultations.length === 0 && (
//                     <div className="bc-message">
//                         No consultation options are
//                         currently available.
//                     </div>
//                 )}

//             {!loadingConsultations &&
//                 !consultationError &&
//                 consultations.length > 0 && (

//                     <div className="bc-consultation-grid">

//                         {consultations.map((consultation) => {

//                             const isSelected =
//                                 selectedConsultation?.id ===
//                                 consultation.id;

//                             const features =
//                                 getFeatures(
//                                     consultation.duration
//                                 );

//                             return (
//                                 <div
//                                     key={consultation.id}
//                                     className={`bc-consultation-card ${isSelected
//                                         ? "selected"
//                                         : ""
//                                         }`}
//                                 >

//                                     {/* RADIO */}

//                                     <button
//                                         type="button"
//                                         className="bc-card-select-area"
//                                         onClick={() =>
//                                             handleSelect(
//                                                 consultation
//                                             )
//                                         }
//                                         aria-label={`Select ${consultation.title}`}
//                                     >

//                                         <span
//                                             className={`bc-card-radio ${isSelected
//                                                 ? "active"
//                                                 : ""
//                                                 }`}
//                                         >
//                                             {isSelected && (
//                                                 <span />
//                                             )}
//                                         </span>

//                                     </button>



//                                     {/* CONTENT */}

//                                     <div className="bc-card-content">

//                                         <div className="bc-card-duration">
//                                             {consultation.duration}
//                                             -Minute Consultation
//                                         </div>

//                                         <h3>
//                                             {consultation.title ||
//                                                 "1-on-1 Consultation"}
//                                         </h3>


//                                         {/* PRICE */}

//                                         <div className="bc-card-price">
//                                             ₹
//                                             {Number(
//                                                 consultation.price
//                                             ).toLocaleString(
//                                                 "en-IN"
//                                             )}
//                                         </div>


//                                         {/* FEATURES */}

//                                         <div className="bc-card-features">

//                                             {features.map(
//                                                 (
//                                                     feature,
//                                                     index
//                                                 ) => (
//                                                     <div
//                                                         key={
//                                                             index
//                                                         }
//                                                         className="bc-card-feature"
//                                                     >
//                                                         <FiCheck />

//                                                         <span>
//                                                             {
//                                                                 feature
//                                                             }
//                                                         </span>
//                                                     </div>
//                                                 )
//                                             )}

//                                         </div>


//                                         {/* SELECT BUTTON */}

//                                         <button
//                                             type="button"
//                                             className="bc-card-button"
//                                             onClick={() =>
//                                                 handleSelect(
//                                                     consultation
//                                                 )
//                                             }
//                                         >
//                                             {isSelected
//                                                 ? "Selected"
//                                                 : "Select"}

//                                             {isSelected && (
//                                                 <FiCheck />
//                                             )}
//                                         </button>

//                                     </div>

//                                 </div>
//                             );
//                         })}

//                     </div>
//                 )}


//             {/* =========================================
//                 NAVIGATION
//             ========================================= */}

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
//                     disabled={!selectedConsultation}
//                     onClick={handleNextStep}
//                 >
//                     Next: Select Date &amp; Time
//                     <FiArrowRight />
//                 </button>

//             </div>

//         </section>
//     );
// }

// export default Step1Consultation;