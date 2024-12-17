import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDatabase } from "../Context/DatabaseContext";
import styled from "styled-components/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons/faCameraRetro';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import * as ImagePicker from 'expo-image-picker';
import PhotoPickerModal from "./PhotoPickerModal";
import { Image } from "react-native";
import { addBook } from "../Services/BookService";
import { saveImage } from "../Services/FSService";
import { BOOKS } from "../Router/RouteNames";

const ContainerText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
    text-align: center;
    margin-top: 20px;
`;

const AddCoverText = styled.Text`
    font-size: 15px;
    color: black;
    margin-top: 20px;
    margin-left: 15px;
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

const PhotoContainer = styled.View`
    display: flex;
    align-items: center;
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

const DeletePhotoButton = styled.TouchableOpacity`
    background-color: red;
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

const CoverPhoto = styled.Image`
    width: 100px;
    height: 150px;
`;

const AddBook = () => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [coverPhoto, setCoverPhoto] = useState("");
    const [modalOpened, setModalOpened] = useState(false);

    const db = useDatabase();
    const navigation = useNavigation();

    const takePhoto = async () => {
        console.log("Take Photo");
        setModalOpened(false);
        
        const { status } = await ImagePicker.requestCameraPermissionsAsync({
            mediaTypes: Image,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1
        });
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync();
        
        if(!result.canceled){
            setCoverPhoto(result.assets[0].uri);
        }

        console.log(result);
    }

    const pickImage = async () => {
        console.log("Pick Image");
        setModalOpened(false);
        
        const { status } = await ImagePicker.requestCameraPermissionsAsync({
            mediaTypes: Image,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1
        });
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync();
        
        if(!result.canceled){
            setCoverPhoto(result.assets[0].uri);
        }

        console.log(result);

    };

    const handleAddBook = async () => {
        console.log("Add Book");
        console.log(title);
        console.log(author);
        
        if(!title || !author){
            alert("Please enter a title and author.");
            return;
        }

        if(!coverPhoto){
            alert("Please add a cover photo.");
            return;
        }

        try{
            const savedPhotoPath = await saveImage(coverPhoto);
            await addBook(db, title, author, savedPhotoPath);
            setTitle("");
            setAuthor("");
            setCoverPhoto("");
            navigation.navigate(BOOKS);
            alert("Book added successfully.");
        }
        catch(error){
            console.log("Error adding book:", error);
            alert("Error adding book.");
        }


    };

    return (
        <Container>
            <TextInput value={title} placeholder="Title" onChangeText={(text) => setTitle(text)} />
            <TextInput value={author} placeholder="Author" onChangeText={(text) => setAuthor(text)} />
            {coverPhoto ? 
            <PhotoContainer>
                <CoverPhoto source={{uri: coverPhoto}} />
                <DeletePhotoButton onPress={() => setCoverPhoto("")}>
                    <AddPhotoIcon icon={faTrash}></AddPhotoIcon>
                </DeletePhotoButton>
            </PhotoContainer>
            : 
            <Container>
                <AddCoverText>Add Cover Photo</AddCoverText>
                <AddCoverPhotoButton onPress={() => setModalOpened(true)}><AddPhotoIcon icon={faCameraRetro}></AddPhotoIcon></AddCoverPhotoButton>
                <PhotoPickerModal visible={modalOpened} onClose={() => setModalOpened(false)} onTakePhoto={takePhoto} onPickImage={pickImage} />
            </Container>
            }
            
            <AddBookButton>
                <ButtonText onPress={handleAddBook}>Add Book</ButtonText>
            </AddBookButton>
        </Container>
    );
}
export default AddBook;