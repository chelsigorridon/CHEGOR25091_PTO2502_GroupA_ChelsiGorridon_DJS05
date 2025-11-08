import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { genres } from "./data.js";

export default function ShowDetails() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    async function fetchPodcast() {
      try {
        setLoading(true);
        setError(null);

       
        const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
        if (!response.ok) throw new Error("Failed to fetch podcast data");
        const data = await response.json();

        
        const genreInfo = genres.find((genre) =>
          genre.shows.includes(podcastId)
        );

       
        const combined = {
          ...data,
          genreTitle: genreInfo?.title || "Unknown Genre",
          genreDescription: genreInfo?.description || "No description available.",
        };

        setPodcast(combined);
      } catch (err) {
        console.error(err);
        setError("Failed to load podcast details.");
      } finally {
        setLoading(false);
      }
    }

    fetchPodcast();
  }, [podcastId]);

  if (loading) return <p>Loading podcast details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!podcast) return <p>Podcast not found.</p>;
 
  return (
    <div className={styles.container}>
      <img
        src={podcast.image}
        alt={podcast.title}
        className={styles.image}
      />
      <h1 className={styles.title}>{podcast.title}</h1>
      <p><strong>Genre:</strong> {podcast.genreTitle}</p>
      <p><strong>About the Genre:</strong> {podcast.genreDescription}</p>
      <p><strong>Description:</strong> {podcast.description}</p>

      {podcast.seasons && podcast.seasons.length > 0 && (
        <div className={styles.seasons}>
          <h2>Seasons</h2>
          {podcast.seasons.map((season) => (
            <details key={season.season} className={styles.season}>
              <summary>{season.title}</summary>
              <ul className={styles.episodeList}>
                {season.episodes?.map((ep) => (
                  <li key={ep.episode} className={styles.episodeItem}>
                    {ep.title} ({ep.file ? ep.file : "No audio file"})
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}