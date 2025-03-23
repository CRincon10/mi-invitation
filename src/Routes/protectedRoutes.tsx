import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ReactElement } from "react";

interface ProtectedRouteProps {
    children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactElement | null => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
    }, []);

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
