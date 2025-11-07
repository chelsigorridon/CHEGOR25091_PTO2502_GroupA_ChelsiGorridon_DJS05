import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPodcasts";
import { genres } from "./data";


export default function ShowDetails() {
  const { podcastId } = useParams();

  return (
    <div>
      <h1>Podcast Details</h1>
      <p>Podcast ID: {podcastId}</p>
    </div>
  );
}
