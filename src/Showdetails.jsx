import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ShowDetails.module.css"; // external stylesheet

export default function ShowDetails() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [error, setError] = useState(null);
