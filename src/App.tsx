import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Content/dashboard";
import Invitacion from "./Content/invitation";
import Login from "./Content/login";
import GlobalStyle from "./globalStyles";
import ProtectedRoute from "./Routes/protectedRoutes";
import { useEffect } from "react";
import { auth } from "./firebaseConfig";

const App: React.FC = () => {
    useEffect(() => {
        console.log("Firebase inicializado:", auth);
        console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY); // Debería imprimir la API Key
    }, []);
    return (
        <>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={<Invitacion />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
};

export default App;
