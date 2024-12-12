import SQLite from 'react-native-sqlite-storage';

const database_name = "PageSnap.db";
const database_version = "1.0";
const database_displayname = "PageSnap Database";
const database_size = 200000;

export const getDataBase = async () => {

    return SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
        () => {
            console.log("Database Opened");
        },
        (error) => {
            console.log("Error: " + error);
        }
    );
};

export const initDatabase = async (db) => {

    try{
        await db.executeSql(
            `CREATE TABLE IF NOT EXISTS Books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                author TEXT,
                coverImagePath TEXT,
                dateAdded TEXT,
            )`
        );
    
        await db.executeSql(
            `CREATE TABLE IF NOT EXISTS Quotes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                bookId INTEGER,
                quote TEXT,
                Notes TEXT,
                pageStart INTEGER,
                pageEnd INTEGER,
                FOREIGN KEY (bookId) REFERENCES Books(id)
            )`
        );
    
        await db.executeSql(
            `CREATE TABLE IF NOT EXISTS QuoteImages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quoteId INTEGER,
                imagePath TEXT,
                FOREIGN KEY (quoteId) REFERENCES Quotes(id
            )`
        );
    }
    catch (error) {
        console.log("Error: " + error);
    }
}
