import * as SQLite from 'expo-sqlite';

const databaseName = "PageSnap.db";

/**
 * Open the SQLite database asynchronously.
 * @returns {Promise<SQLite.SQLiteDatabase>} The database instance.
 */
export const getDatabase = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        console.log("Database opened successfully.");
        return db;
    } catch (error) {
        console.error("Error opening database:", error);
        return null;
    }
};

/**
 * Initialize the database by creating necessary tables.
 * @param {SQLite.SQLiteDatabase} db - The SQLite database instance.
 */
export const initDatabase = async (db) => {
    if (!db) {
        console.error("Database object is null. Initialization aborted.");
        return;
    }

    try {
        // Execute SQL commands using `executeAsync`
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS Books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                coverImagePath TEXT,
                dateAdded TEXT NOT NULL
            );
        `);
        console.log("Books table created successfully.");

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS Quotes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                bookId INTEGER NOT NULL,
                quote TEXT NOT NULL,
                Notes TEXT,
                pageStart INTEGER,
                pageEnd INTEGER,
                FOREIGN KEY (bookId) REFERENCES Books(id)
            );
        `);
        console.log("Quotes table created successfully.");

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS QuoteImages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quoteId INTEGER NOT NULL,
                imagePath TEXT NOT NULL,
                FOREIGN KEY (quoteId) REFERENCES Quotes(id)
            );
        `);
        console.log("QuoteImages table created successfully.");

        console.log("All tables created successfully.");
    } catch (error) {
        console.error("Error initializing database tables:", error);
    }
};
