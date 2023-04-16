import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import TrackDetailScreen from "./music/track";
import AlbumDetailScreen from "./music/album";
import TestScreen from "./music/test";
import commentReducer from "./comment/comment-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
const store = configureStore({ reducer: { comments: commentReducer } });

function App() {
  return (
      <Provider store={store}>
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
                  <Route
                      path="/test"
                      element={<TestScreen />}
                  />
              </Routes>
            </BrowserRouter>
          </Provider>
  );
}

export default App;
