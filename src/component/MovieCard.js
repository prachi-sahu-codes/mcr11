import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export const MovieCard = ({ item }) => {
  const { dispatch } = useData();
  const navigate = useNavigate();

  return (
    <div
      className="w-64 shadow-md rounded-md hover:bg-slate-50 cursor-pointer"
      onClick={() => navigate(`/movieDetail/${item?.id}`)}
    >
      <img
        src={item?.imageURL}
        className="w-64 h-64 object-cover rounded-tr-md rounded-tl-md"
        alt={`${item?.title} poster`}
      />
      <h1 className="text-lg text-center p-2 py-2 pt-4 font-bold">
        {item?.title}
      </h1>
      <p className="px-2 pb-3 text-center text-sm h-20 overflow-hidden mb-2">
        {item?.summary}
      </p>
      <div className="px-2 pb-2 flex justify-between items-center">
        {item?.star === true ? (
          <button
            className="pb-1 pt-2 px-5 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "UNSTAR", payload: item?.id });
            }}
          >
            Starred
          </button>
        ) : (
          <button
            className="pb-1 pt-2 px-5 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "STAR", payload: item?.id });
            }}
          >
            Star
          </button>
        )}
        {item?.watchlist === true ? (
          <button
            className=" pb-1 pt-2 px-5 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "REMOVE_WATCHLIST", payload: item?.id });
            }}
          >
            Watchlisted
          </button>
        ) : (
          <button
            className=" pb-1 pt-2 px-5 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "WATCHLIST", payload: item?.id });
            }}
          >
            Watchlist
          </button>
        )}
      </div>
    </div>
  );
};
