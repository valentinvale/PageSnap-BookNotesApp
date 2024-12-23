import React, { useState, useEffect, use } from "react";
import {
    Modal,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons/faCameraRetro";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { saveImage } from "../Services/FSService";
import { addQuote } from "../Services/QuoteService";
import { useDatabase } from "../Context/DatabaseContext";

const AddQuoteContainer = styled.View`
    background-color: #f0f0f0;
    border: 3px solid rgb(175, 197, 209);
    margin: 10px;
    border-radius: 10px;
    padding: 20px;
    flex: 1;
`;

const PhotosContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;
`;

const Photo = styled.Image`
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 5px;
`;

const PhotoAndRemoveButtonContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const PhotoPickerModalButton = styled.TouchableOpacity`
    border: 2px solid rgb(175, 197, 209);
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    width: 48%;
`;

const RemovePhotoButton = styled.TouchableOpacity`
    background-color: red;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
`;

const ButtonText = styled.Text`
    color: black;
    text-align: center;
`;

const AddPhotoIcon = styled(FontAwesomeIcon)`
    font-size: 20px;
    color: black;
`;

const RemovePhotoIcon = styled(FontAwesomeIcon)`
    font-size: 20px;
    color: white;
`;

const QuoteTextInput = styled.TextInput`
    background-color: white;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    text-align-vertical: top;
    height: 120px;
    flex: 1;
`;

const PagesContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;

const PageNumberInput = styled.TextInput`
    background-color: white;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    text-align-vertical: top;
    height: 40px;
    width: 30%;
`;

const CancelButton = styled.TouchableOpacity`
    background-color: firebrick;
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    margin-top: 10px;
`;

const CancelButtonText = styled.Text`
    color: white;
    text-align: center;
`;

const AddQuoteButton = styled.TouchableOpacity`
    background-color: rgb(40, 151, 214);
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    margin-top: 10px;
`;

const AddQuoteButtonText = styled.Text`
    color: white;
    text-align: center;
`;

const AddQuoteModal = ({bookId, visible, onClose }) => {
    const [photos, setPhotos] = useState([]);
    const [quoteText, setQuoteText] = useState("");
    const [startPage, setStartPage] = useState("");
    const [endPage, setEndPage] = useState("");

    const db = useDatabase();

    useEffect(() => {
        console.log(bookId);
        if (!visible) {
            setPhotos([]);
            setQuoteText("");
            setStartPage("");
            setEndPage("");
        }
    }, [visible]);

    const dismissKeyboard = () => Keyboard.dismiss();

    const takePhoto = async () => {
        if (photos.length >= 3) {
            alert("You can only add up to 3 photos.");
            return;
        }

        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Camera permissions are required to take photos.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        if (!result.canceled) {
            setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
        }
    };

    const pickImage = async () => {
        if (photos.length >= 3) {
            alert("You can only add up to 3 photos.");
            return;
        }

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Media library permissions are required to select images.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        if (!result.canceled) {
            setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
        }
    };

    const handleChangeNumber = (value, setter) => {
        if (isNaN(value) || parseInt(value) < 0 || value.includes(".")) {
            return;
        }
        setter(value);
    };

    const handleAddQuote = async () => {

        if (!quoteText && photos.length === 0) {
            alert("Please add a quote or photo.");
            return;
        }

        if(parseInt(startPage) > parseInt(endPage)){
            alert("Start page cannot be greater than end page.");
            return;
        }

        try {
            console.log("Add Quote");
            console.log(quoteText);
            console.log(photos);
            console.log(startPage);
            console.log(endPage);

            const photoPaths = photos.map(async (photo) => await saveImage(photo));

            await addQuote(db, bookId, quoteText, photoPaths, startPage, endPage);

            setPhotos([]);
            setQuoteText("");
            setStartPage("");
            setEndPage("");

            onClose();

        } catch (error) {
            console.error("Error adding quote:", error);
        }

    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
                        <AddQuoteContainer>
                            <PhotosContainer>
                                {photos.map((photo, index) => (
                                    <PhotoAndRemoveButtonContainer  key={index}>
                                        <Photo source={{ uri: photo }} />
                                        <RemovePhotoButton onPress={() => setPhotos(photos.filter((_, i) => i !== index))}>
                                            <RemovePhotoIcon icon={faTrash} />
                                        </RemovePhotoButton>
                                    </PhotoAndRemoveButtonContainer>
                                ))}
                            </PhotosContainer>
                            <ButtonContainer>
                                <PhotoPickerModalButton onPress={takePhoto}>
                                    <AddPhotoIcon icon={faCameraRetro} />
                                    <ButtonText>Take Photo</ButtonText>
                                </PhotoPickerModalButton>
                                <PhotoPickerModalButton onPress={pickImage}>
                                    <AddPhotoIcon icon={faImage} />
                                    <ButtonText>Add Image</ButtonText>
                                </PhotoPickerModalButton>
                            </ButtonContainer>
                            <QuoteTextInput
                                placeholder="Write your quote here..."
                                value={quoteText}
                                onChangeText={setQuoteText}
                                multiline={true}
                            />
                            <PagesContainer>
                                <PageNumberInput
                                 keyboardType="numeric" 
                                 value={startPage} 
                                 onChangeText={(value) => handleChangeNumber(value, setStartPage)}
                                 placeholder="Start Page" />
                                <PageNumberInput 
                                keyboardType="numeric" 
                                value={endPage} 
                                onChangeText={(value) => handleChangeNumber(value, setEndPage)}
                                placeholder="End Page" />
                            </PagesContainer>
                            <AddQuoteButton onPress={handleAddQuote}>
                                <AddQuoteButtonText>Add Quote</AddQuoteButtonText>
                            </AddQuoteButton>
                            <CancelButton onPress={onClose}>
                                <CancelButtonText>Cancel</CancelButtonText>
                            </CancelButton>
                        </AddQuoteContainer>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default AddQuoteModal;
