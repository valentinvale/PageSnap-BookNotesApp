export const getBooks = async (db) => {
    try {
        const books = await db.getAllAsync(`SELECT * FROM Books`);
        console.log(books);
        return books;
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const getBookById = async (db, id) => {
    try {
        console.log("Getting book with id: " + id);
        const book = await db.getFirstAsync(`SELECT * FROM Books WHERE id = ?`, [id]);
        console.log(book);
        return book;
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const addBook = async (db, title, author, coverImagePath) => {
    try {
        console.log("Adding book: " + title + " by " + author);
        const dateAdded = new Date().toISOString();
        await db.runAsync(
            `INSERT INTO Books (title, author, coverImagePath, dateAdded) VALUES (?, ?, ?, ?)`,
            [title, author, coverImagePath, dateAdded]
        );
        console.log("Book added successfully.");
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

