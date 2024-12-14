import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons/faCameraRetro';

const ContainerText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
    text-align: center;
    margin-top: 20px;
`;

const ButtonText = styled.Text`
    color: white;
    text-align: center;
`;

const AddPhotoIcon = styled(FontAwesomeIcon)`
    text-align: center;
    font-size: 20px;
    
`;

const Container = styled.View`
    background-color: #f0f0f0;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
`;

const AddCoverPhotoButton = styled.TouchableOpacity`
    border: 3px solid rgb(175, 197, 209);
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

const AddBookButton = styled.TouchableOpacity`
    background-color:rgb(40, 151, 214);
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
`;

const TextInput = styled.TextInput`
    background-color: white;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
`;

const AddBook = () => {

    return (
        <Container>
            <TextInput placeholder="Title" />
            <TextInput placeholder="Author" />
            <AddCoverPhotoButton><AddPhotoIcon icon={faCameraRetro}></AddPhotoIcon></AddCoverPhotoButton>
            <AddBookButton><ButtonText>Add Book</ButtonText></AddBookButton>
        </Container>
    );
}
export default AddBook;