import React, { useState, useEffect } from "react";
import "./Movie.css";

const Movie = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchedData, setSearchData] = useState([]);
  const [error, setError] = useState(false);
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
      );
      const data = await response.json();
      setData(data.results);
    };

    fetchMovies();
  }, []);

  // const handleSearch = async (event) => {
  //   if (event.keyCode === 13) {
  //     try {
  //       const response = await fetch(SEARCH_API + searchValue);
  //       const data = await response.json();

  //       if (response.status === 200) {
  //         if (data.results.length > 0) {
  //           setSearchData(data.results);
  //           setError(false);
  //           setSearchValue('')
  //         } else {
  //           setSearchData([]);
  //           setError(true);
  //           setSearchValue('')
  //         }
  //       } else {
  //         setSearchData([]);
  //         setError(true);
  //       }
  //     } catch (error) {
  //       console.log(`${error.message} occurred`);
  //     }
  //   }
  // };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchMovies();
    }, 300); // Adjust the debounce delay as needed (e.g., 300ms)

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  const searchMovies = async () => {
    if (searchValue.trim() === "") {
      setSearchData([]);
      setError(false);
      return;
    }

    try {
      const response = await fetch(SEARCH_API + searchValue);
      const data = await response.json();

      if (response.status === 200) {
        if (data.results.length > 0) {
          setSearchData(data.results);
          setError(false);
        } else {
          setSearchData([]);
          setError(true);
        }
      } else {
        setSearchData([]);
        setError(true);
      }
    } catch (error) {
      console.log(`${error.message} occurred`);
    }
  };

  // const handleSearch = (event) => {
  //   if (event.keyCode === 13) {
  //     setSearchValue(event.target.value);
  //   }
  // };

  return (
    <>
      <header className="flex h-20 items-center justify-end bg-[#373b69]">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            // onKeyDown={handleSearch} 
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-12 w-100 mr-4 rounded-full bg-[#22254b] outline-none text-gray-300 py-5 font-bold border border-black"
          />
        </form>
      </header>

      <div className="w-full flex flex-wrap gap-x-8 gap-y-8 p-4 box-border bg-[#22254b]">
        {error ? (
          <div className="flex justify-center items-center">
            <h1 className="text-white ">No results found.</h1>
          </div>
        ) : searchedData.length > 0 ? (
          searchedData.map((movie) => (
            <div
             key={movie.id}
             className="main w-72 shadow-sm relative flex flex-col text-white overflow-hidden bg-[#373b69]">
              <img
                src={"https://image.tmdb.org/t/p/w1280" + movie.poster_path}
                alt={movie.title}
              />
              <div className="font-bold flex justify-between p-4">
                <h1 clas>{movie.title}</h1>
                {movie.vote_average >= 8 ? (
                  <span className="text-green-500 bg-[#22254b]">
                    {Math.floor(movie.vote_average)}
                  </span>
                ) : (
                  <span className="bg-[#22254b] text-[#ffa500]">
                    {Math.floor(movie.vote_average)}
                  </span>
                )}
              </div>
              <div className="overview">
                <h2 className="font-bold my-5">Overview</h2>
                {movie.overview}
              </div>
            </div>
          ))
        ) : (
          data.map((movie) => (
            <div
              key={movie.id}
              className="main w-72 shadow-sm relative flex flex-col text-white overflow-hidden bg-[#373b69]"
            >
              <img
                src={"https://image.tmdb.org/t/p/w1280" + movie.poster_path}
                alt={movie.title}
              />
              <div className="font-bold flex justify-between p-4">
                <h1>{movie.title}</h1>
                {movie.vote_average >= 8 ? (
                  <span className="text-green-500 bg-[#22254b]">
                    {Math.floor(movie.vote_average)}
                  </span>
                ) : (
                  <span className="bg-[#22254b] text-[#ffa500]">
                    {Math.floor(movie.vote_average)}
                  </span>
                )}
              </div>
              <div className="overview">
                <h2 className="font-bold my-5">Overview</h2>
                {movie.overview}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default Movie;

// import React, { useState, useEffect } from "react";
// import "./Movie.css";

// const Header = ({ searchValue, handleSearch }) => {
//   return (
//     <header className="flex h-20 items-center justify-end bg-[#373b69]">
//       <form action="" onSubmit={(e) => e.preventDefault()}>
//         <input
//           type="text"
//           onKeyDown={handleSearch}
//           placeholder="Search"
//           value={searchValue}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="h-12 w-100 mr-4 rounded-full bg-[#22254b] outline-none text-gray-300 py-5 font-bold border border-black"
//         />
//       </form>
//     </header>
//   );
// };

// const MovieList = ({ data, searchedData, error }) => {
//   return (
//     <div className="w-full flex flex-wrap gap-x-8 gap-y-8 p-4 box-border bg-[#22254b]">
//       {error ? (
//         <div className="flex justify-center items-center">
//           <h1 className="text-white">No results found.</h1>
//         </div>
//       ) : searchedData.length > 0 ? (
//         searchedData.map((movie) => (
//           <MovieItem key={movie.id} movie={movie} />
//         ))
//       ) : (
//         data.map((movie) => (
//           <MovieItem key={movie.id} movie={movie} />
//         ))
//       )}
//     </div>
//   );
// };

// const MovieItem = ({ movie }) => {
//   return (
//     <div className="main w-72 shadow-sm relative flex flex-col text-white overflow-hidden bg-[#373b69]">
//       <img
//         src={"https://image.tmdb.org/t/p/w1280" + movie.poster_path}
//         alt={movie.title}
//       />
//       <div className="font-bold flex justify-between p-4">
//         <h1>{movie.title}</h1>
//         {movie.vote_average >= 8 ? (
//           <span className="text-green-500 bg-[#22254b]">
//             {Math.floor(movie.vote_average)}
//           </span>
//         ) : (
//           <span className="bg-[#22254b] text-[#ffa500]">
//             {Math.floor(movie.vote_average)}
//           </span>
//         )}
//       </div>
//       <div className="overview">
//         <h2 className="font-bold my-5">Overview</h2>
//         {movie.overview}
//       </div>
//     </div>
//   );
// };

// const Movie = () => {
//   const [data, setData] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [searchedData, setSearchData] = useState([]);
//   const [error, setError] = useState(false);
//   const SEARCH_API =
//     'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const response = await fetch(
//         "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
//       );
//       const data = await response.json();
//       setData(data.results);
//     };

//     fetchMovies();
//   }, []);

//   const handleSearch = async (value) => { // Update handleSearch function
//     if (value) {
//       try {
//         const response = await fetch(SEARCH_API + value);
//         const data = await response.json();

//         if (response.status === 200) {
//           if (data.results.length > 0) {
//             setSearchData(data.results);
//             setError(false);
//             setSearchValue("");
//           } else {
//             setSearchData([]);
//             setError(true);
//             setSearchValue("");
//           }
//         } else {
//           setSearchData([]);
//           setError(true);
//         }
//       } catch (error) {
//         console.log(`${error.message} occurred`);
//       }
//     }
//   };

//   return (
//     <>
//       <Header searchValue={searchValue} handleSearch={handleSearch} />
//       <MovieList data={data} searchedData={searchedData} error={error} />
//     </>
//   );
// };

// export default Movie;
