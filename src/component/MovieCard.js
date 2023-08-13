import React from "react";
import { useData } from "../context/DataContext";

export const MovieCard = ({ item }) => {
  const { dispatch } = useData();

  return (
    <div className="w-64 shadow-md rounded-md hover:bg-slate-50 cursor-pointer">
      <img
        src={item?.imageURL}
        className="w-64 h-64 object-cover rounded-tr-md rounded-tl-md"
        alt={`${item?.title} poster`}
      />
      <h1 className="text-lg text-center p-2 py-2 pt-4 font-bold">
        {item?.title}
      </h1>
      <p className="px-2 pb-3 text-center text-sm h-20 overflow-hidden">
        {item?.summary}
      </p>
      <div className="px-2 pb-2 flex justify-between items-center">
        {item?.star === true ? (
          <button
            className="pb-1 pt-2 px-5 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
            onClick={() => dispatch({ type: "UNSTAR", payload: item?.id })}
          >
            Starred
          </button>
        ) : (
          <button
            className="pb-1 pt-2 px-5 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
            onClick={() => dispatch({ type: "STAR", payload: item?.id })}
          >
            Star
          </button>
        )}
        {item?.watchlist === true ? (
          <button
            className=" pb-1 pt-2 px-5 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
            onClick={() =>
              dispatch({ type: "REMOVE_WATCHLIST", payload: item?.id })
            }
          >
            Watchlisted
          </button>
        ) : (
          <button
            className=" pb-1 pt-2 px-5 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
            onClick={() => dispatch({ type: "WATCHLIST", payload: item?.id })}
          >
            Watchlist
          </button>
        )}
      </div>
    </div>
  );
};
