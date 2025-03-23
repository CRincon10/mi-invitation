import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
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
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true, user: userData };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};


// Obtener usuario guardado
export const getStoredUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// Cerrar sesión
export const logoutUser = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirige al login después de cerrar sesión
};
