import React, { useState, useEffect } from "react";
import "./row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

//as we exported it as default we can use anyname while importing
import axios from "./axios";

//as we don't get image as url we should folloe´w this link
const baseImgUrl = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // a Snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    async function fetchData() {
      // here we get the beginning url and add the remaining url
      // https://api.themoviedb.org/3//trending/all/week?api_key=c90f16346329c80a9e92682bc8b2bf6b&language=en-US

      const request = await axios.get(fetchUrl);
      //console.log(request);
      //console.log(request.data.results)
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  //console.log(movies);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      // this adds the close functionality if the trailer open is true
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          // this gives the full url
          //eg:https://www.youtube.com/watch?v=xtmndfdf
          // to get everyhing after ? in url
          const urlParams = new URLSearchParams(new URL(url).search);
          //urlParams.get('v')
          setTrailerUrl(urlParams.get("v"));
          console.log(urlParams.get("v"));
          // it gives after v=''
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="row">
      {/* tilte */}
      <h2>{title}</h2>
      <div className="row_posters">
        {/* severalrow posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseImgUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
        {/* when we have tailerUrl then show the youtube video */}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}
