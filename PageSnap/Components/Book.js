import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDatabase } from "../Context/DatabaseContext";
import { getBookById } from "../Services/BookService";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import AddQuoteModal from "./AddQuoteModal";

const Container = styled.View`
    background-color: #f0f0f0;
    border-radius: 5px;
`;

const DetailsContainer = styled.View`
    padding: 20px;
    background-color: white;
    shadow-color: #000;
    shadow-opacity: 0.5;
    shadow-radius: 20px;
    elevation: 5;
`;

const TitleText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
    text-align: center;
`;

const AddQuoteContainer = styled.View`
    background-color: #f0f0f0;
    border-bottom-width: 3px;
    border-bottom-color: rgb(175, 197, 209);
    border-bottom-style: solid;
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
`;

const AddQuoteButton = styled.TouchableOpacity`
    border: 3px solid rgb(175, 197, 209);
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    width: 95%;
`;

const ButtonText = styled.Text`
    color: black;
    text-align: center;
`;

const AddQuoteIcon = styled(FontAwesomeIcon)`
    text-align: center;
    font-size: 20px;
`;

const Book = ({ route }) => {

    const { bookId } = route.params;
    const [book, setBook] = useState(null);

    const [modalOpened, setModalOpened] = useState(false);

    const db = useDatabase();

    useEffect(() => {
        getBookById(db, bookId).then((result) => {
            setBook(result);
        });
    }, [bookId]);

    return (
        <Container>
            <DetailsContainer>
                <TitleText>{book?.title}</TitleText>
                <TitleText>by</TitleText>
                <TitleText>{book?.author}</TitleText>
            </DetailsContainer>
                <AddQuoteButton onPress={() => setModalOpened(true)}>
                    <AddQuoteIcon icon={faSquarePlus} />
                    <ButtonText>Add Quote</ButtonText>
                </AddQuoteButton>
            <AddQuoteModal bookId={bookId} visible={modalOpened} onClose={() => setModalOpened(false)} />
        </Container>
    );
};
export default Book;