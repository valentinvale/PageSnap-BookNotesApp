export const addQuote = async (db, bookId, notes, pageStart, pageEnd, imagePaths) => {
    try {
        const dateAdded = new Date().toISOString();
        await db.runAsync(
            `INSERT INTO Quotes (bookId, notes, pageStart, pageEnd, dateAdded) VALUES (?, ?, ?, ?, ?)`,
            [bookId, notes, pageStart, pageEnd, dateAdded]
        );

        const quote = await db.getFirstAsync(`SELECT * FROM Quotes WHERE dateAdded = ?`, [dateAdded]);
        const quoteId = quote.id;

        imagePaths.forEach(async (imagePath) => {
            await db.runAsync(
                `INSERT INTO QuoteImages (quoteId, imagePath) VALUES (?, ?)`,
                [quoteId, imagePath]
            );
        });
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const getQuotesForBook = async (db, bookId) => {
    try {
        const quotes = await db.executeSql(`SELECT * FROM Quotes WHERE bookId = ?`, [bookId]);
        
        const quotesWithImages = quotes[0].rows._array.map(async (quote) => {
            const images = await db.executeSql(`SELECT * FROM QuoteImages WHERE quoteId = ?`, [quote.id]);
            quote.images = images[0].rows._array;
            return quote;
        });

        return quotesWithImages;
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const getQuotesWithImages = async (db) => {
    try {
        const quotes = await db.executeSql(`SELECT * FROM Quotes`);
        
        const quotesWithImages = quotes[0].rows._array.map(async (quote) => {
            const images = await db.executeSql(`SELECT * FROM QuoteImages WHERE quoteId = ?`, [quote.id]);
            quote.images = images[0].rows._array;
            return quote;
        });

        return quotesWithImages;
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const getQuotes = async (db) => {
    try {
        const quotes = await db.executeSql(`SELECT * FROM Quotes`);
        return quotes[0].rows._array;
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const deleteQuote = async (db, id) => {
    try {
        await db.executeSql(`DELETE FROM Quotes WHERE id = ?`, [id]);
        await db.executeSql(`DELETE FROM QuoteImages WHERE quoteId = ?`, [id]);
    }
    catch (error) {
        console.log("Error: " + error);
    }
}