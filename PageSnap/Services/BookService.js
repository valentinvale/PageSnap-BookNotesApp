export const getBooks = async (db) => {
    try {
        const books = await db.executeSql(`SELECT * FROM Books`);
        return books[0].rows._array;
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const getBookById = async (db, id) => {
    try {
        const book = await db.executeSql(`SELECT * FROM Books WHERE id = ?`, [id]);
        return book[0].rows._array[0];
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const addBook = async (db, title, author, coverImagePath) => {
    try {
        const dateAdded = new Date().toISOString();
        await db.execAsync(
            `INSERT INTO Books (title, author, coverImagePath, dateAdded) VALUES (?, ?, ?, ?)`,
            [title, author, coverImagePath, dateAdded]
        );
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const updateBook = async (db, id, title, author, coverImagePath) => {
    try {
        await db.executeSql(
            `UPDATE Books SET title = ?, author = ?, coverImagePath = ? WHERE id = ?`,
            [title, author, coverImagePath, id]
        );
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const deleteBook = async (db, id) => {
    try {
        await db.executeSql(`DELETE FROM Books WHERE id = ?`, [id]);
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

