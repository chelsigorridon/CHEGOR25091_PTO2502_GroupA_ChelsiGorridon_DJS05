import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ShowDetails.module.css"; // external stylesheet

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
      setSelectedSeason(data.seasons[0]);
    } catch (err) {
      setError(err.message);
    }
  }
  fetchPodcast();
}, [podcastId]);

if (error) return <p className={styles.error}>{error}</p>;
if (!podcast) return <p className={styles.loading}>Loading...</p>;

 return (
    <div className={styles.container}> 

      <div className={styles.header}>
        <img src={podcast.image} alt={podcast.title} className={styles.cover} />
        <div className={styles.headerText}>
          <h1 className={styles.title}>{podcast.title}</h1>
          <p className={styles.description}>{podcast.description}</p>
          <div className={styles.genreTags}>
            {podcast.genres?.map((genre) => (
              <span key={genre} className={styles.genreTag}>{genre}</span>
            ))}
          </div>
          <div className={styles.infoRow}>
            <p><strong>Total Seasons:</strong> {podcast.seasons.length}</p>
            <p><strong>Last Updated:</strong> {new Date(podcast.updated).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

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