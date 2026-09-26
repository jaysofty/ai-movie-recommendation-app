import { useState } from "react";
import { Clock3, Sparkles, Users } from "lucide-react";
import Brand from "./Brand";

export default function StartScreen({ onStart }) {
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [duration, setDuration] = useState("");
  const [errors, setErrors] = useState({});

  const handleStart = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!numberOfPeople.trim()) {
      newErrors.numberOfPeople =
        "Please enter the number of people.";
    } else if (
      !Number.isInteger(Number(numberOfPeople)) ||
      Number(numberOfPeople) < 1
    ) {
      newErrors.numberOfPeople =
        "Please enter a valid number of people.";
    }

    if (!duration.trim()) {
      newErrors.duration =
        "Please enter how much time you have.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onStart({
      numberOfPeople: Number(numberOfPeople),
      duration: duration.trim(),
    });
  };

  return (
    <main className="start-page">
      <div className="start-background-glow start-background-glow-left" />
      <div className="start-background-glow start-background-glow-right" />

      <header className="start-header">
        <Brand />
{/* 
        <div className="start-header-badge">
          <Sparkles size={15} aria-hidden="true" />
          <span>AI Movie Discovery</span>
        </div> */}
      </header>

      <section className="start-content">
        <div className="start-copy">
          <span className="start-eyebrow">
            Your next movie starts here
          </span>

          <h1 className="start-title">
            What are we
            <span> watching tonight?</span>
          </h1>

          <p className="start-description">
            Tell PopChoice a little about your movie night and
            we'll find a film that fits your mood, your time,
            and your crew.
          </p>
        </div>

        <form className="start-form" onSubmit={handleStart}>
          <div className="start-form-header">
            <div>
              <h2>Let's get started</h2>
              <p>Just two quick questions.</p>
            </div>

            <div className="start-step-indicator">
              <span>01</span>
              <span>/ 02</span>
            </div>
          </div>

          <div className="start-fields">
            <div
              className={`start-field ${
                errors.numberOfPeople
                  ? "start-field-error"
                  : ""
              }`}
            >
              <div className="start-field-icon">
                <Users size={20} aria-hidden="true" />
              </div>

              <div className="start-field-content">
                <label htmlFor="number-of-people">
                  Number of people
                </label>

                <input
                  id="number-of-people"
                  type="number"
                  min="1"
                  value={numberOfPeople}
                  onChange={(event) => {
                    setNumberOfPeople(event.target.value);

                    if (errors.numberOfPeople) {
                      setErrors((current) => ({
                        ...current,
                        numberOfPeople: "",
                      }));
                    }
                  }}
                  placeholder="e.g. 2"
                />
              </div>
            </div>

            {errors.numberOfPeople && (
              <p className="start-error-message">
                {errors.numberOfPeople}
              </p>
            )}

            <div
              className={`start-field ${
                errors.duration ? "start-field-error" : ""
              }`}
            >
              <div className="start-field-icon">
                <Clock3 size={20} aria-hidden="true" />
              </div>

              <div className="start-field-content">
                <label htmlFor="movie-duration">
                  How much time do you have?
                </label>

                <input
                  id="movie-duration"
                  type="text"
                  value={duration}
                  onChange={(event) => {
                    setDuration(event.target.value);

                    if (errors.duration) {
                      setErrors((current) => ({
                        ...current,
                        duration: "",
                      }));
                    }
                  }}
                  placeholder="e.g. 2 hours"
                />
              </div>
            </div>

            {errors.duration && (
              <p className="start-error-message">
                {errors.duration}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="start-submit-button"
          >
            <span>Start choosing</span>

            <Sparkles
              size={19}
              aria-hidden="true"
            />
          </button>

          <p className="start-form-footer">
            Takes less than a minute
          </p>
        </form>
      </section>
    </main>
  );
}