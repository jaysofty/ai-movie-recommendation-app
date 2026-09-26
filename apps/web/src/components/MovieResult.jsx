import { ArrowLeft, Clock3, RotateCcw, Sparkles, Star } from "lucide-react";

export default function MovieResult({ recommendation, onReset }) {
  if (!recommendation?.movie) {
    return null;
  }

  const { movie, reason, matchHighlights = [] } = recommendation;

  return (
    <main className="result-page">
      <div className="result-background-glow result-background-glow-left" />
      <div className="result-background-glow result-background-glow-right" />

      <header className="result-header">
        <button type="button" onClick={onReset} className="result-back-button">
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Start over</span>
        </button>

        <div className="result-header-label">
          <Sparkles size={15} aria-hidden="true" />
          <span>Your PopChoice</span>
        </div>
      </header>

      <section className="result-content">
        <div className="result-intro">
          <span className="result-eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            We found your match
          </span>

          <h1 className="result-page-title">
            Tonight's movie
            <span> is ready.</span>
          </h1>

          <p className="result-page-description">
            Based on your preferences, PopChoice found a movie that fits the
            kind of experience you're looking for.
          </p>
        </div>

        <article className="result-card">
          <div className="result-poster-section">
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={`${movie.title} poster`}
                className="result-poster"
              />
            ) : (
              <div className="result-poster-fallback">
                <Sparkles size={32} aria-hidden="true" />
                <span>Poster unavailable</span>
              </div>
            )}

            <div className="result-poster-overlay" />

            <div className="result-rating">
              <Star
                size={15}
                className="fill-yellow-400 text-yellow-400"
                aria-hidden="true"
              />
              <span>{movie.rating}</span>
            </div>
          </div>

          <div className="result-details">
            <div className="result-title-row">
              <div>
                <span className="result-label">Recommended for you</span>

                <h2 className="result-movie-title">{movie.title}</h2>

                <div className="result-movie-meta">
                  <span>{movie.year}</span>

                  <span className="result-meta-dot">•</span>

                  <span>
                    <Clock3 size={14} aria-hidden="true" />
                    {movie.runtimeMinutes} min
                  </span>
                </div>
              </div>

              <div className="result-rating-large">
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                  aria-hidden="true"
                />
                <strong>{movie.rating}</strong>
              </div>
            </div>

            {movie.genres?.length > 0 && (
              <div className="result-genres">
                {movie.genres.map((genre) => (
                  <span key={genre} className="result-genre">
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <p className="result-description">{movie.description}</p>

            {reason && (
              <div className="result-ai-card">
                <div className="result-ai-heading">
                  <div className="result-ai-icon">
                    <Sparkles size={17} aria-hidden="true" />
                  </div>

                  <div>
                    <span>PopChoice AI</span>
                    <h3>Why we picked this</h3>
                  </div>
                </div>

                <p>{reason}</p>
              </div>
            )}

            {matchHighlights.length > 0 && (
              <div className="result-highlights">
                <div className="result-section-heading">
                  <h3>Why it matches</h3>
                  <span>{matchHighlights.length} matches</span>
                </div>

                <div className="result-highlight-list">
                  {matchHighlights.map((highlight, index) => (
                    <div
                      key={`${highlight}-${index}`}
                      className="result-highlight"
                    >
                      <span className="result-highlight-check">✓</span>

                      <p>{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="result-actions">
              <button
                type="button"
                onClick={onReset}
                className="result-primary-button"
              >
                <RotateCcw size={18} aria-hidden="true" />
                <span>Choose another movie</span>
              </button>

              <p className="result-action-note">
                Not feeling it? Try again with different preferences.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
