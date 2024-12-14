import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { ADDBOOK } from "../Router/RouteNames";

const ContainerEmptyText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
    text-align: center;
    margin-top: 20px;
`;

const Container = styled.View`
    background-color: #f0f0f0;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
`;

const ButtonText = styled.Text`
    color: white;
    text-align: center;
`;

const AddBookButton = styled.TouchableOpacity`
    background-color:rgb(40, 151, 214);
    padding: 10px;
    margin: 10px;
    border-radius: 5px
`;

const Books = () => {

    const [books, setBooks] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        // Get books from database
        // setBooks(booksFromDatabase);
    }, []);

    const addBook = () => {
        navigation.navigate(ADDBOOK);
    }

    if (books.length === 0) {
        return (
            <Container>
                <AddBookButton onPress={addBook}><ButtonText>Add Book</ButtonText></AddBookButton>
                <ContainerEmptyText>Looking pretty empty.</ContainerEmptyText>
                <ContainerEmptyText> Add some books to get started.</ContainerEmptyText>
            </Container>
        );
    }
    
    return (
        <Container>
            placeholder
        </Container>
    );
    
}
export default Books;