import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Content/dashboard";
import Invitacion from "./Content/invitation";
import Login from "./Content/login";
import { PhotoPage } from "./Content/PhotoPage";
import CategoryView from "./Content/categories/CategoryView";
import MusicPlayer from "./Content/musicPlayer";
import GlobalStyle from "./globalStyles";
import ProtectedRoute from "./Routes/protectedRoutes";

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={<Invitacion />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/fotos" element={<PhotoPage />} />
                    <Route path="/fotos/:categoria" element={<CategoryView />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                {/* MusicPlayer flotante global para todas las rutas */}
                <MusicPlayer />
            </Router>
        </>
    );
};

export default App;
