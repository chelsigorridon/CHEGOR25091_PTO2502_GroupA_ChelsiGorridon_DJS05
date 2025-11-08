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
    <div>
      <h1>Podcast Details</h1>
      <p>Podcast ID: {podcastId}</p>
    </div>
  );
}
