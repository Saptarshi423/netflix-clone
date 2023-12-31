import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import { async } from "q";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts={
    height: "390",
    width: "100%",
    playerVars:{
      autoplay: 1
    }
  }
  //console.table(movies);
  // const handleClick = (movie)=>{
  //   console.log(movie.name)
  //   if(trailerUrl){
  //     setTrailerUrl('')
  //   }else{
  //     movieTrailer(movie?.name || "")
  //     .then((url)=>{
  //       console.log(url)
  //       const urlParams = new URLSearchParams(new URL(url).search);
  //       setTrailerUrl(urlParams.get('v'));
  //       console.log(url)
  //     })
  //     .catch(err=>console.log(err))
  //   }
  // }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie, index) => {
          return (
            <img
              key={movie.id}
              onClick={()=>handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={'XtMThy8QKqU&t'} opts={opts}/>}
    </div>
  );
}

export default Row;
