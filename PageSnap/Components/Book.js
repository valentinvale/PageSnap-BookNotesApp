import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDatabase } from "../Context/DatabaseContext";
import { getBookById } from "../Services/BookService";

const Container = styled.View`
    background-color: #f0f0f0;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
`;

const TitleText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
    text-align: center;
`;

const Book = ({ route }) => {

    const { bookId } = route.params;
    const [book, setBook] = useState(null);
    const db = useDatabase();

    useEffect(() => {
        getBookById(db, bookId).then((result) => {
            setBook(result);
        });
    }, [bookId]);

    return (
        <Container>
            <TitleText>Book Details</TitleText>
            <TitleText>{book?.title}</TitleText>
            <TitleText>Book ID: {bookId}</TitleText>
        </Container>
    );
};
export default Book;