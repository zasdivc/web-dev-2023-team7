import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import TrackDetailScreen from "./music/track";
import AlbumDetailScreen from "./music/album";
function App() {
  return (
            <BrowserRouter>
              <Routes>
                <Route
                    path="/music/track/:id"
                    element={<TrackDetailScreen />}
                />
                <Route
                      path="/music/album/:id"
                      element={<AlbumDetailScreen />}
                />
              </Routes>
            </BrowserRouter>
  );
}

export default App;
