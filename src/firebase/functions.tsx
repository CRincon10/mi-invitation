import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface LoginProps {
    usuario: string;
    contrasena: string;
}

interface LoginProps {
    usuario: string;
    contrasena: string;
}

export const userLogin = async ({ usuario, contrasena }: LoginProps) => {
    try {
        const usersRef = collection(db, "owners");
        const q = query(usersRef, where("usuario", "==", usuario), where("contrasena", "==", contrasena));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: false, message: "Usuario o contraseña incorrectos" };
        }

        const userData = querySnapshot.docs[0].data();
        
        // Crear datos de sesión con timestamp para sesión indefinida
        const sessionData = {
            ...userData,
            loginTime: new Date().toISOString(),
            sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            isLoggedIn: true,
            persistent: true // Marcador para sesión persistente
        };

        // Guardar en localStorage y también en sessionStorage para mayor persistencia
        localStorage.setItem("user", JSON.stringify(sessionData));
        localStorage.setItem("userSession", JSON.stringify({
            isActive: true,
            loginTime: sessionData.loginTime,
            sessionId: sessionData.sessionId
        }));
        
        // También guardar en sessionStorage como respaldo
        sessionStorage.setItem("userBackup", JSON.stringify(sessionData));

        return { success: true, user: userData };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};


// Obtener usuario guardado con verificación de sesión persistente
export const getStoredUser = () => {
    try {
        // Intentar obtener de localStorage primero
        const user = localStorage.getItem("user");
        const userSession = localStorage.getItem("userSession");
        
        if (user && userSession) {
            const userData = JSON.parse(user);
            const sessionData = JSON.parse(userSession);
            
            // Verificar que la sesión esté activa
            if (sessionData.isActive && userData.isLoggedIn) {
                return userData;
            }
        }
        
        // Si no está en localStorage, intentar recuperar de sessionStorage
        const userBackup = sessionStorage.getItem("userBackup");
        if (userBackup) {
            const backupData = JSON.parse(userBackup);
            
            // Restaurar en localStorage
            localStorage.setItem("user", userBackup);
            localStorage.setItem("userSession", JSON.stringify({
                isActive: true,
                loginTime: backupData.loginTime,
                sessionId: backupData.sessionId
            }));
            
            return backupData;
        }
        
        return null;
    } catch (error) {
        console.error("Error al obtener usuario guardado:", error);
        return null;
    }
};

// Cerrar sesión - limpiar todas las fuentes de datos
export const logoutUser = () => {
    // Limpiar localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("userSession");
    
    // Limpiar sessionStorage
    sessionStorage.removeItem("userBackup");
    
    // Limpiar cualquier otro dato relacionado con la sesión
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('user') || key.includes('session') || key.includes('login'))) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    window.location.href = "/login"; // Redirige al login después de cerrar sesión
};

// Verificar y renovar sesión para mantenerla activa indefinidamente
export const renewSession = () => {
    try {
        const user = getStoredUser();
        if (user && user.isLoggedIn) {
            const now = new Date();
            const lastActivity = user.lastActivity ? new Date(user.lastActivity) : new Date(user.loginTime);
            
            // Solo renovar si han pasado más de 24 horas desde la última actividad
            const hoursSinceLastActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);
            
            if (hoursSinceLastActivity >= 24) {
                // Renovar timestamp de la sesión
                const renewedData = {
                    ...user,
                    lastActivity: now.toISOString(),
                    renewed: true,
                    renewCount: (user.renewCount || 0) + 1
                };
                
                localStorage.setItem("user", JSON.stringify(renewedData));
                sessionStorage.setItem("userBackup", JSON.stringify(renewedData));
                
                console.log(`Sesión renovada automáticamente. Renovaciones: ${renewedData.renewCount}`);
                return true;
            }
            
            // Si no necesita renovación, actualizar solo la última actividad
            const activityUpdate = {
                ...user,
                lastActivity: now.toISOString()
            };
            
            localStorage.setItem("user", JSON.stringify(activityUpdate));
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error al renovar sesión:", error);
        return false;
    }
};

// Función para verificar si el usuario está autenticado
export const isUserAuthenticated = () => {
    const user = getStoredUser();
    return user && user.isLoggedIn && user.persistent;
};
