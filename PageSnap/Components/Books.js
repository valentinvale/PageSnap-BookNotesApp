import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDatabase } from "../Context/DatabaseContext";
import { getBooks } from "../Services/BookService";
import { ADDBOOK } from "../Router/RouteNames";
import { BOOK } from "../Router/RouteNames";

const ContainerEmptyText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
    text-align: center;
    margin-top: 20px;
`;

const Container = styled.View`
    background-color: #f0f0f0;
    margin-bottom: 10px;
    border-radius: 5px;
`;

const AddBookContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 0 20px 0;
    background-color: #f0f0f0;
    shadow-color: #000;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    elevation: 5;
`;

const ButtonText = styled.Text`
    color: white;
    text-align: center;
`;

const AddBookButton = styled.TouchableOpacity`
    background-color:rgb(40, 151, 214);
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    width: 80%;
`;

const BookListView = styled.ScrollView`
    padding: 10px;
    margin: 10px;
    margin-top: 0;
    margin-bottom: 120px;
`;

const BookItem = styled.TouchableOpacity`
    padding: 10px;
    margin: 10px 0;
    background-color: white;
    border-radius: 5px;
    shadow-color: #000;
    shadow-opacity: 0.1;
    shadow-radius: 5px;
    elevation: 3;
    display: flex;
    flex-direction: row;
`;

const BookDetails = styled.View`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

const BookTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: black;
    width: 80%;
`;

const BookAuthor = styled.Text`
    font-size: 16px;
    color: grey;
    width: 80%;
`;

const BookCover = styled.Image`
    width: 75px;
    height: 100px;
    border-radius: 5px;
`;

const Books = () => {

    const [books, setBooks] = useState([]);
    const navigation = useNavigation();
    const db = useDatabase();

    useEffect(() => {
        getBooks(db).then((result) => {
            console.log(result);
            setBooks(result);
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchBooks();
        }, [])
    );

    const addBook = () => {
        navigation.navigate(ADDBOOK);
    }

    const openBook = (bookId) => {
        navigation.navigate(BOOK, { bookId: bookId });
    }

    const fetchBooks = async () => {
        const books = await getBooks(db);
        setBooks(books);
    }

    if (books.length === 0) {
        return (
            <Container>
                <AddBookContainer>
                    <AddBookButton onPress={addBook}><ButtonText>Add Book</ButtonText></AddBookButton>
                </AddBookContainer>
                <ContainerEmptyText>Looking pretty empty.</ContainerEmptyText>
                <ContainerEmptyText> Add some books to get started.</ContainerEmptyText>
            </Container>
        );
    }
    
    return (
        <Container>
            <AddBookContainer>
                <AddBookButton onPress={addBook}>
                    <ButtonText>Add Book</ButtonText>
                </AddBookButton>
            </AddBookContainer>
            <BookListView>
                {books.map((book) => (
                    <BookItem key={book.id} onPress={() => openBook(book.id)}>
                        <BookCover source={{ uri: book.coverImagePath }} />
                        <BookDetails>
                            <BookTitle>{book.title}</BookTitle>
                            <BookAuthor>by {book.author}</BookAuthor>
                        </BookDetails>
                    </BookItem>
                ))}
            </BookListView>
        </Container>
    );
    
}
export default Books;