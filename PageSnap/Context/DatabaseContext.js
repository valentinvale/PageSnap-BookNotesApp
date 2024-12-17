import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getDatabase, initDatabase } from "../Services/DatabaseService";

const DatabaseContext = createContext();

export const useDatabase = () => {
    return useContext(DatabaseContext);
}

export const DatabaseProvider = ({ children }) => {
    const [database, setDatabase] = useState(null);

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                const db = await getDatabase();
                await initDatabase(db);
                setDatabase(db);
            } catch (error) {
                console.log("Error initializing database:", error);
            }
        }
        initializeDatabase();
    }, []);

    if (!database) {
        return null;
    }

    return (
        <DatabaseContext.Provider value={database}>
            {children}
        </DatabaseContext.Provider>
    );
}