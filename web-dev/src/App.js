import ProfileScreen from "../src/music/screens/profile-screen";
import LoginScreen from "../src/music/screens/login-screen";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../src/music/reducers/auth-reducer";
import Navigation from "../src/music/components/nav/navigation";
import RegisterScreen from "./music/screens/register-screen";
import TrackDetailScreen from "./music/track";
import AlbumDetailScreen from "./music/album";
import TestScreen from "./music/test";
// import AdminScreen from "./screens/admin-screen";


const store = configureStore({
    reducer: {auth: authReducer}
});
function App() {
    const hello = "Hello World!";
    return (
        <Provider store={store}>
            <div className="container">
                <Router>
                    <Navigation />
                    <Routes>
                        <Route path="/login"
                               element={<LoginScreen />} />
                        <Route path="/profile"
                               element={<ProfileScreen />} />
                        <Route path="/register"
                               element={<RegisterScreen />} />
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
                </Router>
            </div>
        </Provider>
    );
}
export default App;