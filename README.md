# DJS05 – React Podcast App Show Detail Page with Routing and Navigation

A dynamic and responsive React application that allows users to browse, search, filter, and explore detailed podcast information fetched from a public API.
The app supports smooth routing between the Home Page and Show Details Page, featuring interactive season and episode navigation.

## Core Functionality

- **Fetch Podcasts from API**

  - Data is loaded from: `https://podcast-api.netlify.app/shows`
  - Podcasts include metadata like title, updated date, genres, image, and seasons

- **Search**

  - Users can search podcasts by title
  - Case-insensitive and dynamically updates the result list

- **Sort**

  - Sort options include:
    - Default
    - Newest (by updated date)
    - Oldest
    - Title A → Z
    - Title Z → A

- **Genre Filter**

  - Podcasts can be filtered by genre using a dropdown
  - All available genres are loaded from static data

- **Pagination**

  - The app dynamically adjusts how many podcast cards to show per page
  - Uses screen width to compute optimal layout (e.g., 2 rows × n columns)
  - Defaults to 10 items per page for tablet and smaller screens

- **Shared State with Context API**
  - Uses a `PodcastProvider` to manage global podcast state
  - Exposes search term, sort key, selected genre, page, and filtered podcasts
  - Components consume state via `usePodcasts()` or `PodcastContext`

- **Show Details Page**

  - When a podcast card is clicked, users are navigated to the Show Details Page, which displays:
  - Podcast title, image, and full description
  - Updated date and genre information
  - A dropdown or tab selector for seasons
  - A list of episodes for the selected season, including:
  - Episode title
  - Episode description
  - Episode number and badge indicator
  - This page fetches and renders details using dynamic route parameters (e.g. /show/:id) with react-router-dom.

- **Routing and Navigation**

  - The app uses React Router for seamless navigation between pages:
  - / → Home page (Podcast list, search, filter, sort)
  - /show/:id → Show Details page (Seasons, episodes, and detailed info)


## Project Structure

```
/src
│
├── /api
│ └── fetchPodcasts.js # Fetch podcasts from the API
│
├── /components
│ ├── Header.jsx # Top navigation bar with controls
│ ├── PodcastCard.jsx # Individual podcast preview card
│ ├── PodcastGrid.jsx # Grid layout of podcast cards
│
├── /context
│ └── PodcastContext.jsx # React context for global podcast state
│
├── /utils
│ └── formatDate.js # Formats ISO date to readable format
│
├── App.jsx # Root app component
└── main.jsx # React entry point
```

## How It Works

- On startup, podcasts are fetched once from the API.

- The data is stored in Context and used across components.

- Users can search, sort, and filter podcasts interactively.

- Clicking a podcast card navigates to its detailed Show Details Page.

- The page dynamically displays seasons and episodes, updating as users interact.

- **Tech Stack**

- React 18+

- React Router DOM

- Context API

- Vite (for fast development server)

- CSS Modules (for scoped styling)

- JavaScript (ES6+)

- HTML5 + Responsive CSS

## How to Run

1. Clone the project or download the source code.
2. Install dependencies using:

   ```bash
   npm install
   ```

3. Run the development server with:

   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser to view the app.
