import React from "react";
import { useData } from "../context/DataContext";
import { MovieCard } from "../component/MovieCard";

export const Starred = () => {
  const { state } = useData();
  const filterData = state.searchedData.filter((item) => item?.star);
  return (
    <div className="w-full h-full mt-16 p-10 ">
      {filterData.length > 0 ? (
        <ul className="flex flex-wrap gap-20">
          {filterData.map((item) => (
            <li key={item?.id}>
              <MovieCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="div-center text-xl font-bold">
          No Movies Starred yet
        </div>
      )}
    </div>
  );
};
