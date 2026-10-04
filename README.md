# PopChoice

PopChoice is a movie-night recommendation web application. A user enters a few details about the group, available time, a movie they like, the style and mood they want, and who the movie should suit. The backend uses semantic search to retrieve movie candidates from Supabase, then asks a Groq-hosted language model to choose one of those candidates and explain the match.

## Features

- A two-step React interface collects movie-night details and preferences.
- Movie metadata is searched semantically using locally run Hugging Face Transformers embeddings.
- Supabase supplies the candidate movies through a PostgreSQL RPC named `match_movies`.
- Groq's OpenAI-compatible chat API selects from the retrieved candidates and provides a reason and match highlights.
- The result screen shows the selected movie's metadata and poster when available.

The UI currently offers the styles **New** and **Classic** and the moods **Fun**, **Serious**, **Inspiring**, and **Scary**. The other preference fields are free-text inputs.

## Technology stack

| Area | Technologies in the repository |
| --- | --- |
| Frontend | React 19, Vite 8, JavaScript, Tailwind CSS 4, Lucide React |
| Backend | Node.js (ES modules), Express 5, CORS, Helmet |
| Embeddings | `@huggingface/transformers`, `Xenova/all-MiniLM-L6-v2` |
| LLM | OpenAI SDK configured for Groq; model `openai/gpt-oss-20b` |
| Data and vector search | Supabase JavaScript client; a Supabase RPC called `match_movies` |

## Architecture

```text
Browser (React/Vite)
  └─ POST /api/recommendations
       └─ Express API
            ├─ Build a text query from the user's preferences
            ├─ Embed the query with all-MiniLM-L6-v2
            ├─ Call Supabase RPC match_movies (up to 5 candidates)
            ├─ Ask Groq to select a candidate and explain the choice
            └─ Return the selected movie and explanation
```

The frontend and backend are separate applications under `apps/`. The browser only calls the backend; Supabase credentials and the Groq API key belong in the backend environment, not in the frontend.

## Recommendation and RAG pipeline

1. The frontend collects `numberOfPeople` and `duration`, then `favoriteMovie`, `movieStyle`, `mood`, and `strandedPerson`.
2. The API turns those values into a natural-language query. Missing values have fallback text in the query builder, although the current UI requires all six preferences before submitting.
3. The API creates an embedding with `Xenova/all-MiniLM-L6-v2`, using mean pooling and normalization.
4. It calls Supabase's `match_movies` RPC with `query_embedding` and `match_count: 5`. The service expects movie metadata and a `similarity` value in the returned rows.
5. The backend provides the preferences and candidate metadata to Groq. The prompt restricts the model to selecting a supplied candidate and requests JSON containing `movieId`, `title`, `reason`, and `matchHighlights`.
6. The API matches the returned `movieId` to the retrieved candidates; if it does not match, the recommendation fails instead of returning a new movie.

Movie embeddings can be generated or refreshed with `apps/api/src/scripts/embedMovies.js`. It reads every row from `movies`, builds embedding text from title, year, description, genres, runtime, and rating, then updates that row's `embedding`.

## Project structure

```text
.
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── config/          # Supabase and Groq client setup
│   │   │   ├── controllers/     # HTTP request handling
│   │   │   ├── routes/          # Express routes
│   │   │   ├── scripts/         # Embedding and integration test scripts
│   │   │   ├── services/        # Recommendation, embedding, and LLM logic
│   │   │   ├── utils/           # Query and movie embedding text builders
│   │   │   └── server.js        # Express application entry point
│   │   └── package.json
│   └── web/
│       ├── src/
│       │   ├── components/      # Start, preference, and result screens
│       │   ├── data/            # UI style and mood options
│       │   ├── lib/api.js       # Backend request helper
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── package.json
└── README.md
```

## Prerequisites

- Node.js and npm versions compatible with the Vite version in `apps/web`. The repository does not pin a Node.js version with an `engines` field or version file.
- A Supabase project with the required movie data, vector column, and `match_movies` RPC configured.
- A Groq API key with access to the configured model.
- Network access for the API to reach Supabase and Groq. The embedding model is loaded by Transformers at runtime and may need to be downloaded the first time it is used.

## Environment variables

There are no tracked `.env.example` files. Create the following files locally; do not commit them.

### Backend: `apps/api/.env`

```dotenv
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=replace-with-your-supabase-service-role-key
GROQ_API_KEY=replace-with-your-groq-api-key

# Optional: defaults to 5000
PORT=5000

# Optional: exact browser origin for CORS, e.g. http://localhost:5173
FRONTEND_URL=http://localhost:5173

# Set to production to enable Helmet in the API
NODE_ENV=development
```

`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `GROQ_API_KEY` are required for recommendation requests. The Supabase module fails during API startup if either Supabase value is missing. Keep the service-role key and Groq key on the server only.

### Frontend: `apps/web/.env.local`

```dotenv
VITE_API_URL=http://localhost:5000/api
```

`VITE_API_URL` is the backend base URL including `/api`; the frontend appends `/recommendations`. The source-code fallback is `http://localhost:5000` without `/api`, which does not match the API route paths on a local server, so explicitly set the value shown above for local development. Restart Vite after changing this variable.

The API's CORS configuration also allows requests without an `Origin`, the `FRONTEND_URL` origin, `https://ai-movie-recommendation-app-beta.vercel.app`, and any origin ending in `.vercel.app`.

## Local installation

Install each app's dependencies separately from its own directory:

```powershell
cd apps/api
npm ci

cd ..\web
npm ci
```

Create the backend and frontend environment files described above before starting the apps.

## Running the frontend

From `apps/web`:

```powershell
npm run dev
```

Vite prints the local address to open in a browser (by default, `http://localhost:5173`).

## Running the backend

From `apps/api`, with `apps/api/.env` configured:

```powershell
npm run dev
```

This runs `nodemon src/server.js`; the API listens on port `5000` unless `PORT` is set. For a non-watch process, use:

```powershell
npm start
```

The frontend and backend should run in separate terminals. Check that the API is responding with:

```powershell
curl.exe http://localhost:5000/api/health
```

## API

### `GET /api/health`

Returns a basic process health response:

```json
{
  "success": true,
  "message": "PopChoice API is running"
}
```

### `POST /api/recommendations`

Accepts JSON preferences:

```json
{
  "numberOfPeople": 2,
  "duration": "2 hours",
  "favoriteMovie": "The Shawshank Redemption",
  "movieStyle": "Classic",
  "mood": "Inspiring",
  "strandedPerson": "Someone who needs hope and motivation"
}
```

On success, the response has this shape (values vary with the selected database row and model output):

```json
{
  "success": true,
  "data": {
    "movie": {
      "id": "movie-id",
      "title": "Movie title",
      "year": 1994,
      "description": "Movie description",
      "genres": ["Drama"],
      "rating": 8.0,
      "posterUrl": "https://example.invalid/poster.jpg",
      "runtimeMinutes": 120,
      "similarity": 0.8
    },
    "reason": "Why the movie fits the preferences.",
    "matchHighlights": ["A matching detail"]
  }
}
```

The movie fields are mapped from the Supabase RPC row; values and availability depend on the data. The API returns HTTP 400 with `{ "success": false, "message": "Preferences are required" }` when the body is missing or is not an object. Recommendation failures (including upstream, database, and invalid model-output failures) return HTTP 500 with `{ "success": false, "message": "Failed to generate recommendation" }`.

There is no authentication or rate limiting implemented on these routes. The controller checks the request body type but does not validate individual preference fields.

## Database and vector search

The application connects to Supabase using `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Recommendation search invokes:

```text
match_movies(query_embedding, match_count)
```

The API passes a normalized query vector and requests five matches. The embedding script indicates that movie rows are stored in a `movies` table with an `embedding` field and fields for title, year, description, genres, runtime, and rating.

**Schema and RPC details are not included in the tracked repository.** No SQL migrations or definition of `match_movies` are present here, so the exact table types, vector dimensions, similarity metric, filtering rules, database extension setup, and function return schema cannot be verified from this codebase. Configure the Supabase table and RPC to agree with the embedding model and the fields consumed by the API before running recommendations.

To populate or refresh embeddings after movie rows exist, run from `apps/api`:

```powershell
node src/scripts/embedMovies.js
```

This processes all rows sequentially and updates the `embedding` column. Review the script and your database before running it against a large or production dataset.

## Deployment

The supplied project context identifies Vercel as the frontend host and Render as the backend host. The known deployed addresses are:

- Frontend: https://ai-movie-recommendation-app-beta.vercel.app
- Backend API base: https://ai-movie-recommendation-app-b4ld.onrender.com
- Recommendation endpoint: https://ai-movie-recommendation-app-b4ld.onrender.com/api/recommendations

The frontend's `VITE_API_URL` must point to the backend base URL including `/api` so that its request to `/recommendations` resolves to the endpoint above.

For a frontend production build, the repository defines:

```powershell
cd apps/web
npm ci
npm run build
```

Vite writes build output to `apps/web/dist`. The API package defines `npm start` (`node src/server.js`); the server listens on `PORT` or `5000`. Configure the required backend environment variables in the backend hosting environment, and configure `VITE_API_URL` for the frontend deployment.

**The platform identities and URLs above come from the supplied project context.** Deployment manifests, container files, and CI deployment workflows are not present in the tracked repository, so the exact Vercel/Render build settings and deployment process cannot be verified here. The API CORS source explicitly allows the known frontend origin, any origin ending in `.vercel.app`, and the optional `FRONTEND_URL`.

## Known limitations and troubleshooting

- **A local recommendation request returns 404:** Set `VITE_API_URL=http://localhost:5000/api` in `apps/web/.env.local`, then restart Vite. The app appends `/recommendations` to this base path.
- **API startup fails because Supabase settings are missing:** Verify `apps/api/.env` exists and includes `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Start the backend from `apps/api` so dotenv loads the file from the expected working directory.
- **Recommendations fail despite the API being healthy:** Health only confirms the HTTP server is responding. Also check Supabase reachability, credentials, movie rows and embeddings, the `match_movies` RPC, and the Groq key/model access.
- **Model initialization is slow or fails offline:** The embedding pipeline loads `Xenova/all-MiniLM-L6-v2` on first use. Ensure the environment can access the model if it is not already cached.
- **Database setup cannot be reproduced from this repository alone:** The SQL schema and `match_movies` function are not tracked; obtain or create the compatible Supabase database objects separately.
- **The recommendation service depends on an LLM response that parses as JSON:** Invalid JSON or a selected ID that is not in the retrieved candidate set causes the recommendation request to fail.
- **The API has no route-level authentication, per-field input validation, or rate limiting.**
- **Automated test commands are not defined in either package manifest.** The backend contains ad hoc scripts, some of which call external services and require valid environment/database setup. In particular, `src/scripts/testRecommendationSearch.js` imports `findMovieCandidates`, but that function is not exported from the recommendation service, so this script does not run as checked in.
