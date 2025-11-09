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