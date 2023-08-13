import "./App.css";
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import { Listing } from "./pages/Listing";
import { MovieDetail } from "./pages/MovieDetail";
import { Starred } from "./pages/Starred";
import { Watchlist } from "./pages/Watchlist";
import { AddMovie } from "./pages/AddMovie";
import { useData } from "./context/DataContext";

const getActiveStyle = ({ isActive }) => ({
  color: isActive ? "#fff" : "#c2c2c2",
});

function App() {
  const { state, dispatch } = useData();
  const navigate = useNavigate();
  return (
    <div className="App w-full h-full overflow-x-hidden">
      <nav className="w-screen px-7 py-3 flex justify-between items-center bg-primary fixed">
        <h1 className="text-white font-bold text-xl">IMDB</h1>
        <input
          type="text"
          placeholder="Search movies by title or director..."
          className="w-96 rounded-md px-3 py-1"
          value={state.searchTerm}
          onChange={(e) => {
            dispatch({ type: "SEARCH_MOVIE", payload: e.target.value });
            navigate("/");
          }}
        />
        <div className="flex gap-6">
          <NavLink to="/" style={getActiveStyle} className="hover:scale-110">
            Movies
          </NavLink>
          <NavLink
            to="/watchlist"
            style={getActiveStyle}
            className="hover:scale-110"
          >
            Watch List
          </NavLink>
          <NavLink
            to="/starred"
            style={getActiveStyle}
            className="hover:scale-110"
          >
            Starred Movies
          </NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/movieDetail" element={<MovieDetail />} />
        <Route path="/newMovie" element={<AddMovie />} />
      </Routes>
    </div>
  );
}

export default App;
