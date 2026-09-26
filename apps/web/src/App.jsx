import { useState } from "react";
import StartScreen from "./components/startScreen";
import QuestionFlow from "./components/QuestionFlow";
import MovieResult from "./components/MovieResult";
import { getRecommendation } from "./lib/api";

const INITIAL_PREFERENCES = {
  numberOfPeople: "",
  duration: "",
};

export default function App() {
  const [currentView, setCurrentView] = useState("start");
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = (startPreferences) => {
    setPreferences(startPreferences);
    setError("");
    setCurrentView("questions");
  };

  const handlePreferencesSubmit = async (questionPreferences) => {
    const completePreferences = {
      ...preferences,
      ...questionPreferences,
    };

    setPreferences(completePreferences);
    setLoading(true);
    setError("");

    try {
      console.log("Sending preferences to API:", completePreferences);

      const result = await getRecommendation(completePreferences);

      console.log("Recommendation received from API:", result);

      setRecommendation(result);
      setCurrentView("result");
    } catch (error) {
      console.error("Recommendation failed:", error);

      setError(
        error.message || "Something went wrong while finding your movie.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentView("start");
    setPreferences(INITIAL_PREFERENCES);
    setRecommendation(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-popdark-900 text-white">
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-popdark-900/80 backdrop-blur-sm">
          <div
            className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-popgreen border-t-transparent"
            aria-label="Loading"
          />

          <p className="text-sm font-medium text-gray-300">
            Searching your cinematic match...
          </p>
        </div>
      )}

      {error && (
        <div className="fixed left-1/2 top-5 z-[60] w-[90%] max-w-md -translate-x-1/2 rounded-xl border border-red-500/30 bg-red-950/90 px-4 py-3 text-sm text-red-200 shadow-xl">
          {error}
        </div>
      )}

      {currentView === "start" && <StartScreen onStart={handleStart} />}

      {currentView === "questions" && (
        <QuestionFlow
          initialPreferences={preferences}
          onNext={handlePreferencesSubmit}
        />
      )}

      {currentView === "result" && (
        <MovieResult recommendation={recommendation} onReset={handleReset} />
      )}
    </div>
  );
}
