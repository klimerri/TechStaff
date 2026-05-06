import { useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    
    return { 
        user,
        role: user?.role,
        isEngineer: user?.role === "engineer",
        isAdmin: user?.role === "admin",
        isDispatcher: user?.role === "dispatcher"
    }
}