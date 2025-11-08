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

        // Step 1️⃣: Fetch podcast details from API
        const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
        if (!response.ok) throw new Error("Failed to fetch podcast data");
        const data = await response.json();

        // Step 2️⃣: Find related genre info from your data.js
        const genreInfo = genres.find((genre) =>
          genre.shows.includes(podcastId)
        );

        // Step 3️⃣: Merge both
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
    <div style={{ padding: "2rem" }}>
      <img
        src={podcast.image}
        alt={podcast.title}
        width="250"
        style={{ borderRadius: "12px" }}
      />
      <h1>{podcast.title}</h1>
      <p><strong>Genre:</strong> {podcast.genreTitle}</p>
      <p><strong>About the Genre:</strong> {podcast.genreDescription}</p>
      <p><strong>Description:</strong> {podcast.description}</p>

      {podcast.seasons && podcast.seasons.length > 0 && (
        <div>
          <h2>Seasons</h2>
          {podcast.seasons.map((season) => (
            <details key={season.season}>
              <summary>{season.title}</summary>
              <ul>
                {season.episodes?.map((ep) => (
                  <li key={ep.episode}>
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