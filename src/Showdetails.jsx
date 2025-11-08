import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { genres } from "./data.js";

export default function ShowDetails() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    async function fetchPodcastDetails() {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${podcastId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPodcast(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPodcastDetails();
  }, [podcastId]);