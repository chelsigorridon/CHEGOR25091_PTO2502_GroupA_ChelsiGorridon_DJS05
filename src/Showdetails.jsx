import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ShowDetails.module.css"; // external stylesheet

/**
 * ShowDetails Component
 * ---------------------
 * Displays detailed information about a specific podcast, including:
 * - Title, description, genres, and metadata
 * - A season selector dropdown
 * - Episodes list for the selected season
 *
 * Data is fetched dynamically from the Podcast API using the `podcastId` URL parameter.
 *
 * @component
 * @returns {JSX.Element} A detailed view of a selected podcast and its seasons/episodes.
 */

  /**
   * Fetch podcast data from API whenever the podcast ID changes.
   * Sets podcast info and initializes selected season.
   *
   * @async
   * @function fetchPodcast
   * @returns {Promise<void>}
   */

export default function ShowDetails() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  async function fetchPodcast() {
    try {
      const res = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
      if (!res.ok) throw new Error("Failed to load podcast");
      const data = await res.json();
      setPodcast(data);
      setSelectedSeason(data.seasons[0]); // default to first season
    } catch (err) {
      setError(err.message);
    }
  }
  fetchPodcast();
}, [podcastId]);

 // Display error or loading messages before content renders

if (error) return <p className={styles.error}>{error}</p>;
if (!podcast) return <p className={styles.loading}>Loading...</p>;

 return (
    <div className={styles.container}> 

      {/* ---------- HEADER SECTION ---------- */}

      <div className={styles.header}>
        <img src={podcast.image} alt={podcast.title} className={styles.cover} />
        <div className={styles.headerText}>
          <h1 className={styles.title}>{podcast.title}</h1>
          <p className={styles.description}>{podcast.description}</p>

           {/* Genre Tags */}

          <div className={styles.genreTags}>
            {podcast.genres?.map((genre) => (
              <span key={genre} className={styles.genreTag}>{genre}</span>
            ))}
          </div>

            {/* Info Row */}

          <div className={styles.infoRow}>
            <p><strong>Total Seasons:</strong> {podcast.seasons.length}</p>
            <p><strong>Last Updated:</strong> {new Date(podcast.updated).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

        {/* ---------- SEASON SELECTOR ---------- */}

      <div className={styles.seasonSelector}>
        <h2>Current Season</h2>
        <select
          value={selectedSeason?.season}
          onChange={(e) => {
            const season = podcast.seasons.find(
              (s) => s.season === Number(e.target.value)
            );
            setSelectedSeason(season);
          }}
          className={styles.dropdown}
        >
          {podcast.seasons.map((season) => (
            <option key={season.season} value={season.season}>
              Season {season.season}
            </option>
          ))}
        </select>
      </div>

      {/* ---------- SEASON DETAILS + EPISODES ---------- */}

      {selectedSeason && (
        <div className={styles.seasonBox}>
          <div className={styles.seasonHeader}>
            <img
              src={selectedSeason.image}
              alt={selectedSeason.title}
              className={styles.seasonImage}
            />
            <div>
              <h3 className={styles.seasonTitle}>
                Season {selectedSeason.season}: {selectedSeason.title}
              </h3>
              <p className={styles.seasonDescription}>{selectedSeason.description}</p>
              <p className={styles.episodeCount}>
                {selectedSeason.episodes.length} Episodes
              </p>
            </div>
          </div>

            {/* Episode Cards */}

          <div className={styles.episodes}>
            {selectedSeason.episodes.map((ep) => (
              <div key={ep.episode} className={styles.episodeCard}>
                <div className={styles.episodeBadge}>S{selectedSeason.season}</div>
                <div className={styles.episodeInfo}>
                  <p className={styles.episodeTitle}>{ep.title}</p>
                  <p className={styles.episodeDescription}>{ep.description}</p>
                  <div className={styles.episodeMeta}>
                    <span>{ep.duration}</span>
                    <span>•</span>
                    <span>{new Date(ep.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div> 
  );
}