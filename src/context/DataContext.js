import { createContext, useContext, useEffect, useReducer } from "react";
import { movies } from "../data/data";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const ratingOption = [
    { id: 1, propName: "Above 1", propValue: 1 },
    { id: 2, propName: "Above 2", propValue: 2 },
    { id: 3, propName: "Above 3", propValue: 3 },
    { id: 4, propName: "Above 4", propValue: 4 },
    { id: 5, propName: "Above 5", propValue: 5 },
    { id: 6, propName: "Above 6", propValue: 6 },
    { id: 7, propName: "Above 7", propValue: 7 },
    { id: 8, propName: "Above 8", propValue: 8 },
    { id: 9, propName: "Above 9", propValue: 9 },
  ];

  const yearOption = [
    { id: 1, propName: "Before 1990", propValue: 1990 },
    { id: 2, propName: "Before 2000", propValue: 2000 },
    { id: 3, propName: "Before 2010", propValue: 2010 },
    { id: 4, propName: "Before 2020", propValue: 2020 },
    { id: 5, propName: "Before 2023", propValue: 2023 },
    { id: 6, propName: "Upcoming", propValue: 2050 },
  ];
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(movies));
  }, []);

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "SEARCH_MOVIE":
        if (action.payload.length > 0) {
          const findMovies = state.data.filter(
            (item) =>
              item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
              item.director.toLowerCase().includes(action.payload.toLowerCase())
          );

          return {
            ...state,
            searchedData: findMovies,
            searchTerm: action.payload,
          };
        }
        return { ...state, searchedData: state.data, searchTerm: "" };

      case "SELECT_GENRE":
        return { ...state, genre: action.payload };

      case "SELECT_YEAR":
        return { ...state, year: action.payload };

      case "SELECT_RATING":
        return { ...state, rating: action.payload };

      case "CLEAR_FILTER":
        return {
          ...state,
          searchedData: state?.data,
          searchTerm: "",
          genre: "All",
          year: null,
          rating: null,
        };

      case "STAR":
        const starMovie = state.searchedData.map((item) =>
          item.id.toString() === action.payload.toString()
            ? { ...item, star: true }
            : item
        );
        localStorage.setItem("searchData", JSON.stringify(starMovie));

        return { ...state, searchedData: starMovie };

      case "UNSTAR":
        const unstarMovie = state.searchedData.map((item) =>
          item.id.toString() === action.payload.toString()
            ? { ...item, star: !item.star }
            : item
        );
        localStorage.setItem("searchData", JSON.stringify(unstarMovie));
        return { ...state, searchedData: unstarMovie };

      case "WATCHLIST":
        const watchMovie = state.searchedData.map((item) =>
          item.id.toString() === action.payload.toString()
            ? { ...item, watchlist: true }
            : item
        );
        localStorage.setItem("searchData", JSON.stringify(watchMovie));

        return { ...state, searchedData: watchMovie };

      case "REMOVE_WATCHLIST":
        const unWatchMovie = state.searchedData.map((item) =>
          item.id.toString() === action.payload.toString()
            ? { ...item, watchlist: !item.watchlist }
            : item
        );
        localStorage.setItem("searchData", JSON.stringify(unWatchMovie));
        return { ...state, searchedData: unWatchMovie };

      default:
        return state;
    }
  };

  const localStgData = JSON.parse(localStorage.getItem("data"));
  const localStgSearchData = JSON.parse(localStorage.getItem("searchData"));

  const [state, dispatch] = useReducer(reducerFunction, {
    data: localStgData ?? movies,
    searchedData: localStgSearchData ?? movies,
    searchTerm: "",
    genre: "All",
    year: null,
    rating: null,
  });

  const filterGenre =
    state?.genre !== "All"
      ? state?.searchedData.filter((item) => item.genre.includes(state?.genre))
      : state?.searchedData;

  const filteredYear = state?.year
    ? filterGenre?.filter((item) => Number(item?.year) <= Number(state?.year))
    : filterGenre;

  const filteredData = state?.rating
    ? filteredYear.filter(
        (item) => Number(state?.rating) <= Number(item?.rating)
      )
    : filteredYear;

  const genreOption = [
    ...new Set(state.data.reduce((acc, curr) => [...acc, ...curr.genre], [])),
  ];

  return (
    <DataContext.Provider
      value={{
        genreOption,
        ratingOption,
        yearOption,
        state,
        dispatch,
        filteredData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
