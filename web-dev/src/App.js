import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import TrackDetailScreen from "./music/track";
function App() {
  return (
            <BrowserRouter>
              <Routes>
                <Route
                    path="/music/track/:id"
                    element={<TrackDetailScreen />}
                />
              </Routes>
            </BrowserRouter>
  );
}

export default App;
