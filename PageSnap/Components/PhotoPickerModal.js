import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons/faCameraRetro';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { Modal } from "react-native";

const PhotoPickerModal = ({ visible, onClose, onTakePhoto, onPickImage }) => {

    const Container = styled.View`
        background-color: #f0f0f0;
        border: 3px solid rgb(175, 197, 209);
        padding-top: 80px;
        padding-bottom: 80px;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    `;

    const ButtonContainer = styled.View`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;

    const PhotoPickerModalButton = styled.TouchableOpacity`
        border: 3px solid rgb(175, 197, 209);
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        width: 40%;
    `;

    const CancelButton = styled.TouchableOpacity`
        border: 3px solid rgb(40, 151, 214);
        background-color: rgb(40, 151, 214);
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        align-items: center;
        width: 95%;
        margin-left: auto;
        margin-right: auto;
    `;

    const ButtonText = styled.Text`
        color: black;
        text-align: center;
    `;

    const CancelButtonText = styled.Text`
        color: white;
        text-align: center;
    `;

    const AddPhotoIcon = styled(FontAwesomeIcon)`
        text-align: center;
        font-size: 20px;
    `;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Container>
                <ButtonContainer>
                    <PhotoPickerModalButton onPress={onTakePhoto}>
                        <AddPhotoIcon icon={faCameraRetro} />
                        <ButtonText>Take Photo</ButtonText>
                    </PhotoPickerModalButton>
                    <PhotoPickerModalButton onPress={onPickImage}>
                        <AddPhotoIcon icon={faImage} />
                        <ButtonText>Gallery</ButtonText>
                    </PhotoPickerModalButton>
                </ButtonContainer>
                <CancelButton onPress={onClose}>
                    <CancelButtonText>Cancel</CancelButtonText>
                </CancelButton>
            </Container>
        </Modal>
    );
}
export default PhotoPickerModal;
