import React from "react";
import {
    FiArrowLeft,
    FiArrowRight,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

function Step2DateTime({
    renderProgressStep,
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
                    "Payment",
                    4
                )}

            </div>


            {/* HEADING */}

            <div className="bc-section-heading">

                <span className="bc-eyebrow">
                    STEP 02
                </span>

                <h2>
                    Select Date & Time
                </h2>

                <p>
                    Choose a convenient date and
                    available time for your consultation.
                </p>

            </div>


            {/* SELECTED CONSULTATION */}

            <div className="bc-selected-consultation">

                <div>

                    <span>
                        SELECTED CONSULTATION
                    </span>

                    <strong>
                        {selectedConsultation?.duration} -
                        Minute Consultation
                    </strong>

                </div>

                <div className="bc-selected-price">
                    {formatPrice(
                        selectedConsultation?.price
                    )}
                </div>

            </div>


            {/* DATE TIME GRID */}

            <div className="bc-date-time-grid">

                {/* CALENDAR */}

                <div className="bc-calendar-container">

                    <div className="bc-subheading">
                        <h3>
                            Select a Date
                        </h3>
                    </div>


                    <div className="bc-calendar">

                        <div className="bc-calendar-header">

                            <button
                                type="button"
                                onClick={
                                    goToPreviousMonth
                                }
                                disabled={
                                    currentMonth.getFullYear() ===
                                    today.getFullYear() &&
                                    currentMonth.getMonth() ===
                                    today.getMonth()
                                }
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
                                onClick={
                                    goToNextMonth
                                }
                            >
                                <FiChevronRight />
                            </button>

                        </div>


                        <div className="bc-calendar-weekdays">

                            {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                            ].map((day) => (
                                <span key={day}>
                                    {day}
                                </span>
                            ))}

                        </div>


                        <div className="bc-calendar-days">

                            {getDaysInMonth().map(
                                (date, index) => {

                                    if (!date) {
                                        return (
                                            <span
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
                                            className={`bc-calendar-day ${selected
                                                ? "selected"
                                                : ""
                                                } ${disabled
                                                    ? "disabled"
                                                    : ""
                                                }`}
                                            onClick={() =>
                                                handleSelectDate(
                                                    date
                                                )
                                            }
                                        >
                                            {date.getDate()}
                                        </button>
                                    );
                                }
                            )}

                        </div>

                    </div>


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


                {/* TIME SLOTS */}

                <div className="bc-time-container">

                    <div className="bc-subheading">

                        <h3>
                            Available Time Slots
                        </h3>

                        {selectedDate && (
                            <p>
                                {formatDisplayDate(
                                    selectedDate
                                )}
                            </p>
                        )}

                    </div>


                    {!selectedDate && (
                        <div className="bc-empty-slots">
                            <div>
                                <span>
                                    Select a date
                                </span>

                                <p>
                                    Available consultation
                                    times will appear here.
                                </p>
                            </div>
                        </div>
                    )}


                    {selectedDate &&
                        loadingSlots && (
                            <div className="bc-empty-slots">
                                <div>
                                    <span>
                                        Loading available
                                        times...
                                    </span>
                                </div>
                            </div>
                        )}


                    {selectedDate &&
                        !loadingSlots &&
                        slotError && (
                            <div className="bc-empty-slots">
                                <div>
                                    <span>
                                        {slotError}
                                    </span>
                                </div>
                            </div>
                        )}


                    {selectedDate &&
                        !loadingSlots &&
                        !slotError &&
                        availableSlots.length === 0 && (
                            <div className="bc-empty-slots">
                                <div>
                                    <span>
                                        No available slots
                                    </span>

                                    <p>
                                        Please select another
                                        date.
                                    </p>
                                </div>
                            </div>
                        )}


                    {selectedDate &&
                        !loadingSlots &&
                        !slotError &&
                        availableSlots.length > 0 && (
                            <div className="bc-time-slots">

                                {availableSlots.map(
                                    (slot) => {

                                        const selected =
                                            selectedTime ===
                                            slot.start_time;

                                        return (
                                            <button
                                                key={
                                                    slot.start_time
                                                }
                                                type="button"
                                                className={`bc-time-slot ${selected
                                                    ? "selected"
                                                    : ""
                                                    }`}
                                                onClick={() =>
                                                    setSelectedTime(
                                                        slot.start_time
                                                    )
                                                }
                                            >
                                                {formatTime(
                                                    slot.start_time
                                                )}
                                            </button>
                                        );
                                    }
                                )}

                            </div>
                        )}


                    <p className="bc-timezone">
                        All times are in Indian
                        Standard Time (IST)
                    </p>

                </div>

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


                <button
                    type="button"
                    className="bc-next-button"
                    disabled={
                        !selectedDate ||
                        !selectedTime
                    }
                    onClick={handleNextStep}
                >
                    Next: Your Details
                    <FiArrowRight />
                </button>

            </div>

        </section>
    );
}

export default Step2DateTime;