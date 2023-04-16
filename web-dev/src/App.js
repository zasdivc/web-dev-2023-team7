import { BrowserRouter,Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import TrackDetailScreen from "./music/track";
import AlbumDetailScreen from "./music/album";
import TestScreen from "./music/test";
import {Home} from "./music/home/Home";
import {Main} from "./music/home/modules/main/Main";
import {Search} from "./music/home/modules/search/Search";
import {Likes} from "./music/home/modules/likes/Likes";
function App() {
  return (
            <BrowserRouter>
              <Routes>
               <Route path={''} element={<Home />}>
               <Route path={''} element={<Navigate to={'main'} />}/>
               <Route path={'main'} element={<Main/>}/>
               <Route path={'search'} element={<Search/>}/>
               <Route path={'likes'} element={<Likes />}/>
               </Route>
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
  );
}

export default App;
