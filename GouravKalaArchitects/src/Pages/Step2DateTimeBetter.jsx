import React from "react";
import {
    FiArrowLeft,
    FiArrowRight,
    FiChevronLeft,
    FiChevronRight,
    FiCalendar,
    FiClock,
    FiCheck,

} from "react-icons/fi";

import "../styles/Step2DateTimeBetter.css";
function Step2({
    selectedConsultation,
    formatPrice,
    currentMonth,
    today,
    goToPreviousMonth,
    goToNextMonth,
    getDaysInMonth,
    isPastDate,
    isSunday,
    isSameDate,
    selectedDate,
    handleSelectDate,
    selectedTime,
    setSelectedTime,
    availableSlots,
    loadingSlots,
    slotError,
    formatDisplayDate,
    formatTime,
    handleNextStep,
    handlePreviousStep,
}) {
    return (
        <section className="bc-step-two">

            {/* =====================================================
                PROGRESS
            ===================================================== */}

            <div className="consultation-progress">

                <div className="progress-step completed">
                    <span className="progress-number">01</span>

                    <span className="progress-label">
                        CONSULTATION
                    </span>
                </div>

                <div className="progress-line" />

                <div className="progress-step active">
                    <span className="progress-number">02</span>

                    <span className="progress-label">
                        DATE &amp; TIME
                    </span>
                </div>

                <div className="progress-line" />

                <div className="progress-step">
                    <span className="progress-number">03</span>

                    <span className="progress-label">
                        YOUR DETAILS
                    </span>
                </div>

                <div className="progress-line" />

                <div className="progress-step">
                    <span className="progress-number">04</span>

                    <span className="progress-label">
                        PAYMENT
                    </span>
                </div>

            </div>


            {/* =====================================================
                COMPACT BOOKING HEADER
            ===================================================== */}

            <div className="bc-booking-header">

                {/* LEFT */}
                <div className="bc-booking-step">

                    <span>
                        STEP 2 OF 4
                    </span>

                    <strong>
                        DATE &amp; TIME
                    </strong>

                </div>


                {/* RIGHT */}
                <div className="bc-booking-summary">

                    <span className="bc-booking-summary-label">
                        CONSULTATION
                    </span>

                    <div className="bc-booking-summary-price">

                        {formatPrice(
                            selectedConsultation?.price
                        )}

                        <span>
                            ·{" "}
                            {selectedConsultation?.duration
                                ? `${parseInt(
                                    selectedConsultation.duration,
                                    10
                                )} minutes`
                                : "30 minutes"}
                        </span>

                    </div>

                </div>

            </div>


            {/* =====================================================
                DATE + TIME CARDS
            ===================================================== */}

            <div className="bc-date-time-grid">


                {/* =================================================
                    CONSULTATION DATE
                ================================================= */}

                <div className="bc-calendar-container">

                    {/* CARD HEADER */}

                    <div className="bc-panel-header">

                        <div className="bc-panel-title">

                            <span>
                                CONSULTATION DATE
                            </span>

                        </div>

                        <div className="bc-panel-icon">
                            <FiCalendar />
                        </div>

                    </div>


                    {/* CALENDAR */}

                    <div className="bc-calendar">

                        {/* MONTH */}

                        <div className="bc-calendar-header">

                            <button
                                type="button"
                                onClick={goToPreviousMonth}
                                disabled={
                                    currentMonth.getFullYear() ===
                                    today.getFullYear() &&
                                    currentMonth.getMonth() ===
                                    today.getMonth()
                                }
                                aria-label="Previous month"
                            >
                                <FiChevronLeft />
                            </button>


                            <strong>
                                {currentMonth.toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </strong>


                            <button
                                type="button"
                                onClick={goToNextMonth}
                                aria-label="Next month"
                            >
                                <FiChevronRight />
                            </button>

                        </div>


                        {/* WEEKDAYS */}

                        <div className="bc-calendar-weekdays">

                            <span>SUN</span>
                            <span>MON</span>
                            <span>TUE</span>
                            <span>WED</span>
                            <span>THU</span>
                            <span>FRI</span>
                            <span>SAT</span>

                        </div>


                        {/* DAYS */}

                        <div className="bc-calendar-days">

                            {getDaysInMonth(currentMonth).map(
                                (date, index) => {

                                    /*
                                     * Empty cells before the first
                                     * day of the month.
                                     */
                                    if (!date) {

                                        return (
                                            <div
                                                key={`empty-${index}`}
                                                className="bc-calendar-empty"
                                            />
                                        );

                                    }


                                    const disabled =
                                        isPastDate(date) ||
                                        isSunday(date);


                                    const selected =
                                        isSameDate(
                                            date,
                                            selectedDate
                                        );


                                    return (
                                        <button
                                            key={date.toISOString()}
                                            type="button"

                                            disabled={disabled}

                                            className={`
                                                bc-calendar-day
                                                ${selected
                                                    ? "selected"
                                                    : ""
                                                }
                                                ${disabled
                                                    ? "disabled"
                                                    : "available"
                                                }
                                            `}

                                            onClick={() =>
                                                handleSelectDate(date)
                                            }
                                        >

                                            <span className="bc-date-number">
                                                {date.getDate()}
                                            </span>


                                            {selected && (
                                                <span className="bc-date-check">
                                                    <FiCheck />
                                                </span>
                                            )}

                                        </button>
                                    );

                                }
                            )}

                        </div>


                        {/* LEGEND */}

                        <div className="bc-calendar-legend">

                            <span>
                                <i className="available-dot" />
                                Available
                            </span>

                            <span>
                                <i className="unavailable-dot" />
                                Unavailable
                            </span>

                            <span>
                                <i className="selected-dot" />
                                Selected
                            </span>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    CONSULTATION TIME
                ================================================= */}

                <div className="bc-time-container">

                    {/* CARD HEADER */}

                    <div className="bc-panel-header">

                        <div className="bc-panel-title">

                            <span>
                                CONSULTATION TIME
                            </span>

                        </div>

                        <div className="bc-panel-icon">
                            <FiClock />
                        </div>

                    </div>


                    {/* SELECTED DATE */}

                    <div className="bc-selected-date">

                        {selectedDate ? (

                            <>
                                <span className="bc-selected-date-label">
                                    SELECTED DATE
                                </span>

                                <strong>
                                    {formatDisplayDate(selectedDate)}
                                </strong>
                            </>

                        ) : (

                            <>
                                <span className="bc-selected-date-label">
                                    SELECT A DATE
                                </span>

                                <strong>
                                    Choose a date from the calendar
                                </strong>
                            </>

                        )}

                    </div>


                    {/* TIME SLOTS */}

                    <div className="bc-time-slots-content">

                        {!selectedDate && !loadingSlots && (

                            <div className="bc-empty-slots">

                                <FiCalendar />

                                <strong>
                                    Select a date
                                </strong>

                                <p>
                                    Choose a date from the calendar
                                    to view available time slots.
                                </p>

                            </div>

                        )}


                        {selectedDate && loadingSlots && (

                            <div className="bc-empty-slots">

                                <div className="bc-loader" />

                                <strong>
                                    Loading available times...
                                </strong>

                                <p>
                                    Please wait while we check
                                    availability.
                                </p>

                            </div>

                        )}


                        {selectedDate &&
                            !loadingSlots &&
                            slotError &&
                            availableSlots?.length === 0 && (

                                <div className="bc-empty-slots">

                                    <FiClock />

                                    <strong>
                                        No availability
                                    </strong>

                                    <p>
                                        {slotError}
                                    </p>

                                </div>

                            )}


                        {selectedDate &&
                            !loadingSlots &&
                            availableSlots?.length > 0 && (

                                <div className="bc-time-slots">

                                    {availableSlots.map(
                                        (slot, index) => {

                                            const slotValue =
                                                slot.start_time;


                                            const isSelected =
                                                selectedTime ===
                                                slotValue;


                                            const isBooked =
                                                slot.status ===
                                                "booked";


                                            const isUnavailable =
                                                slot.status ===
                                                "blocked";


                                            return (

                                                <button
                                                    key={
                                                        slot.id ||
                                                        `${slotValue}-${index}`
                                                    }

                                                    type="button"

                                                    disabled={
                                                        isBooked ||
                                                        isUnavailable
                                                    }

                                                    className={`
                                                        bc-time-slot
                                                        ${isSelected
                                                            ? "selected"
                                                            : ""
                                                        }
                                                        ${isBooked
                                                            ? "booked"
                                                            : ""
                                                        }
                                                        ${isUnavailable
                                                            ? "unavailable"
                                                            : ""
                                                        }
                                                    `}

                                                    onClick={() => {

                                                        if (
                                                            !isBooked &&
                                                            !isUnavailable
                                                        ) {
                                                            setSelectedTime(
                                                                slotValue
                                                            );
                                                        }

                                                    }}
                                                >

                                                    <div className="bc-slot-main">

                                                        <span className="bc-slot-time">
                                                            {formatTime(
                                                                slot.start_time
                                                            )}
                                                        </span>

                                                        <span
                                                            className={`
                                                                bc-slot-status
                                                                ${isBooked
                                                                    ? "booked-status"
                                                                    : ""
                                                                }
                                                                ${isUnavailable
                                                                    ? "unavailable-status"
                                                                    : ""
                                                                }
                                                            `}
                                                        >

                                                            {isBooked
                                                                ? "BOOKED"
                                                                : isUnavailable
                                                                    ? "UNAVAILABLE"
                                                                    : isSelected
                                                                        ? "SELECTED"
                                                                        : "AVAILABLE"
                                                            }

                                                        </span>

                                                    </div>


                                                    <span className="bc-slot-indicator">

                                                        {isSelected ? (
                                                            <FiCheck />
                                                        ) : isBooked ? (
                                                            "×"
                                                        ) : (
                                                            ""
                                                        )}

                                                    </span>

                                                </button>

                                            );

                                        }
                                    )}

                                </div>

                            )}

                    </div>


                    {/* TIMEZONE */}

                    <div className="bc-timezone">

                        <FiClock />

                        <span>
                            All times are in Indian Standard Time (IST)
                        </span>

                    </div>

                </div>

            </div>


            {/* =====================================================
                ERROR
            ===================================================== */}

            {slotError &&
                selectedDate &&
                availableSlots?.length > 0 && (

                    <div className="slot-error">
                        {slotError}
                    </div>

                )}


            {/* =====================================================
                NAVIGATION
            ===================================================== */}

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

                    disabled={
                        !selectedDate ||
                        !selectedTime
                    }

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


export default Step2;