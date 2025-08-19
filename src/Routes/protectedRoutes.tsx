import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { getStoredUser, renewSession, isUserAuthenticated } from "../firebase/functions";

interface ProtectedRouteProps {
    children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactElement | null => {
    const [user, setUser] = useState(() => {
        return getStoredUser();
    });

    useEffect(() => {
        // Verificar autenticación al montar el componente
        const authenticatedUser = getStoredUser();
        setUser(authenticatedUser);
        
        // Si hay usuario, renovar sesión para mantenerla activa
        if (authenticatedUser && isUserAuthenticated()) {
            renewSession();
            
            // Configurar renovación automática cada 7 días (para apps de poco uso)
            const intervalId = setInterval(() => {
                if (isUserAuthenticated()) {
                    renewSession();
                } else {
                    clearInterval(intervalId);
                }
            }, 7 * 24 * 60 * 60 * 1000); // 7 días
            
            // Limpiar intervalo al desmontar
            return () => clearInterval(intervalId);
        }
    }, []);

    // También escuchar cambios en localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUser = getStoredUser();
            setUser(updatedUser);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return user && isUserAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
