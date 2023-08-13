import React from "react";
import { useData } from "../context/DataContext";
import { Filters } from "../component/Filters";
import { MovieCard } from "../component/MovieCard";

export const Listing = () => {
  const { filteredData } = useData();

  return (
    <div className="h-full mt-14">
      <Filters />
      <div className="pt-16 px-12">
        {filteredData.length > 0 ? (
          <ul className="flex flex-wrap justify-between gap-10 rounded-md">
            {filteredData.map((item) => (
              <li key={item?.id}>
                <MovieCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="div-center text-xl font-bold">No Movies Found</div>
        )}
      </div>
    </div>
  );
};
