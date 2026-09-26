import { useState } from "react";
import {
  ArrowRight,
  Heart,
  Sparkles,
  UserRound,
} from "lucide-react";
import Brand from "./Brand";
import { MOVIE_STYLES, MOODS } from "../data/movieOptions";

const INITIAL_FORM_DATA = {
  favoriteMovie: "",
  movieStyle: "",
  mood: "",
  strandedPerson: "",
};

export default function QuestionFlow({
  initialPreferences,
  onNext,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: "",
      }));
    }
  };

  const handleNext = () => {
    const newErrors = {};

    if (!formData.favoriteMovie.trim()) {
      newErrors.favoriteMovie =
        "Please tell us about a movie you love.";
    }

    if (!formData.movieStyle) {
      newErrors.movieStyle =
        "Please choose a movie style.";
    }

    if (!formData.mood) {
      newErrors.mood =
        "Please choose your mood.";
    }

    if (!formData.strandedPerson.trim()) {
      newErrors.strandedPerson =
        "Please tell us who you would choose and why.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onNext({
      ...initialPreferences,
      ...formData,
    });
  };

  return (
    <main className="question-page">
      {/* Background decoration */}
      <div className="question-background-glow question-background-glow-left" />
      <div className="question-background-glow question-background-glow-right" />

      {/* Header */}
      <header className="question-header">
        <Brand />

        <div className="question-progress">
          <span className="question-progress-current">
            02
          </span>

          <span className="question-progress-divider">
            /
          </span>

          <span>02</span>
        </div>
      </header>

      {/* Main content */}
      <section className="question-content">
        {/* Intro */}
        <div className="question-intro">
          <span className="question-eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            Tell us your movie preferences
          </span>

          <h1 className="question-title">
            Let's find something
            <span>you'll love.</span>
          </h1>

          <p className="question-description">
            A few quick questions will help PopChoice understand
            what kind of movie fits your night.
          </p>
        </div>

        {/* Form */}
        <div className="question-form">
          {/* Favorite movie */}
          <div
            className={`question-card question-card-large ${
              errors.favoriteMovie
                ? "question-card-error"
                : ""
            }`}
          >
            <div className="question-card-heading">
              <div className="question-card-icon">
                <Heart size={19} aria-hidden="true" />
              </div>

              <div>
                <span className="question-number">
                  01
                </span>

                <h2>
                  What's your favorite movie and why?
                </h2>
              </div>
            </div>

            <textarea
              id="favorite-movie"
              value={formData.favoriteMovie}
              onChange={(event) =>
                updateField(
                  "favoriteMovie",
                  event.target.value,
                )
              }
              placeholder="Tell us about a movie you love..."
              className="question-textarea"
            />

            {errors.favoriteMovie && (
              <p className="question-error-message">
                {errors.favoriteMovie}
              </p>
            )}
          </div>

          {/* Preferences row */}
          <div className="question-preference-grid">
            {/* Movie style */}
            <div
              className={`question-card ${
                errors.movieStyle
                  ? "question-card-error"
                  : ""
              }`}
            >
              <div className="question-card-heading">
                <div className="question-card-icon">
                  <Sparkles
                    size={19}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <span className="question-number">
                    02
                  </span>

                  <h2>
                    New or classic?
                  </h2>
                </div>
              </div>

              <div className="question-choice-grid">
                {MOVIE_STYLES.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() =>
                      updateField(
                        "movieStyle",
                        style,
                      )
                    }
                    className={`question-choice ${
                      formData.movieStyle === style
                        ? "question-choice-active"
                        : ""
                    }`}
                  >
                    {style}

                    {formData.movieStyle === style && (
                      <span className="question-choice-dot" />
                    )}
                  </button>
                ))}
              </div>

              {errors.movieStyle && (
                <p className="question-error-message">
                  {errors.movieStyle}
                </p>
              )}
            </div>

            {/* Mood */}
            <div
              className={`question-card ${
                errors.mood
                  ? "question-card-error"
                  : ""
              }`}
            >
              <div className="question-card-heading">
                <div className="question-card-icon">
                  <Heart size={19} aria-hidden="true" />
                </div>

                <div>
                  <span className="question-number">
                    03
                  </span>

                  <h2>
                    What's your mood?
                  </h2>
                </div>
              </div>

              <div className="question-choice-grid question-choice-grid-mood">
                {MOODS.map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() =>
                      updateField(
                        "mood",
                        mood,
                      )
                    }
                    className={`question-choice ${
                      formData.mood === mood
                        ? "question-choice-active"
                        : ""
                    }`}
                  >
                    {mood}

                    {formData.mood === mood && (
                      <span className="question-choice-dot" />
                    )}
                  </button>
                ))}
              </div>

              {errors.mood && (
                <p className="question-error-message">
                  {errors.mood}
                </p>
              )}
            </div>
          </div>

          {/* Famous film person */}
          <div
            className={`question-card question-card-large ${
              errors.strandedPerson
                ? "question-card-error"
                : ""
            }`}
          >
            <div className="question-card-heading">
              <div className="question-card-icon">
                <UserRound
                  size={19}
                  aria-hidden="true"
                />
              </div>

              <div>
                <span className="question-number">
                  04
                </span>

                <h2>
                  Who would you want to be stranded
                  on an island with?
                </h2>
              </div>
            </div>

            <textarea
              id="stranded-person"
              value={formData.strandedPerson}
              onChange={(event) =>
                updateField(
                  "strandedPerson",
                  event.target.value,
                )
              }
              placeholder="Tell us who and why..."
              className="question-textarea question-textarea-person"
            />

            {errors.strandedPerson && (
              <p className="question-error-message">
                {errors.strandedPerson}
              </p>
            )}
          </div>

          {/* Continue */}
          <div className="question-actions">
            <div className="question-actions-copy">
              <Sparkles
                size={16}
                aria-hidden="true"
              />

              <span>
                PopChoice will use your answers to find
                your best match.
              </span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="question-next-button"
            >
              <span>Find my movie</span>

              <ArrowRight
                size={19}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}