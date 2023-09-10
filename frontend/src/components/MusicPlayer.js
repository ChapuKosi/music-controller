import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PremiumPopup from "./PremiumPopup";

export default function MusicPlayer(props) {
  const { image_url, title, artist, is_playing, time, duration, votes, votes_required } = props;

  const songProgress = (time / duration) * 100;

  const [showPopup, setShowPopup] = useState(false);

  const [isPremiumUser, setIsPremiumUser] = useState(false);

  useEffect(() => {
    // Fetch premium user status when the component mounts
    fetch("/spotify/is-premium-user")
      .then((response) => response.json())
      .then((data) => {
        setIsPremiumUser(data.is_premium);
      })
      .catch((error) => {
        console.error("Error checking premium status:", error);
      });
  }, []);

  const handlePlayPauseClick = () => {
    // Check if the user has a premium subscription
    if (!isPremiumUser) {
      setShowPopup(true);
    } else {
      // Proceed with playback control
      setShowPopup(false);
      if (is_playing) {
        pauseSong();
      } else {
        playSong();
      }
    }
  };

  const handleSkipSong = () => {
    if (!isPremiumUser) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
      skipSong();
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const pauseSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  };

  const playSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  };

  const skipSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }

  return (
    <Grid item xs={12} align="center">
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={3}>
            <img src={image_url} height="100%" width="100%" alt={title} />
          </Grid>
          <Grid item align="center" xs={6}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {artist}
            </Typography>
            <div>
              <IconButton onClick={handlePlayPauseClick}>
                {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={handleSkipSong}>
                {props.votes} / {""}
                {props.votes_required}
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>

      {showPopup && <PremiumPopup onClose={closePopup} />}
    </Grid>
  );
}
