import React from "react";
import { useParams } from "react-router";
import { useData } from "../context/DataContext";

export const MovieDetail = () => {
  const { id } = useParams();
  const { state, dispatch } = useData();
  const findProduct = state?.searchedData?.find(
    (item) => item.id.toString() === id
  );

  return (
    <div className="px-10 pb-6 pt-16 w-full">
      <h1 className="text-2xl font-semibold bg-slate-300 rounded-md text-center mt-4 p-2">
        {findProduct?.title}
      </h1>
      <div className="flex w-full gap-20 items-center">
        <img
          src={findProduct?.imageURL}
          alt="product pic"
          className="w-96 h-96 object-cover my-8"
        />
        <div>
          <p className="text-lg my-2 mt-5">
            <span className="font-bold">Director:</span> {findProduct?.director}
          </p>
          <p className="text-lg my-2 ">
            <span className="font-bold">Summary:</span> {findProduct?.summary}
          </p>
          <p className="text-lg my-2">
            <span className="font-bold">Rating:</span> {findProduct?.rating}
          </p>
          <p className="text-lg my-2">
            <span className="font-bold">Writer:</span> {findProduct?.writer}
          </p>
          <p className="text-lg my-2">
            <span className="font-bold">Genre:</span>{" "}
            {findProduct?.genre.map((item) => item + ", ")}
          </p>
          <p className="text-lg my-2">
            <span className="font-bold">Cast:</span>{" "}
            {findProduct?.cast.map((item) => item + ", ")}
          </p>

          <div className=" pt-6 pb-2 flex justify-between items-center">
            {findProduct?.star === true ? (
              <button
                className="pb-1 pt-2 px-10 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
                onClick={() =>
                  dispatch({ type: "UNSTAR", payload: findProduct?.id })
                }
              >
                Starred
              </button>
            ) : (
              <button
                className="pb-1 pt-2 px-10 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
                onClick={() =>
                  dispatch({ type: "STAR", payload: findProduct?.id })
                }
              >
                Star
              </button>
            )}
            {findProduct?.watchlist === true ? (
              <button
                className=" pb-1 pt-2 px-10 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_WATCHLIST",
                    payload: findProduct?.id,
                  })
                }
              >
                Watchlisted
              </button>
            ) : (
              <button
                className=" pb-1 pt-2 px-10 bg-primary font-bold rounded-md text-white shadow-md hover:opacity-90"
                onClick={() =>
                  dispatch({ type: "WATCHLIST", payload: findProduct?.id })
                }
              >
                Watchlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
