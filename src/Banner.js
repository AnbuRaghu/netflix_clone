import React, { useEffect, useState } from "react";
import "./banner.css";
import axios from "./axios";
import requests from "./request";
import "./banner.css";

export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      //  console.log(request.data.results[Math.floor(Math.random) * request.data.request.length -1])
      // >> math.floor(Math.random) * request.data.request.length -1
      //to get the random movie every time to show in banner
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
 // console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header className="banner">
      <div
        className="banner_contents"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
          backgroundPosition: "center center",
        }}
      >
        {/* background mage */}
        {/* title */}

        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div > 2 buttons */}
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">MyList</button>
        </div>
     

        {/* description */}
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className='banner_fadeBottom'></div>
    </header>
  );
}
