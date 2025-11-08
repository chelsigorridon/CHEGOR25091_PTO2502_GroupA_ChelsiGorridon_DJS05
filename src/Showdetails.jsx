import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPodcasts";
import { genres } from "./data";


export default function ShowDetails() {
  const { podcastId } = useParams();

  const podcast = podcasts.find(() => podcast.id === Number(podcastId));

  if (!podcast) {
    return <p>Podcast not found.</p>;
  }

  const genreLabels = podcast.genres.map((id) => {
    const match = allGenres.find((g) => g.id === id);
    return <span key={id} className="tag">{match ? match.title : `Unknown`}</span>;
  });

  return (
   <div className={styles.card}>
         <img src={podcast.image} alt={podcast.title} />
   
         <h3>{podcast.title}</h3>
         <p className={styles.seasons}>{podcast.seasons} seasons</p>
         <div className={styles.tags}>{genreSpans}</div>
         <p className={styles.updatedText}>
           Updated {formatDate(podcast.updated)}
         </p>
       </div>
  )
}
