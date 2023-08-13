import React from "react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

export const Filters = () => {
  const { state, dispatch, genreOption, ratingOption, yearOption } = useData();
  const navigate = useNavigate();
  return (
    <div className="fixed w-full bg-white flex justify-between items-center py-2 px-7">
      <p className="text-xl font-semibold">Movies</p>
      <select
        className="p-2 py-1 border-2 rounded-md text-sm cursor-pointer hover:bg-slate-50"
        value={state?.genre}
        onChange={(e) =>
          dispatch({ type: "SELECT_GENRE", payload: e.target.value })
        }
      >
        <option value="All">ALL Genres</option>
        {genreOption?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        className="p-2 py-1 text-sm border-2 rounded-md cursor-pointer hover:bg-slate-50"
        value={state?.year ?? ""}
        onChange={(e) =>
          dispatch({ type: "SELECT_YEAR", payload: e.target.value })
        }
      >
        <option value="" selected disabled>
          Release Year
        </option>
        {yearOption?.map(({ id, propName, propValue }) => (
          <option key={id} value={propValue}>
            {propName}
          </option>
        ))}
      </select>

      <select
        className="p-2 py-1 text-sm border-2 rounded-md cursor-pointer hover:bg-slate-50"
        value={state?.rating ?? ""}
        onChange={(e) =>
          dispatch({ type: "SELECT_RATING", payload: e.target.value })
        }
      >
        <option value="" selected disabled>
          Ratings
        </option>
        {ratingOption?.map(({ id, propName, propValue }) => (
          <option key={id} value={propValue}>
            {propName}
          </option>
        ))}
      </select>

      <button
        className="pt-1 text-sm px-3 border-2 text-primary font-semibold rounded-md hover:bg-slate-50"
        onClick={() => dispatch({ type: "CLEAR_FILTER" })}
      >
        Clear Filters
      </button>

      {/* <button
        className=" pb-1 pt-2 px-5 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
        onClick={() => navigate("/newMovie")}
      >
        Add a Movie
      </button> */}
    </div>
  );
};
