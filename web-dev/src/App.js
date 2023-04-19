import ProfileScreen from "../src/music/screens/profile-screen";
import LoginScreen from "../src/music/screens/login-screen";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/music/reducers/auth-reducer";
import Navigation from "../src/music/components/nav/navigation";
import RegisterScreen from "./music/screens/register-screen";
import TrackDetailScreen from "./music/track";
import AlbumDetailScreen from "./music/album";
import TestScreen from "./music/test";
import commentReducer from "./comment/comment-reducer";
import { Home } from "./music/home/Home";
import { Main } from "./music/home/modules/main/Main";
import { Search } from "./music/home/modules/search/Search";
import { Likes } from "./music/home/modules/likes/Likes";

const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Navigation /> */}
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          {/* <Route path="/music/track/:id" element={<TrackDetailScreen />} /> */}
          {/* <Route path="/music/album/:id" element={<AlbumDetailScreen />} /> */}
          <Route path="/test" element={<TestScreen />} />
          <Route path="/" element={<Home />}>
            <Route path="/music/track/:id" element={<TrackDetailScreen />} />
            <Route path="/music/album/:id" element={<AlbumDetailScreen />} />

            <Route path="/" element={<Navigate to="main" />} />
            <Route path="main" element={<Main />} />
            <Route path="search" element={<Search />} />
            <Route path="likes" element={<Likes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
